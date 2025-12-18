import { useState } from 'react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  discount?: number
  image: string
  badge?: 'sale' | 'new'
}

interface OurProductsProps {
  products: Product[]
}

function OurProducts({ products }: OurProductsProps) {
  const [visibleProducts, setVisibleProducts] = useState(8)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 1000)
  }

  const displayProducts = products.slice(0, visibleProducts)

  return (
    <section className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
          {displayProducts.map((product) => (
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
        {visibleProducts < products.length && (
          <div className="flex justify-center">
            <button
              className="px-12 py-3 bg-white border border-primary text-primary text-base font-semibold rounded cursor-pointer hover:bg-primary hover:text-white transition-all"
              onClick={() => setVisibleProducts(products.length)}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default OurProducts
