import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function FormSuccess() {
  const navigate = useNavigate()
  const location = useLocation()

  // Get form type from location state or URL
  const formType = location.state?.formType || 'form'

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Meta Pixel: track Lead when user lands on success page (contact, consultation, or quote submitted)
  useEffect(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void }
    if (w.fbq) w.fbq('track', 'Lead', { content_name: formType })
  }, [formType])

  const getFormTitle = () => {
    switch (formType) {
      case 'contact':
        return 'Contact Form Submitted!'
      case 'consultation':
        return 'Consultation Request Submitted!'
      case 'quote':
        return 'Quote Request Submitted!'
      default:
        return 'Form Submitted Successfully!'
    }
  }

  const getFormMessage = () => {
    switch (formType) {
      case 'contact':
        return "Thank you for contacting us! We've received your message and will get back to you as soon as possible."
      case 'consultation':
        return "Thank you for scheduling a consultation! We'll contact you soon to confirm your appointment and discuss your needs."
      case 'quote':
        return "Thank you for your quote request! We'll review your information and send you a detailed quote shortly."
      default:
        return "Thank you! We've received your submission and will get back to you soon."
    }
  }

  const getReturnPath = () => {
    switch (formType) {
      case 'contact':
        return '/contact'
      case 'consultation':
        return '/contact/schedule-consultation'
      case 'quote':
        return '/quote'
      default:
        return '/'
    }
  }

  return (
    <div className="form-success-page min-h-screen">
      <Header />
      <section
        className="py-10 md:py-20 px-5 md:px-20 relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center"
        style={{
          backgroundImage: `url('/assets/contact/contact_background.jpg')`
        }}
      >
        <div className="max-w-container mx-auto flex justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg p-8 md:p-12 relative" style={{ maxWidth: '946px' }}>
            <div className="text-center">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl font-bold text-brown mb-4"
                style={{ fontFamily: 'Fjalla One, sans-serif' }}
              >
                {getFormTitle()}
              </h1>

              {/* Message */}
              <p
                className="text-base md:text-lg text-brown mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {getFormMessage()}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-primary text-white text-lg font-semibold hover:bg-opacity-90 transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Return to Home
                </button>
                <button
                  onClick={() => navigate(getReturnPath())}
                  className="px-8 py-3 bg-white text-primary border-2 border-primary text-lg font-semibold hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Submit Another {formType === 'contact' ? 'Form' : formType === 'consultation' ? 'Request' : 'Quote'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default FormSuccess

