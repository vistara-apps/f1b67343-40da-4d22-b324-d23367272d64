import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'highlighted'
  onClick?: () => void
}

export function Card({ children, className, variant = 'default', onClick }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border shadow-card transition-all duration-200',
        variant === 'default' && 'bg-card border-border hover:border-border/80',
        variant === 'highlighted' && 'bg-primary/5 border-primary/20 hover:border-primary/30',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
