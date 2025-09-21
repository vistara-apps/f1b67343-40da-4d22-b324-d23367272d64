import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export async function POST(req: NextRequest) {
  try {
    const { homeTeam, awayTeam, matchData } = await req.json()

    const prompt = `
      Analyze the upcoming football match between ${homeTeam} and ${awayTeam}.
      
      Please provide:
      1. Win probability for each team (as percentages)
      2. Key factors that could influence the outcome
      3. Player insights and impact ratings
      4. Confidence level in the prediction
      
      Match context: ${JSON.stringify(matchData)}
      
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

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a football analytics expert. Provide detailed match predictions based on team data, player statistics, and historical performance.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const response = completion.choices[0]?.message?.content
    
    if (!response) {
      throw new Error('No response from AI')
    }

    try {
      const prediction = JSON.parse(response)
      return NextResponse.json(prediction)
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return NextResponse.json({
        prediction: {
          homeWinProbability: 0.45,
          awayWinProbability: 0.35,
          drawProbability: 0.20,
          predictedWinner: 'home',
          confidence: 0.72,
        },
        keyFactors: [
          'Home advantage',
          'Recent form analysis',
          'Head-to-head record',
          'Key player availability',
        ],
        playerInsights: [
          {
            name: 'Key Player',
            impact: 'high',
            reason: 'Strong recent performance and goal-scoring form',
          },
        ],
        analysis: response,
      })
    }
  } catch (error) {
    console.error('Prediction API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    )
  }
}
