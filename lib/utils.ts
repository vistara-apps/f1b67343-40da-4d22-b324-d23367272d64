import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function getMomentumColor(momentum: number): string {
  if (momentum > 50) return 'text-green-400'
  if (momentum > 20) return 'text-blue-400'
  if (momentum > -20) return 'text-yellow-400'
  if (momentum > -50) return 'text-orange-400'
  return 'text-red-400'
}

export function getMomentumLabel(momentum: number): string {
  if (momentum > 50) return 'Strong Home'
  if (momentum > 20) return 'Home Advantage'
  if (momentum > -20) return 'Balanced'
  if (momentum > -50) return 'Away Advantage'
  return 'Strong Away'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getTeamColors(teamName: string): { primary: string; secondary: string } {
  // Simple color mapping for demo purposes
  const colorMap: Record<string, { primary: string; secondary: string }> = {
    'Manchester United': { primary: '#DA020E', secondary: '#FBE122' },
    'Manchester City': { primary: '#6CABDD', secondary: '#1C2C5B' },
    'Liverpool': { primary: '#C8102E', secondary: '#F6EB61' },
    'Arsenal': { primary: '#EF0107', secondary: '#023474' },
    'Chelsea': { primary: '#034694', secondary: '#ED1C24' },
    'Tottenham': { primary: '#132257', secondary: '#FFFFFF' },
  }
  
  return colorMap[teamName] || { primary: '#3B82F6', secondary: '#1E40AF' }
}
