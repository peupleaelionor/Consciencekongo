import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { articleBySlug, type Article } from "@/lib/articles";
import { SITE_URL } from "@/lib/temple";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    const article = loaderData as Article;
    return {
      meta: [
        { title: `${article.title} — Temple Sirius` },
        { name: "description", content: article.description },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/blog/${article.slug}` }],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <Page kicker="Blog" title="Ce texte n'est pas là." crumbs={[{ label: "Blog", to: "/blog" }]}>
      <Link to="/blog" className="text-gold">Revenir au blog</Link>
    </Page>
  ),
});

function ArticlePage() {
  const article = Route.useLoaderData();
  return (
    <Page
      kicker={`${article.date} · ${article.minutes} min`}
      title={article.title}
      lede={article.description}
      crumbs={[{ label: "Blog", to: "/blog" }, { label: article.title }]}
    >
      <article className="max-w-2xl">
        <img src={article.image} alt={article.imageAlt} className="mb-6 w-full object-cover" />
        <div className="space-y-4 text-muted">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        </div>
      </article>
    </Page>
  );
}
