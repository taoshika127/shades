import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-10 md:py-16 px-5 md:px-20 bg-secondary">
        <div className="max-w-container mx-auto">
          <header className="mb-8 md:mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-brown mb-3" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
              Privacy Policy — Pacific Light Shades LLC
            </h1>
            <p className="text-base md:text-lg text-primary m-0" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
              Last Updated: <span className="font-[500]">April 15, 2026</span>
            </p>
          </header>

          <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-10">
            <div className="space-y-7 text-brown" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>1. Introduction</h2>
                <p className="m-0 leading-relaxed">
                  Pacific Light Shades LLC (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information.
                  This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or contact us.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>2. Information We Collect</h2>
                <p className="m-0 leading-relaxed mb-3">
                  We may collect the following types of information:
                </p>

                <h3 className="text-base md:text-lg font-semibold mb-2" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>Personal Information</h3>
                <p className="m-0 leading-relaxed mb-2">When you submit a form or contact us, we may collect:</p>
                <ul className="list-disc pl-6 m-0 space-y-1 leading-relaxed">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Address or project location (if provided)</li>
                </ul>

                <h3 className="text-base md:text-lg font-semibold mt-5 mb-2" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>Usage Data</h3>
                <p className="m-0 leading-relaxed mb-2">
                  We may automatically collect certain information when you visit our website, such as:
                </p>
                <ul className="list-disc pl-6 m-0 space-y-1 leading-relaxed">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>3. How We Use Your Information</h2>
                <p className="m-0 leading-relaxed mb-2">We use your information to:</p>
                <ul className="list-disc pl-6 m-0 space-y-1 leading-relaxed">
                  <li>Respond to inquiries and provide quotes</li>
                  <li>Schedule consultations and services</li>
                  <li>Communicate with you about your project</li>
                  <li>Improve our website and services</li>
                  <li>Support our marketing and advertising efforts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>4. Cookies &amp; Tracking Technologies</h2>
                <p className="m-0 leading-relaxed mb-3">
                  We may use cookies and similar technologies to enhance your experience and understand how visitors interact with our website.
                </p>
                <p className="m-0 leading-relaxed mb-2">We use tools such as:</p>
                <ul className="list-disc pl-6 m-0 space-y-1 leading-relaxed">
                  <li>Meta Pixel (for advertising and remarketing)</li>
                  <li>Vercel Analytics (for website performance and usage insights)</li>
                </ul>
                <p className="m-0 leading-relaxed mt-3">
                  These tools may collect information about your activity on our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>5. How We Share Your Information</h2>
                <p className="m-0 leading-relaxed mb-3">We do not sell your personal information.</p>
                <p className="m-0 leading-relaxed mb-2">
                  We may share your information with trusted third-party service providers only when necessary to operate our business, including:
                </p>
                <ul className="list-disc pl-6 m-0 space-y-1 leading-relaxed">
                  <li>Email communication services (e.g., Resend)</li>
                  <li>Analytics and advertising platforms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>6. Payments</h2>
                <p className="m-0 leading-relaxed mb-2">
                  Payments for our services are handled offline and may include:
                </p>
                <ul className="list-disc pl-6 m-0 space-y-1 leading-relaxed">
                  <li>Bank transfer (e.g., Zelle)</li>
                  <li>Check</li>
                </ul>
                <p className="m-0 leading-relaxed mt-3">
                  We do not process payments directly through our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>7. Data Security</h2>
                <p className="m-0 leading-relaxed">
                  We take reasonable measures to protect your personal information. However, no method of transmission over the internet is completely secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>8. Your Privacy Rights (California Residents)</h2>
                <p className="m-0 leading-relaxed mb-2">If you are a California resident, you have the right to:</p>
                <ul className="list-disc pl-6 m-0 space-y-1 leading-relaxed">
                  <li>Request access to the personal information we collect about you</li>
                  <li>Request deletion of your personal information</li>
                  <li>Know how your data is used</li>
                </ul>
                <p className="m-0 leading-relaxed mt-3">
                  To make a request, please contact us using the information below.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>9. Children’s Privacy</h2>
                <p className="m-0 leading-relaxed">
                  Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>10. Third-Party Links</h2>
                <p className="m-0 leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for their privacy practices.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>11. Changes to This Privacy Policy</h2>
                <p className="m-0 leading-relaxed">
                  We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>12. Contact Us</h2>
                <p className="m-0 leading-relaxed mb-3">
                  If you have any questions about this Privacy Policy, you may contact us:
                </p>
                <div className="space-y-2">
                  <p className="m-0 leading-relaxed font-semibold">Pacific Light Shades LLC</p>
                  <p className="m-0 leading-relaxed">
                    <span className="font-semibold">Email:</span>{' '}
                    <a href="mailto:becky@pacificlightshades.com" className="text-primary hover:underline">
                      becky@pacificlightshades.com
                    </a>
                  </p>
                  <p className="m-0 leading-relaxed">
                    <span className="font-semibold">Website:</span>{' '}
                    <a href="/contact" className="text-primary hover:underline">
                      https://www.pacificlightshades.com/contact
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy

