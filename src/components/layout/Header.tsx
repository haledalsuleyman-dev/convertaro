import Link from "next/link";
import { Search } from "lucide-react";
import { categories } from "@/data/categories";
import { SearchTool } from "@/components/ui/SearchTool";

export function Header() {
  const nav = categories.filter((c) =>
    ["length", "weight", "temperature", "volume", "area", "speed"].includes(c.slug)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/75 backdrop-blur-xl">
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

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {nav.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group"
              >
                {category.name}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary rounded-full transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <SearchTool variant="navbar" placeholder="Search tools" />
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7C3AED] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-primary/25 hover:from-primary-dark hover:to-[#6D28D9] hover:shadow-primary/40 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile search */}
          <div className="flex md:hidden items-center gap-2">
            <button className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white border border-border text-text-secondary hover:bg-background transition-colors">
              <Search className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
