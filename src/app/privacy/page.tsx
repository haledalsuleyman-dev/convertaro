import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/ui/PageShell";
import { canonicalFromPath, INDEXABLE_ROBOTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Convertaro",
  description: "Read Convertaro’s privacy policy covering analytics, cookies, ads, and user data.",
  robots: INDEXABLE_ROBOTS,
  alternates: {
    canonical: canonicalFromPath("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      subtitle="This policy explains what we collect, how we use it, and the choices you have."
    >
      <div className="space-y-10 text-text-secondary">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Overview</h2>
          <p className="leading-relaxed">
            Convertaro provides unit conversion tools. We aim to collect the minimum data necessary to operate, maintain,
            and improve the service.
          </p>
          <p className="leading-relaxed">
            By using the site, you agree to this policy. If you do not agree, please discontinue use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Analytics</h2>
          <p className="leading-relaxed">
            We may use privacy-respecting analytics to understand traffic patterns (for example, page views, device type,
            and performance metrics). Analytics data is used to improve page speed, usability, and content quality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Cookies</h2>
          <p className="leading-relaxed">
            Cookies are small files stored on your device. Convertaro may use cookies for essential functionality and to
            measure site performance. You can usually control cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Advertising</h2>
          <p className="leading-relaxed">
            Convertaro may display ads through third-party ad networks (such as Google AdSense). These providers may use
            cookies or similar technologies to personalize ads and measure ad performance.
          </p>
          <p className="leading-relaxed">
            You can learn more about ad personalization settings in your Google account or via your device’s privacy
            controls.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">User data</h2>
          <p className="leading-relaxed">
            Convertaro does not require accounts for normal use. Conversion inputs are processed for display and are not
            intended to be stored as personal data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <div className="text-sm font-semibold text-text-primary">What we may collect</div>
              <div className="mt-1 text-sm leading-relaxed">
                Aggregated usage metrics, basic device/browser information, and approximate location (country/region).
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <div className="text-sm font-semibold text-text-primary">What we avoid collecting</div>
              <div className="mt-1 text-sm leading-relaxed">
                Names, passwords, or sensitive identifiers unless you voluntarily submit them via the contact form.
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Your choices</h2>
          <ul className="space-y-2">
            <li className="leading-relaxed">You can block or delete cookies in your browser settings.</li>
            <li className="leading-relaxed">You can limit ad personalization via your ad provider settings.</li>
            <li className="leading-relaxed">You can contact us to request clarification about this policy.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Contact</h2>
          <p className="leading-relaxed">
            For privacy questions, reach out via the <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
          </p>
        </section>

        <div className="pt-6 border-t border-border/60 text-xs text-text-secondary">
          Last updated: {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>
    </PageShell>
  );
}

