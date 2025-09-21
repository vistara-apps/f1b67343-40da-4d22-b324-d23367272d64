'use client'

import { useState, useEffect } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { Badge } from './Badge'
import { Match } from '@/lib/types'
import { X, TrendingUp, Users, BarChart3, Clock, Loader2 } from 'lucide-react'
import { formatPercentage } from '@/lib/utils'

interface PredictionDetailProps {
  match: Match
  onClose: () => void
}

interface PredictionData {
  prediction: {
    homeWinProbability: number
    awayWinProbability: number
    drawProbability: number
    predictedWinner: string
    confidence: number
  }
  keyFactors: string[]
  playerInsights: Array<{
    name: string
    impact: 'high' | 'medium' | 'low'
    reason: string
  }>
  analysis: string
}

export function PredictionDetail({ match, onClose }: PredictionDetailProps) {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPrediction()
  }, [match.matchId])

  const fetchPrediction = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/predictions?matchId=${match.matchId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch prediction')
      }

      const data = await response.json()
      setPredictionData(data)
    } catch (err) {
      console.error('Prediction fetch error:', err)
      setError('Failed to load prediction data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <div className="p-6 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted">Generating AI prediction...</p>
        </div>
      </Card>
    )
  }

  if (error || !predictionData) {
    return (
      <Card className="max-w-2xl mx-auto">
        <div className="p-6 text-center">
          <p className="text-red-400 mb-4">{error || 'No prediction data available'}</p>
          <Button onClick={fetchPrediction} variant="outline">
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

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
            <span className="text-2xl">{match.homeTeam.logo || '🏆'}</span>
            <div>
              <div className="font-semibold">{match.homeTeam.name}</div>
              <div className="text-xs text-muted">
                {formatPercentage(predictionData.prediction.homeWinProbability)} win
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted">AI Prediction</div>
            <div className="text-lg font-bold text-primary">
              {formatPercentage(predictionData.prediction.confidence)}
            </div>
            <div className="text-xs text-muted">
              {predictionData.prediction.predictedWinner === 'home' ? match.homeTeam.name :
               predictionData.prediction.predictedWinner === 'away' ? match.awayTeam.name : 'Draw'}
            </div>
          </div>
          <div className="flex items-center space-x-3 text-right">
            <div>
              <div className="font-semibold">{match.awayTeam.name}</div>
              <div className="text-xs text-muted">
                {formatPercentage(predictionData.prediction.awayWinProbability)} win
              </div>
            </div>
            <span className="text-2xl">{match.awayTeam.logo || '🏆'}</span>
          </div>
        </div>

        {/* Key Factors */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">Key Factors</h3>
          </div>
          <div className="grid gap-2">
            {predictionData.keyFactors.map((factor, index) => (
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
            {predictionData.playerInsights.map((player, index) => (
              <div key={index} className="p-3 bg-surface rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text">{player.name}</span>
                  <Badge variant={player.impact === 'high' ? 'success' : player.impact === 'medium' ? 'warning' : 'default'}>
                    {player.impact} impact
                  </Badge>
                </div>
                <p className="text-sm text-muted">{player.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-text">AI Analysis</h3>
          </div>
          <div className="p-4 bg-surface rounded-lg">
            <p className="text-sm text-text leading-relaxed">{predictionData.analysis}</p>
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
