import type { Metadata } from "next";

// Enhanced SEO Configuration with Long-Tail Keywords Strategy
// Long-tail keywords are less competitive and have higher conversion rates

export const SITE_URL = "https://convertaro.com";
export const SITE_NAME = "Convertaro";
export const DEFAULT_LOCALE = "en_US";
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/opengraph-image`;




export function normalizePath(path: string): string {
  if (!path || path === "/") return "";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

export function canonicalFromPath(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}

export function categoryCanonical(category: string): string {
  return canonicalFromPath(`/${category}`);
}

export function converterCanonical(category: string, converter: string): string {
  return canonicalFromPath(`/${category}/${converter}`);
}

export function buildAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const canonical = canonicalFromPath(path);
  return {
    canonical,
    languages: {
      "en-US": canonical,
      "x-default": canonical,
    },
  };
}

interface SocialMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  robots?: NonNullable<Metadata["robots"]>;
  type?: "website" | "article";
}

function capitalizeUnitLabel(unit: string): string {
  return /^[A-Z0-9]+$/.test(unit) ? unit : `${unit.charAt(0).toUpperCase()}${unit.slice(1)}`;
}

export function buildConverterHeading(fromUnit: string, toUnit: string): string {
  return `${fromUnit} to ${capitalizeUnitLabel(toUnit)} Converter`;
}

function compactFormula(formula: string): string {
  return formula.replace(/(\d+\.\d{4})\d+/g, "$1");
}

export function buildConverterMetaTitle(fromUnit: string, toUnit: string): string {
  const candidates = [
    `${fromUnit} to ${capitalizeUnitLabel(toUnit)} – Free Online Converter`,
    `${fromUnit} to ${capitalizeUnitLabel(toUnit)} – Free Converter`,
    `${fromUnit} to ${capitalizeUnitLabel(toUnit)} Converter`,
  ];

  return candidates.find((candidate) => withSiteName(candidate).length <= 60) ?? candidates[candidates.length - 1];
}

export function buildConverterMetaDescription(fromUnit: string, toUnit: string, formula: string): string {
  return cleanMetaDescription(
    `Convert ${fromUnit} to ${toUnit} instantly. Formula: ${compactFormula(formula)}. Free, accurate, no sign-up needed. Try Convertaro now for fast results.`,
    155
  );
}

export function withSiteName(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function cleanMetaDescription(description: string, maxLength = 160): string {
  const normalized = description.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const sliced = normalized.slice(0, maxLength - 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 120 ? lastSpace : sliced.length).trimEnd()}...`;
}

export function buildOpenGraph({
  title,
  description,
  path,
  type = "website",
}: SocialMetadataInput): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    type,
    url: canonicalFromPath(path),
    siteName: SITE_NAME,
    locale: DEFAULT_LOCALE,
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Free online converters and calculators`,
      },
    ],
  };
}

export function buildTwitter(
  title: string,
  description: string
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    site: "@convertaro",
    creator: "@convertaro",
    images: [DEFAULT_SOCIAL_IMAGE],
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  robots = INDEXABLE_ROBOTS,
  type = "website",
}: PageMetadataInput): Metadata {
  const cleanTitle = title.trim();
  const socialTitle = withSiteName(cleanTitle);
  const cleanDescription = cleanMetaDescription(description);

  return {
    title: cleanTitle,
    description: cleanDescription,
    robots,
    keywords,
    alternates: buildAlternates(path),
    openGraph: buildOpenGraph({
      title: socialTitle,
      description: cleanDescription,
      path,
      type,
    }),
    twitter: buildTwitter(socialTitle, cleanDescription),
  };
}

export function buildWebPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): Record<string, unknown> {
  const url = canonicalFromPath(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export const INDEXABLE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: true,
};

// ═══════════════════════════════════════════════════════════════════════════
// LONG-TAIL KEYWORDS STRATEGY
// These are specific, question-based, and problem-focused keywords
// that have lower competition but higher intent
// ═══════════════════════════════════════════════════════════════════════════

// Homepage Long-Tail Keywords
export const HOMEPAGE_LONGTAIL_KEYWORDS = [
  // Question-based keywords
  "how to convert units online free",
  "what is the best unit converter website",
  "free online measurement converter no signup",
  "how to convert cm to inches quickly",
  "best free unit converter for engineers",
  "how to convert kg to lbs accurately",
  "online converter that works offline",
  "fastest unit converter online",
  "convert units without downloading app",
  "accurate unit conversion calculator online",

  // Problem-based keywords
  "convert measurements for cooking",
  "convert units for travel abroad",
  "convert metric to imperial for shipping",
  "unit conversion for students free",
  "engineering unit converter online",
  "cooking measurement converter cups to grams",
  "convert temperature for baking celsius fahrenheit",
  "how many inches in a centimeter exact",
  "convert km to miles for running",
  "data storage converter mb gb tb online",

  // Comparison keywords
  "convertaro vs google unit converter",
  "best alternative to convert me",
  "free alternative to unit converter plus",
  "better than online conversion calculator",
];

// Category Long-Tail Keywords Templates
export function getCategoryLongTailKeywords(categoryName: string, categorySlug: string): string[] {
  const templates = [
    `how to convert ${categoryName.toLowerCase()} online free`,
    `best ${categoryName.toLowerCase()} converter website`,
    `free online ${categoryName.toLowerCase()} calculator accurate`,
    `convert ${categoryName.toLowerCase()} for beginners`,
    `${categoryName.toLowerCase()} conversion chart printable`,
    `${categoryName.toLowerCase()} conversion formula explained`,
    `how to calculate ${categoryName.toLowerCase()} manually`,
    `${categoryName.toLowerCase()} unit converter for students`,
    `engineering ${categoryName.toLowerCase()} converter online`,
    `${categoryName.toLowerCase()} converter that shows formula`,
  ];

  // Category-specific long-tail keywords
  const specific: Record<string, string[]> = {
    length: [
      "how many cm in an inch exactly",
      "convert feet to meters for construction",
      "convert km to miles for running pace",
      "height converter cm to feet inches",
      "convert meters to feet for room size",
      "nautical miles to km for sailing",
      "convert inches to mm for printing",
      "architectural scale converter online",
      "screen size converter inches to cm",
      "convert yards to meters for fabric",
    ],
    weight: [
      "how many pounds in a kilogram exact",
      "convert kg to lbs for luggage",
      "convert grams to ounces for cooking",
      "body weight converter kg to stone",
      "shipping weight converter lbs to kg",
      "convert ounces to grams for baking",
      "metric tons to pounds converter",
      "convert carat to gram for jewelry",
      "baby weight converter lbs to kg",
      "convert mg to mcg for medication",
    ],
    temperature: [
      "celsius to fahrenheit conversion trick",
      "convert oven temperature c to f",
      "body temperature converter celsius fahrenheit",
      "room temperature in celsius and fahrenheit",
      "convert -40 c to f coldest temperature",
      "boiling point celsius to fahrenheit",
      "convert 350 f to c for baking",
      "kelvin to celsius for science projects",
      "convert freezer temp c to f",
      "temperature conversion for international travel",
    ],
    volume: [
      "how many ml in a cup exactly",
      "convert liters to gallons for fuel",
      "cups to ml converter for baking",
      "convert fluid ounces to ml uk us",
      "wine bottle volume converter ml to oz",
      "convert gallons to liters for aquarium",
      "tablespoon to ml converter cooking",
      "convert cubic meters to liters",
      "fuel efficiency converter l/100km to mpg",
      "convert pints to liters for beer",
    ],
    speed: [
      "convert kmh to mph for driving",
      "running pace converter min km to min mile",
      "convert knots to mph for sailing",
      "wind speed converter kmh to mph",
      "convert mach to kmh for aviation",
      "convert m/s to kmh for physics",
      "speed limit converter europe to usa",
      "convert 60 mph to kmh exactly",
      "treadmill speed converter mph to kmh",
      "cycling speed converter online",
    ],
    data: [
      "convert mb to gb for file size",
      "internet speed converter mbps to gbps",
      "convert gb to tb for hard drive",
      "file size converter bytes to kb mb gb",
      "convert video size mb to gb online",
      "download time calculator mbps file size",
      "convert kilobits to kilobytes data",
      "icloud storage converter gb calculator",
      "convert bits to bytes networking",
      "data usage converter gb to mb daily",
    ],
    area: [
      "convert square meters to square feet",
      "acres to hectares for land",
      "convert square km to square miles",
      "room area converter sqm to sqft",
      "convert acres to square meters",
      "land area converter for real estate",
      "convert square yards to square meters",
      "floor area converter for tiles",
      "convert hectares to acres farming",
      "painting area converter calculator",
    ],
    time: [
      "convert hours to minutes calculator",
      "work hours converter decimal to hours minutes",
      "convert days to hours for project",
      "time zone converter with dst",
      "convert seconds to minutes hours",
      "convert weeks to months calculator",
      "convert military time to regular",
      "convert epoch timestamp to date",
      "age calculator years months days exact",
      "convert milliseconds to seconds minutes",
    ],
    energy: [
      "convert joules to calories food",
      "convert kwh to watts calculator",
      "convert calories to joules physics",
      "electricity bill converter kwh cost",
      "convert btu to kw for ac",
      "convert ev to joules for chemistry",
      "convert watt hours to kilowatt hours",
      "convert foot pounds to newton meters",
      "convert kilocalories to calories food",
      "solar panel output converter kwh",
    ],
    pressure: [
      "convert psi to bar for tires",
      "convert atm to pascal chemistry",
      "convert bar to psi pressure washer",
      "convert mmhg to atm for physics",
      "convert torr to pascal online",
      "tire pressure converter psi to bar",
      "convert kpa to psi for cars",
      "blood pressure converter mmhg to kpa",
      "convert inches of mercury to psi",
      "convert pascals to bar engineering",
    ],
  };

  return [...templates, ...(specific[categorySlug] || [])];
}

// Converter Long-Tail Keywords Generator
export function getConverterLongTailKeywords(
  fromUnit: string,
  toUnit: string,
  category: string
): string[] {
  const fromLower = fromUnit.toLowerCase();
  const toLower = toUnit.toLowerCase();
  const categoryLower = category.toLowerCase();

  return [
    // Direct conversion questions
    `how to convert ${fromLower} to ${toLower}`,
    `how many ${toLower} in a ${fromLower}`,
    `${fromLower} to ${toLower} conversion formula`,
    `${fromLower} to ${toLower} calculator free online`,
    `convert ${fromLower} to ${toLower} exact`,
    `${fromLower} to ${toLower} chart printable`,

    // Problem-based
    `convert ${fromLower} to ${toLower} for cooking`,
    `convert ${fromLower} to ${toLower} for ${categoryLower} project`,
    `${fromLower} to ${toLower} step by step`,
    `quick way to convert ${fromLower} to ${toLower}`,
    `convert ${fromLower} to ${toLower} without calculator`,

    // Accuracy focused
    `accurate ${fromLower} to ${toLower} converter`,
    `exact ${fromLower} to ${toLower} conversion`,
    `${fromLower} to ${toLower} precise calculator`,
    `convert ${fromLower} to ${toLower} decimal places`,

    // Comparison/Alternatives
    `what is ${fromLower} in ${toLower}`,
    `${fromLower} vs ${toLower} difference`,
    `is ${fromLower} bigger than ${toLower}`,
    `convert ${fromLower} to ${toLower} and back`,

    // Tool-specific
    `best ${fromLower} to ${toLower} converter online`,
    `free ${fromLower} to ${toLower} calculator`,
    `${fromLower} to ${toLower} converter no ads`,
    `instant ${fromLower} to ${toLower} conversion`,
  ];
}

// Calculator Long-Tail Keywords
export function getCalculatorLongTailKeywords(calculatorType: string): string[] {
  const templates: Record<string, string[]> = {
    "bmi": [
      "calculate bmi for adults free online",
      "what is my bmi calculator accurate",
      "bmi calculator for men women metric",
      "healthy bmi range calculator",
      "bmi calculator with age and gender",
      "calculate body mass index formula",
      "bmi calculator kg cm accurate",
      "bmi calculator pounds feet inches",
      "is my bmi healthy calculator",
      "bmi calculator for athletes muscle",
    ],
    "age": [
      "calculate exact age years months days",
      "how old am i calculator exact",
      "age calculator from date of birth",
      "calculate age for legal documents",
      "age difference calculator between two dates",
      "how many days old am i calculator",
      "age calculator for school enrollment",
      "calculate age in months calculator",
      "dog age calculator human years",
      "korean age calculator online",
    ],
    "percentage": [
      "how to calculate percentage increase",
      "percentage calculator for discounts",
      "what percent is this of that",
      "calculate percentage change year over year",
      "reverse percentage calculator online",
      "percentage difference between two numbers",
      "calculate tip percentage calculator",
      "percentage calculator for grades",
      "how to find percentage of a number",
      "percentage increase decrease calculator",
    ],
    "loan": [
      "loan payment calculator monthly",
      "how much loan can i afford",
      "car loan calculator with interest",
      "personal loan payment calculator",
      "loan interest calculator total cost",
      "compare loan rates calculator",
      "loan amortization schedule calculator",
      "early loan payoff calculator",
      "student loan repayment calculator",
      "home improvement loan calculator",
    ],
    "mortgage": [
      "mortgage calculator monthly payment",
      "how much house can i afford",
      "mortgage calculator with taxes insurance",
      "compare mortgage rates calculator",
      "mortgage payoff calculator extra payments",
      "refinance mortgage calculator savings",
      "mortgage amortization schedule calculator",
      "fha loan calculator with pmi",
      "va loan calculator monthly payment",
      "15 vs 30 year mortgage calculator",
    ],
  };

  return templates[calculatorType] || [
    `${calculatorType} calculator free online`,
    `best ${calculatorType} calculator accurate`,
    `how to calculate ${calculatorType}`,
    `${calculatorType} formula calculator`,
  ];
}

// Featured Snippet Optimization - Questions that appear as "People Also Ask"
export const FEATURED_SNIPPET_QUESTIONS = {
  length: [
    "How many cm in an inch?",
    "How many feet in a meter?",
    "How many km in a mile?",
    "How to convert inches to cm?",
    "What is 6 feet in cm?",
  ],
  weight: [
    "How many kg in a pound?",
    "How many grams in an ounce?",
    "How to convert kg to lbs?",
    "What is 70 kg in pounds?",
    "How many ounces in a pound?",
  ],
  temperature: [
    "How to convert celsius to fahrenheit?",
    "What is 180 celsius in fahrenheit?",
    "What is room temperature in celsius?",
    "How hot is 40 degrees celsius?",
    "What is 98.6 fahrenheit in celsius?",
  ],
  volume: [
    "How many ml in a cup?",
    "How many liters in a gallon?",
    "How many ounces in a liter?",
    "What is 500ml in cups?",
    "How many pints in a liter?",
  ],
  speed: [
    "How many kmh in mph?",
    "How to convert mph to kmh?",
    "What is 60 mph in kmh?",
    "How fast is mach 1?",
    "What is 100 kmh in mph?",
  ],
  data: [
    "How many MB in a GB?",
    "How many GB in a TB?",
    "How big is a terabyte?",
    "What is bigger MB or GB?",
    "How many kb in a mb?",
  ],
};

// Local SEO Keywords
export const LOCAL_SEO_KEYWORDS = [
  "unit converter usa",
  "unit converter uk",
  "metric to imperial converter uk",
  "unit converter europe",
  "measurement converter canada",
  "unit converter australia",
  "imperial to metric converter usa",
  "unit converter india",
];

// Seasonal/Trending Keywords
export const TRENDING_KEYWORDS = [
  "new year fitness converter kg lbs",
  "holiday cooking converter cups grams",
  "back to school measurement converter",
  "summer travel unit converter",
  "winter temperature converter",
];

// Generate JSON-LD Schema for better search visibility
export function generateFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// Breadcrumb Schema for all pages
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateBreadcrumbSchemaFromPaths(items: { name: string; path: string }[]) {
  return generateBreadcrumbSchema(
    items.map((item) => ({
      name: item.name,
      url: canonicalFromPath(item.path),
    }))
  );
}

// Organization Schema for credibility
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Convertaro",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "Free online unit converter with 500+ tools. Accurate, fast, and private.",
  sameAs: [
    "https://twitter.com/convertaro",
    "https://github.com/convertaro",
  ],
};

// WebSite Schema with Search
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: "Free online unit converter with 500+ accurate tools",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};
