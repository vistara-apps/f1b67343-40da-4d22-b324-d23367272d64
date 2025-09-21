import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FootyForecast - Predict, Analyze, Dominate',
  description: 'AI-driven football match insights, live game momentum tracking, and personalized football content.',
  openGraph: {
    title: 'FootyForecast',
    description: 'Predict, Analyze, and Dominate Your Football Predictions',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`,
    'fc:frame:button:1': 'View Predictions',
    'fc:frame:button:2': 'Live Matches',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
