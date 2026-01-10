import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import BrowseRange from '../components/BrowseRange'
import HowItWorksSection from '../components/HowItWorksSection'
import WhyUs from '../components/WhyUs'
import OurGallery from '../components/OurGallery'
import RoomInspiration from '../components/RoomInspiration'
import SocialGallery from '../components/SocialGallery'
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

interface Inspiration {
  id: number
  title: string
  category: string
  image: string
}

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [inspirations, setInspirations] = useState<Inspiration[]>([])
  const [socialImages, setSocialImages] = useState<string[]>([])

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))

    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))

    // Fetch inspirations
    fetch('/api/inspirations')
      .then(res => res.json())
      .then(data => setInspirations(data))

    // Fetch social images
    fetch('/api/social-images')
      .then(res => res.json())
      .then(data => setSocialImages(data))
  }, [])

  useEffect(() => {
    // Handle hash navigation to scroll to sections
    const hash = window.location.hash
    if (hash === '#browse-the-range' || hash === '#how-it-works' || hash === '#why-us') {
      setTimeout(() => {
        const section = document.getElementById(hash.substring(1))
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100) // Small delay to ensure DOM is ready
    }
  }, [])

  return (
    <div className="home">
      <Header currentPage="home" />
      <Hero />
      <BrowseRange categories={categories} />
      <HowItWorksSection />
      <WhyUs />
      <OurGallery images={inspirations.map((insp, idx) => ({ id: insp.id, image: insp.image, alt: insp.title }))} />
      <RoomInspiration inspirations={inspirations} />
      <SocialGallery images={socialImages} />
      <Footer />
    </div>
  )
}

export default Home
