export interface CalculatorCategory {
  slug: string;
  name: string;
  description: string;
  shortLabel: string;
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    slug: "finance",
    name: "Finance Calculators",
    shortLabel: "Finance",
    description: "Loan, mortgage, and money-planning calculators for clearer financial decisions.",
  },
  {
    slug: "health",
    name: "Health Calculators",
    shortLabel: "Health",
    description: "Body and wellness-focused calculators like BMI and other health screening tools.",
  },
  {
    slug: "math",
    name: "Math Calculators",
    shortLabel: "Math",
    description: "Fast daily math tools for percentages, ratios, and common classroom or work calculations.",
  },
  {
    slug: "time",
    name: "Time Calculators",
    shortLabel: "Time",
    description: "Date and time tools for age, duration, deadlines, and planning scenarios.",
  },
  {
    slug: "everyday",
    name: "Everyday Calculators",
    shortLabel: "Everyday",
    description: "Practical utility calculators for daily tasks, life admin, and quick decisions.",
  },
];

export const calculatorCategoryBySlug = new Map(
  calculatorCategories.map((category) => [category.slug, category])
);
