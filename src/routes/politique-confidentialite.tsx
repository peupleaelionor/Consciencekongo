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
        <p>Le site enregistre ton panier dans la mémoire de ton navigateur, sur ton appareil.</p>
        <p>Quand tu commandes, une intention est notée : une référence, le seuil, le prix en euros, la date. Si tu laisses ton nom, ton téléphone ou ton email, ils sont joints à cette intention. Le Guide y ajoute la preuve du règlement lorsqu'il confirme. Ce registre sert à suivre la commande, le paiement et l'accès. Il n'est pas vendu. Tu peux en demander l'effacement par le même numéro, sous un mois.</p>
        <p>Pas de publicité ciblée. Pas de revente. Une mesure d'audience ne se charge que si tu choisis « Accepter la mesure ». Elle compte les visites, les clics vers WhatsApp, les clics « Payer par carte » et le fait d'avoir lu les trois quarts d'une page. Rien d'autre. « Essentiels seulement » ne charge rien.</p>
        <p>Quand tu écris sur WhatsApp, la conversation est traitée par WhatsApp et par le Temple. Hébergement du site : Vercel. Hébergement du registre : la base du Temple.</p>
      </div>
    </Page>
  );
}
