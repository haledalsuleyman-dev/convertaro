import { Category, Converter, FAQItem } from "@/types/converter";
import { dedupeCanonicalConverters, getCanonicalConverter, getCanonicalConverterById } from "@/lib/converter-routing";
import { getStrategicRelatedConverters } from "@/lib/internal-linking";
import { getPriorityConverterContent } from "@/lib/priority-pages";
import { getConverterLongTailKeywords } from "@/lib/seo";

type LinkRecommendation = {
  converter: Converter;
  reason: string;
};

type ContentLink = {
  href: string;
  label: string;
};

type IntroContent = {
  eyebrow: string;
  summary: string;
  intent: string;
  links: ContentLink[];
};

type FormulaContent = {
  explanation: string;
  note: string;
  reverseNote: string;
};

type StepContent = {
  title: string;
  body: string;
};

type ExampleContent = {
  title: string;
  description: string;
};

const SPECIAL_CONVERTER_SUMMARIES: Record<string, string> = {
  "cups-to-grams": "Convert US cups to grams for water with the formula, practical examples, and a quick kitchen reference table.",
  "grams-to-cups": "Convert grams to US cups for water with the formula, practical examples, and a quick kitchen reference table.",
};

const SPECIAL_CONVERTER_NOTES: Record<string, string> = {
  "cups-to-grams": "This page uses US cups and a water-equivalent assumption. Ingredient weights vary, so flour, sugar, butter, and other ingredients will not match the same gram value.",
  "grams-to-cups": "This page uses US cups and a water-equivalent assumption. Ingredient weights vary, so the same gram value can fill a different number of cups depending on the ingredient.",
};

const UNIT_NAMES: Record<string, string> = {
  cm: "centimeters",
  mm: "millimeters",
  m: "meters",
  km: "kilometers",
  inches: "inches",
  feet: "feet",
  yards: "yards",
  miles: "miles",
  nmi: "nautical miles",
  kg: "kilograms",
  g: "grams",
  mg: "milligrams",
  lbs: "pounds",
  oz: "ounces",
  t: "metric tons",
  st: "stones",
  C: "Celsius",
  F: "Fahrenheit",
  K: "Kelvin",
  L: "liters",
  ml: "milliliters",
  gal: "gallons",
  cups: "cups",
  pt: "pints",
  qt: "quarts",
  floz: "fluid ounces",
  sec: "seconds",
  min: "minutes",
  hr: "hours",
  day: "days",
  week: "weeks",
  month: "months",
  year: "years",
  B: "bytes",
  KB: "kilobytes",
  MB: "megabytes",
  GB: "gigabytes",
  TB: "terabytes",
  bits: "bits",
  sqm: "square meters",
  sqft: "square feet",
  acres: "acres",
  hectares: "hectares",
  sqkm: "square kilometers",
  sqmi: "square miles",
  kmh: "kilometers per hour",
  mph: "miles per hour",
  ms: "meters per second",
  knots: "knots",
  mach: "Mach",
  J: "joules",
  cal: "calories",
  kWh: "kilowatt-hours",
  eV: "electronvolts",
  btu: "BTU",
  Pa: "pascals",
  bar: "bar",
  psi: "psi",
  atm: "atmospheres",
  torr: "torr",
};

const UNIT_EXPLANATIONS: Record<string, string> = {
  cm: "Centimeters are metric length units used for body measurements, product dimensions, and everyday sizing.",
  inches: "Inches are imperial length units commonly used for screen sizes, construction, and product specs.",
  m: "Meters are the SI base unit for length and are widely used in science, engineering, and mapping.",
  km: "Kilometers measure longer travel and distance values in most metric-based countries.",
  mm: "Millimeters are used for precise dimensions in engineering, manufacturing, and technical drawings.",
  feet: "Feet are common in construction, architecture, and height references in imperial systems.",
  miles: "Miles are used for road distances and travel planning in countries using imperial units.",
  kg: "Kilograms are the SI base unit for mass and are standard for shipping, health, and science.",
  lbs: "Pounds are widely used in body weight, fitness, and product labeling in imperial markets.",
  C: "Celsius is the most common temperature scale worldwide for weather and everyday measurements.",
  F: "Fahrenheit is commonly used in the US for weather forecasts and household temperature settings.",
  K: "Kelvin is the SI thermodynamic temperature scale used in physics and engineering.",
  L: "Liters are standard metric volume units used for liquids, fuel, and capacity labels.",
  gal: "Gallons are common for fuel, liquids, and tank capacities in imperial systems.",
  MB: "Megabytes represent data size and are commonly used for files, downloads, and storage metrics.",
  GB: "Gigabytes represent larger data sizes for apps, media files, and storage plans.",
  TB: "Terabytes are used for high-capacity drives, backups, and large datasets.",
  min: "Minutes are time units used for schedules, durations, and performance tracking.",
  hr: "Hours are used to express work time, travel time, and event durations.",
  kmh: "Kilometers per hour is a standard speed unit for road transport in metric regions.",
  mph: "Miles per hour is a standard speed unit for road transport in imperial regions.",
};

