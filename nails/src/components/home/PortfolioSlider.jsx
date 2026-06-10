import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from '../SectionHeader'

const ALL_WORKS = [
  '/images/works/IMG_3143.PNG',
  '/images/works/IMG_3144.PNG',
  '/images/works/IMG_3146.PNG',
  '/images/works/IMG_3147.PNG',
  '/images/works/IMG_3148.PNG',
  '/images/works/IMG_3149.PNG',
  '/images/works/IMG_3150.PNG',
  '/images/works/work_a.jpg',
  '/images/works/work_b.jpg',
  '/images/works/images.jpg',
  '/images/works/images (1).jpg',
  '/images/works/images (2).jpg',
  '/images/works/images (3).jpg',
]

const CARD_W   = 260
const CARD_GAP = 16

function SnapGallery({ images, onImageClick }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const total = images.length

  const getMaxActive = () => {
    const el = trackRef.current
    if (!el) return total - 1
    return Math.round((el.scrollWidth - el.clientWidth) / (CARD_W + CARD_GAP))
  }

  const scrollTo = useCallback((idx) => {
    const el = trackRef.current
    if (!el) return
    const max = getMaxActive()
    const clamped = Math.max(0, Math.min(idx, max))
    setActive(clamped)
    el.scrollTo({ left: clamped * (CARD_W + CARD_GAP), behavior: 'smooth' })
  }, [total])

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (CARD_W + CARD_GAP))
    setActive(Math.max(0, Math.min(idx, getMaxActive())))
  }

  const btnStyle = (disabled) => ({
    borderRadius: '50%',
    border: '1px solid rgba(160,148,128,0.5)',
    background: disabled ? 'transparent' : 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(8px)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.35 : 1,
    transition: 'all 0.2s',
    flexShrink: 0,
  })

  return (
    <div style={{ position: 'relative' }}>
      {/* Clip wrapper — ховає scrollbar (трек вищий на 20px, обгортка обрізає) */}
      <div style={{ height: 320, overflow: 'hidden' }}>
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="portfolio-track"
          style={{
            display: 'flex', gap: CARD_GAP, overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'clamp(20px, 4vw, 64px)',
            paddingRight: 'clamp(20px, 4vw, 64px)',
            height: 340,
            alignItems: 'flex-start',
          }}
        >
          {images.map((src, i) => (
            <motion.div
              key={src}
              onClick={() => onImageClick(src)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.07, ease: 'easeOut' }}
              style={{
                flexShrink: 0, width: CARD_W, height: 320, borderRadius: 20,
                overflow: 'hidden', scrollSnapAlign: 'start', cursor: 'pointer',
                border: '1px solid rgba(160,148,128,0.15)',
                background: '#FAF7F2',
              }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img')
                if (img) img.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img')
                if (img) img.style.transform = 'scale(1)'
              }}
            >
              <img
                src={src} alt={`Work ${i + 1}`} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block', mixBlendMode: 'multiply' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Стрілки — поза clip-обгорткою */}
      <div className="flex items-center justify-center gap-3 mt-5 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <button
          onClick={() => scrollTo(active - 1)}
          disabled={active === 0}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          style={btnStyle(active === 0)}
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#2D1520' }} />
        </button>
        <button
          onClick={() => scrollTo(active + 1)}
          disabled={active >= getMaxActive()}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
          style={btnStyle(active >= getMaxActive())}
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#2D1520' }} />
        </button>
      </div>
    </div>
  )
}

export default function PortfolioSlider({ t, onImageClick }) {
  const h = t.home
  return (
    <section style={{ paddingBottom: '1rem', paddingTop: '3rem', overflow: 'hidden' }}>
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20" style={{ marginBottom: '2.5rem' }}>
        <SectionHeader tag={h.galleryTitle} title={h.selectedWorksTitle} />
      </div>
      <SnapGallery images={ALL_WORKS} onImageClick={onImageClick} />
    </section>
  )
}