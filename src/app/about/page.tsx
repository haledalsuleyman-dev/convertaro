import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import {
  INDEXABLE_ROBOTS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Convertaro",
  description: "Learn what Convertaro is, what it does, and who it is for.",
  robots: INDEXABLE_ROBOTS,
  alternates: buildAlternates("/about"),
  openGraph: buildOpenGraph({
    title: "About Convertaro",
    description: "Learn what Convertaro is, what it does, and who it is for.",
    path: "/about",
  }),
  twitter: buildTwitter("About Convertaro", "Learn what Convertaro is, what it does, and who it is for."),
};

export default function AboutPage() {
  const webPageSchema = buildWebPageSchema({
    name: "About Convertaro",
    description: "Learn what Convertaro is, what it does, and who it is for.",
    path: "/about",
  });

  return (
    <PageShell
      title="About Convertaro"
      subtitle="Convertaro is a fast, accurate unit conversion platform built for everyday use and professional workflows."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <div className="space-y-8 text-text-secondary">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">What Convertaro does</h2>
          <p className="leading-relaxed">
            Convertaro helps you convert values between common units instantly. Each converter page includes the conversion
            tool, the formula used, a reference table, FAQs, and related converters for quick navigation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Who it’s for</h2>
          <p className="leading-relaxed">
            Convertaro is designed for students, engineers, researchers, professionals, and anyone who needs reliable
            conversions without friction.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Students</span> — homework, labs, and exam prep
            </li>
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Engineers</span> — specs, drawings, and calculations
            </li>
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Professionals</span> — reporting, logistics, and ops
            </li>
            <li className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <span className="font-semibold text-text-primary">Everyone</span> — everyday conversions in seconds
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Accuracy and performance</h2>
          <p className="leading-relaxed">
            The platform is optimized for speed and clean reading experience. Pages are generated from structured data and
            served efficiently, while the conversion UI updates instantly as you type.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Explore the tools</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/length"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Length
            </Link>
            <Link
              href="/weight"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Weight
            </Link>
            <Link
              href="/temperature"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Temperature
            </Link>
            <Link
              href="/data"
              className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border border-border/70 text-sm font-medium text-text-secondary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Data
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

