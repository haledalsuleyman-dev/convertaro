export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface CalculatorExample {
  title: string;
  description: string;
}

export interface RelatedToolLink {
  href: string;
  label: string;
}

export interface CalculatorDefinition {
  slug: string;
  category: string;
  title: string;
  navLabel: string;
  description: string;
  keywords: string[];
  whatItDoes: string;
  howToUse: string[];
  examples: CalculatorExample[];
  commonMistakes: string[];
  whyItMatters: string;
  faq: CalculatorFAQ[];
  relatedTools: RelatedToolLink[];
}

export const calculators: CalculatorDefinition[] = [
  {
    slug: "bmi-calculator",
    category: "health",
    title: "BMI Calculator",
    navLabel: "BMI",
    description: "Calculate your body mass index instantly using height and weight, with clear weight-status guidance.",
    keywords: ["bmi calculator", "body mass index", "healthy bmi", "weight status calculator"],
    whatItDoes:
      "This calculator computes Body Mass Index (BMI) from your height and weight, then classifies the result into standard ranges like underweight, healthy, overweight, and obesity.",
    howToUse: [
      "Enter your height in centimeters.",
      "Enter your weight in kilograms.",
      "Review your BMI value and category.",
      "Use the result as a screening signal, not a diagnosis.",
    ],
    examples: [
      {
        title: "Fitness check-ins",
        description: "Track broad weight trends over time with a simple, repeatable metric.",
      },
      {
        title: "Health coaching",
        description: "Use BMI as a baseline indicator before deeper body-composition assessment.",
      },
      {
        title: "Program planning",
        description: "Set realistic weight-management goals with standardized ranges.",
      },
    ],
    commonMistakes: [
      "Treating BMI alone as a full measure of health.",
      "Using incorrect units for height or weight.",
      "Ignoring context like age, muscle mass, and clinical history.",
    ],
    whyItMatters:
      "BMI provides a fast, standardized signal for population-level and personal screening. It is useful for triage and trend tracking when combined with broader health context.",
    faq: [
      {
        question: "Is BMI accurate for everyone?",
        answer:
          "BMI is a useful screening metric, but it does not directly measure body fat, muscle distribution, or metabolic health. Use it alongside other health indicators.",
      },
      {
        question: "What is a healthy BMI range?",
        answer:
          "For most adults, a BMI between 18.5 and 24.9 is generally considered healthy. Clinical interpretation can vary by individual context.",
      },
      {
        question: "Can I use this BMI calculator for children?",
        answer:
          "Children and teens require age- and sex-specific BMI percentiles. This calculator is intended for adults.",
      },
    ],
    relatedTools: [
      { href: "/weight/kg-to-lbs", label: "kg to lbs converter" },
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/age-calculator", label: "Age Calculator" },
    ],
  },
  {
    slug: "age-calculator",
    category: "time",
    title: "Age Calculator",
    navLabel: "Age",
    description: "Calculate exact age in years, months, and days from date of birth to today or any reference date.",
    keywords: ["age calculator", "calculate age", "date difference", "age in years months days"],
    whatItDoes:
      "This calculator finds exact age by comparing a birth date against a reference date, returning years, months, and days.",
    howToUse: [
      "Select date of birth.",
      "Optionally choose a custom reference date.",
      "Read your exact age breakdown.",
      "Use the result for forms, planning, or eligibility checks.",
    ],
    examples: [
      {
        title: "Eligibility checks",
        description: "Verify age-based requirements for enrollment, hiring, or documentation.",
      },
      {
        title: "Insurance and compliance",
        description: "Confirm exact age on a specific policy or filing date.",
      },
      {
        title: "Personal planning",
        description: "Track milestones and life-stage timelines accurately.",
      },
    ],
    commonMistakes: [
      "Forgetting to set the correct reference date.",
      "Mixing locale date formats when entering birthdays.",
      "Assuming age updates at the start of the birth month instead of the actual day.",
    ],
    whyItMatters:
      "Exact age calculations help avoid legal and administrative mistakes in cases where even one day can affect eligibility.",
    faq: [
      {
        question: "Does this calculator account for leap years?",
        answer: "Yes. The calculation uses real calendar dates, including leap years.",
      },
      {
        question: "Can I calculate age on a past or future date?",
        answer: "Yes. Set a custom reference date to calculate age for any point in time.",
      },
      {
        question: "Why is exact age useful beyond years only?",
        answer:
          "Many legal, school, insurance, and clinical contexts require exact years, months, and days rather than rounded years.",
      },
    ],
    relatedTools: [
      { href: "/time/day-to-hr", label: "days to hours converter" },
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/loan-calculator", label: "Loan Calculator" },
    ],
  },
  {
    slug: "percentage-calculator",
    category: "math",
    title: "Percentage Calculator",
    navLabel: "Percentage",
    description: "Calculate percentages, percentage change, and reverse percentage values instantly.",
    keywords: ["percentage calculator", "percent change", "what percent", "increase decrease percentage"],
    whatItDoes:
      "This tool handles common percentage calculations: percent of a value, value as a percent of another, and percentage increase or decrease.",
    howToUse: [
      "Choose calculation mode.",
      "Enter the values required for that mode.",
      "Read the percentage result immediately.",
      "Use the output in pricing, analytics, or budgeting decisions.",
    ],
    examples: [
      {
        title: "Discount pricing",
        description: "Find sale prices and discount amounts quickly.",
      },
      {
        title: "Growth analysis",
        description: "Measure month-over-month or year-over-year change in metrics.",
      },
      {
        title: "Budget allocation",
        description: "Compute proportional splits for spending categories.",
      },
    ],
    commonMistakes: [
      "Using the wrong base value in percentage change calculations.",
      "Confusing percentage points with percent change.",
      "Rounding too early in multi-step calculations.",
    ],
    whyItMatters:
      "Percentages are a universal language for comparing values. Accurate percentage calculations improve financial, operational, and analytical decisions.",
    faq: [
      {
        question: "How do I find X percent of Y?",
        answer: "Multiply Y by X/100. This calculator does it instantly in the Percent of mode.",
      },
      {
        question: "How is percentage change calculated?",
        answer: "Subtract old value from new value, divide by old value, then multiply by 100.",
      },
      {
        question: "What is the difference between percent and percentage points?",
        answer:
          "Percentage points describe absolute differences between percentages; percent change describes relative change.",
      },
    ],
    relatedTools: [
      { href: "/loan-calculator", label: "Loan Calculator" },
      { href: "/mortgage-calculator", label: "Mortgage Calculator" },
      { href: "/data/mb-to-gb", label: "MB to GB converter" },
    ],
  },
  {
    slug: "loan-calculator",
    category: "finance",
    title: "Loan Calculator",
    navLabel: "Loan",
    description: "Estimate monthly payment, total repayment, and total interest for personal or auto loans.",
    keywords: ["loan calculator", "monthly payment calculator", "loan interest", "amortization estimate"],
    whatItDoes:
      "This calculator estimates monthly loan payment from principal, annual rate, and term in months, then shows total paid and total interest.",
    howToUse: [
      "Enter loan amount (principal).",
      "Enter annual interest rate.",
      "Enter term in months.",
      "Review monthly payment, total repayment, and interest.",
    ],
    examples: [
      {
        title: "Auto financing",
        description: "Compare offers from lenders before committing to a vehicle loan.",
      },
      {
        title: "Personal loans",
        description: "Estimate affordability for debt consolidation or major expenses.",
      },
      {
        title: "Rate negotiation",
        description: "See how a lower APR impacts total interest over the term.",
      },
    ],
    commonMistakes: [
      "Confusing APR percentage with decimal form.",
      "Ignoring fees and insurance outside base payment.",
      "Comparing loans by monthly payment only, not total cost.",
    ],
    whyItMatters:
      "Loan terms strongly affect total borrowing cost. A transparent payment estimate helps with budgeting and lender comparison.",
    faq: [
      {
        question: "What inputs are needed for a loan payment estimate?",
        answer: "You need principal amount, annual interest rate, and repayment term in months.",
      },
      {
        question: "Does this include taxes and fees?",
        answer: "No. The base loan calculator focuses on principal and interest only.",
      },
      {
        question: "Why does a small rate change matter so much?",
        answer:
          "Interest compounds over time. Even modest APR changes can significantly affect total repayment.",
      },
    ],
    relatedTools: [
      { href: "/mortgage-calculator", label: "Mortgage Calculator" },
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/age-calculator", label: "Age Calculator" },
    ],
  },
  {
    slug: "mortgage-calculator",
    category: "finance",
    title: "Mortgage Calculator",
    navLabel: "Mortgage",
    description: "Estimate monthly mortgage payment including principal, interest, and optional tax/insurance costs.",
    keywords: ["mortgage calculator", "home loan calculator", "monthly mortgage payment", "house affordability"],
    whatItDoes:
      "This calculator estimates mortgage payments from home price, down payment, interest rate, and term, with optional monthly tax and insurance costs.",
    howToUse: [
      "Enter home price and down payment.",
      "Enter annual interest rate and loan term in years.",
      "Optionally add monthly property tax and insurance.",
      "Review monthly payment and total interest.",
    ],
    examples: [
      {
        title: "Home shopping",
        description: "Compare monthly payment scenarios across different price points.",
      },
      {
        title: "Down-payment planning",
        description: "Estimate how increasing down payment changes monthly burden.",
      },
      {
        title: "Refinance analysis",
        description: "Evaluate whether a new rate can lower payment or lifetime interest.",
      },
    ],
    commonMistakes: [
      "Forgetting to include taxes and insurance in monthly housing cost.",
      "Comparing only interest rate without considering term length.",
      "Using gross income assumptions without full budget stress testing.",
    ],
    whyItMatters:
      "Mortgage payments are often the largest recurring household expense. Clear projections reduce risk and improve long-term financial planning.",
    faq: [
      {
        question: "What is included in mortgage payment here?",
        answer:
          "The calculator shows principal and interest by default, with optional monthly property tax and insurance added to total monthly cost.",
      },
      {
        question: "How does down payment affect mortgage cost?",
        answer:
          "A higher down payment reduces loan principal, usually lowering monthly payment and total interest.",
      },
      {
        question: "Can this replace lender disclosures?",
        answer:
          "No. Use this for planning, then confirm final terms, fees, and escrow details with your lender.",
      },
    ],
    relatedTools: [
      { href: "/loan-calculator", label: "Loan Calculator" },
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/data/gb-to-mb", label: "GB to MB converter" },
    ],
  },
];

export const calculatorsBySlug = new Map(calculators.map((calculator) => [calculator.slug, calculator]));
