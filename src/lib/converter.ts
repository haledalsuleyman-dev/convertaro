export const convertValue = (value: number, fromUnit: string, toUnit: string, category: string): number => {
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  // For other categories, we use the conversion ratios from the converter data
  // However, for runtime flexibility, we can also use a common base unit approach
  return convertGeneric(value, fromUnit, toUnit, category);
};

const convertTemperature = (value: number, from: string, to: string): number => {
  let celsius = 0;
  
  // Convert to Celsius first
  if (from === 'C') celsius = value;
  else if (from === 'F') celsius = (value - 32) * 5/9;
  else if (from === 'K') celsius = value - 273.15;
  
  // Convert from Celsius to target
  if (to === 'C') return celsius;
  else if (to === 'F') return (celsius * 9/5) + 32;
  else if (to === 'K') return celsius + 273.15;
  
  return value;
};

// Factors relative to a base unit (Length: m, Weight: kg, Data: B, Time: sec, Volume: L, Area: sqm, Speed: kmh, Energy: J, Pressure: Pa)
const factors: Record<string, Record<string, number>> = {
  length: {
    cm: 0.01,
    inches: 0.0254,
    m: 1,
    feet: 0.3048,
    km: 1000,
    miles: 1609.344,
    mm: 0.001,
    yards: 0.9144,
    nmi: 1852,
  },
  weight: {
    kg: 1,
    lbs: 0.45359237,
    g: 0.001,
    oz: 0.028349523125,
    mg: 0.000001,
    t: 1000,
    st: 6.35029,
  },
  data: {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
    bits: 0.125,
  },
  time: {
    sec: 1,
    min: 60,
    hr: 3600,
    day: 86400,
    week: 604800,
    month: 2629746,
    year: 31556952,
  },
  volume: {
    L: 1,
    gal: 3.785411784,
    ml: 0.001,
    cups: 0.2365882365,
    pt: 0.473176473,
    qt: 0.946352946,
    floz: 0.0295735295625,
  },
  area: {
    sqm: 1,
    sqft: 0.092903,
    acres: 4046.86,
    hectares: 10000,
    sqkm: 1000000,
    sqmi: 2589988.11,
  },
  speed: {
    kmh: 1,
    mph: 1.609344,
    ms: 3.6,
    knots: 1.852,
    mach: 1234.8,
  },
  energy: {
    J: 1,
    cal: 4.184,
    kWh: 3600000,
    eV: 1.60218e-19,
    btu: 1055.06,
  },
  pressure: {
    Pa: 1,
    bar: 100000,
    psi: 6894.76,
    atm: 101325,
    torr: 133.322,
  },
};

const convertGeneric = (value: number, from: string, to: string, category: string): number => {
  const categoryFactors = factors[category];
  if (!categoryFactors || !categoryFactors[from] || !categoryFactors[to]) return value;
  
  const baseValue = value * categoryFactors[from];
  return baseValue / categoryFactors[to];
};

export const formatValue = (value: number): string => {
  if (value === 0) return '0';
  if (Math.abs(value) < 0.0001 || Math.abs(value) > 10000000) {
    return value.toExponential(4);
  }
  return Number(value.toFixed(6)).toString();
};
