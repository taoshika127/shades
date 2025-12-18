import { useState } from 'react'

interface Inspiration {
  id: number
  title: string
  category: string
  image: string
}

interface RoomInspirationProps {
  inspirations: Inspiration[]
}

function RoomInspiration({ inspirations }: RoomInspirationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % inspirations.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (inspirations.length === 0) return null

  const current = inspirations[currentIndex]

  return (
    <section className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 md:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-bold text-brown leading-tight m-0">50+ Beautiful rooms inspiration</h2>
            <p className="text-base md:text-xl text-light-gray leading-relaxed m-0">
              Our designer already made a lot of beautiful prototype of rooms that inspire you
            </p>
            <button className="px-8 py-3.5 bg-primary text-white text-base font-semibold border-0 rounded cursor-pointer w-fit hover:bg-[#9a7828] transition-colors">Explore More</button>
          </div>
          <div className="relative">
            <div className="w-full rounded-[10px] overflow-hidden">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-10 flex justify-between items-end">
                  <div className="text-white">
                    <p className="text-sm md:text-base text-white/80 mb-2">{String(currentIndex + 1).padStart(2, '0')} --- {current.category}</p>
                    <h3 className="text-xl md:text-3xl font-bold text-white m-0">{current.title}</h3>
                  </div>
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-light-beige border-0 text-brown cursor-pointer flex items-center justify-center hover:bg-white transition-colors" onClick={nextSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              {inspirations.map((_, index) => (
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
  )
}

export default RoomInspiration
