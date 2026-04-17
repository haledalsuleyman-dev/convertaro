"use client";

import { useState } from "react";
import { 
  CalculatorContainer, 
  CalculatorForm, 
  CalculatorResultPanel, 
  CalculatorInputGroup,
  CalculatorResultRow 
} from "./CalculatorUI";
import { Input } from "@/components/ui/Input";
import { Banknote, Percent, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "add" | "remove";

export function VatCalculatorCard() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("100");
  const [vatRate, setVatRate] = useState("20");
  const [result, setResult] = useState<{
    vatAmount: string;
    netAmount: string;
    grossAmount: string;
  } | null>(null);

  const handleCalculate = () => {
    const val = Number(amount);
    const rate = Number(vatRate);

    if (!Number.isFinite(val) || !Number.isFinite(rate)) {
      setResult(null);
      return;
    }

    if (mode === "add") {
      const vatAmount = (val * rate) / 100;
      const total = val + vatAmount;
      setResult({
        vatAmount: vatAmount.toFixed(2),
        netAmount: val.toFixed(2),
        grossAmount: total.toFixed(2),
      });
    } else {
      const netAmount = val / (1 + rate / 100);
      const vatAmount = val - netAmount;
      setResult({
        vatAmount: vatAmount.toFixed(2),
        netAmount: netAmount.toFixed(2),
        grossAmount: val.toFixed(2),
      });
    }
  };

  const handleReset = () => {
    setAmount("100");
    setVatRate("20");
    setMode("add");
    setResult(null);
  };

  const commonRates = [5, 10, 15, 20];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200 shadow-inner">
        <button
          onClick={() => { setMode("add"); setResult(null); }}
          className={cn(
             "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200",
             mode === "add" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"
          )}
        >
          <Plus className="h-4 w-4" /> Add VAT (Exclusive)
        </button>
        <button
          onClick={() => { setMode("remove"); setResult(null); }}
          className={cn(
             "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200",
             mode === "remove" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"
          )}
        >
          <Minus className="h-4 w-4" /> Remove VAT (Inclusive)
        </button>
      </div>

      <CalculatorContainer>
        <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} title="Tax Settings">
          <CalculatorInputGroup 
            label={mode === "add" ? "Net Amount ($)" : "Gross Amount ($)"}
            helperText={mode === "add" ? "Amount before tax" : "Amount including tax"}
            icon={<Banknote className="h-4 w-4" />}
          >
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </CalculatorInputGroup>

          <CalculatorInputGroup 
            label="VAT Rate (%)"
            icon={<Percent className="h-4 w-4" />}
          >
            <div className="flex gap-2 mb-3">
              {commonRates.map((rate) => (
                <button
                  key={rate}
                  onClick={() => setVatRate(String(rate))}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold border transition-all",
                    Number(vatRate) === rate
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 shadow-sm"
                  )}
                >
                  {rate}%
                </button>
              ))}
            </div>
            <Input
              type="number"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              className="text-base font-medium"
            />
          </CalculatorInputGroup>
        </CalculatorForm>

        <CalculatorResultPanel 
          result={result ? (mode === "add" ? result.grossAmount : result.netAmount) : "—"} 
          label={mode === "add" ? "Total Incl. Tax" : "Total Excl. Tax"}
          title="Tax Calculation"
          hint={result ? "Calculated based on selected rate" : "Adjust amount and calculate"}
        >
          {result && (
            <div className="space-y-4">
              <CalculatorResultRow label="VAT Rate" value={`${vatRate}%`} />
              <CalculatorResultRow label="VAT Amount" value={`$${result.vatAmount}`} />
              {mode === "add" ? (
                <>
                  <CalculatorResultRow label="Net Amount" value={`$${result.netAmount}`} />
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    <CalculatorResultRow label="Total Gross" value={`$${result.grossAmount}`} isBold />
                  </div>
                </>
              ) : (
                <>
                  <CalculatorResultRow label="Gross Amount" value={`$${result.grossAmount}`} />
                  <div className="pt-2 border-t border-slate-100 mt-2">
                    <CalculatorResultRow label="Total Net" value={`$${result.netAmount}`} isBold />
                  </div>
                </>
              )}
            </div>
          )}
        </CalculatorResultPanel>
      </CalculatorContainer>
    </div>
  );
}
