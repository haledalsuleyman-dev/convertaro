import { getRouteVariantSlugs } from "@/lib/converter-routing";

export type StaticValuePageParam = {
  category: string;
  converter: string;
  value: string;
};

export function formatStaticValue(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(6)));
}

// Helper to generate a range with a step
function generateRange(start: number, end: number, step: number = 1): number[] {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(Number(i.toFixed(2))); // limit decimal precision
  }
  return result;
}

// Helper to safely deduplicate values
function dedupeAndSort(base: number[], extra: number[] = []) {
  return Array.from(new Set([...base, ...extra])).sort((a, b) => a - b);
}

// --- Length ---
// Human heights: expanded range to cover children and niche queries
const CM_TO_INCHES_VALUES = generateRange(50, 250, 1);
const CM_TO_FEET_VALUES = generateRange(50, 250, 1);
const INCHES_TO_CM_VALUES = generateRange(20, 100, 1);
const FEET_TO_CM_VALUES = generateRange(1.0, 8.0, 0.1);

// Engineering & Construction: common fractions in inches
const INCH_FRACTIONS = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875];
const INCH_ROUND_VALUES = generateRange(1, 100, 1);
const INCH_PRECISION_VALUES = dedupeAndSort(INCH_ROUND_VALUES, INCH_FRACTIONS);

// General distances: expanded to 1000 units
const METERS_TO_FEET_VALUES = [...generateRange(1, 100, 1), 150, 200, 250, 500, 1000];
const FEET_TO_METERS_VALUES = [...generateRange(1, 100, 1), 150, 200, 250, 500, 1000];
const MILES_TO_KM_VALUES = [...generateRange(1, 100, 1), 150, 200, 250, 500];
const KM_TO_MILES_VALUES = [...generateRange(1, 100, 1), 150, 200, 250, 500];
const EXTRA_MILES_TO_KM = [3.1, 6.2, 13.1, 26.2, 5, 10, 15, 20, 50, 100];

const INCHES_TO_MM_VALUES = dedupeAndSort(INCH_PRECISION_VALUES);
const MM_TO_INCHES_VALUES = [...generateRange(1, 50, 1), 75, 100, 150, 200, 250, 500];

// --- Weight ---
// Expanded bodyweight and kitchen measurements
const LBS_TO_KG_VALUES = [...generateRange(1, 300, 1)]; 
const KG_TO_LBS_VALUES = [...generateRange(1, 150, 1)];
const GRAMS_TO_OUNCES_VALUES = [...generateRange(1, 100, 1), ...generateRange(150, 1000, 50)];
const OUNCES_TO_GRAMS_VALUES = [...generateRange(0.25, 5, 0.25), ...generateRange(6, 32, 1)];

const MG_TO_G_VALUES = [10, 20, 25, 50, 75, 100, 200, 250, 400, 500, 750, 1000];

// --- Temperature ---
// Comprehensive weather + accurate baking conversion
const CELSIUS_TO_FAHRENHEIT_VALUES = [
  ...generateRange(-40, 50, 1), // Weather detail
  ...generateRange(60, 250, 10) // Baking detail
];
const FAHRENHEIT_TO_CELSIUS_VALUES = [
  ...generateRange(-40, 120, 2), // Weather detail
  ...generateRange(200, 500, 25) // Baking detail
];
const EXTRA_FAHRENHEIT = [97.5, 98.6, 99.5, 100.4, 101.3, 102.2];

// --- Volume ---
// Kitchen and industrial volumes
const LITERS_TO_GALLONS_VALUES = [...generateRange(1, 100, 1)];
const GALLONS_TO_LITERS_VALUES = [...generateRange(1, 100, 1)];
const CUPS_TO_ML_VALUES = [0.125, 0.25, 0.33, 0.5, 0.66, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5];
const ML_TO_CUPS_VALUES = [50, 100, 150, 200, 240, 250, 300, 400, 500, 750, 1000];

// --- Data ---
const MB_TO_GB_VALUES = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
const GB_TO_TB_VALUES = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];

