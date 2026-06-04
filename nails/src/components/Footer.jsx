import { motion } from 'framer-motion'
import { Instagram, MapPin, Sparkles, ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Головна',     page: 'home' },
  { label: 'Про майстра', page: 'about' },
  { label: 'Послуги',     page: 'services' },
  { label: 'Відгуки',     page: 'reviews' },
  { label: 'Контакти',    page: 'contacts' },
]

const SERVICES = ['Манікюр', 'Педикюр', 'Гель-лак', 'Укріплення', 'Дизайн нігтів']

/* ── palette on soft rose block ── */
const BG        = '#EDE8E1'
const HEADING   = '#2D1520'
const BODY      = '#5A4A42'
const MUTED     = '#8A7A72'
const ACCENT    = '#A65F77'
const HAIRLINE  = 'rgba(45,21,32,0.12)'

function FooterLink({ onClick, href, children }) {
  const style = {
    fontSize: '12.5px', letterSpacing: '0.02em',
    color: BODY, fontFamily: 'Raleway, sans-serif',
    fontWeight: 400, textDecoration: 'none',
    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    textAlign: 'left', display: 'block', marginBottom: 8,
    transition: 'color 0.22s ease, transform 0.22s ease',
  }
  const hover = e => { e.currentTarget.style.color = HEADING; e.currentTarget.style.transform = 'translateX(3px)' }
  const leave = e => { e.currentTarget.style.color = BODY; e.currentTarget.style.transform = 'translateX(0)' }

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>
  return <button style={style} onClick={onClick} onMouseEnter={hover} onMouseLeave={leave}>{children}</button>
}

function ColTitle({ children }) {
  return (
    <div style={{ fontSize: '9.5px', letterSpacing: '0.32em', textTransform: 'uppercase', color: ACCENT, fontFamily: 'Raleway, sans-serif', fontWeight: 500, marginBottom: 13 }}>
      {children}
    </div>
  )
}

export default function Footer({ onNavigate }) {
  const openChat = () => window.dispatchEvent(new Event('open-ai-chat'))

  return (
    <motion.footer
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'relative', backgroundColor: BG, marginTop: 40,
        WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      {/* top hairline glow */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(140,120,100,0.2), transparent)' }} />

      <div className="px-6 md:px-12" style={{ maxWidth: 1320, margin: '0 auto' }}>

        {/* ── CTA strip ── */}
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          style={{ gap: 16, padding: '24px 0 20px', borderBottom: `1px solid ${HAIRLINE}` }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
              <Sparkles size={12} style={{ color: ACCENT }} />
              <span style={{ fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: ACCENT, fontFamily: 'Raleway, sans-serif', fontWeight: 500 }}>
                Запис відкрито
              </span>
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 26px)', lineHeight: 1.16, color: HEADING, letterSpacing: '0.005em' }}>
              Готові довірити нам свої руки?
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <button
              onClick={openChat}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: HEADING, color: '#F0DFE6', border: 'none', cursor: 'pointer',
                padding: '12px 22px', borderRadius: 999,
                fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
                fontFamily: 'Raleway, sans-serif', fontWeight: 600,
                transition: 'transform 0.22s ease, box-shadow 0.22s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(45,21,32,0.22)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              AI-запис онлайн
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* ── Columns ── */}
        <div className="grid grid-cols-2 lg:grid-cols-12" style={{ gap: '24px 24px', padding: '24px 0 22px' }}>

          {/* Brand anchor */}
          <div className="col-span-2 lg:col-span-5" style={{ paddingRight: 24 }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(26px, 3.4vw, 32px)', fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: HEADING, lineHeight: 1 }}>
              Veloura
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '14px', fontWeight: 400, color: ACCENT, marginTop: 7, marginBottom: 16 }}>
              «Краса у деталях»
            </div>
            <p style={{ fontSize: '11.5px', lineHeight: 1.75, color: BODY, fontFamily: 'Raleway, sans-serif', fontWeight: 400, maxWidth: 290, marginBottom: 14 }}>
              Преміальний манікюр та педикюр у Празі. Стерильність, увага до деталей і затишна атмосфера для кожної гості.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: MUTED, fontSize: '10.5px', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
              <MapPin size={12} style={{ color: ACCENT }} />
              Praha, Česká republika
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <ColTitle>Навігація</ColTitle>
            {NAV_LINKS.map(({ label, page }) => (
              <FooterLink key={page} onClick={() => onNavigate?.(page)}>{label}</FooterLink>
            ))}
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <ColTitle>Послуги</ColTitle>
            {SERVICES.map(s => (
              <FooterLink key={s} onClick={() => onNavigate?.('services')}>{s}</FooterLink>
            ))}
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-2">
            <ColTitle>Зв'язатись</ColTitle>
            <a
              href="https://www.instagram.com/anjelikaa_nails"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 9, textDecoration: 'none', marginBottom: 14, color: BODY, transition: 'color 0.22s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = HEADING}
              onMouseLeave={e => e.currentTarget.style.color = BODY}
            >
              <Instagram size={15} style={{ color: ACCENT }} />
              <span style={{ fontSize: '12.5px', letterSpacing: '0.02em', fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>@anjelikaa_nails</span>
            </a>
            <FooterLink onClick={() => onNavigate?.('contacts')}>Записатись онлайн</FooterLink>
            <div style={{ fontSize: '11.5px', color: MUTED, fontFamily: 'Raleway, sans-serif', fontWeight: 400, lineHeight: 1.85, marginTop: 4 }}>
              Прийом за попереднім записом
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: `1px solid ${HAIRLINE}` }}>
        <div className="px-6 md:px-12 flex-col md:flex-row text-center md:text-left" style={{ maxWidth: 1320, margin: '0 auto', paddingTop: 14, paddingBottom: 14, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED, fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
            © 2026 VELOURA Studio · All rights reserved
          </span>
          <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTED, fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
            Design by Milogo
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
