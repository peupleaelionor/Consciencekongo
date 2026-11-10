import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "Paiement reçu — Temple Sirius" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/success` }],
  }),
  component: Success,
});

function Success() {
  return (
    <Page kicker="Carte" title="Le paiement par carte n'est pas encore ouvert." crumbs={[{ label: "Paiement" }]}>
      <p className="max-w-xl text-muted">
        Cette page accueillera la confirmation Stripe. Aujourd'hui, la commande se fait sur WhatsApp.
      </p>
      <Link to="/contact" className="mt-6 inline-flex min-h-11 items-center text-gold">
        Écrire au Temple
      </Link>
    </Page>
  );
}
