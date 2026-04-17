"use client";

import { useState } from "react";
import { calculateAgeBreakdown } from "@/lib/calculators";
import { 
  CalculatorContainer, 
  CalculatorForm, 
  CalculatorResultPanel, 
  CalculatorInputGroup,
  CalculatorResultRow 
} from "./CalculatorUI";
import { Input } from "@/components/ui/Input";
import { Cake, CalendarDays } from "lucide-react";

function todayISODate(): string {
  return new Date().toISOString().split("T")[0];
}

export function AgeCalculatorCard() {
  const [birthDate, setBirthDate] = useState("1995-01-01");
  const [referenceDate, setReferenceDate] = useState(todayISODate());
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculate = () => {
    if (!birthDate || !referenceDate) {
      setResult(null);
      return;
    }
    const age = calculateAgeBreakdown(new Date(birthDate), new Date(referenceDate));
    setResult(age);
  };

  const handleReset = () => {
    setBirthDate("1995-01-01");
    setReferenceDate(todayISODate());
    setResult(null);
  };

  return (
    <CalculatorContainer>
      <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} title="Chronological Details">
        <CalculatorInputGroup 
          label="Date of Birth" 
          helperText="Your official birth date"
          icon={<Cake className="h-4 w-4" />}
        >
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </CalculatorInputGroup>

        <CalculatorInputGroup 
          label="Reference Date" 
          helperText="Calculate age up to this specific date"
          icon={<CalendarDays className="h-4 w-4" />}
        >
          <Input
            type="date"
            value={referenceDate}
            onChange={(e) => setReferenceDate(e.target.value)}
          />
        </CalculatorInputGroup>
      </CalculatorForm>

      <CalculatorResultPanel 
        result={result ? result.years : "—"} 
        label="Years Old"
        title="Age Analysis"
        hint={result ? "Precisely calculated age breakdown" : "Select dates and calculate"}
      >
        {result && (
          <div className="space-y-4">
            <CalculatorResultRow label="Full Years" value={`${result.years} years`} />
            <CalculatorResultRow label="Months" value={`${result.months} months`} />
            <CalculatorResultRow label="Extra Days" value={`${result.days} days`} />
            <div className="pt-2 border-t border-slate-100 mt-2">
              <CalculatorResultRow label="Summary" value={`${result.years}y, ${result.months}m, ${result.days}d`} isBold />
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 italic text-center border border-slate-100">
              The age is calculated by finding the total number of full years, months, and days between the two dates.
            </div>
          </div>
        )}
      </CalculatorResultPanel>
    </CalculatorContainer>
  );
}
