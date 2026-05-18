import { motion } from 'framer-motion'
import { Instagram, MapPin, Clock, ArrowUpRight } from 'lucide-react'

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
      className="flex items-start gap-5 p-6 transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255,255,255,0.58)',
        border: '1px solid rgba(200,160,174,0.18)',
        borderRadius: '16px',
        boxShadow: '0 2px 14px rgba(45,21,32,0.05)',
        backdropFilter: 'blur(4px)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-2px)'
        el.style.boxShadow = '0 10px 30px rgba(45,21,32,0.09)'
        el.style.borderColor = 'rgba(200,160,174,0.4)'
        el.style.backgroundColor = 'rgba(255,255,255,0.78)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 2px 14px rgba(45,21,32,0.05)'
        el.style.borderColor = 'rgba(200,160,174,0.18)'
        el.style.backgroundColor = 'rgba(255,255,255,0.58)'
      }}
    >
      {/* Icon circle */}
      <div
        className="w-11 h-11 flex items-center justify-center shrink-0"
        style={{
          backgroundColor: 'rgba(200,160,174,0.12)',
          borderRadius: '50%',
          border: '1px solid rgba(200,160,174,0.25)',
        }}
      >
        <Icon size={15} strokeWidth={1.5} style={{ color: '#C8A0AE' }} />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="tracking-[0.3em] uppercase mb-2"
          style={{ fontSize: '10px', color: '#A07888' }}
        >
          {label}
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-light transition-colors duration-200"
            style={{ fontSize: '14px', color: '#2D1520' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#8B6070' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#2D1520' }}
          >
            {value}
            <ArrowUpRight size={12} style={{ opacity: 0.5 }} />
          </a>
        ) : schedule ? (
          <div className="space-y-1">
            {schedule.map(s => (
              <div
                key={s}
                className="font-light"
                style={{ fontSize: '13.5px', color: '#2D1520', lineHeight: '1.8' }}
              >
                {s}
              </div>
            ))}
          </div>
        ) : (
          <div className="font-light" style={{ fontSize: '14px', color: '#2D1520' }}>{value}</div>
        )}

        {note && (
          <div
            className="mt-2 font-light"
            style={{ fontSize: '11px', color: '#A07888', letterSpacing: '0.02em' }}
          >
            {note}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Contacts({ t }) {
  const c = t.contacts

  const INFO = [
    {
      Icon: Instagram,
      label: c.instagramLabel,
      value: '@anjelikaa_nails',
      href: 'https://www.instagram.com/anjelikaa_nails',
      note: c.instagramNote,
      schedule: null,
    },
    {
      Icon: MapPin,
      label: c.cityLabel,
      value: c.cityVal,
      href: null,
      note: c.cityNote,
      schedule: null,
    },
    {
      Icon: Clock,
      label: c.scheduleLabel,
      value: null,
      href: null,
      note: null,
      schedule: c.schedule,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.38 }}
      className="min-h-screen relative"
    >
      {/* Background glows */}
      <div
        aria-hidden
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '440px', height: '440px', borderRadius: '50%', zIndex: 0,
          background: 'radial-gradient(circle, rgba(200,160,174,0.09) 0%, transparent 68%)',
          transform: 'translate(25%, -25%)',
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: '280px', height: '280px', borderRadius: '50%', zIndex: 0,
          background: 'radial-gradient(circle, rgba(200,160,174,0.06) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 pt-16 pb-12 border-b border-ghost">
        <span className="section-tag">{c.tag}</span>
        <h1
          className="font-serif font-light leading-none"
          style={{ fontSize: 'clamp(42px, 7vw, 88px)', color: '#2D1520' }}
        >
          {c.title}
        </h1>
      </div>

      {/* Centered content */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 xl:px-20 py-16 flex justify-center">
        <div className="w-full max-w-lg">

          <motion.p
            {...fadeUp(0)}
            className="font-light leading-[2] mb-12"
            style={{ fontSize: '14px', color: '#6B5060', letterSpacing: '0.012em' }}
          >
            {c.desc}
          </motion.p>

          <div className="flex flex-col gap-4">
            {INFO.map(({ Icon, label, value, href, note, schedule }, i) => (
              <ContactCard
                key={label}
                Icon={Icon}
                label={label}
                value={value}
                href={href}
                note={note}
                schedule={schedule}
                delay={0.08 + i * 0.1}
              />
            ))}
          </div>

          <motion.div {...fadeUp(0.42)} className="mt-12">
            <a
              href="https://www.instagram.com/anjelikaa_nails"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {c.btn} <ArrowUpRight size={13} />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
