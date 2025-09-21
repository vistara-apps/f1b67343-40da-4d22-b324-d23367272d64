'use client'

import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'
import { Match } from '@/lib/types'
import { X, TrendingUp, Users, BarChart3, Clock } from 'lucide-react'
import { formatPercentage } from '@/lib/utils'

interface PredictionDetailProps {
  match: Match
  onClose: () => void
}

// Mock detailed analysis data
const mockAnalysis = {
  keyFactors: [
    'Home advantage at Old Trafford',
    'Manchester United\'s recent form improvement',
    'Key player availability',
    'Head-to-head historical performance',
  ],
  playerInsights: [
    {
      playerId: '1',
      name: 'Marcus Rashford',
      impact: 'high' as const,
      reason: 'Excellent scoring form in recent matches',
    },
    {
      playerId: '2',
      name: 'Kevin De Bruyne',
      impact: 'high' as const,
      reason: 'Creative playmaker with assist potential',
    },
  ],
  historicalComparison: {
    headToHead: {
      homeWins: 12,
      awayWins: 8,
      draws: 5,
    },
    recentForm: {
      home: ['W', 'W', 'D', 'W', 'L'],
      away: ['W', 'L', 'W', 'W', 'D'],
    },
  },
}

export function PredictionDetail({ match, onClose }: PredictionDetailProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text">Match Analysis</h2>
          <Button variant="ghost" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Match Info */}
        <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{match.homeTeam.logo}</span>
            <span className="font-semibold">{match.homeTeam.name}</span>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted">Prediction</div>
            <div className="text-lg font-bold text-primary">
              {formatPercentage(match.predictionConfidence)}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-semibold">{match.awayTeam.name}</span>
            <span className="text-2xl">{match.awayTeam.logo}</span>
          </div>
        </div>

        {/* Key Factors */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">Key Factors</h3>
          </div>
          <div className="grid gap-2">
            {mockAnalysis.keyFactors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-surface rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-text">{factor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player Insights */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">Key Players</h3>
          </div>
          <div className="grid gap-3">
            {mockAnalysis.playerInsights.map((player) => (
              <div key={player.playerId} className="p-3 bg-surface rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text">{player.name}</span>
                  <Badge variant={player.impact === 'high' ? 'success' : 'default'}>
                    {player.impact} impact
                  </Badge>
                </div>
                <p className="text-sm text-muted">{player.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Data */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">Historical Analysis</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-surface rounded-lg">
              <h4 className="font-medium text-text mb-3">Head-to-Head (Last 25)</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Home Wins</span>
                  <span className="text-sm font-medium text-green-400">
                    {mockAnalysis.historicalComparison.headToHead.homeWins}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Away Wins</span>
                  <span className="text-sm font-medium text-blue-400">
                    {mockAnalysis.historicalComparison.headToHead.awayWins}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Draws</span>
                  <span className="text-sm font-medium text-yellow-400">
                    {mockAnalysis.historicalComparison.headToHead.draws}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-lg">
              <h4 className="font-medium text-text mb-3">Recent Form</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted mb-1">{match.homeTeam.name}</div>
                  <div className="flex space-x-1">
                    {mockAnalysis.historicalComparison.recentForm.home.map((result, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          result === 'W' ? 'bg-green-500 text-white' :
                          result === 'D' ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted mb-1">{match.awayTeam.name}</div>
                  <div className="flex space-x-1">
                    {mockAnalysis.historicalComparison.recentForm.away.map((result, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          result === 'W' ? 'bg-green-500 text-white' :
                          result === 'D' ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button className="flex-1">
            <Clock className="w-4 h-4 mr-2" />
            Set Reminder
          </Button>
          <Button variant="outline" className="flex-1">
            Share Prediction
          </Button>
        </div>
      </div>
    </Card>
  )
}
