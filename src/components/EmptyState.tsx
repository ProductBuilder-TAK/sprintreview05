import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  variant?: 'default' | 'error' | 'warning'
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
}: EmptyStateProps) {
  return (
    <div className={cn('empty-state', variant === 'error' && 'empty-state--error')}>
      <div className="empty-state__icon">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {actionLabel && onAction && (
        <div className="empty-state__action">
          <button className="btn--editorial" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  )
}
