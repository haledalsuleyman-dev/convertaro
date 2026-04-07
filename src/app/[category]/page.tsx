import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { Converter } from "@/types/converter";
import Link from "next/link";
import { ChevronRight, Home, Calculator, CheckCircle2 } from "lucide-react";
import {
  INDEXABLE_ROBOTS,
  getCategoryLongTailKeywords,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { PopularToolsSidebar, RelatedCalculators, SEOLinksSection, CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { canonicalConverters, canonicalConvertersByCategory } from "@/lib/converter-routing";
import {
  getCategoryCalculatorLinks,
  getCategoryFeaturedConverterCards,
  getCategoryHubIntro,
  getCategoryHubSections,
  getCategorySupportLinks,
} from "@/lib/internal-linking";
import { getTopCategoryContent, isTopCategory } from "@/lib/priority-pages";

export const dynamic = "force-static";
export const dynamicParams = false;

const converters = canonicalConverters as Converter[];

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {};
  }

  const count = converters.filter((c) => c.category === slug).length;
  const longTailKeywords = getCategoryLongTailKeywords(category.name, category.slug);
  const topCategoryContent = getTopCategoryContent(slug);
  const title = topCategoryContent?.title ?? `${category.name} Converters - ${count} Free Online Tools`;
  const description =
    topCategoryContent?.description ??
    `${category.description} Browse all ${count} free ${category.name.toLowerCase()} converters. Instant results, accurate formulas, and reference tables for every ${category.name.toLowerCase()} unit conversion.`;

  return {
    title,
    description,
    robots: INDEXABLE_ROBOTS,
    keywords: [
      `${category.name.toLowerCase()} converter`,
      `free ${category.name.toLowerCase()} converter`,
      `online ${category.name.toLowerCase()} calculator`,
      `${category.name.toLowerCase()} conversion`,
      `convert ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} unit converter`,
      "unit converter",
      "free online converter",
      ...longTailKeywords.slice(0, 10),
    ],
    alternates: buildAlternates(`/${slug}`),
    openGraph: buildOpenGraph({
      title: `${title} | Convertaro`,
      description,
      path: `/${slug}`,
    }),
    twitter: buildTwitter(
      `${title} | Convertaro`,
      description
    ),
  };
}

