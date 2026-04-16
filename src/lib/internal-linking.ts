import { calculatorCategories, calculatorCategoryBySlug } from "@/data/calculator-categories";
import { calculators, CalculatorDefinition, RelatedToolLink } from "@/data/calculators";
import { Category, Converter } from "@/types/converter";
import { canonicalConverters, canonicalizeConverterHref, dedupeCanonicalConverters } from "@/lib/converter-routing";

type RelatedConverterCard = {
  converter: Converter;
  reason: string;
};

export type HubSection = {
  category: Category;
  intro: string;
  converters: Converter[];
  calculators: CalculatorDefinition[];
};

export type CategoryHubSection = {
  title: string;
  description: string;
  converters: Converter[];
};

export type CategoryFeaturedConverter = {
  converter: Converter;
  reason: string;
};

export type CategoryHubIntro = {
  summary: string;
  actions: string[];
  featuredDescription: string;
  supportTitle: string;
  supportDescription: string;
  calculatorDescription?: string;
};

type CategoryHubConfig = {
  summary: string;
  actions: string[];
  featuredDescription: string;
  supportTitle: string;
  supportDescription: string;
  calculatorDescription?: string;
  featuredReasons?: Record<string, string>;
  sections?: Array<{
    title: string;
    description: string;
    converterSlugs: string[];
  }>;
};

const CATEGORY_PRIORITY_UNITS: Record<string, string[]> = {
  length: ["cm", "m", "inches", "feet", "km", "miles"],
  weight: ["kg", "lbs", "g", "oz"],
  temperature: ["C", "F", "K"],
  volume: ["ml", "L", "cups", "gal", "floz", "g"],
  area: ["sqm", "sqft", "acres", "hectares"],
  speed: ["kmh", "mph", "ms", "knots"],
  time: ["min", "hr", "day", "week"],
  data: ["MB", "GB", "TB", "KB"],
  energy: ["J", "cal", "kWh", "btu"],
  pressure: ["psi", "bar", "Pa", "atm"],
};

const HUB_CATEGORY_INTROS: Record<string, string> = {
  length: "Start here for everyday distance, height, and sizing conversions.",
  weight: "Useful for body weight, luggage, recipes, and shipping measurements.",
  temperature: "Covers the most common weather, cooking, and lab temperature conversions.",
  volume: "Helpful for liquid measurements in cooking, containers, and fuel planning.",
  speed: "Useful for driving, running, cycling, and travel speed comparisons.",
  data: "Popular storage and file-size conversions for downloads, devices, and cloud plans.",
};

const CATEGORY_FEATURED_SLUGS: Record<string, string[]> = {
  length: ["centimeters-to-inches", "centimeters-to-feet", "feet-to-centimeters", "kilometers-to-miles"],
  weight: ["kilograms-to-pounds", "pounds-to-kilograms", "grams-to-ounces"],
  temperature: ["celsius-to-fahrenheit", "fahrenheit-to-celsius", "celsius-to-kelvin"],
  volume: ["cups-to-grams", "grams-to-cups", "floz-to-ml", "cups-to-ml", "milliliters-to-cups"],
  speed: ["mph-to-km-h", "km-h-to-mph", "knots-to-mph"],
  data: ["megabytes-to-gigabytes", "gigabytes-to-megabytes", "gigabytes-to-terabytes"],
};

