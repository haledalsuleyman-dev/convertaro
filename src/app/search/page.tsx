import type { Metadata } from "next";
import { SearchResultsClient } from "@/components/search/SearchResultsClient";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Search converters",
  description: "Search all Convertaro converters by unit names, categories, and keywords.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const initialQuery = params.q?.trim() ?? "";

  return <SearchResultsClient initialQuery={initialQuery} />;
}
