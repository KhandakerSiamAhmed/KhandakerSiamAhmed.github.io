import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://khandakersiamahmed.github.io";
    const now = new Date("2026-03-04");

    return [
        {
            url: base,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: `${base}/projects`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${base}/achievements`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${base}/education`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.7,
        },
        {
            url: `${base}/experience`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.7,
        },
        {
            url: `${base}/skills`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${base}/social`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ];
}
