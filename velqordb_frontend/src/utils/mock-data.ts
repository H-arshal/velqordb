import type { AnalyticsMetrics, Challenge, QueryHistoryItem, SchemaNode, SchemaTable, Workspace } from '@/types'

export const MOCK_SCHEMA: SchemaNode[] = [
  {
    name: 'sandbox',
    type: 'schema',
    children: [
      {
        name: 'employees',
        type: 'table',
        children: [
          { name: 'id', type: 'column' },
          { name: 'name', type: 'column' },
          { name: 'department', type: 'column' },
          { name: 'salary', type: 'column' },
          { name: 'hired_at', type: 'column' },
        ],
      },
      {
        name: 'departments',
        type: 'table',
        children: [
          { name: 'id', type: 'column' },
          { name: 'name', type: 'column' },
          { name: 'location', type: 'column' },
        ],
      },
      {
        name: 'projects',
        type: 'table',
        children: [
          { name: 'id', type: 'column' },
          { name: 'title', type: 'column' },
          { name: 'department_id', type: 'column' },
          { name: 'budget', type: 'column' },
        ],
      },
    ],
  },
]

export const MOCK_TABLES: Record<string, SchemaTable> = {
  employees: {
    name: 'employees',
    schema: 'sandbox',
    rowCount: 1250,
    columns: [
      { name: 'id', type: 'INT', nullable: false, key: 'PK' },
      { name: 'name', type: 'VARCHAR(100)', nullable: false },
      { name: 'department', type: 'VARCHAR(50)', nullable: true },
      { name: 'salary', type: 'DECIMAL(10,2)', nullable: true },
      { name: 'hired_at', type: 'DATE', nullable: true },
    ],
    foreignKeys: [{ name: 'fk_dept', from: 'department', to: 'departments.name' }],
  },
  departments: {
    name: 'departments',
    schema: 'sandbox',
    rowCount: 12,
    columns: [
      { name: 'id', type: 'INT', nullable: false, key: 'PK' },
      { name: 'name', type: 'VARCHAR(50)', nullable: false },
      { name: 'location', type: 'VARCHAR(100)', nullable: true },
    ],
  },
  projects: {
    name: 'projects',
    schema: 'sandbox',
    rowCount: 48,
    columns: [
      { name: 'id', type: 'INT', nullable: false, key: 'PK' },
      { name: 'title', type: 'VARCHAR(200)', nullable: false },
      { name: 'department_id', type: 'INT', nullable: true, key: 'FK' },
      { name: 'budget', type: 'DECIMAL(12,2)', nullable: true },
    ],
    foreignKeys: [{ name: 'fk_project_dept', from: 'department_id', to: 'departments.id' }],
  },
}

export const MOCK_HISTORY: QueryHistoryItem[] = [
  {
    id: '1',
    query: 'SELECT name, department, salary FROM employees ORDER BY salary DESC LIMIT 10;',
    timestamp: '2026-06-17T09:12:00Z',
    durationMs: 42,
    rowCount: 10,
    status: 'success',
    favorite: true,
  },
  {
    id: '2',
    query: 'SELECT d.name, COUNT(e.id) AS headcount FROM departments d LEFT JOIN employees e ON e.department = d.name GROUP BY d.name;',
    timestamp: '2026-06-17T08:45:00Z',
    durationMs: 128,
    rowCount: 12,
    status: 'success',
  },
  {
    id: '3',
    query: 'SELECT * FROM employes WHERE salary > 50000;',
    timestamp: '2026-06-17T08:30:00Z',
    durationMs: 8,
    rowCount: 0,
    status: 'error',
  },
]

export const MOCK_SAMPLE_RESULT = {
  columns: ['name', 'department', 'salary'],
  rows: [
    { name: 'Alice Chen', department: 'Engineering', salary: 125000 },
    { name: 'Bob Martinez', department: 'Engineering', salary: 118000 },
    { name: 'Carol Wu', department: 'Product', salary: 112000 },
    { name: 'David Kim', department: 'Sales', salary: 98000 },
    { name: 'Eva Johnson', department: 'Marketing', salary: 92000 },
    { name: 'Frank Lee', department: 'Engineering', salary: 89000 },
    { name: 'Grace Park', department: 'HR', salary: 85000 },
    { name: 'Henry Brown', department: 'Sales', salary: 82000 },
    { name: 'Ivy Davis', department: 'Product', salary: 79000 },
    { name: 'Jack Wilson', department: 'Engineering', salary: 76000 },
  ],
  rowCount: 10,
  executionTimeMs: 42,
}

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Top Earners by Department',
    difficulty: 'Beginner',
    topic: 'SELECT',
    description: 'Write a query to find the highest paid employee in each department.',
    estimatedMinutes: 10,
    completed: true,
    hints: ['Use GROUP BY on department', 'Consider MAX(salary)'],
    schema: [MOCK_TABLES.employees],
  },
  {
    id: 'c2',
    title: 'Department Headcount',
    difficulty: 'Intermediate',
    topic: 'JOINS',
    description: 'Count employees per department using a JOIN between employees and departments.',
    estimatedMinutes: 15,
    hints: ['LEFT JOIN preserves empty departments'],
    schema: [MOCK_TABLES.employees, MOCK_TABLES.departments],
  },
  {
    id: 'c3',
    title: 'Running Salary Total',
    difficulty: 'Advanced',
    topic: 'Window Functions',
    description: 'Calculate a running total of salaries ordered by hire date.',
    estimatedMinutes: 20,
    hints: ['Use SUM() OVER (ORDER BY hired_at)'],
    schema: [MOCK_TABLES.employees],
  },
]

export const MOCK_WORKSPACES: Workspace[] = [
  { id: 'w1', name: 'Interview Prep', lastModified: '2026-06-16T14:00:00Z', queryCount: 8, notes: 'Focus on JOINs and window functions' },
  { id: 'w2', name: 'Analytics Sandbox', lastModified: '2026-06-15T10:30:00Z', queryCount: 15 },
  { id: 'w3', name: 'Schema Experiments', lastModified: '2026-06-14T09:00:00Z', queryCount: 4 },
]

export const MOCK_ANALYTICS: AnalyticsMetrics = {
  totalQueries: 1247,
  avgDurationMs: 86,
  slowQueries: 23,
  successRate: 94.2,
}

export const MOCK_DAILY_EXECUTIONS = [
  { date: 'Jun 11', count: 142 },
  { date: 'Jun 12', count: 168 },
  { date: 'Jun 13', count: 155 },
  { date: 'Jun 14', count: 189 },
  { date: 'Jun 15', count: 201 },
  { date: 'Jun 16', count: 178 },
  { date: 'Jun 17', count: 214 },
]

export const DEFAULT_SQL = `-- Welcome to VelqorDB
SELECT name, department, salary
FROM employees
ORDER BY salary DESC
LIMIT 10;`
