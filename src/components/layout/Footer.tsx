import Link from "next/link";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";
import { Ruler, Twitter, Github, Mail } from "lucide-react";
import { canonicalizeConverterHref } from "@/lib/converter-routing";

const POPULAR_CONVERTERS = [
  { href: "/length/cm-to-inches", label: "CM to Inches" },
  { href: "/weight/kg-to-lbs", label: "KG to LBS" },
  { href: "/temperature/celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
  { href: "/speed/mph-to-kmh", label: "MPH to KM/H" },
  { href: "/length/meters-to-feet", label: "Meters to Feet" },
  { href: "/length/km-to-miles", label: "KM to Miles" },
  { href: "/data/megabytes-to-gigabytes", label: "MB to GB" },
  { href: "/volume/liters-to-gallons", label: "Liters to Gallons" },
].map((converter) => ({
  ...converter,
  href: canonicalizeConverterHref(converter.href),
}));

export function Footer() {
  const converterCats = categories.slice(0, 5);
  const moreCats = categories.slice(5);
  const featuredCalculators = calculators.slice(0, 4);

  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-[radial-gradient(circle_at_5%_0%,rgba(226,232,240,0.2),transparent_20%),radial-gradient(circle_at_100%_0%,rgba(203,213,225,0.18),transparent_24%),linear-gradient(to_bottom,#fcfcfd,#ffffff)]">
      <div className="container-pro py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg shadow-slate-900/15">
                <Ruler className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-display font-semibold">Convertaro</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-4">
              Free, accurate unit converters for professionals. 500+ tools, zero ads, instant results. Built for engineers, students, and everyday use.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/convertaro"
                aria-label="Twitter"
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/convertaro"
                aria-label="GitHub"
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@convertaro.com"
                aria-label="Email"
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-display font-semibold mb-3 text-slate-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/popular-conversion-tools" className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                  Popular Tools Hub
                </Link>
              </li>
              <li>
                <Link href="/all-converters" className="text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors">
                  Full Converter Index
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Search Tools
                </Link>
              </li>
              {POPULAR_CONVERTERS.slice(0, 4).map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-display font-semibold mb-3 text-slate-900">Categories</h3>
            <ul className="space-y-2">
              {converterCats.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="text-sm font-display font-semibold mb-3 text-slate-900">More Tools</h3>
            <ul className="space-y-2">
              {moreCats.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.slug}`} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="text-sm font-display font-semibold mb-3 text-slate-900">Popular Calculators</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/calculators" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  All Calculators
                </Link>
              </li>
              {featuredCalculators.map((calculator) => (
                <li key={calculator.slug}>
                  <Link href={`/${calculator.slug}`} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                    {calculator.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-display font-semibold mb-3 text-slate-900">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Convertaro. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 sm:justify-end">
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
            <span>convertaro.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
