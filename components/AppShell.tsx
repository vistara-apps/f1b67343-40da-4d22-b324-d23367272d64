'use client'

import { useState } from 'react'
import { BottomNavigation } from './BottomNavigation'
import { TopBar } from './TopBar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [activeTab, setActiveTab] = useState('predictions')

  return (
    <div className="min-h-screen bg-background gradient-bg">
      <TopBar />
      <main className="pb-20 pt-16">
        {children}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
