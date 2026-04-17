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
import { Banknote, Percent, TrendingUp, Info } from "lucide-react";

export function MarginCalculatorCard() {
  const [cost, setCost] = useState("100");
  const [margin, setMargin] = useState("25");
  const [result, setResult] = useState<{
    revenue: string;
    profit: string;
    markup: string;
    costValue: string;
    marginValue: string;
  } | null>(null);

  const handleCalculate = () => {
    const c = Number(cost);
    const m = Number(margin);

    if (!Number.isFinite(c) || !Number.isFinite(m) || m >= 100) {
      setResult(null);
      return;
    }

    const revenue = c / (1 - m / 100);
    const profit = revenue - c;
    const markup = (profit / c) * 100;

    setResult({
      revenue: revenue.toFixed(2),
      profit: profit.toFixed(2),
      markup: markup.toFixed(2),
      costValue: cost,
      marginValue: margin
    });
  };

  const handleReset = () => {
    setCost("100");
    setMargin("25");
    setResult(null);
  };

  return (
    <CalculatorContainer>
      <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} title="Acquisition & Profit Target">
        <CalculatorInputGroup 
          label="Cost Price ($)" 
          helperText="The price you paid to acquire the item"
          icon={<Banknote className="h-4 w-4" />}
        >
          <Input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="0.00"
          />
        </CalculatorInputGroup>

        <CalculatorInputGroup 
          label="Target Margin (%)" 
          helperText="The percentage of profit you want from the final sale"
          icon={<Percent className="h-4 w-4" />}
        >
          <Input
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            placeholder="0"
          />
        </CalculatorInputGroup>
      </CalculatorForm>

      <CalculatorResultPanel 
        result={result ? `$${result.revenue}` : "$—"} 
        label="Target Selling Price"
        title="Revenue Analysis"
        hint={result ? "Calculators target price for profitability" : "Enter figures and calculate"}
      >
        {result && (
          <div className="space-y-4">
            <CalculatorResultRow label="Cost Price" value={`$${result.costValue}`} />
            <CalculatorResultRow label="Target Margin" value={`${result.marginValue}%`} />
            <CalculatorResultRow label="Gross Profit" value={`$${result.profit}`} />
            <CalculatorResultRow label="Required Markup" value={`${result.markup}%`} />
            <div className="pt-2 border-t border-slate-100 mt-2">
              <CalculatorResultRow label="Selling Price" value={`$${result.revenue}`} isBold />
            </div>
            <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex gap-3">
              <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-800 leading-relaxed italic">
                Business intelligence: A target margin of {result.marginValue}% requires a markup of {result.markup}% over your cost.
              </p>
            </div>
          </div>
        )}
      </CalculatorResultPanel>
    </CalculatorContainer>
  );
}
