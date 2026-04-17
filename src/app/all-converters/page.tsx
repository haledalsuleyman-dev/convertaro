import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LayoutGrid, List } from "lucide-react";
import { categories } from "@/data/categories";
import { Converter } from "@/types/converter";
import { canonicalConverters } from "@/lib/converter-routing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildPageMetadata, buildWebPageSchema, generateBreadcrumbSchemaFromPaths } from "@/lib/seo";

export const dynamic = "force-static";

const converters = canonicalConverters as Converter[];

export const metadata: Metadata = buildPageMetadata({
  title: "All Unit Converters - Complete Index | Convertaro",
  description:
    "Browse our complete list of 500+ free unit converters. Find any tool for length, weight, temperature, data, volume, and more in one easy-to-navigate index.",
  path: "/all-converters",
});

export default function AllConvertersPage() {
  const webPageSchema = buildWebPageSchema({
    name: "All Unit Converters Index",
    description: "A complete list of every conversion tool available on Convertaro, organized by category.",
    path: "/all-converters",
  });
  
  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: "All Converters", path: "/all-converters" },
  ]);

  // Group all 500+ converters by category
  const groupedConverters = categories.map(category => {
    const categoryConverters = converters.filter(c => c.category === category.slug);
    return {
      category,
      converters: categoryConverters.sort((a, b) => a.title.localeCompare(b.title))
    };
  }).filter(group => group.converters.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8 lg:p-10 mb-8">
          <Breadcrumbs
            className="mb-5"
            items={[
              { label: "Home", href: "/" },
              { label: "All Converters" },
            ]}
          />
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">Complete Converter Index</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Access over 500+ conversion tools spanning 10+ categories. This master list ensures you can find even the most specialized units for your projects, studies, or daily tasks.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-2">
            {groupedConverters.map(group => (
              <a 
                key={group.category.id} 
                href={`#${group.category.slug}`}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              >
                {group.category.name} ({group.converters.length})
              </a>
            ))}
          </div>
        </section>

        <div className="space-y-12">
          {groupedConverters.map((group) => (
            <section key={group.category.slug} id={group.category.slug} className="scroll-mt-20">
              <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <List className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{group.category.name} Tools</h2>
                    <p className="text-sm text-slate-500">{group.category.description}</p>
                  </div>
                </div>
                <Link 
                  href={`/${group.category.slug}`} 
                  className="hidden sm:flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  Category Hub <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.converters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${converter.category}/${converter.metadata.slug}`}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-sky-300 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {converter.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500 transition-all group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-center text-white md:p-12">
          <LayoutGrid className="mx-auto h-12 w-12 text-slate-400 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Calculators & More</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Don't forget our specialized calculators for health, finance, and mathematics. We are constantly expanding our library of tools.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/calculators" className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100 transition-colors">
              Browse Calculators
            </Link>
            <Link href="/" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-800 transition-colors">
              Back Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
