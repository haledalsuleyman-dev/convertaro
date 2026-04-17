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
  formula: {
    expression: string;
    description: string;
  };
  examples: CalculatorExample[];
  commonMistakes: string[];
  whenToUse: string;
  whyItMatters: string;
  faq: CalculatorFAQ[];
  relatedTools: RelatedToolLink[];
}

export const calculators: CalculatorDefinition[] = [
  {
    slug: "bmi-calculator",
    category: "health",
    title: "BMI Calculator - Free Body Mass Index & Weight Status Tool",
    navLabel: "BMI",
    description: "Calculate your Body Mass Index (BMI) instantly. Understand your weight status with our objective indicator for adults based on WHO standards.",
    keywords: ["bmi calculator", "body mass index", "calculate bmi online", "weight status", "healthy bmi range", "body fat indicator"],
    whatItDoes:
      "This Body Mass Index (BMI) calculator provides a simple, reliable way to assess your weight relative to your height. Using standard medical formulas, it categorizes your result into globally recognized weight status groups, helping you identify if you are underweight, at a healthy weight, overweight, or obese. It is a vital screening tool for adults who want to understand their baseline body composition and potential health risks.",
    howToUse: [
      "Enter your vertical height in centimeters (cm) accurately.",
      "Input your current body weight in kilograms (kg).",
      "Click 'Calculate' to generate your BMI score.",
      "Interpret your result using the standard WHO categories provided in the results panel.",
    ],
    formula: {
      expression: "BMI = weight (kg) ÷ [height (m)]²",
      description: "To calculate your BMI, your weight in kilograms is divided by your height in meters squared. Since most people know their height in centimeters, we first convert cm to meters by dividing by 100 before applying the formula.",
    },
    examples: [
      {
        title: "Health Baseline Assessment",
        description: "A person weighing 70kg at 175cm can verify their BMI of 22.9, confirming they fall within the 'Healthy Weight' range.",
      },
      {
        title: "Weight Loss Tracking",
        description: "Monitor how shifting from 95kg to 85kg impacts your BMI category, providing objective motivation during a fitness journey.",
      },
      {
        title: "Fitness Goal Setting",
        description: "Determine exactly what weight you need to reach to enter the 'Healthy' category for your specific height.",
      },
    ],
    commonMistakes: [
      "Using BMI as a diagnostic tool rather than a screening indicator.",
      "Applying adult BMI ranges to children, as they require specialized growth charts.",
      "Ignoring that BMI does not distinguish between excess fat and high muscle mass (common in athletes).",
    ],
    whenToUse: "You should use the BMI calculator when you need a quick, non-invasive assessment of whether your body weight is in a healthy proportion to your height. It's particularly useful for initial health screenings, tracking long-term weight trends, or establishing a baseline before starting a new diet or exercise regimen.",
    whyItMatters:
      "Knowing your BMI helps you understand where you stand in relation to globally recognized health benchmarks. While not comprehensive, it is a critical first metric for recognizing potential weight-related health risks.",
    faq: [
      {
        question: "What is a healthy BMI range for adults?",
        answer: "For most adults, a BMI between 18.5 and 24.9 is considered the 'Healthy Weight' range according to World Health Organization (WHO) guidelines.",
      },
      {
        question: "How accurate is a BMI calculator for athletes?",
        answer: "BMI can be misleading for highly muscular individuals since muscle is denser than fat. An athlete might have a high BMI score but a low body fat percentage.",
      },
      {
        question: "Is BMI the same for men and women?",
        answer: "The formula for BMI is identical for both men and women. However, the interpretation can sometimes vary in a clinical context based on body composition differences.",
      },
      {
        question: "Does age affect BMI interpretation?",
        answer: "The basic calculation doesn't change with age, but older adults (over 65) may sometimes benefit from a slightly higher BMI to protect against bone density loss.",
      },
      {
        question: "Should I use this for my child's weight?",
        answer: "No. Children and teenagers require a 'BMI-for-age' calculation that uses growth charts to account for their development stage.",
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
    title: "Age Calculator - Calculate Exact Age in Years, Months, and Days",
    navLabel: "Age",
    description: "Calculate your exact age in years, months, and days. Find the time difference between any birth date and a reference date instantly.",
    keywords: ["age calculator", "calculate age", "date difference", "age in years months days", "how old am i", "chronological age"],
    whatItDoes:
      "This precision Age Calculator determines the exact time elapsed between two specific dates. It provides a highly detailed breakdown in years, months, and days, rather than just a rounded year count. Whether you're verifying eligibility for a legal document, tracking a child's developmental milestones, or just curious about your exact age down to the day, this tool offers the most accurate chronometric result.",
    howToUse: [
      "Select your official Date of Birth from the calendar picker.",
      "Choose a Reference Date (defaults to today's date).",
      "Click 'Calculate' to see the exact time difference.",
      "Review the summary to find your age in years, months, and days.",
    ],
    formula: {
      expression: "Age = (Reference Date) - (Date of Birth)",
      description: "The calculation iterates through full years, then determines the remaining months, and finally the residual days, accounting for varying month lengths and leap years in the calendar system.",
    },
    examples: [
      {
        title: "Legal Eligibility",
        description: "Checking if a person born on Oct 15, 2005, is exactly 18 years old on an election day in 2023.",
      },
      {
        title: "Employment Verification",
        description: "Calculating the exact service length or age of an employee for pension and insurance records.",
      },
      {
        title: "Infant Milestones",
        description: "Tracking a baby's age in months and days to align with standard developmental and vaccination schedules.",
      },
    ],
    commonMistakes: [
      "Assuming a month is always 30 days (our calculator uses the actual calendar days).",
      "Forgetting to adjust for leap years manually (this tool does it automatically).",
      "Mixing up the birth date and reference date fields.",
    ],
    whenToUse: "Use this age calculator for any situation requiring precision beyond simple years. It's ideal for official document applications, school enrollment checks, insurance policy filings, and tracking significant life milestones where exact dates matter.",
    whyItMatters:
      "Exact age calculations help avoid legal and administrative mistakes in cases where even one day can affect eligibility or classification.",
    faq: [
      {
        question: "How does the calculator handle leap years?",
        answer: "The calculator uses standard Gregorian calendar logic, which automatically adjusts for February 29th in leap years to ensure perfect accuracy.",
      },
      {
        question: "Can I calculate my age on a future date?",
        answer: "Yes, you can set the reference date to any future point to see how old you will be at that time (e.g., on your next vacation or retirement date).",
      },
      {
        question: "What defines the 'Age' result?",
        answer: "The result is defined by the number of full years passed, the remaining full months, and then the remaining days since your last month-anniversary.",
      },
      {
        question: "Is this accurate for legal age in all countries?",
        answer: "Yes, most countries follow the system where you turn a year older on the anniversary of your birth. Some cultures vary, but this is the global standard.",
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
    title: "Percentage Calculator - Fast Percent Increase & Discount Tool",
    navLabel: "Percentage",
    description: "Calculate percentage increase, decrease, or simple values instantly. Perfect for finance, sales, discounts, and rapid data analysis.",
    keywords: ["percentage calculator", "calculate percent", "percentage increase calculator", "percentage decrease estimator", "what percent is X of Y", "discount calculator"],
    whatItDoes:
      "The Convertaro Percentage Calculator is a versatile math engine designed to solve the most common percentage-based problems in seconds. From figuring out a sale discount at the mall to calculating annual growth for a business report, this tool handles 'Percentage Of', 'Percentage Ratios', and 'Percent Change' with total precision. It eliminates manual math errors and provides a clear breakdown of the calculation.",
    howToUse: [
      "Choose the calculation mode (Percent Of, Ratio, or Change).",
      "Enter the two primary numerical values for your problem.",
      "Press 'Calculate' to see the final percentage result.",
      "Review the result breakdown to understand the inputs and the final output.",
    ],
    formula: {
      expression: "Value = (Percentage / 100) × Total",
      description: "A percentage is a ratio of a number to 100. To find a percentage of a value, we convert the percent to a decimal (dividing by 100) and multiply it by the whole amount.",
    },
    examples: [
      {
        title: "Retail Discounts",
        description: "Calculating a 25% discount on a $120 jacket to see the $30 savings and final $90 price.",
      },
      {
        title: "Investment Growth",
        description: "Finding the percentage increase if an account grows from $1,000 to $1,150 over one year (15% increase).",
      },
      {
        title: "Tip Calculation",
        description: "Quickly estimating a 15% tip on a $45 restaurant bill for a total of $6.75.",
      },
    ],
    commonMistakes: [
      "Adding percentage points directly (e.g., two 10% gains result in 21% total gain, not 20%).",
      "Mixing up the 'Original' and 'New' numbers when calculating percent change.",
      "Forgetting that 100% represents the entire original value.",
    ],
    whenToUse: "Use this tool whenever you deal with ratios, finance, or relative changes. It's perfect for shopping, tax estimations, business growth reporting, analyzing exam scores, or any scenario where you need to compare two numbers through a percentage lens.",
    whyItMatters:
      "Percentages are fundamental to understanding financial charts, shopping discounts, and statistical data. Master your numbers to make better economic and academic decisions.",
    faq: [
      {
        question: "How do I calculate a percentage manually?",
        answer: "To find P percent of X, multiply X by (P / 100). For example, 20% of 50 is 50 * 0.20 = 10.",
      },
      {
        question: "What is percentage change?",
        answer: "Percentage change measures the relative difference between an old and a new value. Formula: [(New - Old) / Old] * 100.",
      },
      {
        question: "Can a percentage result be over 100?",
        answer: "Yes. If a value more than doubles, the increase is over 100%. For instance, an increase from 10 to 30 is a 200% increase.",
      },
      {
        question: "Is percentage the same as a fraction?",
        answer: "Essentially, yes. 25% is mathematically identical to 1/4 or 0.25. It's just a different way of expressing the same ratio.",
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
    title: "Loan Calculator - Estimate Monthly Payments & Total Interest",
    navLabel: "Loan",
    description: "Estimate monthly loan payments, total interest, and repayment totals. Ideal for personal, auto, and student loans with APR and term settings.",
    keywords: ["loan calculator", "monthly payment calculator", "loan interest calculator", "amortization estimate", "personal loan payment", "auto loan calculator"],
    whatItDoes:
      "This financial Loan Calculator provides a comprehensive estimate of your monthly debt obligations. By analyzing your principal amount, interest rate (APR), and loan term, it reveals the true cost of borrowing. It breaks down each payment into principal and interest, allowing you to see how your money is allocated over the lifetime of the loan, helping you make smarter borrowing decisions.",
    howToUse: [
      "Input the total Loan Amount (Principal) you wish to borrow.",
      "Enter the Annual Interest Rate (APR) offered by your lender.",
      "Select the total Loan Term in months.",
      "Hit 'Calculate' to see your monthly installment and total interest cost.",
    ],
    formula: {
      expression: "M = P [ i(1 + i)ⁿ ] / [ (1 + i)ⁿ – 1 ]",
      description: "Where M is the monthly payment, P is the principal, i is the monthly interest rate (annual rate / 12), and n is the total number of payments (months).",
    },
    examples: [
      {
        title: "Auto Loan Scenarios",
        description: "Estimating a monthly payment on a $35,000 new car loan at 6% interest for a 60-month term.",
      },
      {
        title: "Personal Financing",
        description: "Comparing the total interest cost of a $10,000 loan over 2 years versus 4 years.",
      },
      {
        title: "Debt Payoff Planning",
        description: "Calculating the required monthly payment to clear a fixed debt amount within a specific timeframe.",
      },
    ],
    commonMistakes: [
      "Only looking at the monthly payment instead of the total interest cost over the loan life.",
      "Assuming the bank's interest rate is the only cost (ignoring fees).",
      "Selecting a term that is too long, which significantly increases total interest paid.",
    ],
    whenToUse: "You should use the loan calculator before signing any credit agreement. It is essential for comparing different lender offers, budgeting for a new car or personal loan, and understanding how different interest rates and terms impact your monthly cash flow and long-term financial health.",
    whyItMatters:
      "Understanding the true cost of borrowing is critical for financial health. This tool empowers you to shop for loans with confidence and avoid predatory lending terms by knowing your numbers first.",
    faq: [
      {
        question: "What does APR stand for?",
        answer: "APR stands for Annual Percentage Rate. It is the total cost of borrowing money per year, including the interest rate and some lender fees.",
      },
      {
        question: "Why is total interest so high on long terms?",
        answer: "The longer the loan term, the more time interest has to accrue on your remaining balance. Even a lower monthly payment can result in much higher total costs over time.",
      },
      {
        question: "Can I use this for credit card debt?",
        answer: "Yes, though credit cards usually use daily compounding. This calculator provides a very close estimate for fixed-term debt repayment plans.",
      },
      {
        question: "Does this include taxes or insurance?",
        answer: "No. This calculator only computes the bank's principal and interest. You should budget separately for any required insurance or local taxes.",
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
    title: "Mortgage Calculator - Home Loan & PITI Payment Estimator",
    navLabel: "Mortgage",
    description: "Calculate your monthly mortgage payments including taxes and insurance. Estimate house affordability and total home ownership costs.",
    keywords: ["mortgage calculator", "home loan calculator", "monthly mortgage payment", "house affordability", "mortgage interest estimator", "real estate calculator"],
    whatItDoes:
      "Our Mortgage Calculator is a high-level real estate planning tool that estimates your full monthly PITI (Principal, Interest, Taxes, and Insurance) payment. It goes beyond simple loan math by allowing you to account for property taxes and homeowners insurance, giving you a realistic picture of the actual cost of home ownership. It helps home buyers determine how much house they can actually afford on their current income.",
    howToUse: [
      "Enter the Home Purchase Price and your available Down Payment.",
      "Input the Annual Interest Rate and the Loan Term (typically 15 or 30 years).",
      "Enter estimated monthly Property Tax and Homeowners Insurance amounts.",
      "Click 'Calculate' to see the full monthly cost breakdown.",
    ],
    formula: {
      expression: "Total = Principal + Interest + Tax + Insurance",
      description: "The base payment is found using standard amortization math, then monthly property tax and insurance costs are added to create the final PITI estimate.",
    },
    examples: [
      {
        title: "First-Time Home Purchase",
        description: "Checking if a $450,000 home with 10% down is affordable at a 7% interest rate.",
      },
      {
        title: "Refinance Analysis",
        description: "Calculating potential savings by switching from a 30-year to a 15-year mortgage term.",
      },
      {
        title: "Affordability Check",
        description: "Using fixed monthly tax and insurance data to see how much purchase price you can handle for a $2,500/mo budget.",
      },
    ],
    commonMistakes: [
      "Forgetting to include homeowners association (HOA) fees in your personal budget.",
      "Applying for a loan based on gross income rather than take-home pay.",
      "Not accounting for PMI (Private Mortgage Insurance) if your down payment is less than 20%.",
    ],
    whenToUse: "Use this mortgage calculator at the very start of your home-buying journey. It's an essential tool for setting a realistic budget before visiting properties, comparing fixed-rate versus shorter-term loans, and understanding how a larger down payment can lower your long-term interest expense.",
    whyItMatters:
      "A home is likely the largest purchase you will ever make. Accurate projections help you avoid being 'house-poor' and ensure your investment aligns with your overall financial goals.",
    faq: [
      {
        question: "What is PITI in a mortgage?",
        answer: "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four standard components that usually make up a monthly mortgage payment.",
      },
      {
        question: "How much down payment do I need?",
        answer: "While 20% is ideal to avoid PMI, many programs allow as little as 3% or 3.5%. However, a lower down payment results in a higher loan balance and monthly payment.",
      },
      {
        question: "What is Private Mortgage Insurance (PMI)?",
        answer: "PMI is a monthly fee required by lenders if your down payment is below 20%. It protects the lender in case of default.",
      },
      {
        question: "Should I choose 15 or 30 years?",
        answer: "30-year loans offer lower monthly payments but cost more in total interest. 15-year loans have higher payments but save a massive amount of interest and build equity faster.",
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
    title: "VAT Calculator - Add or Remove Value Added Tax Instantly",
    navLabel: "VAT",
    description: "Calculate VAT for any amount and rate. Easily add VAT to net prices or subtract it from gross totals for accurate business accounting.",
    keywords: ["vat calculator", "calculate vat", "add vat", "remove vat", "sales tax calculator", "vat tax estimator", "exclusive vat", "inclusive vat"],
    whatItDoes:
      "The Convertaro VAT Calculator is a specialized accounting tool for businesses and consumers to navigate Value Added Tax systems. It performs 'two-way' calculations: you can either add VAT to an exclusive (net) price or remove VAT from an inclusive (gross) price. This is essential for invoicing, expense tracking, and international trade across regions like the UK, EU, and Gulf countries.",
    howToUse: [
      "Toggle between 'Add VAT' or 'Remove VAT' modes.",
      "Enter the base Amount you are working with.",
      "Select or type the specific VAT Rate for your region (e.g., 20% or 5%).",
      "Calculate to see the net, gross, and tax amount breakdown.",
    ],
    formula: {
      expression: "Add: Gross = Net × (1 + rate) | Remove: Net = Gross / (1 + rate)",
      description: "To add VAT, we multiply the net by 1 plus the decimal rate. To remove VAT, we divide the gross total by 1 plus the decimal rate.",
    },
    examples: [
      {
        title: "Freelance Invoicing",
        description: "Calculating a 20% VAT charge on a $1,000 project fee to find the $1,200 final invoice total.",
      },
      {
        title: "VAT-Inclusive Receipts",
        description: "Finding the original cost of a $60 purchase when the 20% tax is already included in the price ($50 net + $10 VAT).",
      },
      {
        title: "International Sales",
        description: "Quickly adjusting prices for different regions with varying tax rates (e.g., UK 20% vs UAE 5%).",
      },
    ],
    commonMistakes: [
      "Trying to remove 20% VAT by multiplying by 0.80 (this is incorrect; you must divide by 1.20).",
      "Assuming VAT rates are the same for all products (many countries have reduced rates for food/books).",
      "Confusing VAT with local sales taxes that may have different compounding rules.",
    ],
    whenToUse: "Use this VAT calculator for business bookkeeping, preparing tax-compliant invoices, reclaiming business expenses, or simply understanding how much tax you're paying on your daily purchases. It's a must-have tool for entrepreneurs and frequent travelers.",
    whyItMatters:
      "Accurate VAT calculation is mandatory for law compliance and healthy business accounting. This tool removes the mathematical guesswork from your daily financial transactions.",
    faq: [
      {
        question: "How do I remove 20% VAT?",
        answer: "To remove 20% VAT, divide the total (gross) amount by 1.2. Example: $120 / 1.2 = $100 net.",
      },
      {
        question: "What is the difference between Net and Gross?",
        answer: "Net is the price excluding VAT. Gross is the final price including VAT.",
      },
      {
        question: "How do I calculate VAT manually?",
        answer: "To find the tax amount, multiply the net price by the VAT rate (e.g., 20% = 0.20) or subtract the net from the gross.",
      },
      {
        question: "Does VAT apply to everyone?",
        answer: "VAT is usually paid by the final consumer. Businesses often pay it but can 'reclaim' it from the government under certain conditions.",
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
    title: "Margin Calculator - Profit & Markup Estimation for Sellers",
    navLabel: "Margin",
    description: "Calculate profit margins, markups, and optimal selling prices. Perfect for e-commerce, retail, and business growth planning.",
    keywords: ["margin calculator", "profit margin", "markup calculator", "gross profit", "calculate profit", "selling price calculator", "ecommerce profit margin"],
    whatItDoes:
      "The Margin Calculator is a core business intelligence tool designed for retailers and e-commerce entrepreneurs. It eliminates guesswork from your pricing strategy by calculating final selling prices based on your cost and target profit margins. It clearly differentiates between Margin (profit on sales) and Markup (profit on cost), ensuring you never misprice your inventory and lose potential profit.",
    howToUse: [
      "Enter your total acquisition Cost for the product.",
      "Input your Target Margin percentage (e.g., 25% or 50%).",
      "Click 'Calculate' to generate the ideal Selling Price.",
      "Review the breakdown of Gross Profit and the corresponding Markup percentage.",
    ],
    formula: {
      expression: "Margin = (Revenue - Cost) / Revenue",
      description: "Margin is the percentage of profit in the final selling price. Revenue is calculated as Cost / (1 - Margin/100).",
    },
    examples: [
      {
        title: "Amazon Seller Strategy",
        description: "Ensuring a 40% margin on an item that costs $12 to source, resulting in a $20 selling price.",
      },
      {
        title: "Inventory Review",
        description: "Checking current margins on stock to decide how deep a seasonal discount can go without hitting loss.",
      },
      {
        title: "Service Pricing",
        description: "Determining what to charge for a 10-hour project with a $50/hr target profit and $100 in overhead expenses.",
      },
    ],
    commonMistakes: [
      "Confusing Margin with Markup (a 50% markup is only a 33% margin).",
      "Forgetting to include shipping and transaction fees in your 'Cost' amount.",
      "Pricing based purely on the competition without knowing your own profitable floor.",
    ],
    whenToUse: "You should use the margin calculator every time you source new inventory, adjust seasonal pricing, or plan a marketing promotion. It is the most critical tool for ensuring your business model is sustainable and that every sale you make generates a real profit.",
    whyItMatters:
      "Pricing products incorrectly is the #1 reason small businesses fail. Using a margin calculator ensures every sale you make is actually contributing to your bottom line.",
    faq: [
      {
        question: "What is a healthy profit margin for retail?",
        answer: "It varies by industry, but a 50% margin (doubling your cost) is a common rule of thumb in many general retail sectors.",
      },
      {
        question: "Why is margin different from markup?",
        answer: "Markup is how much you add ON TOP of cost. Margin is how much of your final sale IS profit. They are different views of the same numbers.",
      },
      {
        question: "How do I calculate markup from margin?",
        answer: "Markup = [ Margin / (100 - Margin) ] * 100. For example, a 20% margin equals a 25% markup.",
      },
      {
        question: "Does this include taxes?",
        answer: "No, this calculator focuses on the gross profit relationship between cost and revenue. You should account for sales tax separately.",
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
