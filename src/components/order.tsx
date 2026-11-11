import { useState } from "react";
import { formatPrice, type Product } from "@/lib/catalog";
import { startCheckout } from "@/lib/checkout.functions";
import { formatCdf, formatUsd, orderMessage, waLink } from "@/lib/temple";

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

function mark(name: string) {
  const plausible = (window as Window & { plausible?: (event: string) => void }).plausible;
  plausible?.(name);
}

export function OrderActions({ product }: { product: Product }) {
  const [note, setNote] = useState("");
  const href = waLink(orderMessage(product.name, priceLabel(product)));
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
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
        className="inline-flex min-h-11 items-center justify-center border border-line px-5 text-sm text-fg"
        onClick={() => {
          mark("Acheter");
          setNote("");
          void startCheckout({ data: { productId: product.id } }).then((result) => {
            if (result.ok) {
              window.location.assign(result.url);
              return;
            }
            setNote("La carte n'est pas encore ouverte. Écris sur WhatsApp : Mobile Money, virement, ou le lien que le Guide envoie.");
          });
        }}
      >
        Payer par carte
      </button>
      {note ? (
        <p className="w-full text-xs text-muted" role="status">
          {note}
        </p>
      ) : null}
    </div>
  );
}
