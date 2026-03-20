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
} from "lucide-react";

const converters = convertersData as Converter[];

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

const STATS = [
  { value: "500+", label: "Converters" },
  { value: "10", label: "Categories" },
  { value: "100%", label: "Free" },
  { value: "< 1ms", label: "Response" },
];

export default function Home() {
  const popularConverters = ["cm-to-inches", "kg-to-lbs", "m-to-feet", "km-to-miles"]
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean) as Converter[];
  const latestConverters = converters.slice(10, 16);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-secondary/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-accent/6 blur-3xl" />
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
            <span className="text-text-primary">Convert </span>
            <span className="text-gradient">Anything</span>
            <span className="text-text-primary"> Instantly</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Fast, accurate unit converters for engineers, students, and professionals worldwide.
          </p>

          <div className="mt-9 sm:mt-10 mx-auto max-w-2xl">
            <SearchTool variant="hero" placeholder="Search conversions..." />
          </div>

          {/* Quick chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              { href: "/length/cm-to-inches", label: "cm → inches" },
              { href: "/weight/kg-to-lbs", label: "kg → lbs" },
              { href: "/speed/mph-to-kmh", label: "mph → km/h" },
              { href: "/temperature/celsius-to-fahrenheit", label: "°C → °F" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:text-text-primary hover:shadow-md transition-all"
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
                Explore Categories
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] ?? Ruler;
              const count = converters.filter((c) => c.category === category.slug).length;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="group rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-200 p-5"
                >
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary flex items-center justify-center border border-primary/15 group-hover:from-primary/25 group-hover:to-secondary/20 transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{category.name}</div>
                  <div className="mt-0.5 text-xs text-text-secondary">{count} Tools</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Popular Tools ── */}
        <section className="py-10 sm:py-14">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white/80 to-secondary/8 p-6 sm:p-8 shadow-sm">
            <div className="pointer-events-none absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-primary/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-secondary/12 blur-3xl" />
            <div className="relative flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Trending</p>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Most Popular Tools</h2>
              </div>
              <ArrowRight className="h-5 w-5 text-text-secondary" />
            </div>
            <div className="relative flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
              {popularConverters.map((converter) => (
                <Link
                  key={converter.id}
                  href={`/${converter.category}/${converter.metadata.slug}`}
                  className="min-w-[240px] flex items-center justify-between rounded-xl bg-white border border-border/70 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-200 px-5 py-4 group"
                >
                  <div className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {converter.title.replace("Converter", "").trim()} Converter
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-text-secondary group-hover:text-primary transition-colors" />
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Why Us</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Why Choose Convertaro
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                color: "from-primary/15 to-primary/5",
                iconColor: "text-primary",
                title: "Instant Processing",
                desc: "Real-time conversions with sub-millisecond response time.",
              },
              {
                icon: CheckCircle2,
                color: "from-accent/15 to-accent/5",
                iconColor: "text-accent",
                title: "Verified Accuracy",
                desc: "Formulas cross-verified against international standard units.",
              },
              {
                icon: Smartphone,
                color: "from-secondary/15 to-secondary/5",
                iconColor: "text-secondary",
                title: "Works Everywhere",
                desc: "Optimized for all devices — desktop, tablet, and mobile.",
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

        <AdUnit variant="banner" className="my-12" />
      </div>
    </div>
  );
}
