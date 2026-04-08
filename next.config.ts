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

const groupedConverters = new Map<string, ConverterRoute[]>();

for (const converter of converters) {
  const key = getGroupKey(converter);
  const existing = groupedConverters.get(key) ?? [];
  existing.push(converter);
  groupedConverters.set(key, existing);
}

const aliasRedirects = Array.from(groupedConverters.values()).flatMap((group) => {
  const canonicalSlug = chooseCanonicalSlug(group);

  return group
    .filter((converter) => converter.metadata.slug !== canonicalSlug)
    .map((converter) => ({
      source: `/${converter.category}/${converter.metadata.slug}`,
      destination: `/${converter.category}/${canonicalSlug}`,
      permanent: true,
    }));
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
    return aliasRedirects;
  },
};

export default nextConfig;
