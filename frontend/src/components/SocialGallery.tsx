interface SocialGalleryProps {
  images: string[]
}

function SocialGallery({ images }: SocialGalleryProps) {
  return (
    <section className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-10 md:mb-15">
          <p className="text-base md:text-xl text-light-gray mb-2">Share your setup with</p>
          <h2 className="text-3xl md:text-4xl font-bold text-brown m-0">#FuniroFurniture</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <div key={index} className="w-full aspect-square overflow-hidden rounded-lg relative">
              <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialGallery
