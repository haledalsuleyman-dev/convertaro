const fs = require('fs');
const path = require('path');

const convertersData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/converters.json'), 'utf8'));
const allConverters = convertersData;

function groupKey(converter) {
  return [converter.category, converter.fromUnit, converter.toUnit].join("|");
}

function chooseCanonicalConverter(group) {
  let best = group[0];
  for (let i = 1; i < group.length; i++) {
    const candidate = group[i];
    const lenDiff = candidate.metadata.slug.length - best.metadata.slug.length;
    if (lenDiff > 0) {
      best = candidate;
    } else if (lenDiff === 0 && candidate.metadata.slug.localeCompare(best.metadata.slug) < 0) {
      best = candidate;
    }
  }
  return best;
}

const grouped = new Map();
allConverters.forEach(c => {
  const key = groupKey(c);
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(c);
});

const targets = [
  { from: "cm", to: "inches", cat: "length" },
  { from: "inches", to: "cm", cat: "length" },
  { from: "kg", to: "lbs", cat: "weight" },
  { from: "lbs", to: "kg", cat: "weight" },
  { from: "miles", to: "km", cat: "length" },
  { from: "km", to: "miles", cat: "length" },
  { from: "C", to: "F", cat: "temperature" },
  { from: "F", to: "C", cat: "temperature" },
  { from: "m", to: "feet", cat: "length" },
  { from: "liters", to: "gallons", cat: "volume" },
  { from: "MB", to: "GB", cat: "data" },
  { from: "sqft", to: "acres", cat: "area" },
  { from: "mph", to: "kmh", cat: "speed" }
];

targets.forEach(t => {
  const key = `${t.cat}|${t.from}|${t.to}`;
  const group = grouped.get(key);
  if (group) {
    const canonical = chooseCanonicalConverter(group);
    console.log(`${t.from} to ${t.to} (${t.cat}) -> ${canonical.metadata.slug}`);
  } else {
    console.log(`NOT FOUND: ${t.from} to ${t.to} (${t.cat})`);
  }
});
