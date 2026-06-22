import { useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { SchemaTree } from '@/components/explorer/SchemaTree'
import { MOCK_SCHEMA, MOCK_TABLES } from '@/utils/mock-data'
import { useNavigate } from 'react-router-dom'

export function ExplorerPage() {
  const [selectedTable, setSelectedTable] = useState<string | null>('employees')
  const navigate = useNavigate()
  const table = selectedTable ? MOCK_TABLES[selectedTable] : null

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader title="Database Explorer" description="Browse schemas, tables, and column metadata." />

      <div className="flex min-h-0 flex-1">
        <div className="hidden w-56 shrink-0 border-r border-border lg:block">
          <SchemaTree
            nodes={MOCK_SCHEMA}
            onSelectTable={setSelectedTable}
            onGenerateSelect={(name) => navigate('/playground', { state: { sql: `SELECT * FROM ${name};` } })}
          />
        </div>

        <div className="min-w-0 flex-1 overflow-auto p-4">
          {table ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-mono text-lg font-semibold">{table.schema}.{table.name}</h2>
                  <Badge variant="outline">{table.rowCount.toLocaleString()} rows</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate('/playground', { state: { sql: `SELECT * FROM ${table.name};` } })}>
                    <Play className="h-3.5 w-3.5" />
                    Open in Playground
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate('/designer')}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    View in Designer
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="columns">
                <TabsList>
                  <TabsTrigger value="columns">Columns</TabsTrigger>
                  <TabsTrigger value="relationships">Relationships</TabsTrigger>
                </TabsList>
                <TabsContent value="columns" className="mt-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Column definitions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table className="dense-table">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Nullable</TableHead>
                            <TableHead>Key</TableHead>
                            <TableHead>Default</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {table.columns.map((col) => (
                            <TableRow key={col.name}>
                              <TableCell className="font-medium">{col.name}</TableCell>
                              <TableCell>{col.type}</TableCell>
                              <TableCell>{col.nullable ? 'YES' : 'NO'}</TableCell>
                              <TableCell>{col.key ?? '—'}</TableCell>
                              <TableCell>{col.defaultValue ?? '—'}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="relationships" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      {table.foreignKeys?.length ? (
                        <Table className="dense-table">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Constraint</TableHead>
                              <TableHead>From</TableHead>
                              <TableHead>To</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {table.foreignKeys.map((fk) => (
                              <TableRow key={fk.name}>
                                <TableCell>{fk.name}</TableCell>
                                <TableCell className="font-mono">{fk.from}</TableCell>
                                <TableCell className="font-mono">{fk.to}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <p className="text-sm text-muted-foreground">No foreign key relationships defined.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Select a table from the explorer tree.</p>
          )}
        </div>
      </div>
    </div>
  )
}
