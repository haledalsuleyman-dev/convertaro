import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { SearchTool } from "@/components/ui/SearchTool";
import { AdUnit } from "@/components/ui/AdUnit";
import { canonicalFromPath, INDEXABLE_ROBOTS } from "@/lib/seo";
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
  Lock,
  Globe,
  Star,
  TrendingUp,
  LayoutGrid,
  Search,
} from "lucide-react";

/* ── SEO ── */
export const metadata: Metadata = {
  title: "Free Online Unit Converter – 500+ Tools | Convertaro",
  description:
    "Convert any unit instantly with Convertaro. 500+ free converters for length (cm to inches), weight (kg to lbs), temperature (°C to °F), volume, speed, data & more. Fast, accurate, no signup.",
  robots: INDEXABLE_ROBOTS,
  keywords: [
    "free unit converter", "online unit converter", "cm to inches",
    "kg to lbs", "celsius to fahrenheit", "miles to km",
    "unit conversion", "measurement converter", "metric converter",
    "imperial converter",
  ],
  alternates: { canonical: canonicalFromPath("/") },
  openGraph: {
    title: "Free Online Unit Converter – 500+ Tools | Convertaro",
    description: "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed & more.",
    url: "https://convertaro.com",
    type: "website",
  },
};

/* ── Data ── */
const converters = convertersData as Converter[];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler, Weight, Thermometer, Droplets, Square, Gauge, Clock, Database, Zap, Wind,
};

// Per-category color theme — each category has its own visual identity
const CATEGORY_THEME: Record<string, { card: string; icon: string; text: string; glow: string }> = {
  length:      { card: "from-blue-50/80 to-white   border-blue-100   hover:border-blue-300   hover:shadow-blue-100/70",   icon: "bg-blue-100   text-blue-600",   text: "group-hover:text-blue-600",   glow: "shadow-blue-100/70"   },
  weight:      { card: "from-violet-50/80 to-white  border-violet-100 hover:border-violet-300 hover:shadow-violet-100/70", icon: "bg-violet-100 text-violet-600", text: "group-hover:text-violet-600", glow: "shadow-violet-100/70" },
  temperature: { card: "from-orange-50/80 to-white  border-orange-100 hover:border-orange-300 hover:shadow-orange-100/70", icon: "bg-orange-100 text-orange-500", text: "group-hover:text-orange-500", glow: "shadow-orange-100/70" },
  volume:      { card: "from-cyan-50/80 to-white    border-cyan-100   hover:border-cyan-300   hover:shadow-cyan-100/70",   icon: "bg-cyan-100   text-cyan-600",   text: "group-hover:text-cyan-600",   glow: "shadow-cyan-100/70"   },
  area:        { card: "from-emerald-50/80 to-white border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-100/70",icon: "bg-emerald-100 text-emerald-600", text: "group-hover:text-emerald-600", glow: "shadow-emerald-100/70" },
  speed:       { card: "from-amber-50/80 to-white   border-amber-100  hover:border-amber-300  hover:shadow-amber-100/70",  icon: "bg-amber-100  text-amber-600",  text: "group-hover:text-amber-600",  glow: "shadow-amber-100/70"  },
  time:        { card: "from-sky-50/80 to-white     border-sky-100    hover:border-sky-300    hover:shadow-sky-100/70",    icon: "bg-sky-100    text-sky-600",    text: "group-hover:text-sky-600",    glow: "shadow-sky-100/70"    },
  data:        { card: "from-indigo-50/80 to-white  border-indigo-100 hover:border-indigo-300 hover:shadow-indigo-100/70", icon: "bg-indigo-100 text-indigo-600", text: "group-hover:text-indigo-600", glow: "shadow-indigo-100/70" },
  energy:      { card: "from-rose-50/80 to-white    border-rose-100   hover:border-rose-300   hover:shadow-rose-100/70",   icon: "bg-rose-100   text-rose-500",   text: "group-hover:text-rose-500",   glow: "shadow-rose-100/70"   },
  pressure:    { card: "from-teal-50/80 to-white    border-teal-100   hover:border-teal-300   hover:shadow-teal-100/70",   icon: "bg-teal-100   text-teal-600",   text: "group-hover:text-teal-600",   glow: "shadow-teal-100/70"   },
};

const STATS = [
  { value: "500+", label: "Free Tools",    icon: LayoutGrid },
  { value: "10",   label: "Categories",   icon: Globe       },
  { value: "<1ms", label: "Response",     icon: Zap         },
  { value: "100%", label: "Free Forever", icon: Star        },
];

