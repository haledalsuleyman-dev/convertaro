import convertersData from "@/data/converters.json";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import { calculatorCategoryBySlug, calculatorCategories } from "@/data/calculator-categories";
import { Converter } from "@/types/converter";

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  slug: string;
  path: string;
  description: string;
  keywords: string[];
  score: number;
}

interface SearchDocument {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  slug: string;
  path: string;
  description: string;
  keywords: string[];
  titleNormalized: string;
  slugNormalized: string;
  categoryNormalized: string;
  keywordsNormalized: string[];
  terms: string[];
}

const converters = convertersData as Converter[];
const categoryNameBySlug = new Map(categories.map((category) => [category.slug, category.name]));

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function isSubsequence(query: string, target: string): boolean {
  if (query.length > target.length) return false;
  let queryIndex = 0;

  for (let i = 0; i < target.length && queryIndex < query.length; i += 1) {
    if (target[i] === query[queryIndex]) {
      queryIndex += 1;
    }
  }

  return queryIndex === query.length;
}

function scoreTokenMatch(queryToken: string, targetToken: string): number {
  if (queryToken === targetToken) return 28;
  if (targetToken.startsWith(queryToken)) return 20;
  if (targetToken.includes(queryToken)) return 14;
  if (queryToken.length >= 3 && isSubsequence(queryToken, targetToken)) return 8;
  return 0;
}

const converterDocs: SearchDocument[] = converters.map((converter) => {
  const categoryLabel = categoryNameBySlug.get(converter.category) ?? converter.category;
  const keywords = converter.metadata.keywords ?? [];
  const titleNormalized = normalize(converter.title);
  const slugNormalized = normalize(converter.metadata.slug.replace(/-/g, " "));
  const categoryNormalized = normalize(categoryLabel);
  const keywordsNormalized = keywords.map(normalize);

  const terms = Array.from(
    new Set([
      ...tokenize(converter.title),
      ...tokenize(converter.fromUnit),
      ...tokenize(converter.toUnit),
      ...tokenize(converter.metadata.slug),
      ...tokenize(categoryLabel),
      ...keywords.flatMap((keyword) => tokenize(keyword)),
    ])
  );

  return {
    id: converter.id,
    title: converter.title,
    category: converter.category,
    categoryLabel,
    slug: converter.metadata.slug,
    path: `/${converter.category}/${converter.metadata.slug}`,
    description: converter.description,
    keywords,
    titleNormalized,
    slugNormalized,
    categoryNormalized,
    keywordsNormalized,
    terms,
  };
});

const calculatorDocs: SearchDocument[] = calculators.map((calculator) => {
  const categoryLabel = calculatorCategoryBySlug.get(calculator.category)?.shortLabel ?? "Calculator";
  const keywords = calculator.keywords ?? [];
  const titleNormalized = normalize(calculator.title);
  const slugNormalized = normalize(calculator.slug.replace(/-/g, " "));
  const categoryNormalized = normalize(categoryLabel);
  const keywordsNormalized = keywords.map(normalize);

  const terms = Array.from(
    new Set([
      ...tokenize(calculator.title),
      ...tokenize(calculator.slug),
      ...tokenize(categoryLabel),
      ...keywords.flatMap((keyword) => tokenize(keyword)),
    ])
  );

  return {
    id: calculator.slug,
    title: calculator.title,
    category: "calculators",
    categoryLabel,
    slug: calculator.slug,
    path: `/${calculator.slug}`,
    description: calculator.description,
    keywords,
    titleNormalized,
    slugNormalized,
    categoryNormalized,
    keywordsNormalized,
    terms,
  };
});

const calculatorHubDocs: SearchDocument[] = [
  {
    id: "calculators-hub",
    title: "All Calculators",
    category: "calculators",
    categoryLabel: "Calculator Hub",
    slug: "calculators",
    path: "/calculators",
    description: "Browse all Convertaro calculators by category.",
    keywords: ["calculators", "calculator hub", "online calculators"],
    titleNormalized: normalize("All Calculators"),
    slugNormalized: normalize("calculators"),
    categoryNormalized: normalize("Calculator Hub"),
    keywordsNormalized: [normalize("calculators"), normalize("calculator hub"), normalize("online calculators")],
    terms: ["calculators", "calculator", "hub", "online"],
  },
  ...calculatorCategories.map((category) => ({
    id: `calculators-${category.slug}`,
    title: category.name,
    category: "calculators",
    categoryLabel: "Calculator Category",
    slug: category.slug,
    path: `/calculators/${category.slug}`,
    description: category.description,
    keywords: [category.name, category.shortLabel, "calculator category"],
    titleNormalized: normalize(category.name),
    slugNormalized: normalize(category.slug),
    categoryNormalized: normalize("Calculator Category"),
    keywordsNormalized: [normalize(category.name), normalize(category.shortLabel), normalize("calculator category")],
    terms: Array.from(new Set([...tokenize(category.name), ...tokenize(category.description), "calculator", "calculators"])),
  })),
];

const SEARCH_DOCS: SearchDocument[] = [...converterDocs, ...calculatorDocs, ...calculatorHubDocs];

export function searchConverters(query: string, limit = 12): SearchResult[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const queryTokens = tokenize(normalizedQuery);
  if (queryTokens.length === 0) return [];

  const scored = SEARCH_DOCS.map((doc) => {
    let score = 0;

    if (doc.titleNormalized.includes(normalizedQuery)) score += 80;
    if (doc.slugNormalized.includes(normalizedQuery)) score += 55;
    if (doc.categoryNormalized.includes(normalizedQuery)) score += 25;
    if (doc.keywordsNormalized.some((keyword) => keyword.includes(normalizedQuery))) score += 48;

    let matchedTokens = 0;
    for (const queryToken of queryTokens) {
      let tokenBest = 0;
      for (const term of doc.terms) {
        tokenBest = Math.max(tokenBest, scoreTokenMatch(queryToken, term));
      }
      if (tokenBest > 0) {
        score += tokenBest;
        matchedTokens += 1;
      }
    }

    if (queryTokens.length > 1 && matchedTokens === queryTokens.length) {
      score += 22;
    }

    return {
      doc,
      score,
    };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.doc.title.localeCompare(b.doc.title);
    })
    .slice(0, limit);

  return scored.map(({ doc, score }) => ({
    id: doc.id,
    title: doc.title,
    category: doc.category,
    categoryLabel: doc.categoryLabel,
    slug: doc.slug,
    path: doc.path,
    description: doc.description,
    keywords: doc.keywords,
    score,
  }));
}
