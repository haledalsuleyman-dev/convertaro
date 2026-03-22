import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Home, SearchX } from "lucide-react";
import { SearchTool } from "@/components/ui/SearchTool";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page does not exist on Convertaro. Use search or jump to a popular converter.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

const POPULAR_CONVERTERS = [
  { href: "/length/cm-to-inches", label: "cm to inches" },
  { href: "/weight/kg-to-lbs", label: "kg to lbs" },
  { href: "/temperature/celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
  { href: "/speed/mph-to-kmh", label: "mph to km/h" },
  { href: "/data/mb-to-gb", label: "MB to GB" },
  { href: "/length/km-to-miles", label: "km to miles" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-160px)] overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 dot-grid" />
      <div className="pointer-events-none absolute -top-36 -left-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-8 right-0 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[95px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[80px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-white/85 p-6 shadow-card backdrop-blur sm:p-10 lg:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/6 px-3 py-1 text-xs font-semibold text-primary">
              <SearchX className="h-3.5 w-3.5" />
              Error 404
            </div>

            <h1 className="text-3xl font-black tracking-tight text-text-primary sm:text-5xl">
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
              The page you requested is missing or may have been moved. Search for a converter below or jump to one of our most used tools.
            </p>

            <div className="mt-8 sm:mt-10">
              <SearchTool variant="hero" placeholder="Search converters (e.g. kg to lbs)" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
              >
                <Home className="h-4 w-4" />
                Back to home
              </Link>
              <Link
                href="/length"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-primary/35 hover:text-primary"
              >
                <Compass className="h-4 w-4" />
                Browse categories
              </Link>
            </div>
          </div>

          <div className="mt-10 border-t border-border/70 pt-8 sm:mt-12">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <ArrowLeft className="h-3.5 w-3.5" />
              Popular converters
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {POPULAR_CONVERTERS.map((converter) => (
                <Link
                  key={converter.href}
                  href={converter.href}
                  className="group rounded-xl border border-border bg-background/70 px-4 py-3 text-sm font-semibold text-text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white hover:text-primary hover:shadow-sm"
                >
                  {converter.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
