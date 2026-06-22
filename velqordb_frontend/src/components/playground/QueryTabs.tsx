import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { addTab, closeTab, setActiveTab } from '@/store/querySlice'

export function QueryTabs() {
  const dispatch = useAppDispatch()
  const tabs = useAppSelector((s) => s.query.tabs)
  const activeTabId = useAppSelector((s) => s.query.activeTabId)

  return (
    <div className="flex h-9 shrink-0 items-end gap-0.5 overflow-x-auto border-b border-border bg-panel-header px-2">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={cn(
            'group flex h-8 max-w-[160px] items-center gap-1 rounded-t-lg border border-b-0 px-2.5 text-xs',
            tab.id === activeTabId
              ? 'border-border bg-background text-foreground'
              : 'border-transparent bg-transparent text-muted-foreground hover:bg-muted/50',
          )}
        >
          <button type="button" className="flex min-w-0 flex-1 items-center gap-1 truncate" onClick={() => dispatch(setActiveTab(tab.id))}>
            {tab.dirty && <span className="text-primary">●</span>}
            <span className="truncate">{tab.title}</span>
          </button>
          {tabs.length > 1 && (
            <button
              type="button"
              className="opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                dispatch(closeTab(tab.id))
              }}
              aria-label={`Close ${tab.title}`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      ))}
      <Button variant="ghost" size="icon" className="mb-0.5 h-7 w-7 shrink-0" onClick={() => dispatch(addTab())} aria-label="New query tab">
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
