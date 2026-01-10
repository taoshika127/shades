interface GalleryImage {
  id: number
  image: string
  alt?: string
}

interface OurGalleryProps {
  images: GalleryImage[]
}

function OurGallery({ images }: OurGalleryProps) {
  // Display first 4 images in the special layout
  const displayImages = images.slice(0, 4)

  if (displayImages.length === 0) {
    return null
  }

  // First image is large (left side), rest are smaller (right side)
  const largeImage = displayImages[0]
  const smallImages = displayImages.slice(1)

  return (
    <section className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4">Our Gallery</h2>
        <p className="text-base text-center mb-12 max-w-2xl mx-auto" style={{ color: '#937125' }}>
          Explore our curated collection of stunning window shade installations. From modern minimalism to classic elegance, discover the perfect inspiration for your space.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Large image on the left */}
          {largeImage && (
            <div className="w-full h-full min-h-[400px] md:min-h-[500px] rounded-lg overflow-hidden">
              <img
                src={largeImage.image}
                alt={largeImage.alt || 'Window shade installation'}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Smaller images on the right */}
          <div className="flex flex-col gap-4 md:gap-6">
            {smallImages.map((image) => (
              <div
                key={image.id}
                className="w-full h-[250px] md:h-[240px] rounded-lg overflow-hidden"
              >
                <img
                  src={image.image}
                  alt={image.alt || 'Window shade installation'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurGallery

