import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { QueryResult } from '@/types'

interface ResultTableProps {
  result: QueryResult
  pageSize?: number
}

export function ResultTable({ result, pageSize = 100 }: ResultTableProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(result.rows.length / pageSize))
  const pageRows = useMemo(
    () => result.rows.slice(page * pageSize, (page + 1) * pageSize),
    [result.rows, page, pageSize],
  )
  const start = page * pageSize + 1
  const end = Math.min((page + 1) * pageSize, result.rows.length)

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        <Table className="dense-table">
          <TableHeader>
            <TableRow>
              {result.columns.map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((row, i) => (
              <TableRow key={i}>
                {result.columns.map((col) => (
                  <TableCell key={col}>{String(row[col] ?? '')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <div className="flex h-9 shrink-0 items-center justify-between border-t border-border bg-panel-header px-3 text-xs text-muted-foreground">
        <span>
          Showing {start}–{end} of {result.rowCount.toLocaleString()}
        </span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
