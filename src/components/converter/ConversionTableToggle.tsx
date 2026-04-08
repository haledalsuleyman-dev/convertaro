"use client";

import { useState } from "react";

interface ConversionTableToggleProps {
  tableId: string;
  totalCount: number;
}

export function ConversionTableToggle({ tableId, totalCount }: ConversionTableToggleProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleRows = () => {
    const rows = document.querySelectorAll<HTMLElement>(`[data-extra-table-row='${tableId}']`);
    const nextExpanded = !expanded;

    rows.forEach((row) => {
      row.hidden = !nextExpanded;
    });

    setExpanded(nextExpanded);
  };

  return (
    <button
      type="button"
      onClick={toggleRows}
      className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
    >
      {expanded ? "Show fewer values" : `Show all ${totalCount} values`}
    </button>
  );
}
