import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Converter } from "@/types/converter";
import { categories } from "@/data/categories";
import { ConverterTool } from "@/components/converter/ConverterTool";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { FAQSection } from "@/components/converter/FAQSection";
import { ConverterContentSections } from "@/components/converter/ConverterContentSections";
import Link from "next/link";
import { ChevronRight, Calculator, Lightbulb, Table, ArrowLeftRight } from "lucide-react";
import {
  buildConverterHeading,
  buildWebPageSchema,
  converterCanonical,
  formatUnitLabel,
  generateBreadcrumbSchemaFromPaths,
  generateFAQSchema,
  generateHowToSchema,
} from "@/lib/seo";
import {
  buildConverterFaq,
  getContextualRelatedConverters,
  getConversionSteps,
  getFormulaContent,
  getIntroContent,
  getReverseConverter,
} from "@/lib/converter-content";
import { PopularToolsSidebar, RelatedCalculators, CategoryNavigation, CrawlableLinkHub } from "@/components/layout/InternalLinks";
import { RecentConversions } from "@/components/layout/RecentConversions";
import { AdSlot } from "@/components/ads/AdSlot";
import { canonicalConverters, dedupeCanonicalConverters, getCanonicalConverterById, resolveConverterRoute } from "@/lib/converter-routing";
import { TrustMetadataBlock } from "@/components/trust/TrustMetadataBlock";
import { getConverterTrustMetadata } from "@/lib/trust";
import { buildConverterPageMetadata } from "@/lib/page-metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getRelatedConverterCards } from "@/lib/internal-linking";
import { getStaticValuePagesForConverter } from "@/lib/value-pages";
import { getPriorityConverterContent } from "@/lib/priority-pages";
import { convertValue, formatValue } from "@/lib/converter";

const converters = canonicalConverters as Converter[];
export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{
    category: string;
    converter: string;
  }>;
}

type PriorityPageExperience = {
  keyword: string;
  heading: string;
  intro: string;
  answerFromUnit: string;
  answerToUnit: string;
  factorText: string;
  commonValues: number[];
  quickConversions: number[];
  workedExamples: Array<{ input: number; context: string }>;
  uses: string[];
  definitions: {
    fromTitle: string;
    fromText: string;
    toTitle: string;
    toText: string;
  };
  links: {
    reverse: { href: string; label: string };
    sameSource: Array<{ href: string; label: string }>;
    sameTarget: Array<{ href: string; label: string }>;
    category: { href: string; label: string };
    popular: { href: string; label: string };
  };
};

