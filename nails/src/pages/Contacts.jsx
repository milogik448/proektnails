import { motion } from 'framer-motion'
import { Instagram, MapPin, Clock, ArrowUpRight, Sparkles } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Zličín+Praha+5+Czech+Republic'

function BookingPanel({ c }) {
  const openChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'))

  return (
    <div style={{
      background: '#EDE8E1',
      borderRadius: 20,
      padding: '24px 24px',
      border: '1px solid rgba(200,160,174,0.13)',
      boxShadow: '0 8px 32px rgba(45,21,32,0.08), 0 0 0 1px rgba(160,130,110,0.18)',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,160,174,0.14) 0%, transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,160,174,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(140,120,100,0.25), transparent)', pointerEvents: 'none' }} />

      {/* Online status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <div style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
          <span style={{ display: 'block', width: 7, height: 7, borderRadius: '50%', background: '#7ED9A5', boxShadow: '0 0 8px rgba(126,217,165,0.7)' }} />
          <motion.span
            style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'rgba(126,217,165,0.25)' }}
            animate={{ scale: [1, 2.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          />
        </div>
        <span style={{ fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(80,140,80,0.85)', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
          AI assistant online
        </span>
      </div>

      <div style={{ fontSize: '18px', color: '#2D1520', fontFamily: 'DM Serif Display, serif', fontWeight: 400, lineHeight: 1.25, marginBottom: 4 }}>
        {c.ctaTitle}
      </div>
      <div style={{ fontSize: '11.5px', color: '#8A7060', letterSpacing: '0.05em', fontFamily: 'Raleway, sans-serif', fontWeight: 300, marginBottom: 6 }}>
        {c.ctaSubtitle}
      </div>
      <div style={{ fontSize: '11px', color: '#8A7060', fontFamily: 'Raleway, sans-serif', fontWeight: 300, lineHeight: 1.55, borderTop: '1px solid rgba(45,21,32,0.1)', paddingTop: 8, marginBottom: 16 }}>
        Оберіть зручний спосіб запису — AI-чат або Instagram Direct.
      </div>

      {/* AI Button */}
      <motion.button
        onClick={openChat}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%', padding: '11px 16px',
          background: 'rgba(200,160,174,0.16)',
          border: '1px solid rgba(200,160,174,0.28)',
          borderRadius: 14, color: '#F0DFE6',
          display: 'flex', alignItems: 'center', gap: 14,
          cursor: 'pointer', textAlign: 'left', marginBottom: 10,
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.95)'; e.currentTarget.style.borderColor = 'rgba(45,21,32,0.28)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(45,21,32,0.15)' }}
      >
        <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'rgba(45,21,32,0.06)', border: '1px solid rgba(45,21,32,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={14} style={{ color: '#C8A0AE' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#2D1520', fontFamily: 'Raleway, sans-serif' }}>{c.aiBtn}</div>
          <div style={{ fontSize: '11px', color: '#8A7060', fontFamily: 'Raleway, sans-serif', marginTop: 2 }}>{c.aiNote}</div>
        </div>
        <ArrowUpRight size={13} style={{ color: 'rgba(45,21,32,0.35)', flexShrink: 0 }} />
      </motion.button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(45,21,32,0.1)' }} />
        <div style={{ fontSize: '10px', color: 'rgba(45,21,32,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif' }}>{c.orDivider}</div>
        <div style={{ flex: 1, height: 1, background: 'rgba(200,160,174,0.12)' }} />
      </div>

      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/anjelikaa_nails"
        target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        style={{
          width: '100%', padding: '15px 20px',
          background: 'transparent', border: '1px solid rgba(200,160,174,0.18)',
          borderRadius: 14, color: 'rgba(200,160,174,0.75)',
          display: 'flex', alignItems: 'center', gap: 14,
          textDecoration: 'none', transition: 'all 0.25s ease', marginBottom: 12,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(45,21,32,0.28)'; e.currentTarget.style.color = '#2D1520' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,21,32,0.12)'; e.currentTarget.style.color = '#2D1520' }}
      >
        <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'rgba(45,21,32,0.05)', border: '1px solid rgba(45,21,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Instagram size={14} strokeWidth={1.5} style={{ color: '#2D1520' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: 400, fontFamily: 'Raleway, sans-serif' }}>Instagram Direct</div>
          <div style={{ fontSize: '11px', color: '#8A7060', fontFamily: 'Raleway, sans-serif', marginTop: 2 }}>@anjelikaa_nails</div>
        </div>
        <ArrowUpRight size={13} style={{ opacity: 0.35, flexShrink: 0 }} />
      </motion.a>

      <div style={{ fontSize: '10.5px', color: 'rgba(45,21,32,0.4)', textAlign: 'center', letterSpacing: '0.06em', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
        {c.responseTime}
      </div>
    </div>
  )
}

function MiniMap() {
  return (
    <motion.a
      href={MAPS_URL} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.2 }}
      style={{
        display: 'block', borderRadius: 22, overflow: 'hidden',
        border: '1px solid rgba(200,160,174,0.2)',
        boxShadow: '0 8px 36px rgba(45,21,32,0.08)',
        textDecoration: 'none', transition: 'all 0.32s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 56px rgba(45,21,32,0.13)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(45,21,32,0.08)' }}
    >
      {/* Map visual */}
      <div style={{ height: 180, background: 'linear-gradient(145deg, #F6EAF0 0%, #EDE0E8 50%, #F1E5EB 100%)', position: 'relative', overflow: 'hidden' }}>
        {[14,28,42,56,70,84].map(y => <div key={`h${y}`} style={{ position: 'absolute', left: 0, right: 0, top: `${y}%`, height: 1, background: 'rgba(200,160,174,0.16)' }} />)}
        {[10,22,34,46,58,70,82,94].map(x => <div key={`v${x}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${x}%`, width: 1, background: 'rgba(200,160,174,0.16)' }} />)}
        <div style={{ position: 'absolute', top: '44%', left: 0, right: 0, height: 9, background: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(200,160,174,0.16)', borderBottom: '1px solid rgba(200,160,174,0.16)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '47%', width: 10, background: 'rgba(255,255,255,0.48)', borderLeft: '1px solid rgba(200,160,174,0.14)', borderRight: '1px solid rgba(200,160,174,0.14)' }} />
        {[{t:'10%',l:'12%',w:36,h:22},{t:'10%',l:'56%',w:26,h:18},{t:'56%',l:'58%',w:30,h:18},{t:'60%',l:'12%',w:20,h:16}].map((b,i) => (
          <div key={i} style={{ position: 'absolute', top: b.t, left: b.l, width: b.w, height: b.h, borderRadius: 4, background: i%2===0 ? 'rgba(200,160,174,0.2)' : 'rgba(200,160,174,0.14)', border: '1px solid rgba(200,160,174,0.26)' }} />
        ))}
        {/* Pin */}
        <div style={{ position: 'absolute', top: '44%', left: '47%', transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: 'linear-gradient(135deg, #3E1F2B 0%, #2D1520 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(45,21,32,0.5)' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(240,223,230,0.95)', transform: 'rotate(45deg)' }} />
          </div>
          <div style={{ width: 8, height: 3, borderRadius: '50%', background: 'rgba(45,21,32,0.22)', marginTop: 2 }} />
        </div>
        {/* Label */}
        <div style={{ position: 'absolute', top: '18%', left: '52%', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(200,160,174,0.28)', borderRadius: 7, padding: '3px 8px', boxShadow: '0 2px 10px rgba(45,21,32,0.1)' }}>
          <div style={{ fontSize: '8px', fontWeight: 500, color: '#2D1520', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>VELOURA</div>
          <div style={{ fontSize: '7px', color: '#A07888', fontFamily: 'Raleway, sans-serif', whiteSpace: 'nowrap' }}>Zličín · Praha 5</div>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 44%, transparent 30%, rgba(250,247,242,0.28) 100%)', pointerEvents: 'none' }} />
      </div>
      {/* Footer */}
      <div style={{ padding: '16px 22px', background: 'rgba(255,255,255,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 500, color: '#2D1520', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.03em' }}>VELOURA · Zličín</div>
          <div style={{ fontSize: '11px', color: '#A07888', fontFamily: 'Raleway, sans-serif', fontWeight: 300, marginTop: 2 }}>Praha 5 · Czech Republic · Точна адреса після запису</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(160,120,136,0.6)', fontSize: '10px', letterSpacing: '0.1em', fontFamily: 'Raleway, sans-serif', flexShrink: 0 }}>
          <MapPin size={11} />
          Maps ↗
        </div>
      </div>
    </motion.a>
  )
}

export default function Contacts({ t }) {
  const c = t.contacts

  const INFO = [
    { Icon: Instagram, label: c.instagramLabel, value: '@anjelikaa_nails', href: 'https://www.instagram.com/anjelikaa_nails', note: c.instagramNote },
    { Icon: MapPin,    label: c.cityLabel,       value: c.cityVal,         note: c.cityNote },
    { Icon: Clock,     label: c.scheduleLabel,   schedule: c.schedule },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 0.38 }}
      className="min-h-screen"
    >

      {/* ── HERO CARD (same style as Home) ── */}
      <section
        className="relative grid grid-cols-1 lg:grid-cols-[58%_42%] lg:items-start mx-4 md:mx-6 lg:mx-8 mt-4"
        style={{
          background: 'rgba(255,255,255,0.62)',
          border: '1px solid rgba(200,160,174,0.24)',
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: '0 16px 56px rgba(45,21,32,0.09), 0 2px 8px rgba(45,21,32,0.04), inset 0 1px 0 rgba(255,255,255,0.68)',
        }}
      >
        {/* Top shimmer */}
        <div aria-hidden style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, zIndex: 10, background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.5), transparent)' }} />

        {/* LEFT — info */}
        <div className="flex flex-col justify-center px-8 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-20 relative z-10">

          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 400, lineHeight: 0.92,
              color: '#2D1520', letterSpacing: '-0.01em',
              marginTop: '1rem', marginBottom: '1.6rem',
            }}
          >
            {c.title}
            <br />
            <em style={{ fontSize: '0.62em', opacity: 0.55, fontStyle: 'italic' }}>Praha · Czech Republic</em>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px w-14 mb-8 origin-left"
            style={{ backgroundColor: '#C8A0AE' }}
          />

          {/* Info rows */}
          <motion.div {...fadeUp(0.3)} style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: '2rem' }}>
            {INFO.map(({ Icon, label, value, href, note, schedule }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, rgba(200,160,174,0.18), rgba(200,160,174,0.07))', border: '1px solid rgba(200,160,174,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={14} strokeWidth={1.4} style={{ color: '#B08090' }} />
                </div>
                <div>
                  <div style={{ fontSize: '8.5px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#A07888', fontFamily: 'Raleway, sans-serif', marginBottom: 4 }}>{label}</div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '14px', fontWeight: 300, color: '#2D1520', fontFamily: 'Raleway, sans-serif', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#8B6070' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#2D1520' }}
                    >
                      {value} <ArrowUpRight size={11} style={{ opacity: 0.4 }} />
                    </a>
                  ) : schedule ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {schedule.map(s => <div key={s} style={{ fontSize: '13.5px', color: '#2D1520', fontWeight: 300, fontFamily: 'Raleway, sans-serif', lineHeight: 1.8 }}>{s}</div>)}
                    </div>
                  ) : (
                    <div style={{ fontSize: '14px', color: '#2D1520', fontWeight: 300, fontFamily: 'Raleway, sans-serif' }}>{value}</div>
                  )}
                  {note && <div style={{ fontSize: '11px', color: '#A07888', fontFamily: 'Raleway, sans-serif', fontWeight: 300, marginTop: 3 }}>{note}</div>}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p {...fadeUp(0.38)} className="font-light" style={{ fontSize: '13px', color: '#8B6070', letterSpacing: '0.025em', lineHeight: 2, maxWidth: 300 }}>
            {c.desc}
          </motion.p>
        </div>

        {/* RIGHT — booking panel */}
        <div className="relative p-6 lg:p-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ width: '100%', maxWidth: 360, margin: '0 auto' }}
          >
            <BookingPanel c={c} />
          </motion.div>
        </div>
      </section>

      {/* ── BELOW HERO: Map + Studio details ── */}
      <section className="px-4 md:px-6 lg:px-8 pt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">

          {/* Map */}
          <MiniMap />

          {/* Studio identity card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.72)',
              border: '1px solid rgba(200,160,174,0.2)',
              borderRadius: 22, padding: '32px 28px',
              boxShadow: '0 6px 28px rgba(45,21,32,0.07)',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16,
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.38), transparent)' }} />

            <div style={{ fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#C8A0AE', fontFamily: 'Raleway, sans-serif' }}>VELOURA Studio</div>

            <div style={{ fontSize: '24px', fontFamily: 'DM Serif Display, serif', fontWeight: 300, color: '#2D1520', lineHeight: 1.2 }}>
              Zličín, Praha
            </div>

            <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(200,160,174,0.3), transparent)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: Clock, text: 'Пн–Пт 9:00–20:00' },
                { icon: Clock, text: 'Субота 10:00–18:00' },
                { icon: MapPin, text: 'Точна адреса — після запису' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={12} strokeWidth={1.4} style={{ color: '#C8A0AE', flexShrink: 0 }} />
                  <span style={{ fontSize: '12.5px', color: '#6B5060', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(200,160,174,0.3), transparent)' }} />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Premium Nail Studio', 'By appointment only'].map(label => (
                <span key={label} style={{ fontSize: '8.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7A5060', fontFamily: 'Raleway, sans-serif', fontWeight: 500, padding: '5px 12px', borderRadius: 100, background: 'rgba(200,160,174,0.1)', border: '1px solid rgba(200,160,174,0.26)' }}>{label}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
