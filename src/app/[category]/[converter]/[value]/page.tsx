import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import convertersData from "@/data/converters.json";
import { categories } from "@/data/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { convertValue, formatValue } from "@/lib/converter";
import { STATIC_VALUE_PAGE_PARAMS } from "@/lib/value-pages";
import {
  buildOpenGraph,
  buildTwitter,
  canonicalFromPath,
  cleanMetaDescription,
  converterCanonical,
  generateBreadcrumbSchemaFromPaths,
  generateFAQSchema,
  NOINDEX_ROBOTS,
} from "@/lib/seo";
import { resolveConverterRoute } from "@/lib/converter-routing";
import type { Converter } from "@/types/converter";

const converters = convertersData as Converter[];
export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{
    category: string;
    converter: string;
    value: string;
  }>;
}

function parseValueFromSlug(valueSlug: string): number | null {
  const match = valueSlug.match(/^-?\d+(?:\.\d+)?/);
  if (!match) {
    return null;
  }

  const value = Number.parseFloat(match[0]);
  return Number.isFinite(value) ? value : null;
}

function formatSlugValue(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(6)));
}

function humanizeSlugPart(part: string, mode: "raw" | "title"): string {
  if (mode === "raw") {
    return part;
  }

  return part
    .split("-")
    .map((segment) => (segment.length <= 3 ? segment : `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`))
    .join(" ");
}

function getHeadingParts(converterSlug: string) {
  const parts = converterSlug.split("-to-");
  const fromPart = parts[0] ?? "value";
  const toPart = parts[1] ?? "result";
  const fromMode = fromPart.length <= 3 ? "raw" : "title";

  return {
    fromHeading: humanizeSlugPart(fromPart, fromMode),
    toHeading: humanizeSlugPart(toPart, "title"),
    fromText: humanizeSlugPart(fromPart, "raw"),
    toText: humanizeSlugPart(toPart, "raw"),
  };
}

function calculateValue(value: number, converter: Converter): number {
  const formula = converter.formula.toLowerCase();

  if (formula.includes("9/5") && converter.fromUnit === "C" && converter.toUnit === "F") {
    return (value * 9) / 5 + 32;
  }

  if (formula.includes("0.393701") && converter.fromUnit === "cm" && converter.toUnit === "inches") {
    return value * 0.393701;
  }

  if (formula.includes("2.204624") && converter.fromUnit === "kg" && converter.toUnit === "lbs") {
    return value * 2.204624;
  }

  return convertValue(value, converter.fromUnit, converter.toUnit, converter.category);
}

function getHeightContext(value: number, converter: Converter): string | null {
  if (converter.fromUnit !== "cm" || value < 150 || value > 200) {
    return null;
  }

  if (value >= 170 && value <= 179) {
    return `${formatSlugValue(value)} cm is considered average height for men in Europe.`;
  }

  if (value >= 180 && value <= 200) {
    return `${formatSlugValue(value)} cm is generally considered tall in many countries and is often used as a reference point for adult height comparisons.`;
  }

  return `${formatSlugValue(value)} cm is a common height reference for teens and shorter adults, especially when comparing clothing sizes or height charts.`;
}

function getDidYouKnowFact(value: number, result: number, converter: Converter): { title: string; body: string } | null {
  const pair = `${converter.fromUnit}->${converter.toUnit}`;

  if (converter.fromUnit === "cm" && (converter.toUnit === "inches" || converter.toUnit === "feet")) {
    if (value >= 175) {
      return {
        title: "Did you know?",
        body: `${formatSlugValue(value)} cm is taller than the average adult male height in countries like India and Indonesia, but close to average in parts of Northern Europe.`,
      };
    }

    return {
      title: "Did you know?",
      body: `${formatSlugValue(value)} cm is close to the average adult female height in countries like Germany and the UK, which is why this range appears often in clothing and health searches.`,
    };
  }

  if (pair === "kg->lbs" || pair === "lbs->kg") {
    if ((converter.fromUnit === "kg" && value >= 80) || (converter.fromUnit === "lbs" && value >= 175)) {
      return {
        title: "Did you know?",
        body: `This weight range is often used in strength training benchmarks, especially for squat, deadlift, and bodyweight class comparisons.`,
      };
    }

    return {
      title: "Did you know?",
      body: `Fitness apps often switch between kilograms and pounds, so this conversion is common when logging bodyweight, nutrition goals, or dumbbell loads.`,
    };
  }

  if (converter.category === "temperature") {
    if (converter.fromUnit === "C" && value === 37) {
      return {
        title: "Did you know?",
        body: `37°C equals 98.6°F, which is widely used as a normal human body temperature reference.`,
      };
    }

    if ((converter.fromUnit === "C" && value === 100) || (converter.fromUnit === "F" && value === 212)) {
      return {
        title: "Did you know?",
        body: `This is the boiling point of water at standard sea-level pressure, making it one of the most searched temperature conversions.`,
      };
    }

    return {
      title: "Did you know?",
      body: `${formatSlugValue(value)} ${converter.fromUnit} converts to ${result.toFixed(2)} ${converter.toUnit}, which is useful for weather, cooking, and body-temperature checks.`,
    };
  }

  return null;
}