const PRIORITY_PAGE_EXPERIENCES: Record<string, PriorityPageExperience> = {
  "kg-to-lbs": {
    keyword: "kg to lbs",
    heading: "kg to lbs Converter",
    intro: "Convert kilograms to pounds using the exact factor of 2.20462. Use the calculator, check the formula, or scan the table for common values.",
    answerFromUnit: "kg",
    answerToUnit: "lbs",
    factorText: "1 kg = 2.2046226218 lbs",
    commonValues: [1, 5, 10, 20, 50, 70, 80, 100],
    quickConversions: [70, 80, 100],
    workedExamples: [
      { input: 70, context: "Common body weight reference for fitness tracking and medical forms." },
      { input: 100, context: "Often searched for shipping, gym totals, and round-number weight checks." },
      { input: 50, context: "Useful for suitcase, parcel, and package weight checks." },
    ],
    uses: [
      "Body weight comparisons between metric health records and pound-based fitness apps.",
      "Airline baggage limits such as 23 kg or 32 kg checked against pound allowances.",
      "Shipping and package weights when labels, scales, or carrier rules use different units.",
    ],
    definitions: {
      fromTitle: "What is a kilogram?",
      fromText: "A kilogram is a metric unit of mass used worldwide for body weight, shipping, and product labels.",
      toTitle: "What is a pound?",
      toText: "A pound is an imperial and US customary unit of mass used for personal weight, food, and package measurements.",
    },
    links: {
      reverse: { href: "/weight/lbs-to-kg", label: "lbs to kg" },
      sameSource: [
        { href: "/weight/kg-to-g", label: "kg to grams" },
        { href: "/weight/kg-to-oz", label: "kg to ounces" },
        { href: "/weight/kg-to-st", label: "kg to stone" },
      ],
      sameTarget: [
        { href: "/weight/g-to-lbs", label: "grams to lbs" },
        { href: "/weight/oz-to-lbs", label: "ounces to lbs" },
        { href: "/weight/st-to-lbs", label: "stone to lbs" },
      ],
      category: { href: "/weight", label: "weight converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "lbs-to-kg": {
    keyword: "lbs to kg",
    heading: "lbs to kg Converter",
    intro: "Convert pounds to kilograms using the exact factor of 0.45359237. This page is built for body weight, luggage, package labels, and metric form entries.",
    answerFromUnit: "lb",
    answerToUnit: "kg",
    factorText: "1 lb = 0.45359237 kg",
    commonValues: [1, 5, 10, 20, 50, 70, 80, 100],
    quickConversions: [150, 180, 200],
    workedExamples: [
      { input: 150, context: "Common body weight lookup for health apps and medical forms." },
      { input: 180, context: "Useful for fitness tracking, gym targets, and everyday weight checks." },
      { input: 200, context: "Often searched for shipping thresholds and round-number weight conversions." },
    ],
    uses: [
      "Body weight entries when a US scale or app shows pounds but a form requires kilograms.",
      "Parcel and luggage weights when carrier rules use kilograms instead of pounds.",
      "Nutrition, training, and medical records that need metric units.",
    ],
    definitions: {
      fromTitle: "What is a pound?",
      fromText: "A pound is an imperial and US customary unit of mass used for body weight, food, and package measurements.",
      toTitle: "What is a kilogram?",
      toText: "A kilogram is the standard metric unit of mass used on forms, labels, and scales worldwide.",
    },
    links: {
      reverse: { href: "/weight/kg-to-lbs", label: "kg to lbs" },
      sameSource: [
        { href: "/weight/lbs-to-g", label: "lbs to grams" },
        { href: "/weight/lbs-to-oz", label: "lbs to ounces" },
        { href: "/weight/lbs-to-st", label: "lbs to stone" },
      ],
      sameTarget: [
        { href: "/weight/g-to-kg", label: "grams to kg" },
        { href: "/weight/oz-to-kg", label: "ounces to kg" },
        { href: "/weight/st-to-kg", label: "stone to kg" },
      ],
      category: { href: "/weight", label: "weight converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "cm-to-inches": {
    keyword: "cm to inches",
    heading: "cm to inches Converter",
    intro: "Convert centimeters to inches using the exact 2.54 cm per inch relationship. This page is most useful for height, clothing sizes, and product dimensions.",
    answerFromUnit: "cm",
    answerToUnit: "inches",
    factorText: "1 cm = 0.3937007874 inches",
    commonValues: [1, 5, 10, 20, 30, 50, 100, 170],
    quickConversions: [170, 180, 200],
    workedExamples: [
      { input: 170, context: "Common height conversion for profiles, passports, and fitness apps." },
      { input: 180, context: "Useful for clothing size charts and height checks." },
      { input: 200, context: "Often searched for furniture, display, and room dimension lookups." },
    ],
    uses: [
      "Height conversions from metric records to inch-based references.",
      "Clothing, shoe, and sizing charts that mix centimeters and inches.",
      "Product dimensions for screens, furniture, and home items.",
    ],
    definitions: {
      fromTitle: "What is a centimeter?",
      fromText: "A centimeter is a metric unit of length used for height, clothing sizes, and product dimensions.",
      toTitle: "What is an inch?",
      toText: "An inch is an imperial unit of length used for screens, sizing charts, and product specs.",
    },
    links: {
      reverse: { href: "/length/inches-to-cm", label: "inches to cm" },
      sameSource: [
        { href: "/length/cm-to-feet", label: "cm to feet" },
        { href: "/length/cm-to-m", label: "cm to meters" },
        { href: "/length/cm-to-mm", label: "cm to mm" },
      ],
      sameTarget: [
        { href: "/length/feet-to-inches", label: "feet to inches" },
        { href: "/length/m-to-inches", label: "meters to inches" },
        { href: "/length/mm-to-inches", label: "mm to inches" },
      ],
      category: { href: "/length", label: "length converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "inches-to-cm": {
    keyword: "inches to cm",
    heading: "inches to cm Converter",
    intro: "Convert inches to centimeters using the exact 1 inch = 2.54 cm definition. This page is built for height, sizing, and product measurements.",
    answerFromUnit: "inch",
    answerToUnit: "cm",
    factorText: "1 inch = 2.54 cm",
    commonValues: [1, 5, 10, 20, 24, 36, 60, 72],
    quickConversions: [60, 65, 72],
    workedExamples: [
      { input: 60, context: "Useful for furniture, room, and screen size checks." },
      { input: 65, context: "Common TV and display size lookup in metric markets." },
      { input: 72, context: "Frequent height conversion for 6-foot references." },
    ],
    uses: [
      "US height and size measurements converted for metric forms and charts.",
      "Product specs where dimensions are listed in inches but compared in centimeters.",
      "Display sizes, packaging, and home measurements for international buyers.",
    ],
    definitions: {
      fromTitle: "What is an inch?",
      fromText: "An inch is an imperial unit of length commonly used for sizing charts, screens, and product dimensions.",
      toTitle: "What is a centimeter?",
      toText: "A centimeter is a metric unit of length used for body measurements, product labels, and forms.",
    },
    links: {
      reverse: { href: "/length/cm-to-inches", label: "cm to inches" },
      sameSource: [
        { href: "/length/inches-to-feet", label: "inches to feet" },
        { href: "/length/inches-to-m", label: "inches to meters" },
        { href: "/length/inches-to-mm", label: "inches to mm" },
      ],
      sameTarget: [
        { href: "/length/feet-to-cm", label: "feet to cm" },
        { href: "/length/m-to-cm", label: "meters to cm" },
        { href: "/length/mm-to-cm", label: "mm to cm" },
      ],
      category: { href: "/length", label: "length converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "mph-to-kmh": {
    keyword: "mph to km/h",
    heading: "mph to km/h Converter",
    intro: "Convert miles per hour to kilometers per hour using the exact factor 1 mph = 1.609344 km/h. This page is built for speed limits, dashboards, and travel planning.",
    answerFromUnit: "mph",
    answerToUnit: "km/h",
    factorText: "1 mph = 1.609344 km/h",
    commonValues: [1, 10, 20, 30, 50, 60, 70, 100],
    quickConversions: [60, 70, 100],
    workedExamples: [
      { input: 60, context: "Common road speed conversion for US highways and travel planning." },
      { input: 70, context: "Useful for UK motorway limits and rental car dashboards." },
      { input: 100, context: "Often searched for performance specs and high-speed comparisons." },
    ],
    uses: [
      "Road sign checks when speed limits switch between imperial and metric countries.",
      "Rental car dashboards and GPS settings that use km/h instead of mph.",
      "Running, cycling, and treadmill speed comparisons across regions.",
    ],
    definitions: {
      fromTitle: "What is mph?",
      fromText: "Miles per hour is an imperial speed unit used on road signs, speedometers, and transport data in mph countries.",
      toTitle: "What is km/h?",
      toText: "Kilometers per hour is a metric speed unit used on road signs, dashboards, and maps in most countries.",
    },
    links: {
      reverse: { href: "/speed/kmh-to-mph", label: "km/h to mph" },
      sameSource: [
        { href: "/speed/mph-to-ms", label: "mph to m/s" },
        { href: "/speed/mph-to-knots", label: "mph to knots" },
        { href: "/speed/mph-to-mach", label: "mph to Mach" },
      ],
      sameTarget: [
        { href: "/speed/ms-to-kmh", label: "m/s to km/h" },
        { href: "/speed/knots-to-kmh", label: "knots to km/h" },
        { href: "/speed/mach-to-kmh", label: "Mach to km/h" },
      ],
      category: { href: "/speed", label: "speed converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "kmh-to-mph": {
    keyword: "km/h to mph",
    heading: "km/h to mph Converter",
    intro: "Convert kilometers per hour to miles per hour using the exact factor 1 km/h = 0.6213711922 mph. This page is built for European speed limits, road trips, and dashboard checks.",
    answerFromUnit: "km/h",
    answerToUnit: "mph",
    factorText: "1 km/h = 0.6213711922 mph",
    commonValues: [1, 10, 20, 30, 50, 80, 100, 120],
    quickConversions: [80, 100, 120],
    workedExamples: [
      { input: 80, context: "Common road speed comparison for highway travel and driving abroad." },
      { input: 100, context: "Frequent motorway speed lookup for mph drivers in metric countries." },
      { input: 120, context: "Useful for European motorway limits and vehicle top-speed checks." },
    ],
    uses: [
      "Road sign and speed limit checks in countries that use km/h instead of mph.",
      "Vehicle dashboards that need imperial speed equivalents.",
      "Cycling, running, and training plans that compare speed across systems.",
    ],
    definitions: {
      fromTitle: "What is km/h?",
      fromText: "Kilometers per hour is the standard metric speed unit for road travel in most countries.",
      toTitle: "What is mph?",
      toText: "Miles per hour is the speed unit used on roads and speedometers in mph countries.",
    },
    links: {
      reverse: { href: "/speed/mph-to-kmh", label: "mph to km/h" },
      sameSource: [
        { href: "/speed/kmh-to-ms", label: "km/h to m/s" },
        { href: "/speed/kmh-to-knots", label: "km/h to knots" },
        { href: "/speed/kmh-to-mach", label: "km/h to Mach" },
      ],
      sameTarget: [
        { href: "/speed/ms-to-mph", label: "m/s to mph" },
        { href: "/speed/knots-to-mph", label: "knots to mph" },
        { href: "/speed/mach-to-mph", label: "Mach to mph" },
      ],
      category: { href: "/speed", label: "speed converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "g-to-oz": {
    keyword: "grams to ounces",
    heading: "grams to ounces Converter",
    intro: "Convert grams to ounces using the exact factor 1 gram = 0.0352739619 ounces. This page is built for recipes, food labels, and package weights.",
    answerFromUnit: "g",
    answerToUnit: "oz",
    factorText: "1 gram = 0.0352739619 ounces",
    commonValues: [1, 10, 25, 50, 100, 250, 500, 1000],
    quickConversions: [100, 250, 500],
    workedExamples: [
      { input: 100, context: "Common cooking and nutrition label lookup." },
      { input: 250, context: "Useful for recipe prep, baking, and package sizing." },
      { input: 500, context: "Often searched for bulk ingredients and shipping weights." },
    ],
    uses: [
      "Recipe ingredient conversions between metric and ounce-based kitchen measurements.",
      "Nutrition labels and food packaging that list grams and ounces together.",
      "Parcel, retail, and supplement weights converted for imperial readers.",
    ],
    definitions: {
      fromTitle: "What is a gram?",
      fromText: "A gram is a metric unit of mass used for food labels, ingredients, and small package weights.",
      toTitle: "What is an ounce?",
      toText: "An ounce is an imperial and US customary unit of mass used in cooking, retail, and product labeling.",
    },
    links: {
      reverse: { href: "/weight/oz-to-g", label: "ounces to grams" },
      sameSource: [
        { href: "/weight/g-to-kg", label: "grams to kg" },
        { href: "/weight/g-to-lbs", label: "grams to lbs" },
        { href: "/weight/g-to-mg", label: "grams to mg" },
      ],
      sameTarget: [
        { href: "/weight/lbs-to-oz", label: "lbs to ounces" },
        { href: "/weight/st-to-oz", label: "stone to ounces" },
        { href: "/weight/mg-to-oz", label: "mg to ounces" },
      ],
      category: { href: "/weight", label: "weight converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "oz-to-g": {
    keyword: "ounces to grams",
    heading: "ounces to grams Converter",
    intro: "Convert ounces to grams using the exact factor 1 ounce = 28.349523125 grams. This page is built for recipes, package weights, and label comparisons.",
    answerFromUnit: "oz",
    answerToUnit: "g",
    factorText: "1 ounce = 28.349523125 grams",
    commonValues: [1, 2, 4, 8, 12, 16, 32, 64],
    quickConversions: [8, 16, 32],
    workedExamples: [
      { input: 8, context: "Common kitchen and food package reference." },
      { input: 16, context: "Useful for 1-pound equivalent checks and recipe scaling." },
      { input: 32, context: "Often searched for bulk ingredient, parcel, and retail weights." },
    ],
    uses: [
      "Recipe conversions from ounce-based ingredients into metric grams.",
      "Package, food, and supplement labels that compare ounces and grams.",
      "Retail and shipping weights converted for metric systems.",
    ],
    definitions: {
      fromTitle: "What is an ounce?",
      fromText: "An ounce is an imperial and US customary unit of mass used for food, retail, and small package weights.",
      toTitle: "What is a gram?",
      toText: "A gram is a metric unit of mass used for food labels, recipes, and product measurements.",
    },
    links: {
      reverse: { href: "/weight/g-to-oz", label: "grams to ounces" },
      sameSource: [
        { href: "/weight/oz-to-kg", label: "ounces to kg" },
        { href: "/weight/oz-to-lbs", label: "ounces to lbs" },
        { href: "/weight/oz-to-mg", label: "ounces to mg" },
      ],
      sameTarget: [
        { href: "/weight/lbs-to-g", label: "lbs to grams" },
        { href: "/weight/st-to-g", label: "stone to grams" },
        { href: "/weight/mg-to-g", label: "mg to grams" },
      ],
      category: { href: "/weight", label: "weight converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "c-to-f": {
    keyword: "c to f",
    heading: "c to f Converter",
    intro: "Convert Celsius to Fahrenheit with the exact formula. This page is built for weather checks, body temperature, and oven settings.",
    answerFromUnit: "C",
    answerToUnit: "F",
    factorText: "F = (C x 9/5) + 32",
    commonValues: [0, 10, 20, 25, 30, 37, 40, 100],
    quickConversions: [20, 37, 100],
    workedExamples: [
      { input: 20, context: "Common weather conversion for travel and daily forecasts." },
      { input: 37, context: "Standard body temperature lookup across temperature scales." },
      { input: 180, context: "Frequent baking conversion for ovens and recipes." },
    ],
    uses: [
      "Weather forecasts translated from Celsius into Fahrenheit.",
      "Body temperature readings checked across medical references.",
      "Oven and cooking temperatures converted for recipes and appliances.",
    ],
    definitions: {
      fromTitle: "What is Celsius?",
      fromText: "Celsius is the metric temperature scale used for weather, science, and everyday measurements in most countries.",
      toTitle: "What is Fahrenheit?",
      toText: "Fahrenheit is the temperature scale used mainly in the United States for weather, ovens, and household readings.",
    },
    links: {
      reverse: { href: "/temperature/f-to-c", label: "f to c" },
      sameSource: [
        { href: "/temperature/c-to-k", label: "c to k" },
      ],
      sameTarget: [
        { href: "/temperature/k-to-f", label: "k to f" },
      ],
      category: { href: "/temperature", label: "temperature converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "f-to-c": {
    keyword: "f to c",
    heading: "f to c Converter",
    intro: "Convert Fahrenheit to Celsius with the exact formula. This page is built for weather, body temperature, and cooking conversions.",
    answerFromUnit: "F",
    answerToUnit: "C",
    factorText: "C = (F - 32) x 5/9",
    commonValues: [32, 50, 68, 77, 86, 98.6, 104, 212],
    quickConversions: [68, 98.6, 212],
    workedExamples: [
      { input: 68, context: "Common weather conversion for room temperature and daily forecasts." },
      { input: 98.6, context: "Standard body temperature reference in Fahrenheit." },
      { input: 350, context: "Frequent oven conversion used in baking recipes." },
    ],
    uses: [
      "US weather readings converted into Celsius for metric regions.",
      "Body temperature references checked against Celsius thermometers.",
      "American oven temperatures converted for Celsius appliances.",
    ],
    definitions: {
      fromTitle: "What is Fahrenheit?",
      fromText: "Fahrenheit is a temperature scale used mainly in the United States for weather, cooking, and daily readings.",
      toTitle: "What is Celsius?",
      toText: "Celsius is the metric temperature scale used for weather, science, and household measurements in most countries.",
    },
    links: {
      reverse: { href: "/temperature/c-to-f", label: "c to f" },
      sameSource: [
        { href: "/temperature/f-to-k", label: "f to k" },
      ],
      sameTarget: [
        { href: "/temperature/k-to-c", label: "k to c" },
      ],
      category: { href: "/temperature", label: "temperature converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "km-to-miles": {
    keyword: "km to miles",
    heading: "km to miles Converter",
    intro: "Convert kilometers to miles using the exact factor 1 km = 0.6213711922 miles. This page is built for travel, running distances, and map reading.",
    answerFromUnit: "km",
    answerToUnit: "miles",
    factorText: "1 km = 0.6213711922 miles",
    commonValues: [1, 5, 10, 21.1, 42.2, 50, 80, 100],
    quickConversions: [5, 10, 100],
    workedExamples: [
      { input: 5, context: "Common race-distance lookup for a 5K." },
      { input: 10, context: "Useful for road trips, training plans, and route planning." },
      { input: 100, context: "Often searched for long drives, cycling, and endurance events." },
    ],
    uses: [
      "Race distances such as 5K, 10K, and longer events translated into miles.",
      "Road trip and map distances when signs and GPS use kilometers.",
      "Travel planning between metric and imperial countries.",
    ],
    definitions: {
      fromTitle: "What is a kilometer?",
      fromText: "A kilometer is a metric unit of length used for road distances, running routes, and maps.",
      toTitle: "What is a mile?",
      toText: "A mile is an imperial unit of length used for road travel and distance tracking in miles-based countries.",
    },
    links: {
      reverse: { href: "/length/miles-to-km", label: "miles to km" },
      sameSource: [
        { href: "/length/km-to-m", label: "km to meters" },
        { href: "/length/km-to-feet", label: "km to feet" },
        { href: "/length/km-to-yards", label: "km to yards" },
      ],
      sameTarget: [
        { href: "/length/m-to-miles", label: "meters to miles" },
        { href: "/length/feet-to-miles", label: "feet to miles" },
        { href: "/length/yards-to-miles", label: "yards to miles" },
      ],
      category: { href: "/length", label: "length converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "miles-to-km": {
    keyword: "miles to km",
    heading: "miles to km Converter",
    intro: "Convert miles to kilometers using the exact factor 1 mile = 1.609344 km. This page is built for travel, running, and map distance checks.",
    answerFromUnit: "mile",
    answerToUnit: "km",
    factorText: "1 mile = 1.609344 km",
    commonValues: [1, 5, 10, 13.1, 26.2, 50, 60, 100],
    quickConversions: [5, 26.2, 60],
    workedExamples: [
      { input: 5, context: "Common route and running distance lookup in metric units." },
      { input: 26.2, context: "Marathon distance reference converted to kilometers." },
      { input: 60, context: "Useful for road trip planning and highway distance estimates." },
    ],
    uses: [
      "US road distances converted into kilometers for international travel.",
      "Running plans and race references translated into metric distances.",
      "Map, GPS, and route comparisons between miles and kilometers.",
    ],
    definitions: {
      fromTitle: "What is a mile?",
      fromText: "A mile is an imperial unit of length used for road distance and travel in miles-based countries.",
      toTitle: "What is a kilometer?",
      toText: "A kilometer is a metric unit of length used for road signs, running routes, and map distances.",
    },
    links: {
      reverse: { href: "/length/km-to-miles", label: "km to miles" },
      sameSource: [
        { href: "/length/miles-to-m", label: "miles to meters" },
        { href: "/length/miles-to-feet", label: "miles to feet" },
        { href: "/length/miles-to-yards", label: "miles to yards" },
      ],
      sameTarget: [
        { href: "/length/m-to-km", label: "meters to km" },
        { href: "/length/feet-to-km", label: "feet to km" },
        { href: "/length/yards-to-km", label: "yards to km" },
      ],
      category: { href: "/length", label: "length converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "mb-to-gb": {
    keyword: "MB to GB",
    heading: "MB to GB Converter",
    intro: "Convert megabytes to gigabytes instantly. This tool is essential for managing data storage, cloud uploads, and understanding device capacity.",
    answerFromUnit: "MB",
    answerToUnit: "GB",
    factorText: "1 GB = 1024 MB (Decimal: 1 GB = 1000 MB)",
    commonValues: [500, 1024, 2048, 5120, 10240, 51200, 102400],
    quickConversions: [1024, 2048, 5120],
    workedExamples: [
      { input: 1024, context: "Standard conversion for 1 full gigabyte of data." },
      { input: 500, context: "Common size for high-quality video clips or small game updates." },
      { input: 5120, context: "Roughly 5 gigabytes, a typical free cloud storage tier limit." },
    ],
    uses: [
      "Checking data usage against mobile plan or ISP limits.",
      "Estimating how many files will fit on a USB drive or SD card.",
      "Converting cloud storage sizes for backup planning.",
    ],
    definitions: {
      fromTitle: "What is a Megabyte (MB)?",
      fromText: "A megabyte is a digital unit of information commonly used to measure file sizes like photos and songs.",
      toTitle: "What is a Gigabyte (GB)?",
      toText: "A gigabyte is a larger unit of digital storage, equal to 1024 megabytes, used for movies, games, and hard drive capacity.",
    },
    links: {
      reverse: { href: "/data/gb-to-mb", label: "GB to MB" },
      sameSource: [
        { href: "/data/mb-to-kb", label: "MB to KB" },
        { href: "/data/mb-to-tb", label: "MB to TB" },
      ],
      sameTarget: [
        { href: "/data/kb-to-gb", label: "KB to GB" },
        { href: "/data/tb-to-gb", label: "TB to GB" },
      ],
      category: { href: "/data", label: "data converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "sqft-to-acres": {
    keyword: "sq ft to acres",
    heading: "Square Feet to Acres Converter",
    intro: "Convert square feet to acres for real estate, landscaping, or land management. 1 acre equals exactly 43,560 square feet.",
    answerFromUnit: "sq ft",
    answerToUnit: "acres",
    factorText: "1 acre = 43,560 sq ft",
    commonValues: [1000, 5000, 10000, 20000, 43560, 100000, 200000],
    quickConversions: [43560, 87120, 217800],
    workedExamples: [
      { input: 43560, context: "Exactly one acre of land, a common reference for lot sizes." },
      { input: 10000, context: "Roughly a quarter-acre, typical for suburban residential lots." },
      { input: 217800, context: "A 5-acre property, often used for small farms or estates." },
    ],
    uses: [
      "Real estate listings where plot size is given in square feet but needs an acre equivalent.",
      "Landscaping and construction planning for large estates.",
      "Agriculture and zoning checks for land development.",
    ],
    definitions: {
      fromTitle: "What is a Square Foot?",
      fromText: "A square foot is a unit of area commonly used in US real estate for room and lot sizes.",
      toTitle: "What is an Acre?",
      toText: "An acre is a US customary and imperial unit of area used to measure large plots of land.",
    },
    links: {
      reverse: { href: "/area/acres-to-sqft", label: "acres to sq ft" },
      sameSource: [
        { href: "/area/sqft-to-sqm", label: "sq ft to sq meters" },
        { href: "/area/sqft-to-sqmi", label: "sq ft to sq miles" },
      ],
      sameTarget: [
        { href: "/area/sqm-to-acres", label: "sq meters to acres" },
        { href: "/area/sqmi-to-acres", label: "sq miles to acres" },
      ],
      category: { href: "/area", label: "area converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "m-to-feet": {
    keyword: "meters to feet",
    heading: "Meters to Feet Converter",
    intro: "Convert meters to feet with high precision. Essential for architectural plans, height measurements, and international engineering specs.",
    answerFromUnit: "m",
    answerToUnit: "feet",
    factorText: "1 meter = 3.280839895 feet",
    commonValues: [1, 2, 5, 10, 20, 50, 100],
    quickConversions: [1.7, 1.8, 2],
    workedExamples: [
      { input: 1.8, context: "Common human height in meters, converted for feet-based height checks." },
      { input: 10, context: "Useful for small building dimensions and room sizes." },
      { input: 100, context: "Frequent lookup for track and field, or construction plot lengths." },
    ],
    uses: [
      "Converting height from metric ID cards to feet for US forms.",
      "Scaling architectural drawings between metric and imperial systems.",
      "General distance checks for international sport and travel.",
    ],
    definitions: {
      fromTitle: "What is a Meter?",
      fromText: "A meter is the base unit of length in the metric system, used globally for science and construction.",
      toTitle: "What is a Foot?",
      toText: "A foot is a unit of length in the imperial and US customary systems, primarily used in the USA.",
    },
    links: {
      reverse: { href: "/length/feet-to-m", label: "feet to meters" },
      sameSource: [
        { href: "/length/m-to-cm", label: "meters to cm" },
        { href: "/length/m-to-inches", label: "meters to inches" },
      ],
      sameTarget: [
        { href: "/length/cm-to-feet", label: "cm to feet" },
        { href: "/length/inches-to-feet", label: "inches to feet" },
      ],
      category: { href: "/length", label: "length converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "liters-to-gallons": {
    keyword: "liters to gallons",
    heading: "Liters to Gallons Converter",
    intro: "Convert liters to US gallons accurately. Perfect for fuel calculations, aquarium planning, and liquid volume conversions.",
    answerFromUnit: "liters",
    answerToUnit: "gallons",
    factorText: "1 liter = 0.264172 US liquid gallons",
    commonValues: [1, 5, 10, 20, 50, 100],
    quickConversions: [3.785, 20, 50],
    workedExamples: [
      { input: 3.785, context: "Exactly one US gallon converted from liters." },
      { input: 50, context: "Common fuel tank capacity for mid-sized cars." },
      { input: 10, context: "Useful for large water bottles or aquarium maintenance." },
    ],
    uses: [
      "Calculating fuel consumption when traveling between metric and imperial regions.",
      "Determining chemical or nutrient mixtures for home and garden.",
      "Understanding volume specs for consumer goods sold internationally.",
    ],
    definitions: {
      fromTitle: "What is a Liter?",
      fromText: "A liter is a metric unit of volume used worldwide for drinks, fuel, and liquid chemicals.",
      toTitle: "What is a Gallon?",
      toText: "A gallon is a unit of liquid volume in the US customary system, equal to 128 fluid ounces.",
    },
    links: {
      reverse: { href: "/volume/gallons-to-liters", label: "gallons to liters" },
      sameSource: [
        { href: "/volume/liters-to-ml", label: "liters to ml" },
        { href: "/volume/liters-to-floz", label: "liters to fl oz" },
      ],
      sameTarget: [
        { href: "/volume/ml-to-gallons", label: "ml to gallons" },
        { href: "/volume/floz-to-gallons", label: "fl oz to gallons" },
      ],
      category: { href: "/volume", label: "volume converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "kw-to-hp": {
    keyword: "kW to hp",
    heading: "Kilowatts to Horsepower Converter",
    intro: "Convert kilowatts (kW) to mechanical horsepower (hp) instantly. Essential for automotive specs, engine performance, and electrical motor calculations.",
    answerFromUnit: "kilowatts",
    answerToUnit: "horsepower",
    factorText: "1 kW = 1.34102 mechanical horsepower",
    commonValues: [1, 50, 100, 150, 200, 500],
    quickConversions: [75, 150, 250],
    workedExamples: [
      { input: 150, context: "Common output for a 2.0L turbocharged car engine (approx 201 hp)." },
      { input: 0.75, context: "Standard power rating for a 1 hp small industrial motor." },
      { input: 500, context: "Power output for high-performance electric vehicle motors." },
    ],
    uses: [
      "Comparing engine power between European (kW) and US (hp) car specifications.",
      "Sizing industrial electric motors and pumps.",
      "Calculating mechanical work from electrical power consumption.",
    ],
    definitions: {
      fromTitle: "What is a Kilowatt?",
      fromText: "A kilowatt (kW) is a SI unit of power equal to 1000 watts, used globally for electrical and mechanical systems.",
      toTitle: "What is Horsepower?",
      toText: "Horsepower (hp) is a unit of measurement for power, originally defined by James Watt to compare engines with draft horses.",
    },
    links: {
      reverse: { href: "/power/hp-to-kw", label: "hp to kW" },
      sameSource: [
        { href: "/power/kw-to-w", label: "kW to W" },
        { href: "/power/kw-to-mw", label: "kW to MW" },
      ],
      sameTarget: [
        { href: "/power/w-to-hp", label: "W to hp" },
        { href: "/power/mw-to-hp", label: "MW to hp" },
      ],
      category: { href: "/power", label: "power converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "mg-to-g": {
    keyword: "mg to g",
    heading: "Milligrams to Grams Converter",
    intro: "Convert milligrams (mg) to grams (g) quickly. Ideal for clinical dosing, supplement measuring, and precision chemistry.",
    answerFromUnit: "milligrams",
    answerToUnit: "grams",
    factorText: "1 gram = 1000 milligrams",
    commonValues: [500, 1000, 2000, 5000],
    quickConversions: [500, 1000, 2500],
    workedExamples: [
      { input: 500, context: "A standard extra-strength Tylenol tablet is 500mg (0.5g)." },
      { input: 1000, context: "Exactly 1 gram, often the weight of a paperclip." },
      { input: 5000, context: "5 grams, common serving size for creatine or bulk supplements." },
    ],
    uses: [
      "Verifying medication dosages and clinical measurements.",
      "Measuring ingredients for high-precision laboratory experiments.",
      "Calculating nutritional values from food labels.",
    ],
    definitions: {
      fromTitle: "What is a Milligram?",
      fromText: "A milligram (mg) is a metric unit of mass equal to 1/1000 of a gram, used for very small quantities.",
      toTitle: "What is a Gram?",
      toText: "The gram (g) is a SI base unit of mass used for everything from cooking to science.",
    },
    links: {
      reverse: { href: "/weight/g-to-mg", label: "g to mg" },
      sameSource: [
        { href: "/weight/mg-to-kg", label: "mg to kg" },
        { href: "/weight/mg-to-mcg", label: "mg to mcg" },
      ],
      sameTarget: [
        { href: "/weight/mcg-to-g", label: "mcg to g" },
        { href: "/weight/kg-to-g", label: "kg to g" },
      ],
      category: { href: "/weight", label: "weight converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
  "cups-to-ml": {
    keyword: "cups to ml",
    heading: "Cups to Milliliters (ml) Converter",
    intro: "Convert US cups to milliliters (ml) for accurate baking and cooking. Our calculator uses the standard US legal cup (240ml).",
    answerFromUnit: "cups",
    answerToUnit: "milliliters",
    factorText: "1 US Cup = 236.588 ml",
    commonValues: [0.25, 0.5, 0.75, 1, 2, 4],
    quickConversions: [1, 2, 4],
    workedExamples: [
      { input: 1, context: "A standard large coffee cup measurement (approx 237ml)." },
      { input: 0.5, context: "Half-cup of milk or water for recipe scaling." },
      { input: 4, context: "Equivalent to 1 quart/liter for large cooking batches." },
    ],
    uses: [
      "Following international recipes that use metric measurements.",
      "Scaling baking ingredients for consistent professional results.",
      "Determining liquid volume for kitchen appliances and containers.",
    ],
    definitions: {
      fromTitle: "What is a Cup?",
      fromText: "A cup is a volume unit in the US customary system. In scientific cooking, a US legal cup is exactly 240ml.",
      toTitle: "What is Milliliter?",
      toText: "A milliliter (ml) is a metric unit of volume equal to 1/1000 of a liter, widely used in liquid measurements.",
    },
    links: {
      reverse: { href: "/volume/ml-to-cups", label: "ml to cups" },
      sameSource: [
        { href: "/volume/cups-to-liters", label: "cups to liters" },
        { href: "/volume/cups-to-tablespoons", label: "cups to tbsp" },
      ],
      sameTarget: [
        { href: "/volume/floz-to-ml", label: "fl oz to ml" },
        { href: "/volume/tablespoons-to-ml", label: "tbsp to ml" },
      ],
      category: { href: "/volume", label: "volume converters" },
      popular: { href: "/popular-conversion-tools", label: "popular conversions" },
    },
  },
};

export async function generateStaticParams() {
  return converters.map((c) => ({
    category: c.category,
    converter: c.metadata.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, converter: slug } = await params;
  const { canonicalConverter: converter } = resolveConverterRoute(category, slug);
  const cat = categories.find((c) => c.slug === category);

  if (!converter || !cat) {
    return {};
  }

  const canonicalPath = `/${category}/${converter.metadata.slug}`;
  const metadata = buildConverterPageMetadata(converter, cat, canonicalPath);

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: converterCanonical(category, converter.metadata.slug),
    },
  };
}

export default async function ConverterPage({ params }: PageProps) {
  const { category: categorySlug, converter: slug } = await params;
  const { canonicalConverter: converter, isAlias } = resolveConverterRoute(categorySlug, slug);
  const category = categories.find((c) => c.slug === categorySlug);

  if (!converter || !category) {
    notFound();
  }

  if (isAlias) {
    permanentRedirect(`/${categorySlug}/${converter.metadata.slug}`);
  }

  const reverseConverter = getReverseConverter(converter, converters);
  const priorityContent = getPriorityConverterContent(converter);
  const contextualLinks = getContextualRelatedConverters(converter, converters);
  const pageFaq = buildConverterFaq(converter, category, reverseConverter);
  const introContent = getIntroContent(converter, category, reverseConverter, contextualLinks);
  const formulaContent = getFormulaContent(converter);
  const conversionSteps = getConversionSteps(converter);
  const trustMetadata = getConverterTrustMetadata(converter, category);
  const staticValuePages = getStaticValuePagesForConverter(categorySlug, converter.metadata.slug);
  const priorityPageExperience = PRIORITY_PAGE_EXPERIENCES[converter.id];
  const isPriorityExperiencePage = Boolean(priorityPageExperience);
  const displayTitle = priorityContent?.heading ?? buildConverterHeading(converter.fromUnit, converter.toUnit);
  const instantAnswerValue = formatValue(convertValue(1, converter.fromUnit, converter.toUnit, converter.category));
  const instantAnswer = priorityPageExperience
    ? `1 ${priorityPageExperience.answerFromUnit} = ${instantAnswerValue} ${priorityPageExperience.answerToUnit}`
    : `1 ${converter.fromUnit} = ${instantAnswerValue} ${converter.toUnit}`;
  const workedExamples = priorityPageExperience
    ? priorityPageExperience.workedExamples.map((example) => ({
        ...example,
        output: formatValue(convertValue(example.input, converter.fromUnit, converter.toUnit, converter.category)),
      }))
    : [];
  const commonPriorityValues = priorityPageExperience
    ? priorityPageExperience.commonValues.map((value) => ({
        input: value,
        output: formatValue(convertValue(value, converter.fromUnit, converter.toUnit, converter.category)),
      }))
    : [];
  const quickPriorityValues = priorityPageExperience
    ? priorityPageExperience.quickConversions.map((value) => ({
        input: value,
        output: formatValue(convertValue(value, converter.fromUnit, converter.toUnit, converter.category)),
      }))
    : [];
  const formattedLastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(converter.metadata.lastUpdated));

  // Schema markup
  const pageFaqSchema = generateFAQSchema(pageFaq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })));
  const converterFaqSchema = generateFAQSchema(converter.faq.map((item) => ({
    question: item.question,
    answer: item.answer,
  })));

  const breadcrumbSchema = generateBreadcrumbSchemaFromPaths([
    { name: "Home", path: "/" },
    { name: category.name, path: `/${categorySlug}` },
    { name: converter.title, path: `/${categorySlug}/${converter.metadata.slug}` },
  ]);

  const howToSchema = generateHowToSchema(
    `How to Convert ${converter.fromUnit} to ${converter.toUnit}`,
    `Learn how to convert ${converter.fromUnit} to ${converter.toUnit} using the formula: ${converter.formula}`,
    [
      {
        name: `Enter the value in ${converter.fromUnit}`,
        text: `Type the number you want to convert from ${converter.fromUnit} into the input field.`,
      },
      {
        name: "Get the instant result",
        text: `The equivalent value in ${converter.toUnit} will appear instantly. Formula: ${converter.formula}`,
      },
      {
        name: "Use or reverse the conversion",
        text: `Copy the result or click the swap button to reverse the conversion.`,
      },
    ]
  );

  const webPageSchema = buildWebPageSchema({
    name: converter.title,
    description: converter.description,
    path: `/${categorySlug}/${converter.metadata.slug}`,
  });
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: converter.title,
    url: `https://convertaro.com/${categorySlug}/${converter.metadata.slug}`,
    description: converter.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // Get related converters
  const relatedConverters = converter.relatedConverters
    .map((id) => getCanonicalConverterById(id))
    .filter((item): item is Converter => Boolean(item));

  const uniqueRelatedConverters = dedupeCanonicalConverters(relatedConverters).slice(0, 6) as Converter[];
  const relatedRecommendations = getRelatedConverterCards(
    converter,
    dedupeCanonicalConverters([...(reverseConverter ? [reverseConverter] : []), ...contextualLinks, ...uniqueRelatedConverters])
  );

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(converterFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-pro py-8">
          <Breadcrumbs
            className="mb-4 flex items-center gap-2 text-sm text-slate-500"
            items={[
              { label: "Home", href: "/" },
              { label: category.name, href: `/${categorySlug}` },
              { label: displayTitle },
            ]}
          />

          {isPriorityExperiencePage && priorityPageExperience ? (
            <div className="space-y-4">
              <Link
                href={priorityPageExperience.links.reverse.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:text-slate-900"
              >
                Reverse conversion: {priorityPageExperience.links.reverse.label}
              </Link>
              <div className="grid gap-4 lg:grid-cols-[1fr_320px] lg:items-start">
                <div className="max-w-3xl">
                  <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">{displayTitle}</h1>
                  <p className="text-base text-slate-600">{priorityPageExperience.intro}</p>
                </div>
                <div className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 shadow-lg shadow-sky-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Instant answer</p>
                  <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{instantAnswer}</p>
                  <p className="mt-3 text-sm font-medium text-slate-600">Formula: {converter.formula}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-pro uppercase">{category.name} Converter</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">{displayTitle}</h1>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500 mb-3">{introContent.eyebrow}</p>
              <div className="max-w-3xl space-y-2 text-slate-600">
                <p>{introContent.summary}</p>
                <p className="text-sm text-slate-500">{introContent.intent}</p>
                {introContent.links.length > 0 ? (
                  <p className="text-sm text-slate-500">
                    Also useful: {introContent.links.map((item, index) => (
                      <span key={item.href}>
                        <Link href={item.href} className="font-medium text-slate-700 hover:text-slate-900 hover:underline">
                          {item.label}
                        </Link>
                        {index < introContent.links.length - 1 ? ", " : "."}
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="container-pro py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="border-b border-slate-200 px-4 py-3 bg-slate-50 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-medium text-slate-500">{converter.title}</span>
              </div>
              <div className="p-4">
                <ConverterTool converter={converter} />
              </div>
            </div>

            {isPriorityExperiencePage ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">Quick formula:</span> {converter.formula}
              </div>
            ) : null}

            {isPriorityExperiencePage && priorityPageExperience ? (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="mb-4">
                  <h2 className="font-semibold text-slate-900">Common {priorityPageExperience.keyword} values</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {commonPriorityValues.map((item) => (
                    <div key={item.input} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                      {formatValue(item.input)} {priorityPageExperience.answerFromUnit} = <span className="font-semibold text-slate-900">{item.output} {priorityPageExperience.answerToUnit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {isPriorityExperiencePage && priorityPageExperience ? (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="mb-4">
                  <h2 className="font-semibold text-slate-900">Worked examples</h2>
                  <p className="text-sm text-slate-500">Common {priorityPageExperience.keyword} searches with the exact calculation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {workedExamples.map((example) => (
                    <article key={example.input} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-base font-semibold text-slate-900">
                        {formatValue(example.input)} {priorityPageExperience.answerFromUnit} = {example.output} {priorityPageExperience.answerToUnit}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">{example.context}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {isPriorityExperiencePage && priorityPageExperience ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="bg-white border border-slate-200 rounded-lg p-5">
                  <h2 className="font-semibold text-slate-900">{priorityPageExperience.keyword} quick conversions</h2>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    {quickPriorityValues.map((item) => (
                      <p key={item.input}>
                        <span className="font-semibold text-slate-900">{formatValue(item.input)} {priorityPageExperience.keyword}</span> = {item.output} {priorityPageExperience.answerToUnit}
                      </p>
                    ))}
                  </div>
                </section>

                <section className="bg-white border border-slate-200 rounded-lg p-5">
                  <h2 className="font-semibold text-slate-900">Conversion factor</h2>
                  <p className="mt-4 text-lg font-semibold text-slate-900">{priorityPageExperience.factorText}</p>
                  <p className="mt-2 text-sm text-slate-600">Use the full factor or formula when precision matters.</p>
                </section>
              </div>
            ) : null}

            <AdSlot type="in-content" id="converter-tool-bottom-ad" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-slate-600" />
                  </div>
                  <h2 className="font-semibold text-slate-900">Conversion Formula</h2>
                </div>
                <div className="formula-box mb-3">{converter.formula}</div>
                <p className="text-sm text-slate-600 leading-6">{formulaContent.explanation}</p>
                <p className="mt-3 text-sm text-slate-500 leading-6">{formulaContent.note}</p>
                {converter.inverseFormula && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">Reverse</p>
                    <div className="bg-slate-100 px-3 py-2 rounded-md font-mono text-sm text-slate-700">{converter.inverseFormula}</div>
                    <p className="mt-2 text-sm text-slate-500">{formulaContent.reverseNote}</p>
                  </div>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 bg-slate-100 rounded-md flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-slate-600" />
                  </div>
                  <h2 className="font-semibold text-slate-900">How to Convert</h2>
                </div>
                <ol className="space-y-3">
                  {conversionSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-3 text-sm text-slate-600">
                      <span className="h-6 w-6 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">{index + 1}</span>
                      <span>
                        <strong className="block text-slate-800 mb-1">{step.title}</strong>
                        {step.body}
                      </span>
                    </li>
                  ))}
                </ol>
                <Link href={`/${categorySlug}`} className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-slate-700 hover:text-slate-900">
                  All {category.name} tools <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {isPriorityExperiencePage && priorityPageExperience ? `${priorityPageExperience.keyword} chart` : `${formatUnitLabel(converter.fromUnit)} → ${formatUnitLabel(converter.toUnit)} Table`}
                  </h2>
                  <p className="text-sm text-slate-500">Common reference values</p>
                </div>
                <Table className="h-5 w-5 text-slate-400" />
              </div>
              <ConversionTable converter={converter} defaultVisibleRows={isPriorityExperiencePage ? 20 : undefined} />
            </div>

            {staticValuePages.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="mb-4">
                  <h2 className="font-semibold text-slate-900">Popular {converter.fromUnit} values</h2>
                  <p className="text-sm text-slate-500">Open exact-value pages for common lookups on this converter.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {staticValuePages.map((entry) => {
                    const valueLabel = entry.value.replace(`-${entry.converter}`, "");

                    return (
                      <Link
                        key={entry.value}
                        href={`/${entry.category}/${entry.converter}/${entry.value}`}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                      >
                        {valueLabel} {converter.fromUnit} &rarr; {converter.toUnit}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h2 className="font-semibold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <FAQSection faq={pageFaq} />
            </div>

            <AdSlot type="in-content" id="converter-faq-top-ad" />

            {isPriorityExperiencePage && priorityPageExperience ? (
              <div className="space-y-6">
                <section className="rounded-lg border border-slate-200 bg-white p-5">
                  <h2 className="font-semibold text-slate-900">Unit definitions</h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm text-slate-600">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="font-semibold text-slate-900">{priorityPageExperience.definitions.fromTitle}</h3>
                      <p className="mt-2">{priorityPageExperience.definitions.fromText}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <h3 className="font-semibold text-slate-900">{priorityPageExperience.definitions.toTitle}</h3>
                      <p className="mt-2">{priorityPageExperience.definitions.toText}</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5">
                  <h2 className="font-semibold text-slate-900">Common uses for {priorityPageExperience.keyword}</h2>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {priorityPageExperience.uses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5">
                  <h2 className="font-semibold text-slate-900">Related {priorityPageExperience.keyword} conversions</h2>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p>
                      If you need the reverse direction, use the <Link href={priorityPageExperience.links.reverse.href} className="font-medium text-slate-900 hover:underline">{priorityPageExperience.links.reverse.label} converter</Link>.
                    </p>
                    {priorityPageExperience.links.sameSource.length > 0 ? (
                      <p>
                        If you want other conversions from the same starting unit, compare {priorityPageExperience.links.sameSource.map((item, index) => (
                          <span key={item.href}>
                            <Link href={item.href} className="font-medium text-slate-900 hover:underline">{item.label}</Link>
                            {index < priorityPageExperience.links.sameSource.length - 2 ? ", " : index === priorityPageExperience.links.sameSource.length - 2 ? ", and " : ""}
                          </span>
                        ))}.
                      </p>
                    ) : null}
                    {priorityPageExperience.links.sameTarget.length > 0 ? (
                      <p>
                        If you need another path into the same target unit, check {priorityPageExperience.links.sameTarget.map((item, index) => (
                          <span key={item.href}>
                            <Link href={item.href} className="font-medium text-slate-900 hover:underline">{item.label}</Link>
                            {index < priorityPageExperience.links.sameTarget.length - 2 ? ", " : index === priorityPageExperience.links.sameTarget.length - 2 ? ", and " : ""}
                          </span>
                        ))}.
                      </p>
                    ) : null}
                    <p>
                      You can browse the full <Link href={priorityPageExperience.links.category.href} className="font-medium text-slate-900 hover:underline">{priorityPageExperience.links.category.label}</Link> category or open <Link href={priorityPageExperience.links.popular.href} className="font-medium text-slate-900 hover:underline">{priorityPageExperience.links.popular.label}</Link> for other high-demand tools.
                    </p>
                  </div>
                </section>
              </div>
            ) : (
              <ConverterContentSections
                converter={converter}
                category={category}
                reverseConverter={reverseConverter}
                contextualLinks={contextualLinks}
              />
            )}

            <div className="space-y-3">
              <TrustMetadataBlock metadata={trustMetadata} title="Trust and editorial review" />
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <span className="font-medium text-slate-900">Last updated:</span> {formattedLastUpdated}
              </div>
            </div>

            {!isPriorityExperiencePage && relatedRecommendations.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowLeftRight className="h-5 w-5 text-slate-600" />
                  <h2 className="font-semibold text-slate-900">Related Converters</h2>
                </div>
                <p className="mb-4 text-sm text-slate-500">
                  These suggestions stay close to this conversion so you can compare nearby units without jumping to unrelated tools.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {relatedRecommendations.map(({ converter: rel, reason }) => (
                    <Link
                      key={rel.id}
                      href={`/${rel.category}/${rel.metadata.slug}`}
                      className="flex h-full flex-col justify-between gap-3 p-4 border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                      <div>
                        <span className="text-sm font-medium text-slate-700">{rel.title}</span>
                        <p className="mt-2 text-xs leading-5 text-slate-500">{reason}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600">
                        Open converter <ChevronRight className="h-4 w-4 text-slate-400" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <RecentConversions />
            <AdSlot type="sidebar" id="converter-sidebar-ad-1" className="hidden lg:flex" />
            <CategoryNavigation activeCategory={categorySlug} />
            <PopularToolsSidebar excludeSlug={slug} />
            <RelatedCalculators categoryContext={categorySlug} />

            {!isPriorityExperiencePage ? (
              <div className="bg-slate-900 rounded-lg p-5 text-white">
                <div className="h-8 w-8 bg-white/10 rounded-md flex items-center justify-center mb-3">
                  <Calculator className="h-4 w-4" />
                </div>
                <h3 className="font-semibold mb-1">Lightning Fast</h3>
                <p className="text-sm text-white/70">All calculations run on your device. Sub-millisecond results, zero server latency.</p>
              </div>
            ) : null}

            <div className="sticky top-6">
              <AdSlot type="sidebar" id="converter-sidebar-ad-2" />
            </div>
          </aside>
        </div>
      </div>
      <section className="container-pro py-12 border-t border-slate-100">
        <CrawlableLinkHub limitPerCategory={3} />
      </section>
    </div>
  );
}
