import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectToDatabase } from './db.js'
import User from './models/User.js'

const accounts = [
  { name: 'Store Admin', email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, role: 'admin' },
  { name: 'Store User', email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD, role: 'user' },
]

try {
  await connectToDatabase()
  for (const account of accounts) {
    if (!account.email || !account.password || account.password.length < 12) {
      throw new Error(`Set ${account.role.toUpperCase()}_EMAIL and a password of at least 12 characters in server/.env`)
    }
    const passwordHash = await bcrypt.hash(account.password, 12)
    await User.findOneAndUpdate(
      { email: account.email.toLowerCase() },
      {
        name: account.name,
        email: account.email.toLowerCase(),
        role: account.role,
        passwordHash,
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    )
    console.log(`Seeded ${account.role} account: ${account.email}`)
  }
} finally {
  await mongoose.disconnect()
}
