import { useMemo, useState } from 'react'
import { CheckCircle2, Clock } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PageHeader } from '@/components/shared/PageHeader'
import { SqlEditor } from '@/components/playground/SqlEditor'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { MOCK_CHALLENGES } from '@/utils/mock-data'
import { cn } from '@/lib/utils'

const difficultyColors: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  Beginner: 'success',
  Intermediate: 'warning',
  Advanced: 'destructive',
  Expert: 'secondary',
}

export function ChallengesPage() {
  const [difficulty, setDifficulty] = useState<string>('all')
  const [topic, setTopic] = useState<string>('all')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return MOCK_CHALLENGES.filter((c) => {
      const matchDiff = difficulty === 'all' || c.difficulty === difficulty
      const matchTopic = topic === 'all' || c.topic === topic
      return matchDiff && matchTopic
    })
  }, [difficulty, topic])

  const topics = [...new Set(MOCK_CHALLENGES.map((c) => c.topic))]

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader title="Learning Arena" description="Practice SQL with auto-graded challenges." />

      <div className="flex flex-wrap gap-2 border-b border-border px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map((d) => (
            <Button
              key={d}
              size="sm"
              variant={difficulty === d ? 'default' : 'outline'}
              onClick={() => setDifficulty(d)}
            >
              {d === 'all' ? 'All levels' : d}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          <Button size="sm" variant={topic === 'all' ? 'default' : 'outline'} onClick={() => setTopic('all')}>
            All topics
          </Button>
          {topics.map((t) => (
            <Button key={t} size="sm" variant={topic === t ? 'default' : 'outline'} onClick={() => setTopic(t)}>
              {t}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((challenge) => (
          <Card key={challenge.id} className="cursor-pointer transition-colors duration-150 hover:border-primary/50" onClick={() => navigate(`/challenges/${challenge.id}`)}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-sm">{challenge.title}</CardTitle>
                {challenge.completed && <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />}
              </div>
              <CardDescription>{challenge.topic}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant={difficultyColors[challenge.difficulty]}>{challenge.difficulty}</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {challenge.estimatedMinutes} min
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ChallengeDetailPage() {
  const { id } = useParams()
  const challenge = MOCK_CHALLENGES.find((c) => c.id === id)
  const [sql, setSql] = useState('-- Write your solution here\nSELECT ')
  const [submitted, setSubmitted] = useState<'idle' | 'success' | 'fail'>('idle')

  if (!challenge) {
    return <p className="p-4 text-sm text-muted-foreground">Challenge not found.</p>
  }

  const handleSubmit = () => {
    setSubmitted(sql.includes('SELECT') ? 'success' : 'fail')
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <PageHeader
        title={challenge.title}
        description={`${challenge.difficulty} · ${challenge.topic}`}
        actions={
          <Button size="sm" onClick={handleSubmit}>
            Submit solution
          </Button>
        }
      />

      <ResizablePanelGroup direction="horizontal" className="min-h-0 flex-1">
        <ResizablePanel defaultSize={35} minSize={25}>
          <ScrollPanel>
            <div className="space-y-4 p-4">
              <div>
                <h3 className="text-sm font-semibold">Problem</h3>
                <p className="mt-2 text-sm text-muted-foreground">{challenge.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Schema</h3>
                {challenge.schema.map((table) => (
                  <Card key={table.name} className="mt-2">
                    <CardHeader className="py-2">
                      <CardTitle className="font-mono text-xs">{table.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table className="dense-table">
                        <TableBody>
                          {table.columns.map((col) => (
                            <TableRow key={col.name}>
                              <TableCell>{col.name}</TableCell>
                              <TableCell className="text-muted-foreground">{col.type}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="hints">
                  <AccordionTrigger>Hints</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-inside list-disc text-sm text-muted-foreground">
                      {challenge.hints.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollPanel>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="flex h-full flex-col">
            <div className="min-h-0 flex-1">
              <SqlEditor value={sql} onChange={setSql} />
            </div>
            {submitted !== 'idle' && (
              <div
                className={cn(
                  'border-t border-border p-3 text-sm',
                  submitted === 'success' ? 'border-l-4 border-l-success bg-success/5 text-success' : 'border-l-4 border-l-destructive bg-destructive/5 text-destructive',
                )}
              >
                {submitted === 'success' ? 'Result matches expected output.' : 'Result does not match. Review your query and try again.'}
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

function ScrollPanel({ children }: { children: React.ReactNode }) {
  return <div className="h-full overflow-auto">{children}</div>
}
