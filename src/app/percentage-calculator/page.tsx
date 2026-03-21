import { Metadata } from "next";
import { calculatorsBySlug } from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/calculator-seo";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { PercentageCalculatorCard } from "@/components/calculators/PercentageCalculatorCard";

const calculator = calculatorsBySlug.get("percentage-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(calculator);

export default function PercentageCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator}>
      <PercentageCalculatorCard />
    </CalculatorShell>
  );
}
