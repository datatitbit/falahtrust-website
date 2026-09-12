import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { DraftTag, PendingBlock, Placeholder } from "@/components/Pending";
import { RequestForm } from "@/components/RequestForm";
import {
  contact,
  faqs,
  pillars,
  regulatoryNotice,
  services,
  site,
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ServiceStrip />
      <Services />
      <Values />
      <HowItWorks />
      <Notice />
      <About />
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
  draft,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  draft?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex flex-wrap items-center gap-3">
        <p className={tone === "dark" ? "eyebrow !text-gold-400" : "eyebrow"}>
          <Icon name="star" className="size-3" />
          {eyebrow}
        </p>
        {draft && <DraftTag />}
      </div>
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
  const chips: { label: string; icon: IconName; className: string }[] = [
    { label: "Mobile money", icon: "wallet", className: "left-0 top-[14%] float-slow" },
    { label: "Business registration", icon: "building", className: "right-0 top-[48%] float-slower" },
    { label: "Delivery", icon: "truck", className: "left-[6%] bottom-[6%] float-slow" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div aria-hidden="true" className="pattern-stars absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />

      <div className="container-page grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-2xl border border-gold-400/30 bg-white/5 px-4 py-1.5 text-sm font-medium text-gold-300 sm:rounded-full">
            <Icon name="star" className="size-3.5 flex-none text-gold-400" />
            <span>Teaching minds · Building wealth · Serving faith</span>
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[4.1rem]"
          >
            Everyday business services, <span className="text-gold-gradient">in one trusted place.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            {site.name} helps you register your business, sort out documents and online applications,
            handle mobile money, shop phone and computer accessories and arrange deliveries, without
            running between different places.
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
            <Link href="#services" className="btn btn-ghost-dark">
              Explore services
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

        <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md lg:max-w-[30rem]">
          <div aria-hidden="true" className="emblem-ring absolute -inset-[4%] rounded-full" />
          <div className="relative grid size-full place-items-center rounded-full bg-white p-[9%] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.75)] ring-4 ring-gold-400/50">
            <Image
              src="/brand/falahtrust-emblem.webp"
              alt="Falahtrust Enterprise logo: an F and T monogram beneath a star, with city buildings and an open book"
              width={640}
              height={640}
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full"
            />
          </div>
          {chips.map((chip) => (
            <div key={chip.label} aria-hidden="true" className={`glass-chip absolute hidden sm:flex ${chip.className}`}>
              <span className="grid size-8 place-items-center rounded-full bg-gold-400 text-navy-900">
                <Icon name={chip.icon} className="size-4" />
              </span>
              {chip.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceStrip() {
  return (
    <div className="border-y border-white/10 bg-navy-950 text-slate-300">
      <ul
        aria-label="Services at a glance"
        className="container-page flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-5 text-sm font-medium"
      >
        {services.map((s, i) => (
          <li key={s.id} className="flex items-center gap-6">
            {i > 0 && <Icon name="star" className="size-2.5 text-gold-500" />}
            {s.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="What we do"
          title="Seven services, one team you can trust"
          intro="From registering your business to getting a parcel delivered, Falahtrust brings the everyday services you depend on together under one roof."
          draft
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.id}
              id={s.id}
              className={`card reveal ${s.wide === "first" ? "sm:col-span-2" : ""} ${
                s.wide === "last" ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="icon-tile">
                  <Icon name={s.icon} />
                </span>
                {s.wide === "first" && (
                  <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-accent-ink">
                    Through authorised platforms
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
              <p className="leading-relaxed text-muted">{s.summary}</p>

              {s.notice && (
                <p className="flex gap-2 rounded-xl bg-surface-2 p-3 text-sm leading-snug text-ink">
                  <Icon name="shield" className="mt-px size-4 flex-none text-accent-ink" />
                  {s.notice}
                </p>
              )}
              {s.pending && (
                <p className="text-sm text-accent-ink">
                  <Placeholder>{s.pending}</Placeholder>
                </p>
              )}

              <a
                href={whatsappLink(`Hello Falahtrust, I would like to ask about ${s.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-brand-ink hover:gap-3"
              >
                Ask about this<span className="sr-only">: {s.title} (opens WhatsApp in a new tab)</span>
                <Icon name="arrowRight" className="size-4 transition-all" />
              </a>
            </li>
          ))}
        </ul>
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
          draft
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
          draft
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

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-surface py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="about-title"
          eyebrow="About us"
          title="The people behind Falahtrust"
          intro="This is where our story, our team and the customers we have served will appear."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <PendingBlock title="our story and team">
            The founding story, the people who serve customers and photos of the business. We only publish
            real details supplied by Falahtrust.
          </PendingBlock>
          <PendingBlock title="customer reviews">
            Genuine, verifiable reviews from real customers. None are shown until Falahtrust supplies
            them, because invented reviews mislead customers and break consumer-protection rules.
          </PendingBlock>
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
                {f.pending && (
                  <p className="mt-3 text-sm text-accent-ink">
                    <Placeholder>{f.pending}</Placeholder>
                  </p>
                )}
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
    {
      icon: "pin",
      label: "Visit",
      value: contact.address ?? <Placeholder>[Business Address]</Placeholder>,
    },
    {
      icon: "clock",
      label: "Opening hours",
      value: contact.hours ?? <Placeholder>[Opening Hours]</Placeholder>,
    },
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
        </div>
        <RequestForm />
      </div>
    </section>
  );
}
