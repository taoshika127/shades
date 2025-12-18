import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
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
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [sortBy, setSortBy] = useState('default')
  const [gridView, setGridView] = useState<'small' | 'large'>('small')
  const [showFilter, setShowFilter] = useState(false)

  // Get category name from slug
  const categoryName = categorySlug ? slugToCategoryName(categorySlug) : null
  const category = categories.find(cat => cat.name === categoryName)

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
    if (categorySlug && categories.length > 0 && !category) {
      navigate('/shades', { replace: true })
    }
  }, [categorySlug, categories, category, navigate])

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

      {/* Category Banner */}
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
      </section>

      <FilterBar
        showing={`${startIndex + 1}-${Math.min(endIndex, totalProducts)}`}
        total={totalProducts}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        gridView={gridView}
        setGridView={setGridView}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      <ProductGrid products={displayedProducts} view={gridView} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <FeatureHighlights />
      <Footer />
    </div>
  )
}

export default CategoryPage

