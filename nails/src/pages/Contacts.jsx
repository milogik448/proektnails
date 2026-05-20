import { motion } from 'framer-motion'
import { Instagram, MapPin, Clock, ArrowUpRight, Sparkles } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-30px' },
  transition:  { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function ContactCard({ Icon, label, value, href, note, schedule, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        backgroundColor: 'rgba(255,255,255,0.65)',
        border: '1px solid rgba(200,160,174,0.18)',
        borderRadius: '18px',
        padding: '22px 26px',
        boxShadow: '0 2px 16px rgba(45,21,32,0.04)',
        backdropFilter: 'blur(6px)',
        transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 18,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 16px 40px rgba(45,21,32,0.08), 0 0 0 1px rgba(200,160,174,0.3)'
        el.style.borderColor = 'rgba(200,160,174,0.32)'
        el.style.backgroundColor = 'rgba(255,255,255,0.88)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 2px 16px rgba(45,21,32,0.04)'
        el.style.borderColor = 'rgba(200,160,174,0.18)'
        el.style.backgroundColor = 'rgba(255,255,255,0.65)'
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(200,160,174,0.18) 0%, rgba(200,160,174,0.07) 100%)',
        border: '1px solid rgba(200,160,174,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={16} strokeWidth={1.4} style={{ color: '#B08090' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase',
          color: '#A07888', marginBottom: 7, fontFamily: 'Raleway, sans-serif',
        }}>
          {label}
        </div>

        {href ? (
          <a
            href={href} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '14.5px', fontWeight: 300, color: '#2D1520',
              fontFamily: 'Raleway, sans-serif', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#8B6070' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#2D1520' }}
          >
            {value}
            <ArrowUpRight size={12} style={{ opacity: 0.4 }} />
          </a>
        ) : schedule ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {schedule.map(s => (
              <div key={s} style={{
                fontSize: '13.5px', color: '#2D1520', lineHeight: '1.85',
                fontWeight: 300, fontFamily: 'Raleway, sans-serif',
              }}>
                {s}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '14.5px', color: '#2D1520', fontWeight: 300, fontFamily: 'Raleway, sans-serif' }}>
            {value}
          </div>
        )}

        {note && (
          <div style={{
            marginTop: 7, fontSize: '11px', color: '#A07888',
            letterSpacing: '0.03em', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
          }}>
            {note}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function BookingCard({ c }) {
  const openChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'))

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.75, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: 'linear-gradient(150deg, #3D1E2A 0%, #2D1520 55%, #3A1825 100%)',
        borderRadius: 24,
        padding: '36px 32px',
        border: '1px solid rgba(200,160,174,0.14)',
        boxShadow: '0 28px 72px rgba(45,21,32,0.22), 0 4px 20px rgba(45,21,32,0.14), inset 0 1px 0 rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,160,174,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 32, lineHeight: 1, display: 'block', marginBottom: 16 }}
        >
          💅
        </motion.span>
        <div style={{
          fontSize: '20px', color: '#F0DFE6',
          fontFamily: 'Playfair Display, serif', fontWeight: 400,
          lineHeight: 1.3, marginBottom: 8,
        }}>
          {c.ctaTitle}
        </div>
        <div style={{
          fontSize: '12px', color: 'rgba(200,160,174,0.6)',
          letterSpacing: '0.06em', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
        }}>
          {c.ctaSubtitle}
        </div>
      </div>

      {/* AI Button */}
      <motion.button
        onClick={openChat}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%', padding: '16px 20px',
          background: 'rgba(200,160,174,0.16)',
          border: '1px solid rgba(200,160,174,0.28)',
          borderRadius: 14,
          color: '#F0DFE6',
          display: 'flex', alignItems: 'center', gap: 14,
          cursor: 'pointer',
          textAlign: 'left',
          marginBottom: 12,
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(200,160,174,0.24)'
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.42)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(200,160,174,0.16)'
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.28)'
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(200,160,174,0.18)',
          border: '1px solid rgba(200,160,174,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkles size={15} style={{ color: '#C8A0AE' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '13.5px', fontWeight: 500, color: '#F0DFE6',
            fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em',
          }}>
            {c.aiBtn}
          </div>
          <div style={{
            fontSize: '11px', color: 'rgba(200,160,174,0.55)',
            fontFamily: 'Raleway, sans-serif', marginTop: 2,
          }}>
            {c.aiNote}
          </div>
        </div>
        <ArrowUpRight size={14} style={{ color: 'rgba(200,160,174,0.45)', flexShrink: 0 }} />
      </motion.button>

      {/* Divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 12,
      }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(200,160,174,0.12)' }} />
        <div style={{
          fontSize: '10px', color: 'rgba(200,160,174,0.35)',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: 'Raleway, sans-serif',
        }}>
          {c.orDivider}
        </div>
        <div style={{ flex: 1, height: 1, background: 'rgba(200,160,174,0.12)' }} />
      </div>

      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/anjelikaa_nails"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%', padding: '16px 20px',
          background: 'transparent',
          border: '1px solid rgba(200,160,174,0.18)',
          borderRadius: 14,
          color: 'rgba(200,160,174,0.75)',
          display: 'flex', alignItems: 'center', gap: 14,
          textDecoration: 'none',
          transition: 'all 0.25s ease',
          marginBottom: 24,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.32)'
          e.currentTarget.style.color = 'rgba(200,160,174,0.95)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.18)'
          e.currentTarget.style.color = 'rgba(200,160,174,0.75)'
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(200,160,174,0.1)',
          border: '1px solid rgba(200,160,174,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Instagram size={15} strokeWidth={1.5} style={{ color: 'rgba(200,160,174,0.7)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '13.5px', fontWeight: 400,
            fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em',
          }}>
            Instagram Direct
          </div>
          <div style={{
            fontSize: '11px', color: 'rgba(200,160,174,0.4)',
            fontFamily: 'Raleway, sans-serif', marginTop: 2,
          }}>
            @anjelikaa_nails
          </div>
        </div>
        <ArrowUpRight size={14} style={{ opacity: 0.35, flexShrink: 0 }} />
      </motion.a>

      {/* Response time */}
      <div style={{
        fontSize: '10.5px', color: 'rgba(200,160,174,0.35)',
        textAlign: 'center', letterSpacing: '0.06em',
        fontFamily: 'Raleway, sans-serif', fontWeight: 300,
      }}>
        {c.responseTime}
      </div>
    </motion.div>
  )
}

