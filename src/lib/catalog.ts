export type Product = {
  id: string;
  name: string;
  price: number;
  kicker: string;
  description: string;
  format: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "aigle",
    name: "L'Aigle de Sirius",
    price: 247,
    kicker: "Produit phare",
    description:
      "La formation du Temple. Voir d'en haut, couper l'illusion, reprendre ta souveraineté.",
    format: "8 modules · accès permanent",
    featured: true,
  },
  {
    id: "sceau",
    name: "Le Sceau d'Ankh",
    price: 47,
    kicker: "Seuil d'entrée",
    description:
      "Le manuel du seuil. Qui tu es, d'où vient ta lignée, et ce que tu cesses de négocier.",
    format: "Livre numérique",
  },
  {
    id: "astre",
    name: "Double Astre",
    price: 97,
    kicker: "Lune & Soleil",
    description:
      "Protocole de 14 jours. Remettre l'ombre et la clarté sur le même axe.",
    format: "Audio + feuille de pratique",
  },
  {
    id: "arbre",
    name: "L'Arbre Fermé",
    price: 490,
    kicker: "Cercle restreint",
    description:
      "Trente jours près du Guide. Ancrage, lecture de chemin, sceau personnel.",
    format: "Transmission privée · 30 jours",
  },
];

export const shopBio =
  "Temple Sirius. La boutique de Guide Sirius, école Conscience Kongo. On n'y vend pas du rêve : on y transmet des seuils. Ankh, aigle, arbre, lune et soleil — quatre portes pour qui veut la vérité, la racine et la hauteur. Entre seulement si tu es prêt à voir.";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
