function ShadesBanner() {
  return (
    <section className="relative w-full h-[316px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1440&h=400&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-bold text-brown mb-4">Shades</h1>
        <nav className="text-base text-light-gray">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Shades</span>
        </nav>
      </div>
    </section>
  )
}

export default ShadesBanner

