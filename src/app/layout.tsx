import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://convertaro.com"),
  title: {
    default: "Convertaro – Free Online Unit Converter | 500+ Tools",
    template: "%s | Convertaro",
  },
  description:
    "Convertaro is the fastest free online unit converter with 500+ tools. Instantly convert length, weight, temperature, volume, speed, data, energy & pressure. Accurate, mobile-friendly, no signup required.",
  keywords: [
    "unit converter",
    "online converter",
    "free unit converter",
    "measurement converter",
    "unit conversion calculator",
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
    "metric to imperial",
    "imperial to metric",
    "online measurement tool",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Convertaro – Free Online Unit Converter | 500+ Tools",
    description:
      "500+ free unit converters for length, weight, temperature, volume, speed, and more. Instant, accurate, and mobile-friendly.",
    site: "@convertaro",
  },
  openGraph: {
    siteName: "Convertaro",
    type: "website",
    locale: "en_US",
    title: "Convertaro – Free Online Unit Converter | 500+ Tools",
    description:
      "Convertaro offers 500+ free online unit converters for length, weight, temperature, volume, speed, data, energy, and pressure.",
    url: "https://convertaro.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Convertaro",
    url: "https://convertaro.com",
    description:
      "Free online unit converter with 500+ tools for length, weight, temperature, volume, speed, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://convertaro.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Convertaro",
    url: "https://convertaro.com",
    logo: {
      "@type": "ImageObject",
      url: "https://convertaro.com/logo.png",
    },
    description:
      "The world's most accurate and high-performance unit conversion platform. Built for professionals and anyone who values speed and precision.",
    sameAs: ["https://twitter.com/convertaro"],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Convertaro Unit Converter",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: "https://convertaro.com",
    description:
      "Free online unit conversion tool with 500+ converters across 10 categories including length, weight, temperature, volume, speed, data, energy, and pressure.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const GA_ID = "G-65KZJ6FDGT";

  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
