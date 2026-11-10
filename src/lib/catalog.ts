export type Faq = { q: string; a: string };

export type Product = {
  id: string;
  name: string;
  price: number;
  period?: "mois";
  kicker: string;
  description: string;
  long: string;
  format: string;
  cover: string;
  door: 1 | 2 | 3;
  kind: "livre" | "formation" | "cercle";
  featured?: boolean;
  includes: string[];
  forWhom: string;
  notThis: string;
  summary: string[];
  faq: Faq[];
};

export const products: Product[] = [
  {
    id: "purification",
    name: "Rituels de Purification",
    price: 37,
    kicker: "Porte 1 · Livre",
    description: "Préparer le corps et l'esprit avant d'entrer. Le livre d'entrée du Chemin.",
    long: "On ne commence pas une voie en courant. Rituels de Purification pose le premier geste : laver ce qui encombre, sans théâtre et sans peur. Le livre donne des rites simples, tenus, que l'on peut pratiquer chez soi, avec de l'eau, du silence et un temps fixé.",
    format: "Livre numérique · français",
    cover: "/brand/livre-purification.webp",
    door: 1,
    kind: "livre",
    includes: [
      "Le livre complet, à relire",
      "Une pratique par jour pendant sept jours",
      "Ce qu'il faut, et ce qu'il ne faut pas, pour un rite juste",
    ],
    forWhom: "Pour qui arrive, et veut un premier geste concret avant toute formation.",
    notThis: "Ce n'est pas un grimoire de puissance, ni une promesse de résultat en une nuit.",
    summary: ["Pourquoi se purifier", "L'eau, le souffle, le seuil", "Sept jours de pratique", "Ce que l'on cesse"],
    faq: [
      { q: "Faut-il du matériel ?", a: "De l'eau, un récipient propre, un lieu calme. Rien d'acheté n'est exigé." },
      { q: "Combien de temps ?", a: "Une lecture lente, puis sept jours courts." },
      { q: "Et après ?", a: "La porte suivante est Le Début sur la Voie, ou Le Sceau d'Ankh." },
    ],
  },
  {
    id: "debut",
    name: "Le Début sur la Voie",
    price: 67,
    kicker: "Porte 2 · Livre et guide",
    description: "Les bases : d'où vient la voie, comment tenir un rite, comment ne pas se mentir.",
    long: "Le Début sur la Voie est le livre de fondation. Il dit ce que Conscience Kongo entend par conscience, par racine, par seuil. Il donne les premiers repères — aigle, arbre, ankh, Sirius, lune et soleil — et une manière de pratiquer sans se perdre dans le spectacle.",
    format: "Livre numérique + guide pratique",
    cover: "/brand/livre-debut.webp",
    door: 2,
    kind: "livre",
    includes: ["Le livre de fondation", "Un guide pratique à garder", "Le vocabulaire juste de l'école"],
    forWhom: "Pour qui a fait le premier geste et veut comprendre avant d'aller plus haut.",
    notThis: "Ce n'est pas une initiation à distance complète. C'est la fondation.",
    summary: ["Le nom de l'école", "Les symboles, sans folklore", "Tenir un rite", "La prochaine porte"],
    faq: [
      { q: "Dois-je avoir lu Rituels de Purification ?", a: "C'est le bon ordre. Ce n'est pas une obligation absolue." },
      { q: "Langue ?", a: "Français, écrit pour être lu à voix basse." },
      { q: "Accès ?", a: "Après confirmation du paiement sur WhatsApp, le lien arrive par message." },
    ],
  },
  {
    id: "sceau",
    name: "Le Sceau d'Ankh",
    price: 47,
    kicker: "Seuil d'entrée",
    description: "Le manuel du seuil. Qui tu es, d'où vient ta lignée, et ce que tu cesses de négocier.",
    long: "Le Sceau d'Ankh pose le nom. Pas une opinion : une limite. Ce manuel dit d'où vient la mémoire que l'école honore, et quelles négociations intérieures doivent cesser pour qu'un seuil suivant ait un sens.",
    format: "Livre numérique",
    cover: "/brand/logo.jpg",
    door: 2,
    kind: "livre",
    includes: ["Le manuel du seuil", "Les lois du premier nom", "Une lecture tenue, sans exercice gadget"],
    forWhom: "Pour qui veut éprouver l'école avant la formation centrale.",
    notThis: "Ce n'est pas un bijou symbolique à porter. C'est un texte qui demande une réponse.",
    summary: ["Le seuil", "La lignée", "Ce que l'on cesse", "Le sceau"],
    faq: [
      { q: "Différence avec Rituels de Purification ?", a: "L'un prépare le geste. L'autre pose le nom." },
      { q: "Durée de lecture ?", a: "Une soirée lente, puis des retours." },
      { q: "Remboursement ?", a: "Sept jours, tant que l'accès n'a pas été ouvert." },
    ],
  },
  {
    id: "astre",
    name: "Double Astre",
    price: 97,
    kicker: "Lune et Soleil",
    description: "Quatorze jours pour remettre l'ombre et la clarté sur le même axe.",
    long: "Le jour dit une chose. La nuit en défait une autre. Double Astre est le protocole qui réunit ces deux temps : quatorze guidances, une feuille, un rythme. À la fin, tu sais où ta clarté contredit ton ombre.",
    format: "Audio + feuille de pratique · 14 jours",
    cover: "/brand/hero-sirius.webp",
    door: 2,
    kind: "formation",
    includes: ["14 guidances audio", "La feuille de pratique", "Un rythme quotidien, bref"],
    forWhom: "Pour qui a compris quelque chose et n'arrive pas à le vivre.",
    notThis: "Ce n'est pas une méditation de bien-être. C'est un axe.",
    summary: ["Le jour", "La nuit", "Le même axe", "Quatorze mesures"],
    faq: [
      { q: "Faut-il être disponible chaque jour ?", a: "Oui, un temps court. Sinon, attends une quinzaine plus calme." },
      { q: "Langue des audios ?", a: "Français." },
      { q: "Puis-je le prendre avec L'Aigle ?", a: "Oui. Double Astre prépare souvent le vol." },
    ],
  },
  {
    id: "aigle",
    name: "L'Aigle de Sirius",
    price: 247,
    kicker: "Produit phare",
    description: "La formation du Temple. Voir d'en haut, couper l'illusion, reprendre ta souveraineté.",
    long: "L'Aigle de Sirius est le cœur de Conscience Kongo. Huit modules pour changer d'altitude sans quitter la terre : nommer le faux, cesser de négocier, revenir à une parole intérieure qui ne tremble plus dès que le monde contredit.",
    format: "8 modules · accès permanent",
    cover: "/brand/hero-temple.webp",
    door: 2,
    kind: "formation",
    featured: true,
    includes: ["8 modules transmis par Guide Sirius", "Les repères de l'école", "Un accès permanent"],
    forWhom: "Pour qui a assez tourné autour de la vérité et veut la tenir.",
    notThis: "Ce n'est pas une personnalité nouvelle à exhiber. C'est une vue.",
    summary: ["Voir", "Couper", "Nommer", "Tenir", "La parole", "La lignée", "Le faux", "La hauteur"],
    faq: [
      { q: "Par où si je débute ?", a: "Rituels de Purification ou Le Sceau d'Ankh. L'Aigle est le cœur, pas la porte d'entrée forcée." },
      { q: "Accès ?", a: "Permanent, ouvert après paiement confirmé sur WhatsApp." },
      { q: "Carte bancaire ?", a: "Pas encore. WhatsApp règle aujourd'hui : Mobile Money, virement, ou le lien que le Guide envoie." },
    ],
  },
  {
    id: "arbre",
    name: "L'Arbre Fermé",
    price: 490,
    kicker: "Cercle restreint",
    description: "Trente jours près du Guide. Ancrage, lecture de chemin, sceau personnel.",
    long: "L'Arbre Fermé est le cercle proche. Trente jours : d'abord l'ancrage, ensuite la lecture du chemin, à la fin un sceau personnel. Peu de places. Une attention réelle. On n'y entre pas pour appartenir. On y entre pour être remis à sa verticale.",
    format: "Accompagnement · 30 jours",
    cover: "/brand/chemin.webp",
    door: 3,
    kind: "cercle",
    includes: ["Trente jours avec Guide Sirius", "Ancrage", "Lecture de chemin", "Sceau personnel"],
    forWhom: "Pour qui peut être là, vraiment, pendant un mois.",
    notThis: "Ce n'est pas un fichier que l'on consomme seul.",
    summary: ["Ancrer", "Être lu", "Couper", "Recevoir le sceau"],
    faq: [
      { q: "Combien de places ?", a: "Le cercle reste fermé. Le Guide confirme s'il peut te prendre ce mois-là." },
      { q: "Faut-il avoir pris L'Aigle ?", a: "C'est le chemin le plus juste. Le Temple peut faire exception." },
      { q: "Comment paie-t-on ?", a: "La commande part sur WhatsApp. Le règlement se fait avant l'ouverture du cercle." },
    ],
  },
  {
    id: "continue",
    name: "Formation Continue",
    price: 37,
    period: "mois",
    kicker: "Porte 3 · WhatsApp",
    description: "Le suivi de la voie : une présence mensuelle, des repères, une question qui avance.",
    long: "La voie ne s'arrête pas à un fichier. Formation Continue est l'accompagnement sur WhatsApp : un fil tenu avec le Temple, un rythme mensuel, de quoi ne pas retomber dans le bruit une fois le seuil franchi.",
    format: "Accompagnement WhatsApp · mensuel",
    cover: "/brand/rituel-bougie.webp",
    door: 3,
    kind: "cercle",
    includes: ["Un fil WhatsApp avec le Temple", "Un repère chaque mois", "La possibilité de poser une question nette"],
    forWhom: "Pour qui a commencé et ne veut pas rester seul avec des notes.",
    notThis: "Ce n'est pas un groupe bruyant, ni une hotline sans limite.",
    summary: ["Rester", "Demander juste", "Revenir au rite"],
    faq: [
      { q: "Engagement ?", a: "Un mois. Tu peux t'arrêter avant le suivant." },
      { q: "Délai de réponse ?", a: "Sous 24 h, dans les horaires de Kinshasa." },
      { q: "Remplace-t-il L'Arbre Fermé ?", a: "Non. Le cercle est une lecture proche. La continue est la tenue." },
    ],
  },
];

export const shopBio =
  "Temple Sirius. La boutique de Guide Sirius, école Conscience Kongo. On n'y vend pas du rêve : on y transmet des seuils. Quatre portes, et le Chemin pour savoir laquelle est la tienne.";

export function formatPrice(value: number, period?: "mois") {
  const base = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
  return period === "mois" ? `${base} / mois` : base;
}

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export const books = products.filter((product) => product.kind === "livre");
export const formations = products.filter((product) => product.kind !== "livre");
