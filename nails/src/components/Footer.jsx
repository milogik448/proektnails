const NAV_LINKS = [
  { label: 'Головна',     page: 'home' },
  { label: 'Про майстра', page: 'about' },
  { label: 'Послуги',     page: 'services' },
  { label: 'Відгуки',     page: 'reviews' },
  { label: 'Контакти',    page: 'contacts' },
]

const SERVICES = [
  'Манікюр', 'Педикюр', 'Гель-лак', 'Укріплення', 'Дизайн нігтів',
]

function FooterLink({ onClick, href, children }) {
  const style = {
    fontSize: '12px', letterSpacing: '0.02em',
    color: '#4A2D3A', fontFamily: 'Raleway, sans-serif',
    fontWeight: 400, textDecoration: 'none',
    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
    textAlign: 'left', display: 'block', marginBottom: 7,
    transition: 'color 0.2s ease',
  }
  const hover = e => { e.currentTarget.style.color = '#2D1520' }
  const leave = e => { e.currentTarget.style.color = '#4A2D3A' }

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={hover} onMouseLeave={leave}>{children}</a>
  return <button style={style} onClick={onClick} onMouseEnter={hover} onMouseLeave={leave}>{children}</button>
}

import { motion } from 'framer-motion'

export default function Footer({ onNavigate }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(200,160,174,0.45)',
        marginTop: 32,
      }}>


      {/* Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{
        gap: '24px 20px',
        padding: '32px 48px 0',
        marginBottom: 28,
        maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto',
      }}>

        {/* Brand */}
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 300, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#2D1520', marginBottom: 5 }}>
            VELOURA STUDIO
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '13.5px', fontWeight: 400, color: '#7A5060', marginBottom: 8 }}>
            "Краса у деталях"
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7A5060', fontFamily: 'Raleway, sans-serif', fontWeight: 300, lineHeight: 1.9 }}>
            Praha, Czech Republic<br />Premium Nail Studio
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2D1520', fontFamily: 'Raleway, sans-serif', fontWeight: 600, marginBottom: 12 }}>
            Навігація
          </div>
          {NAV_LINKS.map(({ label, page }) => (
            <FooterLink key={page} onClick={() => onNavigate?.(page)}>{label}</FooterLink>
          ))}
        </div>

        {/* Services */}
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2D1520', fontFamily: 'Raleway, sans-serif', fontWeight: 600, marginBottom: 12 }}>
            Послуги
          </div>
          {SERVICES.map(s => (
            <FooterLink key={s} onClick={() => onNavigate?.('services')}>{s}</FooterLink>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#2D1520', fontFamily: 'Raleway, sans-serif', fontWeight: 600, marginBottom: 12 }}>
            Зв'язатись
          </div>
          <FooterLink onClick={() => onNavigate?.('contacts')}>Записатись онлайн</FooterLink>
          <FooterLink href="https://www.instagram.com/anjelikaa_nails">@anjelikaa_nails</FooterLink>
          <div style={{ fontSize: '11px', color: '#7A5060', fontFamily: 'Raleway, sans-serif', fontWeight: 300, lineHeight: 1.8, marginTop: 2 }}>
            Praha · Прийом за записом
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ margin: '0 auto', maxWidth: 1400, height: 1, marginBottom: 14, background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.25), transparent)' }} />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7A5060', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
          © 2026 VELOURA Studio · All rights reserved
        </span>
        <span style={{ fontSize: '8.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A07888', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
          Design by Milogo
        </span>
      </div>

    </motion.footer>
  )
}
