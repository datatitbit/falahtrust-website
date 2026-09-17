import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { academy, pricingNote, site, whatsappLink } from "@/lib/site";

const description = `${academy.summary} Serving students in Ghana — message Falahtrust Enterprise on WhatsApp to get started.`;

export const metadata: Metadata = {
  title: academy.title,
  description,
  keywords: academy.keywords,
  alternates: { canonical: "/academy" },
  openGraph: { title: `${academy.title} | ${site.name}`, description, url: "/academy" },
};

export default function AcademyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: academy.title,
    description: academy.summary,
    url: `${site.url}/academy`,
    parentOrganization: { "@type": "LocalBusiness", name: site.name, url: site.url },
    areaServed: "GH",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: academy.title, item: `${site.url}/academy` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }} />

      <section aria-labelledby="academy-title" className="relative isolate overflow-hidden bg-navy-900 py-16 text-white sm:py-20">
        <div aria-hidden="true" className="pattern-stars absolute inset-0 -z-10" />
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-slate-200">{academy.title}</li>
            </ol>
          </nav>

          <div className="mt-6 flex items-center gap-4">
            <span className="icon-tile !size-14">
              <Icon name={academy.icon} className="!size-7" />
            </span>
            <div>
              <p className="eyebrow !text-gold-400">Teaching minds</p>
              <h1 id="academy-title" className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {academy.title}
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{academy.summary}</p>

          <a
            href={whatsappLink("Hello Falahtrust Academy, I would like to ask about tutoring.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold mt-8"
          >
            <Icon name="chat" />
            Ask about tutoring
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold text-ink">Programmes</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {academy.programmes.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4">
                <Icon name="check" className="mt-0.5 size-5 flex-none text-accent-ink" />
                <span className="text-ink">{p}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-muted">{pricingNote}</p>

          <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-line bg-surface-2 p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold text-ink">Want to know more about a programme?</p>
            <a
              href={whatsappLink("Hello Falahtrust Academy, I would like to ask about tutoring.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <Icon name="chat" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
