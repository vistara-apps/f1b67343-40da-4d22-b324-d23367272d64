import { cn } from '@/lib/utils'

interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  disabled = false,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        'w-full px-3 py-2 bg-surface border border-border rounded-lg text-text placeholder-muted',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
        'transition-all duration-200',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    />
  )
}
