import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { Converter } from "@/types/converter";
import { SearchTool } from "@/components/ui/SearchTool";
import {
  INDEXABLE_ROBOTS,
  HOMEPAGE_LONGTAIL_KEYWORDS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
} from "@/lib/seo";
import Link from "next/link";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { AdSlot } from "@/components/ads/AdSlot";
import {
  canonicalConverterCountByCategory,
  canonicalizeConverterHref,
  getCanonicalConverterById,
} from "@/lib/converter-routing";
import {
  ArrowRight,
  ArrowUpRight,
  Calculator,
  Database,
  Droplets,
  Gauge,
  Ruler,
  Square,
  Thermometer,
  Weight,
  Wind,
  Clock,
  Zap,
  Smartphone,
  CheckCircle2,
  Lock,
  Globe,
  Star,
  TrendingUp,
  LayoutGrid,
  Shield,
  CircleDot,
} from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Unit Converter - Instant, Free & Accurate | Convertaro",
  description:
    "Convert any unit instantly — length, weight, temperature, speed, volume, data, and more. 500+ free converters with exact formulas, reference tables, and no sign-up needed.",
  robots: INDEXABLE_ROBOTS,
  alternates: buildAlternates("/"),
  openGraph: buildOpenGraph({
    title: "Unit Converter - Instant, Free & Accurate | Convertaro",
    description: "500+ free converters for length, weight, temperature, speed & more. Instant results, verified formulas, no sign-up.",
    path: "/",
  }),
  twitter: buildTwitter(
    "Unit Converter - Instant, Free & Accurate | Convertaro",
    "500+ free converters for length, weight, temperature, speed & more. Instant results, verified formulas, no sign-up."
  ),
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler,
  Weight,
  Thermometer,
  Droplets,
  Square,
  Gauge,
  Clock,
  Database,
  Zap,
  Wind,
};

const QUICK_LINKS = [
  { href: "/length/cm-to-inches", label: "cm → inches" },
  { href: "/weight/kg-to-lbs", label: "kg → lbs" },
  { href: "/speed/mph-to-kmh", label: "mph → km/h" },
  { href: "/temperature/celsius-to-fahrenheit", label: "°C → °F" },
  { href: "/length/km-to-miles", label: "km → miles" },
  { href: "/data/megabytes-to-gigabytes", label: "MB → GB" },
  { href: "/volume/liters-to-gallons", label: "L → gallons" },
  { href: "/weight/lbs-to-kg", label: "lbs → kg" },
  { href: "/length/feet-to-inches", label: "ft → in" },
  { href: "/volume/gallons-to-liters", label: "gallons → L" },
  { href: "/data/gigabytes-to-megabytes", label: "GB → MB" },
  { href: "/temperature/fahrenheit-to-celsius", label: "°F → °C" },
];

const CANONICAL_QUICK_LINKS = QUICK_LINKS.map((link) => ({
  ...link,
  href: canonicalizeConverterHref(link.href),
}));

const TRUST_METRICS = [
  { value: "500+", label: "Conversion tools" },
  { value: "4.9/5", label: "Average rating" },
  { value: "150+", label: "Countries served" },
  { value: "0", label: "Signup required" },
];

const FEATURES = [
  { icon: Zap, title: "Instant Results", desc: "Sub-millisecond calculations. No waiting, no loading." },
  { icon: CheckCircle2, title: "Verified Accuracy", desc: "All formulas verified against SI, NIST, and ISO standards." },
  { icon: Lock, title: "100% Private", desc: "Your data never leaves your browser. No account required." },
  { icon: Smartphone, title: "Works Everywhere", desc: "Fully responsive. Desktop, tablet, and mobile." },
  { icon: Globe, title: "Used Worldwide", desc: "Trusted by professionals in 150+ countries." },
  { icon: TrendingUp, title: "Always Free", desc: "No hidden fees. No premium plans. Just free tools." },
];

