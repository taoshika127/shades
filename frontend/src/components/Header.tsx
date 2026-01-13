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

    if (currentPage === 'home') {
      // If already on home page, scroll to the section
      const browseSection = document.getElementById('browse-the-range')
      if (browseSection) {
        browseSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If on another page, navigate to home with hash
      window.location.href = '/#browse-the-range'
    }
  }

  const handleHowItWorksClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (currentPage === 'home') {
      // If already on home page, scroll to the section
      const howItWorksSection = document.getElementById('how-it-works')
      if (howItWorksSection) {
        howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If on another page, navigate to home with hash
      window.location.href = '/#how-it-works'
    }
  }

  const handleWhyUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (currentPage === 'home') {
      // If already on home page, scroll to the section
      const whyUsSection = document.getElementById('why-us')
      if (whyUsSection) {
        whyUsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If on another page, navigate to home with hash
      window.location.href = '/#why-us'
    }
  }

  const handleCategoryClick = (category: Category) => {
    const slug = categoryNameToSlug(category.name)
    navigate(`/${slug}`)
    setShowShadesDropdown(false)
  }

  const handleWhyUsDropdownClick = (item: string) => {
    if (item === 'Why Choose Light & Shade') {
      if (currentPage === 'home') {
        const whyUsSection = document.getElementById('why-us')
        if (whyUsSection) {
          whyUsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        window.location.href = '/#why-us'
      }
    } else if (item === 'FAQ') {
      navigate('/#faq')
    } else if (item === 'Our Gallery') {
      if (currentPage === 'home') {
        const gallerySection = document.getElementById('our-gallery')
        if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        window.location.href = '/#our-gallery'
      }
    }
    setShowWhyUsDropdown(false)
  }

  return (
    <header className="sticky top-0 z-50 py-2 md:py-3 px-5 md:px-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-container mx-auto flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-brown m-0">Light & Shade</h1>
        </div>
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
                      handleWhyUsDropdownClick('Why Choose Light & Shade')
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer"
                  >
                    Why Choose Light & Shade
                  </a>
                  <a
                    href="/#our-gallery"
                    onClick={(e) => {
                      e.preventDefault()
                      handleWhyUsDropdownClick('Our Gallery')
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer"
                  >
                    Our Gallery
                  </a>
                  <a
                    href="/#faq"
                    onClick={(e) => {
                      e.preventDefault()
                      handleWhyUsDropdownClick('FAQ')
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
          <a href="/contact" className="px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded-[5px] font-semibold text-xs md:text-sm hover:bg-opacity-90 transition-all duration-300 no-underline flex items-center justify-center">
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
