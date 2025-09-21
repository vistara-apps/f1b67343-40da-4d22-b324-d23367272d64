export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic predictions', 'Match schedules', 'Team news'],
  },
  basic: {
    name: 'Basic',
    price: 1,
    features: ['AI predictions', 'Live momentum', 'Player insights', 'Historical data'],
  },
  premium: {
    name: 'Premium',
    price: 5,
    features: ['Advanced analytics', 'Custom models', 'Priority support', 'Exclusive content'],
  },
} as const

export const LEAGUES = [
  { id: 'PL', name: 'Premier League', country: 'England' },
  { id: 'PD', name: 'La Liga', country: 'Spain' },
  { id: 'SA', name: 'Serie A', country: 'Italy' },
  { id: 'BL1', name: 'Bundesliga', country: 'Germany' },
  { id: 'FL1', name: 'Ligue 1', country: 'France' },
  { id: 'CL', name: 'Champions League', country: 'Europe' },
] as const

export const MATCH_STATUSES = {
  scheduled: 'Scheduled',
  live: 'Live',
  finished: 'Finished',
} as const

export const PREDICTION_CONFIDENCE_LEVELS = {
  low: { min: 0, max: 0.6, label: 'Low Confidence', color: 'text-red-400' },
  medium: { min: 0.6, max: 0.8, label: 'Medium Confidence', color: 'text-yellow-400' },
  high: { min: 0.8, max: 1, label: 'High Confidence', color: 'text-green-400' },
} as const

export const MOMENTUM_THRESHOLDS = {
  strongHome: 50,
  homeAdvantage: 20,
  balanced: -20,
  awayAdvantage: -50,
} as const
