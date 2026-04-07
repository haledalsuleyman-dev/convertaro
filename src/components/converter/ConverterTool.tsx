"use client";

import { useMemo, useState } from "react";
import { Converter } from "@/types/converter";
import { convertValue, formatValue } from "@/lib/converter";
import { formatUnitLabel } from "@/lib/seo";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRightLeft, Zap } from "lucide-react";

interface ConverterToolProps {
  converter: Converter;
}

export function ConverterTool({ converter }: ConverterToolProps) {
  const [inputValue, setInputValue] = useState<string>("1");
  const [isReversed, setIsReversed] = useState(false);

  const fromUnit = isReversed ? converter.toUnit : converter.fromUnit;
  const toUnit = isReversed ? converter.fromUnit : converter.toUnit;
  const fromLabel = formatUnitLabel(fromUnit);
  const toLabel = formatUnitLabel(toUnit);

  const result = useMemo(() => {
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      const converted = convertValue(val, fromUnit, toUnit, converter.category);
      return formatValue(converted);
    }
    return "";
  }, [inputValue, fromUnit, toUnit, converter.category]);

  const handleReverse = () => {
    setIsReversed(!isReversed);
    // Swap values if possible
    if (result && !isNaN(parseFloat(result))) {
      setInputValue(result);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-none shadow-none bg-white">
      <CardContent className="p-10 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-4">
          <div className="flex-1 w-full space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                From {fromLabel}
              </label>
            </div>
            <div className="relative group">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="text-2xl h-20 font-bold px-6 bg-background border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl transition-all shadow-inner group-hover:border-border"
                placeholder="0"
              />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-text-secondary font-bold text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">
                  {fromLabel}
                </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center md:pt-8">
            <button
              onClick={handleReverse}
              className="p-5 rounded-2xl bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all active:scale-90 hover:rotate-180 duration-500 group"
              title="Swap units"
            >
              <ArrowRightLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                To {toLabel}
              </label>
            </div>
            <div className="relative group">
              <div className="h-20 w-full rounded-2xl border-2 border-primary/10 bg-primary/5 flex items-center px-6 text-2xl font-black text-primary shadow-inner">
                {result || "0"}
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary font-bold text-lg opacity-40">
                {toLabel}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-background rounded-2xl border border-border flex items-center justify-center space-x-4 group cursor-help">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Zap className="h-4 w-4 text-accent" />
          </div>
          <p className="text-sm text-text-secondary font-bold">
            Calculation: <span className="text-text-primary font-mono ml-2">
              {isReversed ? converter.inverseFormula : converter.formula}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
