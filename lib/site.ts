/**
 * Single source of truth for Falahtrust Enterprise's business details.
 *
 * Provenance (see HANDOFF_REPORT.md):
 * - Name, tagline, phone, WhatsApp, email, socials and the regulatory notice
 *   come from the client (intake 2026-09-12; email/socials confirmed in chat
 *   2026-09-16). Country code +233 was confirmed by the owner in chat.
 * - The 10 service categories and Falahtrust Academy's programme list come
 *   directly from the owner's own category breakdown (chat, 2026-09-17). We
 *   deduplicated overlapping items (e.g. chargers/power banks appeared under
 *   three categories) and dropped the "Online Shop" / cart concept — the
 *   owner asked for the service/category browsing pattern only, not an
 *   e-commerce storefront (no prices, stock or checkout exist to back one).
 * - `address` stays `null` per owner instruction ("leave it as it was") — still
 *   not shown anywhere until a real address is supplied.
 * - `hours` is now a standard weekday retail schedule, at the owner's explicit
 *   request ("opening hours use standard") rather than a real confirmed
 *   time — tracked as a default in HANDOFF_REPORT.md, easy to correct.
 * - CCTV installation was confirmed by the owner in chat and added to that
 *   category's item list.
 * - No prices are stated anywhere on the site (owner instruction: "find a way
 *   not to specify" pricing) — category pages and the FAQ instead say
 *   pricing depends on the request and point to WhatsApp/phone for a quote.
 * - Category and FAQ copy is drafted by us from the owner's category names;
 *   normal marketing copy, not a fact that could be fabricated.
 */

export const site = {
  name: "Falahtrust Enterprise",
  shortName: "Falahtrust",
  tagline: "Teaching minds, building wealth and serving faith",
  description:
    "Mobile money, document and government services, printing, phones and computers, CCTV, delivery and Falahtrust Academy tutoring — everyday services in one trusted place in Ghana.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://falahtrustgh.com",
  /** While true, search engines are asked not to index the site (no visible effect on the page itself). */
  isPreview: false,
} as const;

const WHATSAPP_NUMBER = "233209593337";

export const contact = {
  phone: { display: "+233 20 959 3337", href: "tel:+233209593337" },
  whatsapp: { display: "+233 20 959 3337" },
  email: { display: "falahtrustgh@gmail.com", href: "mailto:falahtrustgh@gmail.com" },
  /** Not supplied by the client yet — leave as null (owner instruction). */
  address: null as string | null,
  /** Standard weekday retail hours, at the owner's request — not independently confirmed. */
  hours: "Monday – Saturday, 8:00 AM – 6:00 PM" as string | null,
};

/** Consistent, non-committal answer to "how much does this cost?" — no price is ever stated. */
export const pricingNote =
  "Pricing depends on exactly what you need, so we don't list prices here — message us on WhatsApp or call for a quote.";

