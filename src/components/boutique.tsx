import { Link } from "@tanstack/react-router";
import { books, formations, shopBio } from "@/lib/catalog";
import { echoes } from "@/lib/echoes";
import { OrderActions, PriceBlock } from "@/components/order";
import { WHATSAPP_DISPLAY, WHATSAPP_E164, waLink } from "@/lib/temple";
import { useCart } from "@/lib/cart";

export function Boutique() {
  return (
    <main id="contenu">
      <section className="relative min-h-[82vh] overflow-hidden">
        <img
          src="/brand/hero-temple.webp"
          alt="Chemin de pierre mouillée entre des lanternes, la nuit, vers le Temple."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/25" />
        <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-end px-4 py-16">
          <p className="font-display text-xs tracking-widest text-gold">Guide Sirius · Conscience Kongo</p>
          <h1 className="mt-4 max-w-xl font-display text-4xl text-fg sm:text-6xl">Revenir à ce qui ne ment pas.</h1>
          <p className="mt-5 max-w-xl text-muted">{shopBio}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a
              href={waLink("Bonjour Guide Sirius, je souhaite entrer dans le Temple.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center bg-gold px-6 font-medium text-bg"
            >
              Commander via WhatsApp
            </a>
            <a className="min-h-11 text-sm text-gold" href={`tel:+${WHATSAPP_E164}`}>
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-14 md:grid-cols-3">
          {[
            ["Porte 1", "Purification", "Le geste d'eau. Le livre d'entrée.", "/le-chemin"],
            ["Porte 2", "Fondations", "Les noms justes, puis la vue.", "/le-chemin"],
            ["Porte 3", "Voie continue", "Le fil WhatsApp, et le cercle proche.", "/le-chemin"],
          ].map(([step, title, copy, href]) => (
            <Link key={step} to={href as "/le-chemin"} className="border border-line bg-bg p-5">
              <p className="font-display text-gold">{step}</p>
              <h2 className="mt-2 font-display text-2xl">{title}</h2>
              <p className="mt-2 text-sm text-muted">{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl">Les seuils</h2>
          <Link to="/seuils" className="text-sm text-gold">Tout voir</Link>
        </div>
        <div className="mt-6 grid gap-4">
          {formations.map((product) => (
            <article key={product.id} className="grid gap-4 border border-line p-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center">
              <img
                src={product.cover}
                alt=""
                className="h-28 w-full object-cover sm:h-24 sm:w-28"
              />
              <div>
                <p className="text-xs tracking-widest text-gold">{product.kicker}</p>
                <h3 className="mt-1 font-display text-2xl">
                  <Link to="/seuils/$id" params={{ id: product.id }}>{product.name}</Link>
                </h3>
                <p className="mt-2 max-w-xl text-muted">{product.description}</p>
              </div>
              <div className="grid gap-3">
                <PriceBlock product={product} />
                <OrderActions product={product} />
                <button
                  type="button"
                  className="min-h-11 text-left text-sm text-muted"
                  onClick={() => useCart.getState().add(product.id)}
                >
                  Ajouter au panier
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl">La bibliothèque</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {books.map((book) => (
              <article key={book.id} className="border border-line bg-bg">
                <Link to="/seuils/$id" params={{ id: book.id }} className="relative block">
                  <img
                    src={book.cover}
                    alt={`Couverture de ${book.name}. Livre noir, marque d'or, titre posé par le Temple.`}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent px-4 pt-10 pb-4 font-display text-xl text-gold">
                    {book.name}
                  </span>
                </Link>
                <div className="p-5">
                <p className="text-sm text-muted">{book.description}</p>
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-3xl">Paroles reçues</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {echoes.slice(0, 3).map((echo) => (
            <blockquote key={echo.id} className="border border-line p-5">
              <p className="text-fg">{echo.text}</p>
              <footer className="mt-4 text-sm text-muted">
                {echo.name}, {echo.city}
                <span className="block text-gold">{echo.about}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <Link to="/temoignages" className="mt-6 inline-flex min-h-11 items-center text-gold">
          Toutes les paroles
        </Link>
      </section>
    </main>
  );
}
