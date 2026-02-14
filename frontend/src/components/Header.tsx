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
    <header className="sticky top-0 z-50 py-2 md:py-3 px-5 md:px-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-container mx-auto flex justify-between items-center">
        <Logo />
        <nav className="flex gap-[60px] md:gap-20">
          <div
            className="relative"
            onMouseEnter={() => setShowShadesDropdown(true)}
            onMouseLeave={() => setShowShadesDropdown(false)}
          >
            <a href="/#browse-the-range" onClick={handleShadesClick} className={`no-underline text-brown text-xl md:text-lg font-medium hover:text-primary transition-colors uppercase ${currentPage === 'shades' ? 'text-primary' : ''}`} style={{ fontFamily: 'Fjalla One, sans-serif' }}>Shades</a>
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
            <a href="/#how-it-works" onClick={handleHowItWorksClick} className="no-underline text-brown text-xl md:text-lg font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Service</a>
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
            <a href="/#our-gallery" onClick={handleGalleryClick} className="no-underline text-brown text-xl md:text-lg font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Gallery</a>
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
            <a href="/#why-us" onClick={handleWhyUsClick} className="no-underline text-brown text-xl md:text-lg font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Why Us</a>
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
            <a href="/contact" className="no-underline text-brown text-xl md:text-lg font-medium hover:text-primary transition-colors uppercase" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Contact Us</a>
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
        <div className="flex gap-3">
          <a href="/quote" className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all duration-300 no-underline flex items-center justify-center uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get Free Quote
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
