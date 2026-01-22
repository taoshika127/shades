import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function GalleryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [images, setImages] = useState<string[]>([])
  const [galleryLocation, setGalleryLocation] = useState<string>('')
  const [galleryDescription, setGalleryDescription] = useState<string>('')
  const [galleryDesign, setGalleryDesign] = useState<{ [roomType: string]: string } | undefined>(undefined)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Extract gallery ID from pathname (e.g., /gallery1 -> 1)
    const pathMatch = location.pathname.match(/gallery(\d+)/)
    if (!pathMatch) {
      setLoading(false)
      return
    }

    const id = pathMatch[1]
    fetch(`/api/gallery/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(data => {
        setImages(data.images || [])
        setGalleryLocation(data.location || '')
        setGalleryDescription(data.description || '')
        setGalleryDesign(data.design || undefined)
        setCurrentIndex(0)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching gallery:', error)
        setLoading(false)
      })
  }, [location.pathname])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [images.length, location.pathname])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-xl">Gallery not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  const currentImage = images[currentIndex]
  const pathMatch = location.pathname.match(/gallery(\d+)/)
  const idNumber = pathMatch ? pathMatch[1] : '1'

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-10 md:py-20 px-5 md:px-20">
        <div className="max-w-container mx-auto">
          <div className="mb-10 flex flex-wrap items-center gap-8">
            <button
              onClick={() => navigate('/#our-gallery')}
              className="text-brown hover:text-primary flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <div className="flex gap-6">
              {parseInt(idNumber) > 1 && (
                <button
                  className="px-4 py-2.5 bg-primary text-white text-base font-semibold border-0 rounded cursor-pointer w-fit hover:bg-[#9a7828] transition-colors"
                  onClick={() => navigate(`/gallery${parseInt(idNumber) - 1}`)}
                >
                  Previous Gallery
                </button>
              )}
              {parseInt(idNumber) < 15 && (
                <button
                  className="px-4 py-2.5 bg-primary text-white text-base font-semibold border-0 rounded cursor-pointer w-fit hover:bg-[#9a7828] transition-colors"
                  onClick={() => navigate(`/gallery${parseInt(idNumber) + 1}`)}
                >
                  Next Gallery
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 md:gap-20 items-start">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-4xl font-bold text-brown leading-tight m-0">
                {galleryLocation || 'Gallery Location'}
              </h2>
              <p className="text-base md:text-xl text-light-gray leading-relaxed m-0 whitespace-pre-line">
                {galleryDescription || 'Our designer already made a lot of beautiful prototype of rooms that inspire you'}
              </p>
              {galleryDesign && (
                <div className="mt-4">
                  <ul className="space-y-2">
                    {Object.entries(galleryDesign).map(([roomType, description]) => (
                      <li key={roomType} className="text-base md:text-lg leading-relaxed">
                        <span className="font-bold text-brown italic">{roomType}:</span>{' '}
                        <span className="text-brown">{description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="relative w-full overflow-hidden flex justify-center items-center bg-gray-100 rounded-[10px] h-[400px] md:h-[450px] lg:h-[620px]">
                <div className="relative w-auto h-full">
                  <img src={currentImage} alt={`Gallery ${idNumber} image ${currentIndex + 1}`} className="h-full w-auto object-contain" />
                </div>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/70 backdrop-blur-sm border-0 text-brown cursor-pointer flex items-center justify-center hover:bg-white/90 transition-all opacity-80 hover:opacity-100 z-10"
                  onClick={prevSlide}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/70 backdrop-blur-sm border-0 text-brown cursor-pointer flex items-center justify-center hover:bg-white/90 transition-all opacity-80 hover:opacity-100 z-10"
                  onClick={nextSlide}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex gap-3 justify-center mt-6">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all p-0 ${
                      index === currentIndex
                        ? 'bg-primary border-primary'
                        : 'border-gray-300 bg-transparent'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default GalleryPage

