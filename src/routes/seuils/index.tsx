import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { OrderActions, PriceBlock } from "@/components/order";
import { formations } from "@/lib/catalog";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/seuils/")({
  head: () => ({
    meta: [
      { title: "Les seuils — Temple Sirius" },
      {
        name: "description",
        content:
          "Formations Conscience Kongo : Double Astre, L'Aigle de Sirius, L'Arbre Fermé, Formation Continue. Commande WhatsApp.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/seuils` }],
  }),
  component: Seuils,
});

function Seuils() {
  return (
    <Page
      kicker="Les seuils"
      title="Ce qui se transmet, et ce que cela coûte."
      lede="Chaque bouton ouvre WhatsApp avec le nom du seuil et le prix. Le règlement se confirme avec Guide Sirius."
      crumbs={[{ label: "Les Seuils" }]}
    >
      <div className="grid gap-4">
        {formations.map((product) => (
          <article key={product.id} className="grid gap-4 border border-line p-5 md:grid-cols-[8rem_1fr_auto] md:items-center">
            <img src={product.cover} alt="" className="h-32 w-full object-contain md:h-28 md:w-32" />
            <div>
              <p className="text-xs tracking-widest text-gold">{product.kicker}</p>
              <h2 className="mt-1 font-display text-2xl">
                <Link to="/seuils/$id" params={{ id: product.id }}>{product.name}</Link>
              </h2>
              <p className="mt-2 max-w-xl text-muted">{product.description}</p>
            </div>
            <div className="grid gap-3">
              <PriceBlock product={product} />
              <OrderActions product={product} />
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
