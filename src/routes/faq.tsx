import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL, WHATSAPP_DISPLAY } from "@/lib/temple";

const faqs = [
  { q: "Comment commander ?", a: "Chaque seuil a un bouton WhatsApp. Le message part déjà écrit, avec le nom, le prix et une référence. Tu ajoutes ton nom. Guide Sirius répond." },
  { q: "À quoi sert la référence dans le message ?", a: "C'est le numéro de l'intention, du type CK-7F3A. Garde-le. Le Guide s'en sert pour confirmer ton règlement." },
  { q: "Quel numéro ?", a: `${WHATSAPP_DISPLAY}. C'est le seul numéro de commande.` },
  { q: "Puis-je payer par carte ?", a: "Le bouton est actif. Si le compte carte n'est pas encore relié, il le dit et rien n'est débité. La commande ouverte aujourd'hui est WhatsApp : Mobile Money, virement, ou le lien que le Guide envoie." },
  { q: "Quand arrive l'accès ?", a: "Après confirmation du règlement, sous 24 h en général. Le lien vient par WhatsApp, et par email si tu l'as laissé." },
  { q: "Puis-je être remboursé ?", a: "Oui, sept jours, tant que l'accès n'a pas été ouvert. Une fois le lien envoyé, le seuil est franchi." },
  { q: "Par où commencer ?", a: "Par Le Chemin. Porte 1 si tu arrives. L'Aigle de Sirius est le cœur, pas la première marche." },
  { q: "Est-ce une religion ?", a: "Non. L'école ne retire pas ta foi et n'en impose pas une. Elle demande de cesser de te mentir." },
  { q: "Les prix en francs et en dollars ?", a: "Indicatifs, à taux fixe. Le prix qui compte est en euros, confirmé sur WhatsApp." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Temple Sirius" },
      { name: "description", content: "Commande, paiement, remboursement et première porte du Temple Sirius." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <Page kicker="FAQ" title="Les questions qui reviennent." crumbs={[{ label: "FAQ" }]}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <div className="grid max-w-3xl gap-3">
        {faqs.map((item) => (
          <details key={item.q} className="border border-line p-4">
            <summary className="cursor-pointer">{item.q}</summary>
            <p className="mt-2 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Page>
  );
}
