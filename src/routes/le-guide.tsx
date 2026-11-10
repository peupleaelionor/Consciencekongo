import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { stations } from "@/lib/stations";
import { SITE_URL, waLink } from "@/lib/temple";

export const Route = createFileRoute("/le-guide")({
  head: () => ({
    meta: [
      { title: "Guide Sirius — Temple Sirius" },
      {
        name: "description",
        content:
          "Les huit stations de Guide Sirius, de Conscience Kongo. Le réveil, le combat, la mémoire, l'épreuve.",
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
    image: `${SITE_URL}/brand/guide-visage.webp`,
    url: `${SITE_URL}/le-guide`,
  };
  return (
    <Page
      kicker="Le Guide"
      title="Il indique. Il ne raccourcit pas."
      lede="Huit stations. On ne vient pas pour un visage. On vient pour voir comment la voie se tient."
      crumbs={[{ label: "Le Guide" }]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <div className="flex items-center gap-4">
        <img
          src="/brand/guide-visage.webp"
          alt="Guide Sirius."
          className="h-16 w-16 shrink-0 border border-line object-cover object-top"
        />
        <p className="text-sm text-muted">Guide Sirius · Conscience Kongo</p>
      </div>
      <ol className="mt-14 grid gap-14">
        {stations.map((station) => (
          <li key={station.n} className="mx-auto w-full max-w-sm">
            <img
              src={station.src}
              alt={`${station.n}. ${station.title}. Planche officielle de Guide Sirius.`}
              className="w-full border border-line"
            />
            <p className="mt-4 font-display text-sm text-gold">{station.n}</p>
            <h2 className="mt-1 font-display text-xl">{station.title}</h2>
            <p className="mt-2 text-sm text-muted">{station.line}</p>
          </li>
        ))}
      </ol>
      <p className="mt-16 text-sm text-muted">
        Le seuil se commande à part.{" "}
        <a href={waLink("Bonjour Guide Sirius, je souhaite entrer dans le Temple.")} className="text-gold">
          Écrire au Guide
        </a>
      </p>
    </Page>
  );
}
