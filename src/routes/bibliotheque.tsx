import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { OrderActions, PriceBlock } from "@/components/order";
import { books } from "@/lib/catalog";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/bibliotheque")({
  head: () => ({
    meta: [
      { title: "Bibliothèque — Temple Sirius" },
      {
        name: "description",
        content:
          "Livres numériques de Conscience Kongo : Rituels de Purification, Le Début sur la Voie, Le Sceau d'Ankh.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/bibliotheque` }],
  }),
  component: Bibliotheque,
});

function Bibliotheque() {
  return (
    <Page
      kicker="Bibliothèque"
      title="Des livres pour entrer, pas pour décorer."
      lede="Trois textes. Tu les commandes sur WhatsApp. Le lien arrive quand le règlement est confirmé."
      crumbs={[{ label: "Bibliothèque" }]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {books.map((book) => (
          <article key={book.id} className="flex flex-col border border-line">
            <Link to="/seuils/$id" params={{ id: book.id }} className="relative block">
              <img
                src={book.cover}
                alt={`Couverture de ${book.name}.`}
                className="aspect-[4/5] w-full object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent px-4 pt-10 pb-4 font-display text-xl text-gold">
                {book.name}
              </span>
            </Link>
            <div className="flex flex-1 flex-col p-5">
            <p className="flex-1 text-sm text-muted">{book.description}</p>
            <div className="mt-4">
              <PriceBlock product={book} />
            </div>
            <div className="mt-4">
              <OrderActions product={book} />
            </div>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
