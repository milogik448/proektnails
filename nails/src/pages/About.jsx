import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Heart, Feather, Target, Clock, User, Wand2 } from 'lucide-react'

const TRUST_ICONS = [ShieldCheck, Sparkles, Heart, Feather]

const RETURN_CARDS = [
  { Icon: Target,  title: 'Акуратність у деталях',   desc: 'Рівні краї, бездоганне покриття та ідеальна форма — результат, який ви помітите одразу.' },
  { Icon: Clock,   title: 'Довготривалий результат', desc: 'Покриття тримається тижнями без сколів та втрати блиску — робота, яка говорить сама за себе.' },
  { Icon: User,    title: 'Індивідуальний підхід',   desc: 'Враховую форму нігтів, стиль та бажання кожної клієнтки. Ваш результат — унікальний.' },
  { Icon: Wand2,   title: 'Сучасні техніки',         desc: 'Постійно слідкую за трендами та вдосконалюю майстерність — актуальні технології та стилі.' },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function SkillTag({ label }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 text-[10.5px] tracking-[0.1em] font-light cursor-default transition-all duration-300"
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
        className="relative grid grid-cols-1 lg:grid-cols-[55%_45%] mx-4 md:mx-6 lg:mx-8 mt-4"
        style={{
          background: 'rgba(255,255,255,0.62)',
          border: '1px solid rgba(200,160,174,0.24)',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 16px 56px rgba(45,21,32,0.09), 0 2px 8px rgba(45,21,32,0.04), inset 0 1px 0 rgba(255,255,255,0.68)',
          maxWidth: 1100,
        }}
      >
        {/* Top shimmer */}
        <div aria-hidden style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, zIndex: 10, background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.5), transparent)' }} />

        {/* LEFT — text */}
        <div className="flex flex-col justify-center px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 pt-7 pb-7 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12 relative z-10">

          <motion.span {...fadeUp(0.05)} className="section-tag">{a.masterTag}</motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(38px, 5.5vw, 76px)',
              fontWeight: 400, lineHeight: 0.95,
              color: '#2D1520', letterSpacing: '-0.01em',
              marginTop: '0.8rem', marginBottom: '0.6rem',
            }}
          >
            {a.name}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px w-14 mb-6 origin-left"
            style={{ backgroundColor: '#C8A0AE' }}
          />

          {/* Bio */}
          <motion.div {...fadeUp(0.28)} style={{ marginBottom: '1.4rem' }}>
            {a.bio.map((p, i) => (
              <p key={i} className="font-light" style={{ fontSize: '13px', color: '#6B5060', lineHeight: 2, letterSpacing: '0.015em', marginBottom: 6 }}>
                {p}
              </p>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div
            {...fadeUp(0.34)}
            style={{
              borderLeft: '2px solid rgba(200,160,174,0.5)',
              paddingLeft: 16, marginBottom: '1.4rem',
            }}
          >
            <p style={{ fontFamily: 'DM Serif Display, serif', fontStyle: 'italic', fontSize: 'clamp(13px, 1.3vw, 15px)', color: '#2D1520', fontWeight: 400, lineHeight: 1.75 }}>
              {a.quote}
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.6rem' }}>
            {a.trust.map(({ label }, i) => {
              const Icon = TRUST_ICONS[i]
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100, background: 'rgba(200,160,174,0.1)', border: '1px solid rgba(200,160,174,0.22)' }}>
                  <Icon size={11} strokeWidth={1.4} style={{ color: '#C8A0AE' }} />
                  <span style={{ fontSize: '10.5px', color: '#5A4050', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>{label}</span>
                </div>
              )
            })}
          </motion.div>

          {/* Skills */}
          <motion.div {...fadeUp(0.46)} style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.8rem' }}>
            {a.skills.map(skill => <SkillTag key={skill} label={skill} />)}
          </motion.div>

          <motion.div {...fadeUp(0.52)}>
            <button onClick={() => onNavigate('contacts')} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {a.bookBtn} <ArrowRight size={12} />
            </button>
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <div style={{ position: 'relative', minHeight: 260 }}>
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute',
              top: 8, right: 8, bottom: 8, left: 8,
              overflow: 'hidden',
              borderRadius: 20,
              boxShadow: '0 10px 36px rgba(45,21,32,0.12)',
              zIndex: 1,
            }}
          >
            <img
              src="/images/master.jpg"
              alt={a.name}
              loading="eager"
              decoding="async"
              fetchpriority="high"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 8%' }}
            />

            {/* Decorative corner — top right */}
            <div aria-hidden style={{ position: 'absolute', top: 14, right: 14, zIndex: 4, pointerEvents: 'none' }}>
              <div style={{ width: 28, height: 1, background: 'rgba(242,222,228,0.8)', position: 'absolute', top: 0, right: 0 }} />
              <div style={{ width: 1, height: 28, background: 'rgba(242,222,228,0.8)', position: 'absolute', top: 0, right: 0 }} />
            </div>

            {/* Decorative corner — bottom left */}
            <div aria-hidden style={{ position: 'absolute', bottom: 14, left: 14, zIndex: 4, pointerEvents: 'none' }}>
              <div style={{ width: 28, height: 1, background: 'rgba(242,222,228,0.8)', position: 'absolute', bottom: 0, left: 0 }} />
              <div style={{ width: 1, height: 28, background: 'rgba(242,222,228,0.8)', position: 'absolute', bottom: 0, left: 0 }} />
            </div>
            {/* Bottom gradient */}
            <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(45,21,32,0.1) 100%)', zIndex: 2 }} />


            {/* Bottom label */}
            <div style={{ position: 'absolute', bottom: 16, right: 16, zIndex: 3 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 100, background: 'rgba(45,21,32,0.75)', border: '1px solid rgba(200,160,174,0.2)', fontSize: '9px', fontFamily: 'Raleway, sans-serif', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(246,235,240,0.9)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7ED9A5', boxShadow: '0 0 6px rgba(126,217,165,0.8)', display: 'inline-block' }} />
                Nail Master
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CLIENTS RETURN ── */}
      <section className="mx-4 md:mx-6 lg:mx-8 pt-5 pb-20" style={{ maxWidth: 1100 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">

          {/* Left — empty, keeps alignment */}
          <div className="hidden lg:block" />

          {/* Right — title + cards under photo column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: 18 }}
            >
              <span style={{ fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', display: 'block', marginBottom: 8 }}>
                VELOURA Studio
              </span>
              <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(20px, 2.2vw, 30px)', fontWeight: 400, color: '#2D1520', lineHeight: 1.15 }}>
                Чому клієнти повертаються
              </h2>
              <div style={{ height: 1, width: 36, marginTop: 12, background: 'linear-gradient(90deg, rgba(200,160,174,0.55), transparent)' }} />
            </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {RETURN_CARDS.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  border: '1px solid rgba(200,160,174,0.18)',
                  borderRadius: 18, padding: '22px 20px',
                  boxShadow: '0 4px 20px rgba(45,21,32,0.05)',
                  transition: 'all 0.32s ease', cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,21,32,0.09)'
                  e.currentTarget.style.borderColor = 'rgba(200,160,174,0.35)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.9)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,21,32,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(200,160,174,0.18)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.72)'
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, rgba(200,160,174,0.18), rgba(200,160,174,0.07))', border: '1px solid rgba(200,160,174,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={15} style={{ color: '#B08898', strokeWidth: 1.5 }} />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: '#2D1520', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 11.5, fontWeight: 300, color: '#A07888', fontFamily: 'Raleway, sans-serif', lineHeight: 1.8 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
          </div>

        </div>
      </section>

    </motion.div>
  )
}