const CATEGORY_HUB_CONFIG: Record<string, CategoryHubConfig> = {
  length: {
    summary:
      "Convert height, distance, screen sizes, and project dimensions between metric and imperial units from one clean hub.",
    actions: [
      "Jump straight to popular paths like centimeters to inches, feet to centimeters, and kilometers to miles.",
      "Compare sizing, construction, travel, and everyday measurement units without hunting through a flat list.",
      "Open child converter pages with formulas, examples, and reference tables when you need a precise answer fast.",
    ],
    featuredDescription:
      "These length converters handle the unit pairs people use most for height, room dimensions, and distance checks.",
    supportTitle: "Why use this length hub",
    supportDescription:
      "Length questions usually start with a familiar pair, then expand into adjacent units. This page surfaces the strongest entry points first and keeps related measurement links grouped by task.",
    calculatorDescription:
      "BMI is the natural next step when you need to combine height and weight after converting measurements.",
    featuredReasons: {
      "centimeters-to-inches": "Common for height, clothing, and product dimensions across metric and imperial contexts.",
      "centimeters-to-feet": "Useful when a measurement starts in centimeters but needs a feet-based answer quickly.",
      "feet-to-centimeters": "Helpful for room sizes, height conversion, and international sizing.",
      "kilometers-to-miles": "A frequent travel and running conversion for distance planning.",
    },
    sections: [
      {
        title: "Height and Everyday Sizing",
        description: "Best starting points for body measurements, furniture dimensions, and product sizing.",
        converterSlugs: ["centimeters-to-inches", "centimeters-to-feet", "feet-to-centimeters", "inches-to-centimeters"],
      },
      {
        title: "Room and Project Measurements",
        description: "Useful when switching between metric plans and imperial tools on home, school, or job-site tasks.",
        converterSlugs: ["meters-to-feet", "feet-to-meters", "centimeters-to-feet"],
      },
      {
        title: "Distance and Travel",
        description: "Popular distance conversions for road trips, races, and route comparisons.",
        converterSlugs: ["kilometers-to-miles", "miles-to-kilometers"],
      },
    ],
  },
  weight: {
    summary:
      "Convert body weight, recipe quantities, luggage limits, and shipping measurements between metric and imperial units.",
    actions: [
      "Start with high-demand paths like kilograms to pounds, pounds to kilograms, and grams to ounces.",
      "Find the right converter for fitness tracking, kitchen prep, ecommerce listings, or parcel planning.",
      "Use child pages for formulas, worked examples, and quick conversion tables when exact numbers matter.",
    ],
    featuredDescription:
      "These weight converters cover the unit pairs most often used for health, food, and shipping tasks.",
    supportTitle: "Why use this weight hub",
    supportDescription:
      "Weight intent is often practical and task-driven. The page emphasizes the converters users reach for most, then supports deeper browsing with grouped links instead of one long wall of tools.",
    calculatorDescription:
      "BMI fits here because people often convert weight and height before checking body mass index.",
    featuredReasons: {
      "kilograms-to-pounds": "A go-to conversion for body weight, gym tracking, and international product specs.",
      "pounds-to-kilograms": "Useful when US measurements need a metric answer for travel, health, or forms.",
      "grams-to-ounces": "Helpful for cooking, packaging, and product labeling.",
      "ounces-to-grams": "Common for recipes and small packaged goods moving into metric units.",
    },
    sections: [
      {
        title: "Body Weight and Fitness",
        description: "Popular unit pairs for personal health tracking, gym plans, and medical forms.",
        converterSlugs: ["kilograms-to-pounds", "pounds-to-kilograms"],
      },
      {
        title: "Cooking and Portions",
        description: "Useful when recipes, serving sizes, and ingredient labels switch between systems.",
        converterSlugs: ["grams-to-ounces", "ounces-to-grams"],
      },
    ],
  },
  temperature: {
    summary:
      "Convert weather readings, oven temperatures, and science measurements across Celsius, Fahrenheit, and Kelvin.",
    actions: [
      "Use the most common temperature pairs first, including Celsius to Fahrenheit and Fahrenheit to Celsius.",
      "Find the right page for cooking, travel, forecasts, classroom work, or lab calculations.",
      "Open converter pages with formulas and reference tables when you need more than a one-off answer.",
    ],
    featuredDescription:
      "These temperature converters answer the most common weather, cooking, and scientific conversion needs.",
    supportTitle: "Why use this temperature hub",
    supportDescription:
      "Temperature searches are highly intent-driven, so the layout keeps the core scales near the top and groups related paths by everyday use case.",
    featuredReasons: {
      "celsius-to-fahrenheit": "The top choice for weather, travel, and recipe conversions between metric and US systems.",
      "fahrenheit-to-celsius": "Useful when US readings need a metric answer for school, science, or international travel.",
      "celsius-to-kelvin": "A practical bridge from everyday temperatures into science and engineering work.",
    },
    sections: [
      {
        title: "Weather and Everyday Use",
        description: "Fast answers for forecasts, travel planning, and daily temperature checks.",
        converterSlugs: ["celsius-to-fahrenheit", "fahrenheit-to-celsius"],
      },
      {
        title: "Science and Technical Work",
        description: "Use these when classroom, lab, or technical tasks require Kelvin-based values.",
        converterSlugs: ["celsius-to-kelvin"],
      },
    ],
  },
  volume: {
    summary:
      "Convert recipe amounts, drink sizes, container capacity, and liquid measurements across metric, US, and kitchen units.",
    actions: [
      "Start with the most useful household and cooking paths like cups to milliliters, liters to gallons, and milliliters to cups.",
      "Browse grouped links for kitchen prep, packaging, and larger liquid-capacity conversions.",
      "Open child pages for detailed formulas, examples, and quick tables when you need repeatable answers.",
    ],
    featuredDescription:
      "These volume converters are the strongest entry points for cooking, beverage, and container-size questions.",
    supportTitle: "Why use this volume hub",
    supportDescription:
      "Volume queries often branch into food prep, drink serving, and liquid storage. This hub keeps those intents separated so the right links surface faster.",
    featuredReasons: {
      "cups-to-grams": "Popular in recipe conversion when cup-based ingredients need a weight-based answer.",
      "grams-to-cups": "Useful for recipe planning when ingredients start in grams but need cup measurements.",
      "liters-to-gallons": "A common conversion for fuel, beverages, and larger liquid containers.",
      "milliliters-to-cups": "Helpful for recipe prep, nutrition labels, and drink portions.",
      "cups-to-milliliters": "Common for cooking and baking when recipes mix US cups and metric measurements.",
    },
    sections: [
      {
        title: "Kitchen and Recipe Prep",
        description: "Useful for baking, cooking, and ingredient prep across cups, milliliters, and grams.",
        converterSlugs: ["cups-to-grams", "grams-to-cups", "cups-to-milliliters", "milliliters-to-cups"],
      },
      {
        title: "Liquid Capacity",
        description: "Best for bottles, tanks, fuel, and larger container-size comparisons.",
        converterSlugs: ["liters-to-gallons", "gallons-to-liters", "liters-to-milliliters", "milliliters-to-liters"],
      },
    ],
  },
  area: {
    summary:
      "Compare land, floor-plan, and property measurements across square metric and imperial units.",
    actions: [
      "Use common paths for floor area, plots, and land-size comparisons.",
      "Jump from broad category browsing into the exact area converter you need.",
    ],
    featuredDescription: "These area converters are useful for property listings, room planning, and land measurement.",
    supportTitle: "Why use this area hub",
    supportDescription: "Area tasks often cluster around floor plans and land size, so the hub keeps those high-intent links visible first.",
    sections: [
      {
        title: "Property and Land",
        description: "Common for acreage, farmland, and listing comparisons.",
        converterSlugs: ["acres-to-hectares", "hectares-to-acres"],
      },
      {
        title: "Floor Plans and Rooms",
        description: "Useful when plans switch between square meters and square feet.",
        converterSlugs: ["square-meters-to-square-feet", "sqft-to-sqm"],
      },
    ],
  },
  speed: {
    summary:
      "Convert travel, driving, running, and marine speeds across mph, km/h, knots, and related units.",
    actions: [
      "Start with road-speed and pace comparisons used most often in travel and fitness.",
      "Use grouped links to move quickly between land and marine speed units.",
    ],
    featuredDescription: "These speed converters cover the most common road, race, and nautical unit pairs.",
    supportTitle: "Why use this speed hub",
    supportDescription: "Speed intent is usually contextual, so the page groups highway, training, and nautical links instead of mixing everything together.",
    sections: [
      {
        title: "Driving and Travel",
        description: "The most common speed conversions for road signs, vehicles, and route planning.",
        converterSlugs: ["mph-to-km-h", "km-h-to-mph"],
      },
      {
        title: "Marine Speed",
        description: "Useful when nautical speed needs to be compared with familiar land units.",
        converterSlugs: ["knots-to-mph"],
      },
    ],
  },
  time: {
    summary:
      "Convert everyday time spans for schedules, work logs, planning, and age-related calculations.",
    actions: [
      "Use quick paths for hours, minutes, days, and weeks.",
      "Move from simple time conversions into age or finance calculators when the task continues beyond unit changes.",
    ],
    featuredDescription: "These time converters support scheduling, planning, and duration comparisons.",
    supportTitle: "Why use this time hub",
    supportDescription: "Time searches often lead into other tasks, so the hub balances common duration links with relevant next-step calculators.",
    calculatorDescription:
      "Age and loan timing tools fit here because users often convert durations before working through dates or repayment terms.",
    sections: [
      {
        title: "Short Duration Conversions",
        description: "Useful for schedules, work logs, and study planning.",
        converterSlugs: ["hours-to-minutes", "minutes-to-hours", "days-to-hours", "weeks-to-days"],
      },
    ],
  },
  data: {
    summary:
      "Convert file sizes, storage capacity, and cloud-plan limits across MB, GB, TB, and related data units.",
    actions: [
      "Start with the file-size conversions used most often for downloads, storage, and hosting plans.",
      "Browse grouped links for practical storage comparisons instead of an undifferentiated list.",
    ],
    featuredReasons: {
      "megabytes-to-gigabytes": "Essential for measuring file sizes against cloud storage and device capacity.",
      "gigabytes-to-megabytes": "Useful when larger storage quotas need to be broken down into individual file sizes.",
      "gigabytes-to-terabytes": "Common for high-capacity external drives and professional server storage planning.",
    },
    featuredDescription: "These data converters answer the storage questions users search most often.",
    supportTitle: "Why use this data hub",
    supportDescription: "Data intent is usually practical and comparison-based, so the hub keeps the most requested storage thresholds near the top.",
    sections: [
      {
        title: "Storage Basics",
        description: "Useful for downloads, devices, and cloud-plan comparisons.",
        converterSlugs: ["megabytes-to-gigabytes", "gigabytes-to-megabytes", "gigabytes-to-terabytes"],
      },
    ],
  },
  energy: {
    summary:
      "Convert energy values for nutrition, utility use, and technical comparisons across common energy units.",
    actions: [
      "Find the right converter for calories, joules, and other energy measurements.",
      "Use a structured hub to move from common energy checks into more specific unit pages.",
    ],
    featuredDescription: "These energy converters support food, power, and technical unit comparisons.",
    supportTitle: "Why use this energy hub",
    supportDescription: "Energy tasks often span nutrition and technical contexts, so the hub keeps practical entry points visible without adding extra content weight.",
  },
  pressure: {
    summary:
      "Convert tire, weather, industrial, and scientific pressure readings across PSI, bar, atm, and related units.",
    actions: [
      "Start with common pressure conversions used in automotive, technical, and lab contexts.",
      "Use grouped links to find the correct pressure scale faster.",
    ],
    featuredDescription: "These pressure converters cover the unit pairs most often used in automotive and technical work.",
    supportTitle: "Why use this pressure hub",
    supportDescription: "Pressure searches are usually precision-oriented, so the page highlights the strongest working-unit combinations first.",
    sections: [
      {
        title: "Automotive and Workshop",
        description: "Useful for tires, tools, and equipment settings.",
        converterSlugs: ["psi-to-bar", "bar-to-psi", "atm-to-psi"],
      },
    ],
  },
};

