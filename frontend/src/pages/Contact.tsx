import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="contact-page">
      <Header />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default Contact

