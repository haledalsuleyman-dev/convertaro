"use client";

import { useMemo, useState } from "react";
import { calculateLoanPayment } from "@/lib/calculators";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function LoanCalculatorCard() {
  const [principal, setPrincipal] = useState("25000");
  const [annualRate, setAnnualRate] = useState("7.5");
  const [months, setMonths] = useState("60");

  const { monthly, totalPaid, totalInterest } = useMemo(() => {
    const p = Number(principal);
    const r = Number(annualRate);
    const m = Number(months);

    const monthlyPayment = calculateLoanPayment(p, r, m);
    const total = monthlyPayment * (m > 0 ? m : 0);

    return {
      monthly: monthlyPayment,
      totalPaid: total,
      totalInterest: total - (p > 0 ? p : 0),
    };
  }, [principal, annualRate, months]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Loan amount</span>
          <input
            type="number"
            min="0"
            value={principal}
            onChange={(event) => setPrincipal(event.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Annual interest rate (%)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={annualRate}
            onChange={(event) => setAnnualRate(event.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Term (months)</span>
          <input
            type="number"
            min="1"
            value={months}
            onChange={(event) => setMonths(event.target.value)}
            className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/6 p-5">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary">Estimated payment</p>
        <p className="mt-2 text-4xl font-black text-text-primary">{formatCurrency(monthly || 0)}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-text-secondary">Total paid</dt>
            <dd className="font-semibold text-text-primary">{formatCurrency(totalPaid || 0)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-text-secondary">Total interest</dt>
            <dd className="font-semibold text-text-primary">{formatCurrency(totalInterest || 0)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
