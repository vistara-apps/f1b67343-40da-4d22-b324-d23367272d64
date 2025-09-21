import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50',
        // Variants
        variant === 'primary' && 'bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl',
        variant === 'secondary' && 'bg-surface text-text hover:bg-surface/80 border border-border',
        variant === 'destructive' && 'bg-red-600 text-white hover:bg-red-700',
        variant === 'ghost' && 'text-text hover:bg-surface/50',
        variant === 'outline' && 'border border-border text-text hover:bg-surface/50',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed hover:bg-current',
        className
      )}
    >
      {children}
    </button>
  )
}
