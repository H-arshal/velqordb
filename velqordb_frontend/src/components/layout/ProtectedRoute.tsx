import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/hooks/useAppStore'

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

export function PublicRoute() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/playground" replace />
  return <Outlet />
}

export function RootRedirect() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  return <Navigate to="/playground" replace />
}
