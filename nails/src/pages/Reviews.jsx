import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const fadeUpView = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.72, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          fill={i < count ? '#C8A0AE' : 'none'}
          stroke={i < count ? '#C8A0AE' : 'rgba(200,160,174,0.35)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

function NavButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 flex items-center justify-center transition-all duration-300"
      style={{ border: '1px solid rgba(200,160,174,0.4)', color: '#C8A0AE' }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#2D1520'
        e.currentTarget.style.borderColor = '#2D1520'
        e.currentTarget.style.color = '#F6EBF0'
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(45,21,32,0.18)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(200,160,174,0.4)'
        e.currentTarget.style.color = '#C8A0AE'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

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
      {/* Background glows */}
      <div
        aria-hidden className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '460px', height: '460px', borderRadius: '50%', zIndex: 0,
          background: 'radial-gradient(circle, rgba(200,160,174,0.09) 0%, transparent 68%)',
          transform: 'translate(25%, -25%)',
        }}
      />
      <div
        aria-hidden className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '300px', height: '300px', borderRadius: '50%', zIndex: 0,
          background: 'radial-gradient(circle, rgba(200,160,174,0.06) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-12 border-b border-ghost">
        <span className="section-tag">{r.tag}</span>
        <h1
          className="font-serif font-light leading-none"
          style={{ fontSize: 'clamp(42px, 7vw, 88px)', color: '#2D1520' }}
        >
          {r.title}
        </h1>
      </div>

      {/* Featured review */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 py-20">
        <div className="max-w-3xl">

          {/* Decorative quote */}
          <div
            aria-hidden
            className="font-serif italic select-none mb-1"
            style={{
              fontSize: '84px',
              lineHeight: 0.85,
              color: 'rgba(200,160,174,0.22)',
              fontWeight: 300,
            }}
          >
            "
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p
                className="font-serif font-light leading-[1.65] mb-10"
                style={{ fontSize: 'clamp(18px, 2.4vw, 27px)', color: '#2D1520' }}
              >
                {r.items[current].text}
              </p>

              <div className="flex items-center gap-5">
                {/* Avatar — round cherry */}
                <div
                  className="w-12 h-12 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: '#2D1520',
                    borderRadius: '50%',
                    boxShadow: '0 4px 14px rgba(45,21,32,0.2)',
                  }}
                >
                  <span
                    className="font-serif"
                    style={{ fontSize: '18px', color: '#F6EBF0', fontWeight: 300 }}
                  >
                    {r.items[current].name[0]}
                  </span>
                </div>
                <div>
                  <div
                    className="font-medium mb-0.5"
                    style={{ fontSize: '13px', color: '#2D1520', letterSpacing: '0.02em' }}
                  >
                    {r.items[current].name}
                  </div>
                  <div
                    className="tracking-[0.22em] uppercase"
                    style={{ fontSize: '10px', color: '#A07888' }}
                  >
                    {r.items[current].city} · {r.items[current].date}
                  </div>
                </div>
                <div className="ml-auto">
                  <Stars count={r.items[current].stars} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-14">
            <NavButton onClick={prev}><ChevronLeft size={17} /></NavButton>
            <NavButton onClick={next}><ChevronRight size={17} /></NavButton>
            <span
              className="ml-3 tracking-[0.25em] uppercase"
              style={{ fontSize: '10px', color: '#C8A0AE' }}
            >
              {current + 1} / {r.items.length}
            </span>
          </div>
        </div>

        {/* Review cards */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {r.items.map((review, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              onClick={() => setCurrent(i)}
              className="text-left p-6 transition-all duration-300"
              style={{
                backgroundColor: current === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
                border: `1px solid ${current === i ? 'rgba(200,160,174,0.5)' : 'rgba(200,160,174,0.18)'}`,
                borderRadius: '16px',
                boxShadow: current === i
                  ? '0 8px 28px rgba(45,21,32,0.1)'
                  : '0 2px 10px rgba(45,21,32,0.04)',
                backdropFilter: 'blur(4px)',
                transform: current === i ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <Stars count={review.stars} />
              <p
                className="font-light leading-relaxed mt-4 mb-4 line-clamp-3"
                style={{ fontSize: '13px', color: '#6B5060', lineHeight: '1.88' }}
              >
                {review.text}
              </p>
              <div
                className="tracking-[0.2em] uppercase"
                style={{ fontSize: '10px', color: '#A07888' }}
              >
                {review.name} · {review.date}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
