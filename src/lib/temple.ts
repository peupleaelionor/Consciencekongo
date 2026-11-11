export const SITE_URL = "https://consciencekongo.vercel.app";
export const WHATSAPP_E164 = "243965531737";
export const WHATSAPP_DISPLAY = "+243 965 531 737";
export const WHATSAPP_HOURS = "Tous les jours, 9 h – 20 h, heure de Kinshasa. Réponse sous 24 h.";

/** Taux fixes indicatifs, affichés comme tels. Pas un cours du jour. */
export const USD_PER_EUR = 1.08;
export const CDF_PER_EUR = 3100;

export const stripeEnabled = import.meta.env.VITE_STRIPE_ENABLED === "true";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(name: string, priceLabel: string, ref?: string | null) {
  const base = `Bonjour Guide Sirius, je souhaite commander ${name} (${priceLabel}).`;
  return ref ? `${base}\nRéférence : ${ref}` : base;
}

export function formatUsd(eur: number) {
  return `${Math.round(eur * USD_PER_EUR)} $`;
}

export function formatCdf(eur: number) {
  return `${Math.round(eur * CDF_PER_EUR).toLocaleString("fr-FR")} FC`;
}
