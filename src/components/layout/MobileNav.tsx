"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, Ruler, Weight, Thermometer, Droplets, Square, Gauge, Clock, Database, Zap, Wind } from "lucide-react";
import { categories } from "@/data/categories";
import { calculators } from "@/data/calculators";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Ruler, Weight, Thermometer, Droplets, Square, Gauge, Clock, Database, Zap, Wind,
};

export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Close on route change / scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-text-secondary hover:bg-background transition-colors"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 bg-white border-b border-border shadow-xl transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3 px-2">
            Browse Converters
          </p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const Icon = ICONS[cat.icon] ?? Ruler;
              return (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-primary/8 hover:text-primary transition-colors border border-transparent hover:border-primary/15"
                >
                  <div className="h-7 w-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mt-6 mb-3 px-2">
            Calculators
          </p>
          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/calculators"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-primary bg-primary/6 border border-primary/15"
            >
              <span>All Calculators Hub</span>
              <ChevronRight className="h-4 w-4 opacity-70" />
            </Link>
            {calculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={`/${calculator.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-primary/8 hover:text-primary transition-colors border border-transparent hover:border-primary/15"
              >
                <span>{calculator.title}</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-border flex flex-wrap gap-2">
            {[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-background"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
