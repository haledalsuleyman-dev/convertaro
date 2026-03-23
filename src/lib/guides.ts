export type GuideDefinition = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  categoryLabel: string;
  relatedConverterHref: string;
  relatedConverterLabel: string;
  chartHeading: string;
  chartDescription: string;
  chartRows: Array<{ left: string; right: string }>;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faq: Array<{ question: string; answer: string }>;
};

function range(start: number, end: number, step: number): number[] {
  const values: number[] = [];
  for (let value = start; value <= end; value += step) {
    values.push(value);
  }
  return values;
}

function formatHeightFeetInches(cm: number): string {
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - feet * 12);
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  return `${feet}'${inches}"`;
}

const cmToInchesRows = range(150, 200, 5).map((cm) => ({
  left: `${cm} cm`,
  right: `${(cm / 2.54).toFixed(2)} in (${formatHeightFeetInches(cm)})`,
}));

const kgToLbsRows = range(40, 150, 5).map((kg) => ({
  left: `${kg} kg`,
  right: `${(kg * 2.204624).toFixed(2)} lbs`,
}));

const cToFRows = [-40, -20, -10, 0, 10, 20, 25, 30, 37, 40, 50, 100, 150, 180, 200].map((celsius) => ({
  left: `${celsius} C`,
  right: `${((celsius * 9) / 5 + 32).toFixed(1)} F`,
}));

export const guides: GuideDefinition[] = [
  {
    slug: "cm-to-inches-height-chart",
    title: "Height Conversion Chart: cm to Feet and Inches",
    description:
      "Use this height conversion chart from 150 cm to 200 cm with feet and inches references, global height context, and quick FAQs.",
    intro:
      "This guide helps you compare metric and imperial height references quickly, whether you are checking a size chart, filling out a form, or comparing common adult heights.",
    categoryLabel: "Height Guides",
    relatedConverterHref: "/length/centimeters-to-inches",
    relatedConverterLabel: "cm to Inches Converter",
    chartHeading: "Height chart from 150 cm to 200 cm",
    chartDescription: "A quick reference chart for the most searched human height conversions.",
    chartRows: cmToInchesRows,
    sections: [
      {
        heading: "How height is measured globally",
        paragraphs: [
          "Most countries use centimeters for everyday height measurements, especially in healthcare, school records, and official forms.",
          "In the US and a few other markets, height is usually given in feet and inches, which is why cm to feet and inches charts are so widely searched.",
        ],
      },
      {
        heading: "Why this chart is useful",
        paragraphs: [
          "A height chart is faster than entering one value at a time when you are comparing multiple sizes or checking average heights across countries.",
          "It is especially useful for clothing, sports profiles, immigration forms, and health references that mix metric and imperial systems.",
        ],
      },
    ],
    faq: [
      { question: "How tall is 170 cm in feet and inches?", answer: "170 cm is about 5 feet 7 inches." },
      { question: "Is 180 cm tall?", answer: "180 cm is just under 5 feet 11 inches and is considered tall in many countries." },
      { question: "Why do height charts use both cm and feet?", answer: "Because many people compare metric medical records with imperial size charts and sports profiles." },
    ],
  },
  {
    slug: "kg-to-lbs-weight-chart",
    title: "Weight Conversion Chart: kg to lbs",
    description:
      "Browse a practical weight conversion chart from 40 kg to 150 kg with fitness context, BMI references, and simple FAQs.",
    intro:
      "This kg to lbs guide gives you a quick lookup table for common bodyweight and gym tracking conversions without needing a calculator every time.",
    categoryLabel: "Weight Guides",
    relatedConverterHref: "/weight/kilograms-to-pounds",
    relatedConverterLabel: "kg to Lbs Converter",
    chartHeading: "Weight chart from 40 kg to 150 kg",
    chartDescription: "Useful for bodyweight tracking, training plans, and comparing international weight units.",
    chartRows: kgToLbsRows,
    sections: [
      {
        heading: "Fitness and BMI context",
        paragraphs: [
          "Many training apps, gym programs, and online calculators switch between kilograms and pounds depending on region.",
          "Weight conversion also matters when comparing BMI ranges, combat sport weight classes, or body-composition goals across international tools.",
        ],
      },
      {
        heading: "When people use this chart",
        paragraphs: [
          "This chart is helpful for gym logs, health checkups, shipping estimates, and understanding bodyweight targets in US-based plans.",
          "Instead of converting one number at a time, you can scan nearby values and compare changes across a training block.",
        ],
      },
    ],
    faq: [
      { question: "What is 70 kg in pounds?", answer: "70 kg is about 154.32 lbs." },
      { question: "Why do gym programs use pounds?", answer: "Many US-based lifting programs and plates are labeled in pounds." },
      { question: "Is 100 kg over 200 lbs?", answer: "Yes. 100 kg is about 220.46 lbs." },
    ],
  },
  {
    slug: "celsius-to-fahrenheit-chart",
    title: "Temperature Conversion Chart: Celsius to Fahrenheit",
    description:
      "See a Celsius to Fahrenheit reference chart with everyday temperatures for body heat, room temperature, weather, and cooking.",
    intro:
      "This temperature guide covers the most searched Celsius to Fahrenheit values so you can compare weather, cooking, and health-related temperatures at a glance.",
    categoryLabel: "Temperature Guides",
    relatedConverterHref: "/temperature/celsius-to-fahrenheit",
    relatedConverterLabel: "Celsius to Fahrenheit Converter",
    chartHeading: "Temperature reference chart",
    chartDescription: "Common temperature conversions used for weather, cooking, and body temperature checks.",
    chartRows: cToFRows,
    sections: [
      {
        heading: "Common real-world temperatures",
        paragraphs: [
          "37 C is commonly cited as normal body temperature, 20 to 25 C often describes indoor room temperature, and 100 C is the boiling point of water at sea level.",
          "These familiar points make Celsius to Fahrenheit one of the most searched temperature conversions online.",
        ],
      },
      {
        heading: "Why this chart helps",
        paragraphs: [
          "A temperature chart is useful when you are reading recipes, understanding foreign weather forecasts, or interpreting health information from a different unit system.",
          "It also helps you compare several nearby temperatures quickly instead of converting one value at a time.",
        ],
      },
    ],
    faq: [
      { question: "Is 37 C a fever?", answer: "No. 37 C is 98.6 F, which is generally considered normal body temperature." },
      { question: "What is 100 C in Fahrenheit?", answer: "100 C equals 212 F." },
      { question: "Why do recipes switch between C and F?", answer: "Cookbooks and appliance settings vary by country, so both systems are commonly used." },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guides.find((guide) => guide.slug === slug);
}
