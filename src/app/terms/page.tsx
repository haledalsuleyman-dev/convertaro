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
  title: "Terms of Use | Convertaro",
  description: "Read the Convertaro terms of use and disclaimer.",
  robots: INDEXABLE_ROBOTS,
  alternates: buildAlternates("/terms"),
  openGraph: buildOpenGraph({
    title: "Terms of Use | Convertaro",
    description: "Read the Convertaro terms of use and disclaimer.",
    path: "/terms",
  }),
  twitter: buildTwitter("Terms of Use | Convertaro", "Read the Convertaro terms of use and disclaimer."),
};

export default function TermsPage() {
  const webPageSchema = buildWebPageSchema({
    name: "Terms of Use | Convertaro",
    description: "Read the Convertaro terms of use and disclaimer.",
    path: "/terms",
  });

  return (
    <PageShell
      title="Terms of Use"
      subtitle="By using Convertaro, you agree to these terms. Please read them carefully."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <div className="space-y-10 text-text-secondary">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Acceptance of terms</h2>
          <p className="leading-relaxed">
            By accessing or using Convertaro, you agree to be bound by these Terms of Use and our{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Use of the service</h2>
          <p className="leading-relaxed">
            Convertaro provides unit conversion tools for informational purposes. You may use the service for personal or
            commercial use, provided you do not abuse, disrupt, or attempt to reverse engineer the site.
          </p>
          <ul className="space-y-2">
            <li className="leading-relaxed">Do not attempt to break security, scrape excessively, or interfere with normal operation.</li>
            <li className="leading-relaxed">Do not use the service for unlawful purposes.</li>
            <li className="leading-relaxed">Do not misrepresent Convertaro content as your own.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Accuracy and disclaimer</h2>
          <p className="leading-relaxed">
            We strive to provide accurate conversions and clear formulas. However, the service is provided “as is” and
            without warranties of any kind. You are responsible for verifying results before relying on them for critical
            applications.
          </p>
          <div className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
            <div className="text-sm font-semibold text-text-primary">Not professional advice</div>
            <div className="mt-1 text-sm leading-relaxed">
              Convertaro does not provide engineering, medical, legal, or financial advice. Use at your own discretion.
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Limitation of liability</h2>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, Convertaro and its operators will not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your
            use of the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Changes to the service</h2>
          <p className="leading-relaxed">
            We may update, modify, or discontinue parts of the service at any time. We may also update these terms.
            Continued use after changes become effective constitutes acceptance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Contact</h2>
          <p className="leading-relaxed">
            Questions about these terms can be sent via the <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>
        </section>

        <div className="pt-6 border-t border-border/60 text-xs text-text-secondary">
          Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>
    </PageShell>
  );
}

