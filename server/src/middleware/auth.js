import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
  if (!token) return res.status(401).json({ message: 'Please log in to continue.' })

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: 'Your session is invalid or expired. Please log in again.' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.auth?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access is required for this action.' })
  }
  next()
}
