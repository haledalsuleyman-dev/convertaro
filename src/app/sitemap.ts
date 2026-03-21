import { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";

const converters = convertersData as Converter[];
const BASE_URL = "https://convertaro.com";

// High-priority converters that get more search traffic
const HIGH_PRIORITY_SLUGS = new Set([
  "cm-to-inches", "inches-to-cm",
  "kg-to-lbs", "lbs-to-kg",
  "miles-to-km", "km-to-miles",
  "celsius-to-fahrenheit", "fahrenheit-to-celsius",
  "m-to-feet", "feet-to-m",
  "mph-to-kmh", "kmh-to-mph",
  "mb-to-gb", "gb-to-mb",
  "liters-to-gallons", "gallons-to-liters",
  "kg-to-grams", "pounds-to-ounces",
  "meters-to-yards", "yards-to-meters",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Static pages
  const staticPages = [
    { path: "/about",   changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly"  as const, priority: 0.3 },
    { path: "/terms",   changeFrequency: "yearly"  as const, priority: 0.3 },
  ];

  staticPages.forEach((page) => {
    routes.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  // Category pages — high priority (they rank for broad keywords)
  categories.forEach((category) => {
    routes.push({
      url: `${BASE_URL}/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  });

  // Converter pages — tiered priority
  converters.forEach((converter) => {
    const isHighPriority = HIGH_PRIORITY_SLUGS.has(converter.metadata.slug);
    routes.push({
      url: `${BASE_URL}/${converter.category}/${converter.metadata.slug}`,
      lastModified: new Date(converter.metadata.lastUpdated),
      changeFrequency: "monthly",
      priority: isHighPriority ? 0.75 : 0.55,
    });
  });

  return routes;
}
