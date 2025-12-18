interface FilterBarProps {
  showing: string
  total: number
  itemsPerPage: number
  setItemsPerPage: (value: number) => void
  sortBy: string
  setSortBy: (value: string) => void
  gridView: 'small' | 'large'
  setGridView: (view: 'small' | 'large') => void
  showFilter: boolean
  setShowFilter: (show: boolean) => void
}

function FilterBar({
  showing,
  total,
  itemsPerPage,
  setItemsPerPage,
  sortBy,
  setSortBy,
  gridView,
  setGridView,
  showFilter,
  setShowFilter,
}: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-100 py-6 px-5 md:px-20">
      <div className="max-w-container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5H17.5M5 10H15M7.5 15H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-base text-brown">Filter</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGridView('small')}
              className={`p-2 rounded ${gridView === 'small' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Small grid view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="12" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="2" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="12" y="12" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            <button
              onClick={() => setGridView('large')}
              className={`p-2 rounded ${gridView === 'large' ? 'bg-gray-200' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Large grid view"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
          <span className="text-base text-light-gray">
            Showing {showing} of {total} results
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base text-light-gray">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded text-base text-brown bg-white focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base text-light-gray">Short by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-base text-brown bg-white focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar

