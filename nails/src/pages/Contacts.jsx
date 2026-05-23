import { motion } from 'framer-motion'
import { Instagram, MapPin, Clock, ArrowUpRight, Sparkles } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-30px' },
  transition:  { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

function ContactCard({ Icon, label, value, href, note, schedule, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        backgroundColor: 'rgba(255,255,255,0.74)',
        border: '1px solid rgba(200,160,174,0.18)',
        borderRadius: '22px',
        padding: '28px 30px',
        boxShadow: '0 6px 28px rgba(45,21,32,0.07), 0 1px 4px rgba(45,21,32,0.04)',
        backdropFilter: 'blur(16px)',
        transition: 'all 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 28px 60px rgba(45,21,32,0.11), 0 4px 14px rgba(45,21,32,0.07), 0 0 0 1px rgba(200,160,174,0.3)'
        el.style.borderColor = 'rgba(200,160,174,0.32)'
        el.style.backgroundColor = 'rgba(255,255,255,0.94)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 6px 28px rgba(45,21,32,0.07), 0 1px 4px rgba(45,21,32,0.04)'
        el.style.borderColor = 'rgba(200,160,174,0.18)'
        el.style.backgroundColor = 'rgba(255,255,255,0.74)'
      }}
    >
      {/* Top inner glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.3), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(200,160,174,0.2) 0%, rgba(200,160,174,0.08) 100%)',
        border: '1px solid rgba(200,160,174,0.24)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(200,160,174,0.12)',
      }}>
        <Icon size={17} strokeWidth={1.4} style={{ color: '#B08090' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase',
          color: '#A07888', marginBottom: 7, fontFamily: 'Raleway, sans-serif',
        }}>
          {label}
        </div>

        {href ? (
          <a
            href={href} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '14.5px', fontWeight: 300, color: '#2D1520',
              fontFamily: 'Raleway, sans-serif', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#8B6070' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#2D1520' }}
          >
            {value}
            <ArrowUpRight size={12} style={{ opacity: 0.4 }} />
          </a>
        ) : schedule ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {schedule.map(s => (
              <div key={s} style={{
                fontSize: '13.5px', color: '#2D1520', lineHeight: '1.85',
                fontWeight: 300, fontFamily: 'Raleway, sans-serif',
              }}>
                {s}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '14.5px', color: '#2D1520', fontWeight: 300, fontFamily: 'Raleway, sans-serif' }}>
            {value}
          </div>
        )}

        {note && (
          <div style={{
            marginTop: 7, fontSize: '11px', color: '#A07888',
            letterSpacing: '0.03em', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
          }}>
            {note}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function BookingCard({ c }) {
  const openChat = () => window.dispatchEvent(new CustomEvent('open-ai-chat'))

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.75, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: 'linear-gradient(150deg, #3E1F2B 0%, #2D1520 45%, #3A1724 100%)',
        borderRadius: 26,
        padding: '40px 36px',
        border: '1px solid rgba(200,160,174,0.13)',
        boxShadow: '0 48px 96px rgba(45,21,32,0.3), 0 10px 28px rgba(45,21,32,0.2), 0 0 0 1px rgba(200,160,174,0.09), inset 0 1px 0 rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.32s ease, border-color 0.32s ease, transform 0.32s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 60px 110px rgba(45,21,32,0.38), 0 16px 40px rgba(45,21,32,0.26), 0 0 0 1px rgba(200,160,174,0.18), inset 0 1px 0 rgba(255,255,255,0.1)'
        e.currentTarget.style.borderColor = 'rgba(200,160,174,0.24)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 48px 96px rgba(45,21,32,0.3), 0 10px 28px rgba(45,21,32,0.2), 0 0 0 1px rgba(200,160,174,0.09), inset 0 1px 0 rgba(255,255,255,0.08)'
        e.currentTarget.style.borderColor = 'rgba(200,160,174,0.13)'
      }}
    >
      {/* Glow orb — top right */}
      <div style={{
        position: 'absolute', top: -70, right: -70,
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,160,174,0.14) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />
      {/* Glow orb — bottom left */}
      <div style={{
        position: 'absolute', bottom: -50, left: -50,
        width: 160, height: 160, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,160,174,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.4), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ marginBottom: 30 }}>
        {/* Online status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <div style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
            <span style={{
              display: 'block', width: 7, height: 7, borderRadius: '50%',
              background: '#7ED9A5',
              boxShadow: '0 0 8px rgba(126,217,165,0.7)',
            }} />
            <motion.span
              style={{
                position: 'absolute', inset: -3, borderRadius: '50%',
                background: 'rgba(126,217,165,0.25)',
              }}
              animate={{ scale: [1, 2.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            />
          </div>
          <span style={{
            fontSize: '9.5px', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(168,216,168,0.65)', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
          }}>
            AI assistant online
          </span>
        </div>

        <div style={{
          fontSize: '21px', color: '#F0DFE6',
          fontFamily: 'Playfair Display, serif', fontWeight: 400,
          lineHeight: 1.3, marginBottom: 6,
        }}>
          {c.ctaTitle}
        </div>
        <div style={{
          fontSize: '11.5px', color: 'rgba(200,160,174,0.5)',
          letterSpacing: '0.05em', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
          marginBottom: 10,
        }}>
          {c.ctaSubtitle}
        </div>
        <div style={{
          fontSize: '11px', color: 'rgba(200,160,174,0.35)',
          fontFamily: 'Raleway, sans-serif', fontWeight: 300, lineHeight: 1.65,
          borderTop: '1px solid rgba(200,160,174,0.1)', paddingTop: 10,
        }}>
          Оберіть зручний спосіб запису — AI-чат або Instagram Direct.
        </div>
      </div>

      {/* AI Button */}
      <motion.button
        onClick={openChat}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%', padding: '16px 20px',
          background: 'rgba(200,160,174,0.16)',
          border: '1px solid rgba(200,160,174,0.28)',
          borderRadius: 14,
          color: '#F0DFE6',
          display: 'flex', alignItems: 'center', gap: 14,
          cursor: 'pointer',
          textAlign: 'left',
          marginBottom: 12,
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(200,160,174,0.26)'
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.48)'
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(200,160,174,0.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(200,160,174,0.16)'
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.28)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(200,160,174,0.2)',
          border: '1px solid rgba(200,160,174,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(200,160,174,0.12)',
        }}>
          <Sparkles size={15} style={{ color: '#C8A0AE' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '13.5px', fontWeight: 500, color: '#F0DFE6',
            fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em',
          }}>
            {c.aiBtn}
          </div>
          <div style={{
            fontSize: '11px', color: 'rgba(200,160,174,0.55)',
            fontFamily: 'Raleway, sans-serif', marginTop: 2,
          }}>
            {c.aiNote}
          </div>
        </div>
        <ArrowUpRight size={14} style={{ color: 'rgba(200,160,174,0.45)', flexShrink: 0 }} />
      </motion.button>

      {/* Divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 12,
      }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(200,160,174,0.12)' }} />
        <div style={{
          fontSize: '10px', color: 'rgba(200,160,174,0.35)',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: 'Raleway, sans-serif',
        }}>
          {c.orDivider}
        </div>
        <div style={{ flex: 1, height: 1, background: 'rgba(200,160,174,0.12)' }} />
      </div>

      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/anjelikaa_nails"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%', padding: '16px 20px',
          background: 'transparent',
          border: '1px solid rgba(200,160,174,0.18)',
          borderRadius: 14,
          color: 'rgba(200,160,174,0.75)',
          display: 'flex', alignItems: 'center', gap: 14,
          textDecoration: 'none',
          transition: 'all 0.25s ease',
          marginBottom: 24,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.32)'
          e.currentTarget.style.color = 'rgba(200,160,174,0.95)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(200,160,174,0.18)'
          e.currentTarget.style.color = 'rgba(200,160,174,0.75)'
        }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(200,160,174,0.1)',
          border: '1px solid rgba(200,160,174,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Instagram size={15} strokeWidth={1.5} style={{ color: 'rgba(200,160,174,0.7)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '13.5px', fontWeight: 400,
            fontFamily: 'Raleway, sans-serif', letterSpacing: '0.02em',
          }}>
            Instagram Direct
          </div>
          <div style={{
            fontSize: '11px', color: 'rgba(200,160,174,0.4)',
            fontFamily: 'Raleway, sans-serif', marginTop: 2,
          }}>
            @anjelikaa_nails
          </div>
        </div>
        <ArrowUpRight size={14} style={{ opacity: 0.35, flexShrink: 0 }} />
      </motion.a>

      {/* Response time */}
      <div style={{
        fontSize: '10.5px', color: 'rgba(200,160,174,0.35)',
        textAlign: 'center', letterSpacing: '0.06em',
        fontFamily: 'Raleway, sans-serif', fontWeight: 300,
      }}>
        {c.responseTime}
      </div>
    </motion.div>
  )
}

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Zličín+Praha+5+Czech+Republic'

