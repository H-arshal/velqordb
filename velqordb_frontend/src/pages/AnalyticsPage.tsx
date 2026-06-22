import { useState } from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageHeader } from '@/components/shared/PageHeader'
import { MetricCard } from '@/components/analytics/MetricCard'
import { MOCK_ANALYTICS, MOCK_DAILY_EXECUTIONS, MOCK_HISTORY } from '@/utils/mock-data'
import { formatDuration, truncate } from '@/lib/utils'

export function AnalyticsPage() {
  const [range, setRange] = useState('7d')

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader
        title="Query Analytics"
        description="Execution metrics and performance insights."
        actions={
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="h-8 w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Queries" value={MOCK_ANALYTICS.totalQueries.toLocaleString()} delta="+12% vs last period" deltaPositive />
        <MetricCard label="Avg Duration" value={formatDuration(MOCK_ANALYTICS.avgDurationMs)} delta="-8ms vs last period" deltaPositive />
        <MetricCard label="Slow Queries" value={MOCK_ANALYTICS.slowQueries} delta="> 500ms threshold" />
        <MetricCard label="Success Rate" value={`${MOCK_ANALYTICS.successRate}%`} delta="+1.2%" deltaPositive />
      </div>

      <div className="px-4 pb-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Daily executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_DAILY_EXECUTIONS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 12 }} />
                  <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 px-4 pb-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Top queries</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="dense-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Query</TableHead>
                  <TableHead>Runs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_HISTORY.slice(0, 3).map((q, i) => (
                  <TableRow key={q.id}>
                    <TableCell>{truncate(q.query, 50)}</TableCell>
                    <TableCell>{48 - i * 12}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Slow query log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="dense-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Query</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_HISTORY.filter((q) => q.durationMs > 100).map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>{truncate(q.query, 50)}</TableCell>
                    <TableCell>{formatDuration(q.durationMs)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
