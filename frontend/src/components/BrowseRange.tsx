import { categoryNameToSlug } from '../utils/slug'

interface Category {
  id: number
  name: string
  image: string
}

interface BrowseRangeProps {
  categories: Category[]
}

function BrowseRange({ categories }: BrowseRangeProps) {

  const handleCategoryClick = (category: Category) => {
    const slug = categoryNameToSlug(category.name)
    window.open(`/${slug}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="browse-the-range" className="py-10 md:py-20 px-5 md:px-20 bg-gray-50">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Browse The Range</h2>
        <p className="text-base font-[500] md:text-xl text-center mb-6 md:mb-8 max-w-3xl mx-auto text-primary" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
          Explore our extensive collection of high-quality window shades, <br />crafted to fit your style.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-4 cursor-pointer group"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="w-full h-[160px] md:h-[336px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brown text-center m-0 mb-6 md:mb-8 group-hover:text-medium-gray transition-colors" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrowseRange
