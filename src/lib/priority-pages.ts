import { Converter } from "@/types/converter";
import { convertValue } from "@/lib/converter";

type PriorityConverterContent = {
  description?: string;
  metaDescription?: string;
  summary?: string;
  intent?: string;
  note?: string;
  formula?: string;
  inverseFormula?: string;
  inputs?: number[];
  relatedConverters?: string[];
};

type TopCategoryContent = {
  title: string;
  description: string;
  lead: string;
};

function createConverterKey(category: string, fromUnit: string, toUnit: string): string {
  return [category, fromUnit, toUnit].join("|");
}

export function getConverterPriorityKey(converter: Pick<Converter, "category" | "fromUnit" | "toUnit">): string {
  return createConverterKey(converter.category, converter.fromUnit, converter.toUnit);
}

export const TOP_CATEGORY_CONTENT: Record<string, TopCategoryContent> = {
  length: {
    title: "Length Converters - Height, Distance, Metric & Imperial Tools",
    description:
      "Convert centimeters, meters, feet, inches, kilometers, and miles with fast formulas, practical charts, and internal links to the most-used length tools.",
    lead:
      "Start with the strongest length conversions for height, room measurements, travel distances, and metric-to-imperial comparisons.",
  },
  weight: {
    title: "Weight Converters - kg, lbs, g & oz Conversion Tools",
    description:
      "Convert kilograms, pounds, grams, and ounces with accurate formulas, quick tables, and direct links to the highest-demand weight pages.",
    lead:
      "This hub is tuned for body weight, luggage limits, recipe weights, shipping labels, and day-to-day metric-to-imperial checks.",
  },
  temperature: {
    title: "Temperature Converters - Celsius, Fahrenheit & Kelvin",
    description:
      "Convert Celsius, Fahrenheit, and Kelvin with exact reverse formulas, quick reference charts, and links to the most searched temperature tools.",
    lead:
      "Use these temperature pages for weather, cooking, health, and science conversions where offsets matter as much as multipliers.",
  },
  volume: {
    title: "Volume Converters - Liters, Gallons, Cups & mL Tools",
    description:
      "Convert liters, gallons, cups, and milliliters with practical formulas, quick charts, and stronger internal links across top volume pages.",
    lead:
      "The strongest entry points here cover kitchen prep, beverage sizes, fuel volume, and container capacity across US and metric units.",
  },
  speed: {
    title: "Speed Converters - mph, km/h, Knots & More",
    description:
      "Convert mph, km/h, knots, and m/s with exact factors, travel-focused examples, and fast access to the most-used speed converter pages.",
    lead:
      "This hub focuses on road-speed, travel, running, and marine conversions where clear labels and exact reverse formulas matter.",
  },
  data: {
    title: "Data Converters - MB, GB, TB & Storage Size Tools",
    description:
      "Convert file sizes and storage units with MB, GB, and TB formulas, binary-base tables, and direct links to the highest-value data pages.",
    lead:
      "These pages are built for storage plans, downloads, backups, and file-size lookups where unit assumptions need to stay clear.",
  },
};

