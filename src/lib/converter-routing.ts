import convertersData from "@/data/converters.json";
import { Converter } from "@/types/converter";
import { mergePriorityConverterData } from "@/lib/priority-pages";

type RouteResolution = {
  requestedConverter?: Converter;
  canonicalConverter?: Converter;
  isAlias: boolean;
};

const allConverters = convertersData as Converter[];

function groupKey(converter: Converter): string {
  return [converter.category, converter.fromUnit, converter.toUnit].join("|");
}

function chooseCanonicalConverter(group: Converter[]): Converter {
  let best = group[0];

  for (let index = 1; index < group.length; index += 1) {
    const candidate = group[index];
    const lengthDifference = candidate.metadata.slug.length - best.metadata.slug.length;

    if (lengthDifference > 0) {
      best = candidate;
      continue;
    }

    if (lengthDifference === 0 && candidate.metadata.slug.localeCompare(best.metadata.slug) < 0) {
      best = candidate;
    }
  }

  return best;
}

const convertersByRoute = new Map<string, Converter>();
const canonicalByKey = new Map<string, Converter>();
const canonicalBySlug = new Map<string, Converter>();
const canonicalById = new Map<string, Converter>();
const aliasToCanonicalSlug = new Map<string, string>();

function buildDisplayConverter(converter: Converter): Converter {
  const group = groupedConverters.get(groupKey(converter));
  if (!group || group.length === 0) {
    return mergePriorityConverterData(converter);
  }

  const richestExamples = group.reduce((best, current) =>
    current.examples.length > best.examples.length ? current : best
  );
  const richestFaq = group.reduce((best, current) =>
    current.faq.length > best.faq.length ? current : best
  );
  const richestRelated = group.reduce((best, current) =>
    current.relatedConverters.length > best.relatedConverters.length ? current : best
  );

  return mergePriorityConverterData({
    ...converter,
    examples: richestExamples.examples,
    faq: richestFaq.faq,
    relatedConverters: richestRelated.relatedConverters,
  });
}

for (const converter of allConverters) {
  convertersByRoute.set(`${converter.category}/${converter.metadata.slug}`, converter);
}

const groupedConverters = new Map<string, Converter[]>();
for (const converter of allConverters) {
  const key = groupKey(converter);
  const existing = groupedConverters.get(key) ?? [];
  existing.push(converter);
  groupedConverters.set(key, existing);
}

for (const [key, group] of groupedConverters) {
  const canonicalConverter = chooseCanonicalConverter(group);
  canonicalByKey.set(key, canonicalConverter);
  canonicalBySlug.set(canonicalConverter.metadata.slug, canonicalConverter);

  for (const converter of group) {
    canonicalById.set(converter.id, canonicalConverter);
    if (converter.metadata.slug !== canonicalConverter.metadata.slug) {
      aliasToCanonicalSlug.set(`${converter.category}/${converter.metadata.slug}`, canonicalConverter.metadata.slug);
    }
  }
}

export const canonicalConverters: Converter[] = allConverters.filter(
  (converter) => canonicalByKey.get(groupKey(converter))?.id === converter.id
);

const displayByKey = new Map<string, Converter>();

for (const converter of canonicalConverters) {
  displayByKey.set(groupKey(converter), buildDisplayConverter(converter));
}

export const canonicalConvertersByCategory = new Map<string, Converter[]>();
export const canonicalConverterCountByCategory = new Map<string, number>();

for (const converter of canonicalConverters) {
  const existing = canonicalConvertersByCategory.get(converter.category);

  if (existing) {
    existing.push(converter);
  } else {
    canonicalConvertersByCategory.set(converter.category, [converter]);
  }

  canonicalConverterCountByCategory.set(
    converter.category,
    (canonicalConverterCountByCategory.get(converter.category) ?? 0) + 1
  );
}

export function getCanonicalConverter(converter: Converter): Converter {
  return canonicalByKey.get(groupKey(converter)) ?? converter;
}

export function getCanonicalConverterById(id: string): Converter | undefined {
  return canonicalById.get(id);
}

export function getCanonicalConverterBySlug(slug: string): Converter | undefined {
  return canonicalBySlug.get(slug);
}

export function resolveConverterRoute(category: string, slug: string): RouteResolution {
  const requestedConverter = convertersByRoute.get(`${category}/${slug}`);

  if (!requestedConverter) {
    return {
      isAlias: false,
    };
  }

  const canonicalBase = getCanonicalConverter(requestedConverter);
  const canonicalConverter = displayByKey.get(groupKey(canonicalBase)) ?? buildDisplayConverter(canonicalBase);

  return {
    requestedConverter,
    canonicalConverter,
    isAlias: canonicalConverter.metadata.slug !== requestedConverter.metadata.slug,
  };
}

export function getRouteVariantSlugs(category: string, slug: string): string[] {
  const requestedConverter = convertersByRoute.get(`${category}/${slug}`);
  if (!requestedConverter) {
    return [];
  }

  const group = groupedConverters.get(groupKey(requestedConverter)) ?? [];
  return group.map((converter) => converter.metadata.slug);
}

export function getCanonicalConverterPath(category: string, slug: string): string | null {
  const resolution = resolveConverterRoute(category, slug);
  if (!resolution.canonicalConverter) {
    return null;
  }

  return `/${category}/${resolution.canonicalConverter.metadata.slug}`;
}

export function canonicalizeConverterHref(href: string): string {
  const [pathPart, query = ""] = href.split("?");
  const segments = pathPart.split("/").filter(Boolean);

  if (segments.length !== 2) {
    return href;
  }

  const [category, slug] = segments;
  const canonicalSlug = aliasToCanonicalSlug.get(`${category}/${slug}`);
  if (!canonicalSlug) {
    return href;
  }

  const canonicalHref = `/${category}/${canonicalSlug}`;
  return query ? `${canonicalHref}?${query}` : canonicalHref;
}

export function dedupeCanonicalConverters(converters: Converter[]): Converter[] {
  const seen = new Set<string>();

  return converters
    .map((converter) => getCanonicalConverter(converter))
    .filter((converter) => {
      const key = `${converter.category}/${converter.metadata.slug}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}
