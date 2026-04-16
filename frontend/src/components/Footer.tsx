import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi2'

const linkClass = 'text-brown no-underline text-base hover:text-primary transition-colors font-[500]'
const linkStyle = { fontFamily: 'Montserrat, sans-serif' as const }

const companyLinks = [
  { label: 'About Me', href: '/about-me' },
  { label: 'Gallery', href: '/#our-gallery' },
  { label: 'Why Pacific Light', href: '/#why-us' }
]

const productSlugs = [
  'zebra-shades',
  'roller-shades',
  'honeycomb-shades',
  'roman-shades',
  'bamboo-shades',
  'draperies',
  'outdoor-shades'
]

const productLabels: Record<string, string> = {
  'zebra-shades': 'Zebra Shades',
  'roller-shades': 'Roller Shades',
  'honeycomb-shades': 'Honeycomb Shades',
  'roman-shades': 'Roman Shades',
  'bamboo-shades': 'Bamboo Shades',
  'draperies': 'Draperies',
  'outdoor-shades': 'Outdoor Shades'
}

const supportLinks = [
  { label: 'Get Free Quote', href: '/quote' },
  { label: 'Schedule Consultation', href: '/contact/schedule-consultation' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' }
]

const sectionHeaderClass = 'text-brown font-bold uppercase text-sm tracking-wide m-0 mb-4'
const sectionHeaderStyle = { fontFamily: 'Montserrat, sans-serif' as const }

type AccordionKey = 'company' | 'products' | 'support' | null

function Footer() {
  const navigate = useNavigate()
  const [openAccordion, setOpenAccordion] = useState<AccordionKey>(null)

  const toggleAccordion = (key: AccordionKey) => {
    setOpenAccordion((prev) => (prev === key ? null : key))
  }

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault()
      if (href === '/') {
        navigate('/')
      } else if (href.startsWith('/#')) {
        window.location.href = href
      } else {
        navigate(href)
      }
    }
  }

  return (
    <footer className="bg-gray-100 border-t border-[#ddd9d0]">
      {/* Mobile layout */}
      <div className="md:hidden py-8 px-5">
        <div className="flex flex-col items-center text-center">
          <a href="/" className="block w-[160px] mb-3" onClick={(e) => { e.preventDefault(); navigate('/') }}>
            <img src="/logo.png" alt="Pacific Light Shades & Blinds" className="w-full h-auto" />
          </a>
          <p className="text-base text-brown m-0 font-[500] leading-snug" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Custom Solutions for Every Window
          </p>
          <p className="text-sm text-brown mt-1 mb-6 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Factory Direct Pricing · Premium Quality
          </p>
        </div>

        {/* Contact info with icons */}
        <div className="flex flex-col gap-3 items-center text-center mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <a href="sms:+16505616086" className="flex items-center justify-center gap-3 text-brown no-underline hover:text-primary transition-colors text-base font-[500]">
            <FaPhone className="w-4 h-4 flex-shrink-0 text-brown" />
            (650) 561-6086
          </a>
          <div className="flex items-center justify-center gap-3 text-brown text-base font-[500]">
            <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0 text-brown" />
            Serving Bay Area, CA
          </div>
          <a href="mailto:info@pacificlightshades.com" className="flex items-center justify-center gap-3 text-brown no-underline hover:text-primary transition-colors text-base font-[500]">
            <FaEnvelope className="w-4 h-4 flex-shrink-0 text-brown" />
            info@pacificlightshades.com
          </a>
          <p className="text-base text-brown m-0 font-[500]">Mon - Fri: 8:00 AM – 5:00 PM</p>
        </div>

        {/* Accordions */}
        <div className="border-t border-[#e0dcd4]">
          <button type="button" onClick={() => toggleAccordion('company')} className="w-full flex items-center justify-between py-4 text-left border-b border-[#e0dcd4] bg-transparent">
            <span className="text-brown font-bold uppercase text-sm tracking-wide" style={sectionHeaderStyle}>Company</span>
            <HiChevronDown className={`w-5 h-5 text-brown transition-transform ${openAccordion === 'company' ? 'rotate-180' : ''}`} />
          </button>
          {openAccordion === 'company' && (
            <ul className="list-none p-0 m-0 py-3 px-0 flex flex-col gap-2 border-b border-[#e0dcd4]">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass} style={linkStyle} onClick={(e) => handleLink(e, href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <button type="button" onClick={() => toggleAccordion('products')} className="w-full flex items-center justify-between py-4 text-left border-b border-[#e0dcd4] bg-transparent">
            <span className="text-brown font-bold uppercase text-sm tracking-wide" style={sectionHeaderStyle}>Products</span>
            <HiChevronDown className={`w-5 h-5 text-brown transition-transform ${openAccordion === 'products' ? 'rotate-180' : ''}`} />
          </button>
          {openAccordion === 'products' && (
            <ul className="list-none p-0 m-0 py-3 px-0 flex flex-col gap-2 border-b border-[#e0dcd4]">
              {productSlugs.map((slug) => (
                <li key={slug}>
                  <a href={`/${slug}`} className={linkClass} style={linkStyle} onClick={(e) => { e.preventDefault(); navigate(`/${slug}`) }}>
                    {productLabels[slug] || slug}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <button type="button" onClick={() => toggleAccordion('support')} className="w-full flex items-center justify-between py-4 text-left border-b border-[#e0dcd4] bg-transparent">
            <span className="text-brown font-bold uppercase text-sm tracking-wide" style={sectionHeaderStyle}>Support</span>
            <HiChevronDown className={`w-5 h-5 text-brown transition-transform ${openAccordion === 'support' ? 'rotate-180' : ''}`} />
          </button>
          {openAccordion === 'support' && (
            <ul className="list-none p-0 m-0 py-3 px-0 flex flex-col gap-2 border-b border-[#e0dcd4]">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass} style={linkStyle} onClick={(e) => handleLink(e, href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA */}
        <p className="text-center text-brown font-[500] mt-6 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Ready to Upgrade Your Windows?
        </p>
        <a
          href="/quote"
          onClick={(e) => { e.preventDefault(); navigate('/quote') }}
          className="block w-full max-w-[280px] mx-auto px-6 py-4 bg-primary text-white font-semibold text-center text-base hover:bg-opacity-90 transition-all duration-300 no-underline uppercase"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Get Free Quote
        </a>
      </div>

      {/* Desktop: Main content 4 columns */}
      <div className="max-w-container mx-auto py-10 md:py-14 px-5 md:px-10 lg:px-20 hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] gap-8 lg:gap-6">
          {/* Column 1: Logo, tagline, CTA */}
          <div className="flex flex-col items-center text-center lg:items-center lg:text-center">
            <a href="/" className="block w-[191px]" onClick={(e) => { e.preventDefault(); navigate('/') }}>
              <img src="/logo.png" alt="Pacific Light Shades & Blinds" className="w-full h-auto" />
            </a>
            <p className="text-base text-brown m-0 font-[700] leading-snug" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              CUSTOM SOLUTIONS FOR EVERY WINDOW
            </p>
            <p className="text-sm text-brown mt-2 mb-6 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Oversized • Arched • Angled • High Ceilings
            </p>
            <a
              href="/quote"
              onClick={(e) => { e.preventDefault(); navigate('/quote') }}
              className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white font-semibold text-sm md:text-base hover:bg-opacity-90 transition-all duration-300 no-underline flex items-center justify-center uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Get Free Quote
            </a>
          </div>

          {/* Column 2: COMPANY + SUPPORT */}
          <div className="lg:pl-4 lg:border-l border-[#e0dcd4]">
            <h3 className={sectionHeaderClass} style={sectionHeaderStyle}>Company</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass} style={linkStyle} onClick={(e) => handleLink(e, href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className={`${sectionHeaderClass} mt-6`} style={sectionHeaderStyle}>Support</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={linkClass} style={linkStyle} onClick={(e) => handleLink(e, href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: PRODUCTS */}
          <div className="lg:pl-4 lg:border-l border-[#e0dcd4]">
            <h3 className={sectionHeaderClass} style={sectionHeaderStyle}>Products</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              {productSlugs.map((slug) => (
                <li key={slug}>
                  <a
                    href={`/${slug}`}
                    className={linkClass} style={linkStyle}
                    onClick={(e) => { e.preventDefault(); navigate(`/${slug}`) }}
                  >
                    {productLabels[slug] || slug}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div className="lg:pl-4 lg:border-l border-[#e0dcd4]">
            <h3 className={sectionHeaderClass} style={sectionHeaderStyle}>Contact Us</h3>
            <p className="text-base text-brown m-0 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <a href="sms:+16505616086" className="text-brown no-underline hover:text-primary transition-colors">(650) 561-6086</a>
              <br />
              <a href="mailto:info@pacificlightshades.com" className="text-brown no-underline hover:text-primary transition-colors block my-2">info@pacificlightshades.com</a>
              <span className="block text-base text-brown font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Mon - Fri: 9:00 AM - 5:00 PM</span>
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/beckypl_interiors/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brown flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/pacificlightshades" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brown flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip: copyright; on mobile also social icons */}
      <div className="bg-[#e4e2df] border-t border-[#ddd9d0] py-4 px-5 md:px-10 lg:px-20">
        <div className="max-w-container mx-auto flex flex-row items-center justify-between md:justify-center">
          <p className="text-sm text-brown m-0 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            © 2026 Pacific Light Window Treatments. All rights reserved.
          </p>
          <div className="flex items-center gap-3 md:hidden">
            <a href="https://www.instagram.com/beckypl_interiors/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brown flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Instagram">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/pacificlightshades" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brown flex items-center justify-center text-white hover:opacity-90 transition-opacity" aria-label="Facebook">
              <FaFacebookF className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
