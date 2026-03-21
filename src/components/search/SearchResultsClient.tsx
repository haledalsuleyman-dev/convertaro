"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchConverters } from "@/lib/search";

interface SearchResultsClientProps {
  initialQuery: string;
}

function highlightText(text: string, query: string) {
  const safeQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!safeQuery) return text;

  const regex = new RegExp(`(${safeQuery})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === query.trim().toLowerCase()) {
      return (
        <mark key={`${part}-${index}`} className="bg-primary/15 text-primary rounded px-0.5">
          {part}
        </mark>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function SearchResultsClient({ initialQuery }: SearchResultsClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), 120);
    return () => window.clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => searchConverters(debouncedQuery, 120), [debouncedQuery]);

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-border bg-white/90 shadow-card p-5 sm:p-7">
          <h1 className="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">Search converters</h1>
          <p className="mt-2 text-sm text-text-secondary">Find any tool by converter name, category, or unit keyword.</p>

          <div className="mt-6 relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
              <Search className="h-4 w-4 text-text-secondary" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full h-12 rounded-xl border border-border bg-background/60 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Try: cm, kilo, fahrenheit"
            />
          </div>

          <div className="mt-5 text-sm text-text-secondary">
            {debouncedQuery.trim() ? `${results.length} results for "${debouncedQuery.trim()}"` : "Start typing to search all converters."}
          </div>

          {debouncedQuery.trim().length > 0 && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.path}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 hover:border-primary/35 hover:bg-white transition-colors"
                >
                  <p className="text-sm font-bold text-text-primary">
                    {highlightText(result.title, debouncedQuery)}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-primary">{highlightText(result.categoryLabel, debouncedQuery)}</p>
                  <p className="mt-1.5 text-xs text-text-secondary">{result.description}</p>
                </Link>
              ))}
            </div>
          )}

          {debouncedQuery.trim().length > 0 && results.length === 0 && (
            <div className="mt-6 rounded-xl border border-border bg-background/60 px-4 py-5 text-sm text-text-secondary">
              No converter matched this query. Try broader terms like unit names (for example, "meters", "pounds", or "fahrenheit").
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
