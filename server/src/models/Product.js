import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  unit: { type: String, default: 'kg', trim: true },
  currentQty: { type: Number, required: true, min: 0 },
  targetQty: { type: Number, required: true, min: 0 },
  image: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
