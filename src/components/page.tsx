import type { ReactNode } from "react";
import { Crumbs } from "@/components/shell";

export function Page({
  kicker,
  title,
  lede,
  crumbs,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  crumbs: { label: string; to?: "/" | "/le-chemin" | "/seuils" | "/bibliotheque" | "/blog" | "/contact" }[];
  children: ReactNode;
}) {
  return (
    <main id="contenu" className="mx-auto max-w-6xl px-4 py-10">
      <Crumbs items={crumbs} />
      <p className="mt-6 font-display text-xs tracking-widest text-gold">{kicker}</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl text-fg">{title}</h1>
      {lede ? <p className="mt-4 max-w-2xl text-muted">{lede}</p> : null}
      <div className="mt-10">{children}</div>
    </main>
  );
}
