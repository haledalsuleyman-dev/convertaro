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
import { Home, Wallet, Percent, Calendar, ShieldCheck, Landmark } from "lucide-react";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}

export function MortgageCalculatorCard() {
  const [homePrice, setHomePrice] = useState("450000");
  const [downPayment, setDownPayment] = useState("90000");
  const [annualRate, setAnnualRate] = useState("6.75");
  const [years, setYears] = useState("30");
  const [monthlyTax, setMonthlyTax] = useState("350");
  const [monthlyInsurance, setMonthlyInsurance] = useState("120");

  const [result, setResult] = useState<{
    principal: number;
    monthlyPI: number;
    monthlyTotal: number;
    totalInterest: number;
    tax: number;
    insurance: number;
  } | null>(null);

  const handleCalculate = () => {
    const price = Number(homePrice);
    const down = Number(downPayment);
    const rate = Number(annualRate);
    const termYears = Number(years);
    const taxValue = Number(monthlyTax);
    const insuranceValue = Number(monthlyInsurance);

    const principal = Math.max(price - down, 0);
    const monthsNum = Math.max(termYears * 12, 0);
    const monthlyPI = calculateLoanPayment(principal, rate, monthsNum);
    const monthlyTotal = monthlyPI + (taxValue > 0 ? taxValue : 0) + (insuranceValue > 0 ? insuranceValue : 0);
    const totalInterestValue = monthlyPI * (monthsNum > 0 ? monthsNum : 0) - principal;

    setResult({
      principal,
      monthlyPI,
      monthlyTotal,
      totalInterest: totalInterestValue,
      tax: taxValue,
      insurance: insuranceValue
    });
  };

  const handleReset = () => {
    setHomePrice("450000");
    setDownPayment("90000");
    setAnnualRate("6.75");
    setYears("30");
    setMonthlyTax("350");
    setMonthlyInsurance("120");
    setResult(null);
  };

  return (
    <CalculatorContainer>
      <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} title="Property Details">
        <CalculatorInputGroup 
          label="Home Price ($)" 
          helperText="The total purchase price of the home"
          icon={<Home className="h-4 w-4" />}
        >
          <Input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="e.g. 450000" />
        </CalculatorInputGroup>

        <CalculatorInputGroup 
          label="Down Payment ($)" 
          helperText="Amount paid upfront toward the purchase"
          icon={<Wallet className="h-4 w-4" />}
        >
          <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="e.g. 90000" />
        </CalculatorInputGroup>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInputGroup 
            label="Interest Rate (%)" 
            icon={<Percent className="h-4 w-4" />}
          >
            <Input type="number" step="0.01" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} placeholder="e.g. 6.75" />
          </CalculatorInputGroup>
          <CalculatorInputGroup 
            label="Loan Term (Years)" 
            icon={<Calendar className="h-4 w-4" />}
          >
            <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 30" />
          </CalculatorInputGroup>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInputGroup 
            label="Property Tax ($/mo)" 
            icon={<Landmark className="h-4 w-4" />}
          >
            <Input type="number" value={monthlyTax} onChange={(e) => setMonthlyTax(e.target.value)} placeholder="e.g. 350" />
          </CalculatorInputGroup>
          <CalculatorInputGroup 
            label="Insurance ($/mo)" 
            icon={<ShieldCheck className="h-4 w-4" />}
          >
            <Input type="number" value={monthlyInsurance} onChange={(e) => setMonthlyInsurance(e.target.value)} placeholder="e.g. 120" />
          </CalculatorInputGroup>
        </div>
      </CalculatorForm>

      <CalculatorResultPanel 
        result={result ? formatCurrency(result.monthlyTotal) : "$—"} 
        label="Monthly Payment"
        title="Mortgage Summary"
        hint={result ? "Estimated full monthly PITI cost" : "Enter figures and calculate"}
      >
        {result && (
          <div className="space-y-4">
            <CalculatorResultRow label="Loan Principal" value={formatCurrency(result.principal)} />
            <CalculatorResultRow label="Principal & Interest" value={formatCurrency(result.monthlyPI)} />
            <CalculatorResultRow label="Property Taxes" value={formatCurrency(result.tax)} />
            <CalculatorResultRow label="Home Insurance" value={formatCurrency(result.insurance)} />
            <CalculatorResultRow label="Total Interest Paid" value={formatCurrency(result.totalInterest)} />
            <div className="pt-2 border-t border-slate-100 mt-2">
              <CalculatorResultRow label="Estimated Total" value={formatCurrency(result.monthlyTotal)} isBold />
            </div>
            <div className="mt-4 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-[11px] text-indigo-700 text-center leading-relaxed">
              PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a monthly mortgage payment.
            </div>
          </div>
        )}
      </CalculatorResultPanel>
    </CalculatorContainer>
  );
}
