import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'destructive' | 'success'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-primary/10 text-primary',
        variant === 'secondary' && 'bg-surface text-muted',
        variant === 'destructive' && 'bg-red-500/10 text-red-400',
        variant === 'success' && 'bg-green-500/10 text-green-400',
        className
      )}
    >
      {children}
    </span>
  )
}
