import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const handleCategoryClick = (category: Category) => {
    const slug = categoryNameToSlug(category.name)
    navigate(`/${slug}`)
  }

  return (
    <section id="browse-the-range" className="py-10 md:py-20 px-5 md:px-20 bg-gray-50">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4">Browse The Range</h2>
        <p className="text-base md:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto" style={{ color: '#937125' }}>
          Explore our extensive collection of high-quality window shades, crafted to fit your style.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-4 cursor-pointer group"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="w-full h-[300px] md:h-[480px] overflow-hidden rounded-[10px]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-brown text-center m-0 group-hover:text-medium-gray transition-colors">
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
