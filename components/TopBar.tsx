'use client'

import { useMiniKit } from '@coinbase/minikit'
import { UserAvatar } from './ui/UserAvatar'
import { Bell, Search } from 'lucide-react'

export function TopBar() {
  const { context } = useMiniKit()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ⚽ FootyForecast
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg hover:bg-surface transition-colors duration-200">
            <Search className="w-5 h-5 text-muted" />
          </button>
          <button className="p-2 rounded-lg hover:bg-surface transition-colors duration-200 relative">
            <Bell className="w-5 h-5 text-muted" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
          </button>
          <UserAvatar 
            user={context?.user}
            size="sm"
          />
        </div>
      </div>
    </header>
  )
}
