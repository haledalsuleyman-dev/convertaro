import { Metadata } from "next";
import { calculatorsBySlug } from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/calculator-seo";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { LoanCalculatorCard } from "@/components/calculators/LoanCalculatorCard";

const calculator = calculatorsBySlug.get("loan-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(calculator);

export default function LoanCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator}>
      <LoanCalculatorCard />
    </CalculatorShell>
  );
}
