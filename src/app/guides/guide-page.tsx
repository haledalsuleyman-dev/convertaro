import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getGuideBySlug, guides, type GuideDefinition } from "@/lib/guides";
import { buildPageMetadata, buildWebPageSchema, generateBreadcrumbSchemaFromPaths, generateFAQSchema } from "@/lib/seo";

export function buildGuideMetadata(slug: string): Metadata {
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return {};
  }

  return buildPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

function GuideContent({ guide }: { guide: GuideDefinition }) {
  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ]);
  const faqSchema = generateFAQSchema(guide.faq);
  const webPageSchema = buildWebPageSchema({
    name: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-pro py-8">
          <Breadcrumbs
            className="mb-4 flex items-center gap-2 text-sm text-slate-500"
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: guide.title },
            ]}
          />
          <span className="badge-pro uppercase">{guide.categoryLabel}</span>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">{guide.title}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">{guide.intro}</p>
          <div className="mt-4">
            <Link href={guide.relatedConverterHref} className="inline-flex text-sm font-medium text-sky-700 hover:text-sky-800 hover:underline">
              Open the related converter: {guide.relatedConverterLabel}
            </Link>
          </div>
        </div>
      </div>

      <div className="container-pro py-8">
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">{guide.chartHeading}</h2>
            <p className="mt-2 text-sm text-slate-500">{guide.chartDescription}</p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full border-separate border-spacing-0 text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em]">Input</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em]">Converted</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.chartRows.map((row) => (
                    <tr key={row.left} className="odd:bg-white even:bg-slate-50">
                      <td className="border-t border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">{row.left}</td>
                      <td className="border-t border-slate-200 px-4 py-3 text-sm text-slate-700">{row.right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {guide.sections.map((section) => (
            <section key={section.heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{section.heading}</h2>
              <div className="mt-4 space-y-3 text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="mt-5 space-y-4">
              {guide.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export function renderGuidePage(slug: string) {
  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }

  return <GuideContent guide={guide} />;
}

export function getGuideStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}
