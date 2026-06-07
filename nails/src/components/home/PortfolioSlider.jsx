import { useState, useRef, useCallback } from 'react'
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
    width: 40, height: 40, borderRadius: '50%',
    border: '1px solid rgba(160,148,128,0.5)',
    background: disabled ? 'transparent' : 'rgba(255,255,255,0.72)',
    backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.35 : 1,
    transition: 'all 0.2s',
    flexShrink: 0,
  })

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={{
          display: 'flex', gap: CARD_GAP, overflowX: 'auto',
          scrollSnapType: 'x mandatory', scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: 'clamp(20px, 4vw, 64px)',
          paddingRight: 'clamp(20px, 4vw, 64px)',
          paddingBottom: 8,
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            onClick={() => onImageClick(src)}
            style={{
              flexShrink: 0, width: CARD_W, height: 320, borderRadius: 20,
              overflow: 'hidden', scrollSnapAlign: 'start', cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(45,21,32,0.1)',
              border: '1px solid rgba(160,148,128,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 20px 56px rgba(45,21,32,0.16)'
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(45,21,32,0.1)'
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1)'
            }}
          >
            <img
              src={src} alt={`Work ${i + 1}`} loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
            />
          </div>
        ))}
      </div>

      <div
        className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 20 }}
      >
        <button onClick={() => scrollTo(active - 1)} disabled={active === 0} style={btnStyle(active === 0)}>
          <ChevronLeft size={18} style={{ color: '#2D1520' }} />
        </button>
        <button onClick={() => scrollTo(active + 1)} disabled={active >= getMaxActive()} style={btnStyle(active >= getMaxActive())}>
          <ChevronRight size={18} style={{ color: '#2D1520' }} />
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