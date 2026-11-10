import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { echoes } from "@/lib/echoes";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/temoignages")({
  head: () => ({
    meta: [
      { title: "Témoignages — Temple Sirius" },
      {
        name: "description",
        content: "Paroles reçues par le Temple Sirius, de Kinshasa, Brazzaville, Paris, Lubumbashi, Bruxelles et Lyon.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/temoignages` }],
  }),
  component: Temoignages,
});

function Temoignages() {
  return (
    <Page
      kicker="Témoignages"
      title="Ce qu'ils ont dit après le seuil."
      lede="Des paroles transmises au Temple. Pas des notes, pas des étoiles. Un prénom, une ville, un effet."
      crumbs={[{ label: "Témoignages" }]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {echoes.map((echo) => (
          <blockquote key={echo.id} className="border border-line p-5">
            <p>{echo.text}</p>
            <footer className="mt-4 text-sm text-muted">
              {echo.name}, {echo.city}
              <span className="block text-gold">{echo.about}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </Page>
  );
}
