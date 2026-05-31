export default function Footer({ t = {} }) {
  return (
    <footer style={{
      background: 'rgba(242,222,228,0.97)',
      paddingTop: 48,
      paddingBottom: 28,
      textAlign: 'center',
    }}>
      {/* Diamond divider */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 90, height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,160,174,0.3))' }} />
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(200,160,174,0.38)', flexShrink: 0 }} />
        <div style={{ width: 90, height: 1, background: 'linear-gradient(90deg, rgba(200,160,174,0.3), transparent)' }} />
      </div>

      {/* Italic quote */}
      <div style={{
        fontSize: '14px',
        fontFamily: 'Playfair Display, serif',
        fontStyle: 'italic',
        fontWeight: 400,
        color: 'rgba(45,21,32,0.28)',
        letterSpacing: '0.03em',
        marginBottom: 10,
      }}>
        "{t.footerTagline}"
      </div>

      {/* Studio name */}
      <div style={{
        fontSize: '9px',
        letterSpacing: '0.44em',
        textTransform: 'uppercase',
        color: 'rgba(160,112,128,0.32)',
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 400,
        marginBottom: 22,
      }}>
        {t.footerLocation}
      </div>

      {/* Thin separator */}
      <div style={{
        width: 48, height: 1, margin: '0 auto 18px',
        background: 'rgba(200,160,174,0.2)',
      }} />

      {/* Copyright */}
      <span style={{
        fontSize: '9px',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(160,112,128,0.38)',
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 300,
      }}>
        {t.footerCopyright}
      </span>
    </footer>
  )
}
