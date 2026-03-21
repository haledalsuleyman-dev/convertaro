import Link from "next/link";
import { Category, Converter } from "@/types/converter";
import { getConverterNarrative } from "@/lib/converter-content";

interface ConverterContentSectionsProps {
  converter: Converter;
  category: Category;
  reverseConverter?: Converter;
  contextualLinks: Converter[];
}

export function ConverterContentSections({
  converter,
  category,
  reverseConverter,
  contextualLinks,
}: ConverterContentSectionsProps) {
  const content = getConverterNarrative(converter, category);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Understanding the units</h2>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="rounded-xl border border-border bg-background/60 p-4">
            <h3 className="text-sm font-bold text-text-primary">What is {converter.fromUnit}?</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{content.fromExplanation}</p>
          </article>
          <article className="rounded-xl border border-border bg-background/60 p-4">
            <h3 className="text-sm font-bold text-text-primary">What is {converter.toUnit}?</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{content.toExplanation}</p>
          </article>
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">
          When people use this conversion
        </h2>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {converter.title} is commonly used in {content.useCases[0]}, {content.useCases[1]}, and {content.useCases[2]}. It helps teams keep calculations consistent when data comes from different standards.
        </p>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          You can also browse the full&nbsp;
          <Link href={`/${category.slug}`} className="font-semibold text-primary hover:underline">
            {category.name.toLowerCase()} converters collection
          </Link>
          &nbsp;for adjacent unit pairs.
        </p>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Real-world examples</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {converter.examples.slice(0, 3).map((example, index) => (
            <article key={index} className="rounded-xl border border-border bg-background/60 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold">Example {index + 1}</p>
              <p className="mt-1.5 text-sm font-bold text-text-primary">
                {example.input} {converter.fromUnit} {"->"} {example.output.toString()} {converter.toUnit}
              </p>
              <p className="mt-1.5 text-xs text-text-secondary">
                Useful for quick validation before using larger values in reports or calculations.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Quick reference and common mistakes</h2>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          Use the quick table above for rough checks, then use the formula for exact values. Keep more decimals during intermediate steps and round only at the end.
        </p>
        <ul className="mt-4 space-y-2">
          {content.mistakes.map((mistake) => (
            <li key={mistake} className="text-sm text-text-secondary leading-relaxed">
              - {mistake}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white border border-border shadow-card p-6 sm:p-8">
        <h2 className="text-lg font-black text-text-primary tracking-tight">Why this conversion matters</h2>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          Converting {content.fromLabel} to {content.toLabel} accurately prevents communication errors between teams, tools, and regions that use different standards.
          {" "}
          {reverseConverter ? (
            <>
              If you need the opposite direction, use the
              {" "}
              <Link
                href={`/${reverseConverter.category}/${reverseConverter.metadata.slug}`}
                className="font-semibold text-primary hover:underline"
              >
                {reverseConverter.title}
              </Link>
              .
            </>
          ) : null}
        </p>
        {contextualLinks.length > 0 ? (
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            Related paths you may need next:{" "}
            {contextualLinks.map((item, index) => (
              <span key={item.id}>
                <Link
                  href={`/${item.category}/${item.metadata.slug}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {item.title}
                </Link>
                {index < contextualLinks.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        ) : null}
      </section>
    </div>
  );
}
