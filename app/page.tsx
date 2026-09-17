import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Icon } from "@/components/Icon";
import { RequestForm } from "@/components/RequestForm";
import {
  academy,
  categories,
  contact,
  faqs,
  pillars,
  quickLinks,
  regulatoryNotice,
  site,
  socials,
  steps,
  whatsappLink,
  type IconName,
} from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/falahtrust-emblem.png`,
    image: `${site.url}/opengraph-image.png`,
    telephone: "+233209593337",
    email: contact.email.display,
    areaServed: "GH",
    sameAs: socials.map((s) => s.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [...categories, academy].map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title },
      })),
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <QuickLinks />
      <Categories />
      <AcademyTeaser />
      <Values />
      <HowItWorks />
      <Notice />
      <Faq />
      <Contact />
    </>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-2xl">
      <p className={tone === "dark" ? "eyebrow !text-gold-400" : "eyebrow"}>
        <Icon name="star" className="size-3" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-slate-300" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="pattern-stars absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />

      <div className="container-page pt-14 pb-20 md:pt-20 lg:pb-28">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-2xl border border-gold-400/30 bg-white/5 px-4 py-1.5 text-sm font-medium text-gold-300 sm:rounded-full">
            <Icon name="star" className="size-3.5 flex-none text-gold-400" />
            <span>Teaching minds · Building wealth · Serving faith</span>
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[4.1rem]"
          >
            Everyday services in Ghana, <span className="text-gold-gradient">in one trusted place.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            {site.name} helps you with mobile money, Ghana Card and passport applications, printing, phones and
            computers, CCTV, delivery and Falahtrust Academy tutoring — without running between different
            places.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappLink("Hello Falahtrust, I would like some help with a service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              <Icon name="chat" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link href="/services" className="btn btn-ghost-dark">
              Browse services
              <Icon name="arrowRight" />
            </Link>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li>
              <a href={contact.phone.href} className="inline-flex items-center gap-2 hover:text-white">
                <Icon name="phone" className="size-4 text-gold-400" />
                {contact.phone.display}
              </a>
            </li>
            <li>
              <a href={contact.email.href} className="inline-flex items-center gap-2 hover:text-white">
                <Icon name="mail" className="size-4 text-gold-400" />
                {contact.email.display}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <div className="border-y border-white/10 bg-navy-950">
      <div className="container-page py-8">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {quickLinks.map((q) => (
            <li key={q.slug}>
              <Link
                href={q.slug === "academy" ? "/academy" : `/services/${q.slug}`}
                className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 text-center transition-colors hover:border-gold-400/50 hover:bg-white/[0.06]"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-gold-400 text-navy-900 transition-transform group-hover:scale-105">
                  <Icon name={q.icon} className="size-6" />
                </span>
                <span className="text-sm font-semibold text-slate-100">{q.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="services-title"
            eyebrow="What we do"
            title="Ten categories, one team you can trust"
            intro="From Ghana Card applications to laptops and CCTV, Falahtrust brings the everyday services you depend on together under one roof."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 pb-1 text-sm font-semibold text-brand-ink hover:gap-3"
          >
            View all services
            <Icon name="arrowRight" className="size-4 transition-all" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function AcademyTeaser() {
  return (
    <section aria-labelledby="academy-title" className="border-y border-line bg-surface-2 py-16 sm:py-20">
      <div className="container-page flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <span className="icon-tile !size-14 flex-none">
            <Icon name={academy.icon} className="!size-7" />
          </span>
          <div>
            <p className="eyebrow">Teaching minds</p>
            <h2 id="academy-title" className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              {academy.title}
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">{academy.summary}</p>
          </div>
        </div>
        <Link href="/academy" className="btn border border-line text-ink hover:border-gold-500 lg:flex-none">
          Explore Falahtrust Academy
          <Icon name="arrowRight" className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section id="values" aria-labelledby="values-title" className="relative isolate overflow-hidden border-y border-white/10 bg-navy-900 py-20 text-white sm:py-28">
      <div aria-hidden="true" className="pattern-stars absolute inset-0 -z-10" />
      <div className="container-page">
        <SectionHeading
          id="values-title"
          eyebrow="Our values"
          title={`${site.tagline}.`}
          intro="Three promises sit behind our name and guide how we serve every customer."
          tone="dark"
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="reveal rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-gold-400 text-navy-900">
                  <Icon name={p.icon} className="size-6" />
                </span>
                <span aria-hidden="true" className="font-display text-5xl font-semibold text-white/10">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-gold-300">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-300">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="Getting help is simple"
          intro="No long queues or guesswork. Just tell us what you need."
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="card reveal">
              <span className="grid size-12 place-items-center rounded-full border-2 border-gold-500 font-display text-lg font-semibold text-accent-ink">
                {i + 1}
              </span>
              <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
              <p className="leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Notice() {
  return (
    <section aria-labelledby="notice-title" className="pb-20 sm:pb-28">
      <div className="container-page">
        <div className="flex flex-col gap-5 rounded-3xl border border-line bg-surface-2 p-7 sm:flex-row sm:items-start sm:p-10">
          <span className="icon-tile flex-none">
            <Icon name="shield" />
          </span>
          <div>
            <h2 id="notice-title" className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Important notice about financial services
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">{regulatoryNotice}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Questions, answered"
          intro="Can't find what you are looking for? Send us a message and we will be glad to help."
        />
        <div className="divide-y divide-line rounded-3xl border border-line bg-surface">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-1 sm:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Icon
                  name="chevronDown"
                  className="size-5 flex-none text-accent-ink transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="pb-6 leading-relaxed text-muted">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const channels: { icon: IconName; label: string; value: React.ReactNode; wide?: boolean }[] = [
    {
      icon: "chat",
      label: "WhatsApp",
      value: (
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
          {contact.whatsapp.display}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    },
    {
      icon: "phone",
      label: "Call",
      value: (
        <a href={contact.phone.href} className="hover:text-gold-300">
          {contact.phone.display}
        </a>
      ),
    },
    {
      icon: "mail",
      label: "Email",
      value: (
        <a href={contact.email.href} className="[overflow-wrap:anywhere] hover:text-gold-300">
          {contact.email.display}
        </a>
      ),
      wide: true,
    },
    ...(contact.address
      ? [{ icon: "pin" as IconName, label: "Visit", value: contact.address }]
      : []),
    ...(contact.hours
      ? [{ icon: "clock" as IconName, label: "Opening hours", value: contact.hours }]
      : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title="Tell us what you need. We will take it from there."
            intro="Message, call or email us, whichever suits you best."
            tone="dark"
          />
          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {channels.map((c) => (
              <div
                key={c.label}
                className={`flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 ${
                  c.wide ? "sm:col-span-2" : ""
                }`}
              >
                <span className="grid size-11 flex-none place-items-center rounded-xl bg-gold-400 text-navy-900">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <div className="min-w-0">
                  <dt className="text-sm text-slate-400">{c.label}</dt>
                  <dd className="mt-1 font-semibold text-white">{c.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <p className="text-sm text-slate-400">Follow us</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${s.name} (opens in a new tab)`}
                    className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:border-gold-400/60 hover:text-gold-300"
                  >
                    <Icon name={s.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <RequestForm />
      </div>
    </section>
  );
}
