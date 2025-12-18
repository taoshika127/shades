function ContactBanner() {
  return (
    <section className="relative w-full h-[316px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1440&h=400&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="mb-4">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <path d="M30 5L36.135 21.39L54 24.27L40.5 36.36L43.77 54.54L30 44.655L16.23 54.54L19.5 36.36L6 24.27L23.865 21.39L30 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-brown mb-4">Contact</h1>
        <nav className="text-base text-light-gray">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </nav>
      </div>
    </section>
  )
}

export default ContactBanner

