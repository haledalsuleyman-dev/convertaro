import Link from "next/link";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import { ChevronRight, Home } from "lucide-react";
import { canonicalConvertersByCategory, canonicalizeConverterHref, canonicalConverters } from "@/lib/converter-routing";
import { getCategoryCalculatorLinks, getRelevantCalculatorLinks, getCategoryFeaturedConverters } from "@/lib/internal-linking";
const POPULAR_TOOLS = [
  { href: "/length/cm-to-inches", label: "cm to inches", category: "Length" },
  { href: "/length/feet-to-inches", label: "feet to inches", category: "Length" },
  { href: "/weight/kg-to-lbs", label: "kg to lbs", category: "Weight" },
  { href: "/weight/lbs-to-kg", label: "lbs to kg", category: "Weight" },
  { href: "/temperature/celsius-to-fahrenheit", label: "°C to °F", category: "Temperature" },
  { href: "/speed/mph-to-kmh", label: "mph to km/h", category: "Speed" },
  { href: "/data/megabytes-to-gigabytes", label: "MB to GB", category: "Data" },
  { href: "/data/gigabytes-to-megabytes", label: "GB to MB", category: "Data" },
  { href: "/volume/liters-to-gallons", label: "liters to gallons", category: "Volume" },
  { href: "/volume/gallons-to-liters", label: "gallons to liters", category: "Volume" },
  { href: "/power/kw-to-hp", label: "kW to hp", category: "Power" },
  { href: "/weight/mg-to-g", label: "mg to g", category: "Weight" },
].map((tool) => ({ ...tool, href: canonicalizeConverterHref(tool.href) }));

const STATIC_PAGE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/popular-conversion-tools", label: "Popular Conversion Tools" },
  { href: "/calculators", label: "All Calculators" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

interface BreadcrumbItem {
  name: string;
  href?: string;
}

// Enhanced Breadcrumb Component
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-2 text-sm text-slate-500">
        <li>
          <Link href="/" className="flex items-center hover:text-slate-900 transition-colors">
            <Home className="h-3.5 w-3.5 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center">
            <ChevronRight className="h-3.5 w-3.5 mx-1 text-slate-300" />
            {item.href ? (
              <Link href={item.href} className="hover:text-slate-900 transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-slate-900 font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Related Converters Section
export function RelatedConverters({ converters, categoryName, currentSlug }: {
  converters: { slug: string; title: string; category: string }[];
  categoryName: string;
  currentSlug: string;
}) {
  const related = converters.filter(c => c.slug !== currentSlug).slice(0, 6);

  if (related.length === 0) return null;

  return (
    <section className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Related {categoryName} Converters
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((converter) => (
          <Link
            key={converter.slug}
            href={`/${converter.category}/${converter.slug}`}
            className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-700">{converter.title}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}

// Cross-Category Links
export function CrossCategoryLinks({ currentCategory }: { currentCategory: string }) {
  const otherCategories = categories.filter(c => c.slug !== currentCategory).slice(0, 5);

  return (
    <section className="bg-slate-50 border border-slate-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Other Categories</h2>
      <div className="space-y-2">
        {otherCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.slug}`}
            className="flex items-center justify-between p-2 rounded-md hover:bg-white hover:shadow-sm transition-all"
          >
            <span className="text-slate-700">{cat.name}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}

// Popular Tools Sidebar
export function PopularToolsSidebar({ excludeSlug, categoryContext }: { excludeSlug?: string; categoryContext?: string }) {
  let popular = POPULAR_TOOLS;

  if (categoryContext) {
    const categoryDef = categories.find((c) => c.slug === categoryContext);
    if (categoryDef) {
      const topCategoryConverters = getCategoryFeaturedConverters(categoryDef, canonicalConverters as any[])
        .slice(0, 5)
        .map((c) => ({
          href: canonicalizeConverterHref(`/${c.category}/${c.metadata.slug}`),
          label: c.title,
          category: categoryDef.name,
        }));
        
      const fallback = POPULAR_TOOLS.filter((t) => t.category !== categoryDef.name).slice(0, 5);
      popular = [...topCategoryConverters, ...fallback];
    }
  }

  const filtered = popular.filter((tool) => !excludeSlug || !tool.href.includes(excludeSlug));

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
        Popular Tools
      </h3>
      <div className="space-y-2">
        {filtered.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block p-2 rounded-md hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-medium text-slate-900">{tool.label}</span>
            <span className="text-xs text-slate-400 block">{tool.category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Related Calculators
export function RelatedCalculators({ currentSlug, categoryContext }: { currentSlug?: string; categoryContext?: string }) {
  const categorySpecific = categoryContext ? getCategoryCalculatorLinks(categoryContext) : [];
  const fallback = getRelevantCalculatorLinks(currentSlug);
  const related = (categorySpecific.length > 0 ? categorySpecific : fallback).filter(c => c.slug !== currentSlug).slice(0, 4);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
        Related Calculators
      </h3>
      <div className="space-y-2">
        {related.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="block p-2 rounded-md hover:bg-slate-50 transition-colors"
          >
            <span className="text-sm font-medium text-slate-900">{calc.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}



// Navigation Sidebar with all categories
export function CategoryNavigation({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
        Categories
      </h3>
      <div className="space-y-1">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.slug}`}
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
              cat.slug === activeCategory
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>{cat.name}</span>
            {cat.slug === activeCategory && <ChevronRight className="h-3.5 w-3.5" />}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CrawlableLinkHub({
  title = "Explore More Tools",
  limitPerCategory,
}: {
  title?: string;
  limitPerCategory?: number;
}) {
  const categoriesToDisplay = limitPerCategory ? categories.slice(0, limitPerCategory * 4) : categories.slice(0, 12);
  const topCalculatorLinks = limitPerCategory ? calculators.slice(0, limitPerCategory * 2) : calculators.slice(0, 5);
  const topConversionTasks = limitPerCategory ? POPULAR_TOOLS.slice(0, limitPerCategory * 3) : POPULAR_TOOLS.slice(0, 8);

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-6">{title}</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Popular Categories</h3>
          <ul className="space-y-3">
            {categoriesToDisplay.map((category) => (
              <li key={category.slug}>
                <Link 
                  href={`/${category.slug}`} 
                  className="text-base text-slate-600 hover:text-slate-900 hover:underline transition-all underline-offset-4 decoration-slate-300"
                >
                  {category.name} Converters
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Premium Calculators</h3>
          <ul className="space-y-3">
            {topCalculatorLinks.map((calculator) => (
              <li key={calculator.slug}>
                <Link 
                  href={`/${calculator.slug}`} 
                  className="text-base text-slate-600 hover:text-slate-900 hover:underline transition-all underline-offset-4 decoration-slate-300"
                >
                  {calculator.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Top Conversion Tasks</h3>
          <ul className="space-y-3">
            {topConversionTasks.map((tool) => (
              <li key={tool.href}>
                <Link 
                  href={tool.href} 
                  className="text-base text-slate-600 hover:text-slate-900 hover:underline transition-all underline-offset-4 decoration-slate-300"
                >
                  Convert {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
