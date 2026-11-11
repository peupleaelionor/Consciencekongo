import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { formatPrice, productById, type Product } from "@/lib/catalog";
import { getSql } from "@/lib/db";
import { orderMessage, waLink } from "@/lib/temple";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const OPEN = ["intent", "awaiting_payment"] as const;

export type LedgerRow = {
  id: string;
  ref: string;
  status: string;
  productName: string;
  amountCents: number;
  period: string | null;
  customerName: string | null;
  customerPhone: string | null;
  createdAt: string;
};

function cents(product: Product) {
  return Math.round(product.price * 100);
}

function makeRef() {
  const bytes = randomBytes(4);
  let ref = "CK-";
  for (const byte of bytes) ref += ALPHABET[byte % ALPHABET.length];
  return ref;
}

function cut(value: string | undefined, max: number) {
  const text = value?.trim() ?? "";
  return text ? text.slice(0, max) : "";
}

function secretOk(given: string) {
  const expected = process.env.GUIDE_LEDGER_SECRET ?? "";
  if (expected.length < 16 || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

async function gate(secret: string) {
  if (!process.env.GUIDE_LEDGER_SECRET || process.env.GUIDE_LEDGER_SECRET.length < 16) {
    return "closed" as const;
  }
  if (!secretOk(secret)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return "denied" as const;
  }
  return "ok" as const;
}

async function insertIntents(
  rows: { id: string; ref: string; product: Product }[],
  customer: { name: string; phone: string; email: string; note: string },
) {
  const sql = await getSql();
  const values: unknown[] = [];
  const tuples: string[] = [];
  rows.forEach((row, index) => {
    const base = index * 6;
    tuples.push(
      `($${base + 1}::uuid, $${base + 2}::text, $${base + 3}::text, $${base + 4}::text, $${base + 5}::int, $${base + 6}::text)`,
    );
    values.push(row.id, row.ref, row.product.id, row.product.name, cents(row.product), row.product.period ?? "");
  });
  const nameAt = values.length + 1;
  values.push(customer.name || null, customer.phone || null, customer.email || null, customer.note);
  const text = `
    with input as (
      select * from (values ${tuples.join(", ")})
      as v(id, ref, product_id, product_name, amount_cents, period)
    ), created as (
      insert into orders (
        id, ref, channel, status, product_id, product_name, amount_cents, period,
        customer_name, customer_phone, customer_email
      )
      select id, ref, 'whatsapp', 'intent', product_id, product_name, amount_cents,
        nullif(period, ''), $${nameAt}, $${nameAt + 1}, nullif($${nameAt + 2}::text, '')
      from input
      returning id, ref
    ), logged as (
      insert into order_events (order_id, kind, to_status, actor, note)
      select id, 'created', 'intent', 'system', $${nameAt + 3} from created
    )
    select ref from created
  `;
  return sql.query<{ ref: string }>(text, values);
}

function hrefFor(product: Product, ref: string | null) {
  return waLink(orderMessage(product.name, formatPrice(product.price, product.period), ref));
}

export const openWhatsappOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { productId: string }) => {
    const product = productById(data?.productId ?? "");
    if (!product) throw new Error("Produit manquant.");
    return { productId: product.id };
  })
  .handler(async ({ data }) => {
    const product = productById(data.productId);
    if (!product) return { ok: true as const, ref: null, href: waLink(orderMessage("un seuil", "")) };
    const fallback = hrefFor(product, null);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const ref = makeRef();
        await insertIntents([{ id: randomUUID(), ref, product }], {
          name: "",
          phone: "",
          email: "",
          note: "Clic WhatsApp",
        });
        return { ok: true as const, ref, href: hrefFor(product, ref) };
      } catch (error) {
        const code = (error as { code?: string }).code;
        if (code === "23505" && attempt < 2) continue;
        console.error("[orders] intention non écrite");
        return { ok: true as const, ref: null, href: fallback };
      }
    }
    return { ok: true as const, ref: null, href: fallback };
  });