const CALCULATOR_LINK_STRATEGY: Record<string, RelatedToolLink[]> = {
  "bmi-calculator": [
    { href: "/weight/kilograms-to-pounds", label: "Kilograms to Pounds Converter" },
    { href: "/length/centimeters-to-feet", label: "Centimeters to Feet Converter" },
    { href: "/percentage-calculator", label: "Percentage Calculator" },
  ],
  "age-calculator": [
    { href: "/time/days-to-hours", label: "Days to Hours Converter" },
    { href: "/time/weeks-to-days", label: "Weeks to Days Converter" },
    { href: "/loan-calculator", label: "Loan Calculator" },
  ],
  "percentage-calculator": [
    { href: "/loan-calculator", label: "Loan Calculator" },
    { href: "/mortgage-calculator", label: "Mortgage Calculator" },
    { href: "/bmi-calculator", label: "BMI Calculator" },
  ],
  "loan-calculator": [
    { href: "/mortgage-calculator", label: "Mortgage Calculator" },
    { href: "/percentage-calculator", label: "Percentage Calculator" },
    { href: "/age-calculator", label: "Age Calculator" },
  ],
  "mortgage-calculator": [
    { href: "/loan-calculator", label: "Loan Calculator" },
    { href: "/percentage-calculator", label: "Percentage Calculator" },
    { href: "/age-calculator", label: "Age Calculator" },
  ],
};

