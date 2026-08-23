'use client'

import { useEffect, useRef } from "react"
import * as echarts from "echarts"
import { getHookBoxStyle } from "./scoreUtils"

type EChartsOption = echarts.EChartsOption

interface ScorerChartProps {
  score: number
}

const ScorerChart = ({ score }: ScorerChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const boxStyle = getHookBoxStyle(score)

  useEffect(() => {
    if (!chartRef.current) return

    const myChart = echarts.init(chartRef.current)

    const option: EChartsOption = {
      series: [
        {
          type: "gauge",
          startAngle: 220,
          endAngle: -40,
          color: "#ff7e56",
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
              width: 20
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
              value: score,
              title: {
                offsetCenter: ["0%", "10%"]
              },
              detail: {
                valueAnimation: true,
                offsetCenter: ["0%", "-20%"]
              }
            }
          ],
          detail: {
            width: 50,
            height: 14,
            fontWeight: "lighter",
            fontSize: 32,
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
  }, [score])

  return (
    <div style={{ position: "relative", marginTop: "-90px" }}>
      <div
        id="main"
        ref={chartRef}
        className="
        hover:cursor-normal
        hover:scale-110
        transition
        overflow-hidden
        pt-[90px]
        "
        style={{
          width: "400px",
          height: "400px"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: boxStyle.bgColor,
          color: boxStyle.textColor,
          fontSize: "16px",
          fontWeight: 500,
          padding: "6px 16px",
          borderRadius: "4px",
          whiteSpace: "nowrap"
        }}
      >
        {boxStyle.label}
      </div>
    </div>
  )
}

export default ScorerChart