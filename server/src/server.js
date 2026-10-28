import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { connectToDatabase } from './db.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'

const app = express()
const port = Number(process.env.PORT || 5000)
const uploadsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../uploads')

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error('Set JWT_SECRET to a random value with at least 32 characters in server/.env')
}

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use('/uploads', express.static(uploadsDirectory))
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.use((error, _req, res, _next) => {
  console.error(error)
  if (res.headersSent) return _next(error)
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message })
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid product ID.' })
  }
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ message: 'Request body must contain valid JSON.' })
  }
  const status = error.message?.startsWith('Use a JPG') || error.code === 'LIMIT_FILE_SIZE' ? 400 : 500
  res.status(status).json({ message: status === 400 ? error.message || 'Image exceeds 5 MB.' : 'Server error.' })
})

await connectToDatabase()
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
