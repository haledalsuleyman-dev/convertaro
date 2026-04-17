"use client";

import { useState } from "react";
import { calculateBMI, getBMICategory } from "@/lib/calculators";
import { 
  CalculatorContainer, 
  CalculatorForm, 
  CalculatorResultPanel, 
  CalculatorInputGroup,
  CalculatorResultRow 
} from "./CalculatorUI";
import { Input } from "@/components/ui/Input";
import { Ruler, Weight } from "lucide-react";

export function BmiCalculatorCard() {
  const [heightCm, setHeightCm] = useState("170");
  const [weightKg, setWeightKg] = useState("70");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = () => {
    const h = Number(heightCm);
    const w = Number(weightKg);
    const bmiValue = calculateBMI(w, h);
    setResult({
      bmi: bmiValue,
      category: getBMICategory(bmiValue)
    });
  };

  const handleReset = () => {
    setHeightCm("170");
    setWeightKg("70");
    setResult(null);
  };

  return (
    <CalculatorContainer>
      <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} title="Body Mass Index Settings">
        <CalculatorInputGroup 
          label="Height (cm)" 
          helperText="Standard adult height in centimeters"
          icon={<Ruler className="h-4 w-4" />}
        >
          <Input
            type="number"
            min="1"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="e.g. 170"
          />
        </CalculatorInputGroup>

        <CalculatorInputGroup 
          label="Weight (kg)" 
          helperText="Current weight in kilograms"
          icon={<Weight className="h-4 w-4" />}
        >
          <Input
            type="number"
            min="1"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="e.g. 70"
          />
        </CalculatorInputGroup>
      </CalculatorForm>

      <CalculatorResultPanel 
        result={result ? result.bmi.toFixed(1) : "—"} 
        label="Your BMI Score"
        title="BMI Result"
        hint={result ? `Status: ${result.category}` : "Enter details and calculate"}
      >
        {result && (
          <div className="space-y-4">
            <CalculatorResultRow label="BMI Category" value={result.category} isBold />
            <CalculatorResultRow label="Weight" value={`${weightKg} kg`} />
            <CalculatorResultRow label="Height" value={`${heightCm} cm`} />
            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-500 leading-relaxed italic text-center border border-slate-100">
              The BMI is a convenient rule of thumb used to broadly categorize a person as underweight, normal weight, overweight, or obese.
            </div>
          </div>
        )}
      </CalculatorResultPanel>
    </CalculatorContainer>
  );
}
