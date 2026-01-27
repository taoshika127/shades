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
      <h1 className={`${mainTextSize} font-bold m-0 leading-tight flex items-baseline text-brown`} style={{ fontFamily: 'Fjalla One, sans-serif' }}>
        PACIFIC L
        <span
          className="inline-block mx-0.5 bg-brown"
          style={{
            width: '0.4em',
            height: '0.9em',
            backgroundImage: 'repeating-linear-gradient(0deg, #5c4717 0%, #5c4717 25%, white 25%, white 50%)',
            backgroundSize: '100% 20%',
            verticalAlign: 'baseline'
          }}
        />
        GHT
      </h1>
      <h2 className={`${subTextSize} font-semibold m-0 leading-tight uppercase ${centerSubtext ? 'text-center' : ''} text-primary`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
        SHADES & BLINDS
      </h2>
    </a>
  )
}

export default Logo

