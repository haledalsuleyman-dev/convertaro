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
  faqs?: Array<{ question: string; answer: string; keywords: string[] }>;
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
    title: "Length Converters – cm, inches, feet, km, miles & More",
    description:
      "Instantly convert between centimeters, inches, feet, meters, kilometers, and miles. All tools include exact formulas, worked examples, and quick reference tables.",
    lead:
      "Start with the most-used length conversions: height in cm to feet, room sizes in meters to feet, running distances in km to miles, and screen sizes in inches.",
  },
  weight: {
    title: "Weight Converters – kg, lbs, grams & ounces",
    description:
      "Convert kilograms, pounds, grams, and ounces instantly with exact formulas and lookup tables. Covers body weight, luggage, shipping, and cooking measurements.",
    lead:
      "Most people use this hub for body weight in kg to lbs, recipe gram-to-ounce conversions, and luggage weight checks when traveling between metric and US systems.",
  },
  temperature: {
    title: "Temperature Converters – Celsius, Fahrenheit & Kelvin",
    description:
      "Convert Celsius, Fahrenheit, and Kelvin instantly with exact two-way formulas, a quick chart, and worked weather, cooking, and science examples.",
    lead:
      "Use these pages for daily weather checks, oven and cooking temperatures, body temperature readings, and science or lab work involving Kelvin.",
  },
  volume: {
    title: "Volume Converters – Liters, Gallons, Cups & mL",
    description:
      "Convert liters, US gallons, cups, and milliliters with exact formulas and practical kitchen, fuel, and container capacity examples. Fast and free.",
    lead:
      "The most searched tools here cover kitchen cups to milliliters, fuel in liters to gallons, beverage sizes, and aquarium volume checks.",
  },
  speed: {
    title: "Speed Converters – mph, km/h, Knots, m/s & More",
    description:
      "Convert mph, km/h, knots, and m/s with exact conversion factors, road-speed examples, and a quick travel reference chart. Free, instant, no sign-up.",
    lead:
      "Built for road trips, vehicle dashboards, flight speeds, and running pace — with clear labels and reversible formulas for every direction.",
  },
  data: {
    title: "Data Size Converters – MB, GB, TB & Storage Units",
    description:
      "Convert MB, GB, TB, and other storage units using the binary standard. Includes file size examples, download reference tables, and exact formulas.",
    lead:
      "Use these pages for storage plans, download sizes, cloud backups, and upload limits where getting the MB vs GB definition right matters.",
  },
};

