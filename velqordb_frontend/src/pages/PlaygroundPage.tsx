import { useCallback, useEffect } from 'react'
import { Copy, Download, Eraser, History, Play, Wand2 } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { SqlEditor } from '@/components/playground/SqlEditor'
import { ResultTable } from '@/components/playground/ResultTable'
import { QueryTabs } from '@/components/playground/QueryTabs'
import { StatusBar } from '@/components/layout/StatusBar'
import { KeyboardHint } from '@/components/shared/KeyboardHint'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { setError, setResult, setRunning, setResultView, setSql } from '@/store/querySlice'
import { executeQuery, formatSql } from '@/services/queryService'

export function PlaygroundPage() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const tabs = useAppSelector((s) => s.query.tabs)
  const activeTabId = useAppSelector((s) => s.query.activeTabId)
  const result = useAppSelector((s) => s.query.result)
  const error = useAppSelector((s) => s.query.error)
  const isRunning = useAppSelector((s) => s.query.isRunning)
  const resultView = useAppSelector((s) => s.query.resultView)

  const activeTab = tabs.find((t) => t.id === activeTabId)
  const sql = activeTab?.sql ?? ''

  useEffect(() => {
    const state = location.state as { sql?: string } | null
    if (state?.sql) {
      dispatch(setSql(state.sql))
      window.history.replaceState({}, document.title)
    }
  }, [location.state, dispatch])

  const handleRun = useCallback(async () => {
    dispatch(setRunning(true))
    const { result: res, error: err } = await executeQuery(sql)
    if (err) dispatch(setError(err))
    else dispatch(setResult(res ?? null))
    dispatch(setRunning(false))
  }, [dispatch, sql])

  const handleFormat = () => {
    dispatch(setSql(formatSql(sql)))
    toast.success('Query formatted')
  }

  const handleClear = () => dispatch(setSql(''))

  const handleExportCsv = () => {
    if (!result) return
    const header = result.columns.join(',')
    const rows = result.rows.map((r) => result.columns.map((c) => r[c]).join(','))
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'results.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(JSON.stringify(result.rows, null, 2))
    toast.success('Copied to clipboard')
  }

  const panelTab = error ? 'messages' : resultView

  return (
    <div className="flex h-full flex-col">
      <QueryTabs />

      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border bg-panel-header px-3">
        <Button size="sm" onClick={handleRun} disabled={isRunning}>
          <Play className="h-3.5 w-3.5" />
          Run
        </Button>
        <Button size="sm" variant="outline" onClick={handleFormat}>
          <Wand2 className="h-3.5 w-3.5" />
          Format
        </Button>
        <Button size="sm" variant="outline" onClick={handleClear}>
          <Eraser className="h-3.5 w-3.5" />
          Clear
        </Button>
        <div className="mx-2 h-4 w-px bg-border" />
        <KeyboardHint keys={['Ctrl', 'Enter']} label="Run" />
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <History className="h-3.5 w-3.5" />
            History
          </Button>
          {result && (
            <>
              <Button size="sm" variant="outline" onClick={handleExportCsv}>
                <Download className="h-3.5 w-3.5" />
                CSV
              </Button>
              <Button size="sm" variant="outline" onClick={handleCopy}>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </>
          )}
        </div>
      </div>

      <ResizablePanelGroup direction="vertical" className="min-h-0 flex-1">
        <ResizablePanel defaultSize={55} minSize={30}>
          <SqlEditor value={sql} onChange={(v) => dispatch(setSql(v))} onRun={handleRun} onFormat={handleFormat} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45} minSize={25}>
          <div className="flex h-full flex-col border-t border-border">
            <Tabs
              value={panelTab}
              onValueChange={(v) => {
                if (v === 'messages') return
                dispatch(setResultView(v as 'table' | 'json'))
              }}
              className="flex h-full flex-col"
            >
              <div className="flex h-9 shrink-0 items-center border-b border-border px-3">
                <TabsList className="h-7">
                  <TabsTrigger value="table" className="text-xs">
                    Results
                  </TabsTrigger>
                  <TabsTrigger value="json" className="text-xs">
                    JSON
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="text-xs">
                    Messages
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="table" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
                {result ? (
                  <ResultTable result={result} />
                ) : (
                  <p className="p-4 text-sm text-muted-foreground">Run a query to see results.</p>
                )}
              </TabsContent>

              <TabsContent value="json" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
                <ScrollArea className="h-full">
                  <pre className="p-4 font-mono text-xs">{result ? JSON.stringify(result.rows, null, 2) : '[]'}</pre>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="messages" className="mt-0 min-h-0 flex-1 data-[state=inactive]:hidden">
                {error ? (
                  <Alert variant="destructive" className="m-3">
                    <AlertTitle>Query error{error.line ? ` at line ${error.line}` : ''}</AlertTitle>
                    <AlertDescription className="font-mono text-xs">{error.message}</AlertDescription>
                  </Alert>
                ) : (
                  <p className="p-4 text-sm text-muted-foreground">No messages.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <StatusBar />
    </div>
  )
}
