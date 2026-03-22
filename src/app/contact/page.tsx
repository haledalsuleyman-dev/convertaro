import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/ui/PageShell";
import {
  INDEXABLE_ROBOTS,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
  buildWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact | Convertaro",
  description: "Contact Convertaro support for questions, feedback, or partnership inquiries.",
  robots: INDEXABLE_ROBOTS,
  alternates: buildAlternates("/contact"),
  openGraph: buildOpenGraph({
    title: "Contact | Convertaro",
    description: "Contact Convertaro support for questions, feedback, or partnership inquiries.",
    path: "/contact",
  }),
  twitter: buildTwitter(
    "Contact | Convertaro",
    "Contact Convertaro support for questions, feedback, or partnership inquiries."
  ),
};

export default function ContactPage() {
  const webPageSchema = buildWebPageSchema({
    name: "Contact Convertaro",
    description: "Contact Convertaro support for questions, feedback, or partnership inquiries.",
    path: "/contact",
  });

  return (
    <PageShell
      title="Contact"
      subtitle="Have a question, feedback, or a request? Send us a message and we’ll get back to you."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ContactForm />
    </PageShell>
  );
}

