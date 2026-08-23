export type PredictorScoreBand = 'bad' | 'average' | 'strong'

export interface PredictorScoreStyle {
  band: PredictorScoreBand
  label: string
  bgColor: string
  textColor: string
  barColor: string
}

export const getPredictorScoreStyle = (score: number): PredictorScoreStyle => {
  if (score <= 40) {
    return {
      band: 'bad',
      label: 'Bad',
      bgColor: '#FDECEC',
      textColor: '#C43D3D',
      barColor: '#FF6B6B'
    }
  }

  if (score <= 69) {
    return {
      band: 'average',
      label: 'Average',
      bgColor: '#FFE9DC',
      textColor: '#B44B1D',
      barColor: '#FF8A50'
    }
  }

  return {
    band: 'strong',
    label: 'Strong',
    bgColor: '#CDFF83',
    textColor: '#364B20',
    barColor: '#8FDD5C'
  }
}