const CATEGORY_USE_CASES: Record<string, string[]> = {
  length: ["height and body measurement checks", "room dimensions and home renovation planning", "travel route and map distance comparisons"],
  weight: ["body weight tracking and health forms", "shipping and parcel weight labels", "recipe and nutritional ingredient measurements"],
  temperature: ["daily weather and travel forecasts", "oven and cooking temperature settings", "science, lab, and engineering references"],
  volume: ["cooking recipes and kitchen measurements", "fuel tank and container capacity comparisons", "aquarium, pool, and liquid storage planning"],
  area: ["property listings and floor plan readings", "flooring, tiling, and paint coverage estimates", "agricultural field sizing and map analysis"],
  speed: ["road sign and vehicle speed limit checks", "GPS and navigation between imperial and metric", "running pace and athletic performance comparisons"],
  time: ["project scheduling and deadline planning", "work hour and billing log conversions", "scientific duration and interval calculations"],
  data: ["file download size and storage quota checks", "cloud backup plan and device capacity comparisons", "network transfer rate and data cap budgeting"],
  energy: ["electricity bill and utility consumption tracking", "food calorie and nutritional energy comparisons", "engineering and thermal energy calculations"],
  pressure: ["tire inflation and mechanical pressure checks", "industrial process control readings", "weather station and altitude measurement conversions"],
};

