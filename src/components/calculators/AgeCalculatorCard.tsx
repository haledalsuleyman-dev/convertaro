"use client";

import { useMemo, useState } from "react";
import { calculateAgeBreakdown } from "@/lib/calculators";

function todayISODate(): string {
  return new Date().toISOString().split("T")[0];
}

export function AgeCalculatorCard() {
  const [birthDate, setBirthDate] = useState("1995-01-01");
  const [referenceDate, setReferenceDate] = useState(todayISODate());

  const result = useMemo(() => {
    if (!birthDate || !referenceDate) return { years: 0, months: 0, days: 0 };
    return calculateAgeBreakdown(new Date(birthDate), new Date(referenceDate));
  }, [birthDate, referenceDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Date of birth</span>
          <input
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Reference date</span>
          <input
            type="date"
            value={referenceDate}
            onChange={(event) => setReferenceDate(event.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/6 p-5 flex items-center">
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-primary">Exact age</p>
          <p className="mt-2 text-3xl font-black text-text-primary">
            {result.years}y {result.months}m {result.days}d
          </p>
          <p className="mt-2 text-sm text-text-secondary">Calculated from selected dates using calendar-accurate difference.</p>
        </div>
      </div>
    </div>
  );
}
