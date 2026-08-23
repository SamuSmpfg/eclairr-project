'use client'

import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { getMiniScoreStyle } from "./scoreUtils"

type EChartsOption = echarts.EChartsOption

interface EmotionalChartProps {
  value: number
}

const RetentionChart = ({ value }: EmotionalChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const style = getMiniScoreStyle(value)

  useEffect(() => {
    if (!chartRef.current) return

    const myChart = echarts.init(chartRef.current)

    const option: EChartsOption = {
      series: [
        {
          type: "gauge",
          startAngle: 90,
          endAngle: -270,
          color: style.gaugeColor,
          pointer: {
            show: false
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false
          },
          axisLine: {
            lineStyle: {
              width: 5
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          data: [
            {
              value,
              title: {
                offsetCenter: ["0%", "0%"]
              },
              detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "10%"]
              }
            }
          ],
          detail: {
            width: 50,
            height: 14,
            fontWeight: "lighter",
            fontSize: 30,
            color: "black",
            borderWidth: 0,
            formatter: "{value}"
          }
        }
      ]
    }

    myChart.setOption(option)

    const handleResize = () => myChart.resize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      myChart.dispose()
    }
  }, [value, style.gaugeColor])

  return (
    <div style={{ position: "relative", marginTop: "-8px" }}>
      <div
        ref={chartRef}
        className="hover:cursor-normal hover:scale-110 transition"
        style={{ width: "88px", height: "88px" }}
      />
    </div>
  )
}

export default RetentionChart