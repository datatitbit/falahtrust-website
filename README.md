# Falahtrust Enterprise — website

Multi-page site for **Falahtrust Enterprise**: ten service categories (MoMo & financial services,
document & government services, printing, phones, computers, CCTV, gaming, electrical gadgets,
delivery, and sourcing/import-export) plus **Falahtrust Academy** (tutoring & educational
consultancy). No e-commerce/cart — every category browses like a service, with a WhatsApp/call/email
CTA to order or ask, the same honest "message us" pattern used throughout.

Built with Next.js 16 (App Router, static export), TypeScript and Tailwind CSS 4.

## Site map

| Route | What it is |
|---|---|
| `/` | Home — hero, quick-access category grid, all 10 categories, Academy teaser, values, FAQ, contact |
| `/services` | All 10 categories |
| `/services/[slug]` | One page per category (generated from `lib/site.ts` → `categories`) |
| `/academy` | Falahtrust Academy |
| `/privacy` | Privacy policy & financial-services notice |

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site written to out/
npm run lint
```

## Updating content

Almost everything a non-developer would change lives in **`lib/site.ts`**:

| To change | Edit in `lib/site.ts` |
|---|---|
| Phone, WhatsApp, email | `contact` and `WHATSAPP_NUMBER` |
| Address / opening hours (not shown until set) | `contact.address`, `contact.hours` — replace `null` with text |
| Service categories (title, items, icon) | `categories` — adding one automatically creates its `/services/[slug]` page |
| Falahtrust Academy programmes | `academy` |
| Homepage quick-access cards | `quickLinks` |
| Values, steps, FAQs | `pillars`, `steps`, `faqs` |
| Allow search engines to index the site | `site.isPreview` (currently `false` — the site is indexable) |

The site never shows placeholder or "draft" markers to visitors — a detail that's missing (address, hours, a service's pricing) is simply left out of the page rather than shown as `[bracketed text]`. What's still missing is tracked in `HANDOFF_REPORT.md` and as `pending` notes in `lib/site.ts`, and asked for directly instead.

## Brand assets

`npm run brand` regenerates the favicon, app icons, social share image and web logo files from `assets/falahtrust-logo-source.jpeg` and `assets/monogram.svg`. Outputs are committed, so this only needs rerunning when the logo changes.

## Deploying (Namecheap Stellar Plus, cPanel)

Live domain: **https://falahtrustgh.com** (document root `/home/<cpanel-user>/falahtrustgh.com`).

1. `npm run build` → static site in `out/` (includes `.htaccess` from `public/`).
2. Zip the *contents* of `out/` with forward-slash paths: `tar -a -c -f falahtrust-site.zip -C out .`
3. cPanel → File Manager → open the domain's document root → Upload the zip → Extract → delete the zip.

`public/.htaccess` handles clean URLs, the 404 page, www → apex redirect, security headers and caching. The HTTPS redirect is marked `HTTPS-ENABLE`.

## SEO

- Every page has its own title, meta description and canonical URL; category pages also carry keyword lists.
- Structured data: `LocalBusiness` + `FAQPage` on the homepage, `Service` + `BreadcrumbList` on each category page, `EducationalOrganization` on `/academy`, `ItemList` on `/services`.
- `public/llms.txt` gives AI assistants a plain-language summary of what the business offers — kept in sync with `lib/site.ts` by hand; update both together.
- `robots.txt`/`sitemap.xml` are generated from `site.isPreview` and `categories` — a new category is added to the sitemap automatically.

## Important

`site.isPreview` is `false`, so the site is indexable now. The privacy page still needs the client's own legal review before the business relies on it.
