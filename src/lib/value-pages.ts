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
const MILES_TO_KM_VALUES = [...generateRange(1, 20, 1), 25, 30, 40, 50, 100];
const EXTRA_MILES_TO_KM = [13.1, 26.2]; // Marathons

// --- Weight ---
// Round numbers and intervals of 5/10 are the most searched for bodyweight/shipping
const LBS_TO_KG_VALUES = generateRange(100, 250, 5); 
const KG_TO_LBS_VALUES = generateRange(40, 120, 2);

// --- Temperature ---
// Weather temps (small jumps) + Baking/Cooking temps (large round numbers)
const CELSIUS_TO_FAHRENHEIT_VALUES = [
  ...generateRange(-20, 40, 2), // Weather
  100, 120, 150, 160, 180, 200, 220, 250 // Baking & Boiling
];
const FAHRENHEIT_TO_CELSIUS_VALUES = [
  ...generateRange(0, 100, 5), // Weather
  212, 300, 325, 350, 375, 400, 425, 450 // Baking & Boiling
];
const EXTRA_FAHRENHEIT = [98.6]; // Body temp

export const STATIC_VALUE_PAGE_PARAMS: StaticValuePageParam[] = [
  ...dedupeAndSort(CM_TO_INCHES_VALUES).map((value) => ({
    category: "length",
    converter: "cm-to-inches",
    value: `${formatStaticValue(value)}-cm-to-inches`,
  })),
  ...dedupeAndSort(INCHES_TO_CM_VALUES).map((value) => ({
    category: "length",
    converter: "inches-to-cm",
    value: `${formatStaticValue(value)}-inches-to-cm`,
  })),
  ...dedupeAndSort(CM_TO_FEET_VALUES).map((value) => ({
    category: "length",
    converter: "cm-to-feet",
    value: `${formatStaticValue(value)}-cm-to-feet`,
  })),
  ...dedupeAndSort(METERS_TO_FEET_VALUES).map((value) => ({
    category: "length",
    converter: "meters-to-feet",
    value: `${formatStaticValue(value)}-meters-to-feet`,
  })),
  ...dedupeAndSort(FEET_TO_CM_VALUES).map((value) => ({
    category: "length",
    converter: "feet-to-cm",
    value: `${formatStaticValue(value)}-feet-to-cm`,
  })),
  ...dedupeAndSort(MILES_TO_KM_VALUES, EXTRA_MILES_TO_KM).map((value) => ({
    category: "length",
    converter: "miles-to-km",
    value: `${formatStaticValue(value)}-miles-to-km`,
  })),
  ...dedupeAndSort(LBS_TO_KG_VALUES).map((value) => ({
    category: "weight",
    converter: "lbs-to-kg",
    value: `${formatStaticValue(value)}-lbs-to-kg`,
  })),
  ...dedupeAndSort(KG_TO_LBS_VALUES).map((value) => ({
    category: "weight",
    converter: "kg-to-lbs",
    value: `${formatStaticValue(value)}-kg-to-lbs`,
  })),
  ...dedupeAndSort(CELSIUS_TO_FAHRENHEIT_VALUES).map((value) => ({
    category: "temperature",
    converter: "celsius-to-fahrenheit",
    value: `${formatStaticValue(value)}-celsius-to-fahrenheit`,
  })),
  ...dedupeAndSort(FAHRENHEIT_TO_CELSIUS_VALUES, EXTRA_FAHRENHEIT).map((value) => ({
    category: "temperature",
    converter: "fahrenheit-to-celsius",
    value: `${formatStaticValue(value)}-fahrenheit-to-celsius`,
  })),
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
