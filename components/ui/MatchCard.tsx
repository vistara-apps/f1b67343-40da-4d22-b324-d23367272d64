'use client'

import { Card } from './Card'
import { Badge } from './Badge'
import { formatDate, formatPercentage, getMomentumColor, getMomentumLabel } from '@/lib/utils'
import { Match } from '@/lib/types'
import { Clock, TrendingUp, Zap } from 'lucide-react'

interface MatchCardProps {
  match: Match
  variant?: 'upcoming' | 'live' | 'completed'
  onClick?: () => void
}

export function MatchCard({ match, variant = 'upcoming', onClick }: MatchCardProps) {
  const isLive = match.liveStatus === 'live'
  const isCompleted = match.liveStatus === 'finished'

  return (
    <Card 
      className="p-4 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Match Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isLive && (
              <Badge variant="destructive" className="animate-pulse">
                <Zap className="w-3 h-3 mr-1" />
                LIVE
              </Badge>
            )}
            {variant === 'upcoming' && (
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(match.dateTime)}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {formatPercentage(match.predictionConfidence)}
            </span>
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="text-2xl">{match.homeTeam.logo}</div>
            <div>
              <div className="font-semibold text-text">{match.homeTeam.name}</div>
              {match.score && (
                <div className="text-2xl font-bold text-primary">{match.score.home}</div>
              )}
            </div>
          </div>

          <div className="px-4 text-center">
            <div className="text-sm text-muted">VS</div>
            {match.predictedWinner && !isCompleted && (
              <div className="text-xs text-primary font-medium mt-1">
                {match.predictedWinner === 'home' ? 'H' : match.predictedWinner === 'away' ? 'A' : 'D'}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 flex-1 justify-end">
            <div className="text-right">
              <div className="font-semibold text-text">{match.awayTeam.name}</div>
              {match.score && (
                <div className="text-2xl font-bold text-primary">{match.score.away}</div>
              )}
            </div>
            <div className="text-2xl">{match.awayTeam.logo}</div>
          </div>
        </div>

        {/* Momentum Bar */}
        {match.momentumScore !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">Momentum</span>
              <span className={getMomentumColor(match.momentumScore)}>
                {getMomentumLabel(match.momentumScore)}
              </span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className="momentum-bar h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.abs(match.momentumScore)}%`,
                  marginLeft: match.momentumScore < 0 ? `${100 - Math.abs(match.momentumScore)}%` : '0',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
