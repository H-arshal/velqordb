import { useState } from 'react'
import { ChevronDown, ChevronRight, Columns, Table2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SchemaNode } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'

interface SchemaTreeProps {
  nodes: SchemaNode[]
  onSelectTable?: (tableName: string) => void
  onGenerateSelect?: (tableName: string) => void
  className?: string
}

export function SchemaTree({ nodes, onSelectTable, onGenerateSelect, className }: SchemaTreeProps) {
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ sandbox: true })

  const toggle = (name: string) => setExpanded((e) => ({ ...e, [name]: !e[name] }))

  const filterNodes = (items: SchemaNode[]): SchemaNode[] => {
    if (!filter) return items
    const q = filter.toLowerCase()
    return items
      .map((node) => {
        if (node.name.toLowerCase().includes(q)) return node
        if (node.children) {
          const children = filterNodes(node.children)
          if (children.length) return { ...node, children }
        }
        return null
      })
      .filter(Boolean) as SchemaNode[]
  }

  const renderNode = (node: SchemaNode, depth = 0) => {
    const hasChildren = !!node.children?.length
    const isOpen = expanded[node.name]
    const isTable = node.type === 'table'

    return (
      <div key={`${node.type}-${node.name}`}>
        <div
          className={cn(
            'flex cursor-pointer items-center gap-1 rounded-md py-1 pr-2 text-xs hover:bg-muted',
            isTable && 'font-medium',
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (hasChildren) toggle(node.name)
            if (isTable) {
              onSelectTable?.(node.name)
            }
          }}
          onDoubleClick={() => isTable && onGenerateSelect?.(node.name)}
          role="treeitem"
          aria-expanded={hasChildren ? isOpen : undefined}
        >
          {hasChildren ? (
            isOpen ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <span className="w-3.5" />
          )}
          {node.type === 'schema' && <Table2 className="h-3.5 w-3.5 shrink-0 text-primary" />}
          {node.type === 'table' && <Table2 className="h-3.5 w-3.5 shrink-0 text-accent" />}
          {node.type === 'column' && <Columns className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
          <span className="truncate">{node.name}</span>
        </div>
        {hasChildren && isOpen && node.children?.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div className="border-b border-border p-2">
        <Input placeholder="Filter tables…" value={filter} onChange={(e) => setFilter(e.target.value)} className="h-8 text-xs" />
      </div>
      <ScrollArea className="flex-1 p-1" role="tree">
        {filterNodes(nodes).map((node) => renderNode(node))}
      </ScrollArea>
    </div>
  )
}
