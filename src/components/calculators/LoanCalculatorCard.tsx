"use client";

import { useState } from "react";
import { calculateLoanPayment } from "@/lib/calculators";
import { 
  CalculatorContainer, 
  CalculatorForm, 
  CalculatorResultPanel, 
  CalculatorInputGroup,
  CalculatorResultRow 
} from "./CalculatorUI";
import { Input } from "@/components/ui/Input";
import { Banknote, Percent, Calendar } from "lucide-react";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}

export function LoanCalculatorCard() {
  const [principal, setPrincipal] = useState("25000");
  const [annualRate, setAnnualRate] = useState("7.5");
  const [months, setMonths] = useState("60");
  const [result, setResult] = useState<{ 
    monthly: number; 
    totalPaid: number; 
    totalInterest: number;
    principalValue: number;
    rateValue: number;
    termValue: number;
  } | null>(null);

  const handleCalculate = () => {
    const p = Number(principal);
    const r = Number(annualRate);
    const m = Number(months);

    const monthlyPayment = calculateLoanPayment(p, r, m);
    const total = monthlyPayment * (m > 0 ? m : 0);

    setResult({
      monthly: monthlyPayment,
      totalPaid: total,
      totalInterest: total - (p > 0 ? p : 0),
      principalValue: p,
      rateValue: r,
      termValue: m
    });
  };

  const handleReset = () => {
    setPrincipal("25000");
    setAnnualRate("7.5");
    setMonths("60");
    setResult(null);
  };

  return (
    <CalculatorContainer>
      <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} title="Loan Details">
        <CalculatorInputGroup 
          label="Loan Amount ($)" 
          helperText="Total amount you wish to borrow"
          icon={<Banknote className="h-4 w-4" />}
        >
          <Input
            type="number"
            min="0"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="e.g. 25000"
          />
        </CalculatorInputGroup>

        <CalculatorInputGroup 
          label="Annual Interest Rate (%)" 
          helperText="The yearly interest rate for this loan"
          icon={<Percent className="h-4 w-4" />}
        >
          <Input
            type="number"
            min="0"
            step="0.01"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="e.g. 7.5"
          />
        </CalculatorInputGroup>

        <CalculatorInputGroup 
          label="Loan Term (Months)" 
          helperText="Duration of the loan in months"
          icon={<Calendar className="h-4 w-4" />}
        >
          <Input
            type="number"
            min="1"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="e.g. 60"
          />
        </CalculatorInputGroup>
      </CalculatorForm>

      <CalculatorResultPanel 
        result={result ? formatCurrency(result.monthly) : "$—"} 
        label="Monthly Payment"
        title="Loan Estimate"
        hint={result ? "Based on your provided terms" : "Adjust values and calculate"}
      >
        {result && (
          <div className="space-y-4">
            <CalculatorResultRow label="Total Principal" value={formatCurrency(result.principalValue)} />
            <CalculatorResultRow label="Total Interest" value={formatCurrency(result.totalInterest)} />
            <CalculatorResultRow label="Total Amount Paid" value={formatCurrency(result.totalPaid)} isBold />
            <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100 italic text-[11px] text-blue-700 text-center leading-relaxed">
              This estimate excludes taxes, insurance, or additional fees that your lender might apply.
            </div>
          </div>
        )}
      </CalculatorResultPanel>
    </CalculatorContainer>
  );
}
