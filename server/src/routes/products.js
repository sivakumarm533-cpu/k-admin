import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import Product from '../models/Product.js'
import { requireAdmin, requireAuth } from '../middleware/auth.js'

const router = Router()
const uploadsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../uploads')
const imageTypes = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/gif', '.gif'],
])
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDirectory,
    filename(_req, file, callback) {
      callback(null, file.originalname)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    if (!imageTypes.has(file.mimetype)) return callback(new Error('Use a JPG, PNG, WebP, or GIF product image.'))
    file.originalname = `${randomUUID()}${imageTypes.get(file.mimetype)}`
    callback(null, true)
  },
})

function productFields(body) {
  return {
    name: body.name,
    category: body.category,
    price: body.price,
    unit: body.unit,
    currentQty: body.currentQty,
    targetQty: body.targetQty,
  }
}

router.use(requireAuth)

router.get('/', async (_req, res, next) => {
  try {
    res.json({ products: await Product.find().sort({ createdAt: -1 }) })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found.' })
    res.json({ product })
  } catch (error) {
    next(error)
  }
})

router.post('/', requireAdmin, upload.single('image'), async (req, res, next) => {
  try {
    const product = await Product.create({
      ...productFields(req.body),
      image: req.file ? `/uploads/${path.basename(req.file.path)}` : '',
    })
    res.status(201).json({ product })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', requireAdmin, upload.single('image'), async (req, res, next) => {
  try {
    const updates = productFields(req.body)
    if (req.file) updates.image = `/uploads/${path.basename(req.file.path)}`
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
    if (!product) return res.status(404).json({ message: 'Product not found.' })
    res.json({ product })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found.' })
    res.json({ message: 'Product deleted.' })
  } catch (error) {
    next(error)
  }
})

export default router
