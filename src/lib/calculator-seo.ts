import type { Metadata } from "next";
import { CalculatorDefinition } from "@/data/calculators";
import { canonicalFromPath, INDEXABLE_ROBOTS } from "@/lib/seo";

export function buildCalculatorMetadata(calculator: CalculatorDefinition): Metadata {
  const canonical = canonicalFromPath(`/${calculator.slug}`);

  return {
    title: `${calculator.title} | Convertaro`,
    description: calculator.description,
    robots: INDEXABLE_ROBOTS,
    keywords: calculator.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${calculator.title} | Convertaro`,
      description: calculator.description,
      type: "website",
      url: canonical,
      siteName: "Convertaro",
    },
    twitter: {
      card: "summary_large_image",
      title: `${calculator.title} | Convertaro`,
      description: calculator.description,
    },
  };
}
