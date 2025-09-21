import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create some sample leagues
  const premierLeague = await prisma.league.upsert({
    where: { leagueId: 'PL' },
    update: {},
    create: {
      leagueId: 'PL',
      name: 'Premier League',
      country: 'England',
      logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    },
  })

  const laLiga = await prisma.league.upsert({
    where: { leagueId: 'PD' },
    update: {},
    create: {
      leagueId: 'PD',
      name: 'La Liga',
      country: 'Spain',
      logo: '🇪🇸',
    },
  })

  // Create some sample teams
  const manchesterUnited = await prisma.team.upsert({
    where: { teamId: '66' },
    update: {},
    create: {
      teamId: '66',
      name: 'Manchester United FC',
      logo: '🔴',
      leagueId: 'PL',
      shortName: 'MUN',
    },
  })

  const manchesterCity = await prisma.team.upsert({
    where: { teamId: '65' },
    update: {},
    create: {
      teamId: '65',
      name: 'Manchester City FC',
      logo: '🔵',
      leagueId: 'PL',
      shortName: 'MCI',
    },
  })

  const liverpool = await prisma.team.upsert({
    where: { teamId: '64' },
    update: {},
    create: {
      teamId: '64',
      name: 'Liverpool FC',
      logo: '🔴',
      leagueId: 'PL',
      shortName: 'LIV',
    },
  })

  const arsenal = await prisma.team.upsert({
    where: { teamId: '57' },
    update: {},
    create: {
      teamId: '57',
      name: 'Arsenal FC',
      logo: '🔴',
      leagueId: 'PL',
      shortName: 'ARS',
    },
  })

  // Create sample content
  await prisma.content.upsert({
    where: { contentId: 'sample-1' },
    update: {},
    create: {
      contentId: 'sample-1',
      title: 'Premier League Season Preview: Title Race Predictions',
      url: '#',
      source: 'FootyForecast AI',
      tags: ['preview', 'season', 'predictions'],
      relevantTeams: ['66', '65', '64', '57'],
      relevantLeagues: ['PL'],
      summary: 'Our AI analyzes the upcoming Premier League season, predicting the top contenders for the title and key factors that could influence the outcome.',
      publishedAt: new Date(),
    },
  })

  await prisma.content.upsert({
    where: { contentId: 'sample-2' },
    update: {},
    create: {
      contentId: 'sample-2',
      title: 'Transfer Window Impact: How Summer Moves Could Change the League',
      url: '#',
      source: 'FootyForecast AI',
      tags: ['transfers', 'analysis'],
      relevantTeams: ['66', '65'],
      relevantLeagues: ['PL'],
      summary: 'Examining the key transfers this summer and their potential impact on team performances throughout the season.',
      publishedAt: new Date(Date.now() - 86400000), // 1 day ago
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

