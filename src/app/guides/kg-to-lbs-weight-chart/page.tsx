import type { Metadata } from "next";
import { buildGuideMetadata, renderGuidePage } from "@/app/guides/guide-page";

export const metadata: Metadata = buildGuideMetadata("kg-to-lbs-weight-chart");

export default function KgToLbsWeightChartPage() {
  return renderGuidePage("kg-to-lbs-weight-chart");
}
