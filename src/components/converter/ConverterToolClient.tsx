"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { ArrowRightLeft, Zap } from "lucide-react";
import { convertValue, formatValue } from "@/lib/converter";
import { formatUnitLabel } from "@/lib/seo";
import { useRecentConversions } from "@/hooks/useRecentConversions";

interface ConverterToolClientProps {
  category: string;
  fromUnit: string;
  toUnit: string;
  title: string;
  slug: string;
  formula: string;
  inverseFormula: string;
}

export function ConverterToolClient({
  category,
  fromUnit: initialFromUnit,
  toUnit: initialToUnit,
  title,
  slug,
  formula,
  inverseFormula,
}: ConverterToolClientProps) {
  const [inputValue, setInputValue] = useState<string>("1");
  const [isReversed, setIsReversed] = useState(false);
  const { addRecent } = useRecentConversions();

  const fromUnit = isReversed ? initialToUnit : initialFromUnit;
  const toUnit = isReversed ? initialFromUnit : initialToUnit;
  const fromLabel = formatUnitLabel(fromUnit);
  const toLabel = formatUnitLabel(toUnit);

  const result = useMemo(() => {
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const converted = convertValue(val, fromUnit, toUnit, category);
      return formatValue(converted);
    }
    return "";
  }, [category, fromUnit, inputValue, toUnit]);

  // Track recent conversions
  useEffect(() => {
    // Only track if an actual valid number exists
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const delay = setTimeout(() => {
        addRecent({
          slug,
          title,
          category,
          lastValue: inputValue,
        });
      }, 500); // 500ms debounce to avoid spamming localStorage while typing
      return () => clearTimeout(delay);
    }
  }, [inputValue, isReversed, slug, title, category, addRecent]);

  const handleReverse = () => {
    setIsReversed(!isReversed);
    if (result && !isNaN(parseFloat(result))) {
      setInputValue(result);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-4">
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold uppercase tracking-widest text-text-secondary">
              From {fromLabel}
            </label>
          </div>
          <div className="relative group">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-2xl h-20 rounded-2xl border-2 border-transparent bg-background px-6 font-bold shadow-inner transition-all group-hover:border-border focus:border-primary focus:bg-white"
              placeholder="0"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-bold text-text-secondary opacity-40 transition-opacity group-focus-within:opacity-100">
              {fromLabel}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center md:pt-8">
          <button
            onClick={handleReverse}
            className="rounded-2xl bg-primary p-5 text-white shadow-xl shadow-primary/20 transition-all duration-500 hover:rotate-180 hover:bg-primary-dark active:scale-90 group"
            title="Swap units"
          >
            <ArrowRightLeft className="h-6 w-6 transition-transform group-hover:scale-110" />
          </button>
        </div>

        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold uppercase tracking-widest text-text-secondary">
              To {toLabel}
            </label>
          </div>
          <div className="relative group">
            <div className="flex h-20 w-full items-center rounded-2xl border-2 border-primary/10 bg-primary/5 px-6 text-2xl font-black text-primary shadow-inner">
              {result || "0"}
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-bold text-primary opacity-40">
              {toLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex cursor-help items-center justify-center space-x-4 rounded-2xl border border-border bg-background p-6 group">
        <div className="rounded-lg bg-white p-2 shadow-sm">
          <Zap className="h-4 w-4 text-accent" />
        </div>
        <p className="text-sm font-bold text-text-secondary">
          Calculation: <span className="ml-2 font-mono text-text-primary">{isReversed ? inverseFormula : formula}</span>
        </p>
      </div>
    </>
  );
}
