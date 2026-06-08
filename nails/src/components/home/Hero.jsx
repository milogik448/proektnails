import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function TrustStats({ stats, aiBooking, isMobileView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      style={{
        position: 'absolute', bottom: 12, right: 12, zIndex: 3,
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid rgba(160,148,128,0.28)',
        borderRadius: 14,
        padding: isMobileView ? '8px 12px' : '12px 16px',
        boxShadow: '0 8px 28px rgba(45,21,32,0.12)',
        minWidth: isMobileView ? 'auto' : 126,
      }}
    >
      {stats.map(({ num, label }, i) => (
        <div key={label}>
          {i > 0 && <div style={{ height: 1, background: 'rgba(160,148,128,0.22)', margin: isMobileView ? '4px 0' : '8px 0' }} />}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobileView ? 3 : 6 }}>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: isMobileView ? 11 : 19, fontWeight: 300, color: '#2D1520' }}>{num}</span>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: isMobileView ? 3.5 : 7.5, fontWeight: 500, color: '#887060', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</span>
          </div>
        </div>
      ))}
      <div style={{ height: 1, background: 'rgba(160,148,128,0.22)', margin: isMobileView ? '4px 0' : '8px 0' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobileView ? 2.5 : 5 }}>
        <span style={{ width: isMobileView ? 2.5 : 5, height: isMobileView ? 2.5 : 5, borderRadius: '50%', background: '#7ED9A5', boxShadow: '0 0 6px rgba(126,217,165,0.7)', flexShrink: 0, display: 'inline-block' }} />
        <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: isMobileView ? 3.5 : 7.5, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#887060' }}>{aiBooking}</span>
      </div>
    </motion.div>
  )
}

export default function Hero({ t, onNavigate, isMobileView }) {
  const h = t.home
  return (
    <section
      className="relative grid grid-cols-1 lg:grid-cols-[50%_50%] mx-4 md:mx-6 lg:mx-8 mt-4 mb-0"
      style={{
        background: 'rgba(255,255,255,0.62)',
        border: '1px solid rgba(160,148,128,0.24)',
        borderRadius: 32,
        overflow: 'hidden',
        boxShadow: '0 16px 56px rgba(45,21,32,0.09), 0 2px 8px rgba(45,21,32,0.04), inset 0 1px 0 rgba(255,255,255,0.68)',
      }}
    >
      {/* Top shimmer */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, zIndex: 10,
        background: 'linear-gradient(90deg, transparent, rgba(160,148,128,0.5), transparent)',
      }} />

      {/* LEFT — text */}
      <div className="flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 pb-8 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-20 relative z-10">
        <div aria-hidden style={{ position: 'absolute', bottom: '28%', right: '-3%', pointerEvents: 'none', zIndex: 0, lineHeight: 1, overflow: 'hidden' }}>
          <span style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(160px, 20vw, 260px)',
            fontWeight: 400, color: 'rgba(160,148,128,0.07)',
            letterSpacing: '-0.04em', userSelect: 'none', display: 'block', fontStyle: 'italic',
          }}>V</span>
        </div>

        <motion.span {...fadeUp(0.05)} className="section-tag">Praha · Czech Republic</motion.span>

        <motion.h1
          {...fadeUp(0.12)}
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 'clamp(44px, 6.8vw, 96px)',
            fontWeight: 400, lineHeight: 0.9, color: '#2D1520',
            letterSpacing: '-0.01em', marginTop: '1rem', marginBottom: '1.8rem',
          }}
        >
          NAILS<br /><em>BY VELOURA</em>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px w-14 mb-8 origin-left"
          style={{ backgroundColor: '#A09278' }}
        />

        <motion.p
          {...fadeUp(0.36)}
          className="font-medium leading-[2] max-w-[280px]"
          style={{ fontSize: '13px', color: '#3D2818', letterSpacing: '0.025em', marginBottom: '1.8rem' }}
        >
          {h.desc}
        </motion.p>

        <motion.div {...fadeUp(0.44)} className="flex flex-row gap-3">
          <button onClick={() => onNavigate('contacts')} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={12} />
            {h.btn1}
          </button>
          <button onClick={() => onNavigate('services')} className="btn-outline">
            {h.btn2}
          </button>
        </motion.div>
      </div>

      {/* RIGHT — photo */}
      <div className="relative min-h-[300px] lg:min-h-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute', top: 20, right: 20, bottom: 24, left: 20,
            overflow: 'hidden', borderRadius: 20,
            boxShadow: '0 14px 44px rgba(45,21,32,0.14), 0 2px 8px rgba(45,21,32,0.06)',
            zIndex: 1,
          }}
        >
          <img
            src="/images/works/studio.png"
            alt="VELOURA Studio Prague"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '28%',
            background: 'linear-gradient(to right, rgba(250,247,242,0.88) 0%, rgba(250,247,242,0.2) 60%, transparent 100%)',
            zIndex: 2,
          }} />
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(45,21,32,0.14) 100%)',
            zIndex: 2,
          }} />

          <TrustStats stats={h.heroStats} aiBooking={h.aiBooking} isMobileView={isMobileView} />

          <div style={{
            position: 'absolute', bottom: 18, left: 18, zIndex: 3,
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 100,
            background: 'rgba(250,247,242,0.96)',
            border: '1px solid rgba(160,148,128,0.4)',
            fontSize: '9px', fontFamily: 'Raleway, sans-serif',
            fontWeight: 600, letterSpacing: '0.24em',
            textTransform: 'uppercase', color: '#2D1520',
          }}>
            VELOURA · Praha
          </div>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute', bottom: -18, left: 20, right: 20, height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(160,148,128,0.48), transparent)',
              transformOrigin: 'center', zIndex: 0,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}