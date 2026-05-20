import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, Loader, Sparkles } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? 'http://localhost:3001/api/chat' : 'https://anjelika-nails-api.vercel.app/api/chat')

const WELCOME = {
  role: 'assistant',
  content: 'Привіт! 💅 Я AI-асистент VELOURA Studio. Допоможу вам записатись на манікюр або педикюр. Як вас звати?',
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
      <div style={{
        maxWidth: '78%', padding: '10px 14px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        fontSize: 13.5, lineHeight: 1.6,
        fontFamily: 'Raleway, sans-serif', fontWeight: 400, whiteSpace: 'pre-wrap',
        ...(isUser
          ? { background: '#2D1520', color: '#F6EBF0' }
          : { background: 'rgba(255,255,255,0.88)', color: '#2D1520', border: '1px solid rgba(200,160,174,0.2)' }
        ),
      }}>
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
  const containerRef            = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  // Відкривається з інших частин сайту через custom event
  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-ai-chat', handler)
    return () => window.removeEventListener('open-ai-chat', handler)
  }, [])

  // Закривається по кліку поза чатом
  useEffect(() => {
    if (!isOpen) return
    const handler = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    const apiMessages = updatedMessages
      .map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
      if (!res.ok) throw new Error(`Server ${res.status}: ${await res.text()}`)
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error('[ChatWidget]', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Вибачте, сталася помилка. Спробуйте ще раз або напишіть у Instagram @anjelikaa_nails.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <div ref={containerRef} style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 200,
      display: 'flex', alignItems: 'flex-end', flexDirection: 'row', gap: 12,
    }}>

      {/* AI label — показується коли чат закритий */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.88 }}
            transition={{ duration: 0.35, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => setIsOpen(true)}
            style={{
              background: 'rgba(45,21,32,0.82)',
              backdropFilter: 'blur(14px)',
              color: 'rgba(240,223,230,0.9)',
              padding: '7px 14px 7px 10px',
              borderRadius: '20px',
              fontSize: '10.5px',
              letterSpacing: '0.07em',
              whiteSpace: 'nowrap',
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 300,
              boxShadow: '0 4px 16px rgba(45,21,32,0.18), 0 0 0 1px rgba(200,160,174,0.1)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              marginBottom: 8,
            }}
          >
            <Sparkles size={12} style={{ color: '#C8A0AE', flexShrink: 0 }} />
            AI запис
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button + chat panel */}
      <div style={{ position: 'relative' }}>

        {/* Chat panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'absolute', bottom: 74, right: 0,
                width: 360, maxWidth: 'calc(100vw - 32px)',
                borderRadius: 22, overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(45,21,32,0.2), 0 4px 20px rgba(45,21,32,0.12), 0 0 0 1px rgba(200,160,174,0.1)',
                display: 'flex', flexDirection: 'column',
                background: '#FDF5F7',
              }}
            >
              {/* Header */}
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, #3A1A26 0%, #2D1520 70%)',
                display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: '1px solid rgba(200,160,174,0.1)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(200,160,174,0.15)',
                  border: '1px solid rgba(200,160,174,0.28)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                    <line x1="9.5" y1="12" x2="14.5" y2="12" stroke="#F0DFE6" strokeWidth="1.3"/>
                    <line x1="25.5" y1="12" x2="30.5" y2="12" stroke="#F0DFE6" strokeWidth="1.3"/>
                    <polyline points="11.5,12 20,28.5 28.5,12" stroke="#F0DFE6" strokeWidth="1.3" fill="none" strokeLinejoin="miter"/>
                    <circle cx="20" cy="28.5" r="1.4" fill="rgba(200,160,174,0.8)"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 12.5, fontWeight: 600, color: '#F0DFE6',
                    letterSpacing: '0.18em', fontFamily: 'Raleway, sans-serif',
                  }}>
                    VELOURA
                  </div>
                  <div style={{
                    fontSize: 10, color: 'rgba(200,160,174,0.65)',
                    letterSpacing: '0.09em', fontFamily: 'Raleway, sans-serif',
                    display: 'flex', alignItems: 'center', gap: 5, marginTop: 3,
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#A8D8A8', display: 'inline-block',
                    }} />
                    Premium Nail Studio · Prague
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'rgba(200,160,174,0.6)', cursor: 'pointer', lineHeight: 0, padding: 4 }}
                >
                  <X size={17} />
                </button>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1, overflowY: 'auto',
                padding: '16px 16px 8px',
                maxHeight: 340, minHeight: 200,
                background: 'rgba(242,222,228,0.22)',
              }}>
                {messages.map((msg, i) => (
                  <Message key={i} role={msg.role} content={msg.content} />
                ))}
                {loading && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.88)',
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
                padding: '12px 14px',
                borderTop: '1px solid rgba(200,160,174,0.16)',
                background: '#FDF5F7',
                display: 'flex', gap: 10, alignItems: 'flex-end',
              }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Напишіть повідомлення..."
                  rows={1}
                  style={{
                    flex: 1, resize: 'none',
                    border: '1px solid rgba(200,160,174,0.28)',
                    borderRadius: 12, padding: '9px 14px',
                    fontSize: 13.5, fontFamily: 'Raleway, sans-serif',
                    color: '#2D1520', background: 'rgba(255,255,255,0.82)',
                    outline: 'none', lineHeight: 1.5,
                    maxHeight: 96, overflowY: 'auto',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(160,112,128,0.5)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(200,160,174,0.28)' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: input.trim() && !loading
                      ? 'linear-gradient(135deg, #3A1A26, #2D1520)'
                      : 'rgba(200,160,174,0.28)',
                    color: '#F0DFE6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: input.trim() && !loading ? 'pointer' : 'default',
                    transition: 'all 0.2s', flexShrink: 0,
                    boxShadow: input.trim() && !loading ? '0 4px 12px rgba(45,21,32,0.2)' : 'none',
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
        <motion.div
          animate={!isOpen ? { y: [0, -5, 0] } : { y: 0 }}
          transition={!isOpen
            ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 }
          }
        >
          <motion.button
            onClick={() => setIsOpen(v => !v)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'linear-gradient(145deg, #3D1E2A 0%, #2D1520 55%, #3A1825 100%)',
              color: '#F0DFE6',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isOpen
                ? '0 4px 14px rgba(45,21,32,0.22)'
                : '0 8px 28px rgba(45,21,32,0.3), 0 2px 8px rgba(45,21,32,0.14), 0 0 0 1px rgba(200,160,174,0.12), inset 0 1px 0 rgba(255,255,255,0.07)',
              cursor: 'pointer', position: 'relative',
              border: '1px solid rgba(200,160,174,0.12)',
              transition: 'box-shadow 0.3s',
            }}
          >
            <AnimatePresence mode="wait">
              {isOpen
                ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={18} /></motion.span>
                : <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><MessageCircle size={18} /></motion.span>
              }
            </AnimatePresence>

            {!isOpen && (
              <span style={{
                position: 'absolute', top: 8, right: 8,
                width: 12, height: 12, borderRadius: '50%',
                background: 'linear-gradient(135deg, #E8AABF, #C8A0AE)',
                border: '2px solid #2D1520',
              }}>
                <motion.span
                  style={{
                    position: 'absolute', inset: -3, borderRadius: '50%',
                    background: 'rgba(200,160,174,0.4)',
                  }}
                  animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />
              </span>
            )}
          </motion.button>
        </motion.div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
