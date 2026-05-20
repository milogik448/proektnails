export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(200,160,174,0.18)',
      background: 'rgba(242,222,228,0.97)',
      padding: '20px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <span style={{
        fontSize: '9px',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(160,112,128,0.45)',
        fontFamily: 'Raleway, sans-serif',
        fontWeight: 300,
      }}>
        2026 by Milogo
      </span>
    </footer>
  )
}
