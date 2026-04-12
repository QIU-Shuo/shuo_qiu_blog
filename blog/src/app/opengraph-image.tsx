import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "64px",
          background:
            "linear-gradient(145deg, #fafaf8 0%, #f5f4f1 58%, #dbeafe 100%)",
          color: "#0f1115",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(15, 17, 21, 0.12)",
            borderRadius: "28px",
            padding: "44px",
            background: "rgba(255, 255, 255, 0.72)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 9999,
                background: "#1d4ed8",
              }}
            />
            Agent Eval Notes
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              maxWidth: 930,
            }}
          >
            <div
              style={{
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.05em",
              }}
            >
              Agent evaluation research for teams building with AI
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.35,
                color: "#3d4350",
              }}
            >
              Benchmarks, methodology, and implementation notes on agent evals,
              synthetic datasets, and eval-driven development.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
