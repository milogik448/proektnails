import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, Loader } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? 'http://localhost:3001/api/chat' : 'https://anjelika-nails-api.vercel.app/api/chat')

const WELCOME = {
  role: 'assistant',
  content: 'Привіт! 💅 Я допоможу вам записатись до Анжеліки на манікюр або педикюр. Як вас звати?',
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A0AE', display: 'block' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

function Message({ role, content }) {
  const isUser = role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
      <div
        style={{
          maxWidth: '78%',
          padding: '10px 14px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          fontSize: 13.5,
          lineHeight: 1.6,
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 400,
          whiteSpace: 'pre-wrap',
          ...(isUser
            ? { background: '#2D1520', color: '#F6EBF0' }
            : { background: 'rgba(255,255,255,0.85)', color: '#2D1520', border: '1px solid rgba(200,160,174,0.2)' }
          ),
        }}
      >
        {content}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen]     = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef               = useRef(null)
  const inputRef                = useRef(null)

  // Скрол до останнього повідомлення
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Фокус на input при відкритті
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    // WELCOME — display-only, не відправляємо в API
    // API очікує розмову що починається з 'user'
    const apiMessages = updatedMessages
      .filter(m => m !== WELCOME)
      .map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(`Server ${res.status}: ${err}`)
      }

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error('[ChatWidget]', err)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Вибачте, сталася помилка. Спробуйте ще раз або напишіть у Instagram @anjelikaa_nails.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200 }}>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute',
              bottom: 70,
              right: 0,
              width: 360,
              maxWidth: 'calc(100vw - 32px)',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(45,21,32,0.18), 0 4px 16px rgba(45,21,32,0.10)',
              display: 'flex',
              flexDirection: 'column',
              background: '#FDF5F7',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              background: '#2D1520',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}>
              {/* Avatar */}
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(200,160,174,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 18 }}>💅</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F6EBF0', letterSpacing: '0.04em', fontFamily: 'Raleway, sans-serif' }}>
                  Анжеліка · Nail Studio
                </div>
                <div style={{ fontSize: 11, color: 'rgba(200,160,174,0.75)', letterSpacing: '0.06em', fontFamily: 'Raleway, sans-serif' }}>
                  Praha · Онлайн запис
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: 'rgba(200,160,174,0.7)', cursor: 'pointer', lineHeight: 0, padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 16px 8px',
              maxHeight: 360,
              minHeight: 200,
              background: 'rgba(242,222,228,0.25)',
            }}>
              {messages.map((msg, i) => (
                <Message key={i} role={msg.role} content={msg.content} />
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(200,160,174,0.2)',
                    borderRadius: '18px 18px 18px 4px',
                  }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(200,160,174,0.18)',
              background: '#FDF5F7',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-end',
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Напишіть повідомлення..."
                rows={1}
                style={{
                  flex: 1,
                  resize: 'none',
                  border: '1px solid rgba(200,160,174,0.3)',
                  borderRadius: 12,
                  padding: '9px 14px',
                  fontSize: 13.5,
                  fontFamily: 'Raleway, sans-serif',
                  color: '#2D1520',
                  background: 'rgba(255,255,255,0.8)',
                  outline: 'none',
                  lineHeight: 1.5,
                  maxHeight: 96,
                  overflowY: 'auto',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(160,112,128,0.55)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(200,160,174,0.3)' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: input.trim() && !loading ? '#2D1520' : 'rgba(200,160,174,0.3)',
                  color: '#F6EBF0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() && !loading ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
              >
                {loading
                  ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  : <Send size={16} />
                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#2D1520',
          color: '#F6EBF0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(45,21,32,0.28)',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.span key="x"  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} /></motion.span>
            : <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><MessageCircle size={22} /></motion.span>
          }
        </AnimatePresence>

        {/* Пульсуючий dot — "онлайн" */}
        {!isOpen && (
          <span style={{
            position: 'absolute', top: 10, right: 10,
            width: 10, height: 10, borderRadius: '50%',
            background: '#C8A0AE',
            border: '2px solid #2D1520',
          }}>
            <motion.span
              style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: 'rgba(200,160,174,0.5)' }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </span>
        )}
      </motion.button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
