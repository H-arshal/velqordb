import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute, PublicRoute, RootRedirect } from '@/components/layout/ProtectedRoute'
import { AuthPage } from '@/pages/AuthPage'
import { PlaygroundPage } from '@/pages/PlaygroundPage'
import { ExplorerPage } from '@/pages/ExplorerPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { ChallengesPage, ChallengeDetailPage } from '@/pages/ChallengesPage'
import { WorkspacesPage } from '@/pages/WorkspacesPage'
import { SchemaDesignerPage } from '@/pages/SchemaDesignerPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { AdminPage } from '@/pages/AdminPage'

export default function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/playground" replace />} />
            <Route path="playground" element={<PlaygroundPage />} />
            <Route path="explorer" element={<ExplorerPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="challenges/:id" element={<ChallengeDetailPage />} />
            <Route path="workspaces" element={<WorkspacesPage />} />
            <Route path="designer" element={<SchemaDesignerPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Route>

        <Route path="*" element={<RootRedirect />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
    </TooltipProvider>
  )
}
