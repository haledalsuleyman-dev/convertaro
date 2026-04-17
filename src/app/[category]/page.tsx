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
import { PopularToolsSidebar, RelatedCalculators } from "@/components/layout/InternalLinks";
import { RecentConversions } from "@/components/layout/RecentConversions";
import { AdSlot } from "@/components/ads/AdSlot";
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
    hasPart: categoryConverters.map((c) => ({
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
          <Link href="/" className="flex items-center hover:text-slate-900 transition-colors">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 font-medium">{category.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <main className="space-y-10">
            {/* SEO Hub Hero */}
            <header className="bg-slate-900 text-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-slate-800/50 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
                    {categoryConverters.length} Free Tools
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 border border-slate-700">
                    Verified Formulas
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 tracking-tight">
                  {category.name} Converters
                </h1>
                
                <div className="max-w-2xl">
                  <p className="text-slate-300 text-lg leading-relaxed mb-4">
                    {hubIntro.summary}
                  </p>
                  {isTopCategory(slug) && topCategoryContent?.lead && (
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {topCategoryContent.lead}
                    </p>
                  )}
                </div>

                {supportLinks.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-slate-800">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Quick Starts:</p>
                    <div className="flex flex-wrap gap-2">
                      {supportLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="inline-flex items-center gap-2 rounded-lg bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white border border-slate-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            <AdSlot type="in-content" id="category-top-ad" />

            {/* Featured Converters */}
            {featuredConverters.length > 0 && (
              <section>
                <div className="mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-display font-semibold text-slate-900">Popular {category.name} Tools</h2>
                  <p className="text-slate-500 mt-2">{hubIntro.featuredDescription}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredConverters.map(({ converter, reason }) => (
                    <Link
                      key={converter.id}
                      href={`/${category.slug}/${converter.metadata.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-200 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-100 transition-colors">
                            <Calculator className="h-5 w-5" />
                          </div>
                          <p className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors text-lg">{converter.title}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-sky-500 transition-colors shrink-0" />
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">{reason}</p>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Reference Tables & Formulas
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Structured Task Grouping */}
            {hubSections.length > 0 && (
              <section>
                <div className="mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-display font-semibold text-slate-900">Browse by Task</h2>
                  <p className="text-slate-500 mt-2">
                    Use these grouped sections to quickly locate the exact conversion tool for your needs.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {hubSections.map((section) => (
                    <div key={section.title} className="rounded-xl bg-slate-50 border border-slate-100 p-5">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">{section.title}</h3>
                      <p className="mt-1 mb-4 text-sm text-slate-500">{section.description}</p>
                      <div className="space-y-2">
                        {section.converters.map((converter) => (
                          <Link
                            key={converter.id}
                            href={`/${category.slug}/${converter.metadata.slug}`}
                            className="group flex flex-col justify-center rounded-lg bg-white border border-slate-200 p-3 transition-colors hover:border-slate-300 hover:shadow-sm"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">{converter.title}</p>
                              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                            </div>
                            <p className="mt-1 text-xs text-slate-500 line-clamp-1">{converter.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Calculators Discovery Block */}
            {relevantCalculators.length > 0 && (
              <section className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white border border-blue-100 rounded-2xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-display font-semibold text-slate-900">Interactive {category.name} Calculators</h2>
                  <p className="text-slate-600 mt-2">
                    {hubIntro.calculatorDescription ?? `Explore dynamic calculators connected to ${category.name.toLowerCase()} that handle complex multi-step formulas instantly.`}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relevantCalculators.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={`/${calculator.slug}`}
                      className="group rounded-xl border border-blue-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col h-full"
                    >
                      <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">{calculator.title}</p>
                      <p className="text-xs leading-relaxed text-slate-500 flex-grow">{calculator.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <AdSlot type="in-content" id="category-mid-ad" />

            {/* General Index */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-slate-900">All {category.name} Converters</h2>
                  <p className="text-slate-500 mt-1">
                    Alphabetical index of {categoryConverters.length} tools.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {categoryConverters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${category.slug}/${converter.metadata.slug}`}
                    className="flex flex-col justify-between p-4 rounded-lg border border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                  >
                    <p className="text-sm font-medium text-slate-800 group-hover:text-sky-700 mb-1">{converter.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{converter.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Semantic SEO About Section */}
            <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-display font-semibold text-slate-900 mb-4">{hubIntro.supportTitle}</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{hubIntro.supportDescription}</p>
                <p>
                  Every converter within the {category.name.toLowerCase()} category provides real-time client-side calculation. By processing conversions natively in your browser instead of relying on round-trip server requests, you receive sub-millisecond results.
                </p>
                <p>
                  Additionally, each dedicated tool includes dynamic reference tables, reversed calculation states, and standardized methodology formulas to guarantee absolute accuracy for academical, engineering, and personal use.
                </p>
              </div>
            </section>
            
            {/* FAQ Section */}
            {faqs.length > 0 && (
              <section className="border-t border-slate-100 pt-8">
                <h2 className="text-2xl font-display font-semibold text-slate-900 mb-6">Frequently Asked Questions</h2>
                <div className="grid gap-6">
                  {faqs.map((faq) => (
                    <div key={faq.question} className="bg-white rounded-lg">
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            <RecentConversions />
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
            <AdSlot type="sidebar" id="category-sidebar-ad-1" />
            <RelatedCalculators categoryContext={slug} />
            <div className="sticky top-6">
              <AdSlot type="sidebar" id="category-sidebar-ad-2" className="hidden lg:flex" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
