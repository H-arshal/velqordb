import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PageHeader } from '@/components/shared/PageHeader'
import { useAppSelector } from '@/hooks/useAppStore'
import { MOCK_CHALLENGES } from '@/utils/mock-data'
import { Navigate } from 'react-router-dom'

export function AdminPage() {
  const role = useAppSelector((s) => s.auth.user?.role ?? 'USER')
  const [challenges] = useState(MOCK_CHALLENGES)

  if (role !== 'ADMIN' && role !== 'INSTRUCTOR') {
    return <Navigate to="/playground" replace />
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader title="Admin" description="Manage challenges and platform content." />

      <Tabs defaultValue="challenges" className="p-4">
        <TabsList>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          {role === 'ADMIN' && <TabsTrigger value="users">Users</TabsTrigger>}
        </TabsList>

        <TabsContent value="challenges" className="mt-4">
          <div className="mb-4 flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-3.5 w-3.5" />
                  New challenge
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create challenge</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Challenge title" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Problem description" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected result JSON</Label>
                    <Textarea placeholder='[{"col": "value"}]' className="font-mono text-xs" />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table className="dense-table">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {challenges.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{c.difficulty}</Badge>
                  </TableCell>
                  <TableCell>{c.topic}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {role === 'ADMIN' && (
          <TabsContent value="users" className="mt-4">
            <Table className="dense-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>demo_user</TableCell>
                  <TableCell>USER</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>instructor1</TableCell>
                  <TableCell>INSTRUCTOR</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