const CATEGORY_EXAMPLE_CONTEXTS: Record<string, ExampleContent[]> = {
  length: [
    { title: "Height and body measurements", description: "Useful when a doctor's record, passport form, or fitness profile lists height in one system and you need the equivalent in the other." },
    { title: "Home improvement and renovation", description: "Helpful for furniture dimensions, wall spacing, countertop measurements, and room layouts that mix metric and imperial units." },
    { title: "Travel, mapping, and navigation", description: "Good for comparing route distances, GPS readings, and geographic measurements when switching between metric and imperial maps." },
  ],
  weight: [
    { title: "Body weight and fitness goals", description: "Common when a gym tracker, health app, or doctor's scale shows weight in a different unit than your usual reference." },
    { title: "Shipping, luggage, and parcels", description: "Helpful for airline baggage limits, international shipping labels, and postal service weight requirements." },
    { title: "Cooking, recipes, and nutrition", description: "Useful when ingredient amounts, supplement serving sizes, or food packaging show grams, ounces, and pounds in the same document." },
  ],
  temperature: [
    { title: "Weather forecasts and travel", description: "Essential when a weather app, travel guide, or climate report shows temperatures in a scale that is unfamiliar to you." },
    { title: "Cooking, baking, and food safety", description: "Useful when a recipe calls for a specific oven temperature or safe cooking temperature in Fahrenheit or Celsius." },
    { title: "Science, engineering, and lab work", description: "Important when equipment, research notes, or technical standards express temperature differently from your calculation tool." },
  ],
  volume: [
    { title: "Cooking, baking, and recipe scaling", description: "Useful when a recipe mixes cups, fluid ounces, milliliters, and liters from different regional measurement traditions." },
    { title: "Fuel, tanks, and storage capacity", description: "Helpful for comparing tank sizes, container volumes, and fuel quantities expressed in liters versus gallons." },
    { title: "Lab measurements and pharmacy", description: "Important when dosage instructions, chemical preparations, or medical quantities switch between metric and US volume units." },
  ],
  area: [
    { title: "Property listings and real estate", description: "Useful when floor plans, land sizes, or property listings show square footage versus square meters or acres versus hectares." },
    { title: "Renovation, flooring, and materials", description: "Helpful for estimating paint, flooring, tile, and landscaping materials when room dimensions use different area units." },
    { title: "Agriculture, surveying, and mapping", description: "Important for field measurements, survey reports, and GIS overlays that cross regional unit boundaries." },
  ],
  speed: [
    { title: "Driving, road signs, and car dashboards", description: "Useful when traveling between mph and km/h countries where speed limits, speedometers, and GPS apps use different units." },
    { title: "Running, cycling, and fitness pace", description: "Helpful for comparing treadmill speeds, training paces, and race finish times across imperial and metric training plans." },
    { title: "Aviation, marine, and technical navigation", description: "Important when aircraft or nautical references switch between knots, mph, and km/h in the same document or instrument." },
  ],
  time: [
    { title: "Project scheduling and deadlines", description: "Useful when a timeline uses different time units than the reporting format or billing system requires." },
    { title: "Work hours, billing, and logging", description: "Helpful for translating hours worked, session durations, and time logs between minutes, hours, and days." },
    { title: "Scientific experiments and intervals", description: "Important when reaction times, observation periods, or measurement windows span from seconds to longer durations." },
  ],
  data: [
    { title: "Downloads, uploads, and file transfers", description: "Useful when a file size is shown in MB but your storage device or quota is measured in GB, or when comparing transfer speeds." },
    { title: "Cloud storage and device capacity", description: "Helpful for comparing phone storage plans, cloud backup quotas, and hard drive capacities that mix MB, GB, and TB." },
    { title: "Technical specs and planning", description: "Important when server RAM, database sizes, or network infrastructure specs express capacity in different data units." },
  ],
  energy: [
    { title: "Electricity bills and appliance labels", description: "Useful when energy consumption on a power bill, appliance spec, or smart meter uses a different unit than your calculation." },
    { title: "Food and nutrition labeling", description: "Helpful when caloric content is listed in kilocalories (kcal), calories (cal), or joules across different sources." },
    { title: "Engineering, science, and thermal work", description: "Important when heat, work, or energy calculations involve BTU, joules, kilowatt-hours, or other energy standards." },
  ],
  pressure: [
    { title: "Tire inflation and vehicle maintenance", description: "Useful when a tire manual lists PSI but a pump gauge shows bar or kPa, or when inflating while abroad." },
    { title: "Industrial pumps, tanks, and systems", description: "Helpful for machinery specs, pressure vessel ratings, and process control readings that use different pressure standards." },
    { title: "Weather, altitude, and barometric readings", description: "Important when comparing atmospheric pressure measurements from different instruments or regional weather services." },
  ],
};

const CATEGORY_MISTAKES: Record<string, string[]> = {
  temperature: [
    "Applying a simple multiply-only factor to temperature conversions (offset is also required).",
    "Rounding too early before finishing calculations.",
    "Confusing absolute temperature (Kelvin) with relative scales (Celsius/Fahrenheit).",
  ],
  data: [
    "Mixing decimal and binary data assumptions without checking context.",
    "Confusing bits and bytes in transfer or storage estimates.",
    "Ignoring unit case, which changes meaning in some tools.",
  ],
};

function unitName(unit: string): string {
  return UNIT_NAMES[unit] ?? unit;
}

function unitExplanation(unit: string, categoryName: string): string {
  return (
    UNIT_EXPLANATIONS[unit] ??
    `${unitName(unit)} are used in ${categoryName.toLowerCase()} calculations and technical references.`
  );
}