function createExactFaq(value: number, result: number, converter: Converter, converterSlug: string) {
  const { fromText, toText } = getHeadingParts(converterSlug);
  const valueLabel = formatSlugValue(value);
  const roundedResult = result.toFixed(2);

  return [
    {
      question: `What is ${valueLabel} ${fromText} in ${toText}?`,
      answer: `${valueLabel} ${fromText} equals ${roundedResult} ${toText}.`,
    },
    {
      question: `How do you convert ${valueLabel} ${fromText} to ${toText}?`,
      answer: `Use the formula ${converter.formula}. Plug in ${valueLabel} for ${converter.fromUnit} to get ${roundedResult} ${toText}.`,
    },
    {
      question: `Is ${valueLabel} ${fromText} exactly ${roundedResult} ${toText}?`,
      answer: `Yes. Based on ${converter.title.toLowerCase()}, ${valueLabel} ${fromText} converts to ${roundedResult} ${toText}.`,
    },
  ];
}

function buildNearbyValues(value: number) {
  return [value - 10, value - 5, value, value + 5, value + 10];
}

function getConverter(categorySlug: string, converterSlug: string): Converter | undefined {
  return converters.find(
    (converter) => converter.category === categorySlug && converter.metadata.slug === converterSlug
  );
}

function buildValuePagePath(categorySlug: string, converterSlug: string, value: number): string {
  return `/${categorySlug}/${converterSlug}/${formatSlugValue(value)}-${converterSlug}`;
}

function buildPageTitle(value: number, converterSlug: string, result: number, converter: Converter): string {
  const { fromHeading, toHeading } = getHeadingParts(converterSlug);
  const toAbbreviation = converter.toUnit === "inches" ? "in" : converter.toUnit;
  return `${formatSlugValue(value)} ${fromHeading} to ${toHeading} – ${result.toFixed(2)} ${toAbbreviation}`;
}

function buildPageDescription(value: number, converterSlug: string, result: number): string {
  const { fromText, toText } = getHeadingParts(converterSlug);
  return cleanMetaDescription(
    `Convert ${formatSlugValue(value)} ${fromText} to ${toText} instantly. ${formatSlugValue(value)} ${fromText} equals ${result.toFixed(2)} ${toText} with formula, nearby values, FAQs, and context on Convertaro.`,
    155
  );
}

export async function generateStaticParams() {
  return STATIC_VALUE_PAGE_PARAMS;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, converter: converterSlug, value: valueSlug } = await params;
  const { canonicalConverter } = resolveConverterRoute(category, converterSlug);
  const value = parseValueFromSlug(valueSlug);

  if (!canonicalConverter || value === null) {
    return {};
  }

  const result = calculateValue(value, canonicalConverter);
  const path = buildValuePagePath(category, converterSlug, value);
  const canonicalConverterSlug = canonicalConverter.metadata.slug;
  const title = buildPageTitle(value, converterSlug, result, canonicalConverter);
  const description = buildPageDescription(value, converterSlug, result);

  return {
    title,
    description,
    robots: NOINDEX_ROBOTS,
    alternates: {
      canonical: converterCanonical(category, canonicalConverterSlug),
    },
    openGraph: buildOpenGraph({
      title,
      description,
      path,
    }),
    twitter: buildTwitter(title, description),
  };
}

