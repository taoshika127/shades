import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    state: '',
    projectTimeline: '',
    zipcode: '',
    serviceOption: '',
    serviceType: '' as '' | 'full-service' | 'measurements-ready',
    numberOfWindows: '' as '' | '1-3' | '4-7' | '8+',
    shadeInterest: [] as string[],
    spaceNotes: ''
  })

  const [windows, setWindows] = useState<Window[]>([
    { id: 1, roomName: '', windowName: '', width: '', height: '', shadeType: '', motorized: '' }
  ])
  const [editingWindowId, setEditingWindowId] = useState<number | null>(null)
  const [editingWindowValue, setEditingWindowValue] = useState('')
  const [zipcodeInServiceArea, setZipcodeInServiceArea] = useState<boolean | null>(null)
  const [_checkingZipcode, setCheckingZipcode] = useState(false)

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

  // Reserved for future state selection feature
  // const usStates = [
  //   'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  //   'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  //   'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  //   'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  //   'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  //   'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  // ]


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep2Error('')

    // Step 2 required validation (notes and preferred timeline stay optional)
    if (zipcodeInServiceArea === true) {
      if (!formData.serviceType) {
        setStep2Error('Please choose a service type (Full-Service or I Have Measurements Ready).')
        return
      }
      if (formData.serviceType === 'full-service') {
        if (!formData.numberOfWindows) {
          setStep2Error('Please select how many windows need shades.')
          return
        }
        if (!formData.shadeInterest || formData.shadeInterest.length === 0) {
          setStep2Error('Please select at least one shade type or "Not Sure".')
          return
        }
      }
    }
    // Window measurements path: required attributes on inputs handle validation

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, windows }),
      })

      if (response.ok) {
        // Navigate to success page
        navigate('/form-success', { state: { formType: 'quote' } })
      } else {
        const errorData = await response.json().catch(() => ({}))
        // Navigate to error page
        navigate('/form-error', {
          state: {
            formType: 'quote',
            errorMessage: errorData.error || 'Failed to submit quote request. Please try again.'
          }
        })
      }
    } catch (error) {
      console.error('Error submitting quote form:', error)
      // Navigate to error page
      navigate('/form-error', {
        state: {
          formType: 'quote',
          errorMessage: 'Network error. Please check your connection and try again.'
        }
      })
    }
  }

  const showZipcodeError = formData.serviceOption === 'Full Service' && zipcodeInServiceArea === false

  const [currentStep, setCurrentStep] = useState(1)
  const [step2Error, setStep2Error] = useState('')

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate step 1 required fields before advancing
    if (formData.fullName.trim() && formData.email.trim() && formData.zipcode.trim()) {
      setCurrentStep(2)
    }
  }

  return (
    <div className="quote-page min-h-screen">
      <Header />
      <section
        className="py-10 md:py-20 px-5 md:px-20 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/contact/contact_background.jpg')`
        }}
      >
        <div className="max-w-container mx-auto">
          <div className="mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 relative" style={{ maxWidth: '1100px' }}>
            {currentStep === 1 && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-brown mb-3" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                    Get Fully Customizable Window Shades at Factory-Direct Pricing
                  </h1>
                  <h2 className="text-base md:text-lg text-brown mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    No obligation. Fast Response.
                  </h2>
                  <ul className="text-sm md:text-base text-brown mb-8 space-y-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <li className="flex items-center gap-2">✔ Up to 50% less than big box stores</li>
                    <li className="flex items-center gap-2">✔ Professional measurement available</li>
                    <li className="flex items-center gap-2">✔ Local installation support</li>
                    <li className="flex items-center gap-2">✔ Fast turnaround</li>
                  </ul>
                </div>

                <form id="quote-step1" onSubmit={handleStep1Continue} className="flex flex-col gap-8">
                  {/* Personal Information Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary flex-shrink-0">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h2 className="text-xl md:text-2xl font-bold text-brown" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Personal Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Information Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary flex-shrink-0">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <h2 className="text-xl md:text-2xl font-bold text-brown" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Project Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
                            We don't currently offer full-service installation in your area. You can choose our <b>Coordinated Installation Service</b> (we connect you with local installers) or our <b>DIY option</b> and we'll ship your shades with detailed installation guidance!
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="projectTimeline" className="block text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Preferred Installation Timeline
                        </label>
                        <select
                          id="projectTimeline"
                          name="projectTimeline"
                          value={formData.projectTimeline}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white ${
                            !formData.projectTimeline ? 'text-light-gray' : 'text-brown'
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
                </form>

                {/* Step 1 footer: step label centered, progress bar, then continue button centered below */}
                <div className="-mx-8 md:-mx-12 px-6 md:px-12 py-4 mt-8 flex flex-col gap-4 rounded-b-lg">
                  <p className="text-sm font-[500] text-brown m-0 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Step 1 of 2
                  </p>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-l-full bg-primary"
                      style={{
                        width: '50%',
                        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 6px)'
                      }}
                    />
                  </div>
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      form="quote-step1"
                      className="px-6 md:px-8 py-3 bg-primary text-white font-semibold text-sm hover:bg-opacity-90 transition-all duration-300 uppercase no-underline"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => { setCurrentStep(1); setStep2Error('') }}
                  className="text-primary font-medium mb-6 flex items-center gap-1 text-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  <span className="md:hidden">← Back</span>
                  <span className="hidden md:inline">← Back to Step 1</span>
                </button>

                <form id="quote-step2" onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {zipcodeInServiceArea === true && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-brown mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                        Choose Your Service Type <span className="text-red-500">*</span>
                      </h2>
                      <div className="flex flex-col gap-4">
                        <label className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.serviceType === 'full-service' ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}`}>
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="serviceType"
                              checked={formData.serviceType === 'full-service'}
                              onChange={() => setFormData(prev => ({ ...prev, serviceType: 'full-service' }))}
                              className="mt-1 w-5 h-5 text-primary"
                            />
                            <div>
                              <span className="font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>Full-Service (Recommended)</span>
                              <p className="text-sm text-brown mt-1 m-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>Professional measurement + installation included.</p>
                            </div>
                          </div>
                        </label>
                        <label className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.serviceType === 'measurements-ready' ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}`}>
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="serviceType"
                              checked={formData.serviceType === 'measurements-ready'}
                              onChange={() => setFormData(prev => ({ ...prev, serviceType: 'measurements-ready' }))}
                              className="mt-1 w-5 h-5 text-primary"
                            />
                            <div>
                              <span className="font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>I Have Measurements Ready</span>
                              <p className="text-sm text-brown mt-1 m-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>We'll build your shades to your exact specs.</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {zipcodeInServiceArea === true && formData.serviceType === 'full-service' && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-brown mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                        Tell Us About Your Space
                      </h2>
                      <div className="flex flex-col gap-6">
                        <div>
                          <p className="text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>How many windows need shades? <span className="text-red-500">*</span></p>
                          <div className="flex flex-wrap gap-2">
                            {(['1-3', '4-7', '8+'] as const).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, numberOfWindows: opt }))}
                                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${formData.numberOfWindows === opt ? 'border-primary bg-primary text-white' : 'border-gray-300 text-brown hover:border-primary/50'}`}
                                style={{ fontFamily: 'Montserrat, sans-serif' }}
                              >
                                {opt === '8+' ? '8+' : opt}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>What type of shades are you interested in? <span className="text-red-500">*</span></p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6">
                            {shadeTypes.map((type) => {
                              const isChecked = formData.shadeInterest.includes(type)
                              return (
                                <label
                                  key={type}
                                  className="inline-flex items-center gap-2 cursor-pointer text-brown text-sm"
                                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      setFormData(prev => ({
                                        ...prev,
                                        shadeInterest: isChecked
                                          ? prev.shadeInterest.filter(t => t !== type)
                                          : [...prev.shadeInterest.filter(t => t !== 'Not Sure'), type]
                                      }))
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                  {type}
                                </label>
                              )
                            })}
                            <label
                              className="inline-flex items-center gap-2 cursor-pointer text-brown text-sm"
                              style={{ fontFamily: 'Montserrat, sans-serif' }}
                            >
                              <input
                                type="checkbox"
                                checked={formData.shadeInterest.includes('Not Sure')}
                                onChange={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    shadeInterest: prev.shadeInterest.includes('Not Sure') ? [] : ['Not Sure']
                                  }))
                                }}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              Not Sure
                            </label>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="step2-timeline" className="block text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Preferred installation timeline (optional)</label>
                          <select
                            id="step2-timeline"
                            name="projectTimeline"
                            value={formData.projectTimeline}
                            onChange={handleInputChange}
                            className={`w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white ${!formData.projectTimeline ? 'text-gray-400' : 'text-brown'}`}
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            <option value="">Select timeline</option>
                            <option value="within a month">Within a month</option>
                            <option value="2 ~ 3 months">2 ~ 3 months</option>
                            <option value="I am flexible">I am flexible</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="spaceNotes" className="block text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Notes (optional)</label>
                          <textarea
                            id="spaceNotes"
                            name="spaceNotes"
                            value={formData.spaceNotes}
                            onChange={handleInputChange}
                            placeholder="Any other details about your project..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {(zipcodeInServiceArea !== true || formData.serviceType === 'measurements-ready') && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-brown mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>Window Measurements</h2>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-end order-last md:order-first">
                          <button
                            type="button"
                            onClick={addWindow}
                            className="px-4 py-2 border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                          >
                            + Add Window
                          </button>
                        </div>
                        {windows.map((win, index) => {
                          const displayName = win.windowName || win.roomName || `Window ${index + 1}`
                          const isEditing = editingWindowId === win.id
                          return (
                          <Fragment key={win.id}>
                            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                              <div className="flex justify-between items-center gap-2">
                                <div className="min-w-0 flex-1 flex items-center gap-2">
                                  {/* Desktop: static label. Mobile: editable name with pencil */}
                                  <span className="hidden md:inline font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>Window {index + 1}</span>
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={editingWindowValue}
                                      onChange={e => setEditingWindowValue(e.target.value)}
                                      onBlur={() => {
                                        handleWindowChange(win.id, 'windowName', editingWindowValue)
                                        setEditingWindowId(null)
                                        setEditingWindowValue('')
                                      }}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                          handleWindowChange(win.id, 'windowName', editingWindowValue)
                                          setEditingWindowId(null)
                                          setEditingWindowValue('')
                                        }
                                      }}
                                      placeholder="Window name"
                                      className="md:hidden flex-1 min-w-0 px-2 py-1 text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                                      autoFocus
                                    />
                                  ) : (
                                    <span className="md:hidden font-semibold text-brown truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>{displayName}</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  {!isEditing && (
                                    <button type="button" onClick={() => { setEditingWindowId(win.id); setEditingWindowValue(displayName) }} className="md:hidden p-1.5 text-gray-500 hover:text-primary rounded" aria-label="Edit name">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                    </button>
                                  )}
                                  {windows.length > 1 && (
                                    <button type="button" onClick={() => removeWindow(win.id)} className="text-red-500 hover:text-red-700 text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>Remove</button>
                                  )}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="hidden md:block">
                                  <label className="block text-sm font-medium text-brown mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Room Name</label>
                                  <input type="text" value={win.roomName} onChange={e => handleWindowChange(win.id, 'roomName', e.target.value)} placeholder="e.g. Living Room" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" style={{ fontFamily: 'Montserrat, sans-serif' }} />
                                </div>
                                <div className="hidden md:block">
                                  <label className="block text-sm font-medium text-brown mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Window Name</label>
                                  <input type="text" value={win.windowName} onChange={e => handleWindowChange(win.id, 'windowName', e.target.value)} placeholder="e.g. Front Window" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" style={{ fontFamily: 'Montserrat, sans-serif' }} />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-brown mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Width (in) <span className="text-red-500">*</span></label>
                                  <input type="number" value={win.width} onChange={e => handleWindowChange(win.id, 'width', e.target.value)} placeholder="Width" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" style={{ fontFamily: 'Montserrat, sans-serif' }} required />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-brown mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Height (in) <span className="text-red-500">*</span></label>
                                  <input type="number" value={win.height} onChange={e => handleWindowChange(win.id, 'height', e.target.value)} placeholder="Height" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" style={{ fontFamily: 'Montserrat, sans-serif' }} required />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-brown mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Shade Type <span className="text-red-500">*</span></label>
                                  <select value={win.shadeType} onChange={e => handleWindowChange(win.id, 'shadeType', e.target.value)} className="w-full px-4 py-2 text-base md:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }} required>
                                    <option value="">Select type</option>
                                    {shadeTypes.map(t => (<option key={t} value={t}>{t}</option>))}
                                  </select>
                                </div>
                                <div>
                                  <span className="block text-sm font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Motorized <span className="text-red-500">*</span></span>
                                  <div className="flex flex-wrap gap-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    <label className="flex items-center gap-2 cursor-pointer text-base md:text-sm text-brown">
                                      <input type="radio" name={`motorized-${win.id}`} value="Yes" checked={win.motorized === 'Yes'} onChange={e => handleWindowChange(win.id, 'motorized', e.target.value)} className="w-5 h-5 text-primary" required />
                                      Yes
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-base md:text-sm text-brown">
                                      <input type="radio" name={`motorized-${win.id}`} value="No" checked={win.motorized === 'No'} onChange={e => handleWindowChange(win.id, 'motorized', e.target.value)} className="w-5 h-5 text-primary" />
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </form>

                {step2Error && (
                  <p className="text-red-500 text-sm font-medium mt-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>{step2Error}</p>
                )}

                {(zipcodeInServiceArea !== true || formData.serviceType === 'measurements-ready') && windows.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-semibold text-brown mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Your windows</h3>
                    <ul className="space-y-2">
                      {windows.map((win, index) => {
                        const parts = [
                          win.roomName || win.windowName ? [win.roomName, win.windowName].filter(Boolean).join(' — ') : null,
                          win.width && win.height ? `${win.width}″ × ${win.height}″` : null,
                          win.shadeType || null,
                          win.motorized ? `Motorized: ${win.motorized}` : null
                        ].filter(Boolean)
                        return (
                          <li key={win.id} className="text-sm text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            <span className="font-medium">Window {index + 1}:</span>{' '}
                            {parts.length > 0 ? parts.join(' · ') : '—'}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* Step 2 footer */}
                <div className="-mx-8 md:-mx-12 px-6 md:px-12 py-4 mt-8 flex flex-col gap-4 rounded-b-lg">
                  <p className="text-sm font-[500] text-brown m-0 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>Step 2 of 2</p>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-full rounded-full bg-primary" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.12) 3px, rgba(255,255,255,0.12) 6px)' }} />
                  </div>
                  <div className="flex justify-center gap-4 pt-4">
                    <button type="button" onClick={() => { setCurrentStep(1); setStep2Error('') }} className="px-6 py-3 border-2 border-primary text-primary font-semibold text-sm uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}><span className="md:hidden">Back</span><span className="hidden md:inline">Back to Step 1</span></button>
                    <button type="submit" form="quote-step2" className="px-6 md:px-8 py-3 bg-primary text-white font-semibold text-sm hover:bg-opacity-90 transition-all duration-300 uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>Get My Quote</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Quote

