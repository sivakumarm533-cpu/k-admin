const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {})
  const token = localStorage.getItem('token')

  if (token) headers.set('Authorization', `Bearer ${token}`)

  let body = options.body
  if (body && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
    body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body,
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.message || 'The request could not be completed.')
  }

  return result
}

export function getApiOrigin() {
  return API_BASE.replace(/\/api\/?$/, '')
}