const QUICK_LINKS = [
  { href: "/length/cm-to-inches",               label: "cm → inches"  },
  { href: "/weight/kg-to-lbs",                  label: "kg → lbs"     },
  { href: "/speed/mph-to-kmh",                  label: "mph → km/h"   },
  { href: "/temperature/celsius-to-fahrenheit", label: "°C → °F"      },
  { href: "/length/km-to-miles",                label: "km → miles"   },
  { href: "/data/mb-to-gb",                     label: "MB → GB"      },
  { href: "/volume/liters-to-gallons",          label: "L → gallons"  },
  { href: "/weight/lbs-to-kg",                  label: "lbs → kg"     },
];

const FEATURES = [
  { icon: Zap,          color: "bg-primary/10   text-primary",   title: "Sub-millisecond Speed",  desc: "Every result is computed instantly on your device — no server round-trips, no waiting."  },
  { icon: CheckCircle2, color: "bg-emerald-100  text-emerald-600", title: "Verified Accuracy",    desc: "All formulas are verified against SI, NIST, and ISO international measurement standards." },
  { icon: Lock,         color: "bg-amber-100    text-amber-600", title: "100% Private",           desc: "Your values never leave your browser. No account required, no data stored, ever."        },
  { icon: Smartphone,   color: "bg-sky-100      text-sky-600",   title: "Works Everywhere",       desc: "Fully responsive — desktop, tablet, mobile. Works offline. No app install needed."        },
  { icon: Globe,        color: "bg-violet-100   text-violet-600", title: "Used Worldwide",        desc: "Engineers, students, and professionals in 150+ countries rely on Convertaro daily."       },
  { icon: TrendingUp,   color: "bg-rose-100     text-rose-500",  title: "Always Growing",         desc: "New converters and categories added continuously. Suggest a tool via our contact page."   },
];

const FEATURED_CALCULATORS = calculators;

