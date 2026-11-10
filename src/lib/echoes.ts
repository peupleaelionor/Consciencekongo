export type Echo = {
  id: string;
  name: string;
  city: string;
  text: string;
  about: string;
};

/** Paroles transmises au Temple. Pas des notes d'étoiles, pas des avis achetés. */
export const echoes: Echo[] = [
  {
    id: "nsimba",
    name: "Nsimba",
    city: "Kinshasa",
    about: "Rituels de Purification",
    text: "Je cherchais un rite. J'ai trouvé une limite. Depuis, je ne commence plus une journée sans ce geste d'eau.",
  },
  {
    id: "aida",
    name: "Aïda",
    city: "Brazzaville",
    about: "Le Sceau d'Ankh",
    text: "Le livre ne m'a pas flattée. Il m'a rendu un nom que je négociais depuis des années.",
  },
  {
    id: "marc",
    name: "Marc",
    city: "Paris",
    about: "L'Aigle de Sirius",
    text: "J'avais lu trop de choses. L'Aigle m'a fait couper. La vue est plus basse, et plus juste.",
  },
  {
    id: "grace",
    name: "Grâce",
    city: "Lubumbashi",
    about: "Double Astre",
    text: "Quatorze jours. Mon jour et ma nuit ne se contredisent plus du tout de la même façon.",
  },
  {
    id: "joel",
    name: "Joël",
    city: "Bruxelles",
    about: "Formation Continue",
    text: "Le fil WhatsApp m'empêche de refermer le cahier. Une question par mois, et je tiens.",
  },
  {
    id: "sarah",
    name: "Sarah",
    city: "Lyon",
    about: "Le Début sur la Voie",
    text: "Enfin des mots qui ne volent pas la tradition pour en faire un décor.",
  },
];
