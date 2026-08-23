"use client";

import { useEffect, useState, useMemo } from "react";

interface GaugeSegment {
  upTo: number;
  color: string;
}

interface BarGaugeProps {
  value: number;
  min?: number;
  max?: number;
  barCount?: number;
  segments?: GaugeSegment[];
  barHeight?: number;
  barWidth?: number;
  gap?: number;
}

const defaultSegments: GaugeSegment[] = [
  { upTo: 65, color: "#8B6FE0" },
  { upTo: 75, color: "#CDFF83" },
  { upTo: 100, color: "#FE0000" },
];

export default function BarGauge({
  value,
  min = 0,
  max = 100,
  barCount = 60,
  segments = defaultSegments,
  barHeight = 56,
  barWidth = 2,
  gap = 4,
}: BarGaugeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const bars = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      const barValue = min + ((i + 0.5) / barCount) * (max - min);
      const segment =
        segments.find((s) => barValue <= s.upTo) ?? segments[segments.length - 1];
      return { id: i, color: segment.color };
    });
  }, [barCount, min, max, segments]);

  const valuePercent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100)
  );

  const totalWidth = barCount * barWidth + (barCount - 1) * gap;

  return (
    <div className="w-full pt-6 flex justify-start">
      <div
        className="relative flex items-end"
        style={{ height: barHeight, width: totalWidth, gap }}
      >
        {bars.map((bar, i) => (
          <div
            key={bar.id}
            className="rounded-[1px] origin-bottom transition-transform duration-500 ease-out"
            style={{
              backgroundColor: bar.color,
              width: barWidth,
              height: barHeight,
              transitionDelay: `${i * 12}ms`,
              transform: mounted ? "scaleY(1)" : "scaleY(0)",
            }}
          />
        ))}
        <div
          className="absolute top-[-24px] flex flex-col items-center pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            left: `${valuePercent}%`,
            transform: "translateX(-50%)",
            opacity: mounted ? 1 : 0,
            transitionDelay: `${barCount * 12 + 150}ms`,
          }}
        >
          <span className="text-xs font-medium text-gray-500 mb-1 whitespace-nowrap">
            {Math.round(value)}%
          </span>
        </div>
      </div>
    </div>
  );
}