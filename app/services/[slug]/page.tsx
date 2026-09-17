import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { categories, getCategory, pricingNote, site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  const title = category.title;
  const description = `${category.summary} Serving customers in Ghana — message Falahtrust Enterprise on WhatsApp to get started.`;
  return {
    title,
    description,
    keywords: category.keywords,
    alternates: { canonical: `/services/${category.slug}` },
    openGraph: { title: `${title} | ${site.name}`, description, url: `/services/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const seeAlso = category.seeAlso ? getCategory(category.seeAlso.slug) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.title,
    description: category.summary,
    provider: { "@type": "LocalBusiness", name: site.name, url: site.url, telephone: "+233209593337" },
    areaServed: "GH",
    url: `${site.url}/services/${category.slug}`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.title,
      itemListElement: category.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      { "@type": "ListItem", position: 3, name: category.title, item: `${site.url}/services/${category.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }}
      />

      <section aria-labelledby="category-title" className="relative isolate overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
        <div aria-hidden="true" className="pattern-stars absolute inset-0 -z-10" />
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-200">{category.title}</li>
            </ol>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <span className="icon-tile !size-14">
              <Icon name={category.icon} className="!size-7" />
            </span>
            <div>
              <p className="eyebrow !text-gold-400">{category.tagline}</p>
              <h1 id="category-title" className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {category.title}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{category.summary}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(`Hello Falahtrust, I would like to ask about ${category.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <Icon name="chat" />
              Ask about {category.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/services" className="btn btn-ghost-dark">
              <Icon name="arrowRight" className="rotate-180" />
              All services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {category.items.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
                  <Icon name="check" className="mt-0.5 size-5 flex-none text-accent-ink" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>

            {category.notice && (
              <p className="mt-6 flex gap-2 rounded-2xl bg-surface-2 p-4 text-sm leading-snug text-ink">
                <Icon name="shield" className="mt-px size-4 flex-none text-accent-ink" />
                {category.notice}
              </p>
            )}

            {seeAlso && category.seeAlso && (
              <p className="mt-6 text-sm text-muted">
                Looking for {category.seeAlso.label}? Find them under{" "}
                <Link href={`/services/${seeAlso.slug}`} className="font-semibold text-brand-ink underline">
                  {seeAlso.title}
                </Link>
                .
              </p>
            )}
          </div>

          <aside className="rounded-3xl border border-line bg-surface-2 p-7">
            <h2 className="font-display text-xl font-semibold text-ink">Ready to get started?</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Message us with what you need and we&apos;ll confirm the next step — no queues, no guesswork.
            </p>
            <p className="mt-3 text-sm text-muted">{pricingNote}</p>
            <a
              href={whatsappLink(`Hello Falahtrust, I would like to ask about ${category.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold mt-6 w-full"
            >
              <Icon name="chat" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
