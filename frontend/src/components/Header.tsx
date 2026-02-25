import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryNameToSlug } from '../utils/slug'
import Logo from './Logo'

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
  const [galleryLocations, setGalleryLocations] = useState<{ [key: number]: string }>({})
  const [showShadesDropdown, setShowShadesDropdown] = useState(false)
  const [showWhyUsDropdown, setShowWhyUsDropdown] = useState(false)
  const [showContactDropdown, setShowContactDropdown] = useState(false)
  const [showGalleryDropdown, setShowGalleryDropdown] = useState(false)
  const [showServiceDropdown, setShowServiceDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))

    // Fetch gallery locations
    const fetchGalleryLocations = async () => {
      const locations: { [key: number]: string } = {}
      const promises = Array.from({ length: 15 }, (_, i) => i + 1).map(async (galleryNum) => {
        try {
          const res = await fetch(`/api/gallery/${galleryNum}`)
          if (res.ok) {
            const data = await res.json()
            locations[galleryNum] = data.location || ''
          }
        } catch (err) {
          console.error(`Error fetching gallery ${galleryNum}:`, err)
        }
      })
      await Promise.all(promises)
      setGalleryLocations(locations)
    }
    fetchGalleryLocations()
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

  const handleGalleryItemClick = (galleryNumber: number) => {
    navigate(`/gallery${galleryNumber}`)
    setShowGalleryDropdown(false)
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
    window.open(`/${slug}`, '_blank', 'noopener,noreferrer')
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
    <header className="sticky top-0 z-50 py-2 md:py-3 px-3 md:px-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-container mx-auto flex justify-between items-center">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-brown hover:text-primary transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-current transition-all duration-300"></span>
          <span className="w-6 h-0.5 bg-current transition-all duration-300"></span>
        </button>

        {/* Logo - Smaller on mobile, centered on mobile, left on desktop */}
        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Logo
            mainTextSize="text-2xl md:text-4xl"
            subTextSize="text-xs md:text-base"
          />
        </div>

        {/* Mobile Get Free Quote Button - Right side on mobile */}
        <div className="md:hidden flex-shrink-0">
          <a
            href="/quote"
            onClick={(e) => {
              e.preventDefault()
              navigate('/quote')
            }}
            className="px-5 py-3 bg-primary text-white font-semibold text-sm hover:bg-opacity-90 transition-all duration-300 no-underline flex items-center justify-center uppercase whitespace-nowrap"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Get Free Quote
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-[60px] md:gap-20">
          <div
            className="relative"
            onMouseEnter={() => setShowShadesDropdown(true)}
            onMouseLeave={() => setShowShadesDropdown(false)}
          >
            <a href="/#browse-the-range" onClick={handleShadesClick} className={`no-underline text-brown text-xl md:text-xl font-medium hover:text-primary transition-colors uppercase ${currentPage === 'shades' ? 'text-primary' : ''}`} style={{ fontFamily: 'Fjalla One, sans-serif' }}>Shades</a>
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
                      className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setShowServiceDropdown(true)}
            onMouseLeave={() => setShowServiceDropdown(false)}
          >
            <a href="/#how-it-works" onClick={handleHowItWorksClick} className="no-underline text-brown text-xl md:text-xl font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Service</a>
            {showServiceDropdown && (
              <div className="absolute top-full left-0 pt-1 w-56 bg-transparent z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <a
                    href="/#see-whats-customizable"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = '/#see-whats-customizable'
                      setShowServiceDropdown(false)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    See What's Customizable
                  </a>
                  <a
                    href="/#how-it-works"
                    onClick={(e) => {
                      e.preventDefault()
                      handleHowItWorksClick(e)
                      setShowServiceDropdown(false)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    How It Works
                  </a>
                </div>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setShowGalleryDropdown(true)}
            onMouseLeave={() => setShowGalleryDropdown(false)}
          >
            <a href="/#our-gallery" onClick={handleGalleryClick} className="no-underline text-brown text-xl md:text-xl font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Gallery</a>
            {showGalleryDropdown && (
              <div className="absolute top-full left-0 pt-1 w-96 bg-transparent z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <div className="grid grid-cols-2">
                    {Array.from({ length: 15 }, (_, i) => i + 1).map((galleryNum) => (
                      <a
                        key={galleryNum}
                        href={`/gallery${galleryNum}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleGalleryItemClick(galleryNum)
                        }}
                        className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        Gallery {galleryNum}{galleryLocations[galleryNum] ? `: ${galleryLocations[galleryNum]}` : ''}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setShowWhyUsDropdown(true)}
            onMouseLeave={() => setShowWhyUsDropdown(false)}
          >
            <a href="/#why-us" onClick={handleWhyUsClick} className="no-underline text-brown text-xl md:text-xl font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Why Us</a>
            {showWhyUsDropdown && (
              <div className="absolute top-full left-0 pt-1 w-56 bg-transparent z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <a
                    href="/#why-us"
                    onClick={(e) => {
                      e.preventDefault()
                      handleWhyUsDropdownClick('Why Choose Pacific Light Shades & Blinds')
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Why Choose Pacific Light Shades & Blinds
                  </a>
                  <a
                    href="/#faq"
                    onClick={(e) => {
                      e.preventDefault()
                      handleFAQClick(e)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    FAQ
                  </a>
                </div>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setShowContactDropdown(true)}
            onMouseLeave={() => setShowContactDropdown(false)}
          >
            <a href="/contact" className="no-underline text-brown text-xl md:text-xl font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Contact Us</a>
            {showContactDropdown && (
              <div className="absolute top-full left-0 pt-1 w-56 bg-transparent z-50">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                  <a
                    href="/quote"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/quote')
                      setShowContactDropdown(false)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Get Free Quote
                  </a>
                  <a
                    href="/contact/schedule-consultation"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/contact/schedule-consultation')
                      setShowContactDropdown(false)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Schedule a Consultation
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/contact')
                      setShowContactDropdown(false)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200 cursor-pointer font-[500]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Contact Form
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Get Free Quote Button */}
        <div className="hidden md:flex gap-3">
          <a href="/quote" className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all duration-300 no-underline flex items-center justify-center uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get Free Quote
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <Logo />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-brown hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-5 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Mobile Menu Items */}
          <div className="space-y-1">
            {/* Shades */}
            <div className="border-b border-gray-100 pb-2 mb-2">
              <button
                onClick={() => {
                  window.location.href = '/#browse-the-range'
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-brown text-lg font-medium hover:text-primary transition-colors uppercase"
                style={{ fontFamily: 'Fjalla One, sans-serif' }}
              >
                Shades
              </button>
              <div className="pl-4 space-y-1">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/${categoryNameToSlug(category.name)}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleCategoryClick(category)
                      setIsMobileMenuOpen(false)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Service */}
            <div className="border-b border-gray-100 pb-2 mb-2">
              <button
                onClick={() => {
                  window.location.href = '/#how-it-works'
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-brown text-lg font-medium hover:text-primary transition-colors uppercase"
                style={{ fontFamily: 'Fjalla One, sans-serif' }}
              >
                Service
              </button>
              <div className="pl-4 space-y-1">
                <a
                  href="/#see-whats-customizable"
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = '/#see-whats-customizable'
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  See What's Customizable
                </a>
                <a
                  href="/#how-it-works"
                  onClick={(e) => {
                    e.preventDefault()
                    handleHowItWorksClick(e)
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  How It Works
                </a>
              </div>
            </div>

            {/* Gallery */}
            <div className="border-b border-gray-100 pb-2 mb-2">
              <button
                onClick={() => {
                  window.location.href = '/#our-gallery'
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-brown text-lg font-medium hover:text-primary transition-colors uppercase"
                style={{ fontFamily: 'Fjalla One, sans-serif' }}
              >
                Gallery
              </button>
              <div className="pl-4 space-y-1 max-h-60 overflow-y-auto">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((galleryNum) => (
                  <a
                    key={galleryNum}
                    href={`/gallery${galleryNum}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleGalleryItemClick(galleryNum)
                      setIsMobileMenuOpen(false)
                    }}
                    className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Gallery {galleryNum}{galleryLocations[galleryNum] ? `: ${galleryLocations[galleryNum]}` : ''}
                  </a>
                ))}
              </div>
            </div>

            {/* Why Us */}
            <div className="border-b border-gray-100 pb-2 mb-2">
              <button
                onClick={() => {
                  window.location.href = '/#why-us'
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-brown text-lg font-medium hover:text-primary transition-colors uppercase"
                style={{ fontFamily: 'Fjalla One, sans-serif' }}
              >
                Why Us
              </button>
              <div className="pl-4 space-y-1">
                <a
                  href="/#why-us"
                  onClick={(e) => {
                    e.preventDefault()
                    handleWhyUsDropdownClick('Why Choose Pacific Light Shades & Blinds')
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Why Choose Pacific Light Shades & Blinds
                </a>
                <a
                  href="/#faq"
                  onClick={(e) => {
                    e.preventDefault()
                    handleFAQClick(e)
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  FAQ
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="border-b border-gray-100 pb-2 mb-2">
              <button
                onClick={() => {
                  navigate('/contact')
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-3 text-brown text-lg font-medium hover:text-primary transition-colors uppercase"
                style={{ fontFamily: 'Fjalla One, sans-serif' }}
              >
                Contact Us
              </button>
              <div className="pl-4 space-y-1">
                <a
                  href="/quote"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/quote')
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Get Free Quote
                </a>
                <a
                  href="/contact/schedule-consultation"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/contact/schedule-consultation')
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Schedule a Consultation
                </a>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/contact')
                    setIsMobileMenuOpen(false)
                  }}
                  className="block px-4 py-2 text-brown text-sm hover:bg-primary hover:bg-opacity-10 hover:text-primary transition-all duration-200"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Contact Form
                </a>
              </div>
            </div>

            {/* Mobile Get Free Quote Button */}
            <div className="pt-4">
              <a
                href="/quote"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/quote')
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full px-6 py-5 bg-primary text-white font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 text-center uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
