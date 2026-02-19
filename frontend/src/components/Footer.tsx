import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryNameToSlug } from '../utils/slug'
import Logo from './Logo'

interface Category {
  id: number
  name: string
  image: string
}

function Footer() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  return (
    <footer className="bg-gray-100 border-t border-gray-100 py-10 md:py-20 px-5 md:px-20">
      <div className="max-w-container mx-auto">
        {/* Mobile: Logo and description */}
        <div className="flex flex-col gap-6 mb-8 md:hidden">
          <div style={{ width: '191px' }}>
            <Logo />
          </div>
          <p className="text-base text-brown leading-relaxed m-0 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Contact us for any questions or inquiries.
          </p>
        </div>

        {/* Mobile: Two column layout */}
        <div className="grid grid-cols-2 md:hidden gap-8 mb-10">
          {/* Column 1: Categories */}
          <div className="flex flex-col gap-6">
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {categories.map((category) => {
                const slug = categoryNameToSlug(category.name)
                return (
                  <li key={category.id}>
                    <a
                      href={`/${slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/${slug}`)
                      }}
                      className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {category.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 2: Other links */}
          <div className="flex flex-col gap-6">
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              <li><a href="/" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Home</a></li>
              <li><a href="/#our-gallery" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Gallery</a></li>
              <li><a href="/#how-it-works" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Service</a></li>
              <li><a href="/#why-us" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Why Us</a></li>
              <li><a href="/contact" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Contact</a></li>
              <li><a href="/quote" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Get Free Quote</a></li>
              <li><a href="/schedule-consultation" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Schedule a Consultation</a></li>
            </ul>
          </div>
        </div>

        {/* Desktop: Original layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:flex lg:flex-row gap-8 md:gap-15 lg:gap-20 mb-10 lg:justify-between">
          <div className="flex flex-col gap-6 lg:w-auto lg:flex-shrink-0">
            <div style={{ width: '191px' }}>
              <Logo />
            </div>
            <p className="text-base text-brown leading-relaxed m-0 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Contact us for any questions or inquiries.
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:w-auto lg:flex-shrink-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              <li><a href="/" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Home</a></li>
              <li><a href="/#our-gallery" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Gallery</a></li>
              <li><a href="/#how-it-works" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Service</a></li>
              <li><a href="/#why-us" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Why Us</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-6 lg:w-auto lg:flex-shrink-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              {categories.map((category) => {
                const slug = categoryNameToSlug(category.name)
                return (
                  <li key={category.id}>
                    <a
                      href={`/${slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/${slug}`)
                      }}
                      className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {category.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-6 lg:w-auto lg:flex-shrink-0">
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              <li><a href="/contact" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Contact</a></li>
              <li><a href="/quote" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Get Free Quote</a></li>
              <li><a href="/schedule-consultation" className="text-brown no-underline text-base hover:text-primary transition-colors font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>Schedule a Consultation</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-100">
          <div className="lg:flex lg:flex-row lg:justify-center">
            <div className="lg:w-auto lg:flex-shrink-0">
              <p className="text-base text-brown m-0 text-left font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>2026 Pacific Light Shades & Blinds. All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