export default function Contacts({ t }) {
  const c = t.contacts

  const INFO = [
    { Icon: Instagram, label: c.instagramLabel, value: '@anjelikaa_nails', href: 'https://www.instagram.com/anjelikaa_nails', note: c.instagramNote },
    { Icon: MapPin,    label: c.cityLabel,       value: c.cityVal,         href: null,                                        note: c.cityNote },
    { Icon: Clock,     label: c.scheduleLabel,   value: null,              href: null,                                        note: null, schedule: c.schedule },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.38 }}
      className="min-h-screen relative"
    >
      {/* Glows */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0, width: 520, height: 520,
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,160,174,0.1) 0%, transparent 65%)',
        transform: 'translate(20%, -25%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '20%', left: 0, width: 340, height: 340,
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,160,174,0.07) 0%, transparent 70%)',
        transform: 'translate(-35%, 0)',
      }} />

      {/* Header — centered */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-10" style={{ textAlign: 'center' }}>
        <motion.span
          {...fadeUp(0)}
          className="section-tag"
          style={{ display: 'block', textAlign: 'center' }}
        >
          {c.tag}
        </motion.span>
        <motion.h1
          {...fadeUp(0.05)}
          className="font-serif font-light leading-none"
          style={{ fontSize: 'clamp(42px, 7vw, 88px)', color: '#2D1520' }}
        >
          {c.title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: 22, height: 1, maxWidth: 260, margin: '22px auto 0',
            background: 'linear-gradient(90deg, transparent 0%, rgba(200,160,174,0.6) 35%, rgba(200,160,174,0.6) 65%, transparent 100%)',
          }}
        />
      </div>

      {/* Content — centered container */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pb-20">
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Description — centered */}
          <motion.p
            {...fadeUp(0.1)}
            style={{
              fontSize: '14px', color: '#6B5060', lineHeight: 2,
              letterSpacing: '0.015em', fontFamily: 'Raleway, sans-serif',
              fontWeight: 300, marginBottom: 40,
              textAlign: 'center', maxWidth: 540, margin: '0 auto 40px',
            }}
          >
            {c.desc}
          </motion.p>

          {/* Two columns — centered as a unit */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start justify-center">

            {/* Left — contact cards */}
            <div style={{ flex: 1, maxWidth: 460, width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {INFO.map(({ Icon, label, value, href, note, schedule }, i) => (
                  <ContactCard
                    key={label} Icon={Icon} label={label} value={value}
                    href={href} note={note} schedule={schedule}
                    delay={0.12 + i * 0.09}
                  />
                ))}
              </div>
            </div>

            {/* Right — booking CTA */}
            <div style={{ width: '100%', maxWidth: 360, flexShrink: 0 }} className="lg:sticky lg:top-8">
              <BookingCard c={c} />
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}
