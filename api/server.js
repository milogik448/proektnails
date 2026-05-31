import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3001

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://nails-bay-phi.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({ origin: ALLOWED_ORIGINS }))
app.use(express.json())

app.use('/api/chat', chatRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
  })
}

export default app
