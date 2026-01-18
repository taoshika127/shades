interface GalleryImage {
  id: number
  image: string
  alt?: string
}

interface OurGalleryProps {
  images: GalleryImage[]
}

function OurGallery({ images }: OurGalleryProps) {
  // Use first image or a placeholder for all images (as requested, reusing the same image)
  const placeholderImage = images.length > 0 ? images[0].image : 'https://images.unsplash.com/photo-1631889993950-9e9352e6b688?w=800&h=600&fit=crop'

  // Create 15 images for the collage layout
  const collageImages = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    image: placeholderImage,
    alt: `Gallery image ${i + 1}`
  }))

  return (
    <section id="our-gallery" className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4">Our Gallery</h2>
        <p className="text-base md:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto" style={{ color: '#937125' }}>
          Explore our curated collection of stunning window shade installations. From modern minimalism to classic elegance, discover the perfect inspiration for your space.
        </p>
        <div className="grid grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {/* Image 1: Large (top left, spans 2 columns, 2 rows) */}
          <div className="col-span-2 row-span-2 rounded-lg overflow-hidden">
            <img
              src={collageImages[0].image}
              alt={collageImages[0].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 2: Tall (top middle, spans 2 rows) */}
          <div className="col-span-1 row-span-2 rounded-lg overflow-hidden">
            <img
              src={collageImages[1].image}
              alt={collageImages[1].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 3: Medium (top right-middle) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[2].image}
              alt={collageImages[2].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 4: Medium (top far right) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[3].image}
              alt={collageImages[3].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 5: Tall (middle left, spans 2 rows) */}
          <div className="col-span-1 row-span-2 rounded-lg overflow-hidden">
            <img
              src={collageImages[4].image}
              alt={collageImages[4].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 6: Medium (middle left-middle) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[5].image}
              alt={collageImages[5].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 7: Medium (middle right-middle) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[6].image}
              alt={collageImages[6].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 8: Large (middle far right, spans 2 rows) */}
          <div className="col-span-1 row-span-2 rounded-lg overflow-hidden">
            <img
              src={collageImages[7].image}
              alt={collageImages[7].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 9: Medium (bottom left) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[8].image}
              alt={collageImages[8].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 10: Medium (bottom left-middle) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[9].image}
              alt={collageImages[9].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 11: Small (bottom left, 4th row) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[10].image}
              alt={collageImages[10].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 12: Small (bottom middle, 4th row) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[11].image}
              alt={collageImages[11].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 13: Small (bottom right-middle, 4th row) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[12].image}
              alt={collageImages[12].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 14: Small (bottom right, 4th row) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[13].image}
              alt={collageImages[13].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 15: Small (additional) */}
          <div className="col-span-1 row-span-1 rounded-lg overflow-hidden">
            <img
              src={collageImages[14].image}
              alt={collageImages[14].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurGallery

