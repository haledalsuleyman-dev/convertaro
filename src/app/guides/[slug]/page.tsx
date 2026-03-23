import type { Metadata } from "next";
import { buildGuideMetadata, getGuideStaticParams, renderGuidePage } from "@/app/guides/guide-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getGuideStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildGuideMetadata(slug);
}

export default async function GuideSlugPage({ params }: PageProps) {
  const { slug } = await params;
  return renderGuidePage(slug);
}
