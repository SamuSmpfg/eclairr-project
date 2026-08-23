"use client"

import React, { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"

interface GaugeChartProps {
  value: number
  label?: string
  height?: number | string
  tickValues?: number[]
  min?: number
  max?: number
  animationDuration?: number
}

const START_ANGLE = 225
const END_ANGLE = -45

function valueToAngleDeg(value: number, min: number, max: number) {
  const ratio = (value - min) / (max - min)
  return START_ANGLE + ratio * (END_ANGLE - START_ANGLE)
}

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: radius * Math.cos(rad),
    y: -radius * Math.sin(rad),
  }
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  label = "Growing",
  height = 350,
  tickValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  min = 0,
  max = 100,
  animationDuration = 1200,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)
  const rafRef = useRef<number | null>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const buildOption = (v: number) => ({
    series: [
      {
        type: "gauge",
        startAngle: START_ANGLE,
        endAngle: END_ANGLE,
        min,
        max,
        radius: "90%",
        center: ["50%", "50%"],
        axisLine: {
          lineStyle: {
            width: 22,
            color: [
              [
                Math.max(v, 0.001) / max,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#FFFFFF" },
                  { offset: 1, color: "#FE5919" },
                ]),
              ],
              [1, "#F2F2F2"],
            ],
          },
        },
        pointer: { show: false },
        progress: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          offsetCenter: [0, "0%"],
          formatter: () => `{value|${Math.round(v)}}\n{label|${label}}`,
          rich: {
            value: {
              fontSize: 64,
              fontWeight: "normal",
              color: "#000000",
              lineHeight: 100,
            },
            label: {
              fontSize: 14,
              color: "#205249",
              fontWeight: "lighter",
              backgroundColor: "#D9FFA0",
              padding: [10, 10],
              borderRadius: 8,
              lineHeight: 20,
            },
          },
        },
        data: [{ value: v }],
      },
    ],
  })

  useEffect(() => {
    if (!containerRef.current) return

    const chart = echarts.init(containerRef.current)
    chartRef.current = chart
    chart.setOption(buildOption(0))

    const handleResize = () => chart.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!wrapperRef.current) return
    const el = wrapperRef.current

    const update = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight })

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!chartRef.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const chart = chartRef.current
    const start = performance.now()
    const from = 0
    const to = value

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / animationDuration, 1)
      const eased = easeOutCubic(progress)
      const current = from + (to - from) * eased

      chart.setOption(buildOption(current))
      setDisplayValue(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value, animationDuration])

  const outerRadius = Math.min(size.width, size.height) / 2
  const labelRadius = outerRadius * 0.97
  const cx = size.width / 2
  const cy = size.height / 2

  return (
    <div ref={wrapperRef} style={{ width: "100%", height, position: "relative" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        {size.width > 0 &&
          tickValues.map((tick) => {
            const angle = valueToAngleDeg(tick, min, max)
            const { x, y } = polarToCartesian(angle, labelRadius)
            return (
              <span
                key={tick}
                style={{
                  position: "absolute",
                  top: `${cy + y}px`,
                  left: `${cx + x}px`,
                  transform: "translate(-50%, -50%)",
                  fontSize: 13,
                  color: "#999",
                }}
              >
                {tick}
              </span>
            )
          })}
      </div>
    </div>
  )
}

export default GaugeChart