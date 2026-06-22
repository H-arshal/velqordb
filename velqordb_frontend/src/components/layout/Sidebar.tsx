import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Database,
  FolderOpen,
  History,
  LayoutGrid,
  PanelLeft,
  Play,
  Shield,
  Trophy,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { setMobileSidebarOpen, toggleSidebar } from '@/store/uiSlice'
import type { UserRole } from '@/types'

const navItems = [
  { to: '/playground', label: 'Playground', icon: Play },
  { to: '/explorer', label: 'Explorer', icon: Database },
  { to: '/history', label: 'History', icon: History },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/challenges', label: 'Challenges', icon: Trophy },
  { to: '/workspaces', label: 'Workspaces', icon: FolderOpen },
  { to: '/designer', label: 'Schema Designer', icon: LayoutGrid },
]

const bottomItems = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/admin', label: 'Admin', icon: Shield, roles: ['INSTRUCTOR', 'ADMIN'] as UserRole[] },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed)
  const role = useAppSelector((s) => s.auth.user?.role ?? 'USER')

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-150',
        collapsed ? 'w-14' : 'w-60',
        className,
      )}
    >
      <div className="flex h-12 items-center gap-2 border-b border-sidebar-border px-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Database className="h-4 w-4" />
        </div>
        {!collapsed && <span className="text-sm font-semibold tracking-tight">VelqorDB</span>}
        <Button
          variant="ghost"
          size="icon"
          className={cn('ml-auto hidden h-7 w-7 lg:inline-flex', collapsed && 'ml-0')}
          onClick={() => dispatch(toggleSidebar())}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2" aria-label="Main navigation">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = location.pathname.startsWith(to)
          return (
            <Link
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-150',
                active
                  ? 'border-r-2 border-primary bg-blue-50 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                collapsed && 'justify-center px-2',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && label}
            </Link>
          )
        })}
      </nav>

      <div className="p-2">
        <Separator className="mb-2" />
        {bottomItems
          .filter((item) => !item.roles || item.roles.includes(role))
          .map(({ to, label, icon: Icon }) => {
            const active = location.pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-150',
                  active
                    ? 'border-r-2 border-primary bg-blue-50 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  collapsed && 'justify-center px-2',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && label}
              </Link>
            )
          })}
      </div>
    </aside>
  )
}

export function MobileSidebarTrigger() {
  const dispatch = useAppDispatch()
  return (
    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => dispatch(setMobileSidebarOpen(true))} aria-label="Open menu">
      <PanelLeft className="h-4 w-4" />
    </Button>
  )
}