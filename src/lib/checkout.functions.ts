import { createServerFn } from "@tanstack/react-start";
import { productById } from "@/lib/catalog";
import { SITE_URL, WHATSAPP_DISPLAY } from "@/lib/temple";

export type CheckoutResult =
  | { ok: false; reason: "card_unavailable" }
  | { ok: true; url: string };

export type ConfirmResult =
  | { ok: false }
  | { ok: true; productName: string };

function cardReady() {
  return process.env.VITE_STRIPE_ENABLED === "true" && Boolean(process.env.STRIPE_SECRET_KEY);
}

export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: { productId: string }) => {
    if (!data?.productId || !productById(data.productId)) throw new Error("Produit manquant.");
    return { productId: data.productId };
  })
  .handler(async ({ data }): Promise<CheckoutResult> => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!cardReady() || !key) return { ok: false, reason: "card_unavailable" };
    const product = productById(data.productId);
    if (!product) return { ok: false, reason: "card_unavailable" };

    const body = new URLSearchParams();
    body.set("mode", product.period ? "subscription" : "payment");
    body.set("locale", "fr");
    body.set("success_url", `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`);
    body.set("cancel_url", `${SITE_URL}/cancel`);
    body.set("client_reference_id", product.id);
    body.set("metadata[productId]", product.id);
    body.set("phone_number_collection[enabled]", "true");
    body.set(
      "custom_text[submit][message]",
      "Temple Sirius · Conscience Kongo. L'accès part après confirmation.",
    );
    body.set("line_items[0][quantity]", "1");
    body.set("line_items[0][price_data][currency]", "eur");
    body.set("line_items[0][price_data][unit_amount]", String(Math.round(product.price * 100)));
    body.set("line_items[0][price_data][product_data][name]", product.name);
    body.set("line_items[0][price_data][product_data][description]", product.description.slice(0, 180));
    if (product.period) body.set("line_items[0][price_data][recurring][interval]", "month");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!response.ok) return { ok: false, reason: "card_unavailable" };
    const json = (await response.json()) as { url?: string };
    if (!json.url) return { ok: false, reason: "card_unavailable" };
    return { ok: true, url: json.url };
  });

export const confirmSession = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string }) => {
    if (!data?.sessionId || data.sessionId.length > 120) throw new Error("Session manquante.");
    return { sessionId: data.sessionId };
  })
  .handler(async ({ data }): Promise<ConfirmResult> => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return { ok: false };
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(data.sessionId)}`,
      { headers: { Authorization: `Bearer ${key}` } },
    );
    if (!response.ok) return { ok: false };
    const session = (await response.json()) as {
      payment_status?: string;
      status?: string;
      metadata?: { productId?: string };
      customer_details?: { email?: string | null };
    };
    const paid = session.payment_status === "paid" || session.status === "complete";
    if (!paid) return { ok: false };
    const product = session.metadata?.productId ? productById(session.metadata.productId) : undefined;
    const productName = product?.name ?? "ton seuil";
    const email = session.customer_details?.email;
    const from = process.env.ORDER_FROM;
    const resend = process.env.RESEND_API_KEY;
    if (email && from && resend) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resend}`,
          "Content-Type": "application/json",
          "Idempotency-Key": data.sessionId,
        },
        body: JSON.stringify({
          from,
          to: email,
          subject: `Accès — ${productName}`,
          text: `Temple Sirius.\n\nTon règlement pour « ${productName} » est reçu.\nGuide Sirius t'envoie l'accès. Si ce courriel arrive avant le fichier, écris au ${WHATSAPP_DISPLAY}.\n`,
        }),
      }).catch(() => undefined);
    }
    return { ok: true, productName };
  });
