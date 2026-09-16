# Falahtrust Enterprise — landing page

Single-page marketing site for **Falahtrust Enterprise**: business registration support, document and online application help, mobile money (through authorised platforms), phone and computer accessories, delivery and education.

Built with Next.js 16 (App Router, static export), TypeScript and Tailwind CSS 4.

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
| Services, values, steps, FAQs | `services`, `pillars`, `steps`, `faqs` |
| Allow search engines to index the site | set `site.isPreview` to `false` |

The site never shows placeholder or "draft" markers to visitors — a detail that's missing (address, hours, a service's pricing) is simply left out of the page rather than shown as `[bracketed text]`. What's still missing is tracked in `HANDOFF_REPORT.md` and as `pending` notes in `lib/site.ts`, and asked for directly instead.

## Brand assets

`npm run brand` regenerates the favicon, app icons, social share image and web logo files from `assets/falahtrust-logo-source.jpeg` and `assets/monogram.svg`. Outputs are committed, so this only needs rerunning when the logo changes.

## Deploying (Namecheap Stellar Plus, cPanel)

Live domain: **https://falahtrustgh.com** (document root `/home/<cpanel-user>/falahtrustgh.com`).

1. `npm run build` → static site in `out/` (includes `.htaccess` from `public/`).
2. Zip the *contents* of `out/` with forward-slash paths: `tar -a -c -f falahtrust-site.zip -C out .`
3. cPanel → File Manager → open the domain's document root → Upload the zip → Extract → delete the zip.

`public/.htaccess` handles clean URLs, the 404 page, www → apex redirect, security headers and caching. The HTTPS redirect is marked `HTTPS-ENABLE`.

## Important

`site.isPreview` is `true`, so the site asks search engines not to index it. Flip it once the privacy page has had legal review and you're ready for the site to appear in search results.
