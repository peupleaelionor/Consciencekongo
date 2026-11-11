import { Link } from "@tanstack/react-router";
import { useEffect, useId, useState, type ReactNode } from "react";
import { formatPrice, productById, products, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { WHATSAPP_DISPLAY, WHATSAPP_E164, waLink } from "@/lib/temple";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/le-chemin", label: "Le Chemin" },
  { to: "/seuils", label: "Les Seuils" },
  { to: "/bibliotheque", label: "Bibliothèque" },
  { to: "/formation-continue", label: "Formation continue" },
  { to: "/le-guide", label: "Le Guide" },
  { to: "/temoignages", label: "Témoignages" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [ready, setReady] = useState(false);
  const ids = useCart((state) => state.ids);
  const titleId = useId();

  useEffect(() => {
    void useCart.persist.rehydrate();
    setReady(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearch(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const count = ready ? ids.length : 0;

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-3 focus:text-bg"
      >
        Aller au contenu principal
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-3" aria-label="Temple Sirius, accueil">
            <img
              src="/brand/logo.jpg"
              alt=""
              className="h-14 w-10 object-cover"
            />
            <span className="leading-tight">
              <span className="block font-display text-sm tracking-widest text-gold">Temple Sirius</span>
              <span className="block text-xs text-muted">Conscience Kongo</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={`tel:+${WHATSAPP_E164}`}
              className="hidden min-h-11 items-center px-2 text-sm text-gold xl:inline-flex"
            >
              {WHATSAPP_DISPLAY}
            </a>
            <a
              href={waLink("Bonjour Guide Sirius, je souhaite un renseignement.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center border border-gold px-3 text-sm text-gold lg:inline-flex"
              aria-label="Écrire sur WhatsApp"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setSearch(true)}
              className="min-h-11 px-3 text-sm text-muted"
            >
              Chercher
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="min-h-11 border border-line px-3 text-sm text-gold"
            >
              Panier{count > 0 ? ` · ${count}` : ""}
            </button>
            <button
              type="button"
              className="min-h-11 border border-line px-3 text-sm lg:hidden"
              aria-expanded={menu}
              aria-controls="menu-mobile"
              onClick={() => setMenu(true)}
            >
              Menu
            </button>
          </div>
        </div>
        <nav className="mx-auto hidden max-w-6xl flex-wrap gap-1 px-4 pb-3 lg:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="min-h-11 px-2 py-2 text-sm text-muted"
              activeProps={{ className: "min-h-11 px-2 py-2 text-sm text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
          <div>
            <p className="font-display text-gold">Temple Sirius</p>
            <p className="mt-2 text-sm text-muted">
              Boutique de Guide Sirius, école Conscience Kongo. Kinshasa, et la diaspora.
            </p>
            <a className="mt-3 inline-flex min-h-11 items-center text-gold" href={`tel:+${WHATSAPP_E164}`}>
              {WHATSAPP_DISPLAY}
            </a>
          </div>
          <nav aria-label="Plan du site" className="grid grid-cols-2 gap-2 text-sm">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="min-h-11 text-muted">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Informations" className="grid gap-2 text-sm">
            <Link to="/mentions-legales" className="min-h-11 text-muted">Mentions légales</Link>
            <Link to="/cgv" className="min-h-11 text-muted">Conditions de vente</Link>
            <Link to="/politique-confidentialite" className="min-h-11 text-muted">Confidentialité</Link>
            <a
              className="min-h-11 text-gold"
              href={waLink("Bonjour Guide Sirius, je souhaite commander.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Commander sur WhatsApp
            </a>
          </nav>
        </div>
      </footer>

      <a
        href={waLink("Bonjour Guide Sirius, je souhaite commander.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Commander via WhatsApp"
        className="wa-pulse fixed right-4 bottom-4 z-40 inline-flex min-h-14 min-w-14 items-center justify-center rounded-full bg-gold px-4 text-sm font-medium text-bg"
      >
        WhatsApp
      </a>

      {menu ? (
        <div className="fixed inset-0 z-40 flex flex-col bg-bg" id="menu-mobile" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p id={titleId} className="font-display text-gold">Menu</p>
            <button type="button" className="min-h-11 px-3" onClick={() => setMenu(false)}>
              Fermer
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-h-12 items-center border-b border-line text-lg"
                onClick={() => setMenu(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={waLink("Bonjour Guide Sirius, je souhaite commander.")}
            className="m-4 inline-flex min-h-12 items-center justify-center bg-gold font-medium text-bg"
          >
            Commander via WhatsApp
          </a>
        </div>
      ) : null}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchDialog open={search} onClose={() => setSearch(false)} />
      <Cookies />
      <Measure />
    </div>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ids = useCart((state) => state.ids);
  const remove = useCart((state) => state.remove);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const titleId = useId();
  const lines = ids
    .map((id) => productById(id))
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
    <div className="fixed inset-0 z-50 flex justify-end bg-bg/70">
      <button type="button" className="h-full flex-1" aria-label="Fermer le panier" onClick={onClose} />
      <aside role="dialog" aria-modal="true" aria-labelledby={titleId} className="flex h-full w-full max-w-md flex-col border-l border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id={titleId} className="font-display text-xl">Panier</h2>
          <button type="button" className="min-h-11 px-3 text-sm text-muted" onClick={onClose}>Fermer</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-muted">Le seuil est encore vide. Choisis un livre ou une formation.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex items-start justify-between gap-3 border-b border-line pb-4">
                  <div>
                    <p className="font-display">{line.name}</p>
                    <p className="text-sm text-gold">{formatPrice(line.price, line.period)}</p>
                  </div>
                  <button type="button" className="min-h-11 text-sm text-muted" onClick={() => remove(line.id)}>
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 ? (
          <form
            className="border-t border-line px-5 py-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (name.trim().length < 2 || phone.trim().length < 8) {
                setError("Nom et téléphone, pour que le Guide puisse répondre.");
                return;
              }
              const body = [
                "Bonjour Guide Sirius, je souhaite réserver :",
                "",
                ...lines.map((line) => `- ${line.name} (${formatPrice(line.price, line.period)})`),
                "",
                `Total : ${formatPrice(total)}`,
                "",
                `Nom : ${name.trim()}`,
                `Téléphone : ${phone.trim()}`,
                email.trim() ? `Email : ${email.trim()}` : "",
                city.trim() ? `Ville : ${city.trim()}` : "",
              ]
                .filter(Boolean)
                .join("\n");
              useCart.getState().place({
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                city: city.trim(),
              });
              window.open(waLink(body), "_blank", "noopener,noreferrer");
              onClose();
            }}
          >
            <p className="font-display text-2xl text-gold">{formatPrice(total)}</p>
            <label className="mt-3 block text-sm text-muted" htmlFor="cart-name">Nom</label>
            <input id="cart-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required className="mt-1 w-full border border-line bg-bg px-3 py-3 text-fg" />
            <label className="mt-3 block text-sm text-muted" htmlFor="cart-phone">Téléphone / WhatsApp</label>
            <input id="cart-phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" required className="mt-1 w-full border border-line bg-bg px-3 py-3 text-fg" />
            <label className="mt-3 block text-sm text-muted" htmlFor="cart-email">Email (facultatif)</label>
            <input id="cart-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="mt-1 w-full border border-line bg-bg px-3 py-3 text-fg" />
            <label className="mt-3 block text-sm text-muted" htmlFor="cart-city">Ville</label>
            <input id="cart-city" value={city} onChange={(event) => setCity(event.target.value)} autoComplete="address-level2" className="mt-1 w-full border border-line bg-bg px-3 py-3 text-fg" />
            {error ? <p className="mt-2 text-sm text-gold-soft" role="alert">{error}</p> : null}
            <button type="submit" className="mt-4 min-h-11 w-full bg-gold font-medium text-bg">
              Envoyer la commande sur WhatsApp
            </button>
            <p className="mt-2 text-xs text-muted">
              Aucun débit ici. Guide Sirius confirme le règlement : Mobile Money, virement, ou lien.
            </p>
          </form>
        ) : null}
      </aside>
    </div>
  );
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const found = products.filter((product) =>
    `${product.name} ${product.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 px-4 pt-24">
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="w-full max-w-lg border border-line bg-surface p-4">
        <h2 id={titleId} className="font-display text-gold">Chercher un seuil</h2>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nom du livre ou de la formation"
          className="mt-3 w-full border border-line bg-bg px-3 py-3 text-fg"
          aria-label="Recherche"
        />
        <ul className="mt-3 max-h-80 overflow-y-auto">
          {found.map((product) => (
            <li key={product.id}>
              <Link to="/seuils/$id" params={{ id: product.id }} className="flex min-h-11 items-center justify-between gap-3 py-2" onClick={onClose}>
                <span>{product.name}</span>
                <span className="text-sm text-gold">{formatPrice(product.price, product.period)}</span>
              </Link>
            </li>
          ))}
          {found.length === 0 ? <li className="py-3 text-muted">Rien sous ce nom.</li> : null}
        </ul>
        <button type="button" className="mt-2 min-h-11 text-sm text-muted" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}

function Cookies() {
  const [seen, setSeen] = useState(true);
  useEffect(() => {
    setSeen(window.localStorage.getItem("temple-cookies") !== null);
  }, []);
  if (seen) return null;
  const choose = (value: "essentiels" | "mesure") => {
    window.localStorage.setItem("temple-cookies", value);
    setSeen(true);
    if (value === "mesure") window.dispatchEvent(new Event("temple-mesure"));
  };
  return (
    <div className="fixed inset-x-4 bottom-24 z-40 border border-line bg-surface p-4 sm:right-auto sm:max-w-md" role="dialog" aria-label="Cookies">
      <p className="text-sm text-muted">
        Le panier reste sur cet appareil. La mesure d'audience, si tu l'acceptes, ne sert qu'à savoir quelles portes sont lues. Pas de publicité.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" className="min-h-11 bg-gold px-4 text-sm font-medium text-bg" onClick={() => choose("mesure")}>
          Accepter la mesure
        </button>
        <button type="button" className="min-h-11 border border-line px-4 text-sm" onClick={() => choose("essentiels")}>
          Essentiels seulement
        </button>
        <Link to="/politique-confidentialite" className="inline-flex min-h-11 items-center text-sm text-gold">
          Lire
        </Link>
      </div>
    </div>
  );
}

function Measure() {
  useEffect(() => {
    let scrolled = false;
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0 || scrolled) return;
      if (window.scrollY / height < 0.75) return;
      scrolled = true;
      (window as Window & { plausible?: (event: string) => void }).plausible?.("Scroll 75");
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a[href*='wa.me']");
      if (!link) return;
      (window as Window & { plausible?: (event: string) => void }).plausible?.("WhatsApp");
    };
    const arm = () => {
      if (window.localStorage.getItem("temple-cookies") !== "mesure") return;
      const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
      if (domain && !document.querySelector("script[data-plausible]")) {
        const queue = (window as Window & { plausible?: ((event: string) => void) & { q?: unknown[] } }).plausible;
        if (!queue) {
          const stub = ((...args: unknown[]) => {
            (stub.q = stub.q || []).push(args);
          }) as ((event: string) => void) & { q?: unknown[] };
          (window as Window & { plausible?: typeof stub }).plausible = stub;
        }
        const script = document.createElement("script");
        script.defer = true;
        script.dataset.domain = domain;
        script.dataset.plausible = "1";
        script.src = "https://plausible.io/js/script.js";
        document.head.appendChild(script);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("click", onClick);
    };
    arm();
    window.addEventListener("temple-mesure", arm);
    return () => {
      window.removeEventListener("temple-mesure", arm);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}

export function Crumbs({ items }: { items: { label: string; to?: "/" | "/le-chemin" | "/seuils" | "/bibliotheque" | "/blog" | "/contact" }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
      <ol className="flex flex-wrap gap-2">
        <li>
          <Link to="/" className="underline-offset-2 hover:underline">Accueil</Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex gap-2">
            <span aria-hidden="true">/</span>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span className="text-fg">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
