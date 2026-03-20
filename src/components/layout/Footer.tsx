import Link from "next/link";
import { categories } from "@/data/categories";
import { Zap } from "lucide-react";

export function Footer() {
  const converterCats = categories.slice(0, 5);
  const infoCats = categories.slice(5);

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-[#7C3AED] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="text-base font-bold text-white">Convertaro</div>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-xs leading-relaxed">
              The world&apos;s most accurate and high-performance unit conversion platform. Built for professionals and anyone who values speed and precision.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <Zap className="h-3 w-3 text-primary" />
              <span>Built for speed · Secure · Free forever</span>
            </div>
          </div>

          {/* Converters */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Converters</div>
            <ul className="space-y-3">
              {converterCats.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Categories */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">More Tools</div>
            <ul className="space-y-3">
              {infoCats.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Company</div>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Convertaro. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">convertaro.com</p>
        </div>
      </div>
    </footer>
  );
}
