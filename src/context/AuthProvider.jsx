import { useEffect, useState } from 'react'
import AuthContext from './authContext'
import { apiRequest } from '../lib/api'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem('token')))

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    apiRequest('/auth/me')
      .then((result) => setUser(result.user))
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email, password, role) {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password, role },
    })
    localStorage.setItem('token', result.token)
    setUser(result.user)
    return result.user
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
