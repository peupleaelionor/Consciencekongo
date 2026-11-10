import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { OrderActions, PriceBlock } from "@/components/order";
import { productById, products, type Product } from "@/lib/catalog";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/seuils/$id")({
  loader: ({ params }) => {
    const product = productById(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    const product = loaderData as Product;
    return {
      meta: [
        { title: `${product.name} — Temple Sirius` },
        { name: "description", content: product.description },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/seuils/${product.id}` }],
    };
  },
  component: Fiche,
  notFoundComponent: () => (
    <Page kicker="Seuil" title="Ce seuil n'existe pas." crumbs={[{ label: "Les Seuils", to: "/seuils" }]}>
      <Link to="/seuils" className="text-gold">Revenir aux seuils</Link>
    </Page>
  ),
});

function Fiche() {
  const product = Route.useLoaderData();
  const others = products.filter((item) => item.id !== product.id).slice(0, 2);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: "Temple Sirius",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/seuils/${product.id}`,
    },
  };
  return (
    <Page
      kicker={product.kicker}
      title={product.name}
      lede={product.long}
      crumbs={[
        { label: product.kind === "livre" ? "Bibliothèque" : "Les Seuils", to: product.kind === "livre" ? "/bibliotheque" : "/seuils" },
        { label: product.name },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="relative max-w-sm">
            <img
              src={product.cover}
              alt={
                product.kind === "livre"
                  ? `Couverture de ${product.name}. Livre noir, marque d'or.`
                  : `Image du seuil ${product.name}.`
              }
              className="w-full border border-line object-cover"
            />
            {product.kind === "livre" ? (
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent px-4 pt-12 pb-4 font-display text-2xl text-gold">
                {product.name}
              </p>
            ) : null}
          </div>
          <h2 className="mt-8 font-display text-2xl">Sommaire</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-muted">
            {product.summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <h2 className="mt-8 font-display text-2xl">Ce que tu reçois</h2>
          <ul className="mt-3 space-y-2 text-muted">
            {product.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">Format : {product.format}. Langue : français. Accès envoyé sur WhatsApp après règlement.</p>
          <h2 className="mt-8 font-display text-2xl">Pour qui</h2>
          <p className="mt-2 text-muted">{product.forWhom}</p>
          <h2 className="mt-8 font-display text-2xl">Ce que ce n'est pas</h2>
          <p className="mt-2 text-muted">{product.notThis}</p>
          <p className="mt-6 border border-gold p-4 text-sm">
            Garantie : sept jours pour te retirer, tant que l'accès n'a pas été ouvert. Ensuite le seuil est franchi.
          </p>
        </div>
        <aside className="h-fit border border-line p-5">
          <PriceBlock product={product} />
          <p className="mt-1 text-xs text-muted">Taux fixe indicatif, pas un cours du jour.</p>
          <div className="mt-4">
            <OrderActions product={product} />
          </div>
        </aside>
      </div>
      <h2 className="mt-12 font-display text-2xl">Questions</h2>
      <div className="mt-4 grid gap-3">
        {product.faq.map((item) => (
          <details key={item.q} className="border border-line p-4">
            <summary className="cursor-pointer font-medium">{item.q}</summary>
            <p className="mt-2 text-muted">{item.a}</p>
          </details>
        ))}
      </div>
      <h2 className="mt-12 font-display text-2xl">À côté</h2>
      <ul className="mt-3 grid gap-2">
        {others.map((item) => (
          <li key={item.id}>
            <Link to="/seuils/$id" params={{ id: item.id }} className="text-gold">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
