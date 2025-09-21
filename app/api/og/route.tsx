import { NextRequest, NextResponse } from 'next/server'
import { ImageResponse } from 'next/og'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const view = searchParams.get('view') || 'default'

    let title = 'FootyForecast'
    let subtitle = 'AI-Powered Football Predictions'
    let emoji = '⚽'

    switch (view) {
      case 'predictions':
        title = 'Match Predictions'
        subtitle = 'AI-driven insights for upcoming matches'
        emoji = '🔮'
        break
      case 'live':
        title = 'Live Matches'
        subtitle = 'Real-time momentum tracking'
        emoji = '⚡'
        break
      case 'news':
        title = 'Football News'
        subtitle = 'Personalized content feed'
        emoji = '📰'
        break
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #dc2626 100%)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '20px',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>
              {emoji}
            </div>
            <div
              style={{
                color: 'white',
                fontSize: '48px',
                fontWeight: 'bold',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: '#94a3b8',
                fontSize: '24px',
                textAlign: 'center',
                maxWidth: '600px',
              }}
            >
              {subtitle}
            </div>
            {view === 'predictions' && (
              <div
                style={{
                  display: 'flex',
                  marginTop: '30px',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    padding: '15px 25px',
                    borderRadius: '10px',
                    color: '#60a5fa',
                    fontSize: '18px',
                  }}
                >
                  72% Accuracy
                </div>
                <div
                  style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    padding: '15px 25px',
                    borderRadius: '10px',
                    color: '#4ade80',
                    fontSize: '18px',
                  }}
                >
                  15 Live Matches
                </div>
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('OG Image generation error:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}
