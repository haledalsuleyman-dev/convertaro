import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Converter } from "@/types/converter";
import { formatValue } from "@/lib/converter";
import { getStaticValuePageHref } from "@/lib/value-pages";
import { formatUnitLabel } from "@/lib/seo";
import { ConversionTableToggle } from "@/components/converter/ConversionTableToggle";

interface ConversionTableProps {
  converter: Converter;
}

const DEFAULT_VISIBLE_ROWS = 10;

function formatFeetAndInches(cm: number): string {
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - feet * 12);

  if (inches === 12) {
    feet += 1;
    inches = 0;
  }

  return `${feet}'${inches}"`;
}

function buildTableId(converter: Converter): string {
  return `${converter.category}-${converter.metadata.slug}`;
}

export function ConversionTable({ converter }: ConversionTableProps) {
  const isCmToInches = converter.fromUnit === "cm" && converter.toUnit === "inches";
  const fromLabel = formatUnitLabel(converter.fromUnit);
  const toLabel = formatUnitLabel(converter.toUnit);
  const hasMoreRows = converter.examples.length > DEFAULT_VISIBLE_ROWS;
  const tableId = buildTableId(converter);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <caption className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-sm text-slate-500 sm:px-6">
              Quick reference values for common {fromLabel} to {toLabel} conversions.
              {hasMoreRows ? ` Showing ${DEFAULT_VISIBLE_ROWS} of ${converter.examples.length} values.` : ""}
            </caption>
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] sm:px-6">{fromLabel}</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] sm:px-6">{toLabel}</th>
                {isCmToInches ? (
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] sm:px-6">Feet & inches</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {converter.examples.map((example, index) => {
                const valuePageHref = getStaticValuePageHref(converter.category, converter.metadata.slug, example.input);
                const isExtraRow = index >= DEFAULT_VISIBLE_ROWS;

                return (
                  <tr
                    key={`${example.input}-${example.output}-${index}`}
                    className="border-t border-slate-200 odd:bg-white even:bg-slate-50/70 hover:bg-sky-50/60"
                    data-extra-table-row={isExtraRow ? tableId : undefined}
                    hidden={isExtraRow}
                  >
                    <td className="border-t border-slate-200 px-4 py-3 align-top sm:px-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:hidden">{fromLabel}</span>
                        {valuePageHref ? (
                          <Link
                            href={valuePageHref}
                            className="group inline-flex w-fit items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800 hover:underline"
                          >
                            <span>{formatValue(example.input)}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-sky-500 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ) : (
                          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">
                            {formatValue(example.input)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="border-t border-slate-200 px-4 py-3 align-top sm:px-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:hidden">{toLabel}</span>
                        <span className="inline-flex w-fit rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-900">
                          {formatValue(example.output)} {toLabel}
                        </span>
                      </div>
                    </td>
                    {isCmToInches ? (
                      <td className="border-t border-slate-200 px-4 py-3 align-top sm:px-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400 sm:hidden">Feet & inches</span>
                          <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
                            {formatFeetAndInches(example.input)}
                          </span>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {hasMoreRows ? <ConversionTableToggle tableId={tableId} totalCount={converter.examples.length} /> : null}
    </div>
  );
}
