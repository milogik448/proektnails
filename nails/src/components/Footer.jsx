export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(242,222,228,0.97)',
      paddingTop: 48,
      paddingBottom: 28,
      textAlign: 'center',
    }}>
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
        VELOURA · Praha · Czech Republic
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
        2026 by Milogo
      </span>
    </footer>
  )
}
