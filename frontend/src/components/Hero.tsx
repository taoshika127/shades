import { useState, useEffect, useRef } from 'react'

function Hero() {
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

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

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

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
        <div className="max-w-container w-full flex justify-center md:justify-start">
          <div className="p-6 md:p-10 relative top-[-20px] rounded-[10px] max-w-full md:max-w-[643px] md:ml-20">
            <p className="text-[28px] md:text-[28px] mb-6 font-weight-[400] text-[#f0e8d5]">We <span className="font-bold">customize</span>, <span className="font-bold">measure</span> and <span className="font-bold">install</span></p>
            <h2 className="text-[60px] md:text-[60px] font-bold text-[#dbc697] leading-tight m-0 mb-10">Shades that fit your lifestyle and budget</h2>

            {/* Benefits List */}
            <ul className="space-y-5 mb-10">
              {[
                'Fully Customizable to Your Windows',
                '50% Less Than Home Depot Prices',
                'Professional Measurement & Installation',
                'Warranty with Free Maintenance'
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f0e8d5]
 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6L5 9L10 2" stroke="#5c4717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-base md:text-[20px] text-[#f0e8d5] font-semibold">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button className="bg-primary text-white px-8 py-3 md:px-10 md:py-4 rounded-[5px] font-semibold text-base md:text-lg hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-100">
                Get Free Quote
              </button>
              <button className="bg-white text-primary px-8 py-3 md:px-10 md:py-4 rounded-[5px] font-semibold text-base md:text-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-100">
                View Our Shades
              </button>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-[80px] left-1/2 -translate-x-1/2 z-20 cursor-pointer bg-white/80 hover:bg-white rounded-full p-3 transition-colors duration-300 shadow-lg"
          aria-label="Scroll down"
        >
          <div className="animate-bounce-arrow">
            <svg
              className="w-6 h-6 text-brown"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </button>
      </div>
    </section>
  )
}

export default Hero
