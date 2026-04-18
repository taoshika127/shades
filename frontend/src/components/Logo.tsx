interface LogoProps {
  mainTextSize?: string
  subTextSize?: string
  mainFontFamily?: string
  className?: string
}

function Logo({
  mainTextSize = 'text-2xl md:text-3xl',
  subTextSize = 'text-[8px] md:text-[10px]',
  mainFontFamily = "'Gotham', 'Gotham A', sans-serif",
  className = '',
}: LogoProps) {
  return (
    <a
      href="/"
      className={`inline-grid max-w-full min-w-0 shrink grid-cols-1 justify-items-center gap-0.5 text-center no-underline [text-align:center] ${className}`}
    >
      <span
        className={`${mainTextSize} inline-block max-w-full font-[500] leading-tight m-0 text-brown text-center origin-center [transform:scaleY(0.92)]`}
        style={{
          fontFamily: mainFontFamily,
          letterSpacing: '0.02em',
          textAlign: 'center',
        }}
      >
        PACIFIC LIGHT
      </span>
      <span
        className={`${subTextSize} max-w-full font-[500] leading-tight uppercase m-0 tracking-[0.14em] text-center text-brown`}
        style={{
          fontFamily: "'Gotham', 'Gotham A', sans-serif",
          textAlign: 'center',
        }}
      >
        SHADES · DRAPERIES · BLINDS
      </span>
    </a>
  )
}

export default Logo
