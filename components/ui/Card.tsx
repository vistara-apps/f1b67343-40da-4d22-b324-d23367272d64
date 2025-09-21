import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'highlighted'
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border shadow-card transition-all duration-200',
        variant === 'default' && 'bg-card border-border hover:border-border/80',
        variant === 'highlighted' && 'bg-primary/5 border-primary/20 hover:border-primary/30',
        className
      )}
    >
      {children}
    </div>
  )
}
