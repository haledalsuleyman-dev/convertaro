import { Card, CardContent } from "@/components/ui/Card";
import { Converter } from "@/types/converter";
import { ConverterToolClient } from "@/components/converter/ConverterToolClient";

interface ConverterToolProps {
  converter: Converter;
}

export function ConverterTool({ converter }: ConverterToolProps) {
  return (
    <Card className="mx-auto w-full max-w-2xl overflow-hidden border-none bg-white shadow-none">
      <CardContent className="p-10 md:p-12">
        <ConverterToolClient
          category={converter.category}
          fromUnit={converter.fromUnit}
          toUnit={converter.toUnit}
          formula={converter.formula}
          inverseFormula={converter.inverseFormula}
        />
      </CardContent>
    </Card>
  );
}
