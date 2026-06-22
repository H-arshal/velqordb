import { useEffect, useState } from 'react'
import { Download, FolderOpen, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { useNavigate } from 'react-router-dom'
import { workspaceService } from '@/services/workspaceService'
import type { Workspace } from '@/types'

export function WorkspacesPage() {
  const navigate = useNavigate()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [createName, setCreateName] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [renameId, setRenameId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  const loadWorkspaces = async () => {
    try {
      setIsLoading(true)
      const data = await workspaceService.list()
      setWorkspaces(data)
    } catch {
      toast.error('Failed to load workspaces')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadWorkspaces()
  }, [])

  const handleCreate = async () => {
    const trimmedName = createName.trim()
    if (!trimmedName) {
      toast.error('Workspace name is required')
      return
    }

    try {
      setIsCreating(true)
      const created = await workspaceService.create({ name: trimmedName })
      setWorkspaces((w) => [created, ...w])
      setCreateName('')
      setCreateOpen(false)
      toast.success('Workspace created')
    } catch {
      toast.error('Failed to create workspace')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) {
      return
    }

    try {
      setIsDeleting(true)
      await workspaceService.remove(deleteId)
      setWorkspaces((w) => w.filter((x) => x.id !== deleteId))
      toast.success('Workspace deleted')
      setDeleteId(null)
    } catch {
      toast.error('Failed to delete workspace')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleRename = async () => {
    const trimmedName = renameValue.trim()
    if (!renameId || !trimmedName) {
      toast.error('Workspace name is required')
      return
    }

    try {
      setIsRenaming(true)
      const updated = await workspaceService.rename(renameId, { name: trimmedName })
      setWorkspaces((w) => w.map((x) => (x.id === renameId ? updated : x)))
      toast.success('Workspace renamed')
      setRenameId(null)
    } catch {
      toast.error('Failed to rename workspace')
    } finally {
      setIsRenaming(false)
    }
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <PageHeader
        title="Saved Workspaces"
        description="Restore query tabs, notes, and database context."
        actions={
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="h-3.5 w-3.5" />
            New Workspace
          </Button>
        }
      />

      {isLoading ? (
        <div className="p-4 text-sm text-muted-foreground">Loading workspaces...</div>
      ) : workspaces.length === 0 ? (
        <div className="p-4">
          <EmptyState
            icon={FolderOpen}
            title="No workspaces yet"
            description="Create your first workspace to save and organize your SQL sessions."
            actionLabel="Create workspace"
            onAction={() => setCreateOpen(true)}
          />
        </div>
      ) : (
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws) => (
            <Card key={ws.id}>
              <CardHeader>
                <CardTitle className="text-sm">{ws.name}</CardTitle>
                <CardDescription>
                  {ws.queryCount} queries · Modified {new Date(ws.lastModified).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => navigate('/playground')}>
                  <FolderOpen className="h-3.5 w-3.5" />
                  Load
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setRenameId(ws.id)
                    setRenameValue(ws.name)
                  }}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Rename
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(ws, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${ws.name}.json`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDeleteId(ws.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create workspace</DialogTitle>
            <DialogDescription>Give your workspace a name to save future SQL sessions.</DialogDescription>
          </DialogHeader>
          <Input value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="e.g. Interview Prep" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)} disabled={isCreating}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete workspace?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!renameId} onOpenChange={() => setRenameId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename workspace</DialogTitle>
          </DialogHeader>
          <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameId(null)}>
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={isRenaming}>
              {isRenaming ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