const PRIORITY_CONVERTER_CONTENT: Record<string, PriorityConverterContent> = {
  [createConverterKey("length", "cm", "inches")]: {
    description:
      "Convert centimeters to inches with the exact 2.54 cm per inch relationship, common height examples, and a quick sizing chart.",
    metaDescription:
      "Convert centimeters to inches instantly with the exact 1 in = 2.54 cm formula, a height chart, and common sizing examples.",
    summary:
      "Convert centimeters to inches instantly with the exact 2.54-centimeter-per-inch formula, common height examples, and a quick reference chart.",
    intent:
      "People usually search for this when checking height, clothing sizes, screen dimensions, and product measurements across metric and imperial units.",
    formula: "in = cm / 2.54",
    inverseFormula: "cm = in x 2.54",
    relatedConverters: ["cm-to-feet", "feet-to-cm", "inches-to-cm", "m-to-feet"],
  },
  [createConverterKey("length", "inches", "cm")]: {
    description:
      "Convert inches to centimeters with the exact 1 inch = 2.54 centimeters formula, common height values, and a fast reference table.",
    metaDescription:
      "Convert inches to centimeters instantly with the exact 1 in = 2.54 cm formula, common height values, and a quick chart.",
    summary:
      "Convert inches to centimeters instantly with the exact 1 inch = 2.54 centimeters formula, common height values, and a quick chart.",
    intent:
      "This page is especially useful for height conversion, apparel sizing, product specs, and any US-to-metric measurement handoff.",
    formula: "cm = in x 2.54",
    inverseFormula: "in = cm / 2.54",
    inputs: [1, 2, 5, 10, 12, 18, 24, 36, 48, 60, 65, 72, 75, 80, 100],
    relatedConverters: ["inches-to-feet", "feet-to-inches", "cm-to-inches", "feet-to-cm"],
  },
  [createConverterKey("weight", "kg", "lbs")]: {
    description:
      "Convert kilograms to pounds with the exact 1 kg = 2.2046226218 lb factor, common body-weight examples, and a quick chart.",
    metaDescription:
      "Convert kilograms to pounds instantly with the exact 1 kg = 2.2046226218 lb formula, common body-weight values, and a quick chart.",
    summary:
      "Convert kilograms to pounds instantly with an exact kg-to-lb factor, common body-weight examples, and a quick lookup chart.",
    intent:
      "People usually use this for body weight, luggage limits, fitness tracking, and product weights moving from metric to US labels.",
    formula: "lb = kg x 2.2046226218",
    inverseFormula: "kg = lb x 0.45359237",
    relatedConverters: ["lbs-to-kg", "kg-to-grams", "pounds-to-ounces", "grams-to-ounces"],
  },
  [createConverterKey("weight", "lbs", "kg")]: {
    description:
      "Convert pounds to kilograms with the exact 1 lb = 0.45359237 kg factor, body-weight examples, and a quick reference table.",
    metaDescription:
      "Convert pounds to kilograms instantly with the exact 1 lb = 0.45359237 kg formula, common weight values, and a quick chart.",
    summary:
      "Convert pounds to kilograms instantly with the exact pound-to-kilogram factor, common body-weight values, and a quick chart.",
    intent:
      "This page helps when health apps, luggage rules, forms, or international product labels need a metric answer from pounds.",
    formula: "kg = lb x 0.45359237",
    inverseFormula: "lb = kg x 2.2046226218",
    inputs: [1, 5, 10, 20, 25, 50, 75, 100, 120, 150, 160, 180, 200, 220, 250],
    relatedConverters: ["kg-to-lbs", "pounds-to-ounces", "kg-to-grams", "ounces-to-grams"],
  },
  [createConverterKey("length", "km", "miles")]: {
    description:
      "Convert kilometers to miles with the exact 1 km = 0.6213711922 mi factor, travel examples, and a race-distance reference chart.",
    metaDescription:
      "Convert kilometers to miles instantly with the exact 1 km = 0.6213711922 mi formula, travel examples, and a quick chart.",
    summary:
      "Convert kilometers to miles instantly with the exact factor, practical travel examples, and a quick chart for road and race distances.",
    intent:
      "People search for this when comparing road distances, running routes, race lengths, and map measurements across metric and imperial systems.",
    formula: "mi = km x 0.6213711922",
    inverseFormula: "km = mi x 1.609344",
    inputs: [1, 2, 3, 5, 10, 15, 21, 25, 42, 50, 100],
    relatedConverters: ["miles-to-km", "mph-to-kmh", "kmh-to-mph", "m-to-feet"],
  },
  [createConverterKey("length", "miles", "km")]: {
    description:
      "Convert miles to kilometers with the exact 1 mile = 1.609344 km factor, travel examples, and a quick distance chart.",
    metaDescription:
      "Convert miles to kilometers instantly with the exact 1 mile = 1.609344 km formula, travel examples, and a quick chart.",
    summary:
      "Convert miles to kilometers instantly with the exact factor, practical road-trip examples, and a quick chart for common distances.",
    intent:
      "Use this when maps, race distances, vehicle dashboards, or route plans need a metric distance from miles.",
    formula: "km = mi x 1.609344",
    inverseFormula: "mi = km x 0.6213711922",
    inputs: [1, 2, 3, 5, 10, 13.1, 26.2, 50, 100],
    relatedConverters: ["km-to-miles", "mph-to-kmh", "kmh-to-mph", "meters-to-yards"],
  },
  [createConverterKey("temperature", "C", "F")]: {
    description:
      "Convert Celsius to Fahrenheit with the exact reverse formula, weather and cooking examples, and a fast temperature chart.",
    metaDescription:
      "Convert Celsius to Fahrenheit instantly with the exact formula, weather and cooking examples, and a quick chart.",
    summary:
      "Convert Celsius to Fahrenheit instantly with the exact formula, common weather values, and a quick chart for kitchen and travel use.",
    intent:
      "People use this most for weather forecasts, oven settings, body-temperature checks, and travel between Celsius and Fahrenheit regions.",
    relatedConverters: ["fahrenheit-to-celsius", "celsius-to-kelvin", "fahrenheit-to-kelvin"],
  },
  [createConverterKey("temperature", "F", "C")]: {
    description:
      "Convert Fahrenheit to Celsius with the exact reverse formula, weather and cooking examples, and a quick temperature chart.",
    metaDescription:
      "Convert Fahrenheit to Celsius instantly with the exact formula, weather and cooking examples, and a quick chart.",
    summary:
      "Convert Fahrenheit to Celsius instantly with the exact reverse formula, weather examples, and a quick chart for daily use.",
    intent:
      "This page is useful for US weather readings, oven temperatures, and health or science references that need Celsius output.",
    inputs: [0, 10, 20, 32, 40, 50, 68, 77, 86, 98.6, 100, 150, 212],
    relatedConverters: ["celsius-to-fahrenheit", "celsius-to-kelvin", "fahrenheit-to-kelvin"],
  },
  [createConverterKey("length", "m", "feet")]: {
    description:
      "Convert meters to feet with the exact 1 meter = 3.280839895 feet factor, room-size examples, and a fast chart.",
    metaDescription:
      "Convert meters to feet instantly with the exact 1 m = 3.280839895 ft formula, room-size examples, and a quick chart.",
    summary:
      "Convert meters to feet instantly with the exact factor, practical building examples, and a quick chart for room and project measurements.",
    intent:
      "People usually need this for room sizes, construction plans, field dimensions, and height or clearance checks.",
    formula: "ft = m x 3.280839895",
    inverseFormula: "m = ft x 0.3048",
    inputs: [1, 2, 3, 5, 10, 20, 30, 50, 100],
    relatedConverters: ["feet-to-m", "meters-to-yards", "feet-to-inches", "cm-to-feet"],
  },
  [createConverterKey("length", "feet", "m")]: {
    description:
      "Convert feet to meters with the exact 1 foot = 0.3048 meters factor, room-size examples, and a quick chart.",
    metaDescription:
      "Convert feet to meters instantly with the exact 1 ft = 0.3048 m formula, project examples, and a quick chart.",
    summary:
      "Convert feet to meters instantly with the exact factor, practical room-size examples, and a quick chart for plans and measurements.",
    intent:
      "Use this when plans, listings, equipment specs, or international forms need meters from feet-based measurements.",
    formula: "m = ft x 0.3048",
    inverseFormula: "ft = m x 3.280839895",
    inputs: [1, 2, 3, 5, 6, 10, 20, 30, 50, 100],
    relatedConverters: ["m-to-feet", "feet-to-inches", "inches-to-feet", "meters-to-yards"],
  },
  [createConverterKey("speed", "mph", "kmh")]: {
    description:
      "Convert miles per hour to kilometers per hour with the exact 1 mph = 1.609344 km/h factor and common driving-speed examples.",
    metaDescription:
      "Convert mph to km/h instantly with the exact 1 mph = 1.609344 km/h formula, driving examples, and a quick chart.",
    summary:
      "Convert mph to km/h instantly with the exact factor, common road-speed examples, and a quick travel chart.",
    intent:
      "People usually use this for road signs, rental cars, speed limits, and dashboard settings when traveling between regions.",
    formula: "km/h = mph x 1.609344",
    inverseFormula: "mph = km/h x 0.6213711922",
    inputs: [1, 10, 20, 30, 40, 50, 60, 70, 80, 100, 120],
    relatedConverters: ["kmh-to-mph", "knots-to-mph", "m-to-feet", "km-to-miles"],
  },
  [createConverterKey("speed", "kmh", "mph")]: {
    description:
      "Convert kilometers per hour to miles per hour with the exact 1 km/h = 0.6213711922 mph factor and common driving examples.",
    metaDescription:
      "Convert km/h to mph instantly with the exact 1 km/h = 0.6213711922 mph formula, driving examples, and a quick chart.",
    summary:
      "Convert km/h to mph instantly with the exact factor, road-speed examples, and a quick chart for travel and driving.",
    intent:
      "This page is useful for speed-limit checks, road trips, dashboard conversions, and comparing vehicle speeds across regions.",
    formula: "mph = km/h x 0.6213711922",
    inverseFormula: "km/h = mph x 1.609344",
    inputs: [1, 10, 20, 30, 40, 50, 60, 80, 100, 120, 130],
    relatedConverters: ["mph-to-kmh", "knots-to-mph", "km-to-miles", "miles-to-km"],
  },
  [createConverterKey("data", "MB", "GB")]: {
    description:
      "Convert megabytes to gigabytes using the binary storage standard where 1 GB = 1024 MB, with common file-size examples and a quick chart.",
    metaDescription:
      "Convert megabytes to gigabytes instantly using the binary standard where 1 GB = 1024 MB, with common file-size examples.",
    summary:
      "Convert megabytes to gigabytes instantly using the binary storage standard, with practical file-size examples and a quick chart.",
    intent:
      "People usually search for this when checking download sizes, storage plans, backups, and upload limits where MB and GB need to stay consistent.",
    note:
      "This page uses the binary storage standard: 1 GB = 1024 MB. If your source uses decimal marketing units, confirm the convention before comparing totals.",
    formula: "GB = MB / 1024",
    inverseFormula: "MB = GB x 1024",
    inputs: [1, 10, 50, 100, 250, 500, 512, 1024, 2048, 4096],
    relatedConverters: ["gigabytes-to-megabytes", "gigabytes-to-terabytes", "megabytes-to-terabytes"],
  },
  [createConverterKey("data", "GB", "MB")]: {
    description:
      "Convert gigabytes to megabytes using the binary storage standard where 1 GB = 1024 MB, with common storage examples and a quick table.",
    metaDescription:
      "Convert gigabytes to megabytes instantly using the binary standard where 1 GB = 1024 MB, with common storage examples.",
    summary:
      "Convert gigabytes to megabytes instantly using the binary storage standard, with common storage-plan examples and a quick table.",
    intent:
      "This is useful for storage plans, memory cards, backups, and software downloads where totals are often listed in GB but need MB output.",
    note:
      "This page uses the binary storage standard: 1 GB = 1024 MB. That matches many operating-system and technical storage tools.",
    formula: "MB = GB x 1024",
    inverseFormula: "GB = MB / 1024",
    inputs: [1, 2, 5, 10, 20, 50, 100, 256, 512, 1024],
    relatedConverters: ["megabytes-to-gigabytes", "gigabytes-to-terabytes", "megabytes-to-terabytes"],
  },
  [createConverterKey("volume", "L", "gal")]: {
    description:
      "Convert liters to US gallons with the exact 1 L = 0.2641720524 gal factor, fuel and container examples, and a quick chart.",
    metaDescription:
      "Convert liters to US gallons instantly with the exact 1 L = 0.2641720524 gal formula, fuel examples, and a quick chart.",
    summary:
      "Convert liters to US gallons instantly with the exact factor, practical fuel and container examples, and a quick chart.",
    intent:
      "People usually need this for fuel volume, water storage, beverage containers, and any metric-to-US liquid conversion.",
    note:
      "This page uses US gallons. If you need Imperial gallons, the result will be different, so confirm the gallon standard first.",
    formula: "gal = L x 0.2641720524",
    inverseFormula: "L = gal x 3.785411784",
    inputs: [1, 2, 5, 10, 20, 50, 100],
    relatedConverters: ["gallons-to-liters", "liters-to-milliliters", "milliliters-to-liters", "cups-to-milliliters"],
  },
  [createConverterKey("volume", "gal", "L")]: {
    description:
      "Convert US gallons to liters with the exact 1 gal = 3.785411784 L factor, fuel and storage examples, and a quick chart.",
    metaDescription:
      "Convert US gallons to liters instantly with the exact 1 gal = 3.785411784 L formula, fuel examples, and a quick chart.",
    summary:
      "Convert US gallons to liters instantly with the exact factor, practical container examples, and a quick chart.",
    intent:
      "Use this when fuel, water, or beverage measurements start in gallons but need liters for labels, storage, or planning.",
    note:
      "This page uses US gallons. If your source uses Imperial gallons, confirm the standard before comparing totals.",
    formula: "L = gal x 3.785411784",
    inverseFormula: "gal = L x 0.2641720524",
    inputs: [1, 2, 5, 10, 20, 50, 100],
    relatedConverters: ["liters-to-gallons", "gallons-to-milliliters", "liters-to-milliliters", "milliliters-to-liters"],
  },
  [createConverterKey("weight", "kg", "g")]: {
    description:
      "Convert kilograms to grams with the exact 1 kg = 1000 g formula, quick package examples, and a simple reference chart.",
    metaDescription:
      "Convert kilograms to grams instantly with the exact 1 kg = 1000 g formula, package examples, and a quick chart.",
    summary:
      "Convert kilograms to grams instantly with the exact metric formula, practical package examples, and a quick chart.",
    intent:
      "People use this for food labels, shipping weights, ingredient amounts, and lab or classroom measurements.",
    formula: "g = kg x 1000",
    inverseFormula: "kg = g / 1000",
    inputs: [1, 2, 5, 10, 20, 50, 100],
    relatedConverters: ["kilograms-to-pounds", "pounds-to-kilograms", "pounds-to-ounces"],
  },
  [createConverterKey("weight", "lbs", "oz")]: {
    description:
      "Convert pounds to ounces with the exact 1 lb = 16 oz formula, cooking and package examples, and a quick chart.",
    metaDescription:
      "Convert pounds to ounces instantly with the exact 1 lb = 16 oz formula, cooking examples, and a quick chart.",
    summary:
      "Convert pounds to ounces instantly with the exact formula, practical kitchen examples, and a quick chart for package weights.",
    intent:
      "This page is useful for recipes, package weights, retail measurements, and any pound-to-ounce conversion that needs a fast exact answer.",
    formula: "oz = lb x 16",
    inverseFormula: "lb = oz / 16",
    inputs: [1, 2, 3, 5, 10, 16, 20, 25, 50, 100],
    relatedConverters: ["kilograms-to-pounds", "pounds-to-kilograms", "ounces-to-grams"],
  },
  [createConverterKey("length", "m", "yards")]: {
    description:
      "Convert meters to yards with the exact 1 meter = 1.0936132983 yards factor, field and fabric examples, and a quick chart.",
    metaDescription:
      "Convert meters to yards instantly with the exact 1 m = 1.0936132983 yd formula, field examples, and a quick chart.",
    summary:
      "Convert meters to yards instantly with the exact factor, practical field and project examples, and a quick chart.",
    intent:
      "Use this for sports fields, landscaping, fabric, and construction work when meters need a yard-based answer.",
    formula: "yd = m x 1.0936132983",
    inverseFormula: "m = yd x 0.9144",
    inputs: [1, 2, 5, 10, 20, 50, 100],
    relatedConverters: ["yards-to-m", "meters-to-feet", "feet-to-m"],
  },
  [createConverterKey("length", "yards", "m")]: {
    description:
      "Convert yards to meters with the exact 1 yard = 0.9144 meters factor, project examples, and a quick chart.",
    metaDescription:
      "Convert yards to meters instantly with the exact 1 yd = 0.9144 m formula, project examples, and a quick chart.",
    summary:
      "Convert yards to meters instantly with the exact factor, field examples, and a quick chart for project measurements.",
    intent:
      "People usually need this for sports distances, landscaping, fabric lengths, and plans that move from imperial to metric.",
    formula: "m = yd x 0.9144",
    inverseFormula: "yd = m x 1.0936132983",
    inputs: [1, 2, 5, 10, 20, 50, 100],
    relatedConverters: ["meters-to-yards", "meters-to-feet", "feet-to-meters"],
  },
  [createConverterKey("temperature", "C", "K")]: {
    description:
      "Convert Celsius to Kelvin with the exact offset formula, common science examples, and a quick reference chart.",
    metaDescription:
      "Convert Celsius to Kelvin instantly with the exact K = C + 273.15 formula, science examples, and a quick chart.",
    summary:
      "Convert Celsius to Kelvin instantly with the exact offset formula, common science examples, and a quick chart.",
    intent:
      "This page is especially useful for science, engineering, lab work, and classroom tasks that need Kelvin output from Celsius values.",
    inputs: [0, 1, 10, 20, 25, 37, 50, 100],
    relatedConverters: ["celsius-to-fahrenheit", "fahrenheit-to-celsius", "fahrenheit-to-kelvin"],
  },
  [createConverterKey("length", "feet", "inches")]: {
    description:
      "Convert feet to inches with the exact 1 foot = 12 inches formula, height examples, and a quick reference chart.",
    metaDescription:
      "Convert feet to inches instantly with the exact 1 ft = 12 in formula, height examples, and a quick chart.",
    summary:
      "Convert feet to inches instantly with the exact formula, common height examples, and a quick chart.",
    intent:
      "Use this for height, furniture, room dimensions, and any foot-based measurement that needs a faster inch answer.",
    formula: "in = ft x 12",
    inverseFormula: "ft = in / 12",
    inputs: [1, 2, 3, 4, 5, 6, 7, 8, 10, 20, 50],
    relatedConverters: ["inches-to-feet", "feet-to-m", "inches-to-cm", "feet-to-cm"],
  },
  [createConverterKey("length", "inches", "feet")]: {
    description:
      "Convert inches to feet with the exact 12 inches = 1 foot formula, common height values, and a quick chart.",
    metaDescription:
      "Convert inches to feet instantly with the exact 12 in = 1 ft formula, common height values, and a quick chart.",
    summary:
      "Convert inches to feet instantly with the exact formula, common height values, and a quick chart for sizing and layout work.",
    intent:
      "People use this for height conversions, construction layouts, furniture sizing, and product dimensions measured in inches.",
    formula: "ft = in / 12",
    inverseFormula: "in = ft x 12",
    inputs: [1, 2, 6, 12, 18, 24, 36, 48, 60, 72, 84, 96],
    relatedConverters: ["feet-to-inches", "inches-to-cm", "feet-to-cm", "cm-to-inches"],
  },
};

