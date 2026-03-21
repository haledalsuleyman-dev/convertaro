import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Converter } from "@/types/converter";
import convertersData from "@/data/converters.json";
import { categories } from "@/data/categories";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQSection } from "@/components/converter/FAQSection";
import { AdUnit } from "@/components/ui/AdUnit";
import Link from "next/link";
import { ChevronRight, Home, Calculator, Lightbulb, Table, Zap } from "lucide-react";

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

  if (!converter) return {};

  const title = `${converter.title} – Free Online Calculator`;
  const description = `${converter.description} Use our free ${converter.fromUnit} to ${converter.toUnit} converter. Instant results, accurate formula, and conversion table. Formula: ${converter.formula}`;

  return {
    title,
    description,
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
      canonical: `https://convertaro.com/${category}/${slug}`,
    },
    openGraph: {
      title: `${converter.title} – Free Online Tool`,
      description: `${converter.description} Instant results with formula and conversion table.`,
      siteName: "Convertaro",
      type: "website",
      url: `https://convertaro.com/${category}/${slug}`,
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

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": converter.faq.map(item => ({
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
    <div className="bg-background min-h-screen py-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-text-secondary mb-10">
          <Link href="/" className="hover:text-primary flex items-center transition-colors">
            <Home className="h-4 w-4 mr-1.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 opacity-40" />
          <Link href={`/${categorySlug}`} className="hover:text-primary capitalize transition-colors">
            {category.name}
          </Link>
          <ChevronRight className="h-4 w-4 opacity-40" />
          <span className="text-text-primary font-semibold truncate">{converter.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
          <div className="space-y-12">

            {/* Header */}
            <div className="space-y-4">
              {/* Category pill */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary capitalize">
                {category.name} Converter
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
                {converter.title}
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                {converter.description}{" "}
                <span className="text-text-primary font-medium">Fast, accurate, and completely free.</span>
              </p>
            </div>

            {/* Converter Tool */}
            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border">
              <ConverterTool converter={converter} />
            </div>

            <AdUnit variant="banner" />

            {/* Formula & Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-border hover:border-primary/40 transition-all duration-300">
                <div className="h-11 w-11 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Calculator className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Conversion Formula</h2>
                <div className="bg-background p-5 rounded-xl border border-border font-mono text-primary font-bold text-lg mb-5 text-center shadow-inner">
                  {converter.formula}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  To convert <strong>{converter.fromUnit}</strong> to <strong>{converter.toUnit}</strong>, use the formula above or enter any value in our tool for an instant result.
                </p>
                {converter.inverseFormula && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-text-secondary font-medium mb-2">Reverse formula:</p>
                    <div className="bg-background p-3 rounded-lg border border-border font-mono text-secondary text-sm text-center">
                      {converter.inverseFormula}
                    </div>
                  </div>
                )}
              </section>

              <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-border hover:border-secondary/40 transition-all duration-300">
                <div className="h-11 w-11 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-text-primary mb-4">How to Convert</h2>
                <ol className="space-y-3 text-sm text-text-secondary">
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Enter the value in <strong>{converter.fromUnit}</strong> in the input field above.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>The result in <strong>{converter.toUnit}</strong> will appear instantly.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Use the swap button to reverse the conversion direction.</span>
                  </li>
                </ol>
                <Link
                  href={`/${categorySlug}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm text-primary font-semibold hover:underline"
                >
                  See all {category.name} tools <ChevronRight className="h-4 w-4" />
                </Link>
              </section>
            </div>

            {/* Conversion Table */}
            <section className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-border">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                  {converter.fromUnit} to {converter.toUnit} Reference Table
                </h2>
                <Table className="h-7 w-7 text-text-secondary opacity-20" />
              </div>
              <ConversionTable converter={converter} />
            </section>

            {/* FAQ Section */}
            <section className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-10 tracking-tight">
                Frequently Asked Questions
              </h2>
              <FAQSection faq={converter.faq} />
            </section>

            {/* Related Converters */}
            {converter.relatedConverters.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-text-primary mb-6 tracking-tight">
                  More {category.name} Converters
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {converter.relatedConverters.map((relId) => {
                    const related = converters.find(c => c.id === relId);
                    if (!related) return null;
                    return (
                      <Link
                        key={relId}
                        href={`/${categorySlug}/${related.metadata.slug}`}
                        className="bg-white p-5 rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 group"
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

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdUnit variant="sidebar" />

            <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm sticky top-24">
              <h3 className="text-base font-bold text-text-primary mb-6 tracking-tight">All Categories</h3>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                      cat.slug === categorySlug
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                        : "text-text-secondary hover:bg-background border-transparent hover:border-border"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`h-4 w-4 ${cat.slug === categorySlug ? "opacity-100" : "opacity-30"}`} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-[#7C3AED] p-8 rounded-[2rem] text-white shadow-xl shadow-primary/15 relative overflow-hidden">
              <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/8 blur-2xl" />
              <Zap className="h-8 w-8 mb-5 relative" />
              <h3 className="text-lg font-bold mb-2 relative">Sub-Millisecond Speed</h3>
              <p className="text-white/75 text-sm leading-relaxed relative">
                Every conversion is computed instantly on your device — no server round-trips.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
