import { Metadata } from "next";
import { calculatorsBySlug } from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/calculator-seo";
import { CalculatorShell } from "@/components/calculators/CalculatorShell";
import { MarginCalculatorCard } from "@/components/calculators/MarginCalculatorCard";

export const dynamic = "force-static";

const calculator = calculatorsBySlug.get("margin-calculator")!;

export const metadata: Metadata = buildCalculatorMetadata(calculator);

export default function MarginCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator}>
      <MarginCalculatorCard />
    </CalculatorShell>
  );
}
