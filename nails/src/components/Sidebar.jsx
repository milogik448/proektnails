import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Sparkles, Star, Phone, Instagram } from 'lucide-react'

const NAV_IDS = [
  { id: 'home',     Icon: Home },
  { id: 'about',    Icon: User },
  { id: 'services', Icon: Sparkles },
  { id: 'reviews',  Icon: Star },
  { id: 'contacts', Icon: Phone },
]

const LANGS = [
  { code: 'uk', label: 'УКР' },
  { code: 'en', label: 'ENG' },
  { code: 'cs', label: 'ČES' },
]

const SIDEBAR_BG  = '#F0D8DF'
const TEXT_MUTED  = '#A07888'
const TEXT_ACTIVE = '#2D1520'
const DIVIDER     = 'rgba(160,100,120,0.18)'

const itemVariants = {
  hidden:  { opacity: 0, x: -14 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.42, ease: 'easeOut' },
  }),
}

function SidebarInner({ activePage, onNavigate, lang, setLang, t }) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Logo */}
      <div className="px-6 pt-10 pb-8 shrink-0">
        <button onClick={() => onNavigate('home')} className="block text-left">
          <div
            className="font-serif text-[22px] tracking-[0.32em] leading-none mb-1.5"
            style={{ color: TEXT_ACTIVE, fontWeight: 400 }}
          >
            ANJELIKA
          </div>
          <div
            className="text-[9px] tracking-[0.45em] uppercase font-light"
            style={{ color: TEXT_MUTED }}
          >
            Nail Studio · Praha
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px shrink-0" style={{ backgroundColor: DIVIDER }} />

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 py-6">
        {NAV_IDS.map(({ id, Icon }, i) => (
          <motion.button
            key={id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            onClick={() => onNavigate(id)}
            className={`nav-item-btn ${activePage === id ? 'active' : ''}`}
          >
            <Icon
              size={13}
              className="shrink-0"
              style={{
                color: activePage === id ? TEXT_ACTIVE : TEXT_MUTED,
                transition: 'color 0.3s',
              }}
            />
            <span>{t.nav[id]}</span>
          </motion.button>
        ))}
      </nav>

      {/* Instagram */}
      <div className="px-6 pb-4 shrink-0">
        <div className="h-px mb-5" style={{ backgroundColor: DIVIDER }} />
        <a
          href="https://www.instagram.com/anjelikaa_nails"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-[10px] tracking-[0.22em] uppercase transition-colors duration-300"
          style={{ color: TEXT_MUTED }}
          onMouseEnter={e => e.currentTarget.style.color = TEXT_ACTIVE}
          onMouseLeave={e => e.currentTarget.style.color = TEXT_MUTED}
        >
          <Instagram size={11} />
          @anjelikaa_nails
        </a>
      </div>

      {/* Language switcher */}
      <div className="px-6 pb-8 shrink-0">
        <div className="h-px mb-4" style={{ backgroundColor: DIVIDER }} />
        <div className="flex gap-1">
          {LANGS.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className="text-[9px] tracking-[0.24em] uppercase px-3 py-1.5 transition-all duration-200"
              style={{
                color: lang === code ? TEXT_ACTIVE : TEXT_MUTED,
                backgroundColor: lang === code ? 'rgba(45,21,32,0.09)' : 'transparent',
                fontWeight: lang === code ? 500 : 300,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ activePage, onNavigate, isOpen, lang, setLang, t }) {
  return (
    <>
      {/* Desktop — always visible */}
      <aside
        className="fixed left-0 top-0 bottom-0 w-[260px] z-50 hidden lg:block"
        style={{ backgroundColor: SIDEBAR_BG }}
      >
        <SidebarInner activePage={activePage} onNavigate={onNavigate} lang={lang} setLang={setLang} t={t} />
      </aside>

      {/* Mobile — slide in from right */}
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
            <SidebarInner activePage={activePage} onNavigate={onNavigate} lang={lang} setLang={setLang} t={t} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
