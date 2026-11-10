import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Temple Sirius" },
      {
        name: "description",
        content:
          "Textes de Conscience Kongo : rituels de purification, début sur la voie, spiritualité Kongo sans folklore.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <Page
      kicker="Blog"
      title="Des textes pour voir, pas pour remplir."
      crumbs={[{ label: "Blog" }]}
    >
      <div className="grid gap-4">
        {articles.map((article) => (
          <article key={article.slug} className="border border-line p-5">
            <p className="text-xs text-muted">{article.date} · {article.minutes} min</p>
            <h2 className="mt-2 font-display text-2xl">
              <Link to="/blog/$slug" params={{ slug: article.slug }}>{article.title}</Link>
            </h2>
            <p className="mt-2 text-muted">{article.description}</p>
          </article>
        ))}
      </div>
    </Page>
  );
}