export default async function ConverterValuePage({ params }: PageProps) {
  const { category: categorySlug, converter: converterSlug, value: valueSlug } = await params;
  const { canonicalConverter: converter, isAlias } = resolveConverterRoute(categorySlug, converterSlug);
  const value = parseValueFromSlug(valueSlug);
  const category = categories.find((item) => item.slug === categorySlug);

  if (!category || !converter || value === null) {
    notFound();
  }

  const canonicalConverterSlug = converter.metadata.slug;
  const expectedValueSlug = `${formatSlugValue(value)}-${canonicalConverterSlug}`;
  
  // Strict redirect to canonical converter slug AND normalized value slug
  if (isAlias || valueSlug !== `${formatSlugValue(value)}-${converterSlug}`) {
    permanentRedirect(`/${categorySlug}/${canonicalConverterSlug}/${expectedValueSlug}`);
  }

  const result = calculateValue(value, converter);
  const { fromHeading, toHeading, fromText, toText } = getHeadingParts(converterSlug);
  const heading = `${formatSlugValue(value)} ${fromHeading} to ${toHeading}`;
  const pagePath = buildValuePagePath(categorySlug, converterSlug, value);
  const heightContext = getHeightContext(value, converter);
  const factBox = getDidYouKnowFact(value, result, converter);
  const nearbyValues = buildNearbyValues(value).map((entry) => ({
    input: entry,
    output: calculateValue(entry, converter),
    href: buildValuePagePath(categorySlug, converterSlug, entry),
  }));
  const faqItems = createExactFaq(value, result, converter, converterSlug);
  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: category.name, path: `/${categorySlug}` },
    { name: converter.title, path: `/${categorySlug}/${canonicalConverterSlug}` },
    { name: `${formatSlugValue(value)} ${fromText} to ${toText}`, path: `/${categorySlug}/${canonicalConverterSlug}/${formatSlugValue(value)}-${canonicalConverterSlug}` },
  ]);
  const faqSchema = generateFAQSchema(faqItems);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-pro py-8">
          <Breadcrumbs
            className="mb-4 flex items-center gap-2 text-sm text-slate-500"
            items={[
              { label: "Home", href: "/" },
              { label: category.name, href: `/${categorySlug}` },
              { label: converter.title, href: `/${categorySlug}/${canonicalConverterSlug}` },
              { label: `${formatSlugValue(value)} ${fromText} to ${toText}` },
            ]}
          />

          <span className="badge-pro uppercase">{category.name} value page</span>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">{heading}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Convert {formatSlugValue(value)} {fromText} to {toText} with the exact formula, nearby reference values, and quick answers for this specific conversion.
          </p>
        </div>
      </div>

      <div className="container-pro py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-gradient-to-r from-sky-50 via-white to-cyan-50 px-6 py-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Exact result</p>
                <div className="mt-3 flex flex-wrap items-end gap-3 text-slate-900">
                  <span className="text-3xl font-semibold md:text-5xl">{formatSlugValue(value)} {fromText}</span>
                  <span className="pb-1 text-xl text-slate-400 md:text-3xl">=</span>
                  <span className="text-3xl font-black text-sky-700 md:text-5xl">{result.toFixed(2)} {toText}</span>
                </div>
                <p className="mt-4 text-sm text-slate-500">Formula used: {converter.formula}</p>
                {heightContext ? <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{heightContext}</p> : null}
              </div>
            </section>

            {factBox ? (
              <section className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-orange-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">{factBox.title}</p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">{factBox.body}</p>
              </section>
            ) : null}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Nearby values</h2>
                  <p className="text-sm text-slate-500">Quick comparisons around {formatSlugValue(value)} {fromText}.</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full border-separate border-spacing-0 text-left">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em]">{fromText}</th>
                      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em]">{toText}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nearbyValues.map((entry) => (
                      <tr key={entry.href} className="odd:bg-white even:bg-slate-50">
                        <td className="border-t border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                          <Link href={entry.href} className="hover:text-sky-700 hover:underline">
                            {formatValue(entry.input)} {fromText}
                          </Link>
                        </td>
                        <td className="border-t border-slate-200 px-4 py-3 text-sm text-slate-700">
                          {formatValue(entry.output)} {toText}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Formula</h2>
              <div className="mt-4 rounded-xl bg-slate-900 px-4 py-3 font-mono text-sm text-slate-50">{converter.formula}</div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                To convert {formatSlugValue(value)} {fromText} to {toText}, apply the formula above and you get {result.toFixed(2)} {toText}.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
              <div className="mt-5 space-y-4">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Page details</h2>
              <dl className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-medium text-slate-900">{category.name}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-slate-500">Converter</dt>
                  <dd className="font-medium text-slate-900">{converter.title}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-slate-500">Canonical Parent</dt>
                  <dd className="break-all text-right font-medium text-slate-900">{converterCanonical(categorySlug, canonicalConverterSlug)}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
              <h2 className="text-lg font-semibold">More {category.name.toLowerCase()} conversions</h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Need a different number? Open the main converter and test any value instantly.
              </p>
              <Link
                href={`/${categorySlug}/${canonicalConverterSlug}`}
                className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Open {converter.title}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
