function FeatureHighlights() {
  const features = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 5L23.09 14.26L33 16.18L25 23.24L26.18 33.36L20 29.77L13.82 33.36L15 23.24L7 16.18L16.91 14.26L20 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'High Quality',
      description: 'crafted from top materials',
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 20L15 20M15 20L21 14M15 20L21 26M7 20C7 27.732 13.268 34 21 34C28.732 34 35 27.732 35 20C35 12.268 28.732 6 21 6C13.268 6 7 12.268 7 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Warranty Protection',
      description: 'Over 2 years',
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 20H35M35 20L28 13M35 20L28 27M35 20L30 20M5 20L10 20M5 20C5 15.5817 8.58172 12 13 12H15M5 20C5 24.4183 8.58172 28 13 28H27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Free Shipping',
      description: 'Order over 150 $',
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26M20 10C24.4183 10 28 13.5817 28 18C28 22.4183 24.4183 26 20 26M20 10V6M20 26V30M12 18H6M28 18H34M20 26C16.6863 26 14 28.6863 14 32H26C26 28.6863 23.3137 26 20 26Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: '24/7 Support',
      description: 'Dedicated support',
    },
  ]

  return (
    <section className="py-10 md:py-20 px-5 md:px-20 bg-gray-50">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              <div className="text-primary">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brown mb-2">{feature.title}</h3>
                <p className="text-base text-light-gray">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureHighlights

