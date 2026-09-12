import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Placeholder } from "@/components/Pending";
import { contact, regulatoryNotice, services, site, whatsappLink } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Falahtrust Enterprise home">
            <Image src="/brand/falahtrust-emblem-128.webp" alt="" width={128} height={128} className="size-14" />
            <span className="font-display text-xl font-semibold text-white">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gold-300">{site.tagline}.</p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/#${s.id}`} className="hover:text-gold-300">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/#values" className="hover:text-gold-300">Our values</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-gold-300">How it works</Link></li>
            <li><Link href="/#faq" className="hover:text-gold-300">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-gold-300">Privacy &amp; notices</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Icon name="chat" className="mt-0.5 size-4 flex-none text-gold-400" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
                WhatsApp {contact.whatsapp.display}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="phone" className="mt-0.5 size-4 flex-none text-gold-400" />
              <a href={contact.phone.href} className="hover:text-gold-300">{contact.phone.display}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="mail" className="mt-0.5 size-4 flex-none text-gold-400" />
              <a href={contact.email.href} className="break-all hover:text-gold-300">{contact.email.display}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="pin" className="mt-0.5 size-4 flex-none text-gold-400" />
              {contact.address ?? <Placeholder>[Business Address]</Placeholder>}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-xs leading-relaxed text-slate-400 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">{regulatoryNotice}</p>
          <p className="flex-none">© {year} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
