import { ReactNode } from "react";
import { CrawlableLinkHub } from "@/components/layout/InternalLinks";

type PageShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-10 right-0 h-[520px] w-[520px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-text-primary leading-[1.1]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              {subtitle}
            </p>
          ) : null}
        </header>

        <div className="mt-10 sm:mt-12 mx-auto max-w-3xl rounded-xl bg-white/80 backdrop-blur border border-border/60 shadow-sm p-6 sm:p-10">
          {children}
        </div>

        <CrawlableLinkHub title="Discover More Converters and Calculators" limitPerCategory={3} />
      </div>
    </div>
  );
}

