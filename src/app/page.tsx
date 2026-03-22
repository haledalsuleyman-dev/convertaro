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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Unit Converter - 500+ Accurate Tools",
  description:
    "Convert any unit instantly with Convertaro. 500+ free converters for length, weight, temperature, volume, speed, data & more. Fast, accurate, no signup.",
  robots: INDEXABLE_ROBOTS,
  keywords: [
    "free unit converter",
    "online unit converter",
    "cm to inches",
    "kg to lbs",
    "celsius to fahrenheit",
    "miles to km",
    "unit conversion",
    "measurement converter",
    "metric converter",
    "imperial converter",
    ...HOMEPAGE_LONGTAIL_KEYWORDS.slice(0, 20),
  ],
  alternates: buildAlternates("/"),
  openGraph: buildOpenGraph({
    title: "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
    description: "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed & more.",
    path: "/",
  }),
  twitter: buildTwitter(
    "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
    "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed, data and more."
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

export default function Home() {
  const popularConverters = ["cm-to-inches", "kg-to-lbs", "m-to-feet", "km-to-miles"]
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
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(125,211,252,0.28),transparent_34%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,0.24),transparent_30%),linear-gradient(180deg,#f8fcff_0%,#eef7fb_46%,#f7fbfd_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.35] bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
        <div className="absolute -right-20 top-12 -z-10 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-violet-200/20 blur-3xl" />

        <div className="container-pro relative z-10 text-center text-slate-900">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/80 px-4 py-1.5 text-sm font-semibold text-sky-800 backdrop-blur">
            <Star className="h-4 w-4 text-sky-600" />
            Enterprise-grade converter experience
          </div>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-[1.1]">
            Convert with confidence.
            <span className="block bg-gradient-to-r from-sky-700 via-cyan-600 to-violet-600 bg-clip-text text-transparent">
              Fast, precise, and effortless.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-600 md:text-lg leading-relaxed">
            A premium conversion platform trusted by students, engineers, and teams. Use 500+ tools for length, weight, temperature, speed, data, and more in one unified workspace.
          </p>

          <div className="mx-auto mt-10 max-w-2xl animate-fade-in">
            <SearchTool />
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-600">
              <span className="text-slate-500">Popular searches:</span>
              {CANONICAL_QUICK_LINKS.slice(0, 4).map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-sky-700 hover:border-sky-200 hover:bg-sky-50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.18)] backdrop-blur md:grid-cols-4 md:gap-4 md:p-5">
            {TRUST_METRICS.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-slate-200/80 bg-white/80 p-3 text-left md:text-center">
                <p className="text-xl font-display font-semibold text-slate-900 md:text-2xl tabular-nums">{metric.value}</p>
                <p className="mt-0.5 text-xs text-slate-500 md:text-sm">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] py-16 md:py-20">
        <div className="container-pro">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold text-slate-900 mb-2">Browse by Category</h2>
              <p className="text-slate-500">10 curated categories with 500+ precision tools.</p>
            </div>
            <Link href="/search" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900">
              Explore all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.name] || LayoutGrid;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="card-pro p-6 group flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-700 transition-all duration-300 group-hover:from-slate-900 group-hover:to-slate-700 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-display font-semibold text-slate-900">{category.name}</h3>
                  <p className="text-xs text-slate-500">
                    {canonicalConverterCountByCategory.get(category.id) ?? 0} Tools
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_96%_0%,rgba(125,211,252,0.14),transparent_25%),linear-gradient(180deg,#f7fbfd_0%,#edf6fa_100%)] py-16 md:py-20">
        <div className="container-pro">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-2xl font-semibold text-slate-900">Most Used Tools</h2>
            <div className="flex items-center gap-4">
              <Link href="/popular-conversion-tools" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1">
                Popular conversions <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/calculators" className="text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
                Calculators <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularConverters.map((converter) => (
              converter && (
                <Link
                  key={converter.id}
                  href={`/${converter.category}/${converter.metadata.slug}`}
                  className="surface-glass rounded-2xl p-5 transition-all group hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                      <Calculator className="h-4 w-4" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-900 text-sm mb-1">{converter.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{converter.description}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-20">
        <div className="container-pro text-center mb-14">
          <h2 className="font-display text-3xl font-semibold text-slate-900 mb-4">Built for Modern Workflows</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We obsess over accuracy, speed, and design so you can focus on what matters. Trusted by engineers, students, and professionals in 150+ countries.
          </p>
        </div>

        <div className="container-pro">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/70 p-6 text-left hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-lg transition-all">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#eef6fb_0%,#e7f1f8_100%)] py-16 md:py-20">
        <div className="container-pro">
          <div className="relative overflow-hidden rounded-[32px] border border-sky-100 bg-[radial-gradient(circle_at_8%_0%,rgba(125,211,252,0.22),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(196,181,253,0.18),transparent_24%),linear-gradient(130deg,#ffffff_0%,#f4f9fc_42%,#eef6fb_100%)] p-8 text-center shadow-[0_28px_55px_-35px_rgba(15,23,42,0.18)] md:p-14">
            <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-sky-200/25 blur-3xl" />
            <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-violet-200/20 blur-3xl" />

            <h2 className="relative z-10 font-display text-3xl md:text-5xl font-semibold text-slate-900 mb-6">
              Ready to Convert Smarter?
            </h2>

            <p className="relative z-10 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600">
              Join millions of users who rely on Convertaro for fast, accurate unit conversions every single day. Always free, forever.
            </p>

            <div className="relative z-10 mb-9 flex flex-wrap justify-center gap-3">
              <Link href={canonicalizeConverterHref("/length/cm-to-inches")} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/20 hover:bg-sky-800 transition-colors">
                Start Converting
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/calculators" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white transition-colors">
                Open Calculators
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-slate-600 text-sm relative z-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-sky-600" />
                No signup required
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-sky-600" />
                Verified formulas
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-sky-600" />
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
