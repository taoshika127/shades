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

  const visibleImages = getVisibleImages()

  return (
    <section id="our-gallery" className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4">Our Gallery</h2>
        <p className="text-base md:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto" style={{ color: '#937125' }}>
          Explore our curated collection of stunning window shade installations. From modern minimalism to classic elegance, discover the
          perfect inspiration for your space.
        </p>

        <div className="relative">
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
                  className={`relative overflow-hidden cursor-pointer ${
                    isOuter
                      ? 'opacity-50 scale-90 flex-1 max-w-[200px]'
                      : isCenter
                      ? 'opacity-100 scale-100 flex-1 max-w-[350px]'
                      : 'flex-1'
                  }`}
                  onClick={() => img.id > 0 && navigate(`/gallery${img.id}`)}
                  style={{ height: isCenter ? '400px' : '300px' }}
                >
                  <img
                    src={img.image}
                    alt={img.alt || `Gallery image ${img.id}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Grey overlay for side images to make arrows more visible */}
                  {(isLeftmost || isRightmost) && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-60 z-0" />
                  )}
                  {/* Left Arrow - positioned in the middle of leftmost image */}
                  {isLeftmost && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        prevSlide()
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all hover:opacity-80 cursor-pointer"
                      aria-label="Previous images"
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}/>
                      </svg>
                    </button>
                  )}
                  {/* Right Arrow - positioned in the middle of rightmost image */}
                  {isRightmost && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextSlide()
                      }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all hover:opacity-80 cursor-pointer"
                      aria-label="Next images"
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}/>
                      </svg>
                    </button>
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

