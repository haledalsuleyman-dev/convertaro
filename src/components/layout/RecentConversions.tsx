"use client";

import Link from "next/link";
import { History, ChevronRight } from "lucide-react";
import { useRecentConversions } from "@/hooks/useRecentConversions";

export function RecentConversions() {
  const { recent, isLoaded } = useRecentConversions();

  if (!isLoaded || recent.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          Recent Conversions
        </h3>
      </div>
      
      <div className="space-y-2">
        {recent.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.slug}
            className="group flex flex-col p-2 rounded-md hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">{tool.title}</span>
              <ChevronRight className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-slate-400 capitalize">{tool.category}</span>
              {tool.lastValue && (
                <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                  Val: {tool.lastValue}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
