import { motion } from 'framer-motion'
import { Instagram, Sparkles, Heart, Clock, BadgeCheck, MapPin } from 'lucide-react'

const ALL_WORKS = [
  '/images/works/IMG_3143.PNG',
  '/images/works/IMG_3144.PNG',
  '/images/works/IMG_3146.PNG',
  '/images/works/IMG_3147.PNG',
  '/images/works/IMG_3148.PNG',
  '/images/works/IMG_3149.PNG',
  '/images/works/IMG_3150.PNG',
]

const WHY_CARDS = [
  {
    Icon: Heart,
    title: 'Індивідуальний підхід',
    desc: 'Враховую форму нігтів, стиль та побажання. Кожна клієнтка отримує рішення саме для неї.',
  },
  {
    Icon: Clock,
    title: 'Тривалий результат',
    desc: 'Покриття тримається тижнями без сколів та втрати блиску — якість, що говорить сама за себе.',
  },
  {
    Icon: BadgeCheck,
    title: 'Чесні ціни',
    desc: 'Повна вартість обговорюється заздалегідь. Ніяких прихованих доплат та сюрпризів.',
  },
  {
    Icon: MapPin,
    title: 'Praha, Czech Republic',
    desc: 'Студія у зручному місці в Празі. Затишне місце, куди хочеться повертатись знову.',
  },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

const fadeUpView = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function Home({ onNavigate, t }) {
  const h = t.home
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative grid grid-cols-1 lg:grid-cols-[50%_50%] mx-4 md:mx-6 lg:mx-8 mt-4 mb-0"
        style={{
          background: 'rgba(255,255,255,0.62)',
          border: '1px solid rgba(200,160,174,0.24)',
          borderRadius: 32,
          overflow: 'hidden',
          boxShadow: '0 16px 56px rgba(45,21,32,0.09), 0 2px 8px rgba(45,21,32,0.04), inset 0 1px 0 rgba(255,255,255,0.68)',
        }}
      >
        {/* TOP shimmer line */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, zIndex: 10,
          background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.5), transparent)',
        }} />

        {/* LEFT — text column */}
        <div className="flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-8 pb-8 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-20 relative z-10">

          {/* Tag */}
          <motion.span {...fadeUp(0.05)} className="section-tag">Praha · Czech Republic</motion.span>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.12)}
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(44px, 6.8vw, 96px)',
              fontWeight: 400,
              lineHeight: 0.9,
              color: '#2D1520',
              letterSpacing: '-0.01em',
              marginTop: '1rem',
              marginBottom: '1.8rem',
            }}
          >
            NAILS
            <br />
            <em>BY VELOURA</em>
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px w-14 mb-8 origin-left"
            style={{ backgroundColor: '#C8A0AE' }}
          />

          {/* Description */}
          <motion.p
            {...fadeUp(0.36)}
            className="font-light leading-[2] max-w-[280px]"
            style={{ fontSize: '13px', color: '#8B6070', letterSpacing: '0.025em', marginBottom: '1.8rem' }}
          >
            {h.desc}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.44)} className="flex flex-row gap-3">
            <button
              onClick={() => onNavigate('contacts')}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Sparkles size={12} />
              {h.btn1}
            </button>
            <button onClick={() => onNavigate('services')} className="btn-outline">
              {h.btn2}
            </button>
          </motion.div>

        </div>

        {/* RIGHT — photo column */}
        <div className="relative min-h-[300px] lg:min-h-0">

          {/* Photo — full bleed, inset: 0 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute',
              top: 20, right: 20, bottom: 24, left: 20,
              overflow: 'hidden',
              borderRadius: 20,
              boxShadow: '0 14px 44px rgba(45,21,32,0.14), 0 2px 8px rgba(45,21,32,0.06)',
              zIndex: 1,
            }}
          >
            <img
              src="/images/works/studio.png"
              alt="VELOURA Studio Prague"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 1 }}
            />
            {/* Left-edge gradient — blends photo into text column */}
            <div aria-hidden style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: '28%',
              background: 'linear-gradient(to right, rgba(242,222,228,0.88) 0%, rgba(242,222,228,0.2) 60%, transparent 100%)',
              zIndex: 2,
            }} />
            {/* Bottom gradient */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, transparent 60%, rgba(45,21,32,0.14) 100%)',
              zIndex: 2,
            }} />
            {/* Stats overlay — desktop only */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{
                position: 'absolute', top: 18, left: 18, zIndex: 3,
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(200,160,174,0.28)',
                borderRadius: 14,
                padding: '12px 16px',
                boxShadow: '0 8px 28px rgba(45,21,32,0.12)',
                minWidth: 126,
              }}
            >
              {[{ num: '200+', label: 'клієнтів' }, { num: '5.0 ★', label: 'рейтинг' }].map(({ num, label }, i) => (
                <div key={label}>
                  {i > 0 && <div style={{ height: 1, background: 'rgba(200,160,174,0.22)', margin: '8px 0' }} />}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 300, color: '#2D1520' }}>{num}</span>
                    <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: 7.5, fontWeight: 500, color: '#A07888', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</span>
                  </div>
                </div>
              ))}
              <div style={{ height: 1, background: 'rgba(200,160,174,0.22)', margin: '8px 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7ED9A5', boxShadow: '0 0 6px rgba(126,217,165,0.7)', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: 7.5, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A07888' }}>AI запис</span>
              </div>
            </motion.div>

            {/* VELOURA label — bottom left */}
            <div style={{
              position: 'absolute', bottom: 18, left: 18, zIndex: 3,
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '6px 14px', borderRadius: 100,
              background: 'rgba(242,222,228,0.96)',
              border: '1px solid rgba(200,160,174,0.4)',
              fontSize: '9px', fontFamily: 'Raleway, sans-serif',
              fontWeight: 600, letterSpacing: '0.24em',
              textTransform: 'uppercase', color: '#2D1520',
            }}>
              VELOURA · Praha
            </div>

            {/* Decorative frame line below photo */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'absolute', bottom: -18, left: 20, right: 20,
                height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.48), transparent)',
                transformOrigin: 'center',
                zIndex: 0,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Gallery & Outro ───────────────────────────────────────────── */}
      <section style={{ paddingBottom: '3rem', paddingTop: '3rem', overflow: 'hidden' }}>
        <motion.div {...fadeUpView(0)} className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20" style={{ marginBottom: '2.5rem' }}>
          <span className="section-tag">Роботи майстра</span>
          <h2 className="font-serif" style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 300, color: '#2D1520' }}>Вибрані роботи</h2>
          <div style={{ height: 1, maxWidth: 80, marginTop: 12, background: 'linear-gradient(90deg, rgba(200,160,174,0.55), transparent)' }} />
        </motion.div>

        {/* ── Horizontal Gallery ── */}
        <div style={{ paddingLeft: 'clamp(32px, 5vw, 80px)', paddingRight: 'clamp(32px, 5vw, 80px)', paddingBottom: 24, overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }} onMouseEnter={() => {}} onMouseLeave={() => {}}>
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '80px' }}
                transition={{ duration: 0.65, delay: Math.min(i * 0.06, 0.32) }}
                style={{
                  flexShrink: 0, width: 'clamp(200px, 21vw, 270px)', height: 'clamp(260px, 27vw, 340px)',
                  borderRadius: 20, overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(45,21,32,0.1), 0 2px 8px rgba(45,21,32,0.06)',
                  border: '1px solid rgba(200,160,174,0.15)',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  const img = e.currentTarget.querySelector('img')
                  if (img) img.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  const img = e.currentTarget.querySelector('img')
                  if (img) img.style.transform = 'scale(1)'
                }}
              >
                <img src={`/images/works/IMG_${3143 + i}.PNG`} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', display: 'block' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────── */}
      <section className="border-t border-b" style={{ borderColor: 'rgba(200,160,174,0.28)' }}>
        <div className="grid grid-cols-3">
          {h.stats.map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`flex flex-col items-center justify-center py-10 sm:py-14 px-4 text-center ${i < 2 ? 'border-r' : ''}`}
              style={{ borderColor: 'rgba(200,160,174,0.28)' }}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 68px)',
                  fontWeight: 300,
                  color: '#2D1520',
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                className="font-light tracking-[0.22em] uppercase mt-2.5"
                style={{ fontSize: '8.5px', color: '#A07888' }}
              >
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* ── Why VELOURA ──────────────────────────────────────── */}
      <section className="px-8 md:px-12 lg:px-16 xl:px-20 py-24">

        {/* Section header */}
        <motion.div {...fadeUpView(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-tag" style={{ display: 'block', textAlign: 'center' }}>VELOURA Studio</span>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 300, color: '#2D1520', lineHeight: 1.1,
            }}
          >
            Чому обирають VELOURA
          </h2>
          <div style={{
            height: 1, maxWidth: 140, margin: '18px auto 0',
            background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.55), transparent)',
          }} />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CARDS.map(({ Icon, title, desc }, i) => (
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

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="px-8 md:px-12 lg:px-16 xl:px-20 pb-24">
          <motion.div {...fadeUpView(0)} className="flex items-end justify-between mb-10">
            <div>
              <span className="section-tag">{h.worksTag}</span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 42px)',
                  fontWeight: 300,
                  color: '#2D1520',
                }}
              >
                {h.worksTitle}
              </h2>
            </div>
          </motion.div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            style={{ gridAutoRows: '230px' }}
          >
            {ALL_WORKS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.06 }}
                className={`relative overflow-hidden group ${i === 1 || i === 4 ? 'row-span-2' : ''}`}
                style={{ borderRadius: '16px' }}
              >
                <img
                  src={src}
                  alt={`${h.worksTitle} ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(to top, rgba(45,21,32,0.38) 0%, transparent 60%)',
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Instagram button */}
          <motion.div {...fadeUpView(0.1)} className="mt-12 flex justify-center">
            <a
              href="https://www.instagram.com/anjelikaa_nails"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 border transition-all duration-300"
              style={{
                fontSize: '10px',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 500,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                borderColor: 'rgba(200,160,174,0.55)',
                color: '#8B6070',
                borderRadius: '0',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2D1520'
                e.currentTarget.style.color = '#2D1520'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(200,160,174,0.55)'
                e.currentTarget.style.color = '#8B6070'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Instagram size={13} />
              {h.instagramBtn}
            </a>
          </motion.div>
      </section>

    </motion.div>
  )
}
