import { Metadata } from "next";
import { calculatorsBySlug } from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/calculator-seo";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { BmiCalculatorCard } from "@/components/calculators/BmiCalculatorCard";

const calculator = calculatorsBySlug.get("bmi-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(calculator);

export default function BmiCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator}>
      <BmiCalculatorCard />
    </CalculatorShell>
  );
}
