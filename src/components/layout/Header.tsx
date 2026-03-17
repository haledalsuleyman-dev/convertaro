import Link from "next/link";
import { Search } from "lucide-react";
import { categories } from "@/data/categories";
import { SearchTool } from "@/components/ui/SearchTool";

export function Header() {
  const nav = categories.filter((c) => ["length", "weight", "temperature", "volume", "area", "speed"].includes(c.slug));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden border border-border/40">
              <img src="/favicon.ico" alt="Convertaro Logo" className="h-full w-full object-contain p-1" />
            </div>
            <span className="text-lg font-bold text-text-primary tracking-tight">Convertaro</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <SearchTool variant="navbar" placeholder="Search tools" />
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7C3AED] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:from-primary-dark hover:to-[#6D28D9] transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white border border-border text-text-secondary">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
