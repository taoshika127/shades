interface HeaderProps {
  currentPage?: 'home' | 'shades'
}

function Header({ currentPage = 'home' }: HeaderProps) {
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

  return (
    <header className="sticky top-0 z-50 py-2 md:py-3 px-5 md:px-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-container mx-auto flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-brown m-0">Light & Shade</h1>
        </div>
        <nav className="flex gap-[60px] md:gap-20">
          <a href="/" className={`no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}>Home</a>
          <a href="/#browse-the-range" onClick={handleShadesClick} className={`no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors ${currentPage === 'shades' ? 'text-primary' : ''}`}>Shades</a>
          <a href="/#how-it-works" onClick={handleHowItWorksClick} className="no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors">Service</a>
          <a href="/#why-us" onClick={handleWhyUsClick} className="no-underline text-brown text-md md:text-base font-medium hover:text-primary transition-colors">Why Us</a>
        </nav>
        <div className="flex gap-3">
          <a href="/contact" className="px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded-[5px] font-semibold text-xs md:text-sm hover:bg-opacity-90 transition-all duration-300 no-underline">
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
