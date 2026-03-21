import type { Metadata } from "next";

type RobotsConfig = NonNullable<Metadata["robots"]>;

export const SITE_URL = "https://convertaro.com";

function normalizePath(path: string): string {
  if (!path || path === "/") return "";

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export function canonicalFromPath(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}

export function categoryCanonical(category: string): string {
  return canonicalFromPath(`/${category}`);
}

export function converterCanonical(category: string, converter: string): string {
  return canonicalFromPath(`/${category}/${converter}`);
}

export const INDEXABLE_ROBOTS: RobotsConfig = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};
