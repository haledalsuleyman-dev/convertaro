import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Flame, Layers3 } from "lucide-react";
import { categories } from "@/data/categories";
import { Converter } from "@/types/converter";
import { canonicalConverters } from "@/lib/converter-routing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { buildPageMetadata, buildWebPageSchema, generateBreadcrumbSchemaFromPaths } from "@/lib/seo";
import { getPopularHubSections } from "@/lib/internal-linking";

export const dynamic = "force-static";

const converters = canonicalConverters as Converter[];

export const metadata: Metadata = buildPageMetadata({
  title: "Most Popular Unit Converters – Top Free Tools",
  description:
    "Quickly access the most-used unit conversion tools on Convertaro — organized by category. Covers length, weight, temperature, speed, volume, data, and more. No sign-up needed.",
  path: "/popular-conversion-tools",
});

export default function PopularConversionToolsPage() {
  const sections = getPopularHubSections(categories, converters);
  const webPageSchema = buildWebPageSchema({
    name: "Popular Conversion Tools",
    description:
      "A curated hub of the most useful and most commonly used conversion tools across major unit categories.",
    path: "/popular-conversion-tools",
  });
  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: "Popular Conversion Tools", path: "/popular-conversion-tools" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Popular Conversion Tools",
    description:
      "A curated hub of the most useful and most commonly used conversion tools across major unit categories.",
    url: "https://convertaro.com/popular-conversion-tools",
    hasPart: sections.flatMap((section) =>
      section.converters.map((converter) => ({
        "@type": "WebPage",
        name: converter.title,
        url: `https://convertaro.com/${converter.category}/${converter.metadata.slug}`,
      }))
    ),
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 dot-grid" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[110px]" />
      <div className="pointer-events-none absolute top-10 right-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[95px]" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <section className="rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8 lg:p-10">
          <Breadcrumbs
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-text-secondary"
            items={[
              { label: "Home", href: "/" },
              { label: "Popular Conversion Tools" },
            ]}
          />

          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
            <Flame className="h-3.5 w-3.5" />
            Curated converter hub
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-text-primary">Popular Conversion Tools</h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-text-secondary">
            This page brings together the conversion tools people use most often across the site. Use it to jump into the most practical unit pairs, browse major categories, and continue into related calculators when the task naturally overlaps.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              "Grouped by major converter category for faster scanning",
              "Focused on common unit conversions instead of giant raw lists",
              "Built to support homepage, category, and converter navigation",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-background/60 p-4 text-sm leading-relaxed text-text-secondary">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-text-primary">Explore by category</h2>
              <p className="mt-2 text-sm text-text-secondary">Jump into the converter silo that best matches your task.</p>
            </div>
            <Link href="/calculators" className="text-sm font-semibold text-primary hover:underline">
              Open calculators
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Link
                key={section.category.slug}
                href={`/${section.category.slug}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/35 hover:bg-white transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-text-primary">{section.category.name} Converters</p>
                  <ArrowUpRight className="h-4 w-4 text-text-secondary" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{section.intro}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.category.slug} className="rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{section.category.name}</p>
                  <h2 className="mt-2 text-2xl font-black text-text-primary">Popular {section.category.name.toLowerCase()} conversions</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">{section.intro}</p>
                </div>
                <Link href={`/${section.category.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  View all {section.category.name.toLowerCase()} converters
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {section.converters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${converter.category}/${converter.metadata.slug}`}
                    className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/35 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-text-primary">{converter.title}</p>
                      <ArrowUpRight className="h-4 w-4 text-text-secondary" />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-text-secondary">{converter.description}</p>
                  </Link>
                ))}
              </div>

              {section.calculators.length > 0 ? (
                <div className="mt-5 rounded-2xl border border-border bg-background/50 p-4">
                  <p className="text-sm font-semibold text-text-primary">Useful related calculators</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {section.calculators.map((calculator) => (
                      <Link
                        key={calculator.slug}
                        href={`/${calculator.slug}`}
                        className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-text-primary hover:border-primary/35 hover:text-primary transition-colors"
                      >
                        {calculator.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-primary">
            <Layers3 className="h-5 w-5" />
            <h2 className="text-xl font-black text-text-primary">Keep exploring</h2>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
            This hub is designed as a strong entry point into the site. From here, you can move into full category indexes, individual converters, or the calculator hub depending on what you need next.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">
              Back to homepage
            </Link>
            <Link href="/calculators" className="inline-flex items-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text-primary hover:border-primary/35 hover:text-primary transition-colors">
              Browse calculators
            </Link>
          </div>
        </section>

        <CrawlableLinkHub title="More conversion and calculator links" limitPerCategory={2} />
      </div>
    </div>
  );
}
