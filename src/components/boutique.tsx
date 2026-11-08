import { useEffect, useId, useState } from "react";
import { formatPrice, products, shopBio, type Product } from "@/lib/catalog";
import { useCart, type Order } from "@/lib/cart";

export function Boutique() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const ids = useCart((state) => state.ids);

  useEffect(() => {
    void useCart.persist.rehydrate();
    setReady(true);
  }, []);

  const count = ready ? ids.length : 0;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#entree" className="flex items-center gap-3">
            <img
              src="/brand/logo.jpg"
              alt="Sceau Conscience Kongo, Guide Sirius"
              className="h-14 w-10 object-cover object-center"
            />
            <span className="leading-tight">
              <span className="block font-display text-sm tracking-widest text-gold">
                Temple Sirius
              </span>
              <span className="block text-xs text-muted">Conscience Kongo</span>
            </span>
          </a>
          <nav className="flex items-center gap-2">
            <a
              href="#seuils"
              className="hidden px-3 py-2 text-sm text-muted sm:inline"
            >
              Les seuils
            </a>
            <a
              href="#voie"
              className="hidden px-3 py-2 text-sm text-muted sm:inline"
            >
              La voie
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="min-h-11 border border-gold bg-surface px-4 text-sm text-gold"
            >
              Panier{count > 0 ? ` · ${count}` : ""}
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section id="entree" className="mx-auto max-w-3xl px-4 py-12 text-center sm:py-16">
          <p className="font-display text-xs tracking-widest text-gold">Guide Sirius</p>
          <img
            src="/brand/logo.jpg"
            alt="Conscience Kongo — Guide Sirius. Aigle, arbre, ankh, lune et soleil."
            className="mx-auto mt-6 w-full max-w-md border border-line"
          />
          <h1 className="mt-8 font-display text-4xl tracking-wide text-fg sm:text-5xl">
            Temple Sirius
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted">{shopBio}</p>
          <a
            href="#seuils"
            className="mt-8 inline-flex min-h-11 items-center border border-gold bg-gold px-6 font-medium text-bg"
          >
            Entrer dans le Temple
          </a>
        </section>

        <section id="seuils" className="border-t border-line bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <p className="font-display text-xs tracking-widest text-gold">Boutique</p>
            <h2 className="mt-2 font-display text-3xl text-fg">Quatre seuils</h2>
            <p className="mt-3 max-w-xl text-muted">
              Numériques. Permanents. Remis après confirmation du Temple — aucun
              prélèvement sur cette page.
            </p>
            <div className="mt-8 grid gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  held={ready && ids.includes(product.id)}
                  onTake={() => {
                    useCart.getState().add(product.id);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="voie" className="mx-auto max-w-6xl px-4 py-14">
          <p className="font-display text-xs tracking-widest text-gold">La voie</p>
          <h2 className="mt-2 font-display text-3xl">Comment le seuil s'ouvre</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Tu choisis", "Un seuil, ou plusieurs. Le phare reste L'Aigle de Sirius."],
              ["02", "Tu réserves", "Nom et adresse. Le Temple confirme l'accès sous 24 heures."],
              ["03", "Tu reçois", "Le contenu numérique arrive par message. Rien ne se perd."],
            ].map(([step, title, copy]) => (
              <li key={step} className="border border-line bg-surface p-5">
                <p className="font-display text-gold">{step}</p>
                <h3 className="mt-2 font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm text-muted">{copy}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted">
        Temple Sirius · Guide Sirius · École Conscience Kongo
      </footer>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function ProductCard({
  product,
  held,
  onTake,
}: {
  product: Product;
  held: boolean;
  onTake: () => void;
}) {
  return (
    <article
      className={
        product.featured
          ? "grid gap-6 border border-gold bg-bg p-5 sm:grid-cols-[auto_1fr] sm:p-8"
          : "grid gap-4 border border-line bg-bg p-5 sm:grid-cols-[1fr_auto] sm:items-center"
      }
    >
      {product.featured ? (
        <img
          src="/brand/logo.jpg"
          alt=""
          className="h-40 w-28 object-cover sm:h-52 sm:w-36"
        />
      ) : null}
      <div className="flex flex-col justify-between gap-4">
        <div>
          <p className="text-xs tracking-widest text-gold">{product.kicker}</p>
          <h3 className="mt-1 font-display text-2xl">{product.name}</h3>
          <p className="mt-2 max-w-xl text-muted">{product.description}</p>
          <p className="mt-2 text-sm text-gold-soft">{product.format}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-display text-2xl text-gold">{formatPrice(product.price)}</p>
          <button
            type="button"
            onClick={onTake}
            disabled={held}
            className="min-h-11 border border-gold px-5 text-sm text-gold disabled:border-line disabled:text-muted"
          >
            {held ? "Déjà dans le panier" : "Réserver ce seuil"}
          </button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ids = useCart((state) => state.ids);
  const remove = useCart((state) => state.remove);
  const place = useCart((state) => state.place);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const titleId = useId();

  const lines = ids
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));
  const total = lines.reduce((sum, line) => sum + line.price, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex justify-end bg-bg/70">
      <button type="button" aria-label="Fermer le panier" className="h-full flex-1" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex h-full w-full max-w-md flex-col border-l border-line bg-surface"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id={titleId} className="font-display text-xl">
            Panier
          </h2>
          <button type="button" onClick={onClose} className="min-h-11 px-3 text-sm text-muted">
            Fermer
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {order ? (
            <div>
              <p className="font-display text-gold">Demande reçue</p>
              <p className="mt-3 text-muted">
                Référence {order.id}. Le Temple confirme l'accès de {order.name} sous
                24 heures, à {order.email}. Aucun paiement n'a été prélevé ici.
              </p>
            </div>
          ) : lines.length === 0 ? (
            <p className="text-muted">Le panier est vide. Choisis un seuil.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <p className="font-display">{line.name}</p>
                    <p className="text-sm text-gold">{formatPrice(line.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.id)}
                    className="min-h-11 text-sm text-muted"
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!order && lines.length > 0 ? (
          <form
            className="border-t border-line px-5 py-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (name.trim().length < 2 || !email.includes("@")) {
                setError("Nom et adresse valides, rien d'autre.");
                return;
              }
              const placed = place(name, email);
              if (placed) {
                setOrder(placed);
                setError("");
              }
            }}
          >
            <p className="font-display text-2xl text-gold">{formatPrice(total)}</p>
            <label className="mt-4 block text-sm text-muted" htmlFor="reserve-name">
              Nom
            </label>
            <input
              id="reserve-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full border border-line bg-bg px-3 py-3 text-fg"
              autoComplete="name"
            />
            <label className="mt-3 block text-sm text-muted" htmlFor="reserve-email">
              Adresse
            </label>
            <input
              id="reserve-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full border border-line bg-bg px-3 py-3 text-fg"
              autoComplete="email"
            />
            {error ? <p className="mt-2 text-sm text-gold-soft">{error}</p> : null}
            <button
              type="submit"
              className="mt-4 min-h-11 w-full bg-gold font-medium text-bg"
            >
              Confirmer la demande
            </button>
            <p className="mt-2 text-xs text-muted">
              Réservation uniquement. Le règlement se fait à la confirmation.
            </p>
          </form>
        ) : null}
      </aside>
    </div>
  );
}