function MiniMapCard() {
  return (
    <motion.a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.34, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: 'rgba(255,255,255,0.72)',
        border: '1px solid rgba(200,160,174,0.2)',
        borderRadius: 26,
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 36px rgba(45,21,32,0.09), 0 2px 8px rgba(45,21,32,0.05)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'box-shadow 0.32s ease, border-color 0.32s ease, transform 0.32s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 18px 56px rgba(45,21,32,0.14), 0 4px 14px rgba(45,21,32,0.08)'
        e.currentTarget.style.borderColor = 'rgba(200,160,174,0.38)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 8px 36px rgba(45,21,32,0.09), 0 2px 8px rgba(45,21,32,0.05)'
        e.currentTarget.style.borderColor = 'rgba(200,160,174,0.2)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Stylised map visual */}
      <div style={{
        flex: 1,
        minHeight: 220,
        background: 'linear-gradient(145deg, #F6EAF0 0%, #EDE0E8 50%, #F1E5EB 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid lines */}
        {[14, 28, 42, 56, 70, 84].map(y => (
          <div key={`h${y}`} style={{
            position: 'absolute', left: 0, right: 0, top: `${y}%`,
            height: 1, background: 'rgba(200,160,174,0.16)',
          }} />
        ))}
        {[10, 22, 34, 46, 58, 70, 82, 94].map(x => (
          <div key={`v${x}`} style={{
            position: 'absolute', top: 0, bottom: 0, left: `${x}%`,
            width: 1, background: 'rgba(200,160,174,0.16)',
          }} />
        ))}
        {/* Main horizontal road */}
        <div style={{
          position: 'absolute', top: '44%', left: 0, right: 0,
          height: 9, background: 'rgba(255,255,255,0.55)',
          borderTop: '1px solid rgba(200,160,174,0.16)',
          borderBottom: '1px solid rgba(200,160,174,0.16)',
        }} />
        {/* Secondary horizontal road */}
        <div style={{
          position: 'absolute', top: '68%', left: 0, right: '30%',
          height: 5, background: 'rgba(255,255,255,0.38)',
          borderTop: '1px solid rgba(200,160,174,0.12)',
        }} />
        {/* Main vertical road */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '47%',
          width: 10, background: 'rgba(255,255,255,0.48)',
          borderLeft: '1px solid rgba(200,160,174,0.14)',
          borderRight: '1px solid rgba(200,160,174,0.14)',
        }} />
        {/* Secondary vertical road */}
        <div style={{
          position: 'absolute', top: '28%', bottom: 0, left: '24%',
          width: 6, background: 'rgba(255,255,255,0.32)',
          borderLeft: '1px solid rgba(200,160,174,0.1)',
        }} />
        {/* Building blocks */}
        {[
          { t: '10%', l: '12%', w: 36, h: 22 },
          { t: '10%', l: '56%', w: 26, h: 18 },
          { t: '10%', r: '6%',  w: 22, h: 28 },
          { t: '56%', l: '58%', w: 30, h: 18 },
          { t: '60%', l: '12%', w: 20, h: 16 },
          { t: '74%', l: '72%', w: 18, h: 14 },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', top: b.t, left: b.l, right: b.r,
            width: b.w, height: b.h, borderRadius: 5,
            background: i % 2 === 0 ? 'rgba(200,160,174,0.2)' : 'rgba(200,160,174,0.14)',
            border: '1px solid rgba(200,160,174,0.26)',
          }} />
        ))}
        {/* Location pin */}
        <div style={{
          position: 'absolute', top: '44%', left: '47%',
          transform: 'translate(-50%, -100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            width: 26, height: 26,
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            background: 'linear-gradient(135deg, #3E1F2B 0%, #2D1520 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(45,21,32,0.5)',
          }}>
            <div style={{
              width: 9, height: 9, borderRadius: '50%',
              background: 'rgba(240,223,230,0.95)',
              transform: 'rotate(45deg)',
            }} />
          </div>
          <div style={{
            width: 10, height: 4, borderRadius: '50%',
            background: 'rgba(45,21,32,0.22)', marginTop: 3,
          }} />
        </div>

        {/* Studio label near pin */}
        <div style={{
          position: 'absolute', top: '22%', left: '52%',
          background: 'rgba(255,255,255,0.88)',
          border: '1px solid rgba(200,160,174,0.28)',
          borderRadius: 8,
          padding: '4px 9px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 10px rgba(45,21,32,0.1)',
        }}>
          <div style={{
            fontSize: '8.5px', fontWeight: 500, color: '#2D1520',
            fontFamily: 'Raleway, sans-serif', letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}>
            VELOURA
          </div>
          <div style={{
            fontSize: '7.5px', color: '#A07888',
            fontFamily: 'Raleway, sans-serif', letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}>
            Zličín · Praha 5
          </div>
        </div>

        {/* Corner labels */}
        <div style={{
          position: 'absolute', bottom: 10, right: 14,
          fontSize: '7.5px', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(45,21,32,0.28)', fontFamily: 'Raleway, sans-serif',
        }}>
          Praha 5
        </div>
        <div style={{
          position: 'absolute', bottom: 10, left: 14,
          fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(45,21,32,0.2)', fontFamily: 'Raleway, sans-serif',
        }}>
          Zličín
        </div>

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 44%, transparent 30%, rgba(242,222,228,0.28) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Top shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Card info footer */}
      <div style={{
        padding: '20px 24px',
        borderTop: '1px solid rgba(200,160,174,0.13)',
        background: 'rgba(255,255,255,0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{
              fontSize: '13px', fontWeight: 500, color: '#2D1520',
              fontFamily: 'Raleway, sans-serif', letterSpacing: '0.04em', marginBottom: 5,
            }}>
              VELOURA · Zličín
            </div>
            <div style={{
              fontSize: '11px', color: '#A07888',
              fontFamily: 'Raleway, sans-serif', fontWeight: 300,
              letterSpacing: '0.02em', lineHeight: 1.6,
            }}>
              Praha 5 · Czech Republic
            </div>
            <div style={{
              fontSize: '10px', color: 'rgba(160,120,136,0.6)',
              fontFamily: 'Raleway, sans-serif', fontWeight: 300,
              letterSpacing: '0.02em', marginTop: 3,
            }}>
              Точна адреса — після запису
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(45,21,32,0.09), rgba(45,21,32,0.05))',
              border: '1px solid rgba(45,21,32,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MapPin size={14} style={{ color: '#2D1520', strokeWidth: 1.5 }} />
            </div>
            <div style={{
              fontSize: '8.5px', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(160,120,136,0.55)', fontFamily: 'Raleway, sans-serif',
              whiteSpace: 'nowrap',
            }}>
              Google Maps ↗
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  )
}

export default function Contacts({ t }) {
  const c = t.contacts

  const INFO = [
    { Icon: Instagram, label: c.instagramLabel, value: '@anjelikaa_nails', href: 'https://www.instagram.com/anjelikaa_nails', note: c.instagramNote },
    { Icon: MapPin,    label: c.cityLabel,       value: c.cityVal,         href: null,                                        note: c.cityNote },
    { Icon: Clock,     label: c.scheduleLabel,   value: null,              href: null,                                        note: null, schedule: c.schedule },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.38 }}
      className="min-h-screen relative"
    >
      {/* Background depth glows */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0, width: 640, height: 640,
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,160,174,0.14) 0%, transparent 62%)',
        transform: 'translate(26%, -32%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '8%', left: 0, width: 460, height: 460,
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,160,174,0.1) 0%, transparent 68%)',
        transform: 'translate(-42%, 0)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '38%', left: '50%', width: 340, height: 340,
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(45,21,32,0.05) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
      }} />
      {/* Extra bottom-right nude accent */}
      <div aria-hidden style={{
        position: 'absolute', bottom: '18%', right: '5%', width: 280, height: 280,
        borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(200,160,174,0.08) 0%, transparent 65%)',
      }} />
      {/* SVG grain/noise overlay */}
      <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.03 }}>
        <filter id='ct-noise'>
          <feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch' />
          <feColorMatrix type='saturate' values='0' />
        </filter>
        <rect width='100%' height='100%' filter='url(#ct-noise)' />
      </svg>

      {/* Header */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-14">
        <motion.span
          {...fadeUp(0)}
          className="section-tag"
        >
          {c.tag}
        </motion.span>
        <motion.h1
          {...fadeUp(0.05)}
          className="font-serif font-light"
          style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', color: '#2D1520', letterSpacing: '-0.01em', lineHeight: 1.05 }}
        >
          {c.title}
        </motion.h1>
        <motion.p
          {...fadeUp(0.12)}
          style={{
            fontSize: '10.5px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#C8A0AE', fontFamily: 'Raleway, sans-serif', fontWeight: 300,
            marginTop: 12,
          }}
        >
          Praha · Premium Nail Studio
        </motion.p>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="origin-left"
          style={{
            height: 1, width: 56, marginTop: 20, marginBottom: 22,
            background: 'linear-gradient(90deg, rgba(200,160,174,0.55), transparent)',
          }}
        />
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontSize: '14px', color: '#6B5060', lineHeight: 2,
            letterSpacing: '0.015em', fontFamily: 'Raleway, sans-serif',
            fontWeight: 300, maxWidth: 620,
          }}
        >
          {c.desc}
        </motion.p>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pb-20">

          {/* Three columns: contact cards | booking CTA | mini map */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">

            {/* Left — contact cards */}
            <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {INFO.map(({ Icon, label, value, href, note, schedule }, i) => (
                  <ContactCard
                    key={label} Icon={Icon} label={label} value={value}
                    href={href} note={note} schedule={schedule}
                    delay={0.12 + i * 0.09}
                  />
                ))}
              </div>
            </div>

            {/* Center — booking CTA */}
            <div style={{ width: '100%', maxWidth: 380, flexShrink: 0 }}>
              <BookingCard c={c} />
            </div>

            {/* Right — mini map */}
            <div style={{ width: '100%', maxWidth: 360, flexShrink: 0 }}>
              <MiniMapCard />
            </div>

          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ marginTop: 72, textAlign: 'center' }}
          >
            {/* Divider with diamond */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 22 }}>
              <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.3))' }} />
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(200,160,174,0.35)', flexShrink: 0 }} />
              <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, rgba(200,160,174,0.3), transparent)' }} />
            </div>

            {/* Italic quote */}
            <div style={{
              fontSize: '14px', fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              color: 'rgba(45,21,32,0.28)', fontWeight: 400, letterSpacing: '0.03em',
              marginBottom: 10,
            }}>
              "Краса у деталях"
            </div>

            {/* Studio line */}
            <div style={{
              fontSize: '9px', letterSpacing: '0.44em', textTransform: 'uppercase',
              color: 'rgba(160,112,128,0.32)', fontFamily: 'Raleway, sans-serif', fontWeight: 400,
            }}>
              VELOURA · Praha · Czech Republic
            </div>
          </motion.div>

      </div>
    </motion.div>
  )
}
