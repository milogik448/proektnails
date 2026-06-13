import { motion } from 'framer-motion'
import { useEffect } from 'react'

const SPLASH_DURATION = 3200

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const id = setTimeout(() => { if (onDone) onDone() }, SPLASH_DURATION)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#FAF7F2',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Мʼякий ambient blob фон */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,148,128,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* VELOURA + with love підпис як автограф */}
      <div style={{ position: 'relative', zIndex: 2, display: 'inline-block' }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'DM Serif Display, serif',
              fontSize: 'clamp(54px, 8vw, 112px)',
              fontWeight: 400,
              color: '#2D1520',
              letterSpacing: '0.04em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            VELOURA
          </motion.h1>
        </div>

        {/* with love — як підпис художника у правому нижньому куті */}
        <motion.div
          initial={{ opacity: 0, y: 8, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -8 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            right: '-12px',
            bottom: '-38px',
            fontFamily: 'Sacramento, cursive',
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            color: 'rgba(45,21,32,0.62)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            transformOrigin: 'left center',
          }}
        >
          with love
        </motion.div>
      </div>

      {/* Praha капсами знизу */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        style={{
          position: 'absolute', bottom: 32, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: 'Raleway, sans-serif',
          fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase',
          color: 'rgba(160,148,128,0.65)', fontWeight: 400,
          zIndex: 2,
        }}
      >
        Praha · Studio
      </motion.div>
    </motion.div>
  )
}
