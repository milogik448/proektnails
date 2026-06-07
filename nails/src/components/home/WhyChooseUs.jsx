import { motion } from 'framer-motion'
import { Heart, Clock, BadgeCheck, MapPin } from 'lucide-react'
import SectionHeader from '../SectionHeader'

const WHY_ICONS = [Heart, Clock, BadgeCheck, MapPin]

export default function WhyChooseUs({ t }) {
  const h = t.home
  return (
    <section className="px-8 md:px-12 lg:px-16 xl:px-20 py-12">
      <SectionHeader tag="VELOURA Studio" title={h.whyVelouraTitle} center />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {h.whyItems.map(({ title, desc }, i) => {
          const Icon = WHY_ICONS[i]
          return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                background: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(160,148,128,0.18)',
                borderRadius: 20,
                padding: '32px 28px',
                boxShadow: '0 4px 24px rgba(45,21,32,0.06), 0 1px 4px rgba(45,21,32,0.03)',
                transition: 'all 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 22px 52px rgba(45,21,32,0.1), 0 4px 16px rgba(45,21,32,0.06)'
                e.currentTarget.style.borderColor = 'rgba(160,148,128,0.38)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.88)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(45,21,32,0.06), 0 1px 4px rgba(45,21,32,0.03)'
                e.currentTarget.style.borderColor = 'rgba(160,148,128,0.18)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.68)'
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 14,
                background: 'linear-gradient(135deg, rgba(160,148,128,0.18), rgba(160,148,128,0.07))',
                border: '1px solid rgba(160,148,128,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 22,
              }}>
                <Icon size={18} style={{ color: '#A09278', strokeWidth: 1.5 }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1520', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em', marginBottom: 10 }}>
                {title}
              </div>
              <div style={{ fontSize: 12, fontWeight: 300, color: '#887060', fontFamily: 'Raleway, sans-serif', lineHeight: 1.85 }}>
                {desc}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}