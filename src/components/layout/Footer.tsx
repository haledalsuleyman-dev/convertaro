import Link from "next/link";
import { categories } from "@/data/categories";
import { Zap, Twitter, Github, Mail, Shield, Clock, Globe } from "lucide-react";

const POPULAR_CONVERTERS = [
  { href: "/length/cm-to-inches", label: "cm to inches" },
  { href: "/weight/kg-to-lbs", label: "kg to lbs" },
  { href: "/temperature/celsius-to-fahrenheit", label: "°C to °F" },
  { href: "/speed/mph-to-kmh", label: "mph to km/h" },
  { href: "/length/meters-to-feet", label: "meters to feet" },
  { href: "/length/km-to-miles", label: "km to miles" },
];

export function Footer() {
  const converterCats = categories.slice(0, 5);
  const moreCats = categories.slice(5);

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-900 text-slate-400">
      {/* Top trust bar */}
      <div className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Zap className="h-3 w-3 text-primary" /> Sub-millisecond response</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3 w-3 text-accent" /> No data stored</span>
            <span className="flex items-center gap-1.5"><Globe className="h-3 w-3 text-secondary" /> Works worldwide</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-yellow-500" /> Always free, forever</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-[#7C3AED] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div className="text-base font-bold text-white">Convertaro</div>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-xs leading-relaxed">
              The world&apos;s fastest free unit conversion platform. Trusted by engineers, students, and professionals worldwide.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://twitter.com/convertaro"
                aria-label="Convertaro on Twitter"
                className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:hello@convertaro.com"
                aria-label="Email Convertaro"
                className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/convertaro"
                aria-label="Convertaro on GitHub"
                className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Popular Converters */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Popular</div>
            <ul className="space-y-2.5">
              {POPULAR_CONVERTERS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Categories</div>
            <ul className="space-y-2.5">
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
            <ul className="space-y-2.5">
              {moreCats.map((cat) => (
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
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Use" },
                { href: "/contact", label: "Contact Us" },
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
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
            <span>convertaro.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
