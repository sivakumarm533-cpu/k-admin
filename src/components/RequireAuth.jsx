import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../context/useAuth'

function RequireAuth({ role }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <p className="auth-loading">Loading account...</p>
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />

  return <Outlet />
}

export default RequireAuth
