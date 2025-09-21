'use client'

import { Card } from './Card'
import { Badge } from './Badge'
import { Content } from '@/lib/types'
import { ExternalLink, Clock } from 'lucide-react'
import { formatDate, truncateText } from '@/lib/utils'

interface NewsFeedItemProps {
  content: Content
}

export function NewsFeedItem({ content }: NewsFeedItemProps) {
  return (
    <Card className="p-4 hover:border-primary/30 transition-colors duration-200">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-text leading-tight flex-1 mr-3">
            {content.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-muted flex-shrink-0" />
        </div>

        {/* Summary */}
        {content.summary && (
          <p className="text-sm text-muted leading-relaxed">
            {truncateText(content.summary, 150)}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {content.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3" />
            <span>{formatDate(content.publishedAt)}</span>
          </div>
          <span className="font-medium">{content.source}</span>
        </div>
      </div>
    </Card>
  )
}
