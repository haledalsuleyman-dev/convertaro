import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { guides } from "@/lib/guides";
import { buildPageMetadata, buildWebPageSchema, generateBreadcrumbSchemaFromPaths } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Conversion Guides and Charts",
  description: "Browse practical conversion guides for height, weight, and temperature charts with FAQs and direct links to related converters.",
  path: "/guides",
  keywords: ["conversion guides", "conversion charts", "height chart", "weight chart", "temperature chart"],
});

export default function GuidesPage() {
  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ]);
  const webPageSchema = buildWebPageSchema({
    name: "Conversion Guides and Charts",
    description: "Browse practical conversion guides for height, weight, and temperature charts with FAQs and direct links to related converters.",
    path: "/guides",
  });

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-pro py-8">
          <Breadcrumbs
            className="mb-4 flex items-center gap-2 text-sm text-slate-500"
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />
          <span className="badge-pro uppercase">Editorial Guides</span>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">Conversion Guides and Charts</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Explore practical charts for height, weight, and temperature conversions with quick answers and direct links to the related tools.
          </p>
        </div>
      </div>

      <div className="container-pro py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-sky-200 hover:bg-sky-50/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{guide.categoryLabel}</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-900">{guide.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{guide.description}</p>
              <span className="mt-4 inline-flex text-sm font-medium text-sky-700">Read guide</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
