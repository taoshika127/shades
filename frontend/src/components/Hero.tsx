import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryNameToSlug } from '../utils/slug'

function Hero() {
  const navigate = useNavigate()

  const heroImages = [
    '/assets/home/hero/hero1.png',
    '/assets/home/hero/hero2.png',
    '/assets/home/hero/hero3.png',
    '/assets/home/hero/hero4.png',
    '/assets/home/hero/hero5.png',
    '/assets/home/hero/hero6.png',
    '/assets/home/hero/hero7.png',
    '/assets/home/hero/hero8.png',
  ]

  // Map iconType to category name
  const getCategoryName = (iconType: string): string => {
    const categoryMap: { [key: string]: string } = {
      'zebra1': 'Zebra Shades',
      'zebra2': 'Zebra Shades',
      'roller': 'Roller Shades',
      'Roller': 'Roller Shades',
      'wood': 'Bamboo Shades',
      'honeycomb': 'Honeycomb Shades',
      'Honeycomb': 'Honeycomb Shades',
      'roman': 'Roman Shades',
      'outdoor': 'Outdoor Shades',
    }
    return categoryMap[iconType] || 'Zebra Shades'
  }

  // Map iconType to carousel images
  const getCarouselImage = (iconType: string, index: number) => {
    const carouselMap: { [key: string]: string } = {
      'zebra1': '/assets/home/carousel/carousel1_zebra.jpeg',
      'roller': '/assets/home/carousel/carousel2_roller.jpeg',
      'wood': '/assets/home/carousel/carousel3_woven.jpeg',
      'honeycomb': '/assets/home/carousel/carousel4_honeycomb.jpeg',
      'roman': '/assets/home/carousel/carousel5_roman.jpeg',
      'outdoor': '/assets/home/carousel/carousel6_outdoor.jpeg',
      'zebra2': '/assets/home/carousel/carousel7_zebra.jpeg',
      'Roller': '/assets/home/carousel/carousel8_roller.jpeg',
      'Honeycomb': '/assets/home/carousel/carousel9_honeycomb.jpeg',
    }
    return carouselMap[iconType] || `/assets/home/carousel/carousel${index + 1}_${iconType.toLowerCase()}.jpeg`
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentIndexRef = useRef(0)
  const [screenHeight, setScreenHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 932)

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  // Track screen height for responsive padding
  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight)
    }

    updateScreenHeight()
    window.addEventListener('resize', updateScreenHeight)

    return () => window.removeEventListener('resize', updateScreenHeight)
  }, [])

  useEffect(() => {
    // Preload all images
    heroImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const current = currentIndexRef.current
      const next = (current + 1) % heroImages.length
      setNextIndex(next)
      setIsTransitioning(true)

      // After transition, update current and stop transitioning
      setTimeout(() => {
        setCurrentIndex(next)
        setIsTransitioning(false)
      }, 1000) // Match transition duration
    }, 8000) // Change image every 8 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])


  return (
    <section className="w-full h-screen max-h-[100vh] relative overflow-hidden">
      <div className="w-full h-full absolute inset-0 max-h-[100vh]">
        {/* Current image layer */}
        <div
          className={`absolute inset-0 bg-cover bg-bottom bg-no-repeat ${
            isTransitioning ? 'transition-opacity duration-1000 ease-in-out opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url('${heroImages[currentIndex]}')`,
            zIndex: isTransitioning ? 1 : 2
          }}
        />
        {/* Next image layer (only visible during transition) */}
        <div
          className={`absolute inset-0 bg-cover bg-bottom bg-no-repeat ${
            isTransitioning ? 'transition-opacity duration-1000 ease-in-out opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${heroImages[nextIndex]}')`,
            zIndex: isTransitioning ? 2 : 1
          }}
        />
        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-black/65 z-[3]" />
      </div>

      <div className="relative z-10 w-full h-full max-h-[100vh] flex items-center justify-center md:justify-start px-5 md:px-20 overflow-hidden">
        <div className="max-w-container w-full flex flex-col md:flex-row justify-center md:justify-between gap-0 md:gap-12">
          {/* Right Section - Vertical Carousel Price Cards - On top for mobile */}
          <div className="w-full md:w-[780px] flex justify-center items-center order-1 md:order-2">
            <div
              className="carousel-wrapper md:block ml-0 md:-mt-[50px] md:ml-[100px] h-[270px] md:h-[220px]"
              style={{
                width: '100%',
                maxWidth: '650px',
                paddingTop: typeof window !== 'undefined' && window.innerWidth < 768
                  ? (screenHeight > 800 ? '80px' : screenHeight > 700 ? '180px' : '250px')
                  : undefined
              }}
            >
              <div className="carousel h-[270px] md:h-[220px]">
                {[
                  {
                    serviceType: 'DIY',
                    titleLine1: 'Light Filtering Zebra Shades',
                    titleLine2: 'Wrapped Square Cassette',
                    description: '22 3/8" x 72 1/4", Manual Cordless',
                    price: '$120',
                    details: 'Includes material and shipping',
                    iconType: 'zebra1'
                  },
                  {
                    serviceType: 'Full Service',
                    titleLine1: 'Electric Blackout Roller Shades',
                    titleLine2: 'Wrapped Rounded Cassette',
                    description: '26" x 65 7/8", Remote Control',
                    price: '$315',
                    details: 'Includes material, shipping & installation',
                    iconType: 'roller'
                  },
                  {
                    serviceType: 'Full Service',
                    titleLine1: 'Natural Woven Wood Shades',
                    titleLine2: 'Light Filtering',
                    description: '36" x 60", Manual Cord',
                    price: '$250',
                    details: 'Includes material, shipping & installation',
                    iconType: 'wood'
                  },
                  {
                    serviceType: 'Full Service',
                    titleLine1: 'Light Filtering Honeycomb Shades',
                    titleLine2: 'Anti UV',
                    description: '36" x 36", Manual Cordless',
                    price: '$155',
                    details: 'Includes material, shipping & installation',
                    iconType: 'honeycomb'
                  },
                  {
                    serviceType: 'DIY',
                    titleLine1: 'Light Filtering Roman Shades',
                    titleLine2: 'Wrapped Square Cassette',
                    description: '48" x 60", Manual Cord',
                    price: '$210',
                    details: 'Includes material & shipping',
                    iconType: 'roman'
                  },
                  {
                    serviceType: 'Full Service',
                    titleLine1: 'Motorized Outdoor Roller Shades',
                    titleLine2: 'Light Filtering with 5% open ratio',
                    description: '56 1/4" x 110", Phone Control',
                    price: '$940',
                    details: 'Includes material, shipping & installation',
                    iconType: 'outdoor'
                  },
                  {
                    serviceType: 'Full Service',
                    titleLine1: 'Motorized Blackout Zebra Shades',
                    titleLine2: 'Unwrapped Square Cassette',
                    description: '39 1/2" x 60", Phone Control',
                    price: '$385',
                    details: 'Includes material, shipping & installation',
                    iconType: 'zebra2'
                  },
                  {
                    serviceType: 'DIY',
                    titleLine1: 'Light Filtering Roller Shades',
                    titleLine2: 'Wrapped Square Cassette',
                    description: '48" x 60", Manual Cord',
                    price: '$240',
                    details: 'Includes material & shipping',
                    iconType: 'Roller'
                  },
                  {
                    serviceType: 'Full Service',
                    titleLine1: 'Motorized Honeycomb Shades',
                    titleLine2: 'Blackout',
                    description: '36" x 70 1/2", Remote Control',
                    price: '$355',
                    details: 'Includes material, shipping & installation',
                    iconType: 'Honeycomb'
                  }
                ].map((card, index) => {
                  const categoryName = getCategoryName(card.iconType)
                  const categorySlug = categoryNameToSlug(categoryName)

                  return (
                  <div key={index} className="carousel__item">
                    <div
                      className="carousel__item-body"
                      style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => navigate(`/${categorySlug}`)}
                    >
                      <div style={{ flex: 1, paddingRight: '16px' }}>
                        {(card.serviceType === 'Full Service' || card.serviceType === 'Coordinated Installation Service') && (
                          <div style={{ position: 'absolute', top: '8px', left: '20px' }}>
                            <span className="px-2 py-1 text-xs font-semibold text-brown" style={{ backgroundColor: 'rgba(184, 142, 47, 0.3)', fontFamily: 'Montserrat, sans-serif', display: 'inline-block' }}>
                              {card.serviceType}
                            </span>
                          </div>
                        )}
                        <p className="title text-sm md:text-base" style={{ fontFamily: 'Montserrat, sans-serif', color: '#5c4717', marginBottom: '8px', marginTop: '15px' }}>
                          {card.titleLine1}
                          <br className="hidden md:block" />
                          <span className="hidden md:inline">{card.titleLine2}</span>
                        </p>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#9F9F9F', fontSize: '12px', marginBottom: '12px' }}>
                          {card.description}
                        </p>
                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontFamily: 'Fjalla One, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#B88E2F' }}>
                            {card.price}
                          </span>
                          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#5c4717', marginLeft: '4px' }}>
                            total
                          </span>
                        </div>
                        <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#9F9F9F', fontSize: '11px' }}>
                          {card.details}
                        </p>
                      </div>
                      <div style={{ flexShrink: 0, width: '130px', height: '130px', backgroundColor: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img
                          src={getCarouselImage(card.iconType, index)}
                          alt={`${card.titleLine1} ${card.titleLine2}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            // Fallback if image doesn't exist
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Left Section - Promotional Content - Below carousel on mobile */}
          <div className="p-6 md:p-10 relative top-[-20px] rounded-[10px] max-w-full md:max-w-[643px] md:ml-20 order-2 md:order-1">
            <p className="text-[18px] md:text-[28px] mb-3 md:mb-6 font-[500] text-[#f0e8d5]" style={{ fontFamily: 'Montserrat, sans-serif' }}>We <span className="font-bold">customize</span>, <span className="font-bold">measure</span> and <span className="font-bold">install</span></p>
            <h2 className="text-[32px] md:text-[52px] font-bold text-[#dbc697] leading-tight m-0 mb-3 md:mb-10" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Luxury Quality Shades at Factory-Direct Pricing</h2>

            {/* Benefits List */}
            <ul className="space-y-3 md:space-y-5 mb-4 md:mb-10">
              {[
                'No showroom markup. No retail overhead - up to 50% Less Than Big Box Stores',
                <>Proudly Based in the Bay Area, California <br /> Serving Nationwide</>,
                'Warranty-backed products and installation',
                'Any size, various fabrics, opacities, cassette styles, motorized options, and more...',
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f0e8d5]
 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6L5 9L10 2" stroke="#5c4717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-base md:text-[20px] text-[#f0e8d5] font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-start">
              <button onClick={() => navigate('/quote')} className="bg-primary text-white px-8 py-3 md:px-10 md:py-4 font-semibold text-base md:text-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-100 uppercase whitespace-nowrap" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Get Free Quote
              </button>
              <button onClick={() => navigate('/contact/schedule-consultation')} className="bg-white text-primary px-8 py-3 md:px-10 md:py-4 font-semibold text-base md:text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-100 uppercase whitespace-nowrap" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        {/* <button
          onClick={handleScrollDown}
          className="absolute bottom-[80px] left-1/2 -translate-x-1/2 z-20 cursor-pointer bg-white hover:bg-white/80 p-3 transition-colors duration-300 shadow-lg"
          aria-label="Scroll down"
        >
          <div className="animate-bounce-arrow">
            <MdOutlineKeyboardDoubleArrowDown className="w-8 h-8 text-brown" />
          </div>
        </button> */}
      </div>
    </section>
  )
}

export default Hero
