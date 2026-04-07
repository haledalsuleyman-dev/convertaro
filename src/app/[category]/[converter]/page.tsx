import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Converter } from "@/types/converter";
import { categories } from "@/data/categories";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQSection } from "@/components/converter/FAQSection";
import { ConverterContentSections } from "@/components/converter/ConverterContentSections";
import Link from "next/link";
import { ChevronRight, Calculator, Lightbulb, Table, ArrowLeftRight } from "lucide-react";
import {
  buildConverterHeading,
  buildWebPageSchema,
  converterCanonical,
  formatUnitLabel,
  generateBreadcrumbSchemaFromPaths,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import {
  buildConverterFaq,
  getContextualRelatedConverters,
  getConversionSteps,
  getFormulaContent,
  getIntroContent,
  getReverseConverter,
} from "@/lib/converter-content";
import { PopularToolsSidebar, RelatedCalculators, CategoryNavigation, CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { canonicalConverters, dedupeCanonicalConverters, getCanonicalConverterById, resolveConverterRoute } from "@/lib/converter-routing";
import { TrustMetadataBlock } from "@/components/trust/TrustMetadataBlock";
import { getConverterTrustMetadata } from "@/lib/trust";
import { buildConverterPageMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getRelatedConverterCards } from "@/lib/internal-linking";
import { getStaticValuePagesForConverter } from "@/lib/value-pages";

const converters = canonicalConverters as Converter[];
export const dynamic = "force-static";
export const dynamicParams = false;

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
  const { canonicalConverter: converter } = resolveConverterRoute(category, slug);
  const cat = categories.find((c) => c.slug === category);

  if (!converter || !cat) {
    return {};
  }

  const canonicalPath = `/${category}/${converter.metadata.slug}`;
  const metadata = buildConverterPageMetadata(converter, cat, canonicalPath);

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: converterCanonical(category, converter.metadata.slug),
    },
  };
}

