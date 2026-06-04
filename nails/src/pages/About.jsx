import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Heart, Feather, MapPin, Images, Check } from 'lucide-react'

const TRUST_ICONS = [ShieldCheck, Sparkles, Heart, Feather]


const PERKS = [
  'Premium матеріали',
  'Стерильність 100%',
  'AI запис онлайн',
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
})

function SkillTag({ label }) {
  return (
    <span
      className="inline-flex items-center px-4 py-2 text-[10.5px] tracking-[0.1em] font-light cursor-default transition-all duration-300"
      style={{ border: '1px solid rgba(200,160,174,0.35)', color: '#8B6070', borderRadius: 100 }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#2D1520'
        e.currentTarget.style.color = '#F6EBF0'
        e.currentTarget.style.borderColor = '#2D1520'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.color = '#8B6070'
        e.currentTarget.style.borderColor = 'rgba(200,160,174,0.35)'
      }}
    >
      {label}
    </span>
  )
}

export default function About({ onNavigate, t }) {
  const a = t.about
  const [photoHovered, setPhotoHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 0.38 }}
    >
      {/* ══════════════════════════════════════════════
          3-COLUMN: [text] [photo] [stats+card]
      ══════════════════════════════════════════════ */}
      <section
        className="grid grid-cols-1 lg:grid-cols-[1fr_480px_220px] xl:grid-cols-[1fr_540px_240px] 2xl:grid-cols-[1fr_580px_260px]"
        style={{ minHeight: '92vh', padding: '40px 36px 56px', gap: 28, maxWidth: 1520, width: '100%' }}
      >

        {/* ══ COL 1: TEXT ══ */}
        <div className="flex flex-col justify-start" style={{ paddingTop: 8, paddingRight: 12 }}>

          {/* Eyebrow */}
          <motion.div {...fadeUp(0.05)} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: '#C8A0AE' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
              VELOURA Studio · Praha
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(44px, 5.5vw, 80px)',
              fontWeight: 400, lineHeight: 0.9,
              color: '#2D1520', letterSpacing: '-0.025em',
              marginBottom: '1.6rem',
            }}
          >
            {a.name}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 1, width: 56, backgroundColor: '#C8A0AE', marginBottom: '2rem', transformOrigin: 'left' }}
          />

          {/* Mobile-only photo */}
          <motion.div
            className="block lg:hidden"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ borderRadius: 20, overflow: 'hidden', marginBottom: '2rem', height: 340, position: 'relative' }}
          >
            <img
              src="/images/master.jpg"
              alt={a.name}
              loading="eager"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 8%' }}
            />
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(45,21,32,0.2) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 14, right: 14 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100, background: 'rgba(45,21,32,0.72)', backdropFilter: 'blur(8px)', fontSize: '8px', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(246,235,240,0.9)' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#7ED9A5', boxShadow: '0 0 5px rgba(126,217,165,0.9)', display: 'inline-block' }} />
                Nail Master
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div {...fadeUp(0.3)} style={{ marginBottom: '2rem' }}>
            {a.bio.map((p, i) => (
              <p key={i} style={{ fontSize: '13.5px', color: '#6B5060', lineHeight: 2.1, letterSpacing: '0.015em', fontWeight: 300, marginBottom: 8 }}>
                {p}
              </p>
            ))}
          </motion.div>

          {/* Branded Quote */}
          <motion.div
            {...fadeUp(0.38)}
            style={{
              marginBottom: '2rem',
              padding: '18px 20px',
              background: 'linear-gradient(120deg, rgba(200,160,174,0.08), rgba(250,247,242,0.18))',
              borderLeft: '2px solid #C8A0AE',
              borderRadius: '0 12px 12px 0',
            }}
          >
            <p style={{ fontFamily: 'DM Serif Display, serif', fontStyle: 'italic', fontSize: 'clamp(14px, 1.4vw, 17px)', color: '#2D1520', fontWeight: 400, lineHeight: 1.6, marginBottom: 8 }}>
              "Краса починається з деталей"
            </p>
            <span style={{ fontSize: '9.5px', letterSpacing: '0.16em', color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', textTransform: 'uppercase' }}>
              — Анжеліка, Nail Master
            </span>
          </motion.div>

          {/* Trust badges */}
          <motion.div {...fadeUp(0.44)} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.6rem' }}>
            {a.trust.map(({ label }, i) => {
              const Icon = TRUST_ICONS[i]
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 13px', borderRadius: 100, background: 'rgba(200,160,174,0.1)', border: '1px solid rgba(200,160,174,0.22)' }}>
                  <Icon size={11} strokeWidth={1.4} style={{ color: '#C8A0AE' }} />
                  <span style={{ fontSize: '10.5px', color: '#5A4050', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>{label}</span>
                </div>
              )
            })}
          </motion.div>

          {/* Skills */}
          <motion.div {...fadeUp(0.5)} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '2.4rem' }}>
            {a.skills.map(skill => <SkillTag key={skill} label={skill} />)}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.56)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            <button
              onClick={() => onNavigate('contacts')}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              {a.bookBtn} <ArrowRight size={12} />
            </button>
            <a
              href="https://www.instagram.com/anjelikaa_nails"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 100,
                background: 'transparent', border: '1px solid rgba(45,21,32,0.22)',
                fontSize: '10.5px', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#2D1520', fontFamily: 'Raleway, sans-serif', fontWeight: 400,
                cursor: 'pointer', transition: 'all 0.28s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45,21,32,0.06)'; e.currentTarget.style.borderColor = 'rgba(45,21,32,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(45,21,32,0.22)' }}
            >
              <Images size={12} /> Переглянути роботи
            </a>
          </motion.div>

          {/* Location */}
          <motion.div {...fadeUp(0.62)} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 24 }}>
            <MapPin size={12} style={{ color: '#C8A0AE', strokeWidth: 1.5 }} />
            <span style={{ fontSize: '11.5px', color: '#A07888', fontFamily: 'Raleway, sans-serif', fontWeight: 300, letterSpacing: '0.04em' }}>
              Praha, Česká republika
            </span>
          </motion.div>

          {/* Luxury card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: '20px 22px',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.72), rgba(250,247,242,0.3))',
              border: '1px solid rgba(200,160,174,0.25)',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(45,21,32,0.06), inset 0 1px 0 rgba(255,255,255,0.7)',
              display: 'inline-flex', flexDirection: 'column', gap: 0,
            }}
          >
            <div style={{ fontSize: '8.5px', letterSpacing: '0.36em', textTransform: 'uppercase', color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', marginBottom: 14 }}>
              Стандарти
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PERKS.map((perk) => (
                <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(200,160,174,0.2), rgba(200,160,174,0.08))',
                    border: '1px solid rgba(200,160,174,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={10} style={{ color: '#B08898', strokeWidth: 2 }} />
                  </div>
                  <span style={{ fontSize: '11.5px', color: '#4A3040', fontFamily: 'Raleway, sans-serif', fontWeight: 300, letterSpacing: '0.02em' }}>
                    {perk}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══ COL 2: PHOTO ══ */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 1.04, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPhotoHovered(true)}
          onMouseLeave={() => setPhotoHovered(false)}
          style={{
            position: 'relative',
            borderRadius: 28,
            overflow: 'hidden',
            cursor: 'default',
            minHeight: 320,
            boxShadow: photoHovered
              ? '0 0 80px rgba(200,160,174,0.38), 0 32px 64px rgba(45,21,32,0.18)'
              : '0 0 50px rgba(200,160,174,0.2), 0 20px 48px rgba(45,21,32,0.12)',
            transition: 'box-shadow 0.6s ease',
          }}
        >
          {/* Premium inner border */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: 28, border: '1px solid rgba(255,255,255,0.22)', zIndex: 5, pointerEvents: 'none' }} />

          <img
            src="/images/master.jpg"
            alt={a.name}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 8%',
              display: 'block',
              transform: photoHovered ? 'scale(1.025)' : 'scale(1)',
              transition: 'transform 0.9s cubic-bezier(0.22,1,0.36,1)',
            }}
          />

          {/* Bottom gradient */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(45,21,32,0.28) 100%)', zIndex: 2 }} />
          {/* Top soft glow */}
          <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom, rgba(200,160,174,0.07), transparent)', zIndex: 2 }} />

          {/* Nail Master badge */}
          <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 16px', borderRadius: 100, background: 'rgba(45,21,32,0.72)', backdropFilter: 'blur(12px)', border: '1px solid rgba(200,160,174,0.25)', fontSize: '9px', fontFamily: 'Raleway, sans-serif', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(246,235,240,0.92)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7ED9A5', boxShadow: '0 0 6px rgba(126,217,165,0.9)', display: 'inline-block' }} />
              Nail Master
            </div>
          </div>


          {/* Corner accents */}
          <div aria-hidden style={{ position: 'absolute', top: 18, right: 18, zIndex: 5, pointerEvents: 'none' }}>
            <div style={{ width: 22, height: 1, background: 'rgba(250,247,242,0.6)', position: 'absolute', top: 0, right: 0 }} />
            <div style={{ width: 1, height: 22, background: 'rgba(250,247,242,0.6)', position: 'absolute', top: 0, right: 0 }} />
          </div>
          <div aria-hidden style={{ position: 'absolute', bottom: 18, left: 18, zIndex: 5, pointerEvents: 'none' }}>
            <div style={{ width: 22, height: 1, background: 'rgba(250,247,242,0.6)', position: 'absolute', bottom: 0, left: 0 }} />
            <div style={{ width: 1, height: 22, background: 'rgba(250,247,242,0.6)', position: 'absolute', bottom: 0, left: 0 }} />
          </div>
        </motion.div>

        {/* ══ COL 3: STATS + LUXURY CARD ══ */}
        <div className="flex flex-col justify-between" style={{ paddingTop: 8, paddingBottom: 0 }}>

        </div>

      </section>
    </motion.div>
  )
}
