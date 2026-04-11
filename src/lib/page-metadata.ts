import type { Metadata } from "next";
import { CalculatorDefinition } from "@/data/calculators";
import { Category, Converter } from "@/types/converter";
import {
  buildConverterMetaDescription,
  buildConverterMetaTitle,
  buildPageMetadata,
  getConverterLongTailKeywords,
} from "@/lib/seo";
import { getPriorityConverterContent } from "@/lib/priority-pages";

const CALCULATOR_ENDINGS: Partial<Record<CalculatorDefinition["category"], string>> = {
  finance: "Free, no sign-up. Results update instantly as you type.",
  health: "Informational use only. Free tool, no sign-up required.",
  math: "Instant results. Includes the formula so you can verify your work.",
  time: "Free, instant, and works directly in your browser without any downloads.",
};

function buildConverterTitle(converter: Converter): string {
  return buildConverterMetaTitle(converter.fromUnit, converter.toUnit);
}

function buildConverterDescription(converter: Converter, _category: Category): string {
  const priority = getPriorityConverterContent(converter);
  return priority?.metaDescription ?? buildConverterMetaDescription(converter.fromUnit, converter.toUnit, converter.formula);
}

function buildCalculatorTitle(calculator: CalculatorDefinition): string {
  return calculator.title;
}

function buildCalculatorDescription(calculator: CalculatorDefinition): string {
  const ending = CALCULATOR_ENDINGS[calculator.category] ?? "Clear inputs, practical outputs, and easy-to-check assumptions.";
  return `${calculator.description} ${ending}`;
}

export function buildConverterPageMetadata(converter: Converter, category: Category, canonicalPath: string): Metadata {
  return buildPageMetadata({
    title: buildConverterTitle(converter),
    description: buildConverterDescription(converter, category),
    path: canonicalPath,
  });
}

export function buildCalculatorPageMetadata(calculator: CalculatorDefinition): Metadata {
  return buildPageMetadata({
    title: buildCalculatorTitle(calculator),
    description: buildCalculatorDescription(calculator),
    path: `/${calculator.slug}`,
  });
}
