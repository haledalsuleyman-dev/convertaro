"use client";

import { useMemo, useState } from "react";
import { TrendingUp, DollarSign, PieChart, ShieldCheck } from "lucide-react";

export function MarginCalculatorCard() {
  const [cost, setCost] = useState("100");
  const [margin, setMargin] = useState("25");

  const results = useMemo(() => {
    const c = Number(cost);
    const m = Number(margin);

    if (!Number.isFinite(c) || !Number.isFinite(m) || m >= 100) return null;

    // Selling Price = Cost / (1 - Margin/100)
    const revenue = c / (1 - m / 100);
    const profit = revenue - c;
    const markup = (profit / c) * 100;

    return {
      revenue: revenue.toFixed(2),
      profit: profit.toFixed(2),
      markup: markup.toFixed(2),
    };
  }, [cost, margin]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Cost Price
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="h-12 w-full rounded-xl border border-emerald-200 bg-white px-4 text-base font-bold text-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
              placeholder="0.00"
            />
            <p className="mt-1.5 text-[10px] text-emerald-600 font-medium">What you pay to acquire the item</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <PieChart className="h-4 w-4" /> Profit Margin (%)
            </label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              className="h-12 w-full rounded-xl border border-emerald-200 bg-white px-4 text-base font-bold text-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
              placeholder="0"
            />
            <p className="mt-1.5 text-[10px] text-emerald-600 font-medium">Your desired percentage of profit from sale</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest font-black text-slate-400">Target Selling Price</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          
          <div className="mb-6">
            <p className="text-5xl font-black tracking-tight text-white">
              <span className="text-slate-500 text-2xl mr-1">$</span>
              {results?.revenue}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Total Profit</p>
              <p className="text-lg font-black text-emerald-400">+${results?.profit}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Markup Ratio</p>
              <p className="text-lg font-black text-white">{results?.markup}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-5 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
          <ShieldCheck className="h-6 w-6 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Professional Tip for Sellers</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Many businesses confuse <strong>margin</strong> with <strong>markup</strong>. A 25% margin means you need a 33.3% markup on your cost. Use this tool to ensure you don't underprice your inventory.
          </p>
        </div>
      </div>
    </div>
  );
}
