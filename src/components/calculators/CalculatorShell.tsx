import Link from "next/link";
import { ReactNode } from "react";
import { CalculatorDefinition } from "@/data/calculators";
import { calculatorCategoryBySlug } from "@/data/calculator-categories";
import { SITE_URL } from "@/lib/seo";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";

interface CalculatorShellProps {
  calculator: CalculatorDefinition;
  children: ReactNode;
}

export function CalculatorShell({ calculator, children }: CalculatorShellProps) {
  const category = calculatorCategoryBySlug.get(calculator.category);
  const canonical = `${SITE_URL}/${calculator.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calculator.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${SITE_URL}/calculators`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calculator.title,
        item: canonical,
      },
    ],
  };

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
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary rounded-full border border-border bg-white px-3 py-1">
            <Link href="/calculators" className="text-primary hover:underline">Calculators</Link>
            <span>/</span>
            {category ? (
              <Link href={`/calculators/${category.slug}`} className="text-primary hover:underline">{category.shortLabel}</Link>
            ) : (
              <span>Category</span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">{calculator.title}</h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto">{calculator.description}</p>
        </header>

        <section className="mt-9 rounded-3xl bg-white border border-border shadow-card p-6 sm:p-8 lg:p-10">
          {children}
        </section>

        <section className="mt-8 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">What it does</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{calculator.whatItDoes}</p>
        </section>

        <section className="mt-6 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">How to use it</h2>
          <ol className="mt-4 space-y-2">
            {calculator.howToUse.map((step, index) => (
              <li key={step} className="text-sm text-text-secondary leading-relaxed">
                <span className="font-bold text-text-primary mr-2">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Real-world examples</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {calculator.examples.map((example) => (
              <article key={example.title} className="rounded-xl border border-border bg-background/60 p-4">
                <h3 className="text-sm font-bold text-text-primary">{example.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{example.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Common mistakes</h2>
          <ul className="mt-4 space-y-2">
            {calculator.commonMistakes.map((mistake) => (
              <li key={mistake} className="text-sm text-text-secondary leading-relaxed">
                - {mistake}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Why it matters</h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">{calculator.whyItMatters}</p>
        </section>

        <section className="mt-6 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">FAQs</h2>
          <div className="mt-4 space-y-3">
            {calculator.faq.map((item) => (
              <article key={item.question} className="rounded-xl border border-border bg-background/60 p-4">
                <h3 className="text-sm font-bold text-text-primary">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
          <h2 className="text-xl font-black text-text-primary">Related tools</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link
              href="/calculators"
              className="inline-flex items-center rounded-full border border-primary/25 bg-primary/7 px-4 py-2 text-sm font-semibold text-primary hover:bg-white transition-colors"
            >
              All calculators
            </Link>
            {category ? (
              <Link
                href={`/calculators/${category.slug}`}
                className="inline-flex items-center rounded-full border border-primary/25 bg-primary/7 px-4 py-2 text-sm font-semibold text-primary hover:bg-white transition-colors"
              >
                {category.shortLabel} calculators
              </Link>
            ) : null}
            {calculator.relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-semibold text-text-primary hover:border-primary/35 hover:text-primary hover:bg-white transition-colors"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>

        <CrawlableLinkHub title="More Tools You Can Use" limitPerCategory={2} />
      </div>
    </div>
  );
}
