import api from '@/services/authService'
import type { Workspace, WorkspaceApiResponse } from '@/types'

interface WorkspaceRequest {
  name: string
}

function toWorkspace(item: WorkspaceApiResponse): Workspace {
  return {
    id: String(item.id),
    name: item.name,
    lastModified: item.updatedAt,
    queryCount: 0,
  }
}

export const workspaceService = {
  async list(): Promise<Workspace[]> {
    const res = await api.get<WorkspaceApiResponse[]>('/workspace/all')
    return res.data.map(toWorkspace)
  },

  async create(data: WorkspaceRequest): Promise<Workspace> {
    const res = await api.post<WorkspaceApiResponse>('/workspace/create', data)
    return toWorkspace(res.data)
  },

  async rename(id: string, data: WorkspaceRequest): Promise<Workspace> {
    const res = await api.put<WorkspaceApiResponse>(`/workspace/${id}`, data)
    return toWorkspace(res.data)
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/workspace/${id}`)
  },
}