function toSentenceList(values: string[]): string {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`;
  }

  return `${values.slice(0, -1).join(", ")}, and ${values[values.length - 1]}`;
}

function compactNumber(value: number): string {
  const abs = Math.abs(value);

  if (abs === 0) {
    return "0";
  }

  if (abs >= 1000 || abs < 0.001) {
    return value.toExponential(4).replace(/\.?0+e/, "e");
  }

  return Number(value.toFixed(6)).toString();
}

function parseFormula(converter: Converter): { factor?: number; isDirect: boolean; operation?: "multiply" | "divide" } {
  const expression = converter.formula.split("=")[1] ?? "";
  const multiplyMatch = expression.match(/[×x*]\s*([-+]?\d*\.?\d+(?:e[-+]?\d+)?)/i);
  const divideMatch = expression.match(/[÷/]\s*([-+]?\d*\.?\d+(?:e[-+]?\d+)?)/i);

  return {
    factor: multiplyMatch ? Number(multiplyMatch[1]) : divideMatch ? Number(divideMatch[1]) : undefined,
    operation: multiplyMatch ? "multiply" : divideMatch ? "divide" : undefined,
    isDirect: !/[+-]\s*\d/.test(expression),
  };
}

function selectContextualSentence(category: Category): string {
  const useCases = CATEGORY_USE_CASES[category.slug] ?? [];
  return useCases.length > 0
    ? `People usually search for this when working on ${toSentenceList(useCases.slice(0, 3))}.`
    : `People usually search for this when values need to move cleanly between two unit systems.`;
}

export function getReverseConverter(converter: Converter, converters: Converter[]): Converter | undefined {
  const reverseConverter = converters.find(
    (item) =>
      item.category === converter.category &&
      item.fromUnit === converter.toUnit &&
      item.toUnit === converter.fromUnit
  );

  return reverseConverter ? getCanonicalConverter(reverseConverter) : undefined;
}

export function getContextualRelatedConverters(converter: Converter, converters: Converter[]): Converter[] {
  const lookup = new Map(converters.map((item) => [item.id, item]));
  const directRelated = dedupeCanonicalConverters(
    converter.relatedConverters
      .map((id) => lookup.get(id) ?? getCanonicalConverterById(id))
      .filter((item): item is Converter => Boolean(item))
  );

  const strategic = getStrategicRelatedConverters(converter, converters);
  return dedupeCanonicalConverters([...directRelated, ...strategic]).slice(0, 3);
}

export function getIntroContent(
  converter: Converter,
  category: Category,
  reverseConverter?: Converter,
  contextualLinks: Converter[] = []
): IntroContent {
  const from = unitName(converter.fromUnit);
  const to = unitName(converter.toUnit);
  const priority = getPriorityConverterContent(converter);
  const links: ContentLink[] = [];

  if (reverseConverter) {
    links.push({
      href: `/${reverseConverter.category}/${reverseConverter.metadata.slug}`,
      label: `convert ${to} to ${from}`,
    });
  }

  for (const item of contextualLinks.slice(0, 2)) {
    links.push({
      href: `/${item.category}/${item.metadata.slug}`,
      label: item.title.replace(/ Converter$/i, ""),
    });
  }

  const topKeyword = getConverterLongTailKeywords(converter.fromUnit, converter.toUnit, category.slug)[0] ?? `convert ${from} to ${to}`;

  return {
    eyebrow: `${from} to ${to} converter`,
    summary:
      priority?.summary ??
      SPECIAL_CONVERTER_SUMMARIES[converter.id] ??
      `Looking for ${topKeyword}? Convert ${from} to ${to} instantly. Understand the formula, review clear examples, and check a quick reference table for common values.`,
    intent: priority?.intent ?? selectContextualSentence(category),
    links,
  };
}

export function getFormulaContent(converter: Converter): FormulaContent {
  const { factor, isDirect, operation } = parseFormula(converter);
  const from = unitName(converter.fromUnit);
  const to = unitName(converter.toUnit);
  const priority = getPriorityConverterContent(converter);

  if (converter.category === "temperature") {
    return {
      explanation: `${from} to ${to} is not a simple one-number conversion. The formula changes both the scale and the starting point, so the offset matters as much as the multiplier.`,
      note: `Use the full formula exactly as written to avoid errors, especially around freezing, boiling, or negative temperatures.`,
      reverseNote: `For the reverse direction, apply the matching reverse formula instead of trying to divide the original equation.`,
    };
  }

  if (SPECIAL_CONVERTER_NOTES[converter.id]) {
    return {
      explanation: `Use the formula exactly as shown to convert between ${from} and ${to} on a water-equivalent basis.`,
      note: SPECIAL_CONVERTER_NOTES[converter.id],
      reverseNote: `If you need the reverse direction, use the paired converter and keep the same water-based assumption.`,
    };
  }

  if (factor !== undefined && isDirect) {
    const explanation = operation === "divide"
      ? `Take the value in ${from}, divide it by ${compactNumber(factor)}, and the result is the same amount in ${to}.`
      : `Take the value in ${from}, multiply it by ${compactNumber(factor)}, and the result is the same amount in ${to}.`;
    const note = operation === "divide"
      ? `This works because ${compactNumber(factor)} ${from} equal 1 ${to}. Keep extra decimals if you need higher precision.`
      : `This works because each ${converter.fromUnit} equals ${compactNumber(factor)} ${converter.toUnit}. Keep extra decimals if you need higher precision.`;

    return {
      explanation,
      note: priority?.note ?? note,
      reverseNote: `To go the other way, use the reverse formula so the unit relationship stays exact.`,
    };
  }

  return {
    explanation: `Start with the value in ${from} and apply the formula exactly to get the matching value in ${to}.`,
    note:
      priority?.note ??
      `If you are converting several numbers, keep the same formula and rounding method across all of them for consistent results.`,
    reverseNote: `Use the reverse formula for ${to} back to ${from}.`,
  };
}

export function getConversionSteps(converter: Converter): StepContent[] {
  const from = unitName(converter.fromUnit);
  const to = unitName(converter.toUnit);

  if (SPECIAL_CONVERTER_NOTES[converter.id]) {
    return [
      {
        title: `Start with the ${from} amount`,
        body: `Enter the value you have, then confirm that a water-based conversion is appropriate for what you are measuring.`,
      },
      {
        title: `Apply the converter formula`,
        body: `Use ${converter.formula} to estimate the matching ${to} value for water or water-like liquids.`,
      },
      {
        title: `Adjust if the ingredient is different`,
        body: `For flour, sugar, butter, and similar ingredients, use the ingredient-specific weight if precision matters because density changes the result.`,
      },
    ];
  }

  return [
    {
      title: `Start with the ${from} value`,
      body: `Enter the amount you already have in ${converter.fromUnit}. Double-check the source unit first so you are converting the right number.`,
    },
    {
      title: `Apply the ${from} to ${to} formula`,
      body: `Use ${converter.formula} or let the converter calculate it instantly. This gives you the equivalent value in ${converter.toUnit}.`,
    },
    {
      title: `Round for your use case`,
      body: `Use more decimals for science, billing, or engineering. For everyday use, round only after the full conversion is done.`,
    },
  ];
}

export function getExampleContext(converter: Converter, category: Category, index: number): ExampleContent {
  const contexts = CATEGORY_EXAMPLE_CONTEXTS[category.slug] ?? [
    { title: "Everyday use", description: `A practical reference point for comparing ${converter.fromUnit} and ${converter.toUnit}.` },
  ];

  return contexts[index % contexts.length];
}

export function getRelatedConverterRecommendations(
  converter: Converter,
  contextualLinks: Converter[],
  reverseConverter?: Converter
): LinkRecommendation[] {
  const recommendations: LinkRecommendation[] = [];
  const seen = new Set<string>([`${converter.category}/${converter.metadata.slug}`]);

  const pushRecommendation = (item: Converter | undefined, reason: string) => {
    if (!item) {
      return;
    }

    const key = `${item.category}/${item.metadata.slug}`;
    if (seen.has(key)) {
      return;
    }

    seen.add(key);
    recommendations.push({ converter: item, reason });
  };

  pushRecommendation(reverseConverter, `Best if you need the reverse direction from ${converter.toUnit} back to ${converter.fromUnit}.`);

  for (const item of contextualLinks) {
    const reason = item.fromUnit === converter.fromUnit
      ? `Useful if you are comparing the same ${converter.fromUnit} value in another unit.`
      : item.toUnit === converter.toUnit
        ? `Helpful when different source units need to end in ${converter.toUnit}.`
        : `Relevant follow-up conversion for nearby ${converter.category} tasks.`;

    pushRecommendation(item, reason);
  }

  return recommendations.slice(0, 6);
}

export function buildConverterFaq(
  converter: Converter,
  category: Category,
  reverseConverter?: Converter
): FAQItem[] {
  const from = unitName(converter.fromUnit);
  const to = unitName(converter.toUnit);
  const useCases = CATEGORY_USE_CASES[category.slug] ?? [];
  const reverseHint = reverseConverter
    ? `For the reverse direction, use the ${reverseConverter.title} page.`
    : `Use the swap direction for the reverse conversion from ${to} to ${from}.`;

  // Use hand-written priority FAQs when available — much higher quality than the template.
  const priorityContent = getPriorityConverterContent(converter);
  if (priorityContent?.faqs && priorityContent.faqs.length > 0) {
    const priorityFaqs: FAQItem[] = priorityContent.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
      keywords: faq.keywords,
    }));
    // Always append a reverse converter link as a final FAQ for crawlability.
    priorityFaqs.push({
      question: `How do I convert ${to} back to ${from}?`,
      answer: reverseHint,
      keywords: [`${converter.toUnit} to ${converter.fromUnit}`],
    });
    return priorityFaqs;
  }

  if (SPECIAL_CONVERTER_NOTES[converter.id]) {
    return [
      {
        question: `Is ${from} to ${to} exact for every ingredient?`,
        answer: `No. This page uses a water-equivalent assumption. Different ingredients have different densities, so the same cup value can weigh more or less in grams.`,
        keywords: [`${converter.fromUnit} to ${converter.toUnit} ingredient difference`],
      },
      {
        question: `When is this ${from} to ${to} conversion useful?`,
        answer: `It is useful for water, water-like liquids, and rough kitchen estimates when you need a quick volume-to-weight comparison.`,
        keywords: [`${converter.fromUnit} to ${converter.toUnit} cooking`],
      },
      {
        question: `What formula should I use for ${converter.fromUnit} to ${converter.toUnit}?`,
        answer: `Use ${converter.formula}. For the reverse direction, use ${converter.inverseFormula}.`,
        keywords: [`${converter.fromUnit} to ${converter.toUnit} formula`],
      },
      {
        question: `Why do recipe charts show different values?`,
        answer: `Recipe charts often use ingredient-specific densities. A cup of flour, sugar, and water will each convert to different gram values.`,
        keywords: [`${converter.fromUnit} to ${converter.toUnit} recipe chart`],
      },
      {
        question: `How do I convert back from ${to} to ${from}?`,
        answer: `${reverseHint}`,
        keywords: [`${converter.toUnit} to ${converter.fromUnit}`],
      },
    ];
  }

  const longTails = getConverterLongTailKeywords(converter.fromUnit, converter.toUnit, category.slug);

  return [
    {
      question: `${longTails[0].charAt(0).toUpperCase()}${longTails[0].slice(1)}?`,
      answer: `Enter the ${from} value and apply the formula (${converter.formula}). The calculator returns the matching ${to} value instantly.`,
      keywords: [`convert ${converter.fromUnit} to ${converter.toUnit}`],
    },
    {
      question: `${longTails[1].charAt(0).toUpperCase()}${longTails[1].slice(1)}?`,
      answer: `Since each ${from} equals a specific amount of ${to}, multiply or divide by the conversion factor to find exactly how many ${to} are in your ${from} value.`,
      keywords: [`${converter.fromUnit} vs ${converter.toUnit}`],
    },
    {
      question: `What is the ${longTails[2]}?`,
      answer: `Use ${converter.formula}. If you need to go back from ${to} to ${from}, use ${converter.inverseFormula}.`,
      keywords: [`${converter.fromUnit} to ${converter.toUnit} formula`],
    },
    {
      question: `What mistakes cause wrong ${category.name.toLowerCase()} conversions?`,
      answer: `The most common problems are using the wrong starting unit, rounding too early, or mixing values from different standards. Convert once with the correct formula, then round at the end.`,
      keywords: [`${category.slug} conversion mistakes`],
    },
    {
      question: useCases[0]
        ? `Where is this conversion commonly used?`
        : `How do I convert ${converter.toUnit} back to ${converter.fromUnit}?`,
      answer: useCases[0]
        ? `${converter.title} is commonly used in ${toSentenceList(useCases.slice(0, 3))}. ${reverseHint}`
        : `${reverseHint}`,
      keywords: [`${converter.toUnit} to ${converter.fromUnit}`],
    },
  ];
}

export function getConverterNarrative(converter: Converter, category: Category) {
  const from = unitName(converter.fromUnit);
  const to = unitName(converter.toUnit);

  const useCases = CATEGORY_USE_CASES[category.slug] ?? [
    `${category.name.toLowerCase()} calculations`,
    "specification checks",
    "reporting and analysis",
  ];

  const mistakes = CATEGORY_MISTAKES[category.slug] ?? [
    "Rounding too early and carrying an inaccurate value to the next step.",
    `Mixing ${from} and ${to} values in the same equation without converting first.`,
    "Copying values from references that use different unit standards.",
  ];

  return {
    fromLabel: from,
    toLabel: to,
    fromExplanation: unitExplanation(converter.fromUnit, category.name),
    toExplanation: unitExplanation(converter.toUnit, category.name),
    useCases,
    mistakes,
  };
}
