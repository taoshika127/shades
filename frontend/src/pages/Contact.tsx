import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactBanner from '../components/ContactBanner'
import GetInTouch from '../components/GetInTouch'
import ContactSection from '../components/ContactSection'
import FeatureHighlights from '../components/FeatureHighlights'

function Contact() {
  return (
    <div className="contact-page">
      <Header />
      <ContactBanner />
      <GetInTouch />
      <ContactSection />
      <FeatureHighlights />
      <Footer />
    </div>
  )
}

export default Contact

