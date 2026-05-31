import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Reviews from './pages/Reviews'
import Contacts from './pages/Contacts'
import { translations } from './i18n'

const PAGES = { home: Home, about: About, services: Services, gallery: Gallery, reviews: Reviews, contacts: Contacts }
const VALID_PAGES = Object.keys(PAGES)

const getPageFromHash = () => {
  const hash = window.location.hash.replace('#', '')
  return VALID_PAGES.includes(hash) ? hash : 'home'
}

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('uk')

  const navigate = (page) => {
    setActivePage(page)
    setMenuOpen(false)
    window.location.hash = page === 'home' ? '' : page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getPageFromHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const Page = PAGES[activePage]
  const t = translations[lang]

  return (
    <>
      {/* Atmospheric background — fixed, blurred, darkened work photo */}
      <div className="fixed inset-0" style={{ zIndex: -1 }}>
        <img
          src="/images/works/IMG_5603.JPG"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(32px) brightness(0.14) saturate(0.5)',
            transform: 'scale(1.1)',
          }}
        />
      </div>

      {/* Nude pink safety layer — sits in front of dark photo, behind all content */}
      <div
        aria-hidden="true"
        className="fixed inset-0"
        style={{ zIndex: -1, backgroundColor: '#F2DEE4' }}
      />

      {/* Atmosphere: soft ambient gradient blobs */}
      <div aria-hidden="true" className="fixed inset-0" style={{ zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Top-right blush bloom */}
        <div style={{
          position: 'absolute', top: '-12%', right: '-6%',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,160,174,0.13) 0%, transparent 62%)',
        }} />
        {/* Bottom-left soft glow */}
        <div style={{
          position: 'absolute', bottom: '4%', left: '-8%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,160,174,0.09) 0%, transparent 66%)',
        }} />
        {/* Centre warm bloom */}
        <div style={{
          position: 'absolute', top: '35%', left: '40%',
          width: 440, height: 440, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(242,215,224,0.22) 0%, transparent 65%)',
        }} />
        {/* Bottom-right subtle burgundy accent */}
        <div style={{
          position: 'absolute', bottom: '18%', right: '6%',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(61,30,42,0.042) 0%, transparent 65%)',
        }} />
      </div>

      {/* Atmosphere: barely-visible grain/noise — premium paper texture */}
      <svg
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 9, pointerEvents: 'none', opacity: 0.022,
        }}
      >
        <filter id="app-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#app-grain)" />
      </svg>

      <div className="flex min-h-screen" style={{ backgroundColor: 'rgba(242,222,228,0.94)' }}>
        {/* Mobile backdrop */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={navigate}
          isOpen={menuOpen}
          lang={lang}
          setLang={setLang}
          t={t}
        />

        {/* Main */}
        <div
          className="flex-1 lg:ml-[64px] flex flex-col min-h-screen"
          style={{ backgroundColor: 'rgba(242,222,228,0.97)', overflow: 'hidden' }}
        >
          {/* Mobile top bar */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 border-b border-ghost"
               style={{ backgroundColor: 'rgba(242,222,228,0.97)' }}>
            <button
              onClick={() => navigate('home')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18.5" stroke="rgba(200,160,174,0.5)" strokeWidth="0.8"/>
                <line x1="9.5" y1="12.5" x2="14.5" y2="12.5" stroke="#2D1520" strokeWidth="1.2"/>
                <line x1="25.5" y1="12.5" x2="30.5" y2="12.5" stroke="#2D1520" strokeWidth="1.2"/>
                <polyline points="11.5,12.5 20,28.5 28.5,12.5" stroke="#2D1520" strokeWidth="1.2" fill="none" strokeLinejoin="miter"/>
                <circle cx="20" cy="28.5" r="1.3" fill="rgba(200,160,174,0.7)"/>
              </svg>
              <span style={{ fontFamily: 'Raleway, sans-serif', fontSize: '13px', letterSpacing: '0.3em', fontWeight: 500, color: '#2D1520' }}>
                VELOURA
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
              className="w-9 h-9 flex items-center justify-center text-ink hover:text-ash transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Page content */}
          <div className="flex-1 pt-[57px] lg:pt-0 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <AnimatePresence mode="wait">
                <Page key={activePage} onNavigate={navigate} lang={lang} t={t} />
              </AnimatePresence>
            </div>
            <Footer lang={lang} />
          </div>
        </div>
      </div>
      <ChatWidget menuOpen={menuOpen} lang={lang} />
    </>
  )
}
