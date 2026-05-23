import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Heart, Feather, Target, Clock, User, Wand2 } from 'lucide-react'

const TRUST_ICONS = [ShieldCheck, Sparkles, Heart, Feather]

const RETURN_CARDS = [
  {
    Icon: Target,
    title: 'Акуратність у деталях',
    desc: 'Рівні краї, бездоганне покриття та ідеальна форма — результат, який ви помітите одразу.',
  },
  {
    Icon: Clock,
    title: 'Довготривалий результат',
    desc: 'Покриття тримається тижнями без сколів та втрати блиску — робота, яка говорить сама за себе.',
  },
  {
    Icon: User,
    title: 'Індивідуальний підхід',
    desc: 'Враховую форму нігтів, стиль та бажання кожної клієнтки. Ваш результат — унікальний.',
  },
  {
    Icon: Wand2,
    title: 'Сучасні техніки',
    desc: 'Постійно слідкую за трендами та вдосконалюю майстерність — актуальні технології та стилі.',
  },
]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function SkillTag({ label }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 px-5 py-2.5 text-[11px] tracking-[0.1em] font-light cursor-default transition-all duration-300"
      style={{ border: '1px solid rgba(200,160,174,0.4)', color: '#8B6070' }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.backgroundColor = '#2D1520'
        el.style.color = '#F6EBF0'
        el.style.borderColor = '#2D1520'
        el.style.transform = 'translateY(-1px)'
        el.style.boxShadow = '0 4px 12px rgba(45,21,32,0.18)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.backgroundColor = 'transparent'
        el.style.color = '#8B6070'
        el.style.borderColor = 'rgba(200,160,174,0.4)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: 'rgba(200,160,174,0.55)' }} />
      {label}
    </span>
  )
}

function TrustCard({ label, Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col gap-4 p-5 cursor-default transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255,255,255,0.62)',
        border: '1px solid rgba(200,160,174,0.2)',
        borderRadius: '14px',
        boxShadow: '0 2px 14px rgba(45,21,32,0.05)',
        backdropFilter: 'blur(4px)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 12px 32px rgba(45,21,32,0.1)'
        el.style.borderColor = 'rgba(200,160,174,0.45)'
        el.style.backgroundColor = 'rgba(255,255,255,0.82)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 2px 14px rgba(45,21,32,0.05)'
        el.style.borderColor = 'rgba(200,160,174,0.2)'
        el.style.backgroundColor = 'rgba(255,255,255,0.62)'
      }}
    >
      <div style={{ color: '#C8A0AE' }}>
        <Icon size={17} strokeWidth={1.4} />
      </div>
      <span className="text-[12px] font-light leading-snug" style={{ color: '#5A4050' }}>
        {label}
      </span>
    </motion.div>
  )
}

