"use client";

import { useMemo, useState } from "react";
import { calculateBMI, getBMICategory } from "@/lib/calculators";

export function BmiCalculatorCard() {
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");

  const bmi = useMemo(() => {
    const height = Number(heightCm);
    const weight = Number(weightKg);
    return calculateBMI(weight, height);
  }, [heightCm, weightKg]);

  const bmiDisplay = bmi > 0 ? bmi.toFixed(1) : "-";
  const category = getBMICategory(bmi);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Height (cm)</span>
          <input
            type="number"
            min="1"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Weight (kg)</span>
          <input
            type="number"
            min="1"
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/6 p-5 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary">Result</p>
        <p className="mt-2 text-4xl font-black text-text-primary">{bmiDisplay}</p>
        <p className="mt-2 text-sm text-text-secondary">Category: <span className="font-semibold text-text-primary">{category}</span></p>
      </div>
    </div>
  );
}
