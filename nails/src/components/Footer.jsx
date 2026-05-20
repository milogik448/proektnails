export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(200,160,174,0.18)',
        background: 'rgba(242,222,228,0.97)',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18.5" stroke="rgba(200,160,174,0.45)" strokeWidth="0.8"/>
          <line x1="9.5" y1="12.5" x2="14.5" y2="12.5" stroke="rgba(45,21,32,0.5)" strokeWidth="1.2"/>
          <line x1="25.5" y1="12.5" x2="30.5" y2="12.5" stroke="rgba(45,21,32,0.5)" strokeWidth="1.2"/>
          <polyline points="11.5,12.5 20,28.5 28.5,12.5" stroke="rgba(45,21,32,0.5)" strokeWidth="1.2" fill="none" strokeLinejoin="miter"/>
          <circle cx="20" cy="28.5" r="1.2" fill="rgba(200,160,174,0.5)"/>
        </svg>
        <span style={{ fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(160,112,128,0.6)', fontFamily: 'Raleway, sans-serif', fontWeight: 400 }}>
          VELOURA Studio
        </span>
      </div>
      <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(160,112,128,0.4)', fontFamily: 'Raleway, sans-serif', fontWeight: 300 }}>
        © 2026
      </span>
    </footer>
  )
}
