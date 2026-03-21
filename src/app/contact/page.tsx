import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/ui/PageShell";
import { canonicalFromPath, INDEXABLE_ROBOTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact | Convertaro",
  description: "Contact Convertaro support for questions, feedback, or partnership inquiries.",
  robots: INDEXABLE_ROBOTS,
  alternates: {
    canonical: canonicalFromPath("/contact"),
  },
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      subtitle="Have a question, feedback, or a request? Send us a message and we’ll get back to you."
    >
      <ContactForm />
    </PageShell>
  );
}