const POPULAR_TOOL_EXAMPLES: Record<string, { example: string; note: string }> = {
  "centimeters-to-inches": {
    example: "10 cm = 3.94 in",
    note: "Useful for sizing, product specs, and height checks.",
  },
  "kilograms-to-pounds": {
    example: "70 kg = 154.32 lb",
    note: "Common for fitness, travel, and shipping.",
  },
  "celsius-to-fahrenheit": {
    example: "25 C = 77 F",
    note: "Helpful for weather, cooking, and travel.",
  },
  "liters-to-gallons": {
    example: "10 L = 2.64 gal",
    note: "Useful for fuel, water storage, and container planning.",
  },
  "megabytes-to-gigabytes": {
    example: "1024 MB = 1 GB",
    note: "Helpful for file sizes, storage plans, and downloads.",
  },
  "km-h-to-mph": {
    example: "100 km/h = 62.14 mph",
    note: "Good for driving, road trips, and speed checks.",
  },
  "kilometers-to-miles": {
    example: "5 km = 3.11 mi",
    note: "Often used for running, maps, and route planning.",
  },
  "meters-to-feet": {
    example: "2 m = 6.56 ft",
    note: "Useful for room dimensions and project work.",
  },
};

export default function Home() {
  const popularConverters = [
    "cm-to-inches",
    "kg-to-lbs",
    "celsius-to-fahrenheit",
    "kmh-to-mph",
    "liters-to-gallons",
    "megabytes-to-gigabytes",
  ]
    .map((id) => getCanonicalConverterById(id))
    .filter(Boolean) as Converter[];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Convertaro Unit Converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1250",
    },
  };

  const webPageSchema = buildWebPageSchema({
    name: "Convertaro Home",
    description:
      "Convert any unit instantly with 500+ free online conversion tools for length, weight, temperature, volume, speed, data, and more.",
    path: "/",
  });

  return (
    <div className="relative flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <section className="relative overflow-hidden px-4 pt-16 pb-20 md:pt-24 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_10%,rgba(229,231,235,0.6),transparent_26%),radial-gradient(circle_at_88%_6%,rgba(226,232,240,0.42),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8f8f8_34%,#f1f1f1_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.18] bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-slate-200/70 blur-3xl" />
        <div className="absolute -left-24 bottom-4 -z-10 h-72 w-72 rounded-full bg-slate-100/90 blur-3xl" />

        <div className="container-pro relative z-10 text-center text-slate-900">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-1.5 text-sm font-semibold text-sky-800 shadow-sm">
            <Shield className="h-4 w-4" />
            Verified against SI & NIST Standards
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl md:leading-[1.1]">
            Convert Any Unit,
            <span className="block bg-gradient-to-r from-slate-900 via-sky-800 to-indigo-800 bg-clip-text text-transparent py-1">
              Instantly & Accurately.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 md:text-xl leading-relaxed">
            Professional-grade unit converters and calculators for students, developers, and daily tasks. 500+ free tools with live reference tables and step-by-step formulas.
          </p>

          <div className="mx-auto mt-10 max-w-2xl rounded-[28px] border border-white/90 bg-white/55 p-3 shadow-[0_26px_60px_-38px_rgba(15,23,42,0.16)] backdrop-blur-xl animate-fade-in sm:p-4">
            <SearchTool placeholder="Search conversions..." />
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-600">
              <span className="text-slate-500">Popular searches:</span>
               {CANONICAL_QUICK_LINKS.slice(0, 8).map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 rounded-[28px] border border-white/90 bg-white/72 p-3 shadow-[0_22px_50px_-34px_rgba(15,23,42,0.12)] backdrop-blur-xl md:grid-cols-4 md:gap-4 md:p-5">
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200/80 bg-white/88 p-4 text-left md:text-center">
                <p className="text-xl font-display font-semibold text-slate-900 md:text-2xl tabular-nums">{metric.value}</p>
                <p className="mt-0.5 text-xs text-slate-500 md:text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_96%_0%,rgba(226,232,240,0.18),transparent_24%),radial-gradient(circle_at_0%_16%,rgba(229,231,235,0.18),transparent_22%),linear-gradient(180deg,#fbfbfc_0%,#f5f6f7_100%)] py-16 md:py-24">
        <div className="container-pro">
          <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-900">Most Used Conversions</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/popular-conversion-tools" className="text-sm font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1">
                View all popular conversions <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <AdSlot type="leaderboard" id="homepage-top-ad" className="mb-10" />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {popularConverters.map((converter) => (
              converter && (
                (() => {
                  const details = POPULAR_TOOL_EXAMPLES[converter.metadata.slug] ?? {
                    example: `1 ${converter.fromUnit} = ${converter.toUnit}`,
                    note: converter.description,
                  };

                  return (
                <Link
                  key={converter.id}
                  href={`/${converter.category}/${converter.metadata.slug}`}
                  className="bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:border-sky-200 hover:shadow-md group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-slate-900 text-lg leading-tight group-hover:text-sky-700 transition-colors">
                          {converter.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-slate-500 leading-relaxed max-w-sm">{details.note}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-100">
                      <CircleDot className="h-3 w-3 text-emerald-500" />
                      {details.example}
                    </span>
                    <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500 border border-slate-100">
                      Formula & Table
                    </span>
                  </div>
                </Link>
                  );
                })()
              )
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="container-pro">
          <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold text-slate-900 mb-2">Browse by Category</h2>
              <p className="text-slate-500 text-lg">Every possible unit organized neatly into core silos.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.name] || LayoutGrid;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 group flex flex-col items-center text-center hover:border-slate-300 hover:bg-white transition-all shadow-sm hover:shadow-md"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm transition-all duration-300 group-hover:text-sky-600 group-hover:shadow">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1 font-display font-semibold text-slate-900">{category.name}</h3>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {canonicalConverterCountByCategory.get(category.id) ?? 0} Tools
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="container-pro text-center mb-10">
          <h2 className="font-display text-3xl font-semibold mb-4">Professional Calculators</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Beyond direct unit conversions, we cover robust formula-driven calculators for health, math, and finance.
          </p>
        </div>

        <div className="container-pro grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/bmi-calculator" className="bg-slate-800/80 border border-slate-700 hover:border-slate-500 rounded-2xl p-6 transition-all block">
            <h3 className="font-semibold text-lg text-white mb-2">BMI Calculator</h3>
            <p className="text-slate-400 text-sm">Calculate your Body Mass Index exactly as medical professionals do.</p>
          </Link>
          <Link href="/percentage-calculator" className="bg-slate-800/80 border border-slate-700 hover:border-slate-500 rounded-2xl p-6 transition-all block">
            <h3 className="font-semibold text-lg text-white mb-2">Percentage Calculator</h3>
            <p className="text-slate-400 text-sm">Solve percentage changes, differences, and fractions effortlessly.</p>
          </Link>
          <Link href="/loan-calculator" className="bg-slate-800/80 border border-slate-700 hover:border-slate-500 rounded-2xl p-6 transition-all block">
            <h3 className="font-semibold text-lg text-white mb-2">Loan Calculator</h3>
            <p className="text-slate-400 text-sm">Determine monthly payments and deep amortization schedules.</p>
          </Link>
        </div>
        <div className="text-center mt-10">
          <Link href="/calculators" className="inline-flex py-2 px-5 text-sm font-semibold border border-slate-700 rounded-full hover:bg-slate-800 transition-colors">
            View All Core Calculators <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-12 border-t border-slate-100 bg-slate-50/50">
        <div className="container-pro">
           <AdSlot type="leaderboard" id="homepage-bottom-ad" />
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-20">
        <div className="container-pro text-center mb-14">
          <span className="badge-pro mb-4 inline-block uppercase tracing-wide text-xs">Quality Architecture</span>
          <h2 className="font-display text-3xl font-semibold text-slate-900 mb-4">Built for Modern Workflows</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We obsess over algorithmic accuracy, DOM speed, and interface design so you can focus on what matters.
          </p>
        </div>

        <div className="container-pro">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-left transition-all">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-slate-700 border border-slate-100">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#eef6fb_0%,#e7f1f8_100%)] py-16 md:py-20">
        <div className="container-pro">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_8%_0%,rgba(226,232,240,0.28),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(203,213,225,0.24),transparent_24%),linear-gradient(130deg,#ffffff_0%,#f8fafc_42%,#f1f5f9_100%)] p-8 text-center shadow-[0_28px_55px_-35px_rgba(15,23,42,0.14)] md:p-14">
            <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-slate-100/60 blur-3xl" />
            <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-slate-200/40 blur-3xl" />

            <h2 className="relative z-10 font-display text-3xl md:text-5xl font-semibold text-slate-900 mb-6">
              Ready to Convert Smarter?
            </h2>

            <p className="relative z-10 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
              Join millions of users who rely on Convertaro for fast, accurate unit conversions every single day. Always free, forever.
            </p>

            <div className="relative z-10 mb-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link href={canonicalizeConverterHref("/length/cm-to-inches")} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-colors sm:w-auto">
                Start Converting
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/calculators" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white transition-colors sm:w-auto">
                Open Calculators
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-slate-600 text-sm relative z-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-slate-900" />
                No signup required
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-slate-900" />
                Verified formulas
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-slate-900" />
                Works offline
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white">
        <div className="container-pro">
          <CrawlableLinkHub title="Internal Links Hub" limitPerCategory={3} />
        </div>
      </section>
    </div>
  );
}
