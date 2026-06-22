import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  delta?: string
  deltaPositive?: boolean
  className?: string
}

export function MetricCard({ label, value, delta, deltaPositive, className }: MetricCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-4', className)}>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      {delta && (
        <p className={cn('mt-1 text-xs font-medium', deltaPositive ? 'text-success' : 'text-muted-foreground')}>
          {delta}
        </p>
      )}
    </div>
  )
}
