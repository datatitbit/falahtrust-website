import type { MetadataRoute } from "next";
import { categories, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    ...categories.map((c) => ({
      url: `${site.url}/services/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/academy`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
