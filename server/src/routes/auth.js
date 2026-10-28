import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false })

router.post('/login', loginLimit, async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    const role = req.body.role
    if (!email || !password || !['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Enter your email, password, and account type.' })
    }

    const user = await User.findOne({ email }).select('+passwordHash')
    if (!user || user.role !== role || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Email, password, or account type is incorrect.' })
    }

    const token = jwt.sign(
      { sub: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    )
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (error) {
    next(error)
  }
})

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth.sub).select('name email role')
    if (!user) return res.status(401).json({ message: 'Account no longer exists.' })
    res.json({ user })
  } catch (error) {
    next(error)
  }
})

export default router
