// Generates the favicon, app icons, social share image and web-ready logo files
// from the client's logo (assets/falahtrust-logo-source.jpeg) and the simplified
// small-size monogram (assets/monogram.svg).
//
// Run with: npm run brand   (outputs are committed, so this only reruns if the logo changes)

import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const at = (rel) => fileURLToPath(new URL(rel, root));
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

await mkdir(at("public/brand/"), { recursive: true });

// 1. Cut the emblem out of its black background and crop it to a square.
const { data, info } = await sharp(at("assets/falahtrust-logo-source.jpeg"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const peak = Math.max(data[i], data[i + 1], data[i + 2]);
    // Soft ramp so anti-aliased edges fade instead of leaving a black fringe.
    data[i + 3] = peak <= 16 ? 0 : peak >= 48 ? 255 : Math.round(((peak - 16) / 32) * 255);
    if (data[i + 3] > 24) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const w = maxX - minX + 1;
const h = maxY - minY + 1;
const side = Math.max(w, h);
const emblem = await sharp(data, { raw: info })
  .extract({ left: minX, top: minY, width: w, height: h })
  .extend({
    top: Math.floor((side - h) / 2),
    bottom: Math.ceil((side - h) / 2),
    left: Math.floor((side - w) / 2),
    right: Math.ceil((side - w) / 2),
    background: CLEAR,
  })
  .png()
  .toBuffer();

const sized = (size) => sharp(emblem).resize(size, size).png().toBuffer();
const onWhite = async (size, inner) =>
  sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: await sized(inner), gravity: "center" }])
    .png()
    .toBuffer();

await sharp(emblem).resize(640, 640).webp({ quality: 90 }).toFile(at("public/brand/falahtrust-emblem.webp"));
await sharp(emblem).resize(128, 128).webp({ quality: 92 }).toFile(at("public/brand/falahtrust-emblem-128.webp"));
await writeFile(at("public/brand/falahtrust-emblem.png"), await sized(512));

// 2. Logo on white (owner's choice) for print/social use, and the app icons.
const logoWhite = await onWhite(1024, 880);
await writeFile(at("public/brand/falahtrust-logo-white.png"), logoWhite);
await sharp(logoWhite).jpeg({ quality: 92 }).toFile(at("public/brand/falahtrust-logo-white.jpg"));
await writeFile(at("app/apple-icon.png"), await onWhite(180, 152));
await writeFile(at("public/brand/icon-192.png"), await onWhite(192, 166));
await writeFile(at("public/brand/icon-512.png"), await onWhite(512, 444));
await writeFile(at("public/brand/icon-maskable-512.png"), await onWhite(512, 330));

// 3. Favicon: the detailed emblem turns to mush at 16px, so tabs use the simplified monogram.
const monogram = await readFile(at("assets/monogram.svg"));
await copyFile(at("assets/monogram.svg"), at("app/icon.svg"));
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((s) => sharp(monogram, { density: 600 }).resize(s, s).png().toBuffer()),
);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
const directory = Buffer.alloc(16 * pngs.length);
let offset = header.length + directory.length;
pngs.forEach((png, n) => {
  const o = n * 16;
  directory.writeUInt8(icoSizes[n], o);
  directory.writeUInt8(icoSizes[n], o + 1);
  directory.writeUInt16LE(1, o + 4);
  directory.writeUInt16LE(32, o + 6);
  directory.writeUInt32LE(png.length, o + 8);
  directory.writeUInt32LE(offset, o + 12);
  offset += png.length;
});
await writeFile(at("app/favicon.ico"), Buffer.concat([header, directory, ...pngs]));

// 4. Social share image (1200x630) used by WhatsApp, Facebook, X and LinkedIn previews.
const font = "Segoe UI, Arial, Helvetica, sans-serif";
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g1" cx="88%" cy="8%" r="65%">
      <stop offset="0" stop-color="#D4A72C" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#D4A72C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="5%" cy="100%" r="70%">
      <stop offset="0" stop-color="#1F4AA8" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#1F4AA8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" x2="1">
      <stop offset="0" stop-color="#F6DC8A"/>
      <stop offset="1" stop-color="#D4A72C"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#06122B"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <rect x="80" y="150" width="56" height="4" rx="2" fill="url(#gold)"/>
  <text x="80" y="128" font-family="${font}" font-size="26" font-weight="600" letter-spacing="6" fill="#F3D98B">FALAHTRUST ENTERPRISE</text>
  <text x="80" y="250" font-family="${font}" font-size="62" font-weight="700" fill="#FFFFFF">Everyday business</text>
  <text x="80" y="330" font-family="${font}" font-size="62" font-weight="700" fill="#FFFFFF">services, in one</text>
  <text x="80" y="410" font-family="${font}" font-size="62" font-weight="700" fill="url(#gold)">trusted place.</text>
  <text x="80" y="520" font-family="${font}" font-size="27" fill="#C7D2E6">Teaching minds &#183; Building wealth &#183; Serving faith</text>
</svg>`;
const disc = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="470" height="470"><circle cx="235" cy="235" r="231" fill="#FFFFFF" stroke="#E9C25A" stroke-opacity="0.7" stroke-width="6"/></svg>`,
);
await sharp(Buffer.from(ogSvg))
  .composite([
    { input: disc, left: 680, top: 80 },
    { input: await sized(380), left: 725, top: 125 },
  ])
  .png()
  .toFile(at("app/opengraph-image.png"));

console.log(`Emblem crop ${w}x${h} -> square ${side}px. Brand assets written.`);
