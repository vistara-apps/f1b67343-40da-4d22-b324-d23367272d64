# FootyForecast - AI-Powered Football Predictions

A Base MiniApp for football fans to get AI-driven match insights, track live game momentum, and personalize football content.

## Features

- **AI Match Prediction**: Leverages AI to analyze team performance, player statistics, and historical data
- **Live Match Momentum**: Real-time updates on game flow and key player performance
- **Personalized Content Feed**: Tailored news, statistics, and insights based on favorite teams
- **Interactive Prediction Tools**: Compare your predictions against AI analysis

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit & OnchainKit)
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (via OpenRouter)
- **Data**: Football-Data.org API

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd footy-forecast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `FOOTBALL_DATA_API_KEY`: Your Football Data API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Base MiniApp Features

### Frame Actions
- **Cast Vote**: Vote for predicted winners directly in frames
- **Follow League/Team**: Add favorites from within frames
- **View Match Details**: Access detailed match analysis

### Notifications
- Momentum shifts in watched matches
- Upcoming match alerts for followed teams
- High-confidence prediction alerts

## API Endpoints

- `/api/frame` - Farcaster frame interactions
- `/api/og` - Dynamic Open Graph image generation
- `/api/predictions` - AI-powered match predictions

## Project Structure

```
app/
├── api/           # API routes
├── globals.css    # Global styles
├── layout.tsx     # Root layout
├── page.tsx       # Home page
└── providers.tsx  # App providers

components/
├── ui/           # Reusable UI components
├── AppShell.tsx  # Main app layout
└── DashboardView.tsx # Main dashboard

lib/
├── types.ts      # TypeScript types
├── utils.ts      # Utility functions
└── constants.ts  # App constants
```

## Subscription Tiers

- **Free**: Basic predictions, match schedules, team news
- **Basic ($1/mo)**: AI predictions, live momentum, player insights
- **Premium ($5/mo)**: Advanced analytics, custom models, priority support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
