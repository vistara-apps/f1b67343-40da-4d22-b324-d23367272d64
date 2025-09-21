import { League, Team, Match, Player } from '@/lib/types'

const FOOTBALL_DATA_API_KEY = process.env.FOOTBALL_DATA_API_KEY
const BASE_URL = 'https://api.football-data.org/v4'

interface FootballDataCompetition {
  id: number
  name: string
  code: string
  emblem?: string
  area: {
    name: string
  }
}

interface FootballDataTeam {
  id: number
  name: string
  shortName?: string
  tla?: string
  crest?: string
  address?: string
  website?: string
  founded?: number
  clubColors?: string
  venue?: string
}

interface FootballDataMatch {
  id: number
  utcDate: string
  status: string
  matchday?: number
  stage?: string
  group?: string
  lastUpdated: string
  homeTeam: {
    id: number
    name: string
    shortName?: string
    tla?: string
    crest?: string
  }
  awayTeam: {
    id: number
    name: string
    shortName?: string
    tla?: string
    crest?: string
  }
  score: {
    home?: number
    away?: number
    halfTime?: {
      home?: number
      away?: number
    }
    fullTime?: {
      home?: number
      away?: number
    }
  }
}

interface FootballDataPlayer {
  id: number
  name: string
  position: string
  dateOfBirth?: string
  nationality?: string
}

class FootballDataAPI {
  private async fetchWithAuth(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'X-Auth-Token': FOOTBALL_DATA_API_KEY || '',
      },
    })

    if (!response.ok) {
      throw new Error(`Football Data API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getCompetitions(): Promise<League[]> {
    const data = await this.fetchWithAuth('/competitions')

    return data.competitions.map((comp: FootballDataCompetition) => ({
      leagueId: comp.code,
      name: comp.name,
      country: comp.area.name,
      logo: comp.emblem,
      season: '2024-25',
    }))
  }

  async getTeams(leagueCode: string): Promise<Team[]> {
    const data = await this.fetchWithAuth(`/competitions/${leagueCode}/teams`)

    return data.teams.map((team: FootballDataTeam) => ({
      teamId: team.id.toString(),
      name: team.name,
      logo: team.crest,
      leagueId: leagueCode,
      shortName: team.shortName || team.tla,
      colors: team.clubColors ? {
        primary: team.clubColors.split(' / ')[0],
        secondary: team.clubColors.split(' / ')[1] || team.clubColors.split(' / ')[0],
      } : undefined,
    }))
  }

  async getMatches(leagueCode: string, limit: number = 20): Promise<Match[]> {
    const data = await this.fetchWithAuth(`/competitions/${leagueCode}/matches`)

    return data.matches.slice(0, limit).map((match: FootballDataMatch) => ({
      matchId: match.id.toString(),
      homeTeamId: match.homeTeam.id.toString(),
      awayTeamId: match.awayTeam.id.toString(),
      homeTeam: {
        teamId: match.homeTeam.id.toString(),
        name: match.homeTeam.name,
        logo: match.homeTeam.crest,
        leagueId: leagueCode,
        shortName: match.homeTeam.shortName,
      },
      awayTeam: {
        teamId: match.awayTeam.id.toString(),
        name: match.awayTeam.name,
        logo: match.awayTeam.crest,
        leagueId: leagueCode,
        shortName: match.awayTeam.shortName,
      },
      dateTime: new Date(match.utcDate),
      liveStatus: this.mapMatchStatus(match.status),
      score: match.score.fullTime ? {
        home: match.score.fullTime.home || 0,
        away: match.score.fullTime.away || 0,
      } : undefined,
      leagueId: leagueCode,
    }))
  }

  async getTeamPlayers(teamId: string): Promise<Player[]> {
    const data = await this.fetchWithAuth(`/teams/${teamId}`)

    return data.squad?.map((player: FootballDataPlayer) => ({
      playerId: player.id.toString(),
      name: player.name,
      teamId: teamId,
      position: player.position,
      stats: {
        appearances: 0,
        goals: 0,
        assists: 0,
        rating: 0,
      },
    })) || []
  }

  private mapMatchStatus(status: string): string {
    switch (status) {
      case 'SCHEDULED':
        return 'scheduled'
      case 'LIVE':
      case 'IN_PLAY':
      case 'PAUSED':
        return 'live'
      case 'FINISHED':
      case 'COMPLETED':
        return 'finished'
      default:
        return 'scheduled'
    }
  }
}

export const footballAPI = new FootballDataAPI()

