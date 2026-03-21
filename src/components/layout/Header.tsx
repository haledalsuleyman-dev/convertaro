import Link from "next/link";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import { SearchTool } from "@/components/ui/SearchTool";
import { MobileNav } from "./MobileNav";
import { ChevronDown } from "lucide-react";

export function Header() {
  const primaryNav = categories.filter((c) =>
    ["length", "weight", "temperature", "volume", "area", "speed"].includes(c.slug)
  );
  const moreNav = categories.filter((c) =>
    !["length", "weight", "temperature", "volume", "area", "speed"].includes(c.slug)
  );
  const featuredCalculators = calculators.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Gradient accent line at the very top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary via-[#8B5CF6] to-secondary" />

      <div className="border-b border-border/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-[3.75rem] items-center justify-between gap-4">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="h-10 w-10 rounded-[12px] bg-gradient-to-br from-primary to-[#7C3AED] flex items-center justify-center shadow-sm shadow-primary/25 group-hover:shadow-md group-hover:shadow-primary/35 transition-shadow">
                <span className="text-white font-black text-lg tracking-tight">C</span>
              </div>
              <span className="text-[1.25rem] font-black tracking-tight">
                <span className="text-gradient">Conver</span>
                <span className="text-text-primary">taro</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {primaryNav.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-slate-50 rounded-lg transition-all duration-150"
                >
                  {category.name}
                </Link>
              ))}

              {/* More dropdown */}
              <div className="relative group/more">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-slate-50 rounded-lg transition-all duration-150">
                  More
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/more:rotate-180" />
                </button>
                {/* Dropdown panel */}
                <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl border border-border shadow-xl shadow-slate-900/8 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible translate-y-1 group-hover/more:translate-y-0 transition-all duration-200 z-50 p-1.5">
                  {moreNav.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="flex items-center px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/6 rounded-lg transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative group/calc">
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-slate-50 rounded-lg transition-all duration-150">
                  Calculators
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/calc:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl border border-border shadow-xl shadow-slate-900/8 opacity-0 invisible group-hover/calc:opacity-100 group-hover/calc:visible translate-y-1 group-hover/calc:translate-y-0 transition-all duration-200 z-50 p-1.5">
                  <Link
                    href="/calculators"
                    className="flex items-center px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/8 rounded-lg transition-colors"
                  >
                    All Calculators Hub
                  </Link>
                  <Link href="/calculators/finance" className="flex items-center px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/6 rounded-lg transition-colors">Finance</Link>
                  <Link href="/calculators/health" className="flex items-center px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/6 rounded-lg transition-colors">Health</Link>
                  <Link href="/calculators/math" className="flex items-center px-3 py-2 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary/6 rounded-lg transition-colors">Math</Link>
                  {featuredCalculators.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={`/${calculator.slug}`}
                      className="flex items-center px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/6 rounded-lg transition-colors"
                    >
                      {calculator.title}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* ── Right — desktop ── */}
            <div className="hidden md:flex items-center gap-3">
              <SearchTool variant="navbar" placeholder="Search tools…" />
              <Link
                href="/length/cm-to-inches"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7C3AED] px-5 py-2 text-sm font-bold text-white shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30 hover:brightness-110 transition-all duration-200"
              >
                Try it Free
              </Link>
            </div>

            {/* ── Right — mobile ── */}
            <div className="flex md:hidden items-center gap-2">
              <MobileNav />
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
