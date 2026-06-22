export type UserRole = 'USER' | 'INSTRUCTOR' | 'ADMIN'

export interface User {
  username: string
  email?: string
  role: UserRole
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  username: string
}

export interface QueryResult {
  columns: string[]
  rows: Record<string, unknown>[]
  rowCount: number
  executionTimeMs: number
}

export interface QueryError {
  message: string
  line?: number
  column?: number
}

export interface QueryHistoryItem {
  id: string
  query: string
  timestamp: string
  durationMs: number
  rowCount: number
  status: 'success' | 'error'
  favorite?: boolean
}

export interface SchemaColumn {
  name: string
  type: string
  nullable: boolean
  key?: string
  defaultValue?: string
}

export interface SchemaTable {
  name: string
  schema: string
  rowCount: number
  columns: SchemaColumn[]
  foreignKeys?: { name: string; from: string; to: string }[]
}

export interface SchemaNode {
  name: string
  type: 'schema' | 'table' | 'column'
  children?: SchemaNode[]
  table?: SchemaTable
}

export interface Challenge {
  id: string
  title: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  topic: string
  description: string
  estimatedMinutes: number
  completed?: boolean
  hints: string[]
  schema: SchemaTable[]
}

export interface Workspace {
  id: string
  name: string
  lastModified: string
  queryCount: number
  notes?: string
}

export interface WorkspaceApiResponse {
  id: number
  name: string
  schemaName: string
  createdAt: string
  updatedAt: string
}

export interface AnalyticsMetrics {
  totalQueries: number
  avgDurationMs: number
  slowQueries: number
  successRate: number
}

export interface DesignerTable {
  id: string
  name: string
  x: number
  y: number
  columns: SchemaColumn[]
}

export interface DesignerRelation {
  id: string
  fromTableId: string
  toTableId: string
  type: 'one-to-one' | 'one-to-many'
}
