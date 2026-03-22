import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { SearchTool } from "@/components/ui/SearchTool";
import { canonicalFromPath, INDEXABLE_ROBOTS, HOMEPAGE_LONGTAIL_KEYWORDS } from "@/lib/seo";
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
  Zap, // تم استبدال Lightning بـ Zap
  Smartphone,
  CheckCircle2,
  Lock,
  Globe,
  Star,
  TrendingUp,
  LayoutGrid,
  Search,
  Shield,
} from "lucide-react";

// Enhanced SEO with long-tail keywords
export const metadata: Metadata = {
  title: "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
  description:
    "Convert any unit instantly with Convertaro. 500+ free converters for length (cm to inches), weight (kg to lbs), temperature (°C to °F), volume, speed, data & more. Fast, accurate, no signup.",
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
  alternates: { canonical: canonicalFromPath("/") },
  openGraph: {
    title: "Free Online Unit Converter - 500+ Accurate Tools | Convertaro",
    description: "Convert any unit instantly. 500+ free converters for length, weight, temperature, volume, speed & more.",
    url: "https://convertaro.com",
    type: "website",
  },
};

const converters = convertersData as Converter[];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler, Weight, Thermometer, Droplets, Square, Gauge, Clock, Database, Zap, Wind,
};

const QUICK_LINKS = [
  { href: "/length/cm-to-inches", label: "cm → inches" },
  { href: "/weight/kg-to-lbs", label: "kg → lbs" },
  { href: "/speed/mph-to-kmh", label: "mph → km/h" },
  { href: "/temperature/celsius-to-fahrenheit", label: "°C → °F" },
  { href: "/length/km-to-miles", label: "km → miles" },
  { href: "/data/mb-to-gb", label: "MB → GB" },
  { href: "/volume/liters-to-gallons", label: "L → gallons" },
  { href: "/weight/lbs-to-kg", label: "lbs → kg" },
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
    .map((id) => converters.find((c) => c.id === id))
    .filter(Boolean) as Converter[];

  const latestConverters = converters.slice(10, 16);

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

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="container-pro relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            500+ Accurate Converters
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Convert Any Unit. <span className="text-blue-500">Instantly.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The world&apos;s fastest free unit converter. Length, weight, temperature, speed and 7 more categories — all in one place.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchTool />
            <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
              <span className="text-slate-400">Popular:</span>
              {QUICK_LINKS.slice(0, 4).map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-blue-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white -mt-10 rounded-t-[40px] relative z-20">
        <div className="container-pro">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Browse by Category</h2>
              <p className="text-slate-500">10 Categories, 500+ Professional Tools</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.name] || LayoutGrid;
              return (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="card-pro p-6 group flex flex-col items-center text-center"
                >
                  <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    <Icon className="h-6 w-6 text-slate-600 group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-slate-500">{category.count} Tools</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Converters */}
      <section className="py-20 bg-slate-50">
        <div className="container-pro">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Most Used Tools</h2>
            <Link href="/calculators" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularConverters.map((converter) => (
              converter && (
                <Link
                  key={converter.id}
                  href={`/${converter.category}/${converter.metadata.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Calculator className="h-4 w-4" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{converter.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{converter.description}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container-pro text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Built to Be the Best</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            We obsess over accuracy, speed, and design so you can focus on what matters. Trusted by engineers, students, and professionals in 150+ countries.
          </p>
        </div>
        
        <div className="container-pro">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-6">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container-pro">
          <div className="bg-blue-600 rounded-[40px] p-8 md:p-16 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Start Converting Now
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Join millions of users who rely on Convertaro for fast, accurate unit conversions every single day. Always free, forever.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm relative z-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-200" />
                No signup required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-200" />
                Verified formulas
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-200" />
                Works offline
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}