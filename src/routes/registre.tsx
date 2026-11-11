import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/page";
import { formatPrice } from "@/lib/catalog";
import { cancelOrder, grantAccess, listLedger, markPaid, type LedgerRow } from "@/lib/orders.functions";

const STORE = "temple-registre";

const labels: Record<string, string> = {
  intent: "En attente",
  awaiting_payment: "En attente",
  paid: "Payé",
  access_granted: "Accès envoyé",
  cancelled: "Annulé",
  refunded: "Remboursé",
  revoked: "Révoqué",
};

export const Route = createFileRoute("/registre")({
  head: () => ({
    meta: [
      { title: "Registre — Temple Sirius" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Registre,
});

function euros(cents: number, period: string | null) {
  return formatPrice(cents / 100, period === "mois" ? "mois" : undefined);
}

function Registre() {
  const [secret, setSecret] = useState(() => {
    if (typeof sessionStorage === "undefined") return "";
    return sessionStorage.getItem(STORE) ?? "";
  });
  const [draft, setDraft] = useState("");
  const [rows, setRows] = useState<LedgerRow[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(value: string) {
    setBusy(true);
    setError("");
    const result = await listLedger({ data: { secret: value } });
    setBusy(false);
    if (!result.ok) {
      setRows(null);
      setError(result.reason === "closed" ? "Le registre n'est pas ouvert." : "Ce secret ne correspond pas.");
      return;
    }
    sessionStorage.setItem(STORE, value);
    setSecret(value);
    setRows(result.rows);
  }

  async function after(action: Promise<{ ok: boolean }>) {
    const result = await action;
    if (!result.ok) {
      setError("Cette commande ne peut plus changer.");
      return;
    }
    await load(secret);
  }

  return (
    <Page
      kicker="Registre"
      title="Les intentions."
      lede="Ce que le site a noté. Un paiement n'est réel que lorsque tu le marques ici."
      crumbs={[{ label: "Registre" }]}
    >
      {rows === null ? (
        <form
          className="max-w-sm"
          onSubmit={(event) => {
            event.preventDefault();
            void load(draft);
          }}
        >
          <label className="text-sm text-muted" htmlFor="secret">Secret</label>
          <input
            id="secret"
            type="password"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            autoComplete="current-password"
            className="mt-1 w-full border border-line bg-bg px-3 py-3"
          />
          {error ? <p className="mt-2 text-sm text-gold" role="alert">{error}</p> : null}
          <button type="submit" disabled={busy} className="mt-4 min-h-11 bg-gold px-5 font-medium text-bg">
            {busy ? "…" : "Ouvrir"}
          </button>
        </form>
      ) : (
        <div>
          <button
            type="button"
            className="min-h-11 text-sm text-muted"
            onClick={() => {
              sessionStorage.removeItem(STORE);
              setSecret("");
              setRows(null);
            }}
          >
            Fermer le registre
          </button>
          {error ? <p className="mt-2 text-sm text-gold" role="alert">{error}</p> : null}
          {rows.length === 0 ? <p className="mt-6 text-muted">Aucune intention.</p> : null}
          <ul className="mt-6 space-y-4">
            {rows.map((row) => (
              <li key={row.id} className="border border-line p-4">
                <p className="font-display text-gold">{row.ref}</p>
                <p className="mt-1 font-display text-xl">{row.productName}</p>
                <p className="text-sm text-muted">
                  {euros(row.amountCents, row.period)} · {labels[row.status] ?? row.status}
                </p>
                <p className="text-sm text-muted">{row.createdAt.slice(0, 16).replace("T", " ")}</p>
                {row.customerName || row.customerPhone ? (
                  <p className="mt-1 text-sm">{[row.customerName, row.customerPhone].filter(Boolean).join(" · ")}</p>
                ) : null}
                {row.status === "intent" || row.status === "awaiting_payment" ? (
                  <PaidForm
                    onPaid={(method, providerRef) =>
                      after(markPaid({
                        data: { secret, orderId: row.id, method, providerRef },
                      }))
                    }
                    onCancel={() => after(cancelOrder({ data: { secret, orderId: row.id } }))}
                  />
                ) : null}
                {row.status === "paid" ? (
                  <button
                    type="button"
                    className="mt-3 min-h-11 border border-line px-4 text-sm"
                    onClick={() => after(grantAccess({ data: { secret, orderId: row.id } }))}
                  >
                    Accès envoyé
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Page>
  );
}

function PaidForm({
  onPaid,
  onCancel,
}: {
  onPaid: (method: "mobile_money" | "bank" | "other", providerRef: string) => void;
  onCancel: () => void;
}) {
  const [method, setMethod] = useState<"mobile_money" | "bank" | "other">("mobile_money");
  const [providerRef, setProviderRef] = useState("");
  return (
    <form
      className="mt-3 grid gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onPaid(method, providerRef);
      }}
    >
      <select
        value={method}
        onChange={(event) => setMethod(event.target.value as "mobile_money" | "bank" | "other")}
        className="min-h-11 border border-line bg-bg px-3"
        aria-label="Moyen de règlement"
      >
        <option value="mobile_money">Mobile Money</option>
        <option value="bank">Virement</option>
        <option value="other">Autre</option>
      </select>
      <input
        value={providerRef}
        onChange={(event) => setProviderRef(event.target.value)}
        placeholder="Référence du paiement, si tu l'as"
        className="min-h-11 border border-line bg-bg px-3"
      />
      <div className="flex gap-2">
        <button type="submit" className="min-h-11 bg-gold px-4 text-sm font-medium text-bg">
          Paiement reçu
        </button>
        <button type="button" className="min-h-11 px-4 text-sm text-muted" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}
