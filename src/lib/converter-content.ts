import { Category, Converter, FAQItem } from "@/types/converter";
import { dedupeCanonicalConverters, getCanonicalConverter, getCanonicalConverterById } from "@/lib/converter-routing";

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
  length: ["construction and interior dimensions", "clothing and body measurements", "map and route planning"],
  weight: ["nutrition and fitness tracking", "shipping and logistics labels", "lab and manufacturing workflows"],
  temperature: ["weather and climate checks", "cooking and food safety", "engineering and scientific measurements"],
  volume: ["cooking and recipes", "tank and container sizing", "lab and industrial liquid handling"],
  area: ["land and property measurements", "flooring and paint planning", "agriculture and map analysis"],
  speed: ["driving and transport", "aviation and marine references", "performance and telemetry data"],
  time: ["project planning", "scheduling and productivity", "scientific duration calculations"],
  data: ["file size and storage planning", "network and transfer estimates", "backup and infrastructure decisions"],
  energy: ["electricity and utility tracking", "engineering calculations", "fuel and thermal comparisons"],
  pressure: ["tire and mechanical checks", "industrial process control", "weather and altitude readings"],
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

  return dedupeCanonicalConverters(
    converter.relatedConverters
    .map((id) => lookup.get(id) ?? getCanonicalConverterById(id))
    .filter((item): item is Converter => Boolean(item))
  ).slice(0, 3);
}

export function buildConverterFaq(
  converter: Converter,
  category: Category,
  reverseConverter?: Converter
): FAQItem[] {
  const from = unitName(converter.fromUnit);
  const to = unitName(converter.toUnit);
  const reverseHint = reverseConverter
    ? `For the reverse direction, use the ${reverseConverter.title} page.`
    : `Use the swap direction for the reverse conversion from ${to} to ${from}.`;

  return [
    {
      question: `How do I convert ${from} to ${to}?`,
      answer: `Enter your value in ${from}, then apply the formula ${converter.formula}. The result appears instantly in ${to}.`,
      keywords: [`convert ${converter.fromUnit} to ${converter.toUnit}`],
    },
    {
      question: `When should I use ${converter.fromUnit} instead of ${converter.toUnit}?`,
      answer: `${from} is usually preferred in contexts that publish values in that unit, while ${to} is used where local standards or tools expect it. Match the unit to the audience and source system to avoid interpretation errors.`,
      keywords: [`${converter.fromUnit} vs ${converter.toUnit}`],
    },
    {
      question: `What is the exact formula for ${converter.fromUnit} to ${converter.toUnit}?`,
      answer: `The formula is ${converter.formula}. If you need to convert back, use ${converter.inverseFormula}.`,
      keywords: [`${converter.fromUnit} to ${converter.toUnit} formula`],
    },
    {
      question: `What mistakes are common in ${category.name.toLowerCase()} conversions?`,
      answer: `The most common issues are rounding too early, confusing similar symbols, and mixing source units before converting. Always verify the input unit first, then convert once with a trusted formula.`,
      keywords: [`${category.slug} conversion mistakes`],
    },
    {
      question: `How can I convert ${converter.toUnit} back to ${converter.fromUnit}?`,
      answer: `${reverseHint}`,
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
