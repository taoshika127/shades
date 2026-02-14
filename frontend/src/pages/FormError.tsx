import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

function FormError() {
  const navigate = useNavigate()
  const location = useLocation()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get form type from location state or URL
  const formType = location.state?.formType || 'form'
  const errorMessage = location.state?.errorMessage || 'An unexpected error occurred. Please try again.'

  const getFormTitle = () => {
    switch (formType) {
      case 'contact':
        return 'Contact Form Submission Failed'
      case 'consultation':
        return 'Consultation Request Failed'
      case 'quote':
        return 'Quote Request Failed'
      default:
        return 'Submission Failed'
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
    <div className="form-error-page min-h-screen">
      <Header />
      <section
        className="py-10 md:py-20 px-5 md:px-20 relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center"
        style={{
          backgroundImage: `url('/assets/contact/contact_background.jpg')`
        }}
      >
        <div className="max-w-container mx-auto flex justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg p-8 md:p-12 relative" style={{ maxWidth: '946px' }}>
            {/* Logo in top right corner */}
            <div className="absolute top-6 right-6 md:top-8 md:right-12">
              <Logo mainTextSize="text-2xl md:text-3xl" subTextSize="text-[10px] md:text-[13px]" />
            </div>

            <div className="text-center mt-20 md:mt-12">
              {/* Error Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
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

              {/* Error Message */}
              <p
                className="text-base md:text-lg text-red-600 mb-2 max-w-2xl mx-auto"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {errorMessage}
              </p>

              <p
                className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl mx-auto"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Please check your connection and try again. If the problem persists, please contact us directly.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate(getReturnPath())}
                  className="px-8 py-3 bg-primary text-white text-lg font-semibold hover:bg-opacity-90 transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3 bg-white text-primary border-2 border-primary text-lg font-semibold hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Contact Us Directly
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-gray-200 text-gray-700 text-lg font-semibold hover:bg-gray-300 transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Return to Home
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

export default FormError

