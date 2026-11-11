import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { confirmSession } from "@/lib/checkout.functions";
import { SITE_URL, WHATSAPP_DISPLAY, waLink } from "@/lib/temple";

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
  const [name, setName] = useState("");
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) return;
    void confirmSession({ data: { sessionId } }).then((result) => {
      if (result.ok) setName(result.productName);
    });
  }, []);
  const subject = name || "mon seuil";
  return (
    <Page kicker="Reçu" title="Le règlement est pris en compte." crumbs={[{ label: "Paiement" }]}>
      <div className="max-w-xl space-y-4 text-muted">
        <p>
          {name
            ? `« ${name} » est confirmé.`
            : "Si tu arrives ici après un paiement par carte, l'accès suit."}{" "}
          Guide Sirius envoie le fichier — le livre, ou l'ouverture du seuil — sur le numéro ou le courriel du paiement.
        </p>
        <p>Délai : dans l'heure, aux horaires de Kinshasa. Garde cette page.</p>
        <p>Rien reçu ? Écris. Le Temple vérifie et renvoie l'accès. {WHATSAPP_DISPLAY}.</p>
        <a
          href={waLink(`Bonjour Guide Sirius, je viens de payer par carte ${subject}. J'attends l'accès.`)}
          className="inline-flex min-h-11 items-center bg-gold px-5 font-medium text-bg"
        >
          Écrire si l'accès tarde
        </a>
      </div>
    </Page>
  );
}