export default async function ConverterPage({ params }: PageProps) {
  const { category: categorySlug, converter: slug } = await params;
  const { canonicalConverter: converter, isAlias } = resolveConverterRoute(categorySlug, slug);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!converter || !category) {
    notFound();
  }

  if (isAlias) {
    permanentRedirect(`/${categorySlug}/${converter.metadata.slug}`);
  }

  const reverseConverter = getReverseConverter(converter, converters);
  const contextualLinks = getContextualRelatedConverters(converter, converters);
  const pageFaq = buildConverterFaq(converter, category, reverseConverter);
  const introContent = getIntroContent(converter, category, reverseConverter, contextualLinks);
  const formulaContent = getFormulaContent(converter);
  const conversionSteps = getConversionSteps(converter);
  const trustMetadata = getConverterTrustMetadata(converter, category);
  const staticValuePages = getStaticValuePagesForConverter(categorySlug, converter.metadata.slug);
  const displayTitle = buildConverterHeading(converter.fromUnit, converter.toUnit);
  const formattedLastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(converter.metadata.lastUpdated));

  // Schema markup
  const pageFaqSchema = generateFAQSchema(pageFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })));
  const converterFaqSchema = generateFAQSchema(converter.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })));

  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: category.name, path: `/${categorySlug}` },
    { name: converter.title, path: `/${categorySlug}/${converter.metadata.slug}` },
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
    path: `/${categorySlug}/${converter.metadata.slug}`,
  });
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: converter.title,
    url: `https://convertaro.com/${categorySlug}/${converter.metadata.slug}`,
    description: converter.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // Get related converters
  const relatedConverters = converter.relatedConverters
    .map((id) => getCanonicalConverterById(id))
    .filter((item): item is Converter => Boolean(item));

  const uniqueRelatedConverters = dedupeCanonicalConverters(relatedConverters).slice(0, 6) as Converter[];
  const relatedRecommendations = getRelatedConverterCards(
    converter,
    dedupeCanonicalConverters([...(reverseConverter ? [reverseConverter] : []), ...contextualLinks, ...uniqueRelatedConverters])
  );

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(converterFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-pro py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            className="mb-4 flex items-center gap-2 text-sm text-slate-500"
            items={[
              { label: "Home", href: "/" },
              { label: category.name, href: `/${categorySlug}` },
              { label: displayTitle },
            ]}
          />

          <div className="flex items-center gap-2 mb-2">
            <span className="badge-pro uppercase">{category.name} Converter</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">{displayTitle}</h1>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500 mb-3">{introContent.eyebrow}</p>
          <div className="max-w-3xl space-y-2 text-slate-600">
            <p>{introContent.summary}</p>
            <p className="text-sm text-slate-500">{introContent.intent}</p>
            {introContent.links.length > 0 ? (
              <p className="text-sm text-slate-500">
                Also useful: {introContent.links.map((item, index) => (
                  <span key={item.href}>
                    <Link href={item.href} className="font-medium text-slate-700 hover:text-slate-900 hover:underline">
                      {item.label}
                    </Link>
                    {index < introContent.links.length - 1 ? ", " : "."}
                  </span>
                ))}
              </p>
            ) : null}
          </div>
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
                </div>
                <div className="formula-box mb-3">{converter.formula}</div>
                <p className="text-sm text-slate-600 leading-6">{formulaContent.explanation}</p>
                <p className="mt-3 text-sm text-slate-500 leading-6">{formulaContent.note}</p>
                {converter.inverseFormula && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                      Reverse
                    </p>
                    <div className="bg-slate-100 px-3 py-2 rounded-md font-mono text-sm text-slate-700">
                      {converter.inverseFormula}
                    </div>
                    <p className="mt-2 text-sm text-slate-500">{formulaContent.reverseNote}</p>
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
                  {conversionSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-3 text-sm text-slate-600">
                      <span className="h-6 w-6 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span>
                        <strong className="block text-slate-800 mb-1">{step.title}</strong>
                        {step.body}
                      </span>
                    </li>
                  ))}
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
                    {formatUnitLabel(converter.fromUnit)} → {formatUnitLabel(converter.toUnit)} Table
                  </h2>
                  <p className="text-sm text-slate-500">Common reference values</p>
                </div>
                <Table className="h-5 w-5 text-slate-400" />
              </div>
              <ConversionTable converter={converter} />
            </div>

            {staticValuePages.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="mb-4">
                  <h2 className="font-semibold text-slate-900">Popular {converter.fromUnit} values</h2>
                  <p className="text-sm text-slate-500">Open exact-value pages for common lookups on this converter.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {staticValuePages.map((entry) => {
                    const valueLabel = entry.value.replace(`-${entry.converter}`, "");

                    return (
                      <Link
                        key={entry.value}
                        href={`/${entry.category}/${entry.converter}/${entry.value}`}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                      >
                        {valueLabel} {converter.fromUnit} &rarr; {converter.toUnit}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

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

            <div className="space-y-3">
              <TrustMetadataBlock metadata={trustMetadata} title="Trust and editorial review" />
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <span className="font-medium text-slate-900">Last updated:</span> {formattedLastUpdated}
              </div>
            </div>

            {/* Related Converters */}
            {relatedRecommendations.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowLeftRight className="h-5 w-5 text-slate-600" />
                  <h2 className="font-semibold text-slate-900">Related Converters</h2>
                </div>
                <p className="mb-4 text-sm text-slate-500">
                  These suggestions stay close to this conversion so you can compare nearby units without jumping to unrelated tools.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {relatedRecommendations.map(({ converter: rel, reason }) => (
                    <Link
                      key={rel.id}
                      href={`/${rel.category}/${rel.metadata.slug}`}
                      className="flex h-full flex-col justify-between gap-3 p-4 border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <span className="text-sm font-medium text-slate-700">{rel.title}</span>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{reason}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                        Open converter <ChevronRight className="h-4 w-4 text-slate-400" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <CrawlableLinkHub title="Explore More Conversion Pages" limitPerCategory={2} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <CategoryNavigation activeCategory={categorySlug} />
            <PopularToolsSidebar excludeSlug={slug} />
            <RelatedCalculators categoryContext={categorySlug} />

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
