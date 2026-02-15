import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

function ContactSection() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    subject: '',
    question: '',
    agreeToPrivacy: false
  })
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setAttachedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', `${formData.firstName} ${formData.lastName}`)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('zipCode', formData.zipCode)
      formDataToSend.append('subject', formData.subject)
      formDataToSend.append('message', formData.question)

      // Append all files
      attachedFiles.forEach((file) => {
        formDataToSend.append(`attachments`, file)
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        await response.json()
        // Navigate to success page
        navigate('/form-success', { state: { formType: 'contact' } })
      } else {
        const errorData = await response.json().catch(() => ({}))
        // Navigate to error page
        navigate('/form-error', {
          state: {
            formType: 'contact',
            errorMessage: errorData.error || 'Failed to send message. Please try again.'
          }
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Navigate to error page
      navigate('/form-error', {
        state: {
          formType: 'contact',
          errorMessage: 'Network error. Please check your connection and try again.'
        }
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <section
      className="py-10 md:py-20 px-5 md:px-20 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/assets/contact/contact_background.jpg')`
      }}
    >
      <div className="max-w-container mx-auto flex justify-center">
        <div className="w-full bg-white rounded-lg shadow-lg p-8 md:p-10 relative" style={{ maxWidth: '946px' }}>
          {/* Logo in top right corner */}
          <div className="absolute top-6 right-6 md:top-8 md:right-12">
            <Logo mainTextSize="text-2xl md:text-3xl" subTextSize="text-[10px] md:text-[13px]" />
          </div>
          <div className="text-left mb-8 pr-32 md:pr-40">
            <h2 className="text-2xl md:text-3xl font-bold text-brown mb-3 mt-20" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
              Contact Form
            </h2>
            <p className="text-base md:text-lg text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Have a question? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* First Name and Last Name on same line */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                  required
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                  required
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                required
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>

            {/* Phone Number and ZIP Code on same line */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>

              {/* ZIP Code */}
              <div>
                <label htmlFor="zipCode" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  ZIP Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter your ZIP code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary"
                  required
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div>
              <label htmlFor="subject" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Subject<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
                  required
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="quote">Request a Quote</option>
                  <option value="consultation">Schedule Consultation</option>
                  <option value="product">Product Information</option>
                  <option value="installation">Installation Question</option>
                  <option value="support">Customer Support</option>
                  <option value="warranty">Warranty Service Request</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4L6 8L10 4" stroke="#5c4717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Your Question */}
            <div>
              <label htmlFor="question" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Your Question<span className="text-red-500">*</span>
              </label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Please describe your question or issue in detail..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary resize-y"
                required
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>

            {/* File Attachments */}
            <div>
              <label htmlFor="attachments" className="block text-base font-medium text-brown mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Attach Files (Optional)
              </label>
              <input
                type="file"
                id="attachments"
                name="attachments"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base text-brown bg-white focus:outline-none focus:border-primary file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90 file:cursor-pointer cursor-pointer"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              <p className="text-sm text-gray-600 mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Accepted formats: Images (JPG, PNG, GIF, WEBP), Documents (PDF, DOC, DOCX, TXT, XLS, XLSX)
              </p>

              {/* Display selected files */}
              {attachedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Selected Files ({attachedFiles.length}):
                  </p>
                  <div className="space-y-2">
                    {attachedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#5c4717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="#5c4717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm text-brown truncate" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0"
                          aria-label="Remove file"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeToPrivacy"
                name="agreeToPrivacy"
                checked={formData.agreeToPrivacy}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                required
              />
              <label htmlFor="agreeToPrivacy" className="text-sm text-gray-700 cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                I agree to receive email communications and understand my information will be handled according to the privacy policy.
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-primary text-white text-lg font-semibold hover:bg-opacity-90 transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
