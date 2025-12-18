import { useState } from 'react'

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        alert(data.message || 'Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Information */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brown">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brown mb-2">Address</h3>
                <p className="text-base text-light-gray">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brown">
                  <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.4 21 0 11.6 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.48 5.24 0.12L5.64 3.64C5.72 4.24 5.24 4.76 4.64 4.88L3.12 5.16C4.48 8.04 7.96 11.52 10.84 12.88L11.12 11.36C11.24 10.76 11.76 10.28 12.36 10.36L15.88 10.76C16.48 10.84 17 11.32 17 11.92V14.92C17 15.52 16.52 16 15.92 16H13.92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brown mb-2">Phone</h3>
                <p className="text-base text-light-gray mb-1">
                  Mobile: +(84) 546-6789
                </p>
                <p className="text-base text-light-gray">
                  Hotline: +(84) 458-6789
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brown">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brown mb-2">Working Time</h3>
                <p className="text-base text-light-gray mb-1">
                  Monday-Friday: 9:00 - 22:00
                </p>
                <p className="text-base text-light-gray">
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-brown mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Abc"
                  className="w-full px-4 py-3 border border-gray-300 rounded text-base text-brown bg-white focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-brown mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Abc@def.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded text-base text-brown bg-white focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-base font-medium text-brown mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="This is an optional"
                  className="w-full px-4 py-3 border border-gray-300 rounded text-base text-brown bg-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium text-brown mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi! I'd like to ask about"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded text-base text-brown bg-white focus:outline-none focus:border-primary resize-none"
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-12 py-3 bg-primary text-white text-base font-semibold rounded hover:bg-[#9a7828] transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
