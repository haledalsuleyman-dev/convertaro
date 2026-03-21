"use client";

import { useMemo, useState } from "react";

type Mode = "percentOf" | "whatPercent" | "change";

export function PercentageCalculatorCard() {
  const [mode, setMode] = useState<Mode>("percentOf");
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");

  const result = useMemo(() => {
    const first = Number(a);
    const second = Number(b);

    if (!Number.isFinite(first) || !Number.isFinite(second)) return "-";

    if (mode === "percentOf") {
      return `${((first / 100) * second).toFixed(2)}`;
    }

    if (mode === "whatPercent") {
      if (second === 0) return "-";
      return `${((first / second) * 100).toFixed(2)}%`;
    }

    if (second === 0) return "-";
    return `${(((first - second) / second) * 100).toFixed(2)}%`;
  }, [mode, a, b]);

  const labels = {
    percentOf: ["Percent (%)", "Base value"],
    whatPercent: ["Part value", "Whole value"],
    change: ["New value", "Old value"],
  } as const;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { value: "percentOf", label: "X% of Y" },
          { value: "whatPercent", label: "X is what % of Y" },
          { value: "change", label: "% change" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setMode(item.value as Mode)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              mode === item.value
                ? "bg-primary text-white"
                : "border border-border bg-white text-text-secondary hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-text-secondary">{labels[mode][0]}</span>
            <input
              type="number"
              value={a}
              onChange={(event) => setA(event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-text-secondary">{labels[mode][1]}</span>
            <input
              type="number"
              value={b}
              onChange={(event) => setB(event.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/6 p-5 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary">Result</p>
          <p className="mt-2 text-4xl font-black text-text-primary">{result}</p>
          <p className="mt-2 text-sm text-text-secondary">Fast percentage math for pricing, analytics, and reporting.</p>
        </div>
      </div>
    </div>
  );
}
