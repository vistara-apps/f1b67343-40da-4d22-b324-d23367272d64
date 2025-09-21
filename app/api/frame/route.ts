import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Handle frame interactions
    const { untrustedData } = body
    const buttonIndex = untrustedData?.buttonIndex

    let responseHtml = ''
    
    switch (buttonIndex) {
      case 1: // View Predictions
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og?view=predictions" />
              <meta property="fc:frame:button:1" content="Live Matches" />
              <meta property="fc:frame:button:2" content="News Feed" />
              <meta property="fc:frame:button:3" content="Open App" />
              <meta property="fc:frame:button:3:action" content="link" />
              <meta property="fc:frame:button:3:target" content="${process.env.NEXT_PUBLIC_BASE_URL}" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
            </head>
            <body>
              <h1>FootyForecast - Predictions</h1>
            </body>
          </html>
        `
        break
        
      case 2: // Live Matches
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og?view=live" />
              <meta property="fc:frame:button:1" content="View Predictions" />
              <meta property="fc:frame:button:2" content="News Feed" />
              <meta property="fc:frame:button:3" content="Open App" />
              <meta property="fc:frame:button:3:action" content="link" />
              <meta property="fc:frame:button:3:target" content="${process.env.NEXT_PUBLIC_BASE_URL}" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
            </head>
            <body>
              <h1>FootyForecast - Live Matches</h1>
            </body>
          </html>
        `
        break
        
      default:
        responseHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og" />
              <meta property="fc:frame:button:1" content="View Predictions" />
              <meta property="fc:frame:button:2" content="Live Matches" />
              <meta property="fc:frame:button:3" content="Open App" />
              <meta property="fc:frame:button:3:action" content="link" />
              <meta property="fc:frame:button:3:target" content="${process.env.NEXT_PUBLIC_BASE_URL}" />
              <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
            </head>
            <body>
              <h1>FootyForecast</h1>
            </body>
          </html>
        `
    }

    return new NextResponse(responseHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Frame API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/og" />
        <meta property="fc:frame:button:1" content="View Predictions" />
        <meta property="fc:frame:button:2" content="Live Matches" />
        <meta property="fc:frame:button:3" content="Open App" />
        <meta property="fc:frame:button:3:action" content="link" />
        <meta property="fc:frame:button:3:target" content="${process.env.NEXT_PUBLIC_BASE_URL}" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL}/api/frame" />
        <title>FootyForecast</title>
      </head>
      <body>
        <h1>FootyForecast - AI Football Predictions</h1>
        <p>Predict, Analyze, and Dominate Your Football Predictions</p>
      </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
