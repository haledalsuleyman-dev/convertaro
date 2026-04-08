"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/lib/search";

type SearchToolVariant = "hero" | "navbar";

interface SearchToolProps {
  variant?: SearchToolVariant;
  placeholder?: string;
}

export function SearchTool({ variant = "hero", placeholder }: SearchToolProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 120);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const nextQuery = debouncedQuery.trim();

    if (nextQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    fetch(`/api/search?q=${encodeURIComponent(nextQuery)}&limit=8`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data: SearchResult[]) => {
        setResults(data);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setResults([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = activeIndex >= 0 ? results[activeIndex] : results[0];

    if (candidate) {
      router.push(candidate.path);
      setIsOpen(false);
      return;
    }

    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleNavigateResult = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsOpen(true);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((prev) => (prev + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const isHero = variant === "hero";
  const inputPlaceholder = placeholder ?? (isHero ? "Search conversions..." : "Search tools");
  const trimmedQuery = query.trim();
  const showDropdown = isOpen && trimmedQuery.length >= 2;

  const renderHighlightedText = (text: string, queryValue: string) => {
    const safeQuery = queryValue.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!safeQuery) return text;

    const regex = new RegExp(`(${safeQuery})`, "ig");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === queryValue.trim().toLowerCase()) {
        return (
          <mark key={`${part}-${index}`} className="bg-primary/15 text-primary rounded px-0.5">
            {part}
          </mark>
        );
      }

      return <span key={`${part}-${index}`}>{part}</span>;
    });
  };

  const dropdownMessage = isLoading
    ? "Searching..."
    : results.length === 0
      ? "No direct matches. Press Enter to view all search results."
      : null;

  return (
    <div ref={containerRef} className={isHero ? "relative w-full" : "relative w-[260px]"}>
      <form onSubmit={handleSearch} className="relative">
        <div className={isHero ? "absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none" : "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"}>
          <Search className={isHero ? "h-5 w-5 text-text-secondary" : "h-4 w-4 text-text-secondary"} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleInputKeyDown}
          placeholder={inputPlaceholder}
          aria-label="Search converters"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          className={
            isHero
              ? "block w-full h-16 pl-12 pr-28 rounded-full bg-white/92 backdrop-blur border border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.12)] text-base text-text-primary placeholder:text-text-secondary/60 outline-none focus:ring-4 focus:ring-slate-900/10"
              : "block w-full h-10 pl-9 pr-9 rounded-full bg-background/80 backdrop-blur border border-border shadow-sm text-sm text-text-primary placeholder:text-text-secondary/60 outline-none focus:ring-2 focus:ring-cyan-500/20"
          }
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
              setIsOpen(false);
            }}
            className={isHero ? "absolute inset-y-0 right-20 px-3 inline-flex items-center text-text-secondary" : "absolute inset-y-0 right-0 px-3 inline-flex items-center text-text-secondary"}
          >
            <X className={isHero ? "h-5 w-5" : "h-4 w-4"} />
          </button>
        )}

        {isHero && (
          <button
            type="submit"
            className="absolute inset-y-0 right-1.5 my-1.5 px-6 rounded-full bg-slate-950 text-white text-sm font-semibold shadow-md shadow-slate-900/20 hover:bg-slate-800 transition-colors"
          >
            Search
          </button>
        )}
      </form>

      {showDropdown && (
        <div className="absolute top-full mt-2 w-full rounded-2xl border border-border bg-white shadow-xl shadow-slate-900/10 overflow-hidden z-50">
          {results.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      handleNavigateResult(result.path);
                    }}
                    className={`w-full text-left px-4 py-3 border-b last:border-b-0 border-border/60 transition-colors ${
                      index === activeIndex ? "bg-primary/8" : "hover:bg-background/80"
                    }`}
                  >
                    <p className="text-sm font-semibold text-text-primary">
                      {renderHighlightedText(result.title, debouncedQuery)}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-text-secondary">
                      {renderHighlightedText(result.categoryLabel, debouncedQuery)}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : dropdownMessage ? <div className="px-4 py-3 text-sm text-text-secondary">{dropdownMessage}</div> : null}

          {trimmedQuery.length > 0 && (
            <div className="border-t border-border/70 px-4 py-2.5 bg-background/60">
              <Link
                href={`/search?q=${encodeURIComponent(trimmedQuery)}`}
                onMouseDown={(event) => {
                  event.preventDefault();
                  router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
                  setIsOpen(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark"
              >
                View all results
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
