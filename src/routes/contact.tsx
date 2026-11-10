import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { SITE_URL, WHATSAPP_DISPLAY, WHATSAPP_E164, WHATSAPP_HOURS, waLink } from "@/lib/temple";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Temple Sirius" },
      {
        name: "description",
        content: `Écrire à Guide Sirius sur WhatsApp au ${WHATSAPP_DISPLAY}. Réponse sous 24 h, heure de Kinshasa.`,
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [error, setError] = useState("");

  return (
    <Page
      kicker="Contact"
      title="Un numéro. Une réponse sous vingt-quatre heures."
      lede={WHATSAPP_HOURS}
      crumbs={[{ label: "Contact" }]}
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="border border-line p-5">
          <p className="font-display text-gold">WhatsApp</p>
          <a className="mt-2 block text-2xl text-fg" href={`https://wa.me/${WHATSAPP_E164}`}>
            {WHATSAPP_DISPLAY}
          </a>
          <a className="mt-2 block text-muted" href={`tel:+${WHATSAPP_E164}`}>
            Appeler
          </a>
          <p className="mt-4 text-sm text-muted">République démocratique du Congo. Le Temple répond depuis Kinshasa.</p>
        </div>
        <form
          className="border border-line p-5"
          onSubmit={(event) => {
            event.preventDefault();
            if (honey) return;
            if (name.trim().length < 2 || phone.trim().length < 8 || message.trim().length < 4) {
              setError("Nom, numéro et un message clair.");
              return;
            }
            const text = `Bonjour Guide Sirius,\nNom : ${name.trim()}\nWhatsApp : ${phone.trim()}\n${message.trim()}`;
            window.open(waLink(text), "_blank", "noopener,noreferrer");
          }}
        >
          <label className="block text-sm text-muted" htmlFor="c-name">Nom</label>
          <input id="c-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required className="mt-1 w-full border border-line bg-bg px-3 py-3" />
          <label className="mt-3 block text-sm text-muted" htmlFor="c-phone">WhatsApp</label>
          <input id="c-phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" required className="mt-1 w-full border border-line bg-bg px-3 py-3" />
          <label className="mt-3 block text-sm text-muted" htmlFor="c-message">Message</label>
          <textarea id="c-message" value={message} onChange={(event) => setMessage(event.target.value)} required rows={4} className="mt-1 w-full border border-line bg-bg px-3 py-3" />
          <label className="sr-only" htmlFor="c-societe">Société</label>
          <input id="c-societe" value={honey} onChange={(event) => setHoney(event.target.value)} tabIndex={-1} autoComplete="off" className="sr-only" />
          {error ? <p className="mt-2 text-sm text-gold-soft" role="alert">{error}</p> : null}
          <button type="submit" className="mt-4 min-h-11 bg-gold px-5 font-medium text-bg">
            Ouvrir WhatsApp
          </button>
        </form>
      </div>
    </Page>
  );
}
