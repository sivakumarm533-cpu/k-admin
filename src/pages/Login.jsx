import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

function Login() {
  const [role, setRole] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const user = await login(email, password, role)
      const requestedPath = location.state?.from?.pathname
      navigate(user.role === 'admin' ? requestedPath || '/dashboard' : '/dashboard', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">ItemPrice Admin</p>
        <h1>Sign in</h1>
        <p className="login-description">Choose your account type and enter your login details.</p>

        <label htmlFor="account-role">Account type</label>
        <select id="account-role" value={role} onChange={(event) => setRole(event.target.value)}>
          <option value="user">User · View products</option>
          <option value="admin">Admin · Manage products</option>
        </select>

        <label htmlFor="email">Email</label>
        <input
          autoComplete="username"
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="current-password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />

        {error && <p className="form-error" role="alert">{error}</p>}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}

export default Login
