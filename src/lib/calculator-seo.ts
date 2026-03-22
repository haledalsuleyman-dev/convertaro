import type { Metadata } from "next";
import { CalculatorDefinition } from "@/data/calculators";
import {
  INDEXABLE_ROBOTS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";

export function buildCalculatorMetadata(calculator: CalculatorDefinition): Metadata {
  return {
    title: `${calculator.title} | Convertaro`,
    description: calculator.description,
    robots: INDEXABLE_ROBOTS,
    keywords: calculator.keywords,
    alternates: buildAlternates(`/${calculator.slug}`),
    openGraph: buildOpenGraph({
      title: `${calculator.title} | Convertaro`,
      description: calculator.description,
      path: `/${calculator.slug}`,
    }),
    twitter: buildTwitter(`${calculator.title} | Convertaro`, calculator.description),
  };
}