const PRIORITY_CONVERTER_CONTENT: Record<string, PriorityConverterContent> = {
  [createConverterKey("length", "cm", "inches")]: {
    description:
      "Convert centimeters to inches with the exact 2.54 cm per inch relationship, common height examples, and a quick sizing chart.",
    metaDescription:
      "Convert cm to inches instantly — formula: in = cm / 2.54. Includes a height chart, common sizing examples, and a real-time calculator. Free, no sign-up.",
    summary:
      "Convert centimeters to inches instantly using the exact 1 in = 2.54 cm relationship. This is the most common metric-to-imperial length conversion used for height, screen sizes, clothing, and furniture measurements worldwide.",
    intent:
      "Most people need this when checking their height in feet and inches using a metric scale, shopping for US or UK clothing sizes, or comparing product dimensions across metric and imperial specs.",
    formula: "in = cm / 2.54",
    inverseFormula: "cm = in x 2.54",
    relatedConverters: ["cm-to-feet", "feet-to-cm", "inches-to-cm", "m-to-feet"],
    faqs: [
      {
        question: "How many inches is 170 cm?",
        answer: "170 cm equals approximately 66.93 inches, or about 5 feet 7 inches. Divide 170 by 2.54 to get the exact result.",
        keywords: ["170 cm to inches", "170 cm in feet and inches"],
      },
      {
        question: "How do I convert cm to inches without a calculator?",
        answer: "A quick mental trick: divide the centimeter value by 2.54, or use the approximation of dividing by 2.5 for a fast rough estimate. For example, 100 cm ÷ 2.5 = 40 inches (exact is 39.37).",
        keywords: ["cm to inches without calculator", "quick cm inches conversion trick"],
      },
      {
        question: "What is 180 cm in feet and inches?",
        answer: "180 cm is 70.87 inches, which equals 5 feet 10.87 inches — often rounded to 5 ft 11 in. This is a very common height reference for tall men.",
        keywords: ["180 cm in feet", "180 cm height in feet and inches"],
      },
      {
        question: "Why do clothing sizes use cm and inches interchangeably?",
        answer: "International fashion brands list measurements in both systems to serve global markets. EU and Asian sizes typically use centimeters, while US and UK sizes use inches. Converting between them correctly prevents sizing mistakes.",
        keywords: ["clothing sizes cm to inches", "clothing size conversion chart"],
      },
      {
        question: "How do I convert cm to inches for a screen size?",
        answer: "Screen sizes are measured diagonally. Divide the diagonal length in centimeters by 2.54 to get the screen size in inches. For example, a 40 cm screen is approximately 15.75 inches.",
        keywords: ["screen size cm to inches", "monitor cm to inches"],
      },
    ],
  },
  [createConverterKey("length", "inches", "cm")]: {
    description:
      "Convert inches to centimeters with the exact 1 inch = 2.54 centimeters formula, common height values, and a fast reference table.",
    metaDescription:
      "Convert inches to cm instantly — formula: cm = in × 2.54. Includes a height chart, US-to-metric examples, and results that update as you type.",
    summary:
      "Convert inches to centimeters instantly using the standard 1 in = 2.54 cm factor. Essential for translating US height readings, product specs, and display sizes into metric-compatible measurements.",
    intent:
      "Used most often when filling out metric-based forms, shopping from foreign brands, reading European sizing charts, or comparing product dimensions listed in imperial inches to specs shown in centimeters.",
    formula: "cm = in x 2.54",
    inverseFormula: "in = cm / 2.54",
    inputs: [1, 2, 5, 10, 12, 18, 24, 36, 48, 60, 65, 72, 75, 80, 100],
    relatedConverters: ["inches-to-feet", "feet-to-inches", "cm-to-inches", "feet-to-cm"],
    faqs: [
      {
        question: "How many cm is 5 feet 10 inches?",
        answer: "5 feet 10 inches equals 177.8 cm. First convert 5 feet to 60 inches, add 10 inches (total: 70 inches), then multiply by 2.54: 70 × 2.54 = 177.8 cm.",
        keywords: ["5 feet 10 inches in cm", "5 ft 10 to cm"],
      },
      {
        question: "How many cm is 6 feet?",
        answer: "6 feet is exactly 182.88 cm. Since 1 foot = 12 inches, 6 feet = 72 inches × 2.54 = 182.88 cm.",
        keywords: ["6 feet in cm", "6 ft to cm"],
      },
      {
        question: "What is 72 inches in cm?",
        answer: "72 inches equals exactly 182.88 cm. Multiply 72 × 2.54 = 182.88 cm. This is the same as 6 feet.",
        keywords: ["72 inches to cm", "72 inches in centimeters"],
      },
      {
        question: "How do I convert US shoe sizes from inches to cm?",
        answer: "Foot length is measured in inches and converted to cm by multiplying by 2.54. For example, a 10-inch foot length is 25.4 cm. Most shoe size charts pair this with the regional shoe size number.",
        keywords: ["shoe size inches to cm", "foot length in cm"],
      },
      {
        question: "Is 1 inch exactly 2.54 cm?",
        answer: "Yes. Since 1959, the international inch has been defined as exactly 25.4 mm or 2.54 cm by international agreement. This relationship is exact, not approximate.",
        keywords: ["is 1 inch 2.54 cm", "inch definition in cm"],
      },
    ],
  },
  [createConverterKey("weight", "kg", "lbs")]: {
    description:
      "Convert kilograms to pounds with the exact 1 kg = 2.2046226218 lb factor, common body-weight examples, and a quick chart.",
    metaDescription:
      "Convert kg to lbs instantly — formula: lb = kg × 2.20462. Covers body weight, luggage limits, and fitness tracking. Free real-time calculator.",
    summary:
      "Convert kilograms to pounds with the exact 1 kg = 2.20462 pound factor. The most searched weight conversion worldwide — used every day for body weight goals, international baggage limits, and fitness tracking across metric and US systems.",
    intent:
      "People land here when their gym tracker shows kilograms but they think in pounds, when an airline sets a luggage limit in kg and they need it in lbs, or when a US protein label lists grams and they need to cross-reference a UK product shown in ounces.",
    formula: "lb = kg x 2.2046226218",
    inverseFormula: "kg = lb x 0.45359237",
    relatedConverters: ["lbs-to-kg", "kg-to-grams", "pounds-to-ounces", "grams-to-ounces"],
    faqs: [
      {
        question: "How many pounds is 70 kg?",
        answer: "70 kg equals 154.32 pounds. Multiply 70 × 2.20462 = 154.32 lbs. This is a common male body weight in Europe and a frequent reference point for fitness and medical forms.",
        keywords: ["70 kg in pounds", "70 kg to lbs"],
      },
      {
        question: "How many lbs is 100 kg?",
        answer: "100 kg equals 220.46 pounds. A simple approximation is to multiply kg by 2.2, so 100 × 2.2 = 220 lbs — close but the exact factor is 2.20462.",
        keywords: ["100 kg in lbs", "100 kg to pounds"],
      },
      {
        question: "Is the kg to lbs conversion the same for body weight and luggage?",
        answer: "Yes — the conversion factor is always 1 kg = 2.20462 lbs regardless of what you are weighing. Whether it is body weight, luggage, or food, the math stays the same.",
        keywords: ["kg to lbs body weight", "kg to lbs luggage limit"],
      },
      {
        question: "What is a quick way to estimate kg to lbs in my head?",
        answer: "Multiply the kilograms by 2.2 for a fast estimate. For example: 80 kg × 2.2 = 176 lbs (exact is 176.37 lbs). This works well for everyday use where decimal precision is not critical.",
        keywords: ["quick kg to lbs estimate", "approximate kg to lbs"],
      },
      {
        question: "How do I convert kg to lbs for a barbell weight?",
        answer: "Barbell plate weights are often listed in both kg and lbs. To convert: multiply the kg value by 2.20462. A 20 kg plate is 44.09 lbs, a 10 kg plate is 22.05 lbs. Many gyms show both units on each plate.",
        keywords: ["barbell weight kg to lbs", "weight plates kg to pounds"],
      },
    ],
  },
  [createConverterKey("weight", "lbs", "kg")]: {
    description:
      "Convert pounds to kilograms with the exact 1 lb = 0.45359237 kg factor, body-weight examples, and a quick reference table.",
    metaDescription:
      "Convert lbs to kg instantly — formula: kg = lb × 0.45359. Perfect for health apps, luggage rules, and metric forms. Free, real-time, no sign-up.",
    summary:
      "Convert pounds to kilograms instantly using the exact 1 lb = 0.45359237 kg factor. Essential for health platform sign-ups, European medical forms, international shipping labels, and any US-to-metric weight translation.",
    intent:
      "This page is most needed when a US health app gives a weight goal in pounds that needs to go into a European fitness tracker in kilograms, or when an international parcel service shows a weight limit in kg and the package weight was measured in lbs.",
    formula: "kg = lb x 0.45359237",
    inverseFormula: "lb = kg x 2.2046226218",
    inputs: [1, 5, 10, 20, 25, 50, 75, 100, 120, 150, 160, 180, 200, 220, 250],
    relatedConverters: ["kg-to-lbs", "pounds-to-ounces", "kg-to-grams", "ounces-to-grams"],
    faqs: [
      {
        question: "How many kg is 150 lbs?",
        answer: "150 pounds equals 68.04 kg. Multiply 150 × 0.45359 = 68.04 kg. This is a very common reference for body weight and is often rounded to 68 kg on medical forms.",
        keywords: ["150 lbs in kg", "150 pounds to kg"],
      },
      {
        question: "How many kg is 200 lbs?",
        answer: "200 pounds equals approximately 90.72 kg. Multiply 200 × 0.45359 = 90.72 kg. This is a common weight class boundary in combat sports.",
        keywords: ["200 lbs in kg", "200 pounds to kg"],
      },
      {
        question: "What is a fast mental shortcut for lbs to kg?",
        answer: "Divide pounds by 2.2 for a quick estimate. Example: 180 lbs ÷ 2.2 = 81.8 kg (exact is 81.65 kg). Accurate enough for most practical uses.",
        keywords: ["lbs to kg shortcut", "quick pounds to kg calculation"],
      },
      {
        question: "Do US and UK pounds mean the same thing?",
        answer: "Yes. The avoirdupois pound (used for everyday weights in both countries) is defined as exactly 0.45359237 kg. There is a different 'troy pound' used for precious metals, but it is rarely encountered in everyday use.",
        keywords: ["US pound vs UK pound", "avoirdupois pound definition"],
      },
      {
        question: "How do I convert lbs to kg for a package shipping label?",
        answer: "Weigh the package in pounds, multiply by 0.45359 to get kilograms, then round to one decimal place as most carriers require. For example, a 22 lb package is 9.98 kg — typically shown as 10.0 kg on the label.",
        keywords: ["lbs to kg for shipping", "package weight pounds to kg"],
      },
    ],
  },
  [createConverterKey("length", "km", "miles")]: {
    description:
      "Convert kilometers to miles with the exact 1 km = 0.6213711922 mi factor, travel examples, and a race-distance reference chart.",
    metaDescription:
      "Convert km to miles instantly — formula: mi = km × 0.62137. Includes road trip distances, race lengths, and a quick chart. Free, no sign-up.",
    summary:
      "Convert kilometers to miles instantly with the exact 1 km = 0.62137 mile factor. Used every day for travel planning, running race distances, speed limit comparisons, and map reading between metric and imperial countries.",
    intent:
      "Most common when a GPS or map app shows road distances in kilometers but you are used to miles, when checking a race distance (5K, 10K, half marathon, marathon) against its mile equivalent, or when converting European speed limits into mph.",
    formula: "mi = km x 0.6213711922",
    inverseFormula: "km = mi x 1.609344",
    inputs: [1, 2, 3, 5, 10, 15, 21, 25, 42, 50, 100],
    relatedConverters: ["miles-to-km", "mph-to-kmh", "kmh-to-mph", "m-to-feet"],
    faqs: [
      {
        question: "How many miles is 5 km?",
        answer: "5 km is approximately 3.11 miles. Multiply 5 × 0.62137 = 3.107 miles. A 5K race is the most common running event distance globally.",
        keywords: ["5 km in miles", "5K to miles"],
      },
      {
        question: "How many km is a marathon in miles?",
        answer: "A marathon is 42.195 km, which equals approximately 26.22 miles (the official distance is 26 miles 385 yards). The 5K race is 3.11 miles, and the half marathon (21.0975 km) is 13.11 miles.",
        keywords: ["marathon km to miles", "marathon distance in miles"],
      },
      {
        question: "How do I convert km to miles quickly in my head?",
        answer: "A useful trick: multiply kilometers by 0.6 for a rough estimate. More precisely, multiply by 5/8 (which is 0.625). Example: 80 km × 0.625 = 50 miles (exact is 49.71 miles — close enough for navigation.",
        keywords: ["km to miles quick estimate", "kilometer to miles mental math"],
      },
      {
        question: "What is 100 km in miles?",
        answer: "100 km equals approximately 62.14 miles. This is a common benchmark for long-distance drives, cycling events, and ultra-running challenges.",
        keywords: ["100 km in miles", "100 kilometers to miles"],
      },
      {
        question: "Why do some countries use km and others use miles?",
        answer: "Kilometers are part of the metric system, used by most of the world. Miles remain the official road distance unit in the United States, United Kingdom, and a few other countries. Canada uses km for road signs but miles is still understood informally.",
        keywords: ["why km vs miles", "countries that use miles vs km"],
      },
    ],
  },
  [createConverterKey("length", "miles", "km")]: {
    description:
      "Convert miles to kilometers with the exact 1 mile = 1.609344 km factor, travel examples, and a quick distance chart.",
    metaDescription:
      "Convert miles to km instantly — formula: km = mi × 1.609344. Covers road trips, race distances, and map readings. Free real-time calculator.",
    summary:
      "Convert miles to kilometers instantly using the exact 1 mile = 1.609344 km factor. Essential when GPS apps switch between systems, when mapping US highway distances to metric equivalents, or when comparing race times from different countries.",
    intent:
      "Most used when a US road distance needs to be expressed in km for an international audience, when a fitness app shows miles but a training plan is written in km, or when converting US speed limits to km/h equivalent distances.",
    formula: "km = mi x 1.609344",
    inverseFormula: "mi = km x 0.6213711922",
    inputs: [1, 2, 3, 5, 10, 13.1, 26.2, 50, 100],
    relatedConverters: ["km-to-miles", "mph-to-kmh", "kmh-to-mph", "meters-to-yards"],
    faqs: [
      {
        question: "How many km is 1 mile?",
        answer: "1 mile is exactly 1.609344 km, as defined by international agreement in 1959. This factor is the same for road miles, nautical miles aside — which use a separate 1.852 km factor.",
        keywords: ["1 mile in km", "how many km is one mile"],
      },
      {
        question: "How many km is 26.2 miles (a marathon)?",
        answer: "A marathon (26.2 miles) is 42.195 km. Multiply 26.2 × 1.609344 = 42.165 km — the official distance is 42.195 km, set since 1908.",
        keywords: ["26.2 miles to km", "marathon in kilometers"],
      },
      {
        question: "What is 60 miles in km?",
        answer: "60 miles is approximately 96.56 km. Multiply 60 × 1.609344 = 96.56 km. This is a typical highway driving range for a single hour at 60 mph.",
        keywords: ["60 miles in km", "60 mph in km"],
      },
      {
        question: "How do I convert miles to km quickly without divide?",
        answer: "Multiply miles by 1.6 for a quick estimate. Example: 50 miles × 1.6 = 80 km (exact is 80.47 km). For a tighter estimate multiply by 8 and divide by 5: 50 × 8 / 5 = 80 km.",
        keywords: ["miles to km quick estimate", "multiply miles to get km"],
      },
    ],
  },
  [createConverterKey("temperature", "C", "F")]: {
    description:
      "Convert Celsius to Fahrenheit with the exact reverse formula, weather and cooking examples, and a fast temperature chart.",
    metaDescription:
      "Convert Celsius to Fahrenheit instantly — formula: °F = (°C × 9/5) + 32. Covers weather, oven temps, and body temperature. Free, real-time.",
    summary:
      "Convert Celsius to Fahrenheit instantly with the two-step formula: multiply by 9/5 then add 32. The single most searched temperature conversion — used for weather forecasts, oven settings, body temperature charts, and hot/cold references when traveling between metric and US-system countries.",
    intent:
      "People use this most when checking a weather app that shows Celsius while they are used to Fahrenheit, when a recipe uses °F oven temperatures but their appliance only shows °C, or when a health guide lists a normal body temperature in one scale and they need the equivalent in the other.",
    relatedConverters: ["fahrenheit-to-celsius", "celsius-to-kelvin", "fahrenheit-to-kelvin"],
    faqs: [
      {
        question: "What is 100°C in Fahrenheit?",
        answer: "100°C is 212°F — the boiling point of water at sea level. Formula: (100 × 9/5) + 32 = 180 + 32 = 212°F.",
        keywords: ["100 Celsius in Fahrenheit", "boiling point Celsius to Fahrenheit"],
      },
      {
        question: "What is 37°C in Fahrenheit?",
        answer: "37°C equals 98.6°F, which is the standard normal human body temperature. Formula: (37 × 9/5) + 32 = 66.6 + 32 = 98.6°F.",
        keywords: ["37 Celsius to Fahrenheit", "body temperature Celsius to Fahrenheit"],
      },
      {
        question: "What temperature is the same in both Celsius and Fahrenheit?",
        answer: "-40° is the unique point where Celsius and Fahrenheit are equal. (−40 × 9/5) + 32 = −72 + 32 = −40°F. This is used as a reference in extreme cold weather contexts.",
        keywords: ["same temperature Celsius Fahrenheit", "-40 Celsius equals Fahrenheit"],
      },
      {
        question: "How do I quickly estimate Celsius to Fahrenheit in my head?",
        answer: "Double the Celsius value and add 30 for a fast approximation. Example: 20°C → (20 × 2) + 30 = 70°F (exact is 68°F). For cold temps this can be off by a few degrees, but it works well in the 10–30°C everyday range.",
        keywords: ["quick Celsius to Fahrenheit estimate", "Celsius to Fahrenheit mental math"],
      },
      {
        question: "What is 180°C in Fahrenheit for baking?",
        answer: "180°C equals 356°F. This is a very common baking temperature — most cookie and cake recipes that call for 350°F are using roughly 175–180°C. The formula: (180 × 9/5) + 32 = 324 + 32 = 356°F.",
        keywords: ["180 Celsius in Fahrenheit", "baking temperature 180C to F"],
      },
    ],
  },
  [createConverterKey("temperature", "F", "C")]: {
    description:
      "Convert Fahrenheit to Celsius with the exact reverse formula, weather and cooking examples, and a quick temperature chart.",
    metaDescription:
      "Convert Fahrenheit to Celsius instantly — formula: °C = (°F − 32) × 5/9. For weather, ovens, body temp and science. Free real-time calculator.",
    summary:
      "Convert Fahrenheit to Celsius instantly using the standard (°F − 32) × 5/9 formula. Key for understanding US weather readings in metric countries, converting American baking recipes to European oven settings, and reading health references across temperature scales.",
    intent:
      "Most needed when an American weather app shows 95°F on a trip abroad and you need to know if it is hot, when a US cookbook calls for 350°F and your oven shows Celsius, or when a medical guideline quotes a fever threshold in Fahrenheit that your thermometer displays in Celsius.",
    inputs: [0, 10, 20, 32, 40, 50, 68, 77, 86, 98.6, 100, 150, 212],
    relatedConverters: ["celsius-to-fahrenheit", "celsius-to-kelvin", "fahrenheit-to-kelvin"],
    faqs: [
      {
        question: "What is 32°F in Celsius?",
        answer: "32°F is exactly 0°C — the freezing point of water. Formula: (32 − 32) × 5/9 = 0°C.",
        keywords: ["32 Fahrenheit in Celsius", "freezing point Fahrenheit Celsius"],
      },
      {
        question: "What is 98.6°F in Celsius?",
        answer: "98.6°F equals 37°C, the standard normal human body temperature. Formula: (98.6 − 32) × 5/9 = 66.6 × 5/9 = 37°C.",
        keywords: ["98.6 Fahrenheit in Celsius", "body temperature 98.6F to C"],
      },
      {
        question: "What is 212°F in Celsius?",
        answer: "212°F is exactly 100°C — the boiling point of water at sea level. Formula: (212 − 32) × 5/9 = 180 × 5/9 = 100°C.",
        keywords: ["212 Fahrenheit in Celsius", "boiling point Fahrenheit to Celsius"],
      },
      {
        question: "What is 350°F in Celsius?",
        answer: "350°F equals approximately 176.7°C. Formula: (350 − 32) × 5/9 = 318 × 5/9 ≈ 176.7°C. This is a very common oven temperature for baking — often rounded to 175°C.",
        keywords: ["350 Fahrenheit to Celsius", "350F oven temperature in Celsius"],
      },
      {
        question: "What temperature is 104°F in Celsius?",
        answer: "104°F equals exactly 40°C. This is an important health reference point — a temperature above 40°C (104°F) is considered a high fever requiring immediate medical attention.",
        keywords: ["104 Fahrenheit in Celsius", "fever 104F to Celsius"],
      },
    ],
  },
  [createConverterKey("length", "m", "feet")]: {
    description:
      "Convert meters to feet with the exact 1 meter = 3.280839895 feet factor, room-size examples, and a fast chart.",
    metaDescription:
      "Convert meters to feet instantly — formula: ft = m × 3.28084. Covers room sizes, construction plans, and field dimensions. Free, no sign-up.",
    summary:
      "Convert meters to feet with the exact 1 m = 3.28084 feet factor. Critical for reading international floor plans in imperial units, comparing building heights, checking ceiling clearances, and any construction or renovation project that mixes metric and imperial measurements.",
    intent:
      "Most commonly used by architects and contractors working across international standards, real estate buyers comparing property listings in different systems, and anyone measuring a room or outdoor space where one tool gives meters but a reference chart uses feet.",
    formula: "ft = m x 3.280839895",
    inverseFormula: "m = ft x 0.3048",
    inputs: [1, 2, 3, 5, 10, 20, 30, 50, 100],
    relatedConverters: ["feet-to-m", "meters-to-yards", "feet-to-inches", "cm-to-feet"],
    faqs: [
      {
        question: "How many feet is 3 meters?",
        answer: "3 meters equals 9.84 feet. Multiply 3 × 3.280839895 = 9.84 feet. This is a common ceiling height in modern residential construction.",
        keywords: ["3 meters in feet", "3m to feet"],
      },
      {
        question: "How many feet is 1.8 meters?",
        answer: "1.8 meters equals approximately 5.91 feet, or about 5 feet 11 inches. This falls close to the average male height in many countries.",
        keywords: ["1.8 meters in feet", "1.8 m to feet"],
      },
      {
        question: "How do I convert meters to feet and inches?",
        answer: "First convert meters to feet by multiplying by 3.28084. Take the decimal part of the result and multiply by 12 to get the remaining inches. Example: 1.75 m = 5.74 feet = 5 feet + (0.74 × 12) = 5 feet 8.9 inches.",
        keywords: ["meters to feet and inches", "m to ft in conversion"],
      },
      {
        question: "How tall is a 10-meter building in feet?",
        answer: "A 10-meter building is approximately 32.81 feet tall. Typical floor heights run 3–3.5 m (9.8–11.5 ft) per story, so a 10-meter structure is roughly a 3-story building.",
        keywords: ["10 meters to feet", "building height meters to feet"],
      },
    ],
  },
  [createConverterKey("length", "feet", "m")]: {
    description:
      "Convert feet to meters with the exact 1 foot = 0.3048 meters factor, room-size examples, and a quick chart.",
    metaDescription:
      "Convert feet to meters instantly — formula: m = ft × 0.3048. For room plans, listings, equipment specs, and international forms. Free.",
    summary:
      "Convert feet to meters using the exact 1 ft = 0.3048 m definition. Used by engineers, athletes, and international shoppers whenever an imperial measurement must translate to SI metric units — from room plans and track distances to product spec sheets.",
    intent:
      "Most searched when a US property listing gives dimensions in feet that need converting for a European buyer, when a track or field distance printed in feet needs to match an international athletic record in meters, or when equipment specs list height in feet but an international standard requires meters.",
    formula: "m = ft x 0.3048",
    inverseFormula: "ft = m x 3.280839895",
    inputs: [1, 2, 3, 5, 6, 10, 20, 30, 50, 100],
    relatedConverters: ["m-to-feet", "feet-to-inches", "inches-to-feet", "meters-to-yards"],
    faqs: [
      {
        question: "How many meters is 6 feet?",
        answer: "6 feet equals 1.8288 meters. Multiply 6 × 0.3048 = 1.8288 m. This is close to average adult male height in many Western countries.",
        keywords: ["6 feet in meters", "6 ft to m"],
      },
      {
        question: "How many meters is 5 feet 9 inches?",
        answer: "5 feet 9 inches equals 1.7526 meters. First convert to inches: (5 × 12) + 9 = 69 inches. Then multiply by 0.0254: 69 × 0.0254 = 1.7526 m.",
        keywords: ["5 feet 9 inches in meters", "5 ft 9 to meters"],
      },
      {
        question: "Is 1 foot exactly 0.3048 meters?",
        answer: "Yes. Since the International Yard and Pound Agreement of 1959, the foot is defined as exactly 0.3048 meters. This is not an approximation — it is the legal definition used in engineering, surveying, and science.",
        keywords: ["1 foot to meters exact", "foot definition in meters"],
      },
      {
        question: "How do I convert a room's square footage to square meters?",
        answer: "To convert square footage to square meters, multiply the area in sq ft by 0.0929. For example, a 200 sq ft room = 200 × 0.0929 = 18.58 sq m. Alternatively, convert each foot dimension to meters first, then multiply: if the room is 10 ft × 20 ft, that is 3.048 m × 6.096 m = 18.58 sq m.",
        keywords: ["square feet to square meters", "room size feet to meters"],
      },
    ],
  },
  [createConverterKey("speed", "mph", "kmh")]: {
    description:
      "Convert miles per hour to kilometers per hour with the exact 1 mph = 1.609344 km/h factor and common driving-speed examples.",
    metaDescription:
      "Convert mph to km/h instantly — formula: km/h = mph × 1.609344. For road signs, rental cars, and speed limit checks. Free real-time tool.",
    summary:
      "Convert mph to km/h instantly with the exact 1 mph = 1.609344 km/h factor. Used every day by travelers checking foreign speed limits, drivers in rental cars with metric dashboards, and athletes comparing running or cycling performance across imperial and metric systems.",
    intent:
      "Most needed when driving in the US or UK with a metric dashboard, when European speed limit signs show km/h and you are familiar with mph, or when syncing treadmill speed settings that switch between the two systems.",
    formula: "km/h = mph x 1.609344",
    inverseFormula: "mph = km/h x 0.6213711922",
    inputs: [1, 10, 20, 30, 40, 50, 60, 70, 80, 100, 120],
    relatedConverters: ["kmh-to-mph", "knots-to-mph", "m-to-feet", "km-to-miles"],
    faqs: [
      {
        question: "How many km/h is 60 mph?",
        answer: "60 mph equals 96.56 km/h. Multiply 60 × 1.609344 = 96.56 km/h. This is a common highway speed limit in the US and translates to roughly a 100 km/h European motorway speed.",
        keywords: ["60 mph in km/h", "60 miles per hour to km"],
      },
      {
        question: "How many km/h is 100 mph?",
        answer: "100 mph equals 160.93 km/h. Multiply 100 × 1.609344 = 160.93 km/h. This is well above most motorway speed limits worldwide.",
        keywords: ["100 mph in kmh", "100 mph to km/h"],
      },
      {
        question: "What is the 70 mph speed limit in km/h?",
        answer: "70 mph (the UK motorway limit) equals approximately 112.65 km/h. Most GPS devices and European road signs will show this as 113 km/h when rounded.",
        keywords: ["70 mph to km/h", "UK speed limit km/h"],
      },
      {
        question: "How fast is 130 km/h in mph?",
        answer: "130 km/h equals approximately 80.78 mph. Divide 130 by 1.609344 = 80.78 mph. Some European motorways have a 130 km/h limit, which is close to 81 mph.",
        keywords: ["130 km/h in mph", "130 kmh to mph"],
      },
      {
        question: "What is a quick way to convert mph to km/h in your head?",
        answer: "Multiply mph by 1.6 for a fast estimate. Example: 50 mph × 1.6 = 80 km/h (exact: 80.47 km/h). For a tighter estimate, multiply by 8 and divide by 5 (or multiply by 1.609344).",
        keywords: ["mph to kmh quick estimate", "convert speed mph to km/h trick"],
      },
    ],
  },
  [createConverterKey("speed", "kmh", "mph")]: {
    description:
      "Convert kilometers per hour to miles per hour with the exact 1 km/h = 0.6213711922 mph factor and common driving examples.",
    metaDescription:
      "Convert km/h to mph instantly — formula: mph = km/h × 0.62137. For speed limits, road trips, and dashboard readings. Free real-time tool.",
    summary:
      "Convert km/h to mph instantly using the exact 1 km/h = 0.62137 mph factor. Essential for understanding European speed limits in mph, translating a metric car dashboard to imperial values, or comparing athlete performance data across different regional measurement standards.",
    intent:
      "Most searched when a European road sign shows km/h and the driver is from an mph country, when a running race publishes pace in km and a coach needs to compare times in miles per hour, or when a vehicle spec list shows top speed in km/h and needs converting to mph.",
    formula: "mph = km/h x 0.6213711922",
    inverseFormula: "km/h = mph x 1.609344",
    inputs: [1, 10, 20, 30, 40, 50, 60, 80, 100, 120, 130],
    relatedConverters: ["mph-to-kmh", "knots-to-mph", "km-to-miles", "miles-to-km"],
    faqs: [
      {
        question: "How many mph is 100 km/h?",
        answer: "100 km/h equals approximately 62.14 mph. Multiply 100 × 0.62137 = 62.14 mph. This is the standard motorway baseline speed in many European countries.",
        keywords: ["100 km/h in mph", "100 kmh to mph"],
      },
      {
        question: "How many mph is 120 km/h?",
        answer: "120 km/h equals approximately 74.56 mph. Multiply 120 × 0.62137 = 74.56 mph. This is a common motorway limit in France, Spain, and Germany's autobahn advisory speeds.",
        keywords: ["120 km/h in mph", "120 kmh to mph"],
      },
      {
        question: "What is 25 km/h in mph?",
        answer: "25 km/h equals approximately 15.53 mph. Multiply 25 × 0.62137 = 15.53 mph. This is a typical urban cycling speed or a pedestrian zone speed limit.",
        keywords: ["25 km/h in mph", "cycling speed km/h to mph"],
      },
    ],
  },
  [createConverterKey("data", "MB", "GB")]: {
    description:
      "Convert megabytes to gigabytes using the binary storage standard where 1 GB = 1024 MB, with common file-size examples and a quick chart.",
    metaDescription:
      "Convert MB to GB instantly — binary standard: 1 GB = 1024 MB. For download sizes, storage plans, and backups. Free, accurate, no sign-up.",
    summary:
      "Convert megabytes to gigabytes instantly using the binary standard (1 GB = 1024 MB). Essential for understanding download sizes, checking cloud storage quotas, and comparing app file sizes against device storage capacity — using the same convention your operating system uses.",
    intent:
      "Most needed when a streaming platform states a video download size in MB and you need to know how much of your 64 GB phone storage it occupies, when a cloud backup plan lists its quota in GB but your files are shown in MB by your computer, or when comparing two NAS drive plans with different base unit assumptions.",
    note:
      "This page uses the binary storage standard: 1 GB = 1024 MB. If your source uses decimal marketing units, confirm the convention before comparing totals.",
    formula: "GB = MB / 1024",
    inverseFormula: "MB = GB x 1024",
    inputs: [1, 10, 50, 100, 250, 500, 512, 1024, 2048, 4096],
    relatedConverters: ["gigabytes-to-megabytes", "gigabytes-to-terabytes", "megabytes-to-terabytes"],
    faqs: [
      {
        question: "How many MB is 1 GB?",
        answer: "Using the binary standard (used by Windows, macOS, and most operating systems): 1 GB = 1,024 MB. Using the decimal standard (used in hard drive marketing): 1 GB = 1,000 MB. Always check which standard your device or service uses.",
        keywords: ["how many MB is 1 GB", "megabytes in a gigabyte"],
      },
      {
        question: "Is 1000 MB equal to 1 GB?",
        answer: "In the decimal system (SI), 1 GB = 1,000 MB. In the binary system used by operating systems, 1 GB = 1,024 MB. Hard drive manufacturers often use the 1,000 MB definition, which is why a '500 GB' drive appears as ~465 GB on your computer.",
        keywords: ["1000 MB equals 1 GB?", "MB to GB decimal vs binary"],
      },
      {
        question: "How many MB is a 2-hour HD movie?",
        answer: "A 2-hour HD (1080p) movie typically ranges from 3,000–8,000 MB (3–8 GB) depending on encoding. A lower-quality 720p version might be 1,500–3,000 MB, while 4K HDR can reach 40,000–80,000 MB (40–80 GB).",
        keywords: ["movie size MB to GB", "how many MB is a movie"],
      },
      {
        question: "Why does my 256 GB phone show less available storage?",
        answer: "Phone manufacturers measure storage in decimal GB (1 GB = 1,000 MB), but your device's OS measures in binary GB (1 GB = 1,024 MB). A 256 decimal GB drive is only about 238 binary GB. Pre-installed apps and the OS also consume some storage.",
        keywords: ["phone storage less than advertised", "256 GB shows less storage"],
      },
    ],
  },
  [createConverterKey("data", "GB", "MB")]: {
    description:
      "Convert gigabytes to megabytes using the binary storage standard where 1 GB = 1024 MB, with common storage examples and a quick table.",
    metaDescription:
      "Convert GB to MB instantly — binary standard: 1 GB = 1024 MB. For memory cards, storage plans, and software downloads. Free, no sign-up.",
    summary:
      "Convert gigabytes to megabytes instantly using the binary standard (1 GB = 1,024 MB). Used when comparing storage allocations in MB with device capacity listed in GB, or when a download manager reports progress in MB for a file described in GB.",
    intent:
      "Most used when a software installer lists its total size in GB but your download speed is displayed in MB/s, when a game update is described in GB but your remaining phone storage shows MB, or when calculating exactly how many MB a 1.5 GB monthly data cap represents.",
    note:
      "This page uses the binary storage standard: 1 GB = 1024 MB. That matches many operating-system and technical storage tools.",
    formula: "MB = GB x 1024",
    inverseFormula: "GB = MB / 1024",
    inputs: [1, 2, 5, 10, 20, 50, 100, 256, 512, 1024],
    relatedConverters: ["megabytes-to-gigabytes", "gigabytes-to-terabytes", "megabytes-to-terabytes"],
    faqs: [
      {
        question: "How many MB is 2 GB?",
        answer: "2 GB equals 2,048 MB using the binary standard (2 × 1,024 = 2,048 MB). This is a common size for smartphone plan data caps and some operating system update packages.",
        keywords: ["2 GB in MB", "how many MB is 2 GB"],
      },
      {
        question: "How many MB is 4 GB of RAM?",
        answer: "4 GB of RAM equals 4,096 MB (4 × 1,024 = 4,096 MB). RAM always uses the binary measurement convention since it is measured in powers of 2.",
        keywords: ["4 GB RAM in MB", "how many MB is 4 GB RAM"],
      },
      {
        question: "How long does it take to download 1 GB on different speeds?",
        answer: "1 GB = 1,024 MB = 8,192 megabits. At 100 Mbps (fast broadband): ~82 seconds. At 10 Mbps: ~820 seconds (~14 min). At 1 Mbps: ~2.3 hours. Note: internet speeds are in megabits (Mb), not megabytes (MB) — divide by 8 to convert.",
        keywords: ["download time 1 GB", "how long to download 1 GB"],
      },
    ],
  },
  [createConverterKey("volume", "L", "gal")]: {
    description:
      "Convert liters to US gallons with the exact 1 L = 0.2641720524 gal factor, fuel and container examples, and a quick chart.",
    metaDescription:
      "Convert liters to US gallons instantly — formula: gal = L × 0.26417. For fuel, water storage, and beverage containers. Free real-time tool.",
    summary:
      "Convert liters to US gallons instantly using the exact 1 L = 0.26417 gallon factor. Essential for comparing fuel prices across countries, sizing water storage tanks, converting beverage container volumes, and translating aquarium capacity in liters to gallon-based fish care guides.",
    intent:
      "Most used when buying fuel in a country that sells by the liter while thinking in gallons per tank, when an online aquarium guide uses gallons but the tank label shows liters, or when comparing pool or container sizes between metric and US-system countries.",
    note:
      "This page uses US gallons. If you need Imperial gallons, the result will be different, so confirm the gallon standard first.",
    formula: "gal = L x 0.2641720524",
    inverseFormula: "L = gal x 3.785411784",
    inputs: [1, 2, 5, 10, 20, 50, 100],
    relatedConverters: ["gallons-to-liters", "liters-to-milliliters", "milliliters-to-liters", "cups-to-milliliters"],
    faqs: [
      {
        question: "How many gallons is 20 liters?",
        answer: "20 liters equals approximately 5.28 US gallons. Multiply 20 × 0.26417 = 5.28 gallons. A typical small fuel can holds 20 liters.",
        keywords: ["20 liters to gallons", "20L in gallons"],
      },
      {
        question: "How many liters is 1 US gallon?",
        answer: "1 US gallon equals exactly 3.785411784 liters. This is the legal definition of the US liquid gallon. The UK imperial gallon is slightly larger at 4.546 liters.",
        keywords: ["1 gallon in liters", "how many liters is a US gallon"],
      },
      {
        question: "Is the UK gallon different from the US gallon?",
        answer: "Yes. The UK (Imperial) gallon equals 4.546 liters, while the US gallon equals only 3.785 liters — about 20% smaller. Fuel efficiency ratings and drink sizes differ between countries because of this.",
        keywords: ["UK gallon vs US gallon", "imperial gallon to liters"],
      },
      {
        question: "How many gallons is a 50-liter tank?",
        answer: "A 50-liter tank holds approximately 13.21 US gallons. Multiply 50 × 0.26417 = 13.21 gallons. Common for motorcycle fuel tanks, camping water carriers, and small aquariums.",
        keywords: ["50 liter tank in gallons", "50L to US gallons"],
      },
    ],
  },
  [createConverterKey("volume", "gal", "L")]: {
    description:
      "Convert US gallons to liters with the exact 1 gal = 3.785411784 L factor, fuel and storage examples, and a quick chart.",
    metaDescription:
      "Convert US gallons to liters instantly — formula: L = gal × 3.78541. For fuel, water, and beverage measurements. Free real-time calculator.",
    summary:
      "Convert US gallons to liters with the precise 1 gal = 3.785411784 L factor. Key for fuel calculations, container sizing, home brewing, and any US-to-metric volume conversion where the gallon is the starting point.",
    intent:
      "Used most often when a US recipe or fuel cost comparison lists gallons but a European audience needs liters, when swimming pool capacity is listed in gallons and a metric chemical dosage guide uses liters, or when comparing US and international bottled water container sizes.",
    note:
      "This page uses US gallons. If your source uses Imperial gallons, confirm the standard before comparing totals.",
    formula: "L = gal x 3.785411784",
    inverseFormula: "gal = L x 0.2641720524",
    inputs: [1, 2, 5, 10, 20, 50, 100],
    relatedConverters: ["liters-to-gallons", "gallons-to-milliliters", "liters-to-milliliters", "milliliters-to-liters"],
    faqs: [
      {
        question: "How many liters is 5 gallons?",
        answer: "5 US gallons equals approximately 18.93 liters. Multiply 5 × 3.78541 = 18.93 liters. Standard 5-gallon water jugs and office water coolers contain about 18.9 liters.",
        keywords: ["5 gallons to liters", "5 gallon water jug in liters"],
      },
      {
        question: "How many liters is a gallon of milk?",
        answer: "1 US gallon of milk equals 3.785 liters. US supermarkets sell milk in 1-gallon jugs which is the equivalent of roughly 3.78 liters — slightly less than a 4-liter carton common in Canada.",
        keywords: ["gallon of milk in liters", "1 gallon milk to liters"],
      },
      {
        question: "How many liters per 100 km is 30 mpg?",
        answer: "30 mpg (US) is approximately 7.84 liters per 100 km. The formula: 235.21 / mpg = L/100km. So 235.21 / 30 = 7.84 L/100km. This is a common efficiency target for mid-size cars.",
        keywords: ["mpg to liters per 100km", "30 mpg in liters"],
      },
    ],
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
