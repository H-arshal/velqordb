import { Outlet } from 'react-router-dom'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { setMobileSidebarOpen } from '@/store/uiSlice'

export function AppLayout() {
  const mobileOpen = useAppSelector((s) => s.ui.mobileSidebarOpen)
  const dispatch = useAppDispatch()

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <Sheet open={mobileOpen} onOpenChange={(open) => dispatch(setMobileSidebarOpen(open))}>
        <SheetContent side="left" className="w-60 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
