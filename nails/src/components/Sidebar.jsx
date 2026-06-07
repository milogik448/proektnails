import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Gem, Star, Phone, Instagram } from 'lucide-react'

const NAV_IDS = [
  { id: 'home',     Icon: Home },
  { id: 'about',    Icon: User },
  { id: 'services', Icon: Gem },
  { id: 'reviews',  Icon: Star },
  { id: 'contacts', Icon: Phone },
]

const LANGS = [
  { code: 'uk', label: 'УКР' },
  { code: 'en', label: 'ENG' },
  { code: 'cs', label: 'ČES' },
]

const SIDEBAR_BG  = '#F2EDE6'
const TEXT_MUTED  = '#887060'
const TEXT_ACTIVE = '#2D1520'
const DIVIDER     = 'rgba(130,110,90,0.18)'
const ICON_W      = 64   // collapsed width

const itemVariants = {
  hidden:  { opacity: 0, x: -14 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.42, ease: 'easeOut' },
  }),
}

/* Inner content is always 260px wide — the aside clips it via overflow:hidden */
function SidebarInner({ activePage, onNavigate, lang, setLang, t, isExpanded = true, isMobile = false }) {
  return (
    <div style={{ width: 260, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>

      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.02, ease: 'easeOut' }}
        style={{ paddingTop: 32, paddingBottom: 26, flexShrink: 0 }}
      >
        <button
          onClick={() => onNavigate('home')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          {/* Icon zone — always 64px, centered */}
          <div style={{ width: ICON_W, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18.5" stroke="rgba(160,148,128,0.48)" strokeWidth="0.72"/>
              <line x1="9.5" y1="12.5" x2="14.5" y2="12.5" stroke={TEXT_ACTIVE} strokeWidth="1.15"/>
              <line x1="25.5" y1="12.5" x2="30.5" y2="12.5" stroke={TEXT_ACTIVE} strokeWidth="1.15"/>
              <polyline points="11.5,12.5 20,28.5 28.5,12.5" stroke={TEXT_ACTIVE} strokeWidth="1.15" fill="none" strokeLinejoin="miter"/>
              <circle cx="20" cy="28.5" r="1.25" fill="rgba(160,148,128,0.72)"/>
            </svg>
          </div>
          {/* Text zone — animates in when expanded */}
          <motion.div
            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
            transition={{ duration: 0.25, delay: isExpanded ? 0.12 : 0, ease: 'easeOut' }}
            style={{ textAlign: 'left', whiteSpace: 'nowrap' }}
          >
            <div style={{ fontSize: '13px', letterSpacing: '0.38em', fontFamily: 'Raleway, sans-serif', fontWeight: 500, color: TEXT_ACTIVE, lineHeight: 1 }}>
              VELOURA
            </div>
            <div style={{ fontSize: '7.5px', letterSpacing: '0.42em', fontFamily: 'Raleway, sans-serif', fontWeight: 300, color: TEXT_MUTED, marginTop: 5, textTransform: 'uppercase' }}>
              Studio · Prague
            </div>
          </motion.div>
        </button>
      </motion.div>

      {/* Divider */}
      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.25, delay: isExpanded ? 0.12 : 0 }}
        style={{ margin: '0 28px', height: 1, backgroundColor: DIVIDER, flexShrink: 0 }}
      />

      {/* ── Nav ── */}
      <nav style={{ flexShrink: 0, paddingTop: 8, paddingBottom: 4 }}>
        {NAV_IDS.map(({ id, Icon }, i) => {
          const isActive = activePage === id
          return (
            <motion.button
              key={id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              onClick={() => onNavigate(id)}
              style={{
                display: 'flex', alignItems: 'center',
                width: '100%', background: 'none', border: 'none',
                cursor: 'pointer', padding: '14px 0',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(130,110,90,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {/* Active indicator */}
              {isActive && (
                <div style={{
                  position: 'absolute', left: 0, top: '20%', bottom: '20%',
                  width: 2, borderRadius: 2,
                  background: TEXT_ACTIVE,
                }} />
              )}
              {/* Icon zone */}
              <div style={{ width: ICON_W, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} style={{ color: isActive ? TEXT_ACTIVE : TEXT_MUTED, transition: 'color 0.3s' }} />
              </div>
              {/* Label */}
              <motion.span
                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                transition={{ duration: 0.25, delay: isExpanded ? 0.12 : 0, ease: 'easeOut' }}
                style={{
                  fontSize: '9.5px', letterSpacing: '0.28em', textTransform: 'uppercase',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: isActive ? 500 : 300,
                  color: isActive ? TEXT_ACTIVE : TEXT_MUTED,
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {t.nav[id]}
              </motion.span>
            </motion.button>
          )
        })}
      </nav>

      {/* ── Collapsed bottom (icon-only) ── */}
      <AnimatePresence>
        {!isExpanded && !isMobile && (
          <motion.div
            key="collapsed-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: 'auto', paddingBottom: 24, flexShrink: 0 }}
          >
            {/* Instagram icon */}
            <a
              href="https://www.instagram.com/anjelikaa_nails"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', justifyContent: 'center', width: ICON_W, marginBottom: 14, textDecoration: 'none', transition: 'opacity 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <Instagram size={13} style={{ color: TEXT_MUTED }} />
            </a>
            {/* Language — active code only */}
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  width: ICON_W, height: 20,
                  fontSize: '7.5px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: lang === code ? TEXT_ACTIVE : TEXT_MUTED,
                  fontWeight: lang === code ? 600 : 300,
                  fontFamily: 'Raleway, sans-serif',
                  background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom block (expanded) ── */}
      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
        transition={{ duration: 0.25, delay: isExpanded ? 0.12 : 0, ease: 'easeOut' }}
        style={{ marginTop: isMobile ? 'auto' : 0, paddingBottom: 24, flexShrink: 0, pointerEvents: isExpanded ? 'auto' : 'none', position: isMobile ? 'relative' : 'absolute', bottom: isMobile ? 'auto' : 0, left: 0, width: '100%' }}
      >

        {/* Instagram */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, delay: 0.44, ease: 'easeOut' }}
        >
          <div style={{ height: 1, backgroundColor: DIVIDER, margin: '0 28px 18px' }} />
          <a
            href="https://www.instagram.com/anjelikaa_nails"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', transition: 'opacity 0.25s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ width: ICON_W, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              <Instagram size={11} style={{ color: TEXT_MUTED }} />
            </div>
            <span style={{ fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: TEXT_MUTED, whiteSpace: 'nowrap' }}>
              @anjelikaa_nails
            </span>
          </a>
        </motion.div>

        {/* Language switcher */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, delay: 0.52, ease: 'easeOut' }}
        >
          <div style={{ height: 1, backgroundColor: DIVIDER, margin: '16px 28px 14px' }} />
          <div style={{ display: 'flex', gap: 2, paddingLeft: ICON_W }}>
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                style={{
                  fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '5px 10px',
                  color: lang === code ? TEXT_ACTIVE : TEXT_MUTED,
                  backgroundColor: lang === code ? 'rgba(45,21,32,0.08)' : 'transparent',
                  fontWeight: lang === code ? 500 : 300,
                  fontFamily: 'Raleway, sans-serif',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Sidebar({ activePage, onNavigate, isOpen, lang, setLang, t }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Desktop backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 hidden lg:block"
            style={{ backgroundColor: 'rgba(45,21,32,0.18)', backdropFilter: 'blur(2px)' }}
            onMouseEnter={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop — icon-only by default, expands on hover */}
      <motion.aside
        className="fixed left-0 top-0 bottom-0 z-50 hidden lg:block"
        style={{
          backgroundColor: SIDEBAR_BG,
          overflow: 'hidden',
          boxShadow: isExpanded ? '4px 0 32px rgba(45,21,32,0.12)' : 'none',
          transition: 'box-shadow 0.32s ease',
        }}
        animate={{ width: isExpanded ? 260 : ICON_W }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <SidebarInner activePage={activePage} onNavigate={onNavigate} lang={lang} setLang={setLang} t={t} isExpanded={isExpanded} />
      </motion.aside>

      {/* Mobile — slide in from right (unchanged) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial={{ x: 260 }}
            animate={{ x: 0 }}
            exit={{ x: 260 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 w-[260px] z-50 lg:hidden"
            style={{ backgroundColor: SIDEBAR_BG }}
          >
            <SidebarInner activePage={activePage} onNavigate={onNavigate} lang={lang} setLang={setLang} t={t} isMobile={true} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
