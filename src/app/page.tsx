import type { Metadata } from "next";
import { categories } from "@/data/categories";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { SearchTool } from "@/components/ui/SearchTool";
import { AdUnit } from "@/components/ui/AdUnit";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
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
  Sparkles,
  Search,
  BarChart3,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Unit Converter – 500+ Tools | Convertaro",
  description:
    "Convert any unit instantly with Convertaro. 500+ free converters for length (cm to inches), weight (kg to lbs), temperature (°C to °F), volume, speed, data & more. Fast, accurate, no signup.",
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
  ],
  alternates: {
    canonical: "https://convertaro.com",
  },
  openGraph: {
    title: "Free Online Unit Converter – 500+ Tools | Convertaro",
    description:
      "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed & more.",
    url: "https://convertaro.com",
    type: "website",
  },
};

const converters = convertersData as Converter[];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler, Weight, Thermometer, Droplets, Square, Gauge, Clock, Database, Zap, Wind,
};

const STATS = [
  { value: "500+", label: "Free Converters" },
  { value: "10", label: "Categories" },
  { value: "100%", label: "Free Forever" },
  { value: "<1ms", label: "Instant Results" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Search,
    title: "Search or Browse",
    desc: "Find the converter you need by searching or browsing 10 categories.",
  },
  {
    step: "02",
    icon: BarChart3,
    title: "Enter Your Value",
    desc: "Type in any number and get an instant, accurate result.",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Use the Result",
    desc: "Copy the result or swap units for reverse conversion. No ads, no delays.",
  },
];

