import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { OrderActions, PriceBlock } from "@/components/order";
import { productById } from "@/lib/catalog";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/formation-continue")({
  head: () => ({
    meta: [
      { title: "Formation continue — Temple Sirius" },
      {
        name: "description",
        content: "Accompagnement mensuel sur WhatsApp avec Guide Sirius. 70 euros par mois.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/formation-continue` }],
  }),
  component: Continue,
});

function Continue() {
  const product = productById("continue");
  if (!product) return null;
  return (
    <Page
      kicker="Porte 3"
      title="Rester sur la voie, un mois à la fois."
      lede={product.long}
      crumbs={[{ label: "Formation continue" }]}
    >
      <img
        src="/brand/rituel-encens.webp"
        alt="Bougie noire et fumée d'encens sur une grille, lumière basse."
        className="mb-8 max-h-80 w-full object-cover"
      />
      <PriceBlock product={product} />
      <ul className="mt-6 space-y-2 text-muted">
        {product.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-6">
        <OrderActions product={product} />
      </div>
    </Page>
  );
}