function scoreConverterRelationship(source: Converter, candidate: Converter): number {
  if (source.id === candidate.id) {
    return -1;
  }

  let score = 0;

  if (source.category === candidate.category) {
    score += 10;
  }

  if (source.fromUnit === candidate.toUnit && source.toUnit === candidate.fromUnit) {
    score += 100;
  }

  if (source.relatedConverters.includes(candidate.id)) {
    score += 45;
  }

  if (source.fromUnit === candidate.fromUnit) {
    score += 32;
  }

  if (source.toUnit === candidate.toUnit) {
    score += 28;
  }

  if (source.fromUnit === candidate.toUnit) {
    score += 22;
  }

  if (source.toUnit === candidate.fromUnit) {
    score += 18;
  }

  return score;
}

export function getStrategicRelatedConverters(converter: Converter, converters: Converter[]): Converter[] {
  return dedupeCanonicalConverters(
    converters
      .map((candidate) => ({ converter: candidate, score: scoreConverterRelationship(converter, candidate) }))
      .filter((item) => item.score > 0)
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        return left.converter.title.localeCompare(right.converter.title);
      })
      .map((item) => item.converter)
  ).slice(0, 6);
}

export function getRelatedConverterCards(converter: Converter, converters: Converter[]): RelatedConverterCard[] {
  return getStrategicRelatedConverters(converter, converters).map((item) => {
    if (converter.fromUnit === item.toUnit && converter.toUnit === item.fromUnit) {
      return {
        converter: item,
        reason: `Reverse direction for ${converter.toUnit} back to ${converter.fromUnit}.`,
      };
    }

    if (converter.fromUnit === item.fromUnit) {
      return {
        converter: item,
        reason: `Uses the same ${converter.fromUnit} starting unit for a nearby comparison.`,
      };
    }

    if (converter.toUnit === item.toUnit) {
      return {
        converter: item,
        reason: `Ends in ${converter.toUnit}, so it helps when different source units need the same target unit.`,
      };
    }

    return {
      converter: item,
      reason: `Closely related ${converter.category} conversion often used in the same workflow.`,
    };
  });
}

