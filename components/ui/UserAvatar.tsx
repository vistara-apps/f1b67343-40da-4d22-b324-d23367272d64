'use client'

import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  user?: {
    displayName?: string
    pfpUrl?: string
    username?: string
  }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'withStatus'
  className?: string
}

export function UserAvatar({ 
  user, 
  size = 'md', 
  variant = 'default',
  className 
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'rounded-full bg-surface border-2 border-border flex items-center justify-center overflow-hidden',
          sizeClasses[size]
        )}
      >
        {user?.pfpUrl ? (
          <img
            src={user.pfpUrl}
            alt={user.displayName || user.username || 'User'}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-1/2 h-1/2 text-muted" />
        )}
      </div>
      
      {variant === 'withStatus' && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background"></div>
      )}
    </div>
  )
}
