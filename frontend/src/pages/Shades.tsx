import { useEffect, useState, useMemo } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ShadesBanner from '../components/ShadesBanner'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import Pagination from '../components/Pagination'
import FeatureHighlights from '../components/FeatureHighlights'

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  image: string
  badge?: 'sale' | 'new'
}

function Shades() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [sortBy, setSortBy] = useState('default')
  const [gridView, setGridView] = useState<'small' | 'large'>('small')
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  // Sort products based on sortBy
  const sortedProducts = useMemo(() => {
    const sorted = [...products]
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
  }, [products, sortBy])

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

  return (
    <div className="shades-page">
      <Header currentPage="shades" />
      <ShadesBanner />
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

export default Shades
