import Link from "next/link";
import { categories } from "@/data/categories";
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-[#7C3AED] flex items-center justify-center shadow-sm shadow-primary/30">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient">Conver</span><span className="text-text-primary">taro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {primaryNav.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-all"
              >
                {category.name}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative group/more">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-all">
                More
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover/more:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-white rounded-xl border border-border/80 shadow-lg shadow-slate-900/8 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all duration-200 z-50 p-1.5">
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
          </nav>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <SearchTool variant="navbar" placeholder="Search tools…" />
            <Link
              href="/length/cm-to-inches"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7C3AED] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/35 hover:brightness-110 transition-all"
            >
              Try it Free
            </Link>
          </div>

          {/* Right — mobile */}
          <div className="flex md:hidden items-center gap-2">
            <MobileNav />
          </div>

        </div>
      </div>
    </header>
  );
}
