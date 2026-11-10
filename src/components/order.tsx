import { formatPrice, type Product } from "@/lib/catalog";
import { startCheckout } from "@/lib/checkout.functions";
import { formatCdf, formatUsd, orderMessage, stripeEnabled, waLink } from "@/lib/temple";

export function priceLabel(product: Product) {
  return formatPrice(product.price, product.period);
}

export function PriceBlock({ product }: { product: Product }) {
  return (
    <p>
      <span className="font-display text-2xl text-gold">{priceLabel(product)}</span>
      <span className="mt-1 block text-sm text-muted">
        {formatUsd(product.price)} · {formatCdf(product.price)}
        <span className="sr-only">, taux fixe indicatif</span>
      </span>
    </p>
  );
}

export function OrderActions({ product }: { product: Product }) {
  const href = waLink(orderMessage(product.name, priceLabel(product)));
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center bg-gold px-5 text-sm font-medium text-bg"
        aria-label={`Commander ${product.name} via WhatsApp`}
      >
        Commander via WhatsApp
      </a>
      <button
        type="button"
        disabled={!stripeEnabled}
        onClick={() => {
          void startCheckout({ data: { productId: product.id } });
        }}
        className="inline-flex min-h-11 items-center justify-center border border-line px-5 text-sm text-muted disabled:cursor-not-allowed"
        aria-describedby={`carte-${product.id}`}
      >
        Payer par carte (bientôt)
      </button>
      <p id={`carte-${product.id}`} className="text-xs text-muted sm:sr-only">
        La carte s'ouvrira quand Stripe sera activé. En attendant, WhatsApp confirme le règlement.
      </p>
    </div>
  );
}
