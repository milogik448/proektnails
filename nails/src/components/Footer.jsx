export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(200,160,174,0.18)',
        background: 'rgba(242,222,228,0.97)',
        padding: '22px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(160,112,128,0.55)',
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        © 2026 by Milogo
      </span>
    </footer>
  )
}
