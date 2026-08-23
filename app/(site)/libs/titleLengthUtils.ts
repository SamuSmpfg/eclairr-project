export type TitleLengthBand = 'short' | 'improve' | 'good'

export interface TitleLengthAssessment {
  charCount: number
  band: TitleLengthBand
  label: string
  bgColor: string
  textColor: string
}

export const getTitleLengthAssessment = (title: string): TitleLengthAssessment => {
  const charCount = title.length

  if (charCount <= 20) {
    return {
      charCount,
      band: 'short',
      label: 'Too Short',
      bgColor: '#FDECEC',
      textColor: '#C43D3D'
    }
  }

  if (charCount < 40 || charCount > 70) {
    return {
      charCount,
      band: 'improve',
      label: 'Could Improve',
      bgColor: '#FFE9DC',
      textColor: '#B44B1D'
    }
  }

  return {
    charCount,
    band: 'good',
    label: 'Good Length',
    bgColor: '#ECF7EC',
    textColor: '#608B4D'
  }
}