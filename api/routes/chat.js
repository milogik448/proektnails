import { Router } from 'express'
import { chat } from '../lib/ai.js'

const router = Router()

// POST /api/chat
// Body: { messages: [{ role: 'user'|'assistant', content: string }] }
router.post('/', async (req, res) => {
  const { messages } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages required' })
  }

  try {
    const reply = await chat(messages)
    res.json({ reply })
  } catch (err) {
    console.error('Chat error:', err?.message ?? err)
    res.status(500).json({ error: err?.message ?? 'Internal server error' })
  }
})

export default router
