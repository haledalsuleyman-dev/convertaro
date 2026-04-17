import { Metadata } from "next";
import { calculatorsBySlug } from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/calculator-seo";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { VatCalculatorCard } from "@/components/calculators/VatCalculatorCard";

export const dynamic = "force-static";

const calculator = calculatorsBySlug.get("vat-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(calculator);

export default function VatCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator}>
      <VatCalculatorCard />
    </CalculatorShell>
  );
}
