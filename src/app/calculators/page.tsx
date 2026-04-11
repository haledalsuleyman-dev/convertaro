import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { calculators } from "@/data/calculators";
import { calculatorCategories } from "@/data/calculator-categories";
import {
  canonicalFromPath,
  INDEXABLE_ROBOTS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
} from "@/lib/seo";
import { CalculatorDefinition } from "@/data/calculators";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { canonicalizeConverterHref } from "@/lib/converter-routing";

export const dynamic = "force-static";

const FEATURED_CALCULATORS = ["mortgage-calculator", "loan-calculator", "bmi-calculator", "percentage-calculator"];

export const metadata: Metadata = {
  title: "Free Online Calculators – Finance, Health, Math & More",
  description:
    "Free calculators for mortgage payments, BMI, loan interest, percentage, and more. Each tool includes clear formulas, worked examples, and instant results. No sign-up needed.",
  robots: INDEXABLE_ROBOTS,
  alternates: buildAlternates("/calculators"),
  openGraph: buildOpenGraph({
    title: "Free Online Calculators – Finance, Health, Math & More | Convertaro",
    description:
      "Free calculators for mortgage, BMI, loan, percentage & more. Instant results, clear formulas, no sign-up.",
    path: "/calculators",
  }),
  twitter: buildTwitter(
    "Free Online Calculators – Finance, Health, Math & More | Convertaro",
    "Free calculators for mortgage, BMI, loan, percentage & more. Instant results, clear formulas, no sign-up."
  ),
};

export default function CalculatorsHubPage() {
  const featured = FEATURED_CALCULATORS
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((calculator): calculator is CalculatorDefinition => Boolean(calculator));

  const categoryCounts = new Map<string, number>();
  calculators.forEach((calculator) => {
    categoryCounts.set(calculator.category, (categoryCounts.get(calculator.category) ?? 0) + 1);
  });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Convertaro Calculators",
    description:
      "A categorized collection of practical calculators for finance, health, math, and time use cases.",
    url: canonicalFromPath("/calculators"),
    hasPart: calculators.map((calculator) => ({
      "@type": "WebPage",
      name: calculator.title,
      url: canonicalFromPath(`/${calculator.slug}`),
    })),
  };

  const webPageSchema = buildWebPageSchema({
    name: "Convertaro Calculators Hub",
    description:
      "Browse finance, health, math, and time calculators with practical examples and clear formulas.",
    path: "/calculators",
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 dot-grid" />
      <div className="pointer-events-none absolute -top-24 -left-28 h-[560px] w-[560px] rounded-full bg-primary/10 blur-[110px]" />
      <div className="pointer-events-none absolute top-10 right-0 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-[95px]" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <section className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Calculator Hub
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl font-black tracking-tight text-text-primary">All Calculators</h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Convertaro now includes a growing set of practical calculators beyond unit conversion. Explore finance, health, math, and time calculators designed for speed, clarity, and real-world decisions.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-text-primary">Featured calculators</h2>
            <Link href="/search?q=calculator" className="text-sm font-semibold text-primary hover:underline">Search all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featured.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/${calculator.slug}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/35 hover:bg-white transition-colors"
              >
                <p className="text-sm font-bold text-text-primary">{calculator.title}</p>
                <p className="mt-1.5 text-xs text-text-secondary">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Calculator categories</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {calculatorCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/calculators/${category.slug}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/35 hover:bg-white transition-colors"
              >
                <p className="text-sm font-bold text-text-primary">{category.shortLabel}</p>
                <p className="mt-1 text-xs text-primary font-semibold">{categoryCounts.get(category.slug) ?? 0} tools</p>
                <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">All calculators</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {calculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/${calculator.slug}`}
                className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/35 hover:bg-white transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-text-primary">{calculator.title}</p>
                  <ArrowUpRight className="h-4 w-4 text-text-secondary" />
                </div>
                <p className="mt-1 text-xs font-semibold text-primary capitalize">{calculator.category}</p>
                <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Why use these calculators</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              "Fast and practical outputs for real scenarios",
              "Formula-backed results with explanatory guidance",
              "Designed to pair naturally with Convertaro converters",
            ].map((item) => (
              <article key={item} className="rounded-xl border border-border bg-background/60 p-4 text-sm text-text-secondary leading-relaxed">
                {item}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Related converter tools</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {[
              { href: "/weight/kg-to-lbs", label: "kg to lbs" },
              { href: "/time/day-to-hr", label: "days to hours" },
              { href: "/data/megabytes-to-gigabytes", label: "MB to GB" },
              { href: "/length/cm-to-inches", label: "cm to inches" },
              { href: "/temperature/celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
            ].map((tool) => ({ ...tool, href: canonicalizeConverterHref(tool.href) })).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-semibold text-text-primary hover:border-primary/35 hover:text-primary hover:bg-white transition-colors"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-white shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Top tools</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { href: "/mortgage-calculator", label: "Mortgage Calculator" },
              { href: "/loan-calculator", label: "Loan Calculator" },
              { href: "/bmi-calculator", label: "BMI Calculator" },
              { href: "/percentage-calculator", label: "Percentage Calculator" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-xl border border-border bg-background/60 p-4 text-sm font-semibold text-text-primary hover:border-primary/35 hover:text-primary hover:bg-white transition-colors"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>

        <CrawlableLinkHub title="Cross-Link Index" limitPerCategory={2} />
      </div>
    </div>
  );
}
