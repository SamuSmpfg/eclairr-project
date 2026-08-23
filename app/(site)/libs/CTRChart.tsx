'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

interface CTRChartProps {
  value: number
  label: string
}

const CTRChart = ({ value, label }: CTRChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const myChart = echarts.init(chartRef.current)

    const gaugeData = [
      {
        value,
        title: {
          offsetCenter: ['0%', '10%']
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '-20%']
        }
      }
    ]

    const option: EChartsOption = {
      series: [
        {
          type: 'gauge',
          startAngle: 220,
          endAngle: -40,
          color: '#AC95F4',
          min: 0,
          max: 10,
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
          data: gaugeData,
          detail: {
            width: 50,
            height: 14,
            fontWeight: 'lighter',
            fontSize: 48,
            color: 'black',
            borderWidth: 0,
            formatter: '{value}'
          }
        }
      ]
    }

    myChart.setOption(option)

    const handleResize = () => myChart.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      myChart.dispose()
    }
  }, [value])

  return (
    <div style={{ position: 'relative', marginTop: '-110px' }}>
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
        style={
          {
            width: '350px',
            height: '350px'
          }
        } />
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#d9f7a3',
          color: '#364B20',
          fontSize: '16px',
          fontWeight: 500,
          padding: '6px 16px',
          borderRadius: '4px',
          whiteSpace: 'nowrap'
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default CTRChart