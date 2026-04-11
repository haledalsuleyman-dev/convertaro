import React from "react";

interface AdSlotProps {
  /**
   * Defines the ad unit format.
   * - leaderboard: Wide top/bottom banner (desktop 728x90 or 970x250)
   * - sidebar: Vertical skyscraper (300x250 or 300x600)
   * - in-content: Standard rectangle (300x250, fluid width on mobile)
   */
  type?: "horizontal" | "sidebar" | "in-content" | "leaderboard";
  className?: string;
  id?: string;
}

export function AdSlot({ type = "horizontal", className = "", id }: AdSlotProps) {
  // CLS (Cumulative Layout Shift) Prevention:
  // Pre-allocating exact min-heights matching standard IAB ad sizes so the page doesn't jump
  // when premium ad networks inject scripts asynchronously.
  let minHeightStyle = "min-h-[90px]"; // Base mobile banner

  switch (type) {
    case "leaderboard":
      // Standard leaderboard on mobile: 320x50 or 320x100
      // Desktop leaderboard: 728x90 or 970x250 billboard
      minHeightStyle = "min-h-[100px] lg:min-h-[250px]";
      break;
    case "sidebar":
      // Sticky sidebar standard sizes: 300x250, 300x600
      minHeightStyle = "min-h-[250px] xl:min-h-[600px]";
      break;
    case "in-content":
      // Mid-article rectangles: 300x250 standard
      minHeightStyle = "min-h-[250px]";
      break;
    default:
      minHeightStyle = "min-h-[90px]";
      break;
  }

  return (
    <div
      id={id}
      className={`w-full flex flex-col items-center justify-center bg-slate-50/30 border border-slate-100/50 rounded-2xl ${minHeightStyle} ${className}`}
      aria-hidden="true"
    >
      <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-300 uppercase opacity-60">
        Advertisement
      </span>
    </div>
  );
}
