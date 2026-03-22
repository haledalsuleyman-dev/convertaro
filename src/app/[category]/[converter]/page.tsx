import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Converter } from "@/types/converter";
import convertersData from "@/data/converters.json";
import { categories } from "@/data/categories";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQSection } from "@/components/converter/FAQSection";
import { ConverterContentSections } from "@/components/converter/ConverterContentSections";
import Link from "next/link";
import { ChevronRight, Home, Calculator, Lightbulb, Table, ArrowLeftRight } from "lucide-react";
import {
  INDEXABLE_ROBOTS,
  getConverterLongTailKeywords,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import {
  buildConverterFaq,
  getContextualRelatedConverters,
  getReverseConverter,
} from "@/lib/converter-content";
import { PopularToolsSidebar, RelatedCalculators, CategoryNavigation } from "@/components/layout/InternalLinks";

const converters = convertersData as Converter[];

interface PageProps {
  params: Promise<{
    category: string;
    converter: string;
  }>;
}

export async function generateStaticParams() {
  return converters.map((c) => ({
    category: c.category,
    converter: c.metadata.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, converter: slug } = await params;
  const converter = converters.find((c) => c.category === category && c.metadata.slug === slug);
  const cat = categories.find((c) => c.slug === category);

  if (!converter) {
    return {};
  }

  const longTailKeywords = getConverterLongTailKeywords(
    converter.fromUnit,
    converter.toUnit,
    category
  );

  const title = `${converter.title} - Free Online Calculator`;
  const description = `${converter.description} Use our free ${converter.fromUnit} to ${converter.toUnit} converter. Instant results, accurate formula, and conversion table. Formula: ${converter.formula}`;

  return {
    title,
    description,
    robots: INDEXABLE_ROBOTS,
    keywords: [
      ...converter.metadata.keywords,
      `${converter.fromUnit} to ${converter.toUnit}`,
      `convert ${converter.fromUnit} to ${converter.toUnit}`,
      `${converter.fromUnit} to ${converter.toUnit} calculator`,
      `${converter.fromUnit} to ${converter.toUnit} formula`,
      `free ${converter.fromUnit} converter`,
      cat ? `${cat.name.toLowerCase()} converter` : "",
      "unit converter",
      "free online converter",
      ...longTailKeywords.slice(0, 10),
    ].filter(Boolean),
    alternates: buildAlternates(`/${category}/${slug}`),
    openGraph: buildOpenGraph({
      title: `${converter.title} - Free Online Tool`,
      description: `${converter.description} Instant results with formula and conversion table.`,
      path: `/${category}/${slug}`,
    }),
    twitter: buildTwitter(
      `${converter.title} - Free Online Calculator`,
      `${converter.description} Free, instant, and accurate.`
    ),
  };
}

export default async function ConverterPage({ params }: PageProps) {
  const { category: categorySlug, converter: slug } = await params;
  const converter = converters.find((c) => c.category === categorySlug && c.metadata.slug === slug);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!converter || !category) {
    notFound();
  }

  const reverseConverter = getReverseConverter(converter, converters);
  const contextualLinks = getContextualRelatedConverters(converter, converters);
  const pageFaq = buildConverterFaq(converter, category, reverseConverter);

  // Schema markup
  const faqSchema = generateFAQSchema(pageFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://convertaro.com" },
    { name: category.name, url: `https://convertaro.com/${categorySlug}` },
    { name: converter.title, url: `https://convertaro.com/${categorySlug}/${slug}` },
  ]);

  const howToSchema = generateHowToSchema(
    `How to Convert ${converter.fromUnit} to ${converter.toUnit}`,
    `Learn how to convert ${converter.fromUnit} to ${converter.toUnit} using the formula: ${converter.formula}`,
    [
      {
        name: `Enter the value in ${converter.fromUnit}`,
        text: `Type the number you want to convert from ${converter.fromUnit} into the input field.`,
      },
      {
        name: "Get the instant result",
        text: `The equivalent value in ${converter.toUnit} will appear instantly. Formula: ${converter.formula}`,
      },
      {
        name: "Use or reverse the conversion",
        text: `Copy the result or click the swap button to reverse the conversion.`,
      },
    ]
  );

  const webPageSchema = buildWebPageSchema({
    name: converter.title,
    description: converter.description,
    path: `/${categorySlug}/${slug}`,
  });

  // Get related converters
  const relatedConverters = converter.relatedConverters
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean)
    .slice(0, 6) as Converter[];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-pro py-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="flex items-center hover:text-slate-900">
              <Home className="h-3.5 w-3.5 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/${categorySlug}`} className="hover:text-slate-900 capitalize">
              {category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-900 font-medium truncate max-w-[200px]">{converter.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <span className="badge-pro uppercase">{category.name} Converter</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">{converter.title}</h1>
          <p className="text-slate-500 max-w-2xl">
            {converter.description}{" "}
            <span className="font-medium text-slate-700">Fast, free, and always accurate.</span>
          </p>
        </div>
      </div>

      <div className="container-pro py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-8">
            {/* Converter Tool */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-medium text-slate-500">{converter.title}</span>
              </div>
              <div className="p-4">
                <ConverterTool converter={converter} />
              </div>
            </div>

            {/* Formula & How-to */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-slate-600" />
                  </div>
                  <h2 className="font-semibold text-slate-900">Conversion Formula</h2>
                </div>                <div className="formula-box mb-3">{converter.formula}</div>
                <p className="text-sm text-slate-500">
                  Multiply your <strong className="text-slate-700">{converter.fromUnit}</strong> value by the
                  conversion factor to get{" "}
                  <strong className="text-slate-700">{converter.toUnit}</strong>.
                </p>
                {converter.inverseFormula && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                      Reverse
                    </p>
                    <div className="bg-slate-100 px-3 py-2 rounded-md font-mono text-sm text-slate-700">
                      {converter.inverseFormula}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-slate-600" />
                  </div>
                  <h2 className="font-semibold text-slate-900">How to Convert</h2>
                </div>
                <ol className="space-y-3">
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="h-5 w-5 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span>
                      Enter a value in <strong>{converter.fromUnit}</strong> in the input field.
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="h-5 w-5 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span>
                      The result in <strong>{converter.toUnit}</strong> appears instantly.
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="h-5 w-5 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span>Use the swap button to reverse the direction.</span>
                  </li>
                </ol>
                <Link
                  href={`/${categorySlug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  All {category.name} tools <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Conversion Table */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {converter.fromUnit} → {converter.toUnit} Table
                  </h2>
                  <p className="text-sm text-slate-500">Common reference values</p>
                </div>
                <Table className="h-5 w-5 text-slate-400" />
              </div>
              <ConversionTable converter={converter} />
            </div>

            {/* FAQ */}
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <FAQSection faq={pageFaq} />
            </div>

            {/* Content Sections */}
            <ConverterContentSections
              converter={converter}
              category={category}
              reverseConverter={reverseConverter}
              contextualLinks={contextualLinks}
            />

            {/* Related Converters */}
            {relatedConverters.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowLeftRight className="h-5 w-5 text-slate-600" />
                  <h2 className="font-semibold text-slate-900">More {category.name} Converters</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {relatedConverters.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/${categorySlug}/${rel.metadata.slug}`}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-slate-700">{rel.title}</span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <CategoryNavigation activeCategory={categorySlug} />
            <PopularToolsSidebar excludeSlug={slug} />
            <RelatedCalculators />

            {/* Contextual promo */}
            <div className="bg-slate-900 rounded-lg p-5 text-white">
              <div className="h-8 w-8 bg-white/10 rounded-md flex items-center justify-center mb-3">
                <Calculator className="h-4 w-4" />
              </div>
              <h3 className="font-semibold mb-1">Lightning Fast</h3>
              <p className="text-sm text-white/70">
                All calculations run on your device. Sub-millisecond results, zero server latency.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
