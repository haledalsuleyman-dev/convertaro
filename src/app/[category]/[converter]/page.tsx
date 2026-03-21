import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Converter } from "@/types/converter";
import convertersData from "@/data/converters.json";
import { categories } from "@/data/categories";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQSection } from "@/components/converter/FAQSection";
import { ConverterContentSections } from "@/components/converter/ConverterContentSections";
import { AdUnit } from "@/components/ui/AdUnit";
import Link from "next/link";
import { ChevronRight, Home, Calculator, Lightbulb, Table, Zap } from "lucide-react";
import { converterCanonical, INDEXABLE_ROBOTS } from "@/lib/seo";
import {
  buildConverterFaq,
  getContextualRelatedConverters,
  getReverseConverter,
} from "@/lib/converter-content";

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
  const converter = converters.find(c => c.category === category && c.metadata.slug === slug);
  const cat = categories.find(c => c.slug === category);

  if (!converter) {
    return {};
  }

  const title = `${converter.title} – Free Online Calculator`;
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
    ].filter(Boolean),
    alternates: {
      canonical: converterCanonical(category, slug),
    },
    openGraph: {
      title: `${converter.title} – Free Online Tool`,
      description: `${converter.description} Instant results with formula and conversion table.`,
      siteName: "Convertaro",
      type: "website",
      url: converterCanonical(category, slug),
    },
    twitter: {
      card: "summary_large_image",
      title: `${converter.title} – Free Online Calculator`,
      description: `${converter.description} Free, instant, and accurate.`,
    },
  };
}

