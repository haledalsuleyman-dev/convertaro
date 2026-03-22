import type { Metadata } from "next";
import { SearchResultsClient } from "@/components/search/SearchResultsClient";
import { buildAlternates } from "@/lib/seo";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Search converters",
  description: "Search all Convertaro converters by unit names, categories, and keywords.",
  alternates: buildAlternates("/search"),
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const initialQuery = params.q?.trim() ?? "";

  return <SearchResultsClient initialQuery={initialQuery} />;
}
