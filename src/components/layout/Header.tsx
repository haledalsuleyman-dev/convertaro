import Link from "next/link";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import { SearchTool } from "@/components/ui/SearchTool";
import { MobileNav } from "./MobileNav";
import { ChevronDown, Calculator, Ruler } from "lucide-react";

export function Header() {
  const primaryNav = categories.filter((c) =>
    ["length", "weight", "temperature", "volume", "area", "speed"].includes(c.slug)
  );
  const moreNav = categories.filter((c) =>
    !["length", "weight", "temperature", "volume", "area", "speed"].includes(c.slug)
  );
  const featuredCalculators = calculators.slice(0, 4);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
      <div className="container-pro">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-900/20">
              <Ruler className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-display font-semibold tracking-tight text-slate-900">
              Convertaro
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNav.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="nav-item"
              >
                {category.name}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative group/more">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-600 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors">
                More
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/more:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible translate-y-1 group-hover/more:translate-y-0 transition-all duration-150 z-50 py-2 backdrop-blur-md">
                {moreNav.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-lg mx-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Calculators dropdown */}
            <div className="relative group/calc">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-600 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors">
                <Calculator className="h-3.5 w-3.5 mr-1" />
                Calculators
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/calc:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 opacity-0 invisible group-hover/calc:opacity-100 group-hover/calc:visible translate-y-1 group-hover/calc:translate-y-0 transition-all duration-150 z-50 py-2 backdrop-blur-md">
                <Link
                  href="/calculators"
                  className="block px-3 py-2 text-sm font-semibold text-slate-900 border-b border-slate-100"
                >
                  All Calculators
                </Link>
                <div className="py-1">
                  <p className="px-3 py-1 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Featured
                  </p>
                  {featuredCalculators.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={`/${calculator.slug}`}
                      className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-lg mx-1"
                    >
                      {calculator.navLabel}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <SearchTool variant="navbar" placeholder="Search..." />
            </div>
            <Link href="/length/cm-to-inches" className="btn-pro hidden sm:inline-flex">
              Start Converting
            </Link>
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
