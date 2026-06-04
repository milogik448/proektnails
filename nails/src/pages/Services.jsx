import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

const CATEGORY_NUMS = ['01', '02', '03', '04', '05', '06']

export default function Services({ t }) {
  const s = t.services
  const [selected, setSelected] = useState('manicure')
  const [hoveredItem, setHoveredItem] = useState(null)
  const active = s.list.find(svc => svc.id === selected)

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{ duration: 0.38 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Atmospheric background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-8%', right: '-6%', width: '620px', height: '620px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(210,170,185,0.11) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '0%', left: '-12%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,112,128,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', top: '35%', right: '20%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,220,230,0.35) 0%, transparent 65%)' }} />
      </div>

      {/* ── HEADER ── */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-12 pb-6">
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

        <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(160,112,128,0.25), rgba(160,112,128,0.08), transparent)', marginTop: '24px' }} />
      </div>

      {/* ── CATEGORY CHIPS (all screens) ── */}
      <div className="relative z-10 pb-6">
        <div
          className="flex gap-2 lg:flex-wrap lg:px-8 md:lg:px-12"
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
            flexWrap: 'nowrap',
          }}
        >
          {s.list.map((svc, i) => (
            <button
              key={svc.id}
              onClick={() => setSelected(svc.id)}
              className="flex items-center gap-2 transition-all duration-300 shrink-0"
              style={{
                padding: '9px 18px',
                borderRadius: '100px',
                ...(selected === svc.id
                  ? { background: '#2D1520', color: '#F6EBF0', boxShadow: '0 4px 16px rgba(45,21,32,0.22)' }
                  : { background: 'rgba(255,255,255,0.68)', color: '#8B6070', border: '1px solid rgba(200,160,174,0.28)' }
                ),
              }}
            >
              <span style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.12em', opacity: 0.55 }}>
                {CATEGORY_NUMS[i]}
              </span>
              <span style={{ fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: selected === svc.id ? 500 : 400 }}>
                {svc.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pb-20">
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
              <div className="mb-7">
                <h2
                  className="font-serif"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 46px)', fontWeight: 300, color: '#2D1520', lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: '8px' }}
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
              <div className="flex flex-col gap-3 max-w-2xl">
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
                      padding: '20px 26px',
                      borderRadius: '16px',
                      border: `1px solid ${hoveredItem === item.name ? 'rgba(160,112,128,0.22)' : 'rgba(200,160,174,0.18)'}`,
                      background: hoveredItem === item.name ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,0.72)',
                      boxShadow: hoveredItem === item.name
                        ? '0 12px 36px rgba(45,21,32,0.1), 0 2px 8px rgba(45,21,32,0.06)'
                        : '0 4px 16px rgba(45,21,32,0.05), 0 1px 4px rgba(45,21,32,0.03)',
                      transition: 'all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      cursor: 'default',
                      transform: hoveredItem === item.name ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                  >
                    {/* Left: name + duration */}
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 400, color: '#2D1520', letterSpacing: '0.01em', marginBottom: '6px', fontFamily: 'Raleway, sans-serif' }}>
                        {item.name}
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A0AE', background: 'rgba(200,160,174,0.10)', padding: '3px 9px', borderRadius: '100px' }}>
                        <Clock size={9} strokeWidth={1.5} />
                        {item.duration}
                      </div>
                    </div>

                    {/* Right: price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexShrink: 0 }}>
                      <span className="font-serif" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', color: '#2D1520', fontWeight: 300, lineHeight: 1, transition: 'color 0.28s' }}>
                        {item.price}
                      </span>
                      <span style={{ fontSize: '11px', color: '#A07888', fontWeight: 300, letterSpacing: '0.05em' }}>Kč</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: { service: active.name } }))}
                  className="inline-flex items-center gap-3 transition-all duration-300"
                  style={{ background: '#2D1520', color: '#F6EBF0', padding: '16px 38px', fontSize: '11px', letterSpacing: '0.26em', textTransform: 'uppercase', fontWeight: 500, borderRadius: '100px', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#4A2535'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(45,21,32,0.26)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#2D1520'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {s.bookBtn} {active.name}
                  <ArrowRight size={13} strokeWidth={1.5} />
                </button>
                <span style={{ fontSize: '11px', color: '#C8A0AE', letterSpacing: '0.08em' }}>via AI-асистент</span>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
