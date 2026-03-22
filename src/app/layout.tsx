import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  SITE_URL,
  SITE_NAME,
  buildOpenGraph,
  buildTwitter,
  HOMEPAGE_LONGTAIL_KEYWORDS,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
} from "@/lib/seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Enhanced metadata with long-tail keywords
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    default: "Convertaro - Free Online Unit Converter | 500+ Accurate Tools",
    template: "%s | Convertaro",
  },
  description:
    "Free online unit converter with 500+ accurate tools. Convert length, weight, temperature, volume, speed, data, energy & pressure instantly. No signup required.",
  keywords: [
    "unit converter",
    "online converter",
    "free unit converter",
    "measurement converter",
    "metric to imperial",
    "imperial to metric",
    "length converter",
    "weight converter",
    "temperature converter",
    "volume converter",
    "speed converter",
    "data converter",
    "energy converter",
    "pressure converter",
    "cm to inches",
    "kg to lbs",
    "miles to km",
    "celsius to fahrenheit",
    "mb to gb",
    ...HOMEPAGE_LONGTAIL_KEYWORDS.slice(0, 30), // Include top long-tail keywords
  ],
  authors: [{ name: "Convertaro" }],
  creator: "Convertaro",
  publisher: "Convertaro",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: buildOpenGraph({
    title: "Convertaro - Free Online Unit Converter | 500+ Accurate Tools",
    description:
      "Free online unit converter with 500+ accurate tools. Convert any unit instantly - length, weight, temperature, volume, speed & more.",
    path: "/",
  }),
  twitter: buildTwitter(
    "Convertaro - Free Online Unit Converter | 500+ Accurate Tools",
    "500+ free unit converters for length, weight, temperature, volume, speed, and more. Instant, accurate, and private."
  ),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "Technology",
  classification: "Unit Conversion Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-65KZJ6FDGT";

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_SCHEMA),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Meta tags for better indexing */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#153a5f" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className={`${manrope.variable} ${sora.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
