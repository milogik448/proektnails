import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-30px' },
  transition:  { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

/* ── Tiny reusable components ──────────────────────────────── */

function Stars({ count, size = 11 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i} size={size}
          fill={i < count ? '#C8A0AE' : 'none'}
          stroke={i < count ? '#C8A0AE' : 'rgba(200,160,174,0.3)'}
          strokeWidth={1.4}
        />
      ))}
    </div>
  )
}

function NavButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(200,160,174,0.35)', color: '#C8A0AE',
        borderRadius: 10, background: 'transparent',
        cursor: 'pointer', transition: 'all 0.28s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#2D1520'
        e.currentTarget.style.borderColor = '#2D1520'
        e.currentTarget.style.color = '#F6EBF0'
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(45,21,32,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(200,160,174,0.35)'
        e.currentTarget.style.color = '#C8A0AE'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

/* ── Decorative floating star ─────────────────────────────── */
function DecoStar({ style }) {
  return (
    <div aria-hidden style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <Star size={style.size || 14} fill="rgba(200,160,174,0.22)" stroke="rgba(200,160,174,0.22)" strokeWidth={1} />
    </div>
  )
}

/* ── Featured (large) review card ─────────────────────────── */
function FeaturedReview({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        backgroundColor: 'rgba(255,255,255,0.78)',
        border: '1px solid rgba(200,160,174,0.18)',
        borderRadius: 24,
        padding: '36px 38px 32px',
        boxShadow: '0 12px 48px rgba(45,21,32,0.09), 0 2px 8px rgba(45,21,32,0.05)',
        backdropFilter: 'blur(16px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Inner top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.35), transparent)',
      }} />

      {/* Decorative quote */}
      <div style={{
        fontSize: 96, fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
        color: 'rgba(200,160,174,0.15)', lineHeight: 0.75, fontWeight: 300,
        marginBottom: 8, userSelect: 'none',
      }}>
        "
      </div>

      <p style={{
        fontSize: 'clamp(15px, 1.8vw, 19px)',
        color: '#2D1520', fontFamily: 'Playfair Display, serif', fontWeight: 400,
        lineHeight: 1.82, marginBottom: 30,
      }}>
        {review.text}
      </p>

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #3D1E2A, #2D1520)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(45,21,32,0.22)',
          }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: '#F6EBF0', fontWeight: 300 }}>
              {review.name[0]}
            </span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1520', letterSpacing: '0.02em', fontFamily: 'Raleway, sans-serif' }}>
              {review.name}
            </div>
            <div style={{ fontSize: 9.5, color: '#A07888', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif', marginTop: 3 }}>
              {review.city} · {review.date}
            </div>
          </div>
        </div>
        <Stars count={review.stars} size={13} />
      </div>
    </motion.div>
  )
}

/* ── Compact clickable review card ────────────────────────── */
function ReviewCard({ review, isActive, onClick, delay }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      style={{
        backgroundColor: isActive ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.64)',
        border: `1px solid ${isActive ? 'rgba(200,160,174,0.45)' : 'rgba(200,160,174,0.16)'}`,
        borderRadius: 20,
        padding: '24px 26px',
        boxShadow: isActive
          ? '0 18px 48px rgba(45,21,32,0.11), 0 2px 8px rgba(45,21,32,0.06)'
          : '0 2px 12px rgba(45,21,32,0.04)',
        backdropFilter: 'blur(12px)',
        textAlign: 'left', width: '100%', cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,21,32,0.09)'
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.3)'
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.84)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(45,21,32,0.04)'
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.16)'
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.64)'
        }
      }}
    >
      {/* Active indicator top line */}
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.6), transparent)',
        }} />
      )}

      <Stars count={review.stars} />
      <p style={{
        fontSize: 12.5, color: '#6B5060', lineHeight: 1.9,
        fontFamily: 'Raleway, sans-serif', fontWeight: 300,
        marginTop: 12, marginBottom: 12,
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {review.text}
      </p>
      <div style={{
        fontSize: 9.5, color: '#A07888', letterSpacing: '0.2em',
        textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
      }}>
        {review.name} · {review.date}
      </div>
    </motion.button>
  )
}

