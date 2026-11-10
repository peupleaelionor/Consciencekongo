import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/cancel")({
  head: () => ({
    meta: [
      { title: "Paiement interrompu — Temple Sirius" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cancel` }],
  }),
  component: Cancel,
});

function Cancel() {
  return (
    <Page kicker="Carte" title="Rien n'a été pris." crumbs={[{ label: "Paiement" }]}>
      <p className="max-w-xl text-muted">
        Si un paiement carte est annulé, tu reviens ici. Le seuil reste commandable sur WhatsApp.
      </p>
      <Link to="/seuils" className="mt-6 inline-flex min-h-11 items-center text-gold">
        Revenir aux seuils
      </Link>
    </Page>
  );
}
