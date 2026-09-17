import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Icon } from "@/components/Icon";
import { academy, categories, site, whatsappLink } from "@/lib/site";

const title = "Our Services";
const description =
  "Everyday services from Falahtrust Enterprise in Ghana: MoMo, document and government services, printing, phones and computers, CCTV, delivery and Falahtrust Academy tutoring.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/services" },
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Falahtrust Enterprise services",
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/services/${c.slug}`,
      name: c.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <section aria-labelledby="services-title" className="relative isolate overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
        <div aria-hidden="true" className="pattern-stars absolute inset-0 -z-10" />
        <div className="container-page">
          <p className="eyebrow !text-gold-400">
            <Icon name="star" className="size-3" />
            What we do
          </p>
          <h1 id="services-title" className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Everyday services, all in one trusted place
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Ten categories covering the errands and technology you rely on every week. Pick a category to see
            what&apos;s included, then message us to get started.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
            <li className="card reveal border-gold-500/50 bg-surface-2">
              <span className="icon-tile">
                <Icon name={academy.icon} />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">{academy.title}</h3>
              <p className="leading-relaxed text-muted">{academy.summary}</p>
              <Link
                href="/academy"
                className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-brand-ink hover:gap-3"
              >
                View details<span className="sr-only">: {academy.title}</span>
                <Icon name="arrowRight" className="size-4 transition-all" />
              </Link>
            </li>
          </ul>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl border border-line bg-surface-2 p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-ink">Not sure which category fits what you need?</p>
            <a
              href={whatsappLink("Hello Falahtrust, I would like some help finding the right service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <Icon name="chat" />
              Ask on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
