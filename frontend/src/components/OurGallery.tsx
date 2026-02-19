import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

interface GalleryImage {
  id: number
  image: string
  alt?: string
}

interface OurGalleryProps {
  images: GalleryImage[]
}

function OurGallery({ images }: OurGalleryProps) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [visibleCount, setVisibleCount] = useState(5) // For mobile: number of images to show
  const [galleryLocations, setGalleryLocations] = useState<{ [key: number]: string }>({})

  // Use the images array directly, or fallback to placeholder if empty
  const galleryImages = images.length > 0
    ? images
    : Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
        image: 'https://images.unsplash.com/photo-1631889993950-9e9352e6b688?w=800&h=600&fit=crop',
    alt: `Gallery image ${i + 1}`
  }))

  const totalImages = galleryImages.length

  const getVisibleImages = () => {
    // Show 5 images: 2 before, current, 2 after
    // Wrap around the array boundaries
    const visible: GalleryImage[] = []

    for (let i = -2; i <= 2; i++) {
      let index = currentIndex + i
      // Wrap around if index is negative
      if (index < 0) {
        index = totalImages + index
      }
      // Wrap around if index is beyond array length
      if (index >= totalImages) {
        index = index % totalImages
      }
      visible.push(galleryImages[index])
    }

    return visible
  }

  const resetTimer = () => {
    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    // Start new timer
    if (totalImages > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages)
      }, 5000)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages)
    resetTimer()
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)
    resetTimer()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    resetTimer()
  }

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [totalImages])

  // Fetch gallery locations
  useEffect(() => {
    const fetchGalleryLocations = async () => {
      const locations: { [key: number]: string } = {}
      const promises = galleryImages.map(async (img) => {
        try {
          const res = await fetch(`/api/gallery/${img.id}`)
          if (res.ok) {
            const data = await res.json()
            locations[img.id] = data.location || ''
          }
        } catch (error) {
          console.error(`Error fetching location for gallery ${img.id}:`, error)
        }
      })
      await Promise.all(promises)
      setGalleryLocations(locations)
    }
    fetchGalleryLocations()
  }, [galleryImages])

  const visibleImages = getVisibleImages()

  // Get images to display on mobile (first visibleCount images)
  const mobileImages = galleryImages.slice(0, visibleCount)
  const hasMoreImages = visibleCount < totalImages

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, totalImages))
  }

  return (
    <section id="our-gallery" className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Our Gallery</h2>
        <p className="text-base md:text-xl text-center mb-6 md:mb-8 max-w-3xl mx-auto font-[500]" style={{ color: '#937125', fontFamily: 'Montserrat, sans-serif' }}>
          Explore our curated collection of stunning window shade installations. From modern minimalism to classic elegance, discover the
          perfect inspiration for your space.
        </p>

        {/* Mobile View - Vertical List */}
        <div className="md:hidden">
          <div className="flex flex-col gap-4">
            {mobileImages.map((img) => (
              <div
                key={img.id}
                className="relative overflow-hidden cursor-pointer group"
                onClick={() => {
                  if (img.id > 0) {
                    navigate(`/gallery${img.id}`)
                  }
                }}
              >
                <img
                  src={img.image}
                  alt={img.alt || `Gallery image ${img.id}`}
                  className="w-full h-auto object-contain transition-all duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 pointer-events-none" />
                {/* Location stripe at bottom */}
                {galleryLocations[img.id] && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 px-4 py-2">
                    <p className="text-brown text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {galleryLocations[img.id]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreImages && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="text-primary font-medium hover:underline cursor-pointer transition-all duration-300"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                See More...
              </button>
            </div>
          )}
        </div>

        {/* Desktop View - Carousel */}
        <div className="hidden md:block relative">
          {/* Carousel Container */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {visibleImages.map((img, index) => {
              const isOuter = index === 0 || index === 4
              const isCenter = index >= 1 && index <= 3
              const isLeftmost = index === 0
              const isRightmost = index === 4

              return (
                <div
                  key={img.id}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    isOuter
                      ? 'group opacity-50 scale-90 flex-1 max-w-[200px] cursor-pointer'
                      : isCenter
                      ? 'group opacity-100 scale-100 flex-1 max-w-[350px] hover:scale-105 cursor-pointer'
                      : 'flex-1'
                  }`}
                  onClick={() => {
                    if (isCenter && img.id > 0) {
                      navigate(`/gallery${img.id}`)
                    } else if (isLeftmost) {
                      prevSlide()
                    } else if (isRightmost) {
                      nextSlide()
                    }
                  }}
                  style={{ height: isCenter ? '400px' : '300px' }}
                >
            <img
                    src={img.image}
                    alt={img.alt || `Gallery image ${img.id}`}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isCenter ? 'group-hover:brightness-110 group-hover:scale-105' : ''
                    }`}
                  />
                  {/* Hover overlay effect - only for center images */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 pointer-events-none" />
                  )}
                  {/* Grey overlay for side images to make arrows more visible */}
                  {(isLeftmost || isRightmost) && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-60 z-0" />
                  )}
                  {/* Left Arrow - positioned in the middle of leftmost image */}
                  {isLeftmost && (
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-300 pointer-events-none"
                      aria-label="Previous images"
                    >
                      <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300 -z-10" style={{ width: '80px', height: '80px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:scale-110">
                        <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}/>
                      </svg>
                    </div>
                  )}
                  {/* Right Arrow - positioned in the middle of rightmost image */}
                  {isRightmost && (
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-300 pointer-events-none"
                      aria-label="Next images"
                    >
                      <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300 -z-10" style={{ width: '80px', height: '80px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:scale-110">
                        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}/>
                      </svg>
                    </div>
                  )}
          </div>
              )
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {galleryImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-medium-gray'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurGallery

