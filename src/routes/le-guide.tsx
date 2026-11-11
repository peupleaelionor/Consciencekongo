import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { stations } from "@/lib/stations";
import { SITE_URL, waLink } from "@/lib/temple";

export const Route = createFileRoute("/le-guide")({
  head: () => ({
    meta: [
      { title: "Guide Sirius Kasembe — Temple Sirius" },
      {
        name: "description",
        content:
          "Guide Sirius Kasembe, Conscience Kongo. La planche officielle, puis les huit stations de la voie.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/le-guide` }],
  }),
  component: Guide,
});

function Guide() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Guide Sirius Kasembe",
    affiliation: "Conscience Kongo",
    image: `${SITE_URL}/brand/guide-kasembe.webp`,
    url: `${SITE_URL}/le-guide`,
  };
  return (
    <Page
      kicker="Le Guide"
      title="Il indique. Il ne raccourcit pas."
      lede="Guide Sirius Kasembe. La planche officielle d'abord. Les huit stations ensuite."
      crumbs={[{ label: "Le Guide" }]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <figure className="mx-auto w-full max-w-md">
        <img
          src="/brand/guide-kasembe.webp"
          alt="Planche officielle de Guide Sirius Kasembe : voile blanc, lanterne, le titre Conscience Kongo."
          className="w-full border border-line"
        />
        <figcaption className="mt-4">
          <p className="font-display text-xl text-gold">Guide Sirius Kasembe</p>
          <p className="mt-1 text-sm text-muted">Conscience Kongo. Il tient la lampe. Il ne se met pas devant le seuil.</p>
        </figcaption>
      </figure>
      <ol className="mt-14 grid gap-14">
        {stations.map((station) => (
          <li key={station.n} className="mx-auto w-full max-w-sm">
            <img
              src={station.src}
              alt={`${station.n}. ${station.title}. Planche officielle de Guide Sirius.`}
              className="w-full border border-line"
            />
            <p className="mt-4 pr-20 font-display text-sm text-gold sm:pr-0">{station.n}</p>
            <h2 className="mt-1 pr-20 font-display text-xl sm:pr-0">{station.title}</h2>
            <p className="mt-2 pr-20 text-sm text-muted sm:pr-0">{station.line}</p>
          </li>
        ))}
      </ol>
      <section className="mx-auto mt-20 max-w-2xl">
        <h2 className="font-display text-2xl">La tenue</h2>
        <div className="mt-4 space-y-4 text-muted">
          <p>
            Guide Sirius Kasembe n'est pas un titre acheté. C'est une fonction : tenir la lampe pendant qu'une personne redescend dans ce qu'on lui a appris, puis remonte avec une parole qui lui appartient.
          </p>
          <p>
            Conscience Kongo existe parce qu'une conscience sans racine finit par parler avec une voix d'emprunt. L'école ne vend pas un réveil spectaculaire. Elle transmet des seuils. Le premier est un geste : laver ce qui encombre. Le suivant est un nom : savoir d'où l'on vient sans s'enfermer dans un récit inventé. Ensuite, pour qui tient, une présence — un mois, un fil, une lecture proche.
          </p>
          <p>
            Le parcours montré ici n'est pas une légende. Huit stations, dans l'ordre où elles se présentent à qui cesse de répéter. D'abord le réveil : questionner ce qui a été reçu. Puis le combat intérieur, où le doute, la peur et la colère ne sont plus des ennemis du dehors. Puis les chaînes qu'on ne voit pas — la langue oubliée, la dépendance, la croyance qui se prend pour une évidence. Vient le discernement : beaucoup se présentent comme des sauveurs. La voie apprend à ne pas suivre aveuglément.
          </p>
          <p>
            Quand une force apparaît, une tentation vient avec elle. Commander. Dominer. Se venger. Le Guide a posé là une limite qui vaut pour l'école entière : le pouvoir sans conscience est une autre prison. La mémoire retrouvée n'est utile que si elle reste une clé. Les anciens, les symboles, les langues sont des repères, pas une cage. De là, la liberté personnelle ne suffit plus. L'éducation, la dignité, la solidarité deviennent le travail. L'épreuve ultime n'est pas de gagner. C'est de choisir de construire.
          </p>
          <p>
            La légitimité ne se prouve pas par un diplôme affiché sur cette page. Elle se reconnaît à l'effet du travail : on ment moins, on négocie moins avec soi, on ne hait personne pour se sentir réel. Qui veut une transformation en une veille se trompe de seuil. Qui veut une parole tenue, un rite simple et une racine qui ne soit pas un folklore est au bon endroit.
          </p>
          <p>
            Temple Sirius est la boutique de cette école. Les livres ouvrent les premières portes. L'Aigle de Sirius change l'altitude. L'Arbre Fermé est le cercle proche, rare. Deux manières de régler : écrire sur WhatsApp, ou payer par carte quand elle est ouverte. Le chemin, lui, reste le même. Après le règlement, l'accès part par message. Sept jours pour se retirer, tant que le fichier n'a pas été ouvert.
          </p>
        </div>
      </section>
      <p className="mt-16 text-sm text-muted">
        Le seuil se commande à part.{" "}
        <a href={waLink("Bonjour Guide Sirius, je souhaite entrer dans le Temple.")} className="text-gold">
          Écrire au Guide
        </a>
      </p>
    </Page>
  );
}
