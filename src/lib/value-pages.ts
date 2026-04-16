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
// Human heights: very high search volume, every cm/inch matters
const CM_TO_INCHES_VALUES = generateRange(150, 200, 1);
const CM_TO_FEET_VALUES = generateRange(150, 200, 1);
const INCHES_TO_CM_VALUES = generateRange(48, 80, 1); // 4ft to 6ft 8in
const FEET_TO_CM_VALUES = generateRange(4.0, 7.0, 0.1);

// General distances: people search common round numbers
const METERS_TO_FEET_VALUES = [...generateRange(1, 20, 1), 25, 30, 40, 50, 100];
const FEET_TO_METERS_VALUES = [...generateRange(1, 20, 1), 25, 30, 40, 50, 100];
const MILES_TO_KM_VALUES = [...generateRange(1, 20, 1), 25, 30, 40, 50, 60, 70, 80, 100];
const KM_TO_MILES_VALUES = [...generateRange(1, 20, 1), 25, 50, 80, 100, 120, 150];
const EXTRA_MILES_TO_KM = [13.1, 26.2, 5, 10]; // Marathons, 5k, 10k

const INCHES_TO_MM_VALUES = [0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 8, 10, 12];
const MM_TO_INCHES_VALUES = [1, 2, 5, 10, 15, 20, 25, 50, 100];

// --- Weight ---
// Round numbers and intervals of 5/10 are the most searched for bodyweight/shipping
const LBS_TO_KG_VALUES = [...generateRange(100, 250, 5), 300, 350, 400];
const KG_TO_LBS_VALUES = [...generateRange(40, 120, 2), 150, 200];
const GRAMS_TO_OUNCES_VALUES = [...generateRange(10, 100, 10), 150, 200, 250, 500];
const OUNCES_TO_GRAMS_VALUES = [1, 2, 4, 8, 12, 16, 24, 32];

// --- Temperature ---
// Weather temps (small jumps) + Baking/Cooking temps (large round numbers)
const CELSIUS_TO_FAHRENHEIT_VALUES = [
  ...generateRange(-20, 40, 2), // Weather
  100, 120, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250 // Baking & Boiling
];
const FAHRENHEIT_TO_CELSIUS_VALUES = [
  ...generateRange(0, 100, 5), // Weather
  212, 300, 325, 350, 375, 400, 425, 450 // Baking & Boiling
];
const EXTRA_FAHRENHEIT = [98.6, 100, 102]; // Body temp / fever

// --- Volume ---
const LITERS_TO_GALLONS_VALUES = [1, 2, 5, 10, 20, 50, 100];
const GALLONS_TO_LITERS_VALUES = [1, 2, 5, 10, 15, 20, 50];
const CUPS_TO_ML_VALUES = [0.25, 0.5, 1, 2, 3, 4, 5, 10];
const ML_TO_CUPS_VALUES = [100, 200, 250, 300, 500, 1000];

// --- Data ---
const MB_TO_GB_VALUES = [1, 10, 100, 500, 1024, 2048, 5120, 10240];
const GB_TO_TB_VALUES = [1, 10, 100, 250, 500, 1000, 1024, 2048];

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

