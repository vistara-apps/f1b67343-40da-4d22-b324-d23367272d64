export interface User {
  userId: string
  farcasterProfile?: {
    fid: number
    username: string
    displayName: string
    pfpUrl?: string
  }
  favoriteTeams: string[]
  favoriteLeagues: string[]
  preferences: UserPreferences
  subscriptionTier: 'free' | 'basic' | 'premium'
  purchaseHistory: Purchase[]
}

export interface UserPreferences {
  notifications: boolean
  liveUpdates: boolean
  predictionAlerts: boolean
  theme: 'dark' | 'light'
}

export interface Purchase {
  id: string
  type: 'prediction' | 'subscription' | 'analysis'
  amount: number
  date: string
  matchId?: string
}

export interface Team {
  teamId: string
  name: string
  logo: string
  leagueId: string
  shortName?: string
  colors?: {
    primary: string
    secondary: string
  }
}

export interface Player {
  playerId: string
  name: string
  teamId: string
  position: string
  stats: PlayerStats
}

export interface PlayerStats {
  goals: number
  assists: number
  appearances: number
  rating: number
}

export interface Match {
  matchId: string
  homeTeamId: string
  awayTeamId: string
  homeTeam: Team
  awayTeam: Team
  dateTime: string
  predictedWinner: 'home' | 'away' | 'draw'
  predictionConfidence: number
  liveStatus: 'scheduled' | 'live' | 'finished'
  momentumScore?: number
  score?: {
    home: number
    away: number
  }
  historicalDataRef?: string
}

export interface League {
  leagueId: string
  name: string
  country: string
  logo?: string
  season: string
}

export interface Content {
  contentId: string
  title: string
  url: string
  source: string
  tags: string[]
  relevantTeams: string[]
  relevantLeagues: string[]
  publishedAt: string
  summary?: string
}

export interface PredictionAnalysis {
  matchId: string
  confidence: number
  keyFactors: string[]
  playerInsights: {
    playerId: string
    name: string
    impact: 'high' | 'medium' | 'low'
    reason: string
  }[]
  historicalComparison: {
    headToHead: {
      homeWins: number
      awayWins: number
      draws: number
    }
    recentForm: {
      home: string[]
      away: string[]
    }
  }
}

export interface LiveMomentum {
  matchId: string
  currentMomentum: number // -100 to 100 (negative = away team, positive = home team)
  events: MomentumEvent[]
  lastUpdated: string
}

export interface MomentumEvent {
  minute: number
  type: 'goal' | 'card' | 'substitution' | 'corner' | 'shot'
  team: 'home' | 'away'
  player?: string
  impact: number
  description: string
}
