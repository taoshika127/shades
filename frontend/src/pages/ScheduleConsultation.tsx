import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

function ScheduleConsultation() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceAddress: '',
    consultationType: '',
    preferredTime: [] as string[],
    lookingFor: [] as string[],
    installTimeline: '',
    numberOfWindows: [] as string[],
    budgetRange: '',
    additionalInfo: ''
  })
  const [zipcodeInServiceArea, setZipcodeInServiceArea] = useState<boolean | null>(null)
  const [_checkingZipcode, setCheckingZipcode] = useState(false)

  const checkZipcode = async (zipcode: string) => {
    if (!zipcode || zipcode.trim() === '') {
      setZipcodeInServiceArea(null)
      return
    }

    // Extract zipcode from service address (could be just zipcode or full address)
    // Try to extract 5-digit zipcode
    const zipcodeMatch = zipcode.match(/\b\d{5}\b/)
    const zipcodeToCheck = zipcodeMatch ? zipcodeMatch[0] : zipcode.trim()

    setCheckingZipcode(true)
    try {
      const response = await fetch(`/api/check-zipcode/${zipcodeToCheck}`)
      const data = await response.json()
      setZipcodeInServiceArea(data.inServiceArea)
    } catch (error) {
      console.error('Error checking zipcode:', error)
      setZipcodeInServiceArea(null)
    } finally {
      setCheckingZipcode(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (type === 'checkbox') {
      const checkboxName = name as 'preferredTime' | 'lookingFor' | 'numberOfWindows'
      setFormData(prev => ({
        ...prev,
        [checkboxName]: checked
          ? [...prev[checkboxName], value]
          : prev[checkboxName].filter(item => item !== value)
      }))
    } else if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))

      // Check zipcode when service address changes
      if (name === 'serviceAddress') {
        checkZipcode(value)
      }
    }
  }

  // Check zipcode when consultation type changes to In-Home
  useEffect(() => {
    if (formData.consultationType === 'In-Home' && formData.serviceAddress) {
      checkZipcode(formData.serviceAddress)
    } else if (formData.consultationType !== 'In-Home') {
      setZipcodeInServiceArea(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.consultationType, formData.serviceAddress])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (formData.numberOfWindows.length === 0) {
      alert('Please select at least one option for "How many windows are we talking about?"')
      return
    }

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Navigate to success page
        navigate('/form-success', { state: { formType: 'consultation' } })
      } else {
        const errorData = await response.json().catch(() => ({}))
        // Navigate to error page
        navigate('/form-error', {
          state: {
            formType: 'consultation',
            errorMessage: errorData.error || 'Failed to submit consultation request. Please try again.'
          }
        })
      }
    } catch (error) {
      console.error('Error submitting consultation form:', error)
      // Navigate to error page
      navigate('/form-error', {
        state: {
          formType: 'consultation',
          errorMessage: 'Network error. Please check your connection and try again.'
        }
      })
    }
  }

  return (
    <div className="schedule-consultation-page min-h-screen">
      <Header />
      <section
        className="py-10 md:py-20 px-5 md:px-20 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/contact/contact_background.jpg')`
        }}
      >
        <div className="max-w-container mx-auto">
          <div className="mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 relative" style={{ maxWidth: '1100px' }}>
            {/* Logo in top right corner */}
            <div className="absolute top-6 right-6 md:top-8 md:right-12">
              <Logo mainTextSize="text-2xl md:text-3xl" subTextSize="text-[10px] md:text-[13px]" />
            </div>
            {/* Header */}
            <div className="text-left mb-8 md:pr-40">
              <h1 className="text-2xl md:text-3xl font-bold text-brown mb-3 mt-20" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
            Schedule a Consultation
          </h1>
          <p className="text-base md:text-lg text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Let's find the perfect shades or blinds for your space. No obligation, just friendly expert advice.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Contact Information Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-brown mb-6" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mb-[10px]">
                    <label htmlFor="fullName" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Full Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                      required
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>

                  <div className="mb-[10px]">
                    <label htmlFor="email" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                      required
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>

                  <div className="mb-[10px]">
                    <label htmlFor="phone" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brown text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>+1</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                        required
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      />
                    </div>
                  </div>

                  <div className="mb-[10px]">
                    <label htmlFor="serviceAddress" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Service Address / Zip Code<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="serviceAddress"
                      name="serviceAddress"
                      value={formData.serviceAddress}
                      onChange={handleChange}
                      placeholder="Enter address or zip code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                      required
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Preferred Consultation Type and Preferred Time Window */}
                <div className="mt-[34px] grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Preferred Consultation Type */}
                  <div>
                    <label className="block text-base font-medium text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Preferred Consultation Type<span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          value="In-Home"
                          checked={formData.consultationType === 'In-Home'}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary focus:ring-primary"
                          style={{ accentColor: '#B88E2F' }}
                          required
                        />
                        <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>In-Home</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="consultationType"
                          value="Virtual"
                          checked={formData.consultationType === 'Virtual'}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary focus:ring-primary"
                          style={{ accentColor: '#B88E2F' }}
                          required
                        />
                        <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>Virtual</span>
                      </label>
                    </div>
                    {formData.consultationType === 'In-Home' && zipcodeInServiceArea === false && (
                      <p className="mt-3 text-sm text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        This is not our service area. Please select Virtual consultation, or choose our Coordinated Installation Service or DIY option when you get a quote.
                      </p>
                    )}
                  </div>

                {/* Preferred Time Window */}
                <div className="mt-[10px]">
                  <label className="block text-base font-medium text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Preferred Time Window
                  </label>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                        <>
                          <label key={`${day} Morning`} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="preferredTime"
                              value={`${day} Morning`}
                              checked={formData.preferredTime.includes(`${day} Morning`)}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                              style={{ accentColor: '#B88E2F' }}
                            />
                            <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {day} Morning
                            </span>
                          </label>
                          <label key={`${day} Afternoon`} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="preferredTime"
                              value={`${day} Afternoon`}
                              checked={formData.preferredTime.includes(`${day} Afternoon`)}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                              style={{ accentColor: '#B88E2F' }}
                            />
                            <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {day} Afternoon
                            </span>
                          </label>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-brown mb-6" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                  Project Details
                </h2>

                {/* What are you looking for? */}
                <div className="mb-[34px]">
                  <label className="block text-base font-medium text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    What are you looking for?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Roller shades', 'Zebra / dual shades', 'Cellular / honeycomb', 'Roman shades', 'Drapery', 'Not sure yet'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="lookingFor"
                          value={option}
                          checked={formData.lookingFor.includes(option)}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                          style={{ accentColor: '#B88E2F' }}
                        />
                        <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* When are you hoping to install? */}
                <div className="mb-[34px]">
                  <label className="block text-base font-medium text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    When are you hoping to install?<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['ASAP', '2-4 weeks', '1-2 months', 'Just exploring options'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="installTimeline"
                          value={option}
                          checked={formData.installTimeline === option}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary focus:ring-primary"
                          style={{ accentColor: '#B88E2F' }}
                          required
                        />
                        <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* How many windows? */}
                <div className="mb-[34px]">
                  <label className="block text-base font-medium text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    How many windows are we talking about?<span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['1-3', '4-8', '9-15', 'Whole home', 'Not sure'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="numberOfWindows"
                          value={option}
                          checked={formData.numberOfWindows.includes(option)}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                          style={{ accentColor: '#B88E2F' }}
                          required={formData.numberOfWindows.length === 0}
                        />
                        <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div className="mb-[34px]">
                  <label className="block text-base font-medium text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Do you have a budget range in mind?<span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['Under $500', '$500 - $1,500', '$1,500 - $3,000', '$3,000 - $6,000', '$6,000+', 'Not sure yet'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="budgetRange"
                          value={option}
                          checked={formData.budgetRange === option}
                          onChange={handleChange}
                          className="w-5 h-5 text-primary focus:ring-primary"
                          style={{ accentColor: '#B88E2F' }}
                          required
                        />
                        <span className="text-base text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-brown mb-6" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                  Additional Information
                </h2>
                <div>
                  <label htmlFor="additionalInfo" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Anything you'd like us to know before the consultation?
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Style preferences, inspiration photos, concerns, HOA rules, etc."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary resize-y"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 md:px-8 py-3 md:py-4 bg-primary text-white text-sm md:text-lg font-semibold hover:bg-opacity-90 transition-colors uppercase"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  SCHEDULE MY CONSULTATION
                </button>
                <p className="text-sm text-brown text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  No pressure. No obligation. Just expert advice tailored to your home.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ScheduleConsultation
