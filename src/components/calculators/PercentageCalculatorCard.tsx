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
import { Hash, Percent, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "percentOf" | "whatPercent" | "change";

export function PercentageCalculatorCard() {
  const [mode, setMode] = useState<Mode>("percentOf");
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");
  const [result, setResult] = useState<string | null>(null);

  const calculateResult = (mA: string, mB: string, mMode: Mode) => {
    const first = Number(mA);
    const second = Number(mB);

    if (!Number.isFinite(first) || !Number.isFinite(second)) return "—";

    if (mMode === "percentOf") {
      return `${((first / 100) * second).toFixed(2)}`;
    }

    if (mMode === "whatPercent") {
      if (second === 0) return "—";
      return `${((first / second) * 100).toFixed(2)}%`;
    }

    if (second === 0) return "—";
    const val = (((first - second) / second) * 100).toFixed(2);
    return `${val}%`;
  };

  const handleCalculate = () => {
    setResult(calculateResult(a, b, mode));
  };

  const handleReset = () => {
    setA("25");
    setB("200");
    setResult(null);
  };

  const labels = {
    percentOf: { label1: "Percentage (%)", label2: "Total Amount", icon1: <Percent className="h-4 w-4" />, icon2: <Hash className="h-4 w-4" /> },
    whatPercent: { label1: "Part Value", label2: "Whole Value", icon1: <Layers className="h-4 w-4" />, icon2: <Hash className="h-4 w-4" /> },
    change: { label1: "New Value", label2: "Original Value", icon1: <Hash className="h-4 w-4" />, icon2: <Hash className="h-4 w-4" /> },
  } as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200 shadow-inner">
        {[
          { value: "percentOf", label: "Percentage Of" },
          { value: "whatPercent", label: "Percentage Ratio" },
          { value: "change", label: "Percent Change" },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => {
              setMode(item.value as Mode);
              setResult(null);
            }}
            className={cn(
               "rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200",
               mode === item.value 
                ? "bg-white text-primary shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <CalculatorContainer>
        <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} title="Calculation Specs">
          <CalculatorInputGroup 
            label={labels[mode].label1}
            icon={labels[mode].icon1}
          >
            <Input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="e.g. 25"
            />
          </CalculatorInputGroup>

          <CalculatorInputGroup 
            label={labels[mode].label2}
            icon={labels[mode].icon2}
          >
            <Input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="e.g. 200"
            />
          </CalculatorInputGroup>
        </CalculatorForm>

        <CalculatorResultPanel 
          result={result || "—"} 
          label="Percentage Result"
          title="Result Breakdown"
          hint={result ? "Calculated with precision" : "Enter values and hit calculate"}
        >
          {result && (
            <div className="space-y-4">
              <CalculatorResultRow label="Operation" value={mode === "percentOf" ? "X% of Y" : mode === "whatPercent" ? "X / Y as %" : "% Difference"} />
              <CalculatorResultRow label="First Input" value={a} />
              <CalculatorResultRow label="Second Input" value={b} />
              <div className="pt-2 border-t border-slate-100 mt-2">
                <CalculatorResultRow label="Final Result" value={result} isBold />
              </div>
            </div>
          )}
        </CalculatorResultPanel>
      </CalculatorContainer>
    </div>
  );
}