export default async function ConverterPage({ params }: PageProps) {
  const { category: categorySlug, converter: slug } = await params;
  const converter = converters.find(c => c.category === categorySlug && c.metadata.slug === slug);
  const category = categories.find(c => c.slug === categorySlug);

  if (!converter || !category) {
    notFound();
  }

  const reverseConverter = getReverseConverter(converter, converters);
  const contextualLinks = getContextualRelatedConverters(converter, converters);
  const pageFaq = buildConverterFaq(converter, category, reverseConverter);

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageFaq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://convertaro.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category.name,
        "item": `https://convertaro.com/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": converter.title,
        "item": `https://convertaro.com/${categorySlug}/${slug}`,
      },
    ],
  };

  // HowTo Schema — makes Google show rich how-to snippets
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Convert ${converter.fromUnit} to ${converter.toUnit}`,
    "description": `Learn how to convert ${converter.fromUnit} to ${converter.toUnit} using the formula: ${converter.formula}`,
    "tool": {
      "@type": "HowToTool",
      "name": "Convertaro Unit Converter",
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": `Enter the value in ${converter.fromUnit}`,
        "text": `Type the number you want to convert from ${converter.fromUnit} into the input field above.`,
        "url": `https://convertaro.com/${categorySlug}/${slug}`,
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Get the instant result",
        "text": `The equivalent value in ${converter.toUnit} will appear instantly in the result field. The formula used is: ${converter.formula}`,
        "url": `https://convertaro.com/${categorySlug}/${slug}`,
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Use or reverse the conversion",
        "text": `Copy the result or click the swap button to reverse the conversion. You can also consult the reference table below.`,
        "url": `https://convertaro.com/${categorySlug}/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── Page hero strip ── */}
      <div className="border-b border-border/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-secondary mb-6">
            <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="h-3.5 w-3.5" /><span>Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-35" />
            <Link href={`/${categorySlug}`} className="hover:text-primary capitalize transition-colors">{category.name}</Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-35" />
            <span className="text-text-primary font-semibold truncate max-w-[200px]">{converter.title}</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-bold text-primary capitalize mb-4">
            {category.name} Converter
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-text-primary tracking-tight leading-[1.1] mb-4">
            {converter.title}
          </h1>
          <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
            {converter.description}{" "}
            <span className="font-semibold text-text-primary">Fast, free, and always accurate.</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 xl:gap-14">
          <div className="space-y-10 min-w-0">

            {/* ── Converter Tool ── */}
            <div className="rounded-2xl border border-border bg-white shadow-card overflow-hidden">
              <div className="border-b border-border/60 px-6 py-3.5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-medium text-text-secondary">{converter.title}</span>
              </div>
              <div className="p-2 sm:p-3">
                <ConverterTool converter={converter} />
              </div>
            </div>

            <AdUnit variant="banner" />

            {/* ── Formula & How-to ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Formula */}
              <section className="rounded-2xl bg-white border border-border shadow-card p-6 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-9 w-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <h2 className="text-base font-black text-text-primary">Conversion Formula</h2>
                </div>
                <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-sm font-bold mb-4 text-center tracking-wide shadow-inner">
                  {converter.formula}
                </div>
                <p className="text-text-secondary text-xs leading-relaxed">
                  Multiply your <strong className="text-text-primary">{converter.fromUnit}</strong> value by the conversion factor to get <strong className="text-text-primary">{converter.toUnit}</strong>.
                </p>
                {converter.inverseFormula && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">Reverse</p>
                    <div className="bg-slate-50 p-3 rounded-lg border border-border font-mono text-secondary text-xs text-center">
                      {converter.inverseFormula}
                    </div>
                  </div>
                )}
              </section>

              {/* How-to */}
              <section className="rounded-2xl bg-white border border-border shadow-card p-6 hover:border-secondary/30 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-9 w-9 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <h2 className="text-base font-black text-text-primary">How to Convert</h2>
                </div>
                <ol className="space-y-3.5">
                  {[
                    `Enter a value in <strong>${converter.fromUnit}</strong> in the input field.`,
                    `The result in <strong>${converter.toUnit}</strong> appears instantly.`,
                    `Use the ⇄ swap button to reverse the direction.`,
                  ].map((text, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-secondary">
                      <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span dangerouslySetInnerHTML={{ __html: text }} />
                    </li>
                  ))}
                </ol>
                <Link href={`/${categorySlug}`} className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                  All {category.name} tools <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </section>
            </div>

            {/* ── Reference Table ── */}
            <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-black text-text-primary tracking-tight">
                    {converter.fromUnit} → {converter.toUnit} Table
                  </h2>
                  <p className="text-xs text-text-secondary mt-1">Common reference values</p>
                </div>
                <Table className="h-6 w-6 text-border" />
              </div>
              <ConversionTable converter={converter} />
            </section>

            {/* ── FAQ ── */}
            <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
              <h2 className="text-lg font-black text-text-primary mb-8 tracking-tight">
                Frequently Asked Questions
              </h2>
              <FAQSection faq={pageFaq} />
            </section>

            <ConverterContentSections
              converter={converter}
              category={category}
              reverseConverter={reverseConverter}
              contextualLinks={contextualLinks}
            />

            {/* ── Related Converters ── */}
            {converter.relatedConverters.length > 0 && (
              <section>
                <h2 className="text-base font-black text-text-primary mb-4">
                  More {category.name} Converters
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {converter.relatedConverters.map((relId) => {
                    const related = converters.find(c => c.id === relId);
                    if (!related) return null;
                    return (
                      <Link
                        key={relId}
                        href={`/${categorySlug}/${related.metadata.slug}`}
                        className="bg-white p-4 rounded-xl border border-border hover:border-primary/40 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group"
                      >
                        <span className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                          {related.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            <AdUnit variant="sidebar" />

            {/* Categories nav */}
            <div className="rounded-2xl bg-white border border-border shadow-card p-5 sticky top-[4.5rem]">
              <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-4">All Categories</h3>
              <div className="space-y-1">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      cat.slug === categorySlug
                        ? "bg-primary text-white shadow-sm shadow-primary/25"
                        : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.slug === categorySlug && <ChevronRight className="h-3.5 w-3.5" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Promo card */}
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white">
              <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
              <Zap className="h-7 w-7 mb-4 text-primary relative" />
              <h3 className="text-base font-black mb-2 relative">Lightning Fast</h3>
              <p className="text-white/60 text-xs leading-relaxed relative">
                All calculations run on your device. Sub-millisecond results, zero server latency.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
