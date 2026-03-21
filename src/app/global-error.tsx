"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <head>
        <title>Something went wrong | Convertaro</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-screen bg-background text-text-primary">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Something went wrong</h1>
          <p className="mt-3 text-sm text-text-secondary sm:text-base">
            We hit an unexpected error. Try again or go back to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-text-primary hover:border-primary/35 hover:text-primary"
            >
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
