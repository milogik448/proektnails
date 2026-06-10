import { motion } from 'framer-motion'

export default function SectionHeader({ tag, title, center = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={{ textAlign: center ? 'center' : 'left', marginBottom: center ? 52 : '2.5rem' }}
    >
      <motion.span
        className="section-tag"
        variants={{
          hidden:  { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
        style={center ? { display: 'block', textAlign: 'center' } : {}}
      >
        {tag}
      </motion.span>

      {/* Mask reveal — заголовок виїжджає з-під невидимої маски */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          className="font-serif"
          variants={{
            hidden:  { y: '110%' },
            visible: { y: 0, transition: { duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 300, color: '#2D1520', lineHeight: 1.1 }}
        >
          {title}
        </motion.h2>
      </div>

      <motion.div
        variants={{
          hidden:  { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] } },
        }}
        style={{
          height: 1,
          maxWidth: center ? 140 : 80,
          marginTop: 12,
          transformOrigin: center ? 'center' : 'left',
          ...(center ? { margin: '18px auto 0' } : {}),
          background: center
            ? 'linear-gradient(90deg, transparent, rgba(160,148,128,0.55), transparent)'
            : 'linear-gradient(90deg, rgba(160,148,128,0.55), transparent)',
        }}
      />
    </motion.div>
  )
}
