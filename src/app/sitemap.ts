import { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import { calculatorCategories } from "@/data/calculator-categories";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { SITE_URL } from "@/lib/seo";

const converters = convertersData as Converter[];
const BASE_URL = SITE_URL;

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
  "celsius-to-kelvin", "kelvin-to-celsius",
  "feet-to-inches", "inches-to-feet",
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
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/calculators", changeFrequency: "weekly" as const, priority: 0.85 },
  ];

  staticPages.forEach((page) => {
    routes.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  // Calculator pages
  calculators.forEach((calculator) => {
    routes.push({
      url: `${BASE_URL}/${calculator.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Calculator category pages
  calculatorCategories.forEach((category) => {
    routes.push({
      url: `${BASE_URL}/calculators/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  // Category pages - high priority (they rank for broad keywords)
  categories.forEach((category) => {
    routes.push({
      url: `${BASE_URL}/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Converter pages - tiered priority
  converters.forEach((converter) => {
    const isHighPriority = HIGH_PRIORITY_SLUGS.has(converter.metadata.slug);
    routes.push({
      url: `${BASE_URL}/${converter.category}/${converter.metadata.slug}`,
      lastModified: new Date(converter.metadata.lastUpdated),
      changeFrequency: "monthly",
      priority: isHighPriority ? 0.8 : 0.6,
    });
  });

  return routes;
}

// Export function to get all page URLs for indexing
export function getAllPageUrls(): string[] {
  const urls: string[] = [BASE_URL];

  // Static pages
  urls.push(
    `${BASE_URL}/about`,
    `${BASE_URL}/contact`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/terms`,
    `${BASE_URL}/calculators`
  );

  // Calculator pages
  calculators.forEach((calc) => {
    urls.push(`${BASE_URL}/${calc.slug}`);
  });

  // Calculator category pages
  calculatorCategories.forEach((cat) => {
    urls.push(`${BASE_URL}/calculators/${cat.slug}`);
  });

  // Category pages
  categories.forEach((cat) => {
    urls.push(`${BASE_URL}/${cat.slug}`);
  });

  // Converter pages
  converters.forEach((conv) => {
    urls.push(`${BASE_URL}/${conv.category}/${conv.metadata.slug}`);
  });

  return urls;
}

// Get high priority URLs for immediate indexing
export function getHighPriorityUrls(): string[] {
  const urls: string[] = [BASE_URL];

  // Top converters
  HIGH_PRIORITY_SLUGS.forEach((slug) => {
    const converter = converters.find((c) => c.metadata.slug === slug);
    if (converter) {
      urls.push(`${BASE_URL}/${converter.category}/${slug}`);
    }
  });

  // All category pages
  categories.forEach((cat) => {
    urls.push(`${BASE_URL}/${cat.slug}`);
  });

  // All calculators
  calculators.forEach((calc) => {
    urls.push(`${BASE_URL}/${calc.slug}`);
  });

  return urls;
}

// Get statistics
export function getSiteStats() {
  return {
    totalPages: getAllPageUrls().length,
    staticPages: 5,
    categoryPages: categories.length,
    calculatorPages: calculators.length + calculatorCategories.length,
    converterPages: converters.length,
    highPriorityPages: getHighPriorityUrls().length,
  };
}
