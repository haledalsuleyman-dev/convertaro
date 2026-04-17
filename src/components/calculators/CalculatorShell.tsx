import Link from "next/link";
import { ReactNode } from "react";
import { CalculatorDefinition } from "@/data/calculators";
import { calculatorCategoryBySlug } from "@/data/calculator-categories";
import { SITE_URL, generateBreadcrumbSchemaFromPaths, generateFAQSchema } from "@/lib/seo";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { canonicalizeConverterHref } from "@/lib/converter-routing";
import { TrustMetadataBlock } from "@/components/trust/TrustMetadataBlock";
import { getCalculatorTrustMetadata } from "@/lib/trust";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCalculatorContextSentence, getCalculatorStrategicLinks } from "@/lib/internal-linking";

import { AdSlot } from "@/components/ads/AdSlot";

interface CalculatorShellProps {
  calculator: CalculatorDefinition;
  children: ReactNode;
}

export function CalculatorShell({ calculator, children }: CalculatorShellProps) {
  const category = calculatorCategoryBySlug.get(calculator.category);
  const canonical = `${SITE_URL}/${calculator.slug}`;
  const trustMetadata = getCalculatorTrustMetadata(calculator);
  const strategicLinks = getCalculatorStrategicLinks(calculator);
  const contextSentence = getCalculatorContextSentence(calculator);

  const faqSchema = generateFAQSchema(calculator.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })));

  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators" },
    ...(category ? [{ name: category.shortLabel, path: `/calculators/${category.slug}` }] : []),
    { name: calculator.title, path: `/${calculator.slug}` },
  ]);

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: calculator.title,
    description: calculator.description,
    url: canonical,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "Convertaro",
      url: SITE_URL,
    },
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.title,
    applicationCategory: "CalculatorApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: canonical,
    description: calculator.description,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 dot-grid" />
      <div className="pointer-events-none absolute -top-24 -left-20 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[110px]" />
      <div className="pointer-events-none absolute top-10 right-0 h-[460px] w-[460px] rounded-full bg-secondary/10 blur-[95px]" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <header className="text-center">
          <div className="mb-4 flex justify-center">
            <Breadcrumbs
              className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-secondary"
              items={[
                { label: "Home", href: "/" },
                { label: "Calculators", href: "/calculators" },
                ...(category ? [{ label: category.shortLabel, href: `/calculators/${category.slug}` }] : []),
                { label: calculator.navLabel || calculator.title },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-text-primary leading-tight">{calculator.title}</h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            {calculator.whatItDoes}
          </p>
        </header>

        <div className="mt-8 flex justify-center">
          <AdSlot type="leaderboard" id="calculator-top-ad" />
        </div>

        <section className="mt-9 rounded-3xl bg-white border border-border shadow-card p-6 sm:p-8 lg:p-10">
          {children}
        </section>

        <div className="mt-8">
          <AdSlot type="in-content" id="calculator-middle-ad" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          <div className="lg:col-span-8 space-y-12">
            <section id="how-it-works">
              <h2 className="text-2xl font-black text-text-primary">How this calculator works</h2>
              <div className="mt-4 prose prose-slate prose-sm max-w-none text-text-secondary">
                <p>{calculator.description}</p>
                <ol className="mt-6 space-y-3">
                  {calculator.howToUse.map((step, index) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section id="formula">
              <h2 className="text-2xl font-black text-text-primary">Calculation formula</h2>
              <div className="mt-4 rounded-2xl bg-slate-900 p-6 sm:p-8 text-center shadow-lg">
                <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                  {calculator.formula.expression}
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {calculator.formula.description}
              </p>
            </section>

            <section id="examples">
              <h2 className="text-2xl font-black text-text-primary">Practical calculation examples</h2>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {calculator.examples.map((example) => (
                  <article key={example.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <h3 className="text-base font-bold text-text-primary">{example.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{example.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="when-to-use">
              <h2 className="text-2xl font-black text-text-primary">When should you use this?</h2>
              <div className="mt-4 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <p className="text-sm leading-relaxed text-text-secondary italic">
                  "{calculator.whenToUse}"
                </p>
              </div>
              {contextSentence ? (
                <p className="mt-6 text-sm leading-relaxed text-text-secondary">
                  <strong>Need more info?</strong> {contextSentence.replace(/\.$/, "")}{" "}
                  {strategicLinks.slice(0, 3).map((tool, index, items) => (
                    <span key={tool.href}>
                      <Link href={canonicalizeConverterHref(tool.href)} className="font-bold text-primary hover:underline">
                        {tool.label}
                      </Link>
                      {index < items.length - 2 ? ", " : index === items.length - 2 ? " or " : "."}
                    </span>
                  ))}
                </p>
              ) : null}
            </section>

            <section id="faqs">
              <h2 className="text-2xl font-black text-text-primary text-center lg:text-left">Frequently asked questions</h2>
              <div className="mt-8 space-y-4">
                {calculator.faq.map((item) => (
                  <article key={item.question} className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:border-primary/20 transition-colors">
                    <h3 className="text-base font-bold text-text-primary">{item.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-8 space-y-8">
              <TrustMetadataBlock metadata={trustMetadata} title="Editorial Review" />
              
              <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-black text-text-primary">Related tools</h2>
                <div className="mt-4 space-y-2">
                  <Link
                    href="/calculators"
                    className="block w-full py-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
                  >
                    → Browse all calculators
                  </Link>
                  {category && (
                    <Link
                      href={`/calculators/${category.slug}`}
                      className="block w-full py-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
                    >
                      → {category.shortLabel} tools
                    </Link>
                  )}
                  {strategicLinks.map((tool) => (
                    <Link
                      key={tool.href}
                      href={canonicalizeConverterHref(tool.href)}
                      className="block w-full py-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
                    >
                      → {tool.label}
                    </Link>
                  ))}
                </div>
              </section>

              <div className="p-1 rounded-2xl bg-slate-50 border border-slate-100">
                <AdSlot type="sidebar" id="calculator-sidebar-ad" />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 pt-16 border-t border-border">
          <CrawlableLinkHub title="Explore More Powerful Tools" limitPerCategory={3} />
        </div>
      </div>
    </div>
  );
}
