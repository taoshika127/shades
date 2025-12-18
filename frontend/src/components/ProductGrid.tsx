interface Product {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  image: string
  badge?: 'sale' | 'new'
}

interface ProductGridProps {
  products: Product[]
  view: 'small' | 'large'
}

function ProductGrid({ products, view }: ProductGridProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000)
  }

  const gridCols = view === 'small' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <div className={`grid ${gridCols} gap-6`}>
          {products.map((product) => (
            <div key={product.id} className="flex flex-col bg-bg-gray rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all">
              <div className="relative w-full h-[250px] md:h-[301px] overflow-hidden bg-bg-gray">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                {product.badge && (
                  <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-base font-medium text-white ${
                    product.badge === 'sale' ? 'bg-sale-red' : 'bg-new-green'
                  }`}>
                    {product.badge === 'sale' && product.discount
                      ? `-${product.discount}%`
                      : product.badge === 'new'
                      ? 'New'
                      : ''}
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-medium-gray m-0">{product.name}</h3>
                <p className="text-base text-gray-500 m-0">{product.description}</p>
                <div className="flex gap-4 items-center">
                  {product.discount ? (
                    <>
                      <span className="text-base text-gray-400 line-through">{formatPrice(product.price)}</span>
                      <span className="text-xl font-semibold text-medium-gray">
                        {formatPrice(product.price * (1 - product.discount / 100))}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-semibold text-medium-gray">{formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