export const STATIC_VALUE_PAGE_PARAMS: StaticValuePageParam[] = [
  // Length
  ...dedupeAndSort(CM_TO_INCHES_VALUES).map((value) => ({ category: "length", converter: "cm-to-inches", value: `${formatStaticValue(value)}-cm-to-inches` })),
  ...dedupeAndSort(INCHES_TO_CM_VALUES).map((value) => ({ category: "length", converter: "inches-to-cm", value: `${formatStaticValue(value)}-inches-to-cm` })),
  ...dedupeAndSort(CM_TO_FEET_VALUES).map((value) => ({ category: "length", converter: "cm-to-feet", value: `${formatStaticValue(value)}-cm-to-feet` })),
  ...dedupeAndSort(METERS_TO_FEET_VALUES).map((value) => ({ category: "length", converter: "meters-to-feet", value: `${formatStaticValue(value)}-meters-to-feet` })),
  ...dedupeAndSort(FEET_TO_METERS_VALUES).map((value) => ({ category: "length", converter: "feet-to-meters", value: `${formatStaticValue(value)}-feet-to-meters` })),
  ...dedupeAndSort(FEET_TO_CM_VALUES).map((value) => ({ category: "length", converter: "feet-to-cm", value: `${formatStaticValue(value)}-feet-to-cm` })),
  ...dedupeAndSort(MILES_TO_KM_VALUES, EXTRA_MILES_TO_KM).map((value) => ({ category: "length", converter: "miles-to-km", value: `${formatStaticValue(value)}-miles-to-km` })),
  ...dedupeAndSort(KM_TO_MILES_VALUES).map((value) => ({ category: "length", converter: "km-to-miles", value: `${formatStaticValue(value)}-km-to-miles` })),
  ...dedupeAndSort(INCHES_TO_MM_VALUES).map((value) => ({ category: "length", converter: "inches-to-mm", value: `${formatStaticValue(value)}-inches-to-mm` })),
  ...dedupeAndSort(MM_TO_INCHES_VALUES).map((value) => ({ category: "length", converter: "mm-to-inches", value: `${formatStaticValue(value)}-mm-to-inches` })),

  // Weight
  ...dedupeAndSort(LBS_TO_KG_VALUES).map((value) => ({ category: "weight", converter: "lbs-to-kg", value: `${formatStaticValue(value)}-lbs-to-kg` })),
  ...dedupeAndSort(KG_TO_LBS_VALUES).map((value) => ({ category: "weight", converter: "kg-to-lbs", value: `${formatStaticValue(value)}-kg-to-lbs` })),
  ...dedupeAndSort(GRAMS_TO_OUNCES_VALUES).map((value) => ({ category: "weight", converter: "grams-to-ounces", value: `${formatStaticValue(value)}-grams-to-ounces` })),
  ...dedupeAndSort(OUNCES_TO_GRAMS_VALUES).map((value) => ({ category: "weight", converter: "ounces-to-grams", value: `${formatStaticValue(value)}-ounces-to-grams` })),
  ...dedupeAndSort(MG_TO_G_VALUES).map((value) => ({ category: "weight", converter: "mg-to-g", value: `${formatStaticValue(value)}-mg-to-g` })),

  // Temperature
  ...dedupeAndSort(CELSIUS_TO_FAHRENHEIT_VALUES).map((value) => ({ category: "temperature", converter: "celsius-to-fahrenheit", value: `${formatStaticValue(value)}-celsius-to-fahrenheit` })),
  ...dedupeAndSort(FAHRENHEIT_TO_CELSIUS_VALUES, EXTRA_FAHRENHEIT).map((value) => ({ category: "temperature", converter: "fahrenheit-to-celsius", value: `${formatStaticValue(value)}-fahrenheit-to-celsius` })),

  // Volume
  ...dedupeAndSort(LITERS_TO_GALLONS_VALUES).map((value) => ({ category: "volume", converter: "liters-to-gallons", value: `${formatStaticValue(value)}-liters-to-gallons` })),
  ...dedupeAndSort(GALLONS_TO_LITERS_VALUES).map((value) => ({ category: "volume", converter: "gallons-to-liters", value: `${formatStaticValue(value)}-gallons-to-liters` })),
  ...dedupeAndSort(CUPS_TO_ML_VALUES).map((value) => ({ category: "volume", converter: "cups-to-ml", value: `${formatStaticValue(value)}-cups-to-ml` })),
  ...dedupeAndSort(ML_TO_CUPS_VALUES).map((value) => ({ category: "volume", converter: "ml-to-cups", value: `${formatStaticValue(value)}-ml-to-cups` })),

  // Data
  ...dedupeAndSort(MB_TO_GB_VALUES).map((value) => ({ category: "data", converter: "megabytes-to-gigabytes", value: `${formatStaticValue(value)}-megabytes-to-gigabytes` })),
  ...dedupeAndSort(GB_TO_TB_VALUES).map((value) => ({ category: "data", converter: "gigabytes-to-terabytes", value: `${formatStaticValue(value)}-gigabytes-to-terabytes` })),
];

export function getStaticValuePagesForConverter(category: string, converter: string): StaticValuePageParam[] {
  const directMatches = STATIC_VALUE_PAGE_PARAMS.filter(
    (entry) => entry.category === category && entry.converter === converter
  );
  if (directMatches.length > 0) {
    return directMatches;
  }

  const variants = new Set(getRouteVariantSlugs(category, converter));
  return STATIC_VALUE_PAGE_PARAMS.filter(
    (entry) => entry.category === category && variants.has(entry.converter)
  );
}

export function getStaticValuePageHref(category: string, converter: string, value: number): string | null {
  const valueSlug = `${formatStaticValue(value)}-${converter}`;
  const exists = STATIC_VALUE_PAGE_PARAMS.some(
    (entry) => entry.category === category && entry.converter === converter && entry.value === valueSlug
  );

  if (exists) {
    return `/${category}/${converter}/${valueSlug}`;
  }

  const variants = getRouteVariantSlugs(category, converter);
  const fallback = variants
    .map((variant) => ({
      converter: variant,
      value: `${formatStaticValue(value)}-${variant}`,
    }))
    .find((entry) =>
      STATIC_VALUE_PAGE_PARAMS.some(
        (param) => param.category === category && param.converter === entry.converter && param.value === entry.value
      )
    );

  return fallback ? `/${category}/${fallback.converter}/${fallback.value}` : null;
}

