import { useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Search, User } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MobileSidebarTrigger } from '@/components/layout/Sidebar'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { clearUser } from '@/store/authSlice'
import { authService } from '@/services/authService'

const routeLabels: Record<string, string> = {
  playground: 'Playground',
  explorer: 'Explorer',
  history: 'History',
  analytics: 'Analytics',
  challenges: 'Challenges',
  workspaces: 'Workspaces',
  designer: 'Schema Designer',
  profile: 'Profile',
  admin: 'Admin',
}

export function TopBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((s) => s.auth.user)
  const segment = location.pathname.split('/')[1] || 'playground'
  const label = routeLabels[segment] ?? 'Playground'

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch {
      /* ignore */
    }
    dispatch(clearUser())
    navigate('/login')
  }

  return (
    <header className="flex h-12 shrink-0 items-center gap-4 border-b border-border bg-background px-4">
      <MobileSidebarTrigger />

      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); navigate('/playground') }}>
              VelqorDB
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
          {segment === 'playground' && user && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-mono text-xs text-muted-foreground">
                  sandbox_{user.username}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden gap-2 md:inline-flex">
          <Search className="h-3.5 w-3.5" />
          <span className="text-muted-foreground">Search</span>
          <kbd className="ml-2">⌘K</kbd>
        </Button>

        <Badge variant="success" className="hidden gap-1.5 sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Connected
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.username?.slice(0, 2).toUpperCase() ?? 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.username}</span>
                <span className="text-xs font-normal text-muted-foreground">{user?.role ?? 'USER'}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
