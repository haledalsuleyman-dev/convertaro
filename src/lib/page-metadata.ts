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
  finance: "Useful for planning and comparison.",
  health: "Designed for informational use.",
  math: "Useful for quick checks and repeat calculations.",
  time: "Useful for forms, planning, and date checks.",
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
  const longTailKeywords = getConverterLongTailKeywords(converter.fromUnit, converter.toUnit, category.slug);

  return buildPageMetadata({
    title: buildConverterTitle(converter),
    description: buildConverterDescription(converter, category),
    path: canonicalPath,
    keywords: [
      ...converter.metadata.keywords,
      `${converter.fromUnit} to ${converter.toUnit}`,
      `convert ${converter.fromUnit} to ${converter.toUnit}`,
      `${converter.fromUnit} to ${converter.toUnit} converter`,
      `${converter.fromUnit} to ${converter.toUnit} formula`,
      `${category.name.toLowerCase()} converter`,
      ...longTailKeywords.slice(0, 8),
    ].filter(Boolean),
  });
}

export function buildCalculatorPageMetadata(calculator: CalculatorDefinition): Metadata {
  return buildPageMetadata({
    title: buildCalculatorTitle(calculator),
    description: buildCalculatorDescription(calculator),
    path: `/${calculator.slug}`,
    keywords: calculator.keywords,
  });
}