export default function Home() {
  const popularConverters = ["cm-to-inches", "kg-to-lbs", "m-to-feet", "km-to-miles"]
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean) as Converter[];
  const latestConverters = converters.slice(10, 16);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[700px] w-[700px] rounded-full bg-primary/7 blur-3xl" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-secondary/7 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-20 sm:pt-28 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            500+ Unit Converters — Always Free
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-text-primary">The World&apos;s </span>
            <span className="text-gradient">Fastest</span>
            <br />
            <span className="text-text-primary">Unit Converter</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Instantly convert <strong className="text-text-primary font-semibold">length, weight, temperature, volume, speed</strong> and more.
            Free, accurate, and built for professionals worldwide.
          </p>

          {/* Search */}
          <div className="mt-9 sm:mt-10 mx-auto max-w-2xl">
            <SearchTool variant="hero" placeholder="Search any conversion… (e.g. kg to lbs)" />
          </div>

          {/* Quick chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              { href: "/length/cm-to-inches", label: "cm → inches" },
              { href: "/weight/kg-to-lbs", label: "kg → lbs" },
              { href: "/speed/mph-to-kmh", label: "mph → km/h" },
              { href: "/temperature/celsius-to-fahrenheit", label: "°C → °F" },
              { href: "/length/km-to-miles", label: "km → miles" },
              { href: "/data/mb-to-gb", label: "MB → GB" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:text-primary hover:border-primary/30 hover:shadow-md transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-12 inline-flex flex-wrap justify-center gap-x-10 gap-y-4 rounded-2xl border border-border/60 bg-white/70 backdrop-blur px-8 py-4 shadow-sm">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-text-primary">{value}</div>
                <div className="text-xs text-text-secondary font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Categories ── */}
        <section className="py-10 sm:py-14">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Browse</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                Explore All Categories
              </h2>
            </div>
            <Link href="/length" className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] ?? Ruler;
              const count = converters.filter((c) => c.category === category.slug).length;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="group rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 p-5"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary flex items-center justify-center border border-primary/15 group-hover:from-primary/25 group-hover:to-secondary/20 group-hover:scale-110 transition-all duration-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{category.name}</div>
                  <div className="mt-0.5 text-xs text-text-secondary">{count} Tools</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-10 sm:py-14">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Simple</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              How It Works
            </h2>
            <p className="mt-2 text-text-secondary text-sm">Convert any unit in 3 easy steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector lines on desktop */}
            <div className="hidden md:block absolute top-[2.75rem] left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30" />
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative text-center group">
                <div className="flex justify-center mb-5">
                  <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                      {step.replace("0", "")}
                    </span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Popular Tools ── */}
        <section className="py-10 sm:py-14">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-white/70 to-secondary/6 p-6 sm:p-8 shadow-sm">
            <div className="pointer-events-none absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-3xl" />
            <div className="relative flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Trending</p>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Most Popular Converters</h2>
              </div>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {popularConverters.map((converter) => (
                <Link
                  key={converter.id}
                  href={`/${converter.category}/${converter.metadata.slug}`}
                  className="flex items-center justify-between rounded-xl bg-white border border-border/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-200 px-5 py-4 group"
                >
                  <div className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {converter.title}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-text-secondary group-hover:text-primary transition-colors shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Recently Added + Quick Jump ── */}
        <section className="py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 rounded-2xl bg-white border border-border/60 shadow-sm p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">New</p>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-6">Recently Added</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {latestConverters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${converter.category}/${converter.metadata.slug}`}
                    className="group rounded-xl border border-border/70 bg-background/60 hover:bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 px-5 py-4"
                  >
                    <div className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{converter.title}</div>
                    <div className="mt-0.5 text-xs text-text-secondary capitalize">{converter.category}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-border/60 shadow-sm p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Navigate</p>
              <h3 className="text-lg font-bold text-text-primary mb-5">Quick Jump</h3>
              <div className="divide-y divide-border/60 rounded-xl border border-border/60 overflow-hidden">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/4 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose ── */}
        <section className="py-10 sm:py-14">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Why Convertaro</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Built for Accuracy & Speed
            </h2>
            <p className="mt-2 text-text-secondary text-sm max-w-lg mx-auto">
              Trusted by engineers, students, and professionals in 150+ countries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                color: "from-primary/15 to-primary/5",
                iconColor: "text-primary",
                title: "Instant Processing",
                desc: "Real-time conversions with sub-millisecond response time — no waiting, no loading.",
              },
              {
                icon: CheckCircle2,
                color: "from-accent/15 to-accent/5",
                iconColor: "text-accent",
                title: "Verified Accuracy",
                desc: "Every formula is cross-verified against international standards (SI, NIST, ISO).",
              },
              {
                icon: Smartphone,
                color: "from-secondary/15 to-secondary/5",
                iconColor: "text-secondary",
                title: "Works Everywhere",
                desc: "Fully responsive on desktop, tablet, and mobile. No app download needed.",
              },
              {
                icon: Lock,
                color: "from-yellow-500/15 to-yellow-500/5",
                iconColor: "text-yellow-600",
                title: "100% Private",
                desc: "Your data never leaves your browser. No account, no tracking, no ads.",
              },
              {
                icon: Database,
                color: "from-purple-500/15 to-purple-500/5",
                iconColor: "text-purple-600",
                title: "500+ Converters",
                desc: "The most comprehensive unit conversion library available for free online.",
              },
              {
                icon: Zap,
                color: "from-rose-500/15 to-rose-500/5",
                iconColor: "text-rose-600",
                title: "Always Free",
                desc: "No subscriptions, no hidden fees. Convertaro is and will always be 100% free.",
              },
            ].map(({ icon: Icon, color, iconColor, title, desc }) => (
              <div key={title} className="group rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-6">
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center border border-border/60 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div className="mt-5 text-base font-bold text-text-primary">{title}</div>
                <div className="mt-1.5 text-sm text-text-secondary leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-10 sm:py-14">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#7C3AED] to-secondary p-10 sm:p-14 text-center shadow-2xl shadow-primary/20">
            <div className="pointer-events-none absolute inset-0 bg-[url('/noise.svg')] opacity-[0.06]" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">Get Started</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Start Converting Now
              </h2>
              <p className="text-white/75 text-base max-w-md mx-auto mb-8">
                Join millions of users who trust Convertaro for fast, accurate unit conversions every day.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/length/cm-to-inches"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold text-sm px-6 py-3 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  Try cm to inches <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/weight/kg-to-lbs"
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 text-white font-semibold text-sm px-6 py-3 border border-white/25 hover:bg-white/25 transition-all"
                >
                  Try kg to lbs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <AdUnit variant="banner" className="my-12" />
      </div>
    </div>
  );
}
