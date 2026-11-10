import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { OrderActions, PriceBlock } from "@/components/order";
import { productById } from "@/lib/catalog";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/le-chemin")({
  head: () => ({
    meta: [
      { title: "Le Chemin — Temple Sirius" },
      {
        name: "description",
        content:
          "Trois portes pour entrer dans Conscience Kongo : purification, fondations, voie continue. Guide Sirius.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/le-chemin` }],
  }),
  component: Chemin,
});

const doors = [
  {
    id: "purification",
    step: "Porte 1",
    title: "Purification",
    sense: "L'eau est froide. Le geste est court. Quelque chose se tait.",
    receive: "Un livre, sept jours, un refus nommé.",
    length: "Sept jours, chez toi.",
  },
  {
    id: "debut",
    step: "Porte 2",
    title: "Fondations",
    sense: "Les noms retrouvent leur poids. Le costume tombe.",
    receive: "Le livre de fondation, puis les seuils si tu tiens.",
    length: "Une lecture, puis le rythme que tu choisis.",
  },
  {
    id: "continue",
    step: "Porte 3",
    title: "Voie continue",
    sense: "Un fil qui ne te lâche pas quand le cahier se ferme.",
    receive: "WhatsApp mensuel. L'Arbre Fermé si tu veux être lu de près.",
    length: "Un mois, renouvelable.",
  },
] as const;

function Chemin() {
  return (
    <Page
      kicker="Le Chemin"
      title="Trois portes. Pas de sommet en premier."
      lede="On entre par le geste, puis par les noms, puis par la tenue. Chaque porte a un prix clair et un message déjà écrit pour Guide Sirius."
      crumbs={[{ label: "Le Chemin" }]}
    >
      <img
        src="/brand/chemin.webp"
        alt="Chemin de pierre mouillée, lanternes, vers les trois portes."
        className="mb-8 max-h-[28rem] w-full object-cover"
      />
      <ol className="grid gap-3 border border-line p-4 sm:grid-cols-3">
        {doors.map((door) => (
          <li key={door.id} className="border-l border-gold pl-4">
            <p className="text-xs tracking-widest text-gold">{door.step}</p>
            <p className="font-display text-xl">{door.title}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 grid gap-6">
        {doors.map((door) => {
          const product = productById(door.id);
          if (!product) return null;
          return (
            <article key={door.id} id={door.id} className="border border-line p-5 sm:p-8">
              <p className="font-display text-gold">{door.step}</p>
              <h2 className="mt-2 font-display text-3xl">{door.title}</h2>
              <p className="mt-3 max-w-2xl text-muted">{door.sense}</p>
              <p className="mt-3 text-fg">Tu reçois : {door.receive}</p>
              <p className="text-sm text-muted">{door.length} · {product.format}</p>
              <div className="mt-4">
                <PriceBlock product={product} />
              </div>
              <div className="mt-4">
                <OrderActions product={product} />
              </div>
              <Link to="/seuils/$id" params={{ id: product.id }} className="mt-4 inline-flex min-h-11 items-center text-sm text-gold">
                Voir la fiche
              </Link>
            </article>
          );
        })}
      </div>
    </Page>
  );
}
