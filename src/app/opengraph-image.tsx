import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Convertaro - Free Online Unit Converter";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 20% 0%, rgba(34,211,238,0.34), transparent 42%), radial-gradient(circle at 100% 100%, rgba(251,191,36,0.2), transparent 36%), linear-gradient(130deg, #0f172a 0%, #0c2942 45%, #0b2237 100%)",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #0891b2 0%, #0f172a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <div style={{ fontSize: "40px", fontWeight: 700, letterSpacing: "-0.03em" }}>Convertaro</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "980px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "66px",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            <span>500+ Accurate</span>
            <span>Converters &amp; Calculators</span>
          </div>
          <div style={{ fontSize: "30px", color: "#d1e9ff", maxWidth: "900px" }}>
            Convert length, weight, temperature, data, volume, speed, and more instantly.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: "24px", color: "#a5c9ea" }}>
          convertaro.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
