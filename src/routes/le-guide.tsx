import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL, WHATSAPP_DISPLAY, waLink } from "@/lib/temple";

export const Route = createFileRoute("/le-guide")({
  head: () => ({
    meta: [
      { title: "Guide Sirius — Temple Sirius" },
      {
        name: "description",
        content:
          "Guide Sirius veille sur le seuil de Conscience Kongo. Une fonction, pas une scène. École de racine et de conscience.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/le-guide` }],
  }),
  component: Guide,
});

function Guide() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Guide Sirius",
    affiliation: "Conscience Kongo",
    url: `${SITE_URL}/le-guide`,
  };
  return (
    <Page
      kicker="Le Guide"
      title="Il indique. Il ne raccourcit pas le chemin."
      lede="Guide Sirius est la fonction qui veille sur le seuil. Pas un personnage de scène. Sirius, dans la nuit, ne crie pas."
      crumbs={[{ label: "Le Guide" }]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <img
            src="/brand/hero-sirius.webp"
            alt="Bougie noire dans le sable, fumée, une étoile dans le ciel nocturne. Sirius."
            className="w-full object-cover"
          />
          <img
            src="/brand/logo.jpg"
            alt="Sceau officiel Conscience Kongo, Guide Sirius."
            className="mt-4 w-40 border border-line"
          />
        </div>
        <div className="grid gap-4 text-muted">
        <p>
          L'école Conscience Kongo existe parce qu'un être qui oublie sa racine finit par parler avec une voix qui n'est pas la sienne. Le Guide tient la lampe pendant la descente, puis pendant la remontée. Il ne promet pas de te changer en une veille.
        </p>
        <p>
          Sa légitimité n'est pas un titre affiché. Elle se reconnaît à ceci : après le travail, on ment moins. On négocie moins avec soi. On ne hait personne pour se sentir réel.
        </p>
        <p>
          Le Temple ne sépare pas l'éveil de la racine kongo. Les symboles — aigle, arbre, ankh, Sirius, lune et soleil — sont les mesures du travail, pas un décor.
        </p>
        <p>
          Pour écrire : {WHATSAPP_DISPLAY}. Réponse sous vingt-quatre heures, heure de Kinshasa.
        </p>
        <a href={waLink("Bonjour Guide Sirius, je souhaite te parler de la voie.")} className="inline-flex min-h-11 items-center text-gold">
          Écrire à Guide Sirius
        </a>
        </div>
      </div>
    </Page>
  );
}
