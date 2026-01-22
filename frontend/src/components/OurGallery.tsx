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
  // Use the images array directly, or fallback to placeholder if empty
  const collageImages = images.length > 0
    ? images
    : Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        image: 'https://images.unsplash.com/photo-1631889993950-9e9352e6b688?w=800&h=600&fit=crop',
        alt: `Gallery image ${i + 1}`
      }))

  return (
    <section id="our-gallery" className="py-5 md:py-10 px-3 md:px-5 bg-gray-50">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4">Our Gallery</h2>
        <p className="text-base md:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto" style={{ color: '#937125' }}>
          Explore our curated collection of stunning window shade installations. From modern minimalism to classic elegance, discover the perfect inspiration for your space.
        </p>
        <div className="grid grid-cols-10 gap-3 md:gap-4" style={{ gridAutoRows: 'minmax(120px, auto)' }}>
          {/* TOP ROW - Mix of sizes with some top edge alignment */}

          {/* Image 1: Tall (top left, tall portrait-like) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 1, gridRowEnd: 2, height: '350px' }}
            onClick={() => navigate(`/gallery${collageImages[0].id}`)}
          >
            <img
              src={collageImages[0].image}
              alt={collageImages[0].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 2: Taller (top left-middle, tallest) */}
          <div
            className="col-span-3 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 1, gridRowEnd: 2, height: '480px' }}
            onClick={() => navigate(`/gallery${collageImages[1].id}`)}
          >
            <img
              src={collageImages[1].image}
              alt={collageImages[1].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 3: Wide (top middle, landscape) */}
          <div
            className="col-span-3 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 1, gridRowEnd: 2, height: '400px' }}
            onClick={() => navigate(`/gallery${collageImages[2].id}`)}
          >
            <img
              src={collageImages[2].image}
              alt={collageImages[2].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 4: Small square (top right, small square) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 1, gridRowEnd: 2, height: '300px' }}
            onClick={() => navigate(`/gallery${collageImages[3].id}`)}
          >
            <img
              src={collageImages[3].image}
              alt={collageImages[3].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 5: Small square (top far right, stacked below Image 4) */}
          <div
            className="col-span-3 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 2, gridRowEnd: 3, height: '320px' }}
            onClick={() => navigate(`/gallery${collageImages[4].id}`)}
          >
            <img
              src={collageImages[4].image}
              alt={collageImages[4].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 6: Medium wide (middle left, landscape, offset) */}
          <div
            className="col-span-4 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 2, gridRowEnd: 3, height: '490px' }}
            onClick={() => navigate(`/gallery${collageImages[5].id}`)}
          >
            <img
              src={collageImages[5].image}
              alt={collageImages[5].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 7: Medium (middle, square-ish, offset) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 2, gridRowEnd: 3, height: '350px'}}
            onClick={() => navigate(`/gallery${collageImages[6].id}`)}
          >
            <img
              src={collageImages[6].image}
              alt={collageImages[6].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 8: Small square (middle right, offset) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 3, gridRowEnd: 4, height: '390px'}}
            onClick={() => navigate(`/gallery${collageImages[7].id}`)}
          >
            <img
              src={collageImages[7].image}
              alt={collageImages[7].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 9: Small square (top far right, third stacked) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 3, gridRowEnd: 4, height: '250px' }}
            onClick={() => navigate(`/gallery${collageImages[8].id}`)}
          >
            <img
              src={collageImages[8].image}
              alt={collageImages[8].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* BOTTOM ROW - Mix of sizes with some bottom edge alignment */}

          {/* Image 10: Wide (bottom left, wide landscape) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 3, gridRowEnd: 4, height: '340px' }}
            onClick={() => navigate(`/gallery${collageImages[9].id}`)}
          >
            <img
              src={collageImages[9].image}
              alt={collageImages[9].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 11: Tall (bottom left-middle, tall portrait-like) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 3, gridRowEnd: 4, height: '500px' }}
            onClick={() => navigate(`/gallery${collageImages[10].id}`)}
          >
            <img
              src={collageImages[10].image}
              alt={collageImages[10].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 12: Square-ish (bottom middle, almost square) */}
          <div
            className="col-span-2 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 3, gridRowEnd: 4, height: '295px' }}
            onClick={() => navigate(`/gallery${collageImages[11].id}`)}
          >
            <img
              src={collageImages[11].image}
              alt={collageImages[11].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 13: Medium wide (bottom right, landscape) */}
          <div
            className="col-span-3 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 4, gridRowEnd: 5, height: '350px' }}
            onClick={() => navigate(`/gallery${collageImages[12].id}`)}
          >
            <img
              src={collageImages[12].image}
              alt={collageImages[12].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 14: Medium (bottom section, square-ish) */}
          <div
            className="col-span-3 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 4, gridRowEnd: 5, height: '580px' }}
            onClick={() => navigate(`/gallery${collageImages[13].id}`)}
          >
            <img
              src={collageImages[13].image}
              alt={collageImages[13].alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 15: Medium (bottom section, landscape) */}
          <div
            className="col-span-4 rounded-lg overflow-hidden cursor-pointer"
            style={{ gridRowStart: 4, gridRowEnd: 5, height: '390px' }}
            onClick={() => navigate(`/gallery${collageImages[14].id}`)}
          >
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

