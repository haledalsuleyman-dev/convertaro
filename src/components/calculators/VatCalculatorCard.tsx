"use client";

import { useMemo, useState } from "react";
import { Calculator, Percent, Minus, Plus } from "lucide-react";

type Mode = "add" | "remove";

export function VatCalculatorCard() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("100");
  const [vatRate, setVatRate] = useState("20");

  const calculation = useMemo(() => {
    const val = Number(amount);
    const rate = Number(vatRate);

    if (!Number.isFinite(val) || !Number.isFinite(rate)) return null;

    if (mode === "add") {
      const vatAmount = (val * rate) / 100;
      const total = val + vatAmount;
      return {
        vatAmount: vatAmount.toFixed(2),
        netAmount: val.toFixed(2),
        grossAmount: total.toFixed(2),
      };
    } else {
      const netAmount = val / (1 + rate / 100);
      const vatAmount = val - netAmount;
      return {
        vatAmount: vatAmount.toFixed(2),
        netAmount: netAmount.toFixed(2),
        grossAmount: val.toFixed(2),
      };
    }
  }, [mode, amount, vatRate]);

  const commonRates = [5, 10, 15, 20];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode("add")}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
            mode === "add"
              ? "bg-slate-900 text-white shadow-md shadow-slate-200"
              : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          <Plus className="h-4 w-4" /> Add VAT (Exclusive)
        </button>
        <button
          onClick={() => setMode("remove")}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
            mode === "remove"
              ? "bg-slate-900 text-white shadow-md shadow-slate-200"
              : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          <Minus className="h-4 w-4" /> Remove VAT (Inclusive)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-5 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Amount ({mode === "add" ? "Net" : "Gross"})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-8 pr-4 text-base font-medium focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">VAT Rate (%)</label>
            <div className="flex gap-3 mb-3">
              {commonRates.map((rate) => (
                <button
                  key={rate}
                  onClick={() => setVatRate(String(rate))}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                    Number(vatRate) === rate
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              <input
                type="number"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-medium focus:border-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-1 rounded-2xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest font-black text-slate-400 mb-1">Total Result</p>
              <p className="text-sm font-medium text-slate-300">
                {mode === "add" ? "Gross Amount (Incl. Tax)" : "Net Amount (Excl. Tax)"}
              </p>
            </div>
            
            <div className="my-6">
              <p className="text-5xl font-black tracking-tight">
                <span className="text-slate-500 text-2xl mr-1">$</span>
                {mode === "add" ? calculation?.grossAmount : calculation?.netAmount}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">VAT Amount</span>
                <span className="font-bold text-emerald-400">+ ${calculation?.vatAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{mode === "add" ? "Net (Original)" : "Gross (Original)"}</span>
                <span className="font-bold">${amount}</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 flex items-start gap-3">
            <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-xs leading-relaxed text-blue-900 font-medium">
              Tax laws vary by region. Always confirm official rates for your specific country or business category before filing returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