export default function About({ onNavigate, t }) {
  const a = t.about
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.38 }}
      className="min-h-screen relative"
    >
      {/* Subtle background glow — depth without noise */}
      <div
        aria-hidden
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,160,174,0.1) 0%, transparent 68%)',
          transform: 'translate(22%, -22%)',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,160,174,0.06) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-12 border-b border-ghost">
          <span className="section-tag">{a.tag}</span>
          <h1
            className="font-serif font-light leading-none"
            style={{ fontSize: 'clamp(42px, 7vw, 88px)', color: '#2D1520' }}
          >
            {a.title}
          </h1>
      </div>

      {/* Body */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row items-start" style={{ gap: '72px' }}>

        {/* LEFT — Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full"
          style={{ maxWidth: 400, flexShrink: 0 }}
        >
          <div
            className="aspect-[3/4] overflow-hidden"
            style={{
              borderRadius: '22px',
              boxShadow:
                '0 28px 68px rgba(45,21,32,0.15), 0 8px 20px rgba(45,21,32,0.08), 0 0 0 1px rgba(200,160,174,0.12)',
            }}
          >
            <img
              src="/images/master.jpg"
              alt={a.name}
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.05) contrast(1.01) saturate(0.78) sepia(0.06)',
                transform: 'scale(1.01)',
              }}
            />
            {/* Cinematic vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(45,21,32,0.14) 100%)',
              }}
            />
            {/* Subtle warm overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 65%, rgba(45,21,32,0.08) 100%)' }}
            />
          </div>

          {/* Experience badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute -bottom-5 -right-3 sm:-right-5 px-7 py-5"
            style={{
              backgroundColor: '#2D1520',
              boxShadow: '0 12px 28px rgba(45,21,32,0.22)',
            }}
          >
            <div
              className="text-[8.5px] tracking-[0.34em] uppercase mb-1.5"
              style={{ color: 'rgba(246,235,240,0.45)' }}
            >
              {a.badge}
            </div>
            <div
              className="font-serif"
              style={{ fontSize: '28px', color: '#F6EBF0', lineHeight: 1, fontWeight: 300 }}
            >
              {a.badgeVal}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — Content */}
        <div className="flex flex-col gap-8" style={{ flex: 1, maxWidth: 620 }}>

          {/* Name block */}
          <motion.div {...fadeUp(0.06)}>
            <span className="section-tag">{a.masterTag}</span>
            <h2
              className="font-serif mb-4"
              style={{
                fontSize: 'clamp(36px, 4.8vw, 58px)',
                fontWeight: 300,
                color: '#2D1520',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
              }}
            >
              {a.name}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-px w-12 origin-left"
              style={{ backgroundColor: '#C8A0AE' }}
            />
          </motion.div>

          {/* Bio */}
          <motion.div {...fadeUp(0.14)} className="space-y-3.5">
            {a.bio.map((p, i) => (
              <p
                key={i}
                className="font-light"
                style={{
                  fontSize: '14px',
                  color: '#3D2530',
                  lineHeight: '2.1',
                  letterSpacing: '0.012em',
                }}
              >
                {p}
              </p>
            ))}
          </motion.div>

          {/* Accent quote */}
          <motion.div
            {...fadeUp(0.21)}
            className="relative px-7 py-6"
            style={{
              backgroundColor: 'rgba(240,216,223,0.42)',
              borderRadius: '14px',
              border: '1px solid rgba(200,160,174,0.18)',
            }}
          >
            <span
              aria-hidden
              className="font-serif italic absolute"
              style={{
                fontSize: '58px',
                color: 'rgba(200,160,174,0.28)',
                lineHeight: 1,
                top: '-4px',
                left: '18px',
              }}
            >
              "
            </span>
            <p
              className="font-serif italic"
              style={{
                fontSize: 'clamp(14px, 1.42vw, 17px)',
                color: '#2D1520',
                fontWeight: 400,
                lineHeight: '1.88',
                paddingTop: '12px',
              }}
            >
              {a.quote}
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div {...fadeUp(0.28)}>
            <div
              className="text-[10px] tracking-[0.32em] uppercase mb-4"
              style={{ color: '#7A5868' }}
            >
              {a.skillsLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {a.skills.map(skill => <SkillTag key={skill} label={skill} />)}
            </div>
          </motion.div>

          {/* Trust cards + CTA grouped together */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {a.trust.map(({ label }, i) => (
                <TrustCard
                  key={label}
                  label={label}
                  Icon={TRUST_ICONS[i]}
                  delay={0.35 + i * 0.07}
                />
              ))}
            </div>

            <motion.div {...fadeUp(0.44)} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => onNavigate('contacts')} className="btn-primary">
                {a.bookBtn} <ArrowRight size={12} />
              </button>
              <button onClick={() => onNavigate('gallery')} className="btn-outline">
                {a.galleryBtn}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      </div>

      {/* ── Why clients return ───────────────────────────────── */}
      <section className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pb-28 pt-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ marginBottom: 52 }}
        >
          <span className="section-tag">
            VELOURA Studio
          </span>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 300, color: '#2D1520', lineHeight: 1.1,
            }}
          >
            Чому клієнти повертаються
          </h2>
          <div style={{
            height: 1, width: 56, marginTop: 18,
            background: 'linear-gradient(90deg, rgba(200,160,174,0.55), transparent)',
          }} />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RETURN_CARDS.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                background: 'rgba(255,255,255,0.68)',
                border: '1px solid rgba(200,160,174,0.18)',
                borderRadius: 20,
                padding: '32px 28px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 24px rgba(45,21,32,0.06), 0 1px 4px rgba(45,21,32,0.03)',
                transition: 'all 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 22px 52px rgba(45,21,32,0.1), 0 4px 16px rgba(45,21,32,0.06)'
                e.currentTarget.style.borderColor = 'rgba(200,160,174,0.38)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.88)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(45,21,32,0.06), 0 1px 4px rgba(45,21,32,0.03)'
                e.currentTarget.style.borderColor = 'rgba(200,160,174,0.18)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.68)'
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(200,160,174,0.18), rgba(200,160,174,0.07))',
                border: '1px solid rgba(200,160,174,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 22,
              }}>
                <Icon size={18} style={{ color: '#B08898', strokeWidth: 1.5 }} />
              </div>
              <div style={{
                fontSize: 13, fontWeight: 500, color: '#2D1520',
                fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em', marginBottom: 10,
              }}>
                {title}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 300, color: '#A07888',
                fontFamily: 'Raleway, sans-serif', lineHeight: 1.85,
              }}>
                {desc}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  )
}
