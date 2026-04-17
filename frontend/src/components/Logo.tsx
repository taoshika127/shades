interface LogoProps {
  mainTextSize?: string
  subTextSize?: string
  centerSubtext?: boolean
  className?: string
}

function Logo({
  mainTextSize = 'text-2xl md:text-3xl',
  subTextSize = 'text-[8px] md:text-[10px]',
  centerSubtext = true,
  className = '',
}: LogoProps) {
  return (
    <a
      href="/"
      className={`inline-flex w-fit max-w-full min-w-0 shrink flex-col gap-0.5 no-underline ${centerSubtext ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      <span
        className={`${mainTextSize} font-[500] leading-tight m-0 text-brown`}
        style={{
          fontFamily: "'Gotham', 'Gotham A', sans-serif",
          letterSpacing: '-0.02em',
        }}
      >
        PACIFIC LIGHT
      </span>
      <span
        className={`${subTextSize} font-semibold leading-tight uppercase m-0 tracking-[0.14em]`}
        style={{
          fontFamily: "'Gotham', 'Gotham A', sans-serif",
          color: '#B38F6F',
        }}
      >
        SHADES · DRAPERIES · BLINDS
      </span>
    </a>
  )
}

export default Logo
