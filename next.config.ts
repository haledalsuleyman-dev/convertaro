import type { NextConfig } from "next";
import convertersData from "./src/data/converters.json";

type ConverterRoute = {
  category: string;
  fromUnit: string;
  toUnit: string;
  metadata: {
    slug: string;
  };
};

const converters = convertersData as ConverterRoute[];

function getGroupKey(converter: ConverterRoute): string {
  return [converter.category, converter.fromUnit, converter.toUnit].join("|");
}

function chooseCanonicalSlug(group: ConverterRoute[]): string {
  let best = group[0];

  for (let index = 1; index < group.length; index += 1) {
    const candidate = group[index];
    const lengthDifference = candidate.metadata.slug.length - best.metadata.slug.length;

    if (lengthDifference > 0) {
      best = candidate;
      continue;
    }

    if (lengthDifference === 0 && candidate.metadata.slug.localeCompare(best.metadata.slug) < 0) {
      best = candidate;
    }
  }

  return best.metadata.slug;
}

const protectedRootRoutes = new Set([
  "about",
  "contact",
  "privacy",
  "terms",
  "calculators",
  "popular-conversion-tools",
  "all-converters",
  "search",
  "guides",
  "api",
  "age-calculator",
  "bmi-calculator",
  "loan-calculator",
  "margin-calculator",
  "mortgage-calculator",
  "percentage-calculator",
  "vat-calculator",
  "favicon.ico",
  "sitemap.xml",
  "robots.txt",
  "category", // potential conflicts
]);

const groupedConverters = new Map<string, ConverterRoute[]>();

for (const converter of converters) {
  const key = getGroupKey(converter);
  const existing = groupedConverters.get(key) ?? [];
  existing.push(converter);
  groupedConverters.set(key, existing);
}

const aliasRedirects = Array.from(groupedConverters.values()).flatMap((group) => {
  const canonicalSlug = chooseCanonicalSlug(group);
  const canonicalCategory = group[0].category;
  const canonicalPath = `/${canonicalCategory}/${canonicalSlug}`;

  return group.flatMap((converter) => {
    const redirects = [];
    
    // Categorized variant redirect
    if (converter.metadata.slug !== canonicalSlug) {
      redirects.push({
        source: `/${converter.category}/${converter.metadata.slug}/:path*`,
        destination: `${canonicalPath}/:path*`,
        permanent: true,
      });
    }

    // Root-level short slug redirect (e.g., /cm-to-inches -> /length/centimeters-to-inches)
    if (!protectedRootRoutes.has(converter.metadata.slug)) {
      redirects.push({
        source: `/${converter.metadata.slug}/:path*`,
        destination: `${canonicalPath}/:path*`,
        permanent: true,
      });
    }

    return redirects;
  });
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/version.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    // Filter out duplicates and self-redirects
    const seen = new Set<string>();
    return aliasRedirects.filter((r) => {
      if (r.source === r.destination) return false;
      if (seen.has(r.source)) return false;
      seen.add(r.source);
      return true;
    });
  },
};

export default nextConfig;
