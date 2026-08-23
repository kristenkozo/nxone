"use client";

import { cn } from "@/lib/utils";

const toneColor: Record<string, string> = {
  up: "oklch(72% 0.2 145)",
  degraded: "oklch(80% 0.15 85)",
  down: "oklch(62% 0.22 25)",
  neutral: "oklch(55% 0.22 295)",
};

function pathFromPoints(
  points: number[],
  width: number,
  height: number,
  padding = 2,
): string {
  if (points.length < 2) return "";
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = (width - padding * 2) / (points.length - 1);

  return points
    .map((v, i) => {
      const x = padding + i * step;
      const y = padding + (1 - (v - min) / range) * (height - padding * 2);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export function Sparkline({
  data,
  tone = "neutral",
  width = 80,
  height = 24,
  className,
}: {
  data: number[];
  tone?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const color = toneColor[tone] ?? toneColor.neutral;
  const d = pathFromPoints(data, width, height);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("inline-block", className)}
      width={width}
      height={height}
    >
      <path d={d} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}

export function BarChart({
  data,
  tone = "neutral",
  width = 80,
  height = 24,
  className,
}: {
  data: number[];
  tone?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const color = toneColor[tone] ?? toneColor.neutral;
  const max = Math.max(...data) || 1;
  const barWidth = Math.max(2, (width - (data.length - 1)) / data.length);
  const gap = 1;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("inline-block", className)}
      width={width}
      height={height}
    >
      {data.map((v, i) => {
        const h = (v / max) * (height - 2);
        return (
          <rect
            key={i}
            x={i * (barWidth + gap)}
            y={height - h - 1}
            width={barWidth}
            height={h}
            rx={1}
            fill={color}
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
}
