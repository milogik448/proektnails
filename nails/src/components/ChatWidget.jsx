import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, Loader, Sparkles } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? 'http://localhost:3001/api/chat' : 'https://api-red-nine-21.vercel.app/api/chat')

const WELCOME_TEXT = {
  uk: 'Привіт! 💅 Я AI-асистент VELOURA Studio. Допоможу вам записатись на манікюр або педикюр. Як вас звати?',
  en: 'Hi! 💅 I\'m the VELOURA Studio AI assistant. I\'ll help you book a manicure or pedicure. What\'s your name?',
  cs: 'Ahoj! 💅 Jsem AI asistent VELOURA Studio. Pomohu vám objednat manikúru nebo pedikúru. Jak se jmenujete?',
}

const AI_LABEL       = { uk: 'AI запис',               en: 'AI booking',                    cs: 'AI rezervace' }
const PLACEHOLDER    = { uk: 'Напишіть повідомлення…', en: 'Type a message…',                 cs: 'Napište zprávu…' }
const ERROR_MSG      = {
  uk: 'Вибачте, сталася помилка. Спробуйте ще раз або напишіть у Instagram @anjelikaa_nails.',
  en: 'Sorry, an error occurred. Try again or message us on Instagram @anjelikaa_nails.',
  cs: 'Omlouváme se, došlo k chybě. Zkuste to znovu nebo nám napište na Instagram @anjelikaa_nails.',
}

const WELCOME_VALUES = new Set(Object.values(WELCOME_TEXT))
const makeWelcome = (lang) => ({ role: 'assistant', content: WELCOME_TEXT[lang] ?? WELCOME_TEXT.uk })

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

