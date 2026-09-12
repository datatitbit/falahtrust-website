/**
 * Single source of truth for Falahtrust Enterprise's business details.
 *
 * Provenance (see HANDOFF_REPORT.md):
 * - Name, tagline, services, phone, WhatsApp, email and the regulatory notice
 *   come from the client's intake form (2026-09-12). Country code +233 was
 *   confirmed by the owner in chat.
 * - `address`, `hours` and social links were not supplied and stay `null`,
 *   which renders a visible placeholder instead of a link.
 * - Service summaries, values and "how it works" wording are drafted by us and
 *   carry a "Draft" tag while `isPreview` is true.
 */

export const site = {
  name: "Falahtrust Enterprise",
  shortName: "Falahtrust",
  tagline: "Teaching minds, building wealth and serving faith",
  description:
    "Business registration support, document and online application help, mobile money, phone accessories, delivery and education, in one trusted place.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://falahtrustgh.com",
  /** While true: preview banner + draft tags show, and search engines are asked not to index. */
  isPreview: true,
} as const;

const WHATSAPP_NUMBER = "233209593337";

export const contact = {
  phone: { display: "+233 20 959 3337", href: "tel:+233209593337" },
  whatsapp: { display: "+233 20 959 3337" },
  email: { display: "Falahtrust11@gmail.com", href: "mailto:Falahtrust11@gmail.com" },
  /** Not supplied by the client yet. */
  address: null as string | null,
  /** Not supplied by the client yet. */
  hours: null as string | null,
};

export const regulatoryNotice =
  "Falahtrust Enterprise does not provide banking, lending, investment or other regulated financial services. Mobile money transactions are carried out through authorised telecommunications and mobile-money platforms.";

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function emailLink(subject: string, body: string) {
  return `${contact.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type IconName =
  | "wallet"
  | "building"
  | "file"
  | "monitor"
  | "smartphone"
  | "truck"
  | "book"
  | "trending"
  | "heart"
  | "chat"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "arrowRight"
  | "menu"
  | "close"
  | "star"
  | "shield"
  | "check"
  | "info"
  | "chevronDown";

export interface Service {
  id: string;
  title: string;
  summary: string;
  icon: IconName;
  /** Detail the client still needs to confirm, shown as a visible placeholder. */
  pending?: string;
  /** Compliance wording that must stay attached to this service. */
  notice?: string;
  /** Spans two columns on large screens. */
  wide?: "first" | "last";
}

export const services: Service[] = [
  {
    id: "mobile-money",
    title: "Mobile Money Services",
    summary:
      "Mobile money transactions handled for you through authorised telecommunications and mobile-money platforms, quickly and with care.",
    icon: "wallet",
    notice: "Falahtrust is not a bank and does not offer lending or investment services.",
    wide: "first",
  },
  {
    id: "business-registration",
    title: "Business Registration Support",
    summary:
      "Support getting your business registered, from putting your paperwork in order to submitting it through the right channels.",
    icon: "building",
  },
  {
    id: "document-services",
    title: "Document Services",
    summary:
      "Help preparing, organising and completing the documents your personal and business needs call for.",
    icon: "file",
  },
  {
    id: "online-applications",
    title: "Online Application Assistance",
    summary:
      "Help completing online applications correctly, so nothing is held up by a missed field or the wrong upload.",
    icon: "monitor",
  },
  {
    id: "education",
    title: "Education & Learning",
    summary: "Learning support that lives up to the first promise in our name: teaching minds.",
    icon: "book",
    pending: "[Programme and class details]",
  },
  {
    id: "accessories",
    title: "Phones & Computer Accessories",
    summary:
      "Phone and computer accessories and related products. Message us to check what is currently in stock.",
    icon: "smartphone",
    pending: "[Product range and pricing]",
  },
  {
    id: "delivery",
    title: "Delivery & E-commerce",
    summary:
      "Delivery services that get your orders and items to where they need to be, arranged with a single message.",
    icon: "truck",
    pending: "[Delivery areas and fees]",
    wide: "last",
  },
];

export const pillars: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Teaching minds",
    body: "We explain each step as we go, so you leave understanding more about the process than when you arrived.",
    icon: "book",
  },
  {
    title: "Building wealth",
    body: "We help people and small businesses get registered, get organised and keep trading, one practical step at a time.",
    icon: "trending",
  },
  {
    title: "Serving faith",
    body: "We aim to serve with honesty, patience and fairness in every transaction, big or small.",
    icon: "heart",
  },
];

export const steps: { title: string; body: string }[] = [
  {
    title: "Tell us what you need",
    body: "Send a WhatsApp message, call or email with the service you are looking for.",
  },
  {
    title: "Get clear next steps",
    body: "We confirm what is required from you, so there are no surprises along the way.",
  },
  {
    title: "Consider it handled",
    body: "We get to work and keep you updated until your request is complete.",
  },
];

export const faqs: { q: string; a: string; pending?: string }[] = [
  {
    q: "Is Falahtrust a bank or a lender?",
    a: regulatoryNotice,
  },
  {
    q: "How do I request a service?",
    a: `Send us a WhatsApp message or call ${contact.phone.display}, or email ${contact.email.display}. You can also use the request form on this page to start a WhatsApp message with your details filled in.`,
  },
  {
    q: "Do you offer delivery?",
    a: "Yes. Delivery is one of our services.",
    pending: "[Delivery areas and fees]",
  },
  {
    q: "Where are you located and when are you open?",
    a: "Our location and opening hours will be listed here shortly. In the meantime, message or call us and we will point you in the right direction.",
    pending: "[Business Address] · [Opening Hours]",
  },
];
