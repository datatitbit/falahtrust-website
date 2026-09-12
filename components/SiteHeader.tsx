"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { whatsappLink } from "@/lib/site";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#values", label: "Our values" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/85 text-white backdrop-blur-lg">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Falahtrust Enterprise home">
          <Image
            src="/brand/falahtrust-emblem-128.webp"
            alt=""
            width={128}
            height={128}
            className="size-11"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">Falahtrust</span>
            <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.32em] text-gold-400">
              ENTERPRISE
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-[0.93rem] font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink("Hello Falahtrust, I would like some help with a service.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold hidden !min-h-11 !px-5 sm:inline-flex"
          >
            <Icon name="chat" />
            WhatsApp us
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-white/10 bg-navy-900 lg:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-2 py-3.5 text-base font-medium text-slate-100 hover:bg-white/5"
              >
                {item.label}
                <Icon name="arrowRight" className="size-4 text-gold-400" />
              </Link>
            </li>
          ))}
          <li className="pt-2 pb-1 sm:hidden">
            <a
              href={whatsappLink("Hello Falahtrust, I would like some help with a service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold w-full"
            >
              <Icon name="chat" />
              WhatsApp us
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
