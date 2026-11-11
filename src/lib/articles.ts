export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: number;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export const articles: Article[] = [
  {
    slug: "rituels-de-purification-ancestraux",
    title: "Sept gestes pour se purifier sans se perdre",
    description:
      "Ce que Conscience Kongo appelle purification : un geste d'eau, une limite, et ce que l'on cesse. Pas un spectacle.",
    date: "2026-11-09",
    minutes: 6,
    image: "/brand/rituel-eau.webp",
    imageAlt: "Bol d'argile, eau noire, une goutte qui touche la surface.",
    paragraphs: [
      "La purification n'est pas une punition. Elle n'est pas non plus un produit que l'on vaporise pour se sentir léger. Dans la voie de Conscience Kongo, se purifier c'est rendre un lieu habitable : le corps, la parole, la journée.",
      "Le premier geste est l'eau. Pas une eau rare, pas une eau vendue. Une eau propre, dans un récipient que l'on respecte. On ne demande pas à l'eau de faire le travail à notre place. On lui demande d'être le témoin d'un arrêt.",
      "Le deuxième geste est le silence court. Deux minutes où l'on ne commente pas ce que l'on sent. La plupart des rites échouent parce qu'on les raconte avant de les avoir tenus.",
      "Le troisième est le refus. On nomme une chose que l'on ne refera pas aujourd'hui. Une seule. La purification sans refus n'est qu'une ambiance.",
      "Les quatre gestes suivants — le souffle, le seuil de la maison, la parole juste, le soir — sont dans le livre Rituels de Purification. Ils ne sont pas secrets pour faire cher. Ils sont écrits pour être faits, pas collectionnés.",
      "Si tu cherches une puissance rapide, ce n'est pas cette porte. Si tu cherches à entrer sans te salir davantage, commence par l'eau.",
    ],
  },
  {
    slug: "comment-debuter-sur-la-voie",
    title: "Comment débuter sur la voie sans folklore",
    description:
      "Par où entrer dans Conscience Kongo : trois portes, un numéro, et ce que l'école ne fera jamais à ta place.",
    date: "2026-11-09",
    minutes: 7,
    image: "/brand/chemin.webp",
    imageAlt: "Chemin de pierre et lanternes, la voie qui commence.",
    paragraphs: [
      "On débute mal quand on commence par le sommet. L'Aigle de Sirius est le cœur du Temple. Ce n'est pas la première marche. Le Chemin a trois portes, dans un ordre qui protège.",
      "Porte 1, la purification. Un livre, sept jours, un geste. Tu vérifies si tu es capable de tenir quelque chose de petit. Si le petit rite tombe, le grand enseignement ne tiendra pas.",
      "Porte 2, les fondations. Le Début sur la Voie, Le Sceau d'Ankh, puis, si le rythme manque, Double Astre. Ici tu apprends les noms justes. Tu cesses d'emprunter des symboles comme on emprunte un costume.",
      "Porte 3, la voie continue. L'Aigle si tu veux la vue. L'Arbre Fermé si tu veux être lu de près. La Formation Continue si tu veux un fil après coup, sur WhatsApp, sans groupe bruyant.",
      "Le Temple ne prend pas la carte aujourd'hui. Tu écris sur WhatsApp, au 082 30 21 893. Le message est déjà préparé sur chaque seuil. Guide Sirius répond sous vingt-quatre heures, heure de Kinshasa, et indique comment régler : Mobile Money, virement, ou le lien qu'il envoie.",
      "Ce que l'école ne fera pas : te promettre un pouvoir, te demander de haïr pour te sentir réel, te vendre une identité de vitrine. Si tu cherches cela, une autre maison te répondra plus vite. Ici, on demande de voir.",
    ],
  },
];

export function articleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
