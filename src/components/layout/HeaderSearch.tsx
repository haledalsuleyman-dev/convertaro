"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Search } from "lucide-react";

const SearchTool = dynamic(() => import("@/components/ui/SearchTool").then((mod) => mod.SearchTool), {
  ssr: false,
});

export function HeaderSearch() {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return <SearchTool variant="navbar" placeholder="Search..." />;
  }

  return (
    <button
      type="button"
      onClick={() => setIsActive(true)}
      onFocus={() => setIsActive(true)}
      className="flex h-10 w-[260px] items-center rounded-full border border-border bg-background/80 pl-3 pr-9 text-sm text-text-secondary shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
      aria-label="Open search"
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="ml-3">Search...</span>
    </button>
  );
}