export const openCartOrders = createServerFn({ method: "POST" })
  .inputValidator((data: {
    lines: { productId: string }[];
    name: string;
    phone: string;
    email?: string;
    city?: string;
  }) => {
    const lines = (data?.lines ?? []).slice(0, 12).map((line) => {
      const product = productById(line?.productId ?? "");
      if (!product) throw new Error("Produit manquant.");
      return { productId: product.id };
    });
    if (!lines.length) throw new Error("Panier vide.");
    const name = cut(data?.name, 80);
    const phone = cut(data?.phone, 40);
    if (name.length < 2 || phone.length < 8) throw new Error("Nom ou téléphone manquant.");
    return {
      lines,
      name,
      phone,
      email: cut(data?.email, 120),
      city: cut(data?.city, 80),
    };
  })
  .handler(async ({ data }) => {
    const products = data.lines.map((line) => productById(line.productId)).filter((item): item is Product => Boolean(item));
    const rows = products.map((product) => ({ id: randomUUID(), ref: makeRef(), product }));
    const note = data.city ? `Panier. Ville : ${data.city}` : "Panier";
    try {
      const written = await insertIntents(rows, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        note,
      });
      return { ok: true as const, refs: written.map((row) => row.ref) };
    } catch (error) {
      const code = (error as { code?: string }).code;
      if (code === "23505") {
        const again = products.map((product) => ({ id: randomUUID(), ref: makeRef(), product }));
        try {
          const written = await insertIntents(again, {
            name: data.name,
            phone: data.phone,
            email: data.email,
            note,
          });
          return { ok: true as const, refs: written.map((row) => row.ref) };
        } catch {
          console.error("[orders] panier non écrit");
          return { ok: true as const, refs: [] as string[] };
        }
      }
      console.error("[orders] panier non écrit");
      return { ok: true as const, refs: [] as string[] };
    }
  });

export const listLedger = createServerFn({ method: "POST" })
  .inputValidator((data: { secret: string }) => ({ secret: data?.secret ?? "" }))
  .handler(async ({ data }): Promise<{ ok: true; rows: LedgerRow[] } | { ok: false; reason: "closed" | "denied" }> => {
    const allowed = await gate(data.secret);
    if (allowed !== "ok") return { ok: false, reason: allowed };
    const sql = await getSql();
    const rows = await sql.query<{
      id: string;
      ref: string;
      status: string;
      product_name: string;
      amount_cents: number;
      period: string | null;
      customer_name: string | null;
      customer_phone: string | null;
      created_at: string;
    }>(
      `select id::text, ref, status, product_name, amount_cents, period, customer_name, customer_phone, created_at::text
       from orders order by created_at desc limit 40`,
    );
    return {
      ok: true,
      rows: rows.map((row) => ({
        id: row.id,
        ref: row.ref,
        status: row.status,
        productName: row.product_name,
        amountCents: row.amount_cents,
        period: row.period,
        customerName: row.customer_name,
        customerPhone: row.customer_phone,
        createdAt: row.created_at,
      })),
    };
  });

