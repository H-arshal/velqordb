import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/shared/PageHeader'
import { SqlEditor } from '@/components/playground/SqlEditor'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { DesignerTable, SchemaColumn } from '@/types'
import { MOCK_TABLES } from '@/utils/mock-data'

const initialTables: DesignerTable[] = [
  { id: 't1', name: 'employees', x: 80, y: 80, columns: MOCK_TABLES.employees.columns },
  { id: 't2', name: 'departments', x: 380, y: 80, columns: MOCK_TABLES.departments.columns },
]

function generateSql(tables: DesignerTable[]): string {
  return tables
    .map(
      (t) =>
        `CREATE TABLE ${t.name} (\n${t.columns.map((c) => `  ${c.name} ${c.type}${c.key === 'PK' ? ' PRIMARY KEY' : ''}${!c.nullable ? ' NOT NULL' : ''}`).join(',\n')}\n);`,
    )
    .join('\n\n')
}

export function SchemaDesignerPage() {
  const [tables, setTables] = useState(initialTables)
  const [selectedId, setSelectedId] = useState<string | null>('t1')
  const selected = tables.find((t) => t.id === selectedId)

  const addTable = () => {
    const id = `t${Date.now()}`
    setTables([...tables, { id, name: 'new_table', x: 200, y: 200, columns: [{ name: 'id', type: 'INT', nullable: false, key: 'PK' }] }])
    setSelectedId(id)
  }

  const updateColumn = (index: number, field: keyof SchemaColumn, value: string | boolean) => {
    if (!selected) return
    const cols = [...selected.columns]
    cols[index] = { ...cols[index], [field]: value }
    setTables(tables.map((t) => (t.id === selected.id ? { ...t, columns: cols } : t)))
  }

  const sql = generateSql(tables)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title="Schema Designer"
        description="Visual table builder with SQL generation."
        actions={
          <>
            <Button size="sm" variant="outline" onClick={addTable}>
              <Plus className="h-3.5 w-3.5" />
              Add table
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm">Preview SQL</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-72">
                <SheetHeader>
                  <SheetTitle>Generated SQL</SheetTitle>
                </SheetHeader>
                <div className="mt-4 h-52">
                  <SqlEditor value={sql} onChange={() => {}} readOnly />
                </div>
              </SheetContent>
            </Sheet>
          </>
        }
      />

      <ResizablePanelGroup direction="horizontal" className="min-h-0 flex-1">
        <ResizablePanel defaultSize={75} minSize={50}>
          <div
            className="relative h-full overflow-auto"
            style={{
              backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              backgroundColor: '#FFFFFF',
            }}
          >
            {tables.map((table) => (
              <div
                key={table.id}
                className={`absolute w-52 cursor-pointer rounded-xl border bg-card shadow-none transition-colors duration-150 ${selectedId === table.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
                style={{ left: table.x, top: table.y }}
                onClick={() => setSelectedId(table.id)}
              >
                <div className="rounded-t-xl border-b border-border bg-panel-header px-3 py-2">
                  <span className="font-mono text-xs font-semibold">{table.name}</span>
                </div>
                <ul className="p-2">
                  {table.columns.map((col) => (
                    <li key={col.name} className="flex justify-between px-1 py-0.5 font-mono text-[11px]">
                      <span>{col.name}</span>
                      <span className="text-muted-foreground">{col.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full overflow-auto border-l border-border p-4">
            {selected ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Table name</Label>
                  <Input
                    value={selected.name}
                    onChange={(e) =>
                      setTables(tables.map((t) => (t.id === selected.id ? { ...t, name: e.target.value } : t)))
                    }
                    className="font-mono text-xs"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Columns</Label>
                  {selected.columns.map((col, i) => (
                    <div key={i} className="mb-3 space-y-2 rounded-lg border border-border p-2">
                      <Input value={col.name} onChange={(e) => updateColumn(i, 'name', e.target.value)} className="h-7 text-xs" />
                      <Input value={col.type} onChange={(e) => updateColumn(i, 'type', e.target.value)} className="h-7 text-xs" />
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setTables(tables.filter((t) => t.id !== selected.id))
                    setSelectedId(null)
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove table
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a table to edit properties.</p>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
