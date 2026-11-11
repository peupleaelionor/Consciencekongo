import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL, WHATSAPP_DISPLAY } from "@/lib/temple";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions de vente — Temple Sirius" },
      { name: "description", content: "Conditions de vente des seuils numériques du Temple Sirius." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cgv` }],
  }),
  component: Cgv,
});

function Cgv() {
  return (
    <Page kicker="Droit" title="Conditions de vente" crumbs={[{ label: "Conditions de vente" }]}>
      <div className="max-w-2xl space-y-3 text-muted">
        <p>Les seuils sont des contenus numériques ou des accompagnements. La commande se fait sur WhatsApp, au {WHATSAPP_DISPLAY}. Rien n'est débité sur cette page.</p>
        <p>Le prix en euros indiqué sur la fiche est le prix dû. Le Guide confirme le moyen de règlement : Mobile Money, virement, ou lien de paiement. L'accès s'ouvre après réception.</p>
        <p>Droit de retrait : sept jours, tant que le lien d'accès n'a pas été envoyé. Écris sur WhatsApp avec le nom du seuil. Une fois l'accès ouvert, ou le cercle commencé, la transmission est faite et la somme reste due.</p>
        <p>La Formation Continue est de 70 euros par mois. Elle s'arrête au mois suivant si tu le dis avant l'échéance.</p>
        <p>Le bouton « Payer par carte » n'encaisse rien tant que le compte n'est pas relié. Dans ce cas, la commande reste sur WhatsApp.</p>
      </div>
    </Page>
  );
}
