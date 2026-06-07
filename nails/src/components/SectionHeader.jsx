import { motion } from 'framer-motion'

const fadeUpView = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function SectionHeader({ tag, title, center = false }) {
  return (
    <motion.div {...fadeUpView(0)} style={{ textAlign: center ? 'center' : 'left', marginBottom: center ? 52 : '2.5rem' }}>
      <span className="section-tag" style={center ? { display: 'block', textAlign: 'center' } : {}}>{tag}</span>
      <h2
        className="font-serif"
        style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 300, color: '#2D1520', lineHeight: 1.1 }}
      >
        {title}
      </h2>
      <div style={{
        height: 1,
        maxWidth: center ? 140 : 80,
        marginTop: 12,
        ...(center ? { margin: '18px auto 0' } : {}),
        background: center
          ? 'linear-gradient(90deg, transparent, rgba(160,148,128,0.55), transparent)'
          : 'linear-gradient(90deg, rgba(160,148,128,0.55), transparent)',
      }} />
    </motion.div>
  )
}