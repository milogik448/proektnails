import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

const CATEGORY_NUMS = ['01', '02', '03', '04', '05', '06']

const PREVIEW_PHOTOS = [
  '/images/works/IMG_3147.PNG',
  '/images/works/IMG_3144.PNG',
  '/images/works/IMG_3149.PNG',
  '/images/works/IMG_3150.PNG',
  '/images/works/IMG_3146.PNG',
  '/images/works/IMG_3148.PNG',
]

export default function Services({ t }) {
  const s = t.services
  const [selected, setSelected] = useState('manicure')
  const [hoveredItem, setHoveredItem] = useState(null)
  const active = s.list.find(svc => svc.id === selected)
  const activeIdx = s.list.findIndex(svc => svc.id === selected)

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.38 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Atmospheric background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '-8%', right: '-6%',
          width: '620px', height: '620px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(210,170,185,0.11) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0%', left: '-12%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(160,112,128,0.07) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', top: '35%', right: '20%',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,220,230,0.35) 0%, transparent 65%)',
        }} />
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-12 pb-8">
          <div className="flex items-center gap-4 mb-5">
            <span
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#B89AA8',
              }}
            >
              {s.tag}
            </span>
            <div style={{ height: '1px', width: '48px', background: 'rgba(160,112,128,0.3)', flexShrink: 0 }} />
          </div>

          <h1
            className="font-serif font-light leading-none"
            style={{ fontSize: 'clamp(40px, 6vw, 82px)', color: '#2D1520', letterSpacing: '-0.02em', marginBottom: '10px' }}
          >
            {s.title}
          </h1>

          <p
            className="font-serif italic"
            style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', color: '#A07888', fontWeight: 300, letterSpacing: '0.02em' }}
          >
            {s.subtitle}
          </p>

          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, rgba(160,112,128,0.25), rgba(160,112,128,0.08), transparent)',
            marginTop: '24px',
          }} />
      </div>

      {/* ── MOBILE: horizontal category chips ── */}
      <div className="relative z-10 lg:hidden px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {s.list.map((svc, i) => (
            <button
              key={svc.id}
              onClick={() => setSelected(svc.id)}
              className="shrink-0 flex items-center gap-2 transition-all duration-300"
              style={{
                padding: '8px 16px',
                borderRadius: '100px',
                ...(selected === svc.id
                  ? {
                      background: '#2D1520',
                      color: '#F6EBF0',
                      boxShadow: '0 4px 16px rgba(45,21,32,0.22)',
                    }
                  : {
                      background: 'rgba(200,160,174,0.1)',
                      color: '#8B6070',
                      border: '1px solid rgba(200,160,174,0.28)',
                    }
                ),
              }}
            >
              <span style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.12em', opacity: 0.55 }}>
                {CATEGORY_NUMS[i]}
              </span>
              <span style={{
                fontSize: '10.5px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: selected === svc.id ? 500 : 400,
              }}>
                {svc.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: sidebar + content ── */}
      <div className="relative z-10 flex" style={{ minHeight: 'calc(100vh - 210px)' }}>

        {/* ── PREMIUM SIDEBAR ── */}
        <div
          className="hidden lg:flex flex-col w-64 shrink-0 py-6 px-3.5 gap-1"
          style={{
            background: 'linear-gradient(180deg, rgba(243,231,234,0.92) 0%, rgba(238,223,227,0.88) 100%)',
            borderRight: '1px solid rgba(200,160,174,0.12)',
          }}
        >
          <p style={{
            fontSize: '9.5px',
            fontWeight: 500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(160,112,128,0.5)',
            paddingLeft: '14px',
            marginBottom: '8px',
          }}>
            Категорії
          </p>

          {s.list.map((svc, i) => {
            const isActive = selected === svc.id
            return (
              <motion.button
                key={svc.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.38 }}
                onClick={() => setSelected(svc.id)}
                className="w-full text-left relative group"
                style={{
                  padding: '11px 14px',
                  borderRadius: '10px',
                  transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  background: isActive ? 'rgba(180,120,145,0.13)' : 'transparent',
                  boxShadow: isActive ? '0 4px 18px rgba(160,100,130,0.12)' : 'none',
                  borderLeft: `3px solid ${isActive ? '#2D1520' : 'transparent'}`,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(200,160,174,0.18)'
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(160,112,128,0.08)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span style={{
                      fontSize: '9.5px',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      color: isActive ? '#2D1520' : 'rgba(160,112,128,0.4)',
                      transition: 'color 0.25s',
                      fontFamily: 'Raleway, sans-serif',
                    }}>
                      {CATEGORY_NUMS[i]}
                    </span>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: isActive ? 500 : 400,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: isActive ? '#2D1520' : '#8B6070',
                      transition: 'all 0.25s',
                    }}>
                      {svc.name}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 500,
                    color: isActive ? '#2D1520' : 'rgba(160,112,128,0.35)',
                    background: isActive ? 'rgba(45,21,32,0.09)' : 'transparent',
                    padding: '2px 7px',
                    borderRadius: '100px',
                    transition: 'all 0.25s',
                  }}>
                    {svc.items.length}
                  </span>
                </div>
              </motion.button>
            )
          })}

          {/* Atmospheric preview photo */}
          <div className="mt-auto pt-5 px-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                style={{ borderRadius: '12px', overflow: 'hidden', height: '130px', position: 'relative' }}
              >
                <img
                  src={PREVIEW_PHOTOS[activeIdx] || PREVIEW_PHOTOS[0]}
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: 0.72,
                    filter: 'saturate(0.8)',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(238,223,227,0.88) 0%, transparent 55%)',
                }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="flex-1 px-8 md:px-10 lg:px-12 xl:px-16 py-8 pb-16">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category header */}
                <div className="mb-8">
                  <h2
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(26px, 3.5vw, 46px)',
                      fontWeight: 300,
                      color: '#2D1520',
                      lineHeight: 1.05,
                      letterSpacing: '-0.01em',
                      marginBottom: '8px',
                    }}
                  >
                    {active.name}
                  </h2>
                  <p
                    className="font-serif italic"
                    style={{ fontSize: '13.5px', color: '#A07888', letterSpacing: '0.02em', lineHeight: '1.75', fontWeight: 300 }}
                  >
                    {active.desc}
                  </p>
                </div>

                {/* Service cards */}
                <div className="flex flex-col gap-3">
                  {active.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.32 }}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '18px 22px',
                        borderRadius: '14px',
                        border: `1px solid ${hoveredItem === item.name ? 'rgba(160,112,128,0.22)' : 'rgba(200,160,174,0.14)'}`,
                        background: hoveredItem === item.name
                          ? 'rgba(240,216,223,0.42)'
                          : 'rgba(242,222,228,0.38)',
                        boxShadow: hoveredItem === item.name
                          ? '0 8px 28px rgba(160,112,128,0.10)'
                          : '0 2px 8px rgba(160,112,128,0.03)',
                        transition: 'all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        cursor: 'default',
                        transform: hoveredItem === item.name ? 'translateY(-1px)' : 'translateY(0)',
                      }}
                    >
                      {/* Left: name + duration */}
                      <div>
                        <div style={{
                          fontSize: '15px',
                          fontWeight: 400,
                          color: '#2D1520',
                          letterSpacing: '0.01em',
                          marginBottom: '6px',
                          fontFamily: 'Raleway, sans-serif',
                        }}>
                          {item.name}
                        </div>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '9.5px',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#C8A0AE',
                          background: 'rgba(200,160,174,0.10)',
                          padding: '3px 9px',
                          borderRadius: '100px',
                        }}>
                          <Clock size={9} strokeWidth={1.5} />
                          {item.duration}
                        </div>
                      </div>

                      {/* Right: price */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexShrink: 0 }}>
                        <span
                          className="font-serif"
                          style={{
                            fontSize: 'clamp(22px, 2.4vw, 30px)',
                            color: hoveredItem === item.name ? '#2D1520' : '#3D1F2C',
                            fontWeight: 300,
                            lineHeight: 1,
                            transition: 'color 0.28s',
                          }}
                        >
                          {item.price}
                        </span>
                        <span style={{ fontSize: '11px', color: '#A07888', fontWeight: 300, letterSpacing: '0.05em' }}>Kč</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Premium CTA */}
                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat', {
                      detail: { service: active.name }
                    }))}
                    className="inline-flex items-center gap-3 transition-all duration-300"
                    style={{
                      background: '#2D1520',
                      color: '#F6EBF0',
                      padding: '16px 38px',
                      fontSize: '11px',
                      letterSpacing: '0.26em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#4A2535'
                      e.currentTarget.style.boxShadow = '0 12px 36px rgba(45,21,32,0.26)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#2D1520'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {s.bookBtn} {active.name}
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </button>

                  <span style={{ fontSize: '11px', color: '#C8A0AE', letterSpacing: '0.08em' }}>
                    via AI-асистент
                  </span>
                </div>

                {/* Mobile atmosphere photos */}
                <div className="lg:hidden mt-10 flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                  {[PREVIEW_PHOTOS[activeIdx], PREVIEW_PHOTOS[(activeIdx + 1) % PREVIEW_PHOTOS.length]].map((src, i) => (
                    <div
                      key={i}
                      className="shrink-0"
                      style={{
                        width: '140px', height: '140px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        opacity: 0.75,
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85)' }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </motion.div>
  )
}
