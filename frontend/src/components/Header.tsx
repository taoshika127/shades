import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryNameToSlug } from '../utils/slug'

interface HeaderProps {
  currentPage?: 'home' | 'shades'
}

interface Category {
  id: number
  name: string
  image: string
}

function Header({ currentPage = 'home' }: HeaderProps) {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [showShadesDropdown, setShowShadesDropdown] = useState(false)
  const [showWhyUsDropdown, setShowWhyUsDropdown] = useState(false)

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  const handleShadesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()


      // If on another page, navigate to home with hash
      window.location.href = '/#browse-the-range'
  }

  const handleHowItWorksClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()


      // If on another page, navigate to home with hash
      window.location.href = '/#how-it-works'

  }

  const handleGalleryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Always navigate to home with hash, let Home page handle the scroll
    window.location.href = '/#our-gallery'
  }

  const handleWhyUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()


      // If on another page, navigate to home with hash
      window.location.href = '/#why-us'

  }

  const handleFAQClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Always navigate to home with hash, let Home page handle the scroll
    window.location.href = '/#faq'
  }

  const handleCategoryClick = (category: Category) => {
    const slug = categoryNameToSlug(category.name)
    navigate(`/${slug}`)
    setShowShadesDropdown(false)
  }

  const handleWhyUsDropdownClick = (item: string) => {
    if (item === 'Why Choose Pacific Light Shades & Blinds') {
      setShowWhyUsDropdown(false)
      window.location.href = '/#why-us'
    } else if (item === 'FAQ') {
      setShowWhyUsDropdown(false)
      window.location.href = '/#faq'
    }
    setShowWhyUsDropdown(false)
  }

  return (
    <header className="sticky top-0 z-50 py-2 md:py-3 px-5 md:px-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-container mx-auto flex justify-between items-center">
        <a href="/" className="flex flex-col gap-0 no-underline">
          <h1 className="text-3xl md:text-4xl font-bold m-0 leading-tight flex items-baseline" style={{ fontFamily: 'Fjalla One, sans-serif', color: '#102A3A' }}>
            PACIFIC L
            <span
              className="inline-block mx-0.5"
              style={{
                width: '0.4em',
                height: '0.9em',
                backgroundColor: '#102A3A',
                backgroundImage: 'repeating-linear-gradient(0deg, #102A3A 0%, #102A3A 25%, white 25%, white 50%)',
                backgroundSize: '100% 20%',
                verticalAlign: 'baseline'
              }}
            />
            GHT
          </h1>
          <h2 className="text-sm md:text-base font-semibold m-0 leading-tight uppercase text-center" style={{ fontFamily: 'Montserrat, sans-serif', color: '#273f4d' }}>
            SHADES & BLINDS
          </h2>
        </a>
        <nav className="flex gap-[60px] md:gap-20">
          <a href="/" className={`no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}>Home</a>
          <div
            className="relative"
            onMouseEnter={() => setShowShadesDropdown(true)}
            onMouseLeave={() => setShowShadesDropdown(false)}
          >
            <a href="/#browse-the-range" onClick={handleShadesClick} className={`no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors ${currentPage === 'shades' ? 'text-primary' : ''}`}>Shades</a>
            {showShadesDropdown && categories.length > 0 && (
              <div className="absolute top-full left-0 pt-1 w-48 bg-transparent z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`/${categoryNameToSlug(category.name)}`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleCategoryClick(category)
                      }}
                      className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="/#how-it-works" onClick={handleHowItWorksClick} className="no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors">Service</a>
          <a href="/#our-gallery" onClick={handleGalleryClick} className="no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors">Gallery</a>
          <div
            className="relative"
            onMouseEnter={() => setShowWhyUsDropdown(true)}
            onMouseLeave={() => setShowWhyUsDropdown(false)}
          >
            <a href="/#why-us" onClick={handleWhyUsClick} className="no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors">Why Us</a>
            {showWhyUsDropdown && (
              <div className="absolute top-full left-0 pt-1 w-56 bg-transparent z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <a
                    href="/#why-us"
                    onClick={(e) => {
                      e.preventDefault()
                      handleWhyUsDropdownClick('Why Choose Pacific Light Shades & Blinds')
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer"
                  >
                    Why Choose Pacific Light Shades & Blinds
                  </a>
                  <a
                    href="/#faq"
                    onClick={(e) => {
                      e.preventDefault()
                      handleFAQClick(e)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer"
                  >
                    FAQ
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="flex gap-3">
          <a href="/quote" className="px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded-[5px] font-semibold text-xs md:text-sm hover:bg-opacity-90 transition-all duration-300 no-underline flex items-center justify-center">
            Get Free Quote
          </a>
          <a href="/contact" className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-primary border-2 border-primary rounded-[5px] font-semibold text-xs md:text-sm hover:bg-gray-50 transition-all duration-300 no-underline">
            Contact Us
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
