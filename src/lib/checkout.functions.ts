import { createServerFn } from "@tanstack/react-start";

export type CheckoutResult =
  | { ok: false; reason: "stripe_disabled" }
  | { ok: true; url: string };

/**
 * Phase 2. Tant que VITE_STRIPE_ENABLED n'est pas "true" et que STRIPE_SECRET_KEY
 * est absent, la commande reste sur WhatsApp. Rien n'est débité ici.
 */
export const startCheckout = createServerFn({ method: "POST" })
  .inputValidator((data: { productId: string }) => {
    if (!data?.productId) throw new Error("Produit manquant.");
    return { productId: data.productId };
  })
  .handler(async (): Promise<CheckoutResult> => {
    const enabled =
      process.env.VITE_STRIPE_ENABLED === "true" && Boolean(process.env.STRIPE_SECRET_KEY);
    if (!enabled) return { ok: false, reason: "stripe_disabled" };
    return { ok: false, reason: "stripe_disabled" };
  });