export default function ChatWidget({ menuOpen = false, lang = 'uk' }) {
  const [isOpen, setIsOpen]     = useState(false)
  const [messages, setMessages] = useState(() => [makeWelcome(lang)])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)
  const bottomRef               = useRef(null)
  const inputRef                = useRef(null)
  const containerRef            = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  // При зміні мови — завжди скидаємо до welcome в новій мові
  useEffect(() => {
    setMessages([makeWelcome(lang)])
  }, [lang])

  // Відкривається з інших частин сайту через custom event
  useEffect(() => {
    const handler = (event) => {
      const service = event.detail?.service
      if (service) {
        setMessages([{
          role: 'assistant',
          content: `Ви хочете записатись на ${service.toLowerCase()} ✨\n\nРадо допоможу підібрати зручний час. Як вас звати?`,
        }])
      }
      setIsOpen(true)
    }
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
      .filter((msg, i) => !(i === 0 && msg.role === 'assistant' && WELCOME_VALUES.has(msg.content)))
      .map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, lang }),
      })
      if (!res.ok) throw new Error(`Server ${res.status}: ${await res.text()}`)
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      console.error('[ChatWidget]', err)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: ERROR_MSG[lang] ?? ERROR_MSG.uk,
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
      position: 'fixed',
      bottom: isMobile ? 20 : 24, top: 'auto',
      right: 16, zIndex: 200,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
      opacity: menuOpen ? 0 : 1,
      pointerEvents: menuOpen ? 'none' : 'auto',
      transition: 'opacity 0.2s ease',
    }}>

      {/* Toggle pill button */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: isOpen ? '10px 16px' : '10px 18px 10px 14px',
          borderRadius: 100,
          background: isOpen ? '#3D1E2A' : '#2D1520',
          border: '1px solid rgba(200,160,174,0.18)',
          boxShadow: isOpen
            ? '0 4px 16px rgba(45,21,32,0.25)'
            : '0 6px 24px rgba(45,21,32,0.32), 0 2px 8px rgba(45,21,32,0.18)',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#3D1E2A' }}
        onMouseLeave={e => { e.currentTarget.style.background = isOpen ? '#3D1E2A' : '#2D1520' }}
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }} style={{ lineHeight: 0, color: '#C8A0AE' }}>
                <X size={14} />
              </motion.span>
            : <motion.span key="spark" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }} style={{ lineHeight: 0, color: '#C8A0AE' }}>
                <Sparkles size={13} />
              </motion.span>
          }
        </AnimatePresence>

        <span style={{
          fontFamily: 'Raleway, sans-serif',
          fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
          fontWeight: 500, color: '#F0DFE6', whiteSpace: 'nowrap',
        }}>
          {isOpen ? 'Закрити' : AI_LABEL[lang] ?? AI_LABEL.uk}
        </span>

        {/* Pulse dot when closed */}
        {!isOpen && (
          <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
            <span style={{ display: 'block', width: 7, height: 7, borderRadius: '50%', background: '#E8AABF' }} />
            <motion.span
              style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: 'rgba(232,170,191,0.5)' }}
              animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </span>
        )}
      </motion.button>

      {/* Chat panel — opens upward */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              width: 340, maxWidth: 'calc(100vw - 32px)',
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(45,21,32,0.16), 0 2px 12px rgba(45,21,32,0.08), 0 0 0 1px rgba(160,100,120,0.14)',
              display: 'flex', flexDirection: 'column',
              background: '#FDF5F7',
              order: -1,
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 18px',
              background: '#F0D8DF',
              borderBottom: '1px solid rgba(160,100,120,0.14)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(45,21,32,0.08)',
                border: '1px solid rgba(160,100,120,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
                  <line x1="9.5" y1="12" x2="14.5" y2="12" stroke="#2D1520" strokeWidth="1.3"/>
                  <line x1="25.5" y1="12" x2="30.5" y2="12" stroke="#2D1520" strokeWidth="1.3"/>
                  <polyline points="11.5,12 20,28.5 28.5,12" stroke="#2D1520" strokeWidth="1.3" fill="none" strokeLinejoin="miter"/>
                  <circle cx="20" cy="28.5" r="1.4" fill="rgba(200,160,174,0.9)"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 600, color: '#2D1520',
                  letterSpacing: '0.18em', fontFamily: 'Raleway, sans-serif',
                }}>
                  VELOURA
                </div>
                <div style={{
                  fontSize: 9.5, color: '#A07888',
                  letterSpacing: '0.08em', fontFamily: 'Raleway, sans-serif',
                  display: 'flex', alignItems: 'center', gap: 5, marginTop: 2,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#A8D8A8', display: 'inline-block' }} />
                  AI асистент · Prague
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ color: '#A07888', cursor: 'pointer', lineHeight: 0, padding: 4, background: 'none', border: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#2D1520'}
                onMouseLeave={e => e.currentTarget.style.color = '#A07888'}
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto',
              padding: '14px 14px 8px',
              maxHeight: 320, minHeight: 180,
              background: 'rgba(242,222,228,0.18)',
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
              padding: '10px 12px',
              borderTop: '1px solid rgba(160,100,120,0.14)',
              background: '#FDF5F7',
              display: 'flex', gap: 8, alignItems: 'flex-end',
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={PLACEHOLDER[lang] ?? PLACEHOLDER.uk}
                rows={1}
                style={{
                  flex: 1, resize: 'none',
                  border: '1px solid rgba(200,160,174,0.3)',
                  borderRadius: 12, padding: '8px 12px',
                  fontSize: 13, fontFamily: 'Raleway, sans-serif',
                  color: '#2D1520', background: 'rgba(255,255,255,0.85)',
                  outline: 'none', lineHeight: 1.5,
                  maxHeight: 88, overflowY: 'auto',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(160,112,128,0.55)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(200,160,174,0.3)' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: input.trim() && !loading ? '#2D1520' : 'rgba(200,160,174,0.25)',
                  color: '#F0DFE6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() && !loading ? 'pointer' : 'default',
                  transition: 'all 0.2s', flexShrink: 0, border: 'none',
                  boxShadow: input.trim() && !loading ? '0 3px 10px rgba(45,21,32,0.22)' : 'none',
                }}
              >
                {loading
                  ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  : <Send size={14} />
                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