export const markPaid = createServerFn({ method: "POST" })
  .inputValidator((data: {
    secret: string;
    orderId: string;
    method: string;
    providerRef?: string;
    customerName?: string;
    customerPhone?: string;
  }) => {
    if (!/^[0-9a-f-]{36}$/i.test(data?.orderId ?? "")) throw new Error("Commande inconnue.");
    if (!["mobile_money", "bank", "other"].includes(data?.method)) throw new Error("Moyen manquant.");
    return {
      secret: data.secret ?? "",
      orderId: data.orderId,
      method: data.method as "mobile_money" | "bank" | "other",
      providerRef: cut(data.providerRef, 80),
      customerName: cut(data.customerName, 80),
      customerPhone: cut(data.customerPhone, 40),
    };
  })
  .handler(async ({ data }) => {
    const allowed = await gate(data.secret);
    if (allowed !== "ok") return { ok: false as const, reason: allowed };
    const sql = await getSql();
    const found = await sql.query<{ status: string; amount_cents: number; product_id: string }>(
      "select status, amount_cents, product_id from orders where id = $1::uuid",
      [data.orderId],
    );
    const order = found[0];
    if (!order || !OPEN.includes(order.status as (typeof OPEN)[number])) {
      return { ok: false as const, reason: "state" as const };
    }
    await sql.query(
      `with upd as (
         update orders
         set status = 'paid', updated_at = now(),
           customer_name = coalesce(nullif($2, ''), customer_name),
           customer_phone = coalesce(nullif($3, ''), customer_phone)
         where id = $1::uuid and status in ('intent', 'awaiting_payment')
         returning id, product_id, customer_phone
       ), pay as (
         insert into payments (id, order_id, method, provider_ref, amount_cents, status, confirmed_by, confirmed_at)
         select $4::uuid, id, $5, nullif($6, ''), $7::int, 'confirmed', 'guide', now() from upd
       ), ent as (
         insert into entitlements (id, order_id, product_id, subject, status)
         select $8::uuid, id, product_id, customer_phone, 'pending' from upd
       )
       insert into order_events (order_id, kind, from_status, to_status, actor, note)
       select id, 'status_changed', $9, 'paid', 'guide', nullif($6, '') from upd`,
      [
        data.orderId,
        data.customerName,
        data.customerPhone,
        randomUUID(),
        data.method,
        data.providerRef,
        order.amount_cents,
        randomUUID(),
        order.status,
      ],
    );
    return { ok: true as const };
  });

export const cancelOrder = createServerFn({ method: "POST" })
  .inputValidator((data: { secret: string; orderId: string }) => {
    if (!/^[0-9a-f-]{36}$/i.test(data?.orderId ?? "")) throw new Error("Commande inconnue.");
    return { secret: data.secret ?? "", orderId: data.orderId };
  })
  .handler(async ({ data }) => {
    const allowed = await gate(data.secret);
    if (allowed !== "ok") return { ok: false as const, reason: allowed };
    const sql = await getSql();
    const updated = await sql.query<{ id: string }>(
      `with old as (
         select id, status from orders where id = $1::uuid and status in ('intent', 'awaiting_payment')
       ), upd as (
         update orders set status = 'cancelled', updated_at = now()
         where id in (select id from old)
         returning id
       )
       insert into order_events (order_id, kind, from_status, to_status, actor)
       select upd.id, 'status_changed', old.status, 'cancelled', 'guide'
       from upd
       join old on old.id = upd.id
       returning order_id::text as id`,
      [data.orderId],
    );
    if (!updated.length) return { ok: false as const, reason: "state" as const };
    return { ok: true as const };
  });

export const grantAccess = createServerFn({ method: "POST" })
  .inputValidator((data: { secret: string; orderId: string }) => {
    if (!/^[0-9a-f-]{36}$/i.test(data?.orderId ?? "")) throw new Error("Commande inconnue.");
    return { secret: data.secret ?? "", orderId: data.orderId };
  })
  .handler(async ({ data }) => {
    const allowed = await gate(data.secret);
    if (allowed !== "ok") return { ok: false as const, reason: allowed };
    const sql = await getSql();
    const updated = await sql.query<{ id: string }>(
      `update orders set status = 'access_granted', updated_at = now()
       where id = $1::uuid and status = 'paid'
       returning id::text`,
      [data.orderId],
    );
    if (!updated.length) return { ok: false as const, reason: "state" as const };
    await sql.query(
      `update entitlements set status = 'active', granted_at = now()
       where order_id = $1::uuid and status = 'pending'`,
      [data.orderId],
    );
    await sql.query(
      `insert into order_events (order_id, kind, from_status, to_status, actor, note)
       values ($1::uuid, 'status_changed', 'paid', 'access_granted', 'guide', 'Accès envoyé')`,
      [data.orderId],
    );
    return { ok: true as const };
  });