export function getCategoryFeaturedConverters(category: Category, converters: Converter[]) {
  const priorityUnits = CATEGORY_PRIORITY_UNITS[category.slug] ?? [];
  const featuredSlugs = new Set(CATEGORY_FEATURED_SLUGS[category.slug] ?? []);

  return converters
    .filter((converter) => converter.category === category.slug)
    .map((converter) => {
      let score = 0;
      if (priorityUnits.includes(converter.fromUnit)) {
        score += 20;
      }
      if (priorityUnits.includes(converter.toUnit)) {
        score += 18;
      }
      if (converter.fromUnit === converter.toUnit) {
        score -= 100;
      }
      if (featuredSlugs.has(converter.metadata.slug)) {
        score += 50;
      }
      score += converter.relatedConverters.length;

      return { converter, score };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.converter.title.localeCompare(right.converter.title);
    })
    .slice(0, 6)
    .map((item) => item.converter);
}

export function getCategoryHubIntro(category: Category): CategoryHubIntro {
  const config = CATEGORY_HUB_CONFIG[category.slug];

  if (config) {
    return {
      summary: config.summary,
      actions: config.actions,
      featuredDescription: config.featuredDescription,
      supportTitle: config.supportTitle,
      supportDescription: config.supportDescription,
      calculatorDescription: config.calculatorDescription,
    };
  }

  return {
    summary: category.description,
    actions: [
      `Browse the most useful ${category.name.toLowerCase()} converters first, then open a child page for formulas and tables.`,
      `Use this category hub to compare common ${category.name.toLowerCase()} units without scanning a flat list.`,
    ],
    featuredDescription: `Popular ${category.name.toLowerCase()} converters appear first so the strongest entry points are easy to spot.`,
    supportTitle: `Why use this ${category.name.toLowerCase()} hub`,
    supportDescription: `This page organizes the category so related ${category.name.toLowerCase()} tools are easier to explore and stronger pages pass support to the rest of the silo.`,
  };
}

export function getCategoryFeaturedConverterCards(category: Category, converters: Converter[]): CategoryFeaturedConverter[] {
  const config = CATEGORY_HUB_CONFIG[category.slug];
  const reasons = config?.featuredReasons ?? {};

  return getCategoryFeaturedConverters(category, converters).map((converter) => ({
    converter,
    reason:
      reasons[converter.metadata.slug] ??
      `Helpful when you need to convert ${converter.fromUnit} to ${converter.toUnit} with formula and table support.`,
  }));
}

