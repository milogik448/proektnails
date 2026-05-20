import { motion } from 'framer-motion'
import { Instagram, MapPin, Clock, ArrowUpRight } from 'lucide-react'

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
        padding: '24px 28px',
        boxShadow: '0 2px 16px rgba(45,21,32,0.04)',
        backdropFilter: 'blur(6px)',
        transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 20px 48px rgba(45,21,32,0.1), 0 0 0 1px rgba(200,160,174,0.32)'
        el.style.borderColor = 'rgba(200,160,174,0.35)'
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
        width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(200,160,174,0.2) 0%, rgba(200,160,174,0.08) 100%)',
        border: '1px solid rgba(200,160,174,0.24)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={17} strokeWidth={1.4} style={{ color: '#B08090' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '9.5px', letterSpacing: '0.32em', textTransform: 'uppercase',
          color: '#A07888', marginBottom: 8, fontFamily: 'Raleway, sans-serif',
        }}>
          {label}
        </div>

        {href ? (
          <a
            href={href} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '15px', fontWeight: 300, color: '#2D1520',
              fontFamily: 'Raleway, sans-serif', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#8B6070' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#2D1520' }}
          >
            {value}
            <ArrowUpRight size={13} style={{ opacity: 0.45 }} />
          </a>
        ) : schedule ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {schedule.map(s => (
              <div key={s} style={{
                fontSize: '14px', color: '#2D1520', lineHeight: '1.9',
                fontWeight: 300, fontFamily: 'Raleway, sans-serif',
              }}>
                {s}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '15px', color: '#2D1520', fontWeight: 300, fontFamily: 'Raleway, sans-serif' }}>
            {value}
          </div>
        )}

        {note && (
          <div style={{
            marginTop: 8, fontSize: '11px', color: '#A07888',
            letterSpacing: '0.03em', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
          }}>
            {note}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function DecorativeOrb() {
  return (
    <div style={{ position: 'relative', width: 270, height: 270, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[0, 28, 56].map((inset, i) => (
        <div key={i} style={{
          position: 'absolute',
          inset, borderRadius: '50%',
          border: `1px solid rgba(200,160,174,${0.14 + i * 0.07})`,
          ...(i === 2 ? {
            background: 'radial-gradient(circle, rgba(200,160,174,0.14) 0%, rgba(200,160,174,0.04) 60%, transparent 100%)',
          } : {}),
        }} />
      ))}

      {/* Compass dots */}
      {[0, 90, 180, 270].map(deg => (
        <div key={deg} style={{
          position: 'absolute', width: 5, height: 5, borderRadius: '50%',
          background: 'rgba(200,160,174,0.45)',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-134px)`,
        }} />
      ))}

      {/* Center */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 34, lineHeight: 1 }}
        >
          💅
        </motion.span>
        <div style={{
          fontSize: '8px', letterSpacing: '0.38em', textTransform: 'uppercase',
          color: '#C8A0AE', fontFamily: 'Raleway, sans-serif',
        }}>
          Nail Studio
        </div>
      </div>
    </div>
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
        background: 'radial-gradient(circle, rgba(200,160,174,0.11) 0%, transparent 65%)',
        transform: 'translate(20%, -25%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '20%', left: 0, width: 340, height: 340,
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,160,174,0.07) 0%, transparent 70%)',
        transform: 'translate(-35%, 0)',
      }} />

      {/* Header */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-10">
        <motion.span {...fadeUp(0)} className="section-tag">{c.tag}</motion.span>
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
            marginTop: 22, height: 1, transformOrigin: 'left',
            background: 'linear-gradient(90deg, rgba(200,160,174,0.55) 0%, rgba(200,160,174,0.18) 45%, transparent 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

          {/* Left column */}
          <div style={{ flex: 1, maxWidth: 480 }}>
            <motion.p
              {...fadeUp(0.1)}
              style={{
                fontSize: '14px', color: '#6B5060', lineHeight: 2,
                letterSpacing: '0.015em', fontFamily: 'Raleway, sans-serif',
                fontWeight: 300, marginBottom: 36,
              }}
            >
              {c.desc}
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {INFO.map(({ Icon, label, value, href, note, schedule }, i) => (
                <ContactCard
                  key={label} Icon={Icon} label={label} value={value}
                  href={href} note={note} schedule={schedule}
                  delay={0.12 + i * 0.1}
                />
              ))}
            </div>

            {/* Instagram button */}
            <motion.div {...fadeUp(0.45)} style={{ marginTop: 40 }}>
              <a
                href="https://www.instagram.com/anjelikaa_nails"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  width: '100%', padding: '17px 32px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #3A1A26 0%, #2D1520 60%, #3D1825 100%)',
                  color: '#F0DFE6',
                  fontSize: '11.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  fontFamily: 'Raleway, sans-serif', fontWeight: 500, textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(45,21,32,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
                  transition: 'all 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  border: '1px solid rgba(200,160,174,0.15)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(45,21,32,0.3), 0 0 0 1px rgba(200,160,174,0.2), inset 0 1px 0 rgba(255,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(45,21,32,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
                }}
              >
                <Instagram size={15} strokeWidth={1.5} />
                {c.btn}
                <ArrowUpRight size={13} style={{ opacity: 0.55 }} />
              </a>

              <div style={{
                textAlign: 'center', marginTop: 13,
                fontSize: '11px', color: '#A07888',
                letterSpacing: '0.06em', fontFamily: 'Raleway, sans-serif',
                fontWeight: 300, fontStyle: 'italic',
              }}>
                {c.responseTime || 'Відповідаємо протягом 5–15 хвилин'}
              </div>
            </motion.div>
          </div>

          {/* Right — decorative */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex flex-col items-center justify-start gap-8"
            style={{ paddingTop: 16, minWidth: 290 }}
          >
            <DecorativeOrb />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(200,160,174,0.35), transparent)' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,160,174,0.5)' }} />
              <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(200,160,174,0.35))' }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '8.5px', letterSpacing: '0.36em', textTransform: 'uppercase',
                color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', marginBottom: 7,
              }}>
                Praha · Czech Republic
              </div>
              <div style={{
                fontSize: '13px', color: '#A07888', fontFamily: 'Raleway, sans-serif',
                fontWeight: 300, fontStyle: 'italic',
              }}>
                @anjelikaa_nails
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
