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

### Prerequisites

- Node.js 18+
- PostgreSQL database
- API Keys:
  - [Football-Data.org API](https://www.football-data.org/) - Free tier available
  - [OpenAI API](https://platform.openai.com/) - For AI predictions
  - [Coinbase MiniKit](https://docs.cdp.coinbase.com/minikit/) - Optional for Base integration

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd footy-forecast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Set up PostgreSQL database (local or cloud)
   # Update DATABASE_URL in .env.local
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your API keys:
   - `DATABASE_URL`: PostgreSQL connection string
   - `FOOTBALL_DATA_API_KEY`: Your Football Data API key
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXT_PUBLIC_BASE_URL`: Your app URL (http://localhost:3000 for development)

5. **Initialize the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name init

   # (Optional) Seed with initial data
   npx prisma db seed
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

The app uses Prisma ORM with PostgreSQL. The schema includes:

- **Users**: Farcaster profiles, preferences, subscriptions
- **Teams**: Football teams with league associations
- **Players**: Player data and statistics
- **Matches**: Match schedules and live data
- **Leagues**: League information
- **Predictions**: AI-generated predictions
- **Content**: News and personalized content

### API Integration

The app integrates with:

- **Football-Data.org API**: Real match data, teams, and leagues
- **OpenAI API**: AI-powered match predictions and analysis
- **Farcaster Frames**: Social sharing and frame interactions

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

### Core APIs
- `GET/POST /api/matches` - Match data and schedules
- `GET /api/teams` - Team information
- `GET /api/leagues` - League data
- `GET/POST /api/users` - User management and preferences
- `GET/POST /api/predictions` - AI-powered match predictions
- `GET/POST /api/content` - Personalized news and content
- `GET/POST /api/live-momentum` - Live match momentum tracking

### Farcaster Integration
- `GET/POST /api/frame` - Farcaster frame interactions
- `GET /api/og` - Dynamic Open Graph image generation

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
