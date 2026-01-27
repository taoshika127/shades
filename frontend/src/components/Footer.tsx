import { useState } from 'react'
import Logo from './Logo'

function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        alert('Successfully subscribed to newsletter!')
        setEmail('')
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      alert('Failed to subscribe. Please try again.')
    }
  }

  return (
    <footer className="bg-light-beige border-t border-gray-100 py-10 md:py-20 px-5 md:px-20">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-8 md:gap-15 mb-10">
          <div className="flex flex-col gap-6">
            <div style={{ width: '191px' }}>
              <Logo />
            </div>
            <p className="text-base text-light-gray leading-relaxed m-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Contact us for any questions or inquiries.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-medium text-light-gray m-0 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Navigation</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              <li><a href="/" className="text-brown no-underline text-base hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Home</a></li>
              <li><a href="/#our-gallery" className="text-brown no-underline text-base hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Gallery</a></li>
              <li><a href="/#how-it-works" className="text-brown no-underline text-base hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Service</a></li>
              <li><a href="/#why-us" className="text-brown no-underline text-base hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Why Us</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-medium text-light-gray m-0 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Pages</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-4">
              <li><a href="/contact" className="text-brown no-underline text-base hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Contact</a></li>
              <li><a href="/quote" className="text-brown no-underline text-base hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>Get Free Quote</a></li>
              <li><a href="/#faq" className="text-brown no-underline text-base hover:text-primary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>FAQ</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-base font-medium text-light-gray m-0 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Newsletter</h4>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 border border-light-gray rounded text-base text-brown bg-white placeholder:text-light-gray focus:outline-none focus:border-primary"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                required
              />
              <button type="submit" className="px-8 py-3 bg-white border border-brown text-brown text-base font-semibold rounded cursor-pointer hover:bg-brown hover:text-white transition-all w-full md:w-fit uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>SUBSCRIBE</button>
            </form>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-100">
          <p className="text-base text-light-gray m-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>2026 Pacific Light Shades & Blinds. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