export function getCategoryHubSections(category: Category, converters: Converter[]): CategoryHubSection[] {
  const bySlug = new Map(
    converters
      .filter((converter) => converter.category === category.slug)
      .map((converter) => [converter.metadata.slug, converter] as const)
  );

  const configuredSections = (CATEGORY_HUB_CONFIG[category.slug]?.sections ?? [])
    .map((section) => ({
      title: section.title,
      description: section.description,
      converters: section.converterSlugs
        .map((slug) => bySlug.get(slug))
        .filter((converter): converter is Converter => Boolean(converter)),
    }))
    .filter((section) => section.converters.length > 0);

  if (configuredSections.length > 0) {
    return configuredSections;
  }

  const featured = getCategoryFeaturedConverters(category, converters).slice(0, 4);

  if (featured.length === 0) {
    return [];
  }

  return [
    {
      title: `Popular ${category.name} Paths`,
      description: `Start with the ${category.name.toLowerCase()} unit pairs users reach for most often.`,
      converters: featured,
    },
  ];
}

export function getCategorySupportLinks(category: Category, converters: Converter[]) {
  const featured = getCategoryFeaturedConverters(category, converters);

  return featured.slice(0, 3).map((converter) => ({
    href: `/${converter.category}/${converter.metadata.slug}`,
    label: converter.title,
  }));
}

export function getRelevantCalculatorLinks(currentSlug?: string, contextCategory?: string) {
  const categoryFiltered = contextCategory
    ? calculators.filter((calculator) => calculator.category === contextCategory && calculator.slug !== currentSlug)
    : [];

  const fallback = calculators.filter((calculator) => calculator.slug !== currentSlug);
  return (categoryFiltered.length > 0 ? categoryFiltered : fallback).slice(0, 4);
}

export function getCalculatorStrategicLinks(calculator: CalculatorDefinition): RelatedToolLink[] {
  const direct = CALCULATOR_LINK_STRATEGY[calculator.slug] ?? calculator.relatedTools;
  const relatedCategory = calculatorCategoryBySlug.get(calculator.category);

  const links = [
    ...(relatedCategory ? [{ href: `/calculators/${relatedCategory.slug}`, label: `${relatedCategory.name}` }] : []),
    ...direct,
  ].map((link) => ({
    ...link,
    href: link.href.includes("/") && link.href.split("/").length > 2 ? canonicalizeConverterHref(link.href) : link.href,
  }));

  const seen = new Set<string>();
  return links.filter((link) => {
    if (seen.has(link.href) || link.href === `/${calculator.slug}`) {
      return false;
    }
    seen.add(link.href);
    return true;
  }).slice(0, 4);
}

export function getCalculatorContextSentence(calculator: CalculatorDefinition): string | null {
  const links = getCalculatorStrategicLinks(calculator).slice(0, 2);

  if (links.length === 0) {
    return null;
  }

  const intro = calculator.category === "finance"
    ? "Often paired with"
    : calculator.category === "health"
      ? "Often used alongside"
      : "People also use";

  return `${intro}`;
}

export function getCategoryCalculatorLinks(categorySlug: string): CalculatorDefinition[] {
  const mapping: Record<string, string[]> = {
    length: ["bmi-calculator"],
    weight: ["bmi-calculator"],
    time: ["age-calculator", "loan-calculator"],
    data: ["percentage-calculator"],
  };

  const desired = mapping[categorySlug] ?? [];
  const lookup = new Set(desired);
  return calculators.filter((calculator) => lookup.has(calculator.slug)).slice(0, 2);
}

export function getPopularHubSections(categories: Category[], converters: Converter[]): HubSection[] {
  const preferredOrder = ["length", "weight", "temperature", "volume", "speed", "data"];

  return preferredOrder
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter((category): category is Category => Boolean(category))
    .map((category) => ({
      category,
      intro: HUB_CATEGORY_INTROS[category.slug] ?? category.description,
      converters: getCategoryFeaturedConverters(category, converters).slice(0, 4),
      calculators: getCategoryCalculatorLinks(category.slug),
    }))
    .filter((section) => section.converters.length > 0);
}

export const allCanonicalConverters = canonicalConverters as Converter[];
export const allCalculatorCategories = calculatorCategories;
