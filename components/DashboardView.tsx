'use client'

import { useState, useEffect } from 'react'
import { MatchCard } from './ui/MatchCard'
import { PredictionDetail } from './ui/PredictionDetail'
import { NewsFeedItem } from './ui/NewsFeedItem'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { TrendingUp, Zap, Clock, Star, RefreshCw } from 'lucide-react'
import { Match, Content } from '@/lib/types'

// Mock data for demonstration
const mockMatches: Match[] = [
  {
    matchId: '1',
    homeTeamId: 'mu',
    awayTeamId: 'mc',
    homeTeam: { teamId: 'mu', name: 'Manchester United', logo: '🔴', leagueId: 'PL' },
    awayTeam: { teamId: 'mc', name: 'Manchester City', logo: '🔵', leagueId: 'PL' },
    dateTime: new Date(Date.now() + 86400000).toISOString(),
    predictedWinner: 'home',
    predictionConfidence: 0.72,
    liveStatus: 'scheduled',
    momentumScore: 15,
  },
  {
    matchId: '2',
    homeTeamId: 'liv',
    awayTeamId: 'ars',
    homeTeam: { teamId: 'liv', name: 'Liverpool', logo: '🔴', leagueId: 'PL' },
    awayTeam: { teamId: 'ars', name: 'Arsenal', logo: '🔴', leagueId: 'PL' },
    dateTime: new Date(Date.now() + 172800000).toISOString(),
    predictedWinner: 'away',
    predictionConfidence: 0.68,
    liveStatus: 'scheduled',
    momentumScore: -8,
  },
]

const mockNews: Content[] = [
  {
    contentId: '1',
    title: 'Manchester Derby Preview: Key Players to Watch',
    url: '#',
    source: 'FootyForecast AI',
    tags: ['preview', 'manchester'],
    relevantTeams: ['mu', 'mc'],
    relevantLeagues: ['PL'],
    publishedAt: new Date().toISOString(),
    summary: 'Our AI analysis reveals the key matchups that could decide the Manchester Derby.',
  },
  {
    contentId: '2',
    title: 'Liverpool vs Arsenal: Tactical Battle Expected',
    url: '#',
    source: 'FootyForecast AI',
    tags: ['tactics', 'preview'],
    relevantTeams: ['liv', 'ars'],
    relevantLeagues: ['PL'],
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    summary: 'Two attacking philosophies clash as Liverpool host Arsenal in a crucial fixture.',
  },
]

export function DashboardView() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [activeSection, setActiveSection] = useState<'predictions' | 'live' | 'news'>('predictions')
  const [matches, setMatches] = useState<Match[]>([])
  const [news, setNews] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch matches
      const matchesResponse = await fetch('/api/matches?limit=10')
      if (matchesResponse.ok) {
        const matchesData = await matchesResponse.json()
        setMatches(matchesData)
      }

      // Fetch news
      const newsResponse = await fetch('/api/content?limit=10')
      if (newsResponse.ok) {
        const newsData = await newsResponse.json()
        setNews(newsData)
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Welcome Section */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">⚽</div>
            <div>
              <h1 className="text-2xl font-bold text-text">Welcome to FootyForecast</h1>
              <p className="text-muted">AI-powered predictions and live match insights</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshData}
            disabled={refreshing}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">72%</div>
          <div className="text-sm text-muted">Prediction Accuracy</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent">15</div>
          <div className="text-sm text-muted">Live Matches</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">8</div>
          <div className="text-sm text-muted">Winning Streak</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">24</div>
          <div className="text-sm text-muted">Leagues Covered</div>
        </Card>
      </div>

      {/* Section Tabs */}
      <div className="flex space-x-2 p-1 bg-surface rounded-lg">
        {[
          { id: 'predictions', label: 'Predictions', icon: TrendingUp },
          { id: 'live', label: 'Live Matches', icon: Zap },
          { id: 'news', label: 'News Feed', icon: Clock },
        ].map((section) => {
          const Icon = section.icon
          return (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'primary' : 'ghost'}
              onClick={() => setActiveSection(section.id as any)}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Icon className="w-4 h-4" />
              <span>{section.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Content Sections */}
      {activeSection === 'predictions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text">Upcoming Predictions</h2>
            <Button variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Premium Analysis
            </Button>
          </div>

          {loading ? (
            <Card className="p-6 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted">Loading matches...</p>
            </Card>
          ) : matches.length > 0 ? (
            <div className="grid gap-4">
              {matches.slice(0, 6).map((match) => (
                <MatchCard
                  key={match.matchId}
                  match={match}
                  variant="upcoming"
                  onClick={() => setSelectedMatch(match)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted">No upcoming matches found. Try refreshing or check back later.</p>
            </Card>
          )}
        </div>
      )}

      {activeSection === 'live' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Live Matches</h2>
          <Card className="p-6 text-center">
            <Zap className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-muted">No live matches at the moment</p>
            <p className="text-sm text-muted mt-2">Check back during match days for real-time momentum tracking</p>
          </Card>
        </div>
      )}

      {activeSection === 'news' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Personalized News Feed</h2>
          {loading ? (
            <Card className="p-6 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted">Loading news...</p>
            </Card>
          ) : news.length > 0 ? (
            <div className="space-y-4">
              {news.map((newsItem) => (
                <NewsFeedItem key={newsItem.contentId} content={newsItem} />
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted">No news available. Check back later for updates.</p>
            </Card>
          )}
        </div>
      )}

      {/* Prediction Detail Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <PredictionDetail
              match={selectedMatch}
              onClose={() => setSelectedMatch(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
