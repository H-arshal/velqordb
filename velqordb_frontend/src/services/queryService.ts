import type { QueryError, QueryResult } from '@/types'
import { MOCK_SAMPLE_RESULT } from '@/utils/mock-data'

export async function executeQuery(sql: string): Promise<{ result?: QueryResult; error?: QueryError }> {
  await new Promise((r) => setTimeout(r, 300))

  if (/employes/i.test(sql) && !/employees/i.test(sql)) {
    return {
      error: {
        message: "Table 'sandbox.employes' doesn't exist",
        line: 1,
        column: 15,
      },
    }
  }

  if (/DROP\s+DATABASE/i.test(sql)) {
    return {
      error: {
        message: 'DROP DATABASE is not allowed in sandbox mode',
        line: 1,
      },
    }
  }

  return { result: { ...MOCK_SAMPLE_RESULT, executionTimeMs: 42 + Math.floor(Math.random() * 50) } }
}

export function formatSql(sql: string): string {
  return sql
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ',\n  ')
    .replace(/\b(FROM|WHERE|ORDER BY|GROUP BY|HAVING|LIMIT|JOIN|LEFT JOIN|INNER JOIN|ON)\b/gi, '\n$1')
    .trim()
}
