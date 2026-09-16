import type { Metadata } from "next";
import Link from "next/link";
import { contact, regulatoryNotice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & notices",
  description: `How ${site.name} handles your information, and important notices about our services.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="container-page max-w-3xl py-16 sm:py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Privacy &amp; notices
      </h1>
      <p className="mt-4 text-muted">Last updated: 12 September 2026</p>

      <p className="mt-8 rounded-2xl border border-line bg-surface-2 p-5 text-sm leading-relaxed text-muted">
        This page explains this policy in plain language. It is not legal advice, and should be reviewed
        by Falahtrust Enterprise&apos;s own legal adviser.
      </p>

      <div className="mt-12 space-y-10 leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink">
        <section>
          <h2>Who we are</h2>
          <p className="mt-3">
            This website is run by {site.name}, which is responsible for the personal information described
            here. You can reach us by email at{" "}
            <a href={contact.email.href} className="font-semibold text-brand-ink underline">
              {contact.email.display}
            </a>{" "}
            or by phone on{" "}
            <a href={contact.phone.href} className="font-semibold text-brand-ink underline">
              {contact.phone.display}
            </a>
            .
          </p>
        </section>

        <section>
          <h2>What this website collects</h2>
          <p className="mt-3">
            This website has no accounts, and does not use cookies, analytics or advertising trackers. The
            request form does not send anything to us through the website: it simply opens WhatsApp or your
            email app with your message filled in, and nothing is sent until you press send there.
          </p>
          <p className="mt-3">
            Like any website, our hosting provider may keep standard technical logs (such as IP addresses
            and the pages requested) to keep the site secure and working.
          </p>
        </section>

        <section>
          <h2>When you contact us</h2>
          <p className="mt-3">
            If you message, call or email us, we use the details you share only to respond to you and to
            provide the service you asked for. Messages sent through WhatsApp are also handled under
            WhatsApp&apos;s own terms and privacy policy. We keep your information only for as long as
            needed to do that, and do not sell it.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p className="mt-3">
            You can ask us what information we hold about you, and ask us to correct or delete it, by
            contacting us using the details above. In Ghana, these rights are set out in the Data Protection
            Act, 2012 (Act 843).
          </p>
        </section>

        <section>
          <h2>Important notice about financial services</h2>
          <p className="mt-3">{regulatoryNotice}</p>
        </section>
      </div>

      <Link href="/" className="btn btn-gold mt-14">
        Back to home
      </Link>
    </article>
  );
}
