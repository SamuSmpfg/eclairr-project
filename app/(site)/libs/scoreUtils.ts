export type ScoreBand = 'bad' | 'average' | 'good' | 'excellent'

export interface ScoreStyle {
  band: ScoreBand
  gaugeColor: string
  dotColor: string
  textColor: string
  label: string
}

export const getScoreBand = (score: number): ScoreBand => {
  if (score <= 40) return 'bad'
  if (score <= 69) return 'average'
  if (score <= 89) return 'good'
  return 'excellent'
}

const MINI_PALETTE: Record<ScoreBand, { gaugeColor: string; dotColor: string; textColor: string }> = {
  bad: { gaugeColor: '#FF6B6B', dotColor: '#FF4747', textColor: '#C43D3D' },
  average: { gaugeColor: '#ff7e56', dotColor: '#FF662B', textColor: '#FF662B' },
  good: { gaugeColor: '#D9FFA0', dotColor: '#D9FFA0', textColor: '#608B4D' },
  excellent: { gaugeColor: '#D9FFA0', dotColor: '#D9FFA0', textColor: '#608B4D' }
}

const MINI_LABELS: Record<ScoreBand, string> = {
  bad: 'Bad',
  average: 'Average',
  good: 'Good',
  excellent: 'Excellent'
}

export const getMiniScoreStyle = (score: number): ScoreStyle => {
  const band = getScoreBand(score)
  return { band, ...MINI_PALETTE[band], label: MINI_LABELS[band] }
}

export interface HookBoxStyle {
  band: ScoreBand
  bgColor: string
  textColor: string
  label: string
}

const HOOK_BOX_PALETTE: Record<ScoreBand, { bgColor: string; textColor: string }> = {
  bad: { bgColor: '#FFE5E5', textColor: '#8B2E2E' },
  average: { bgColor: '#FFE9DC', textColor: '#B44B1D' },
  good: { bgColor: '#d9f7a3', textColor: '#364B20' },
  excellent: { bgColor: '#d9f7a3', textColor: '#364B20' }
}

const HOOK_LABELS: Record<ScoreBand, string> = {
  bad: 'Bad hook!',
  average: 'Average hook!',
  good: 'Solid hook!',
  excellent: 'Excellent hook!'
}

export const getHookBoxStyle = (score: number): HookBoxStyle => {
  const band = getScoreBand(score)
  return { band, ...HOOK_BOX_PALETTE[band], label: HOOK_LABELS[band] }
}

type MetricKey = 'emotionalPull' | 'retentionPotential' | 'curiosity' | 'clarity'

export const METRIC_MESSAGES: Record<MetricKey, Record<ScoreBand, string>> = {
  emotionalPull: {
    bad: 'Feels flat, add real emotion or urgency.',
    average: 'Could use more emotion or stronger language.',
    good: 'Solid emotional pull, viewers will feel it.',
    excellent: 'Deeply emotional, hard to scroll past.'
  },
  retentionPotential: {
    bad: 'High chance viewers drop off early.',
    average: 'Might lose some viewers along the way.',
    good: 'Decent chance to keep viewers watching.',
    excellent: 'Very likely to hold viewers until the end.'
  },
  curiosity: {
    bad: 'Barely sparks any curiosity gap.',
    average: 'Some curiosity, but the gap feels weak.',
    good: 'Strong curiosity gap that reveals a mistake.',
    excellent: 'Impossible to ignore, the gap begs to be closed.'
  },
  clarity: {
    bad: 'Confusing, hard to understand at a glance.',
    average: 'Mostly clear, but could be simpler.',
    good: 'Clear and easy to understand.',
    excellent: 'Crystal clear, understood in a split second.'
  }
}

export const getMetricMessage = (metric: MetricKey, score: number): string => {
  const band = getScoreBand(score)
  return METRIC_MESSAGES[metric][band]
}

export type GaugeBand = 'bad' | 'average' | 'good'

export interface GaugeScoreStyle {
  label: GaugeBand
  color: string
  bgColor: string
}

const GAUGE_PALETTE: Record<GaugeBand, { color: string; bgColor: string }> = {
  bad: { color: '#E52626', bgColor: '#FFDADA' },
  average: { color: '#FE6022', bgColor: '#FDE3D9' },
  good: { color: '#6AA94E', bgColor: '#E6FFC0' }
}

export const getGaugeBand = (score: number): GaugeBand => {
  if (score < 40) return 'bad'
  if (score < 70) return 'average'
  return 'good'
}

export const getGaugeScoreStyle = (score: number): GaugeScoreStyle => {
  const label = getGaugeBand(score)
  return { label, ...GAUGE_PALETTE[label] }
}

const COLUMN_LIGHT = { r: 0xE8, g: 0xE8, b: 0xF1 }
const COLUMN_DARK = { r: 0xB6, g: 0xB4, b: 0xD9 }

const lerpChannel = (from: number, to: number, t: number): number =>
  Math.round(from + (to - from) * t)

const toHex = (n: number): string => n.toString(16).padStart(2, '0')

const getColumnColor = (score: number): string => {
  const t = Math.max(0, Math.min(score, 100)) / 100
  const r = lerpChannel(COLUMN_LIGHT.r, COLUMN_DARK.r, t)
  const g = lerpChannel(COLUMN_LIGHT.g, COLUMN_DARK.g, t)
  const b = lerpChannel(COLUMN_LIGHT.b, COLUMN_DARK.b, t)
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export interface ColumnStyle {
  label: GaugeBand
  barColor: string
  height: number
}

export const getColumnStyle = (score: number): ColumnStyle => {
  const label = getGaugeBand(score)
  const barColor = getColumnColor(score)
  const height = Math.round(60 + (Math.max(0, Math.min(score, 100)) / 100) * 180)
  return { label, barColor, height }
}

export const sortByScoreAsc = <T extends { score: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.score - b.score)

export type OverallBand = 'bad' | 'good' | 'excellent'

export interface OverallStyle {
  label: string
  color: string
  bgColor: string
}

const OVERALL_PALETTE: Record<OverallBand, { color: string; bgColor: string }> = {
  bad: { color: '#E52626', bgColor: '#FFDADA' },
  good: { color: '#FE6022', bgColor: '#FDE3D9' },
  excellent: { color: '#364B20', bgColor: '#CDFF83' }
}

const OVERALL_LABELS: Record<OverallBand, string> = {
  bad: 'Bad',
  good: 'Good',
  excellent: 'Exellent'
}

export const getOverallBand = (average: number): OverallBand => {
  if (average < 30) return 'bad'
  if (average < 70) return 'good'
  return 'excellent'
}

export const getOverallStyle = (average: number): OverallStyle => {
  const band = getOverallBand(average)
  return { label: OVERALL_LABELS[band], ...OVERALL_PALETTE[band] }
}

export const getAverageScore = (scores: number[]): number =>
  Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)