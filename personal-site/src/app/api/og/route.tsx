import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "MELTED";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0c0c0c",
          fontFamily: "Inter, sans-serif",
          color: "#f5f5f4",
          position: "relative",
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            width: "70%",
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.35em",
              color: "#6b6b6b",
              marginBottom: 24,
            }}
          >
            ARTICLE
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 40 ? 48 : 56,
              fontWeight: 400,
              lineHeight: 1.2,
              marginBottom: 32,
              maxWidth: 700,
            }}
          >
            {title}
          </div>

          {/* Author */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: "#a3a3a3",
              }}
            >
              by MELTED
            </div>
          </div>
        </div>

        {/* Visual side - particle network simulation */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Circles */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              border: "1px solid rgba(255, 255, 255, 0.04)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "50%",
            }}
          />

          {/* Dots */}
          {[
            { top: 80, left: 60, size: 4, opacity: 0.3 },
            { top: 150, left: 120, size: 6, opacity: 0.5 },
            { top: 220, left: 200, size: 4, opacity: 0.35 },
            { top: 300, left: 80, size: 5, opacity: 0.4 },
            { top: 350, left: 180, size: 6, opacity: 0.5 },
            { top: 420, left: 100, size: 4, opacity: 0.3 },
            { top: 180, left: 280, size: 5, opacity: 0.45 },
            { top: 280, left: 300, size: 4, opacity: 0.35 },
            { top: 380, left: 260, size: 5, opacity: 0.4 },
            { top: 480, left: 200, size: 4, opacity: 0.3 },
          ].map((dot, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                background: `rgba(245, 245, 244, ${dot.opacity})`,
                borderRadius: "50%",
              }}
            />
          ))}

          {/* Lines */}
          {[
            { top: 155, left: 125, width: 80, rotate: 25 },
            { top: 305, left: 85, width: 100, rotate: -20 },
            { top: 355, left: 185, width: 80, rotate: 30 },
            { top: 185, left: 200, width: 90, rotate: 10 },
            { top: 285, left: 210, width: 70, rotate: -15 },
          ].map((line, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: line.top,
                left: line.left,
                width: line.width,
                height: 1,
                background: "rgba(245, 245, 244, 0.08)",
                transform: `rotate(${line.rotate}deg)`,
                transformOrigin: "left center",
              }}
            />
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 80,
            fontSize: 14,
            color: "#6b6b6b",
            letterSpacing: "0.1em",
          }}
        >
          meltedmindz.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
