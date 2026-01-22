import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import BrowseRange from '../components/BrowseRange'
import HowItWorksSection from '../components/HowItWorksSection'
import WhyUs from '../components/WhyUs'
import OurGallery from '../components/OurGallery'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  image: string
  badge?: 'sale' | 'new'
}

interface Category {
  id: number
  name: string
  image: string
}

interface GalleryImage {
  id: number
  image: string
  alt: string
}

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))

    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))

    // Fetch gallery images
    fetch('/api/gallery-images')
      .then(res => res.json())
      .then(data => setGalleryImages(data))
  }, [])

  useEffect(() => {
    // Handle hash navigation to scroll to sections
    const hash = window.location.hash

    if (hash === '#browse-the-range' || hash === '#how-it-works' || hash === '#why-us' || hash === '#faq' || hash === '#our-gallery') {
      setTimeout(() => {
        const section = document.getElementById(hash.substring(1))
        if (section) {
          section.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
      }, 0) // Small delay to ensure DOM is ready
    }
  }, [])

  return (
    <div className="home">
      <Header currentPage="home" />
      <Hero />
      <BrowseRange categories={categories} />
      <HowItWorksSection />
      <WhyUs />
      <OurGallery images={galleryImages} />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Home
