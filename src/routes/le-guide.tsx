import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { stations } from "@/lib/stations";
import { SITE_URL, WHATSAPP_DISPLAY, waLink } from "@/lib/temple";

export const Route = createFileRoute("/le-guide")({
  head: () => ({
    meta: [
      { title: "Guide Sirius — Temple Sirius" },
      {
        name: "description",
        content:
          "Le visage officiel de Guide Sirius et les huit stations de sa voie : du réveil de la conscience à l'épreuve ultime.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/le-guide` }],
  }),
  component: Guide,
});

function Guide() {
  const [tab, setTab] = useState<"visage" | "stations">("visage");
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
      title="Un visage. Huit stations. Pas un spectacle."
      lede="C'est le visage officiel de Guide Sirius. Les huit images disent le chemin qu'il tient. Elles n'ouvrent pas le seuil : la commande, elle, reste sur WhatsApp."
      crumbs={[{ label: "Le Guide" }]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <div className="mb-8 flex flex-col gap-3 border border-gold bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Pour entrer : {WHATSAPP_DISPLAY}. Le Guide répond sous vingt-quatre heures.
        </p>
        <a
          href={waLink("Bonjour Guide Sirius, je souhaite entrer dans le Temple.")}
          className="inline-flex min-h-11 items-center justify-center bg-gold px-5 text-sm font-medium text-bg"
        >
          Commander via WhatsApp
        </a>
      </div>
      <div role="tablist" aria-label="Le Guide" className="flex gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "visage"}
          className={
            tab === "visage"
              ? "min-h-11 border border-gold bg-gold px-4 text-sm font-medium text-bg"
              : "min-h-11 border border-line px-4 text-sm text-muted"
          }
          onClick={() => setTab("visage")}
        >
          Le visage
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "stations"}
          className={
            tab === "stations"
              ? "min-h-11 border border-gold bg-gold px-4 text-sm font-medium text-bg"
              : "min-h-11 border border-line px-4 text-sm text-muted"
          }
          onClick={() => setTab("stations")}
        >
          Les huit stations
        </button>
      </div>

      {tab === "visage" ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.1fr]" role="tabpanel">
          <img
            src="/brand/guide-visage.webp"
            alt="Portrait officiel de Guide Sirius, voile blanc, regard levé."
            className="w-full border border-line object-cover"
          />
          <div className="grid content-start gap-4 text-muted">
            <p>
              Guide Sirius veille sur le seuil de Conscience Kongo. Il indique. Il ne raccourcit pas le chemin, et il ne promet pas de te changer en une veille.
            </p>
            <p>
              Sa légitimité n'est pas un titre affiché. Elle se reconnaît à ceci : après le travail, on ment moins. On négocie moins avec soi.
            </p>
            <p>
              Les huit stations à côté racontent cette tenue : le réveil, le combat intérieur, les chaînes, les faux guides, le pouvoir, la mémoire, le collectif, l'épreuve.
            </p>
            <button type="button" className="min-h-11 justify-self-start text-left text-gold" onClick={() => setTab("stations")}>
              Voir les huit stations
            </button>
          </div>
        </div>
      ) : (
        <ol className="mt-8 grid gap-10" role="tabpanel">
          {stations.map((station) => (
            <li key={station.n} className="grid gap-4 border border-line lg:grid-cols-[16rem_1fr] lg:items-start">
              <img
                src={station.src}
                alt={`${station.n}. ${station.title}. Planche officielle de Guide Sirius.`}
                className="w-full"
              />
              <div className="p-5">
                <p className="font-display text-gold">{station.n}</p>
                <h2 className="mt-1 font-display text-2xl">{station.title}</h2>
                <p className="mt-3 max-w-md text-muted">{station.line}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Page>
  );
}
