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
    title: "BMI Calculator - Body Mass Index & Weight Status",
    navLabel: "BMI",
    description: "Calculate your Body Mass Index (BMI) instantly. Understand your weight status with our accurate indicator for adults based on WHO standards.",
    keywords: ["bmi calculator", "body mass index", "calculate bmi online", "weight status", "healthy bmi range", "body fat indicator"],
    whatItDoes:
      "This calculator computes Body Mass Index (BMI) using your height and weight. It provides a numerical score and classifies it into standard health categories: Underweight, Healthy Weight, Overweight, and Obesity. BMI is a widely used screening tool to identify possible weight problems for adults.",
    howToUse: [
      "Enter your current height in centimeters (cm).",
      "Enter your total weight in kilograms (kg).",
      "Observe your calculated BMI score and the corresponding color-coded category.",
      "Review the health guidance provided for your specific BMI range.",
    ],
    examples: [
      {
        title: "Weight monitoring",
        description: "Regularly check your BMI to see how lifestyle changes affect your weight status over months.",
      },
      {
        title: "Body composition baseline",
        description: "Use BMI as a first step before more detailed body fat or muscle mass analysis.",
      },
      {
        title: "Clinical screening",
        description: "Provide your BMI as a primary indicator for health consultations or fitness program registration.",
      },
    ],
    commonMistakes: [
      "Using BMI as a diagnostic tool rather than a screening indicator.",
      "Assuming BMI is accurate for highly muscular athletes (who may be 'overweight' by BMI but carry low body fat).",
      "Applying adult BMI ranges to children and adolescents (who require growth charts).",
    ],
    whyItMatters:
      "Knowing your BMI helps you understand where you stand in relation to globally recognized health benchmarks. While not comprehensive, it is a critical first metric for recognizing potential weight-related health risks.",
    faq: [
      {
        question: "Is BMI a perfect measure of health?",
        answer:
          "No. BMI is a population-level screening tool. It doesn't measure body fat directly and doesn't account for muscle mass, bone density, or fat distribution.",
      },
      {
        question: "What are the standard BMI categories?",
        answer:
          "According to WHO: Underweight (<18.5), Healthy (18.5-24.9), Overweight (25-29.9), and Obesity (30 or greater).",
      },
      {
        question: "Why should athletes be careful with BMI?",
        answer:
          "Athletes with high muscle mass may have a BMI in the 'overweight' range because muscle weighs more than fat, even if they have a very healthy body composition.",
      },
      {
        question: "Does BMI change with age?",
        answer: "While the calculation remains the same, the interpretation may shift slightly for older adults where a higher BMI might actually be protective against some health issues.",
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
    title: "Percentage Calculator - Fast Percent & Change Estimator",
    navLabel: "Percentage",
    description: "Calculate percentage increase, decrease, or simple percentage values. Ideal for finance, sales, discounts, and data analysis.",
    keywords: ["percentage calculator", "calculate percent", "percentage increase calculator", "percentage decrease estimator", "what percent is X of Y", "discount calculator"],
    whatItDoes:
      "This multi-purpose math tool solves various percentage problems instantly. Whether you need to find the percentage of a number, calculate the percentage change between two values, or determine the base value, this calculator handles all common use cases for finance, school, and business.",
    howToUse: [
      "Choose the specific percentage problem you want to solve from the tabs.",
      "Input your primary and secondary numbers into the provided fields.",
      "The result updates instantly as you type.",
      "Use the 'percentage change' mode specifically for comparing old vs new values.",
    ],
    examples: [
      {
        title: "Calculating Sale Discounts",
        description: "Quickly determine the 20% savings on a $150 item to find your final price.",
      },
      {
        title: "Business Growth Tracking",
        description: "Calculate the percentage increase in sales from one month to the next.",
      },
      {
        title: "Tip & Tax Estimation",
        description: "Estimate a 15% tip or sales tax for your restaurant bill or shopping cart.",
      },
    ],
    commonMistakes: [
      "Mixing up the 'Original' and 'New' values in percent change calculations.",
      "Forgetting that 100% represents the whole (1.0 in decimal form).",
      "Adding percentages together directly (e.g., two 10% increases is not a 20% increase, it is 21%).",
    ],
    whyItMatters:
      "Percentages are fundamental to understanding financial charts, shopping discounts, and statistical data. Master your numbers to make better economic and academic decisions.",
    faq: [
      {
        question: "How do I calculate a percentage increase?",
        answer: "Subtract the original value from the new value, divide by the original value, then multiply by 100.",
      },
      {
        question: "What does X percent of Y mean?",
        answer: "It means (X / 100) multiplied by Y. For example, 10% of 200 is 20.",
      },
      {
        question: "What is the difference between a percentage and a fraction?",
        answer:
          "A percentage is simply a fraction where the denominator is always 100. '50%' is the same as '50/100' or '1/2'.",
      },
      {
        question: "Can percentages be greater than 100?",
        answer: "Yes. For example, a 200% increase means a value has tripled in size.",
      },
    ],
    relatedTools: [
      { href: "/loan-calculator", label: "Loan Calculator" },
      { href: "/mortgage-calculator", label: "Mortgage Calculator" },
      { href: "/data/megabytes-to-gigabytes", label: "MB to GB converter" },
    ],
  },
  {
    slug: "loan-calculator",
    category: "finance",
    title: "Loan Calculator - Estimate Payments & Interest",
    navLabel: "Loan",
    description: "Accurately estimate your monthly loan payments, total repayment amount, and total interest for personal, auto, or student loans.",
    keywords: ["loan calculator", "monthly payment calculator", "loan interest calculator", "amortization estimate", "personal loan payment", "auto loan calculator"],
    whatItDoes:
      "This calculator performs complex financial math to estimate your monthly loan payment based on the principal amount, annual interest rate (APR), and repayment term. It provides a breakdown of how much you will pay in total over the life of the loan and identifies the portion going toward interest versus principal repayment.",
    howToUse: [
      "Enter the total loan amount (principal) you wish to borrow.",
      "Input the annual interest rate (APR) provided by your lender.",
      "Select the loan term in months to determine the repayment duration.",
      "Analyze the monthly payment, total interest, and total repayment breakdown below.",
    ],
    examples: [
      {
        title: "Auto financing",
        description: "Calculate potential monthly installments for a $30,000 new car loan at 5.5% interest over 60 months.",
      },
      {
        title: "Debt consolidation",
        description: "Compare the cost of a $10,000 personal loan versus high-interest credit card debt over a 36-month term.",
      },
      {
        title: "Rate comparison",
        description: "Visualize how a 1% difference in interest rate can save thousands of dollars over a long-term loan.",
      },
    ],
    commonMistakes: [
      "Assuming the APR is the only cost (ignoring origination fees).",
      "Selecting a term that is too long (increasing total interest paid significantly).",
      "Focusing only on the monthly payment instead of the total cost of the loan.",
    ],
    whyItMatters:
      "Understanding the true cost of borrowing is critical for financial health. This tool empowers you to shop for loans with confidence and avoid predatory lending terms by knowing your numbers first.",
    faq: [
      {
        question: "What is APR and why does it matter?",
        answer: "APR stands for Annual Percentage Rate. It represents the total cost of borrowing annually, including interest and some fees, providing a more accurate comparison than a simple interest rate.",
      },
      {
        question: "Does this include taxes and documentation fees?",
        answer: "No. This calculator focuses on the mathematical principal and interest. Always account for local taxes and lender-specific fees for a final budget.",
      },
      {
        question: "How can I lower my total interest paid?",
        answer:
          "You can lower interest by securing a lower rate, making a larger down payment, or choosing a shorter repayment term.",
      },
      {
        question: "Can I pay off my loan early?",
        answer: "Most modern personal loans allow early repayment without penalty, but you should always check your specific loan agreement for 'prepayment penalty' clauses.",
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
    title: "Mortgage Calculator - Real Estate Payment Estimator",
    navLabel: "Mortgage",
    description: "Calculate your monthly mortgage payments with taxes and insurance. Estimate home affordability, interest costs, and amortization schedules.",
    keywords: ["mortgage calculator", "home loan calculator", "monthly mortgage payment", "house affordability", "mortgage interest estimator", "real estate calculator"],
    whatItDoes:
      "This advanced real estate tool estimates your PITI (Principal, Interest, Taxes, and Insurance) monthly payment. By inputting the home price, down payment, and mortgage terms, it provides a comprehensive view of what you can expect to pay each month to own your home.",
    howToUse: [
      "Enter the purchase price of the home.",
      "Select your down payment amount (either as a percentage or dollar value).",
      "Choose the loan term (commonly 15 or 30 years) and the annual interest rate.",
      "Optionally input estimated monthly property taxes and homeowners insurance for a full PITI estimate.",
    ],
    examples: [
      {
        title: "Buying a first home",
        description: "Calculate the monthly cost for a $400,000 house with 20% down at current market rates.",
      },
      {
        title: "Down-payment planning",
        description: "Compare how a 5% vs 20% down payment affects your monthly budget and long-term interest cost.",
      },
      {
        title: "Mortgage Refinancing",
        description: "Determine if lowering your interest rate by 1% justifies the closing costs of the refinance.",
      },
    ],
    commonMistakes: [
      "Underestimating property taxes and HOA fees which can add hundreds to your monthly payment.",
      "Not accounting for Private Mortgage Insurance (PMI) if your down payment is less than 20%.",
      "Overextending based on 'gross' income rather than 'net' take-home pay.",
    ],
    whyItMatters:
      "A home is likely the largest purchase you will ever make. Accurate projections help you avoid being 'house-poor' and ensure your investment aligns with your overall financial goals.",
    faq: [
      {
        question: "What is PITI?",
        answer:
          "PITI stands for Principal, Interest, Taxes, and Insurance. These four components make up the typical monthly housing payment for a mortgaged property.",
      },
      {
        question: "How much down payment do I really need?",
        answer:
          "While 20% is the gold standard to avoid PMI, many programs allow as little as 3% or 3.5% (FHA). However, a lower down payment increases your monthly cost.",
      },
      {
        question: "What is Private Mortgage Insurance (PMI)?",
        answer:
          "PMI is an insurance premium you pay if your down payment is under 20%. It protects the lender, not you, but enables you to buy a home with less money down.",
      },
      {
        question: "Should I choose a 15-year or 30-year term?",
        answer: "A 30-year term offers more flexibility with lower monthly payments, while a 15-year term saves significant interest over time but requires higher monthly installments.",
      },
    ],
    relatedTools: [
      { href: "/loan-calculator", label: "Loan Calculator" },
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/data/gigabytes-to-megabytes", label: "GB to MB converter" },
    ],
  },
  {
    slug: "vat-calculator",
    category: "finance",
    title: "VAT Calculator - Add or Remove Value Added Tax",
    navLabel: "VAT",
    description: "Calculate VAT (Value Added Tax) for any amount and rate. Easily add VAT to a net price or remove it from a gross price for accurate accounting.",
    keywords: ["vat calculator", "calculate vat", "add vat", "remove vat", "sales tax calculator", "vat tax estimator", "exclusive vat", "inclusive vat"],
    whatItDoes:
      "This accounting tool calculates Value Added Tax (VAT) in both directions. You can enter a net amount to see the tax and gross total, or enter a gross amount to find the original net price before tax was applied. It supports any tax rate percentage, making it applicable for UK, EU, and international tax systems.",
    howToUse: [
      "Enter the base amount you want to calculate for.",
      "Input the VAT percentage rate (e.g., 20% for UK, 15% for Saudi Arabia).",
      "Choose whether you are 'Adding' VAT (from net) or 'Removing' VAT (from gross).",
      "The breakdown of tax and final amount appears instantly.",
    ],
    examples: [
      {
        title: "B2B Invoicing",
        description: "Calculate the total amount to charge a client for a $500 service after adding 20% VAT.",
      },
      {
        title: "Expense Reporting",
        description: "Determine the tax-exclusive cost of a $120 dinner receipt when the tax is already included.",
      },
      {
        title: "Price Strategy",
        description: "Adjust your retail prices to maintain margins after a government change in tax rates.",
      },
    ],
    commonMistakes: [
      "Assuming 'Removing 20% VAT' means multiplying by 0.80 (the correct way is dividing by 1.20).",
      "Forgeting that VAT rates vary by product category in many countries.",
      "Mixing local sales tax with national VAT systems.",
    ],
    whyItMatters:
      "Accurate VAT calculation is mandatory for law compliance and healthy business accounting. This tool removes the mathematical guesswork from your daily financial transactions.",
    faq: [
      {
        question: "How do I remove VAT from a total?",
        answer: "To remove VAT, divide the total (gross) amount by (1 + tax rate). For example, at 20% VAT, divide by 1.20.",
      },
      {
        question: "What is the difference between Net and Gross?",
        answer: "Net is the price before tax. Gross is the final price including tax.",
      },
      {
        question: "Does VAT apply to exports?",
        answer: "In most countries, exports are zero-rated for VAT, but you should always consult a tax professional for your specific jurisdiction.",
      },
    ],
    relatedTools: [
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/margin-calculator", label: "Margin Calculator" },
      { href: "/finance-calculators", label: "More Finance Tools" },
    ],
  },
  {
    slug: "margin-calculator",
    category: "finance",
    title: "Margin Calculator - Calculate Profit & Markup",
    navLabel: "Margin",
    description: "Calculate profit margins, markups, and final selling prices. Ideal for shop owners and e-commerce sellers to ensure profitable pricing.",
    keywords: ["margin calculator", "profit margin", "markup calculator", "gross profit", "calculate profit", "selling price calculator", "ecommerce profit margin"],
    whatItDoes:
      "This e-commerce tool helps businesses determine the profitability of their products. By entering the cost to acquire an item and your desired margin or markup, it calculates exactly what you should charge the customer and how much profit you will make per sale.",
    howToUse: [
      "Enter the cost of the item (what you paid).",
      "Enter your desired selling price to see the margin, OR enter a target margin percentage.",
      "Observe the Gross Profit (dollars) and Margin vs Markup results.",
      "Adjust the numbers to find the 'sweet spot' for your pricing strategy.",
    ],
    examples: [
      {
        title: "Product Launch",
        description: "Ensure a $15 product cost results in a 40% margin when sold to customers.",
      },
      {
        title: "Reviewing Inventory",
        description: "Calculate the markup percentage of items you've already priced to ensure they meet targets.",
      },
      {
        title: "Discount Planning",
        description: "Decide how deep a discount you can offer without losing money on the cost price.",
      },
    ],
    commonMistakes: [
      "Confusing Margin with Markup (Margin is profit/revenue, Markup is profit/cost).",
      "Ignoring shipping and advertising costs when calculating 'true' cost.",
      "Aiming for too low a margin that doesn't cover business overheads.",
    ],
    whyItMatters:
      "Pricing products incorrectly is the #1 reason small businesses fail. Using a margin calculator ensures every sale you make is actually contributing to your bottom line.",
    faq: [
      {
        question: "What is a good profit margin?",
        answer: "It depends on the industry. Retail often aim for 50%, while electronics might be lower (10-20%) and software very high (80%+).",
      },
      {
        question: "Margin vs Markup: What's the difference?",
        answer: "Markup is the ratio of profit to cost. Margin is the ratio of profit to the selling price.",
      },
      {
        question: "How do I calculate margin manually?",
        answer: "Margin = ((Revenue - Cost) / Revenue) * 100.",
      },
    ],
    relatedTools: [
      { href: "/vat-calculator", label: "VAT Calculator" },
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/popular-conversion-tools", label: "Popular Tools" },
    ],
  },
];

export const calculatorsBySlug = new Map(calculators.map((calculator) => [calculator.slug, calculator]));