/* ── Trust panel (right column) ───────────────────────────── */
function TrustCard({ t }) {
  const STATS = [
    { value: '200+', label: t.reviews.stat1 || 'задоволених клієнтів' },
    { value: '5.0',  label: t.reviews.stat2 || 'середній рейтинг' },
    { value: '90%',  label: t.reviews.stat3 || 'повертаються знову' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: 'linear-gradient(150deg, #3D1E2A 0%, #2D1520 50%, #391723 100%)',
        borderRadius: 24,
        padding: '36px 30px',
        border: '1px solid rgba(200,160,174,0.12)',
        boxShadow: '0 36px 80px rgba(45,21,32,0.22), 0 0 0 1px rgba(200,160,174,0.07), inset 0 1px 0 rgba(255,255,255,0.06)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,160,174,0.14), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,160,174,0.08), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Top label */}
      <div style={{
        fontSize: 8.5, letterSpacing: '0.38em', textTransform: 'uppercase',
        color: 'rgba(200,160,174,0.5)', fontFamily: 'Raleway, sans-serif', marginBottom: 8,
      }}>
        VELOURA Studio
      </div>

      {/* Title */}
      <div style={{
        fontSize: 20, color: '#F0DFE6',
        fontFamily: 'Playfair Display, serif', fontWeight: 400, marginBottom: 6,
      }}>
        Довіра клієнтів
      </div>

      {/* Stars + verified */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 26, flexWrap: 'wrap' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} fill="#C8A0AE" stroke="#C8A0AE" strokeWidth={1.4} />
        ))}
        <span style={{
          fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(200,160,174,0.45)', fontFamily: 'Raleway, sans-serif', marginLeft: 8,
        }}>
          Verified reviews
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 28 }}>
        {STATS.map(({ value, label }, i) => (
          <div key={label}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, paddingTop: 15, paddingBottom: 15 }}>
              <div style={{
                fontSize: 28, color: '#F0DFE6',
                fontFamily: 'Playfair Display, serif', fontWeight: 400, lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{
                fontSize: 11, color: 'rgba(200,160,174,0.55)',
                fontFamily: 'Raleway, sans-serif', fontWeight: 300,
              }}>
                {label}
              </div>
            </div>
            {i < STATS.length - 1 && (
              <div style={{ height: 1, background: 'rgba(200,160,174,0.1)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(200,160,174,0.12)', marginBottom: 22 }} />

      {/* Italic quote with left border */}
      <div style={{ position: 'relative', paddingLeft: 16 }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
          background: 'linear-gradient(180deg, rgba(200,160,174,0.6), rgba(200,160,174,0.08))',
          borderRadius: 2,
        }} />
        <p style={{
          fontSize: 12.5, color: 'rgba(240,223,230,0.52)',
          fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
          lineHeight: 1.85, fontWeight: 300,
        }}>
          Кожен відгук — це результат акуратної роботи, комфорту та уваги до деталей.
        </p>
      </div>
    </motion.div>
  )
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Reviews({ t }) {
  const r = t.reviews
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c === 0 ? r.items.length - 1 : c - 1))
  const next = () => setCurrent(c => (c === r.items.length - 1 ? 0 : c + 1))

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.38 }}
      className="min-h-screen relative"
    >
      {/* ── Background decorations ────────────────────────────── */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>

        {/* Primary gradient blobs */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 580, height: 580, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,160,174,0.13) 0%, transparent 62%)',
          transform: 'translate(28%, -32%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: 0, width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,160,174,0.09) 0%, transparent 68%)',
          transform: 'translate(-42%, 0)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '30%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,220,228,0.28) 0%, transparent 65%)',
        }} />
        {/* Burgundy accent glow */}
        <div style={{
          position: 'absolute', bottom: '25%', right: '8%', width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,30,42,0.07) 0%, transparent 65%)',
        }} />

        {/* Decorative large background quote */}
        <div style={{
          position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)',
          fontSize: 'clamp(200px, 28vw, 360px)',
          fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontWeight: 300,
          color: 'rgba(200,160,174,0.055)', lineHeight: 1, userSelect: 'none',
          letterSpacing: '-0.04em',
        }}>
          "
        </div>

        {/* Floating stars */}
        <DecoStar style={{ top: '12%', left: '7%', size: 16, opacity: 0.9 }} />
        <DecoStar style={{ top: '22%', right: '14%', size: 11, opacity: 0.7 }} />
        <DecoStar style={{ top: '55%', left: '3%', size: 9, opacity: 0.6 }} />
        <DecoStar style={{ bottom: '28%', right: '5%', size: 14, opacity: 0.8 }} />
        <DecoStar style={{ bottom: '12%', left: '18%', size: 10, opacity: 0.5 }} />

        {/* SVG grain texture */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.028 }}>
          <filter id='rv-noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch' />
            <feColorMatrix type='saturate' values='0' />
          </filter>
          <rect width='100%' height='100%' filter='url(#rv-noise)' />
        </svg>
      </div>

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-10" style={{ textAlign: 'center' }}>
        <motion.span
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-tag" style={{ display: 'block', textAlign: 'center' }}
        >
          {r.tag}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.06 }}
          className="font-serif font-light"
          style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', color: '#2D1520', letterSpacing: '-0.01em', lineHeight: 1.05 }}
        >
          {r.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          style={{
            fontSize: '10.5px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', fontWeight: 300, marginTop: 12,
          }}
        >
          Praha · Verified Reviews
        </motion.p>

        {/* Stars row under subtitle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 5, marginTop: 14 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill="rgba(200,160,174,0.5)" stroke="rgba(200,160,174,0.5)" strokeWidth={1.2} />
          ))}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.24 }}
          style={{
            height: 1, maxWidth: 200, margin: '18px auto 0',
            background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.55), transparent)',
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pb-20">
        <div style={{ maxWidth: 1020, margin: '0 auto' }}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

            {/* Left — featured + grid */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Featured review */}
              <AnimatePresence mode="wait">
                <FeaturedReview key={current} review={r.items[current]} />
              </AnimatePresence>

              {/* Nav controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 32 }}>
                <NavButton onClick={prev}><ChevronLeft size={15} /></NavButton>
                <NavButton onClick={next}><ChevronRight size={15} /></NavButton>
                <span style={{
                  fontSize: 9.5, letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', marginLeft: 6,
                }}>
                  {current + 1} / {r.items.length}
                </span>
              </div>

              {/* Review cards — 2-col on tablet+, 1-col on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {r.items.map((review, i) => (
                  <ReviewCard
                    key={i} review={review}
                    isActive={current === i}
                    onClick={() => setCurrent(i)}
                    delay={i * 0.07}
                  />
                ))}
              </div>
            </div>

            {/* Right — trust panel */}
            <div style={{ width: '100%', maxWidth: 320, flexShrink: 0 }} className="lg:sticky lg:top-8">
              <TrustCard t={t} />
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom decorative tagline ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 pb-16"
        style={{ textAlign: 'center' }}
      >
        <div style={{
          height: 1, maxWidth: 280, margin: '0 auto 22px',
          background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.35), transparent)',
        }} />
        <p style={{
          fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(160,120,136,0.45)', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
        }}>
          VELOURA · Praha · Czech Republic
        </p>
        <p style={{
          fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontWeight: 300,
          fontSize: '13px', color: 'rgba(45,21,32,0.3)', marginTop: 6, letterSpacing: '0.04em',
        }}>
          Краса у деталях
        </p>
      </motion.div>

    </motion.div>
  )
}
