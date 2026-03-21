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

export function MortgageCalculatorCard() {
  const [homePrice, setHomePrice] = useState("450000");
  const [downPayment, setDownPayment] = useState("90000");
  const [annualRate, setAnnualRate] = useState("6.75");
  const [years, setYears] = useState("30");
  const [monthlyTax, setMonthlyTax] = useState("350");
  const [monthlyInsurance, setMonthlyInsurance] = useState("120");

  const summary = useMemo(() => {
    const price = Number(homePrice);
    const down = Number(downPayment);
    const rate = Number(annualRate);
    const termYears = Number(years);
    const tax = Number(monthlyTax);
    const insurance = Number(monthlyInsurance);

    const principal = Math.max(price - down, 0);
    const months = Math.max(termYears * 12, 0);
    const monthlyPI = calculateLoanPayment(principal, rate, months);
    const monthlyTotal = monthlyPI + (tax > 0 ? tax : 0) + (insurance > 0 ? insurance : 0);
    const totalInterest = monthlyPI * (months > 0 ? months : 0) - principal;

    return {
      principal,
      monthlyPI,
      monthlyTotal,
      totalInterest,
    };
  }, [homePrice, downPayment, annualRate, years, monthlyTax, monthlyInsurance]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Home price</span>
          <input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-text-secondary">Down payment</span>
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-semibold text-text-secondary">Rate (%)</span>
            <input type="number" step="0.01" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-text-secondary">Term (years)</span>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm font-semibold text-text-secondary">Tax / month</span>
            <input type="number" value={monthlyTax} onChange={(e) => setMonthlyTax(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-text-secondary">Insurance / month</span>
            <input type="number" value={monthlyInsurance} onChange={(e) => setMonthlyInsurance(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-primary/20 bg-primary/6 p-5">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary">Estimated monthly cost</p>
        <p className="mt-2 text-4xl font-black text-text-primary">{formatCurrency(summary.monthlyTotal || 0)}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-text-secondary">Loan principal</dt>
            <dd className="font-semibold text-text-primary">{formatCurrency(summary.principal || 0)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-text-secondary">P&amp;I payment</dt>
            <dd className="font-semibold text-text-primary">{formatCurrency(summary.monthlyPI || 0)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-text-secondary">Estimated total interest</dt>
            <dd className="font-semibold text-text-primary">{formatCurrency(summary.totalInterest || 0)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
