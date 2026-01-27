import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { HiMiniWrenchScrewdriver } from 'react-icons/hi2'

interface Window {
  id: number
  roomName: string
  windowName: string
  width: string
  height: string
  shadeType: string
  motorized: string
}

function Quote() {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    projectTimeline: '',
    zipcode: '',
    serviceOption: ''
  })

  const [windows, setWindows] = useState<Window[]>([
    { id: 1, roomName: '', windowName: '', width: '', height: '', shadeType: '', motorized: '' }
  ])
  const [zipcodeInServiceArea, setZipcodeInServiceArea] = useState<boolean | null>(null)
  const [checkingZipcode, setCheckingZipcode] = useState(false)

  const shadeTypes = [
    'Zebra Shades',
    'Honeycomb Shades',
    'Roller Shades',
    'Shangri-La Shades',
    'Roman Shades',
    'Bamboo Shades',
    'Draperies',
    'Outdoor Shades',
    'Dream Shades'
  ]

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ]


  const checkZipcode = async (zipcode: string) => {
    if (!zipcode || zipcode.trim() === '') {
      setZipcodeInServiceArea(null)
      return
    }

    setCheckingZipcode(true)
    try {
      const response = await fetch(`/api/check-zipcode/${zipcode.trim()}`)
      const data = await response.json()
      setZipcodeInServiceArea(data.inServiceArea)
    } catch (error) {
      console.error('Error checking zipcode:', error)
      setZipcodeInServiceArea(null)
    } finally {
      setCheckingZipcode(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Check zipcode when it changes
    if (name === 'zipcode') {
      checkZipcode(value)
    }
  }

  const handleWindowChange = (id: number, field: keyof Window, value: string) => {
    setWindows(prev =>
      prev.map(window =>
        window.id === id ? { ...window, [field]: value } : window
      )
    )
  }

  const addWindow = () => {
    const newId = Math.max(...windows.map(w => w.id), 0) + 1
    setWindows(prev => [
      ...prev,
      { id: newId, roomName: '', windowName: '', width: '', height: '', shadeType: '', motorized: '' }
    ])
  }

  const removeWindow = (id: number) => {
    if (windows.length > 1) {
      setWindows(prev => prev.filter(window => window.id !== id))
    }
  }

  // Check zipcode when service option changes to Full Service
  useEffect(() => {
    if (formData.serviceOption === 'Full Service' && formData.zipcode) {
      checkZipcode(formData.zipcode)
    } else if (formData.serviceOption !== 'Full Service') {
      setZipcodeInServiceArea(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.serviceOption, formData.zipcode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', { formData, windows })
    // You can add API call here to submit the quote
  }

  const showZipcodeError = formData.serviceOption === 'Full Service' && zipcodeInServiceArea === false

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-10 md:py-20 px-5 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-medium-gray mb-3" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Get Your Free Quote
              </h1>
              <p className="text-base md:text-lg text-medium-gray" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Add your window measurements and preferences to receive an instant estimate.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Customer Information Section */}
              <div className="mb-[80px]">
                <div className="flex items-center gap-3 mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h2 className="text-xl md:text-2xl font-bold text-medium-gray" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Project Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label htmlFor="zipcode" className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Zipcode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      placeholder="Enter your zipcode"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                        showZipcodeError
                          ? 'border-red-500 text-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-primary'
                      }`}
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                      required
                    />
                    {showZipcodeError && (
                      <p className="mt-2 text-sm text-red-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        We don't currently offer full-service installation in your area. However, you can still choose our <b>DIY option </b> and we'll ship your shades along with <b>detailed installation guidance!</b>
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="projectTimeline" className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      How soon do you need the project to be done?
                    </label>
                    <select
                      id="projectTimeline"
                      name="projectTimeline"
                      value={formData.projectTimeline}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white ${
                        !formData.projectTimeline ? 'text-light-gray' : 'text-medium-gray'
                      }`}
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      <option value="">Select Timeline</option>
                      <option value="within a month">Within a month</option>
                      <option value="2 ~ 3 months">2 ~ 3 months</option>
                      <option value="I am flexible">I am flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Option Section */}
              <div className="mb-[80px]">
                <div className="flex items-end gap-3 mb-6">
                  <HiMiniWrenchScrewdriver className="text-primary text-2xl mb-1" />
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-medium-gray" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Service Option <span className="text-red-500">*</span></h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.serviceOption === 'Full Service'
                      ? 'border-primary bg-primary bg-opacity-5'
                      : 'border-gray-300 bg-white hover:border-primary hover:border-opacity-50'
                  }`}>
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="serviceOption"
                        value="Full Service"
                        checked={formData.serviceOption === 'Full Service'}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-primary focus:ring-primary"
                        required
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Full Service</h3>
                        <p className="text-sm text-medium-gray leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Complete end-to-end service with professional installation and support. We handle everything from start to finish.
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className={`relative flex flex-col p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.serviceOption === 'DIY'
                      ? 'border-primary bg-primary bg-opacity-5'
                      : 'border-gray-300 bg-white hover:border-primary hover:border-opacity-50'
                  }`}>
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="serviceOption"
                        value="DIY"
                        checked={formData.serviceOption === 'DIY'}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-primary focus:ring-primary"
                        required
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>DIY (Do It Yourself)</h3>
                        <p className="text-sm text-medium-gray leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Get the materials and guidance you need to complete the project yourself. Perfect for hands-on individuals looking to save on costs.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Window Measurements Section */}
              <div className="mb-[80px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M3 3H21M3 7H21M3 11H21M3 15H21M3 19H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <h2 className="text-xl md:text-2xl font-bold text-medium-gray" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Window Measurements</h2>
                  </div>
                  <button
                    type="button"
                    onClick={addWindow}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-primary border-2 border-primary rounded-[5px] font-semibold text-xs md:text-sm hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 uppercase"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Window
                  </button>
                </div>

                {windows.map((window, index) => (
                  <div key={window.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-medium-gray" style={{ fontFamily: 'Montserrat, sans-serif' }}>Window {index + 1}</h3>
                      {windows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWindow(window.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium uppercase"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Room Name
                        </label>
                        <input
                          type="text"
                          value={window.roomName}
                          onChange={(e) => handleWindowChange(window.id, 'roomName', e.target.value)}
                          placeholder="e.g., Living Room"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Window Name
                        </label>
                        <input
                          type="text"
                          value={window.windowName}
                          onChange={(e) => handleWindowChange(window.id, 'windowName', e.target.value)}
                          placeholder="e.g., Front Window"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Width (inches) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={window.width}
                          onChange={(e) => handleWindowChange(window.id, 'width', e.target.value)}
                          placeholder="Enter width"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Height (inches) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={window.height}
                          onChange={(e) => handleWindowChange(window.id, 'height', e.target.value)}
                          placeholder="Enter height"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Shade Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={window.shadeType}
                          onChange={(e) => handleWindowChange(window.id, 'shadeType', e.target.value)}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white ${
                            !window.shadeType ? 'text-light-gray' : 'text-medium-gray'
                          }`}
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                          required
                        >
                          <option value="">Select Type</option>
                          {shadeTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-medium-gray mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Motorized <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={window.motorized}
                          onChange={(e) => handleWindowChange(window.id, 'motorized', e.target.value)}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white ${
                            !window.motorized ? 'text-light-gray' : 'text-medium-gray'
                          }`}
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                          required
                        >
                          <option value="">Select Option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4">
                <button
                  type="submit"
                  className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-[#9a7828] transition-colors flex items-center gap-2 uppercase"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Get My Quote
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="text-sm text-medium-gray" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Free estimate • No obligation • Quick response
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

export default Quote