/* ── Component ── */
export default function Home() {
  const popularConverters = ["cm-to-inches", "kg-to-lbs", "m-to-feet", "km-to-miles"]
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean) as Converter[];

  const latestConverters = converters.slice(10, 16);

  return (
    <div className="min-h-screen">

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Dot grid texture */}
        <div className="pointer-events-none absolute inset-0 dot-grid" />
        {/* Gradient fade to white at bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/30 to-background" />

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute -top-48 -left-48 h-[700px] w-[700px] rounded-full bg-primary/10 blur-[120px] animate-blob" />
        <div className="pointer-events-none absolute -top-24 right-0 h-[550px] w-[550px] rounded-full bg-secondary/10 blur-[100px] animate-blob" style={{ animationDelay: "3s" }} />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-accent/6 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">

          {/* Live badge */}
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full bg-white border border-border shadow-sm text-xs font-semibold text-text-secondary">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            500+ Converters &nbsp;·&nbsp; Always Free &nbsp;·&nbsp; No Signup Required
          </div>

          {/* Headline */}
          <h1 className="text-[3.25rem] sm:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.0] mb-6">
            <span className="text-text-primary">Convert Any Unit.</span>
            <br />
            <span className="text-shimmer">Instantly.</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
            The world&apos;s fastest free unit converter.{" "}
            <strong className="text-text-primary font-semibold">Length, weight, temperature, speed</strong>{" "}
            and 7 more categories — all in one place.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-6 relative z-10">
            <SearchTool variant="hero" placeholder="Search any conversion… (e.g. kg to lbs)" />
          </div>

          {/* Quick chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {QUICK_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3.5 py-1.5 rounded-full bg-white border border-border/80 text-xs font-medium text-text-secondary shadow-sm hover:border-primary/40 hover:text-primary hover:shadow transition-all duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Stats row */}
          <div className="inline-flex flex-wrap justify-center divide-x divide-border rounded-2xl border border-border bg-white/85 backdrop-blur shadow-sm overflow-hidden mx-auto">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 px-5 sm:px-7 py-4">
                <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-[15px] font-black text-text-primary leading-none stat-number">{value}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5 font-medium">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white border-y border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Browse</p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-text-primary">
                10 Categories, 500+ Converters
              </h2>
              <p className="mt-1.5 text-sm text-text-secondary">Every unit conversion you&apos;ll ever need — for free.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] ?? Ruler;
              const theme = CATEGORY_THEME[category.slug] ?? CATEGORY_THEME.length;
              const count = converters.filter((c) => c.category === category.slug).length;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className={`group rounded-2xl bg-gradient-to-b ${theme.card} border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-250 p-5`}
                >
                  <div className={`h-11 w-11 rounded-xl ${theme.icon} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className={`mt-4 text-sm font-bold text-text-primary transition-colors duration-200 ${theme.text}`}>
                    {category.name}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">{count} tools</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-background border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5">New</p>
              <h2 className="text-2xl font-black text-text-primary">High-demand Calculators</h2>
            </div>
            <div className="text-right">
              <p className="hidden sm:block text-sm text-text-secondary">Beyond unit conversion: finance, health, and everyday math.</p>
              <Link href="/calculators" className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                Explore calculators hub <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {FEATURED_CALCULATORS.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/${calculator.slug}`}
                className="rounded-2xl border border-border bg-white px-4 py-4 shadow-sm hover:shadow-card hover:-translate-y-0.5 hover:border-primary/30 transition-all"
              >
                <p className="text-sm font-bold text-text-primary">{calculator.title}</p>
                <p className="mt-1.5 text-xs text-text-secondary line-clamp-2">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ═══════════════════════════════════
            POPULAR TOOLS
        ═══════════════════════════════════ */}
        <section className="py-14 sm:py-18">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1.5">Trending</p>
              <h2 className="text-2xl font-black text-text-primary">Most Used Converters</h2>
            </div>
            <Link href="/length" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              All converters <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularConverters.map((converter, i) => (
              <Link
                key={converter.id}
                href={`/${converter.category}/${converter.metadata.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 p-6"
              >
                {/* Subtle number watermark */}
                <span className="absolute top-3 right-4 text-6xl font-black text-border/50 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3 capitalize">{converter.category}</p>
                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                    {converter.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open tool <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            RECENTLY ADDED + QUICK JUMP
        ═══════════════════════════════════ */}
        <section className="py-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recently Added */}
            <div className="lg:col-span-2 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">New</p>
              <h2 className="text-xl font-black text-text-primary mb-6">Recently Added</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {latestConverters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${converter.category}/${converter.metadata.slug}`}
                    className="group rounded-xl border border-border bg-background/50 hover:bg-white hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 px-4 py-3.5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{converter.title}</p>
                      <p className="text-xs text-text-secondary capitalize mt-0.5">{converter.category}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-border group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Jump */}
            <div className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Navigate</p>
              <h3 className="text-lg font-black text-text-primary mb-5">Quick Jump</h3>
              <div className="overflow-hidden rounded-xl border border-border">
                {categories.map((cat, i) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/4 transition-colors ${i !== categories.length - 1 ? "border-b border-border/60" : ""}`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════
          FEATURES — Full width section
      ═══════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-y border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why Convertaro</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary leading-tight">
                Built to Be the Best<br />
                <span className="text-gradient">Unit Converter Online</span>
              </h2>
            </div>
            <p className="text-text-secondary text-base leading-relaxed max-w-md">
              We obsess over accuracy, speed, and design so you can focus on what matters. Trusted by engineers, students, and professionals in 150+ countries.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl bg-background border border-border hover:bg-white hover:border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 p-6"
              >
                <div className={`h-11 w-11 rounded-xl ${color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Simple Process</p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-text-primary mb-2">
              Convert in 3 Steps
            </h2>
            <p className="text-text-secondary text-sm">No learning curve. No account. Just results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-[2.25rem] left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px">
              <div className="h-full bg-gradient-to-r from-border via-primary/30 to-border" />
            </div>

            {[
              { n: "01", icon: Search,       title: "Search or Browse",   desc: "Find any converter instantly by searching or browsing our 10 categories of 500+ tools." },
              { n: "02", icon: LayoutGrid,   title: "Enter Your Value",   desc: "Type any number into the input field. Results update in real-time as you type." },
              { n: "03", icon: CheckCircle2, title: "Get Your Result",    desc: "Copy the accurate result or swap units to reverse. Use the reference table below." },
            ].map(({ n, icon: Icon, title, desc }) => (
              <div key={n} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="relative h-16 w-16 rounded-2xl bg-white border-2 border-border group-hover:border-primary/40 flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-all duration-200">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shadow-sm">
                      {Number(n)}
                    </span>
                  </div>
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CTA — Dark / Premium
      ═══════════════════════════════════ */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-14 sm:px-16 sm:py-20 text-center">
            {/* Subtle radial glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-primary/20 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[200px] w-[400px] rounded-full bg-secondary/15 blur-[60px]" />

            {/* Dot grid on dark */}
            <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.08]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/60 tracking-wide">
                Free · No Account · Instant
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
                Start Converting Now
              </h2>
              <p className="text-white/60 text-base max-w-md mx-auto mb-10 leading-relaxed">
                Join millions of users who rely on Convertaro for fast, accurate unit conversions every single day.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/length/cm-to-inches"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 font-bold text-sm px-7 py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Try cm to inches <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/weight/kg-to-lbs"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 text-white font-semibold text-sm px-7 py-3.5 hover:bg-white/15 transition-all duration-200"
                >
                  Try kg to lbs
                </Link>
              </div>

              {/* Mini trust row */}
              <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-white/35 font-medium">
                <span>✓ No signup</span>
                <span>✓ No ads on tool pages</span>
                <span>✓ Works offline</span>
                <span>✓ Open in any browser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdUnit variant="banner" className="mb-16" />
      </div>
    </div>
  );
}