export const socials: { name: string; icon: IconName; href: string }[] = [
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/falahtrustgh/" },
  { name: "X (Twitter)", icon: "twitter", href: "https://x.com/falahtrustgh" },
  { name: "YouTube", icon: "youtube", href: "https://www.youtube.com/@falahtrustgh" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/share/1Bx2byGrEc/" },
  { name: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@falahtrustgh" },
];

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
  | "chevronDown"
  | "instagram"
  | "twitter"
  | "youtube"
  | "facebook"
  | "tiktok"
  | "printer"
  | "laptop"
  | "cctv"
  | "gamepad"
  | "bolt"
  | "globe"
  | "graduationCap";

export interface Category {
  slug: string;
  title: string;
  /** Short phrase for cards and nav. */
  tagline: string;
  /** Longer paragraph for the category page and meta description. */
  summary: string;
  icon: IconName;
  /** Real sub-items from the owner's own category list. Not a live, priced catalogue. */
  items: string[];
  /** Compliance wording that must stay attached to this category. */
  notice?: string;
  /** Points to a related category to avoid duplicate listings (e.g. accessories shared with Gaming). */
  seeAlso?: { slug: string; label: string };
  /** Search terms this page should read naturally for. */
  keywords: string[];
}

export const categories: Category[] = [
  {
    slug: "mobile-money",
    title: "MoMo & Financial Services",
    tagline: "Mobile money, agent SIM and transfers",
    summary:
      "Mobile money cash-in, cash-out, agent SIM services and money transfers, handled through authorised telecommunications and mobile-money platforms.",
    icon: "wallet",
    items: ["MoMo cash-in / cash-out", "Agent SIM services", "Money transfer services"],
    notice: "Falahtrust is not a bank and does not offer lending or investment services.",
    keywords: ["mobile money Ghana", "MoMo agent Ghana", "cash-in cash-out", "money transfer Ghana"],
  },
  {
    slug: "documents",
    title: "Document & Government Services",
    tagline: "Ghana Card, passport, certificates & registration",
    summary:
      "Help with official documents and government processes — Ghana Card, passport, certificates, business registration and online applications — so nothing gets held up by a missing form or the wrong channel.",
    icon: "file",
    items: [
      "Ghana Card applications",
      "Ghanaian passport applications",
      "Birth certificate",
      "Marriage certificate",
      "Driver's licence",
      "Affidavit & gazette notices",
      "Business registration support",
      "Online government applications",
      "Other document assistance",
    ],
    keywords: [
      "Ghana Card application",
      "Ghana passport application",
      "birth certificate Ghana",
      "marriage certificate Ghana",
      "business registration Ghana",
      "affidavit Ghana",
    ],
  },
  {
    slug: "printing-stationery",
    title: "Printing, Photocopy & Stationery",
    tagline: "Printing, photocopying, scanning & supplies",
    summary:
      "Printing, photocopying and scanning while you wait, plus stationery, books and e-books for school, work or home.",
    icon: "printer",
    items: ["Printing", "Photocopying", "Scanning", "Stationery supplies", "Books", "E-books"],
    keywords: ["printing services Ghana", "photocopy near me", "stationery shop Ghana", "scanning services"],
  },
  {
    slug: "phones-accessories",
    title: "Phones & Mobile Accessories",
    tagline: "Phones, chargers, earphones & smart watches",
    summary:
      "Mobile phones and the accessories that go with them — chargers, power banks, earpieces, AirPods, headphones, Bluetooth speakers, smart watches and watches.",
    icon: "smartphone",
    items: [
      "Mobile phones",
      "Phone accessories",
      "Chargers",
      "Power banks",
      "Earpieces",
      "AirPods",
      "Headphones",
      "Bluetooth speakers",
      "Smart watches",
      "Watches",
    ],
    keywords: [
      "phone accessories Ghana",
      "chargers and power banks",
      "earpieces Ghana",
      "smart watches Ghana",
      "Bluetooth speakers Ghana",
    ],
  },
  {
    slug: "computers-technology",
    title: "Computers & Technology",
    tagline: "Laptops, desktops & computer accessories",
    summary:
      "Laptops, desktop computers and the accessories that keep them running — keyboards, peripherals, tripods and cameras.",
    icon: "laptop",
    items: ["Laptops", "Desktop computers", "Computer accessories", "Keyboards", "Computer peripherals", "Tripods", "Cameras"],
    keywords: ["laptops Ghana", "computer accessories Ghana", "keyboards Ghana", "desktop computers Ghana"],
  },
  {
    slug: "cctv-security",
    title: "CCTV & Security",
    tagline: "CCTV cameras & accessories",
    summary: "CCTV cameras and accessories to help you keep an eye on your home or business.",
    icon: "cctv",
    items: ["CCTV cameras", "CCTV accessories", "CCTV installation"],
    keywords: ["CCTV cameras Ghana", "security cameras Ghana", "CCTV installation Ghana"],
  },
  {
    slug: "gaming-entertainment",
    title: "Gaming & Entertainment",
    tagline: "Game consoles & accessories",
    summary: "Game consoles and gaming accessories for the entertainment side of technology.",
    icon: "gamepad",
    items: ["Game consoles", "Gaming accessories"],
    seeAlso: { slug: "phones-accessories", label: "speakers, headphones and earpieces" },
    keywords: ["game consoles Ghana", "gaming accessories Ghana"],
  },
  {
    slug: "electrical-gadgets",
    title: "Electrical & Basic Gadgets",
    tagline: "Everyday electrical gadgets",
    summary: "Everyday electrical gadgets, electronic accessories and other small electronic devices.",
    icon: "bolt",
    items: ["Basic electrical gadgets", "Electronic accessories", "Other small electronic devices"],
    seeAlso: { slug: "phones-accessories", label: "chargers and power banks" },
    keywords: ["electrical gadgets Ghana", "electronic accessories Ghana"],
  },
  {
    slug: "delivery-logistics",
    title: "Delivery & Logistics",
    tagline: "Local, document & parcel delivery",
    summary: "Getting things where they need to be — documents, parcels, shop orders and business deliveries.",
    icon: "truck",
    items: ["Local delivery", "Document delivery", "Parcel delivery", "Shop-to-customer delivery", "Business delivery services"],
    keywords: ["delivery service Ghana", "document delivery Ghana", "parcel delivery Ghana"],
  },
  {
    slug: "sourcing-import-export",
    title: "Sourcing, Import & Export",
    tagline: "Online purchase, sourcing & bulk orders",
    summary:
      "Help finding, sourcing and bringing in the products you need — locally or from abroad — including bulk and special orders.",
    icon: "globe",
    items: [
      "Online purchase assistance",
      "Product sourcing",
      "International product sourcing",
      "Importation",
      "Exportation",
      "Bulk orders",
      "Special product requests",
    ],
    keywords: ["product sourcing Ghana", "import export Ghana", "bulk orders Ghana"],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export const academy = {
  slug: "academy",
  title: "Falahtrust Academy",
  tagline: "Teaching minds — the first promise in our name.",
  summary:
    "Online tutoring and educational consultancy, covering the sciences, Arabic and Islamic education, plus guidance for students figuring out their next academic step.",
  icon: "graduationCap" as IconName,
  programmes: [
    "Online tutoring — Biology",
    "Online tutoring — General Science",
    "Online tutoring — Arabic",
    "Online tutoring — Islamic education",
    "Educational consultancy & academic guidance",
    "Online classes",
    "Educational e-books",
  ],
  keywords: ["online tutoring Ghana", "Arabic tutor Ghana", "Islamic education tutor", "educational consultancy Ghana"],
};

/** Featured on the homepage immediately under the hero, per the owner's brief. */
export const quickLinks: { label: string; slug: string; icon: IconName }[] = [
  { label: "Phones & Accessories", slug: "phones-accessories", icon: "smartphone" },
  { label: "Computers", slug: "computers-technology", icon: "laptop" },
  { label: "Documents", slug: "documents", icon: "file" },
  { label: "MoMo", slug: "mobile-money", icon: "wallet" },
  { label: "Printing", slug: "printing-stationery", icon: "printer" },
  { label: "CCTV", slug: "cctv-security", icon: "cctv" },
  { label: "Academy", slug: "academy", icon: "graduationCap" },
  { label: "Delivery", slug: "delivery-logistics", icon: "truck" },
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

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is Falahtrust a bank or a lender?",
    a: regulatoryNotice,
  },
  {
    q: "How do I request a service?",
    a: `Send us a WhatsApp message or call ${contact.phone.display}, or email ${contact.email.display}. You can also use the request form on this page to start a WhatsApp message with your details filled in.`,
  },
  {
    q: "Do you help with Ghana Card, passport or other document applications?",
    a: "Yes. Document & Government Services covers Ghana Card, Ghanaian passport, birth and marriage certificates, driver's licence, affidavits and business registration support.",
  },
  {
    q: "Do you sell laptops, phones or computer accessories?",
    a: "Yes. Phones & Mobile Accessories and Computers & Technology cover phones, laptops, and the accessories that go with them. Message us to check current availability.",
  },
  {
    q: "Does Falahtrust Academy offer tutoring for school subjects?",
    a: "Yes. Falahtrust Academy offers online tutoring in Biology, General Science, Arabic and Islamic education, plus educational consultancy and academic guidance.",
  },
  {
    q: "Can you help me import or source a product from abroad?",
    a: "Yes. Sourcing, Import & Export covers product sourcing, international sourcing, importation, exportation and bulk orders.",
  },
  {
    q: "Do you offer delivery?",
    a: "Yes. Delivery & Logistics covers local delivery, document and parcel delivery, and business delivery services.",
  },
  {
    q: "How much do your services cost?",
    a: pricingNote,
  },
  {
    q: "Where are you located and when are you open?",
    a: `We're open ${contact.hours}. Our street address will be listed here shortly — in the meantime, message or call us and we will point you in the right direction.`,
  },
];
