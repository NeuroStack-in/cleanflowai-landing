import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cleanflowai.com"

  return [
    // Core pages
    { url: `${base}`,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/cleanai`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Solutions
    { url: `${base}/solutions/data-profiling`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions/data-quality`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions/data-transformation`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions/data-migration`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions/data-modernization`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/solutions/data-security`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Products
    { url: `${base}/products/data-governance`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Blog index
    { url: `${base}/blog`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },

    // Blog posts
    { url: `${base}/blog/data-quality-crisis`,         lastModified: new Date("2026-05-28"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/data-quality-issues`,         lastModified: new Date("2026-05-19"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/data-profiling`,              lastModified: new Date("2026-05-08"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/legacy-data-modernization`,   lastModified: new Date("2026-04-24"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog/legacy-modernization-stats`,  lastModified: new Date("2026-04-10"), changeFrequency: "yearly", priority: 0.6 },
  ]
}