function dedupe(values: string[]): string[] {
  return Array.from(new Set(values));
}

function buildExamples(converter: Converter, inputs: number[]) {
  return inputs.map((input) => ({
    input,
    output: convertValue(input, converter.fromUnit, converter.toUnit, converter.category),
    description: `${input} ${converter.fromUnit} to ${converter.toUnit}`,
  }));
}

export function getPriorityConverterContent(converter: Pick<Converter, "category" | "fromUnit" | "toUnit">) {
  return PRIORITY_CONVERTER_CONTENT[getConverterPriorityKey(converter)];
}

export function mergePriorityConverterData(converter: Converter): Converter {
  const priority = getPriorityConverterContent(converter);

  if (!priority) {
    return converter;
  }

  return {
    ...converter,
    description: priority.description ?? converter.description,
    formula: priority.formula ?? converter.formula,
    inverseFormula: priority.inverseFormula ?? converter.inverseFormula,
    examples: priority.inputs ? buildExamples(converter, priority.inputs) : converter.examples,
    relatedConverters: priority.relatedConverters
      ? dedupe([...priority.relatedConverters, ...converter.relatedConverters])
      : converter.relatedConverters,
    metadata: {
      ...converter.metadata,
      lastUpdated: "2026-04-07",
    },
  };
}

export function getTopCategoryContent(slug: string): TopCategoryContent | undefined {
  return TOP_CATEGORY_CONTENT[slug];
}

export function isTopCategory(slug: string): boolean {
  return slug in TOP_CATEGORY_CONTENT;
}
