import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

// next/font downloads these at build time and serves them from this site,
// so visitors' browsers never contact Google.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} | Everyday Business Services`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Falahtrust",
    "Falahtrust Enterprise",
    "business registration support",
    "document services",
    "online application assistance",
    "mobile money",
    "phone accessories",
    "computer accessories",
    "delivery services",
    "Ghana",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: "/",
    locale: "en_GH",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  // Preview builds contain draft wording and placeholders, so keep them out of search results.
  robots: site.isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06122b",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-gold-400 px-5 py-3 font-semibold text-navy-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {site.isPreview && (
          <div role="note" className="bg-amber-100 px-4 py-2 text-center text-[0.8rem] leading-snug text-amber-950">
            <strong>Website preview.</strong> Wording tagged “Draft” and details in [brackets] are
            awaiting confirmation from Falahtrust Enterprise.
          </div>
        )}
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
