import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryNameToSlug } from '../utils/slug'

interface Category {
  id: number
  name: string
  image: string
}

function SeeWhatsCustomizable() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedCassetteCategory, setSelectedCassetteCategory] = useState<string>('')

  useEffect(() => {
    // Fetch categories for the dropdown
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  const handleViewFabrics = () => {
    if (selectedCategory) {
      const slug = categoryNameToSlug(selectedCategory)
      navigate(`/${slug}`)
    }
  }

  const handleViewCassette = () => {
    if (selectedCassetteCategory) {
      const cassetteSlugs: { [key: string]: string } = {
        'Zebra Shades': 'zebra-shades',
        'Shangri-la shades': 'shangri-la-shades',
        'Roller Shades': 'roller-shades'
      }
      const slug = cassetteSlugs[selectedCassetteCategory]
      if (slug) {
        navigate(`/cassette/${slug}`)
      }
    }
  }

  const cassetteOptions = [
    'Zebra Shades',
    'Shangri-la shades',
    'Roller Shades'
  ]

  const customizationOptions = [
    {
      title: 'Fabrics and Patterns',
      description: 'Choose from hundreds of premium fabrics and patterns to complement your decor. You can even <strong>design your own pattern</strong> and we can print it for you!',
      image: '/assets/home/customizable/design_recommendation.jpg',
      hasLearnMore: false,
    },
    {
      title: 'Cassette',
      description: 'Enhance your shades with decorative cassettes that provide a finished look. The cassettes come in a <strong>variety of colors, shapes and textures</strong> to match your vibe.',
      image: '/assets/home/customizable/cassette.jpeg',
      hasLearnMore: true,
    },
    {
      title: 'Curtain Rods',
      description: 'Complete your window treatment with our selection of <strong>elegant curtain rods, rails, brackets and finials</strong> in various styles, finishes, and sizes.',
      image: '/assets/home/customizable/rods.jpg',
      hasLearnMore: true,
    },
    {
        title: 'Control Options',
        description: 'In addition to <strong>manual control, cord/cordless option</strong>, experience our effortless <strong>smart motorization options</strong> for ALL of our shades/draperies.',
        image: '/assets/home/customizable/Matter-Article-Feaure-Image.jpg',
        hasLearnMore: true,
    },
  ]

  return (
    <section id="see-whats-customizable" className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
          See What's Customizable
        </h2>
        <p className="text-base md:text-xl text-center mb-8 md:mb-12 max-w-3xl mx-auto font-[500]" style={{ color: '#937125', fontFamily: 'Montserrat, sans-serif' }}>
          Discover the endless possibilities to create window treatments that perfectly match your style and functional needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {customizationOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-48 rounded-t-lg overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {option.title}
                </h3>
                <p className="text-base font-[500] text-brown mb-4 flex-1" style={{ fontFamily: 'Montserrat, sans-serif' }} dangerouslySetInnerHTML={{ __html: option.description }}>
                </p>

                {/* Fabrics and Patterns and Cassette have dropdown, others have Learn more link */}
                {option.title === 'Fabrics and Patterns' ? (
                  <div className="space-y-1">
                    <p className="text-sm text-primary font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      See fabrics and patterns in:
                    </p>
                    <div className="flex gap-2">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-brown bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleViewFabrics}
                        disabled={!selectedCategory}
                        className="px-4 py-2 bg-brown text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : option.title === 'Cassette' ? (
                  <div className="space-y-1">
                    <p className="text-sm text-primary font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      See Cassette Options in:
                    </p>
                    <div className="flex gap-2">
                      <select
                        value={selectedCassetteCategory}
                        onChange={(e) => setSelectedCassetteCategory(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-brown bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        <option value="">Select category</option>
                        {cassetteOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleViewCassette}
                        disabled={!selectedCassetteCategory}
                        className="px-4 py-2 bg-brown text-white rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      // Navigate to appropriate section or page
                      if (option.title === 'Control Options') {
                        navigate('/control-options')
                      } else if (option.title === 'Motorization') {
                        window.location.href = '/#how-it-works'
                      } else {
                        window.location.href = '/#browse-the-range'
                      }
                    }}
                    className="text-primary text-base font-[500] hover:text-opacity-80 transition-colors inline-flex items-center gap-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', position: 'relative', top: '-10px' }}
                  >
                    Learn more...
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SeeWhatsCustomizable

