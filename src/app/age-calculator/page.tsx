import { Metadata } from "next";
import { calculatorsBySlug } from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/calculator-seo";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { AgeCalculatorCard } from "@/components/calculators/AgeCalculatorCard";

const calculator = calculatorsBySlug.get("age-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(calculator);

export default function AgeCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator}>
      <AgeCalculatorCard />
    </CalculatorShell>
  );
}
