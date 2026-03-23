import type { Metadata } from "next";
import { buildGuideMetadata, renderGuidePage } from "@/app/guides/guide-page";

export const metadata: Metadata = buildGuideMetadata("cm-to-inches-height-chart");

export default function CmToInchesHeightChartPage() {
  return renderGuidePage("cm-to-inches-height-chart");
}
