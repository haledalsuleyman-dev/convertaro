import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { AdUnit } from "@/components/ui/AdUnit";
import Link from "next/link";
import { ChevronRight, Home, Calculator, CheckCircle2, ArrowUpRight } from "lucide-react";

const converters = convertersData as Converter[];

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find(c => c.slug === slug);

  if (!category) return {};

  const count = converters.filter(c => c.category === slug).length;

  return {
    title: `${category.name} Converters – ${count} Free Online Tools`,
    description: `${category.description} Browse all ${count} free ${category.name.toLowerCase()} converters. Instant results, accurate formulas, and reference tables for every ${category.name.toLowerCase()} unit conversion.`,
    keywords: [
      `${category.name.toLowerCase()} converter`,
      `free ${category.name.toLowerCase()} converter`,
      `online ${category.name.toLowerCase()} calculator`,
      `${category.name.toLowerCase()} conversion`,
      `convert ${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} unit converter`,
      "unit converter",
      "free online converter",
    ],
    alternates: {
      canonical: `https://convertaro.com/${slug}`,
    },
    openGraph: {
      siteName: "Convertaro",
      title: `${category.name} Converters – ${count} Free Online Tools | Convertaro`,
      description: `${category.description} ${count} free, accurate ${category.name.toLowerCase()} conversion tools.`,
      type: "website",
      url: `https://convertaro.com/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Converters – Free Online Tools`,
      description: `${count} free ${category.name.toLowerCase()} converters. Instant results, no signup required.`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryConverters = converters.filter(c => c.category === slug);

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://convertaro.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${category.name} Converters`,
        "item": `https://convertaro.com/${slug}`,
      },
    ],
  };

  // CollectionPage Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Converters`,
    "description": category.description,
    "url": `https://convertaro.com/${slug}`,
    "numberOfItems": categoryConverters.length,
    "hasPart": categoryConverters.slice(0, 10).map(c => ({
      "@type": "WebPage",
      "name": c.title,
      "url": `https://convertaro.com/${slug}/${c.metadata.slug}`,
      "description": c.description,
    })),
  };

  return (
    <div className="bg-background min-h-screen py-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-text-secondary mb-10">
          <Link href="/" className="hover:text-primary flex items-center transition-colors">
            <Home className="h-4 w-4 mr-1.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-4 w-4 opacity-40" />
          <span className="text-text-primary font-semibold capitalize">{category.name} Converters</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
          <div className="space-y-12">

            {/* Hero */}
            <div className="relative p-8 md:p-12 bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -mr-36 -mt-36 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary mb-5">
                  {categoryConverters.length} Free Tools
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-5 tracking-tight">
                  {category.name} <span className="text-gradient">Converters</span>
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                  {category.description} Precise and instant {category.name.toLowerCase()} conversion tools for engineering, science, and everyday use.
                </p>
              </div>
            </div>

            {/* Converters Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">
                  All {category.name} Converters
                </h2>
                <span className="px-3 py-1.5 bg-primary/8 text-primary text-xs font-bold rounded-full border border-primary/15">
                  {categoryConverters.length} Tools
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categoryConverters.map((converter) => (
                  <Link
                    key={converter.id}
                    href={`/${category.slug}/${converter.metadata.slug}`}
                    className="bg-white p-6 rounded-[1.75rem] border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 group flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-10 w-10 rounded-xl bg-background text-text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-200 flex items-center justify-center">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-text-secondary group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </div>
                    <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors mb-2">
                      {converter.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                      {converter.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Category Explanation */}
            <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">
                About {category.name} Conversions
              </h2>
              <div className="prose prose-slate max-w-none text-text-secondary leading-relaxed space-y-4">
                <p>
                  {category.name} units are fundamental to our understanding of the physical world. From high-precision engineering projects to daily measurements, accurate conversion is essential for professionals and students alike.
                </p>
                <p>
                  Our {category.name.toLowerCase()} converters use high-precision algorithms to ensure that every result is accurate and matches international standards (SI, NIST).
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Real-time instant results",
                  "Scientific-grade formulas",
                  "Reference conversion tables",
                  "Mobile-friendly interface",
                  "Works offline",
                  "100% free, no signup",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 bg-background p-3.5 rounded-xl border border-border">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-text-secondary font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <AdUnit variant="banner" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <AdUnit variant="sidebar" />

            <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm sticky top-24">
              <h3 className="text-base font-bold text-text-primary mb-6 tracking-tight">Browse Categories</h3>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                      cat.slug === slug
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                        : "text-text-secondary hover:bg-background border-transparent hover:border-border"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className={`h-4 w-4 ${cat.slug === slug ? "opacity-100" : "opacity-30"}`} />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
