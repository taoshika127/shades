import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'
import FeatureHighlights from '../components/FeatureHighlights'
import { slugToCategoryName } from '../utils/slug'

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

function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug?: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [sortBy, setSortBy] = useState('default')
  const [gridView, setGridView] = useState<'small' | 'large'>('small')
  const [showFilter, setShowFilter] = useState(false)
  const [pdfContainerRef, setPdfContainerRef] = useState<HTMLDivElement | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)

  // Get slug from params or extract from pathname
  const slug = categorySlug || location.pathname.replace(/^\/shades\//, '').replace(/^\//, '')

  // Get category name from slug
  const categoryName = slug ? slugToCategoryName(slug) : null
  const category = categories.find(cat => cat.name === categoryName)

  // Map category slugs to PDF filenames
  const categoryPdfMap: Record<string, string> = {
    'zebra-shades': 'Zebra shades fabric.pdf',
    'honeycomb-shades': 'Honeycomb Blinds fabric.pdf',
    'roller-shades': 'Roller Blinds fabric.pdf',
    'shangri-la-shades': 'Shangri-la shades fabric.pdf',
  }

  const pdfFilename = slug ? categoryPdfMap[slug] : null

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))

    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  // Load and render PDF using PDF.js
  useEffect(() => {
    if (pdfFilename && pdfContainerRef) {
      const loadPdf = async () => {
        setPdfLoading(true)
        try {
          // Wait for PDF.js to be available
          let pdfjsLib = window.pdfjsLib
          if (!pdfjsLib) {
            // Wait a bit for script to load
            await new Promise(resolve => setTimeout(resolve, 100))
            pdfjsLib = window.pdfjsLib
          }

          if (!pdfjsLib) {
            console.error('PDF.js not loaded, using fallback iframe')
            // Fallback to iframe
            if (pdfContainerRef) {
              const iframe = document.createElement('iframe')
              iframe.src = `/assets/pdfs/${pdfFilename}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
              iframe.title = `${categoryName} Fabric Catalog`
              iframe.style.cssText = 'width: 100%; height: 1500px; border: none; background: white;'
              iframe.setAttribute('scrolling', 'no')
              iframe.onload = () => setPdfLoading(false)
              pdfContainerRef.appendChild(iframe)
            }
            return
          }

          // Set worker source
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

          // Clear container
          pdfContainerRef.innerHTML = ''

          // Load the PDF
          const loadingTask = pdfjsLib.getDocument(`/assets/pdfs/${pdfFilename}`)
          const pdf = await loadingTask.promise

          // Get container width to calculate optimal scale
          const containerWidth = pdfContainerRef.offsetWidth || 1200

          // Get first page to calculate scale once (all pages usually same size)
          const firstPage = await pdf.getPage(1)
          const defaultViewport = firstPage.getViewport({ scale: 1.0 })

          // Calculate optimal scale - use 1.5-2x for good quality without being too slow
          // Limit max scale to avoid huge canvases
          const baseScale = containerWidth / defaultViewport.width
          const scale = Math.min(Math.max(1.5, baseScale * 1.5), 2.0) // Between 1.5x and 2.0x max

          // Set device pixel ratio (but cap it to avoid massive canvases)
          const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x

          // Render all pages - show them as they complete for better UX
          const renderPage = async (pageNum: number) => {
            const page = await pdf.getPage(pageNum)
            const viewport = page.getViewport({ scale })

            // Create canvas for this page
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d', { alpha: false })
            if (!context) return null

            // Set canvas size (scaled by device pixel ratio, but we capped it)
            canvas.width = Math.floor(viewport.width * devicePixelRatio)
            canvas.height = Math.floor(viewport.height * devicePixelRatio)

            // Scale the canvas context
            context.scale(devicePixelRatio, devicePixelRatio)

            // Set display size (CSS pixels)
            canvas.style.width = '100%'
            canvas.style.height = 'auto'
            canvas.style.display = 'block'
            canvas.style.backgroundColor = 'white'
            canvas.style.marginBottom = '0px'

            // Store page number for ordering
            canvas.setAttribute('data-page-num', pageNum.toString())

            // Render page
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
              backgroundColor: '#FFFFFF'
            }
            await page.render(renderContext).promise

            return { canvas, pageNum }
          }

          // Render all pages in parallel and add them in order as they complete
          const pagePromises = Array.from({ length: pdf.numPages }, (_, i) => renderPage(i + 1))
          const results = await Promise.all(pagePromises)

          // Add canvases to container in correct order
          results.forEach(result => {
            if (result?.canvas && pdfContainerRef) {
              pdfContainerRef.appendChild(result.canvas)
            }
          })

          setPdfLoading(false)
        } catch (error) {
          console.error('Error loading PDF:', error)
          setPdfLoading(false)
          // Fallback to iframe if PDF.js fails
          if (pdfContainerRef) {
            const iframe = document.createElement('iframe')
            iframe.src = `/assets/pdfs/${pdfFilename}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`
            iframe.title = `${categoryName} Fabric Catalog`
            iframe.style.cssText = 'width: 100%; height: 1500px; border: none; background: white;'
            iframe.setAttribute('scrolling', 'no')
            iframe.onload = () => setPdfLoading(false)
            pdfContainerRef.appendChild(iframe)
          }
        }
      }

      loadPdf()
    }
  }, [pdfFilename, pdfContainerRef, categoryName])

  // Filter products by category (for now, we'll show all products since products don't have category association)
  // In a real app, you'd filter by category
  const filteredProducts = useMemo(() => {
    // TODO: Filter products by category when product-category relationship is implemented
    // For now, return all products
    return products
  }, [products, categoryName])

  // Sort products based on sortBy
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  // Calculate pagination
  const totalProducts = sortedProducts.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedProducts = sortedProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset to page 1 when itemsPerPage or sortBy changes
  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage, sortBy])

  // Redirect if category not found
  useEffect(() => {
    if (slug && categories.length > 0 && !category) {
      navigate('/shades', { replace: true })
    }
  }, [slug, categories, category, navigate])

  if (!categoryName || !category) {
    return (
      <div className="category-page">
        <Header currentPage="shades" />
        <div className="py-20 px-5 md:px-20 bg-white text-center">
          <h1 className="text-3xl font-bold text-brown mb-4">Category not found</h1>
          <button
            onClick={() => navigate('/shades')}
            className="px-6 py-3 bg-brown text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Back to Shades
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="category-page">
      <Header currentPage="shades" />

      {/* Category Banner
      <section className="relative w-full h-[316px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110"
          style={{
            backgroundImage: `url('${category.image}')`
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{category.name}</h1>
          <nav className="text-base text-white/90">
            <button onClick={() => navigate('/')} className="hover:underline">Home</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/shades')} className="hover:underline">Shades</button>
            <span className="mx-2">/</span>
            <span>{category.name}</span>
          </nav>
        </div>
      </section> */}

      {/* PDF Embed Section - Show if PDF exists for this category */}
      {pdfFilename && (
        <div
          className="bg-[#F5F5F5] w-full py-[10px] px-[200px] md:px-[250px] lg:px-[300px]"
        >
          {/* Loading Spinner */}
          {pdfLoading && (
            <div
              className="flex flex-col items-center justify-center py-20"
              style={{ minHeight: '400px' }}
            >
              <div className="relative w-16 h-16 mb-4">
                <div
                  className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"
                />
                <div
                  className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"
                />
              </div>
              <p className="text-brown text-lg font-medium">Loading PDF...</p>
            </div>
          )}
          <div
            ref={setPdfContainerRef}
            className="bg-white"
            style={{
              backgroundColor: 'white',
              width: '100%',
              display: pdfLoading ? 'none' : 'block'
            }}
          />
        </div>
      )}
      <Footer />
    </div>
  )
}

export default CategoryPage

