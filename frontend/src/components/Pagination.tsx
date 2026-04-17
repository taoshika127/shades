interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="py-10 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto flex justify-center items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 min-w-[48px] text-base font-medium transition-colors uppercase ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'bg-light-beige text-brown hover:bg-primary hover:text-white'
            }`}
            style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 text-base font-medium bg-light-beige text-brown hover:bg-primary hover:text-white transition-colors uppercase"
            style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination

