import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL, WHATSAPP_DISPLAY } from "@/lib/temple";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Temple Sirius" },
      { name: "description", content: "Éditeur, hébergeur et contact du site Temple Sirius." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/mentions-legales` }],
  }),
  component: Mentions,
});

function Mentions() {
  return (
    <Page kicker="Droit" title="Mentions légales" crumbs={[{ label: "Mentions légales" }]}>
      <div className="max-w-2xl space-y-3 text-muted">
        <p>Éditeur : Conscience Kongo, sous la conduite de Guide Sirius. Boutique Temple Sirius.</p>
        <p>Contact : WhatsApp {WHATSAPP_DISPLAY}. Le courriel du domaine sera publié ici dès qu'il est ouvert. En attendant, ce numéro est le seul canal.</p>
        <p>Le nom légal de la structure et l'adresse du siège seront ajoutés par l'éditeur dès qu'ils sont fixés. Ils ne sont pas inventés sur cette page.</p>
        <p>Directeur de la publication : Guide Sirius.</p>
        <p>Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
        <p>Le site présente des transmissions numériques. Les prix affichés en francs congolais et en dollars sont indicatifs.</p>
      </div>
    </Page>
  );
}
