import { Fragment, useMemo, useState } from 'react'
import { History, Play, Share2, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { MOCK_HISTORY } from '@/utils/mock-data'
import { formatDuration, truncate } from '@/lib/utils'

export function HistoryPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return MOCK_HISTORY.filter((item) => {
      const matchesSearch = item.query.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader title="Query History" description="Search, re-run, and manage executed queries." />

      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <Input placeholder="Search queries…" value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 max-w-xs" />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-8 w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <EmptyState
            icon={History}
            title="No queries yet"
            description="Run your first query in the Playground."
            actionLabel="Open Playground"
            onAction={() => navigate('/playground')}
          />
        ) : (
          <Table className="dense-table">
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Query</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Rows</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <Fragment key={item.id}>
                  <TableRow className="cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                    <TableCell className="whitespace-nowrap font-sans text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-md">{truncate(item.query, 80)}</TableCell>
                    <TableCell>{formatDuration(item.durationMs)}</TableCell>
                    <TableCell>{item.rowCount}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'success' ? 'success' : 'destructive'}>{item.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate('/playground', { state: { sql: item.query } })
                          }}
                        >
                          <Play className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <Star className={`h-3.5 w-3.5 ${item.favorite ? 'fill-warning text-warning' : ''}`} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === item.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-muted/30 p-4">
                        <pre className="overflow-x-auto font-mono text-xs">{item.query}</pre>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
