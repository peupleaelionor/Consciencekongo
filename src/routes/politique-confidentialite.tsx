import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL, WHATSAPP_DISPLAY } from "@/lib/temple";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Confidentialité — Temple Sirius" },
      { name: "description", content: "Ce que Temple Sirius conserve, et ce qu'il ne piste pas." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/politique-confidentialite` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <Page kicker="Droit" title="Politique de confidentialité" crumbs={[{ label: "Confidentialité" }]}>
      <div className="max-w-2xl space-y-3 text-muted">
        <p>Responsable : Conscience Kongo, Guide Sirius. Contact : {WHATSAPP_DISPLAY}.</p>
        <p>Le site enregistre ton panier dans la mémoire de ton navigateur, sur ton appareil. Ce n'est pas envoyé à un serveur du Temple tant que tu n'ouvres pas WhatsApp.</p>
        <p>Quand tu écris sur WhatsApp, la conversation est traitée par WhatsApp et par le Temple pour répondre à ta commande. Données utiles : nom, téléphone, ville, email si tu le donnes, seuils choisis.</p>
        <p>Pas de publicité ciblée. Pas de revente. Pas d'outil de heatmap tant qu'il n'est pas annoncé ici, avec ton accord.</p>
        <p>Tu peux demander l'accès, la correction ou l'effacement de ce que le Temple a gardé de toi, par le même numéro. Délai : un mois.</p>
        <p>Hébergement : Vercel. Le bandeau du site ne sert qu'à rappeler ce stockage local.</p>
      </div>
    </Page>
  );
}
