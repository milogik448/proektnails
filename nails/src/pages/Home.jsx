import { motion } from 'framer-motion'
import { ArrowRight, Instagram, Sparkles } from 'lucide-react'

const ALL_WORKS = [
  '/images/works/IMG_3143.PNG',
  '/images/works/IMG_3144.PNG',
  '/images/works/IMG_3146.PNG',
  '/images/works/IMG_3147.PNG',
  '/images/works/IMG_3148.PNG',
  '/images/works/IMG_3149.PNG',
  '/images/works/IMG_3150.PNG',
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
      <section className="relative overflow-hidden flex flex-col px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-20">

        {/* Decorative watermark "V" */}
        <div
          aria-hidden
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none leading-none"
          style={{ overflow: 'hidden' }}
        >
          <span
            className="font-serif italic block"
            style={{
              fontSize: 'clamp(220px, 33vw, 460px)',
              color: 'rgba(200,160,174,0.07)',
              lineHeight: 1,
              transform: 'translateX(8%)',
            }}
          >V</span>
        </div>

        {/* Tag */}
        <motion.span {...fadeUp(0.05)} className="section-tag">Praha · Czech Republic</motion.span>

        {/* Main heading */}
        <motion.h1
          {...fadeUp(0.12)}
          className="font-serif"
          style={{
            fontSize: 'clamp(62px, 10.5vw, 144px)',
            fontWeight: 300,
            lineHeight: 0.88,
            color: '#2D1520',
            letterSpacing: '-0.015em',
            marginBottom: '2rem',
          }}
        >
          Nail
          <br />
          <em>Studio</em>
          <br />
          Praha
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px w-14 mb-8 origin-left"
          style={{ backgroundColor: '#C8A0AE' }}
        />

        {/* Description + CTAs */}
        <motion.div
          {...fadeUp(0.38)}
          className="flex flex-col sm:flex-row items-start gap-8 sm:items-end"
        >
          <p
            className="font-light leading-[2] max-w-[270px]"
            style={{ fontSize: '13.5px', color: '#8B6070', letterSpacing: '0.025em' }}
          >
            {h.desc}
          </p>
          <div className="flex flex-col xs:flex-row sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Sparkles size={12} />
              {h.btn1}
            </button>
            <button onClick={() => onNavigate('services')} className="btn-outline">
              {h.btn2}
            </button>
          </div>
        </motion.div>
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

      {/* ── Why choose me ────────────────────────────────────── */}
      <section className="px-8 md:px-12 lg:px-16 xl:px-20 py-24">
        <motion.div {...fadeUpView(0)} className="mb-14">
          <span className="section-tag">Про майстра</span>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 300,
              color: '#2D1520',
              lineHeight: 1.1,
            }}
          >
            {h.whyTitle}
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ backgroundColor: 'rgba(200,160,174,0.18)' }}
        >
          {h.whyItems.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className="flex flex-col p-8 lg:p-9"
              style={{ backgroundColor: 'rgba(242,222,228,0.97)' }}
            >
              <span
                className="font-serif italic mb-6 block"
                style={{ fontSize: '26px', color: 'rgba(200,160,174,0.5)', fontWeight: 300 }}
              >
                {num}
              </span>
              <div
                className="text-[13px] font-medium mb-2.5"
                style={{ color: '#2D1520', letterSpacing: '0.01em' }}
              >
                {title}
              </div>
              <div
                className="text-[12px] font-light leading-[1.85]"
                style={{ color: '#A07888' }}
              >
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
              {/* Gradient overlay on hover */}
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
