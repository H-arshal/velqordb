import { Badge } from '@/components/ui/badge'
import { useAppSelector } from '@/hooks/useAppStore'
import { formatDuration } from '@/lib/utils'

export function StatusBar() {
  const result = useAppSelector((s) => s.query.result)
  const error = useAppSelector((s) => s.query.error)
  const isRunning = useAppSelector((s) => s.query.isRunning)

  return (
    <footer className="flex h-7 shrink-0 items-center gap-4 border-t border-border bg-panel-header px-3 font-mono text-xs text-muted-foreground">
      <span>Ln 1, Col 1</span>
      <span className="hidden sm:inline">|</span>
      {isRunning ? (
        <span>Running…</span>
      ) : error ? (
        <span className="text-destructive">Error</span>
      ) : result ? (
        <>
          <span>{formatDuration(result.executionTimeMs)}</span>
          <span>{result.rowCount} rows</span>
        </>
      ) : (
        <span>Ready</span>
      )}
      <div className="ml-auto">
        <Badge variant="outline" className="h-5 px-2 text-[10px] font-normal">
          Sandbox
        </Badge>
      </div>
    </footer>
  )
}
