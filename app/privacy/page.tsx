import type { Metadata } from "next";
import Link from "next/link";
import { contact, regulatoryNotice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <article className="container-page max-w-3xl py-16 sm:py-24">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-muted">Last updated: 18 September 2026</p>

      <p className="mt-8 rounded-2xl border border-line bg-surface-2 p-5 text-sm leading-relaxed text-muted">
        This policy is written in plain language so it&apos;s actually readable. It is not legal advice,
        and Falahtrust Enterprise should have it reviewed by its own legal adviser before relying on it.
      </p>

      <div className="mt-12 space-y-10 leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink">
        <section>
          <h2>1. Who we are</h2>
          <p className="mt-3">
            This website is run by {site.name} (&ldquo;Falahtrust&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;),
            which is responsible — the{" "}
            <em>data controller</em>, in the language of the law below — for the personal information
            described in this policy. You can reach us by email at{" "}
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
          <h2>2. What we collect</h2>
          <h3 className="mt-4">Information you choose to give us</h3>
          <p className="mt-3">
            This site has two separate forms, for two separate reasons. The <strong>request form</strong> in
            the Contact section is for a specific enquiry: it collects your <strong>name</strong>,{" "}
            <strong>email address</strong>, <strong>phone number</strong>, the service you&apos;re asking
            about, and any further details you add. Your name and the service you need are required; you
            need to give us either an email address or a phone number (or both) so we have a way to reply.
          </p>
          <p className="mt-3">
            The shorter <strong>&ldquo;stay in the loop&rdquo;</strong> signup in the footer is not tied to
            any specific enquiry — it just lets us keep in touch with people who are interested in
            Falahtrust, so it only asks for your name (optional) and one way to reach you (email or
            WhatsApp number). Submitting it is how you opt in to hearing from us this way; you can opt out
            at any time by telling us on WhatsApp or by email.
          </p>
          <p className="mt-3">
            If you message us on WhatsApp, call, or email us directly instead of using a form, the same
            principles apply to whatever you choose to share with us.
          </p>
          <h3 className="mt-4">Information collected automatically</h3>
          <p className="mt-3">
            Like effectively every website, our hosting provider keeps standard technical server logs (such
            as IP address, browser type, and the pages requested) to keep the site secure and working. This
            site does not use cookies, analytics, or advertising trackers of its own.
          </p>
        </section>

        <section>
          <h2>3. How we use it, and why that&apos;s allowed</h2>
          <p className="mt-3">
            We use request-form information only to respond to your enquiry and to provide the service
            you&apos;ve asked about. We use &ldquo;stay in the loop&rdquo; information only to occasionally
            let you know about new services from Falahtrust. We rely on two legal grounds: your{" "}
            <strong>consent</strong> — you choose to submit a form or message us — and, for the request
            form, our <strong>legitimate interest</strong> in running a responsive business, which we
            balance against your right to privacy. We do not use your details for marketing you
            haven&apos;t asked for, and we do not sell, rent, or trade your personal information to anyone.
          </p>
        </section>

        <section>
          <h2>4. Who sees it</h2>
          <p className="mt-3">
            Your information is seen only by the people at Falahtrust Enterprise who need it to respond to
            you. If you contact us through WhatsApp, that message is also handled under{" "}
            <a
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-ink underline"
            >
              WhatsApp&apos;s own privacy policy
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            , which is run by Meta, not by us. Submitting the request form on this site sends an email to
            our own inbox and is not shared with any other company.
          </p>
        </section>

        <section>
          <h2>5. How long we keep it</h2>
          <p className="mt-3">
            We keep your information only for as long as it&apos;s useful for the reason you gave it to us
            — generally, no longer than 24 months after your last contact with us — and then delete or
            anonymise it, unless we&apos;re required to keep it longer by law or need it to resolve a
            dispute.
          </p>
        </section>

        <section>
          <h2>6. Your rights under Ghana&apos;s Data Protection Act</h2>
          <p className="mt-3">
            Ghana&apos;s Data Protection Act, 2012 (Act 843) gives you a set of rights over your personal
            information. You can ask us to:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>tell you what information we hold about you (access);</li>
            <li>correct information that&apos;s wrong or out of date (rectification);</li>
            <li>delete your information (erasure);</li>
            <li>stop processing your information for a particular purpose (objection); and</li>
            <li>withdraw any consent you&apos;ve previously given us.</li>
          </ul>
          <p className="mt-3">
            To use any of these rights, contact us using the details in section 1. If you&apos;re not
            satisfied with our response, you can complain to Ghana&apos;s{" "}
            <a
              href="https://dataprotection.org.gh/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-ink underline"
            >
              Data Protection Commission
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </section>

        <section>
          <h2>7. Children</h2>
          <p className="mt-3">
            This site isn&apos;t directed at children, and we don&apos;t knowingly collect personal
            information from children. If you believe a child has given us information, contact us and
            we&apos;ll remove it.
          </p>
        </section>

        <section>
          <h2>8. Changes to this policy</h2>
          <p className="mt-3">
            If we change how we handle personal information, we&apos;ll update this page and change the
            date at the top.
          </p>
        </section>

        <section>
          <h2>9. Important notice about financial services</h2>
          <p className="mt-3">{regulatoryNotice}</p>
        </section>
      </div>

      <Link href="/" className="btn btn-gold mt-14">
        Back to home
      </Link>
    </article>
  );
}
