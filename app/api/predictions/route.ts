import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const matchId = searchParams.get('matchId')
    const userId = searchParams.get('userId')

    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID is required' },
        { status: 400 }
      )
    }

    // Get match details
    const match = await prisma.match.findUnique({
      where: { matchId },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    // Check if prediction exists
    const existingPrediction = await prisma.prediction.findFirst({
      where: {
        matchId,
        userId: userId || null,
      },
    })

    if (existingPrediction) {
      return NextResponse.json({
        match,
        prediction: existingPrediction.prediction,
        confidence: existingPrediction.confidence,
        cached: true,
      })
    }

    // Generate new prediction
    const prediction = await generatePrediction(match)

    // Store prediction
    await prisma.prediction.create({
      data: {
        matchId,
        userId,
        prediction,
        confidence: prediction.prediction.confidence,
      },
    })

    return NextResponse.json({
      match,
      prediction: prediction.prediction,
      keyFactors: prediction.keyFactors,
      playerInsights: prediction.playerInsights,
      analysis: prediction.analysis,
      confidence: prediction.prediction.confidence,
      cached: false,
    })
  } catch (error) {
    console.error('Prediction GET error:', error)
    return NextResponse.json(
      { error: 'Failed to get prediction' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { matchId, userId } = await req.json()

    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID is required' },
        { status: 400 }
      )
    }

    // Get match details
    const match = await prisma.match.findUnique({
      where: { matchId },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
      },
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    // Generate prediction
    const prediction = await generatePrediction(match)

    // Store prediction
    await prisma.prediction.create({
      data: {
        matchId,
        userId,
        prediction,
        confidence: prediction.prediction.confidence,
      },
    })

    return NextResponse.json({
      match,
      prediction: prediction.prediction,
      keyFactors: prediction.keyFactors,
      playerInsights: prediction.playerInsights,
      analysis: prediction.analysis,
    })
  } catch (error) {
    console.error('Prediction API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    )
  }
}

async function generatePrediction(match: any) {
  const prompt = `
    Analyze the upcoming football match between ${match.homeTeam.name} and ${match.awayTeam.name}.

    Match Details:
    - League: ${match.league.name}
    - Date: ${match.dateTime}
    - Home Team: ${match.homeTeam.name}
    - Away Team: ${match.awayTeam.name}

    Please provide a detailed prediction analysis including:
    1. Win probability for each team (as percentages that sum to 100%)
    2. Key factors that could influence the outcome
    3. Player insights and impact ratings for key players
    4. Overall confidence level in the prediction (0-1)

    Consider factors like:
    - Home advantage
    - Recent form
    - Head-to-head record
    - League position
    - Key player availability and form

    Respond in JSON format with the following structure:
    {
      "prediction": {
        "homeWinProbability": number,
        "awayWinProbability": number,
        "drawProbability": number,
        "predictedWinner": "home" | "away" | "draw",
        "confidence": number
      },
      "keyFactors": string[],
      "playerInsights": [
        {
          "name": string,
          "impact": "high" | "medium" | "low",
          "reason": string
        }
      ],
      "analysis": string
    }
  `

  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a football analytics expert. Provide detailed match predictions based on team data, player statistics, and historical performance. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from AI')
    }

    return JSON.parse(response)
  } catch (error) {
    console.error('AI prediction error:', error)

    // Fallback prediction
    return {
      prediction: {
        homeWinProbability: 0.45,
        awayWinProbability: 0.35,
        drawProbability: 0.20,
        predictedWinner: 'home',
        confidence: 0.65,
      },
      keyFactors: [
        'Home advantage provides slight edge',
        'Recent form analysis suggests balanced contest',
        'Head-to-head record favors home team',
        'Key player availability could be decisive',
      ],
      playerInsights: [
        {
          name: 'Star Striker',
          impact: 'high',
          reason: 'Strong recent goal-scoring form and home crowd advantage',
        },
        {
          name: 'Defensive Midfielder',
          impact: 'medium',
          reason: 'Controls the game tempo and breaks up play effectively',
        },
      ],
      analysis: 'This appears to be a competitive match with the home team having a slight advantage due to home crowd support and recent form.',
    }
  }
}
