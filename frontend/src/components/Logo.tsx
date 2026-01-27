interface LogoProps {
  mainTextSize?: string
  subTextSize?: string
  centerSubtext?: boolean
  className?: string
}

function Logo({
  mainTextSize = 'text-3xl md:text-4xl',
  subTextSize = 'text-sm md:text-base',
  centerSubtext = true,
  className = ''
}: LogoProps) {
  return (
    <a href="/" className={`inline-flex flex-col gap-0 no-underline ${className}`}>
      <h1 className={`${mainTextSize} font-bold m-0 leading-tight flex items-baseline text-brown`} style={{ fontFamily: 'Fjalla One, sans-serif', letterSpacing: '-0.02em' }}>
        PACIFIC L
        <span
          className="inline-block mx-[2.5px] bg-brown"
          style={{
            width: '0.35em',
            height: '0.93em',
            backgroundImage: 'repeating-linear-gradient(0deg, #6c592e 0%, #6c592e 25%, white 25%, white 50%)',
            backgroundSize: '100% 28%',
            verticalAlign: 'baseline'
          }}
        />
        GHT
      </h1>
      <h2 className={`${subTextSize} font-semibold m-0 leading-tight uppercase ${centerSubtext ? 'text-center' : ''}`} style={{ fontFamily: 'Montserrat, sans-serif', color: '#6c592e' }}>
        SHADES & BLINDS
      </h2>
    </a>
  )
}

export default Logo

