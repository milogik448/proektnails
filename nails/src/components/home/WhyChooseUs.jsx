import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const NUMS = ['01', '02', '03', '04']

export default function WhyChooseUs({ t }) {
  const h = t.home
  return (
    <section className="px-8 md:px-12 lg:px-16 xl:px-20 py-12">
      <SectionHeader tag="VELOURA Studio" title={h.whyVelouraTitle} center />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {h.whyItems.map(({ title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ cursor: 'default', position: 'relative' }}
            onMouseEnter={e => {
              const num = e.currentTarget.querySelector('.why-num')
              const line = e.currentTarget.querySelector('.why-line')
              if (num) num.style.color = 'rgba(45,21,32,0.85)'
              if (line) line.style.width = '52px'
            }}
            onMouseLeave={e => {
              const num = e.currentTarget.querySelector('.why-num')
              const line = e.currentTarget.querySelector('.why-line')
              if (num) num.style.color = 'rgba(160,148,128,0.45)'
              if (line) line.style.width = '28px'
            }}
          >
            {/* Велика цифра */}
            <div
              className="why-num"
              style={{
                fontFamily: 'DM Serif Display, serif',
                fontSize: 'clamp(40px, 4vw, 54px)',
                fontWeight: 400, fontStyle: 'italic',
                color: 'rgba(160,148,128,0.45)',
                lineHeight: 1,
                marginBottom: 14,
                transition: 'color 0.4s ease',
                userSelect: 'none',
              }}
            >
              {NUMS[i]}
            </div>

            {/* Лінія-акцент */}
            <div
              className="why-line"
              style={{
                width: 28, height: 1,
                background: 'rgba(160,148,128,0.55)',
                marginBottom: 18,
                transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />

            <div style={{ fontSize: 13, fontWeight: 500, color: '#2D1520', fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em', marginBottom: 10 }}>
              {title}
            </div>
            <div style={{ fontSize: 12, fontWeight: 300, color: '#887060', fontFamily: 'Raleway, sans-serif', lineHeight: 1.85 }}>
              {desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