const CATEGORY_FAQS: Record<string, { question: string; answer: string }[]> = {
  length: [
    {
      question: "How do I convert length units accurately?",
      answer: "Use our free length converters which use internationally standardized conversion factors. Simply enter your value and select the units.",
    },
    {
      question: "What is the difference between metric and imperial length?",
      answer: "Metric uses meters, centimeters, and millimeters based on powers of 10. Imperial uses feet, inches, and yards with different conversion factors.",
    },
  ],
  weight: [
    {
      question: "How do I convert kg to lbs correctly?",
      answer: "Multiply kilograms by 2.20462 to get pounds. Our converter does this instantly with up to 6 decimal places of accuracy.",
    },
    {
      question: "Is kg or lbs more accurate?",
      answer: "Both are equally accurate when converted properly. Kilograms is the SI base unit used in science, while pounds are common in the US and UK.",
    },
  ],
  temperature: [
    {
      question: "How do you convert Celsius to Fahrenheit?",
      answer: "Multiply Celsius by 9/5 and add 32. For example, 20°C = (20 × 9/5) + 32 = 68°F. Our converter does this instantly.",
    },
    {
      question: "What is the formula for temperature conversion?",
      answer: "C to F: (°C × 9/5) + 32 = °F. F to C: (°F - 32) × 5/9 = °C. Kelvin adds 273.15 to Celsius.",
    },
  ],
};

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryConverters = canonicalConvertersByCategory.get(slug) ?? [];
  const hubIntro = getCategoryHubIntro(category);
  const featuredConverters = getCategoryFeaturedConverterCards(category, converters);
  const hubSections = getCategoryHubSections(category, converters);
  const supportLinks = getCategorySupportLinks(category, converters);
  const relevantCalculators = getCategoryCalculatorLinks(slug);
  const faqs = CATEGORY_FAQS[slug] || [];
  const topCategoryContent = getTopCategoryContent(slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://convertaro.com" },
    { name: `${category.name} Converters`, url: `https://convertaro.com/${slug}` },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Converters`,
    description: category.description,
    url: `https://convertaro.com/${slug}`,
    numberOfItems: categoryConverters.length,
    hasPart: categoryConverters.slice(0, 10).map((c) => ({
      "@type": "WebPage",
      name: c.title,
      url: `https://convertaro.com/${slug}/${c.metadata.slug}`,
      description: c.description,
    })),
  };

  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;
  const webPageSchema = buildWebPageSchema({
    name: `${category.name} Converters`,
    description: `${category.description} Browse all ${categoryConverters.length} tools with formulas and reference tables.`,
    path: `/${slug}`,
  });

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="container-pro py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="flex items-center hover:text-slate-900">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium">{category.name} Converters</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="badge-pro-primary">{categoryConverters.length} Free Tools</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
                {category.name} Converters
              </h1>
              <div className="max-w-3xl space-y-3">
                <p className="text-slate-500 text-lg">{hubIntro.summary}</p>
                {isTopCategory(slug) ? (
                  <p className="text-sm leading-6 text-slate-600">{topCategoryContent?.lead}</p>
                ) : null}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                {hubIntro.actions.map((action) => (
                  <div key={action} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                    <p className="text-sm leading-6 text-slate-600">{action}</p>
                  </div>
                ))}
              </div>

              {supportLinks.length > 0 && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Quick starts</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {supportLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {item.label}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Featured Converters */}
            {featuredConverters.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">Popular {category.name} Converters</h2>
                  <span className="text-sm text-slate-500">Top starting points</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  {hubIntro.featuredDescription}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredConverters.map(({ converter, reason }) => (
                    <Link
                      key={converter.id}
                      href={`/${category.slug}/${converter.metadata.slug}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 hover:border-slate-300 hover:bg-white transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Featured</p>
                          <p className="text-sm font-semibold text-slate-900">{converter.title}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{reason}</p>
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            Formula, worked examples, and a reference table on the child page.
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {hubSections.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">Browse by Common Task</h2>
                  <span className="text-sm text-slate-500">Structured links</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  Use these grouped sections to move from broad category intent to the exact converter page you need.
                </p>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {hubSections.map((section) => (
                    <div key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                      <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{section.description}</p>
                      <div className="mt-4 space-y-3">
                        {section.converters.map((converter) => (
                          <Link
                            key={converter.id}
                            href={`/${category.slug}/${converter.metadata.slug}`}
                            className="flex items-start justify-between gap-3 rounded-xl bg-white p-3 transition-colors hover:bg-slate-100"
                          >
                            <div>
                              <p className="text-sm font-medium text-slate-900">{converter.title}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-500 line-clamp-2">{converter.description}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900">All {category.name} Converters</h2>
                <span className="text-sm text-slate-500">{categoryConverters.length} tools</span>
              </div>
              <p className="text-sm text-slate-500 mb-4 max-w-3xl">
                Browse the full {category.name.toLowerCase()} category when you need a less common unit pair or want to compare multiple child pages in the same silo.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryConverters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${category.slug}/${converter.metadata.slug}`}
                    className="card-pro p-5 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 bg-slate-100 rounded-md flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Calculator className="h-5 w-5 text-slate-600 group-hover:text-white" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 mb-2">
                      {converter.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{converter.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-medium text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-500 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">{hubIntro.supportTitle}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-6">
                <div>
                  <p className="text-slate-600 leading-7">{hubIntro.supportDescription}</p>
                  {supportLinks.length > 0 && (
                    <p className="text-slate-600 leading-7 mt-4">
                      Strong entry points in this category include {supportLinks.map((item, index) => (
                        <span key={item.href}>
                          <Link href={item.href} className="font-medium text-slate-700 hover:text-slate-900 hover:underline">
                            {item.label}
                          </Link>
                          {index < supportLinks.length - 1 ? ", " : "."}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="text-slate-600 leading-7 mt-4">
                    For a broader starting point across categories, browse the{" "}
                    <Link href="/popular-conversion-tools" className="font-medium text-slate-700 hover:text-slate-900 hover:underline">
                      Popular Conversion Tools hub
                    </Link>
                    .
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">
                    What you get on each page
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {[
                      "Instant result updates",
                      "Reliable conversion formulas",
                      "Reference tables for quick scanning",
                      "Mobile-friendly layouts",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  "Useful intros tied to real search intent",
                  "Featured converters with clearer emphasis",
                  "Grouped child links by task or use case",
                  "Full category coverage without clutter",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Links Section */}
            <SEOLinksSection />

            {relevantCalculators.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Related Calculators</h2>
                <p className="text-sm text-slate-500 mb-4">
                  {hubIntro.calculatorDescription ?? `These calculators connect naturally with ${category.name.toLowerCase()} conversions and help you continue the same task without leaving the topic.`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relevantCalculators.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={`/${calculator.slug}`}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 hover:border-slate-300 hover:bg-white transition-colors"
                    >
                      <p className="text-sm font-semibold text-slate-900">{calculator.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{calculator.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <CrawlableLinkHub title="More Internal Links" limitPerCategory={2} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                All Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      cat.slug === slug
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {cat.slug === slug && <ChevronRight className="h-4 w-4" />}
                  </Link>
                ))}
              </div>
            </div>

            <PopularToolsSidebar />
            <RelatedCalculators categoryContext={slug} />
          </aside>
        </div>
      </div>
    </div>
  );
}
