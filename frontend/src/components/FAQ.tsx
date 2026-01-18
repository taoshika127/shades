import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

function FAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  const faqs: FAQItem[] = [
    {
      question: "Why are your prices so much lower than big box stores?",
      answer: "We work directly with manufacturers and ship factory-direct, which allows us to eliminate brand premiums, dealer markups, and showroom overhead. Traditional retailers rely on multiple layers of distribution and physical showrooms, all of which add significant cost to the final price. <br />" +
      "By using a more efficient supply chain, we’re able to offer high-quality custom shades at prices that are typically 50% or less than big box stores, without cutting corners on materials or craftsmanship."
    },
    {
      question: "Does a lower price mean lower quality?",
      answer: 'Absolutely not! Our shades are made using high-quality materials and modern manufacturing techniques comparable to those used by major brands. The difference isn’t the product itself — it’s the business model behind it. <br />' + 'Instead of spending on brand markups, large sales teams, and showroom expenses, we focus our investment on product quality, customization, and reliable service. That’s how we deliver premium shades at a more accessible price.'
    },
    {
      question: "What areas do you serve?",
      answer: "Our DIY option does not have a serivce area limit. You can order from anywhere in the United States. As for the full service (including measurement and installation), we are based in the Bay Area, California. Our installation team are local and can serve the entire Bay Area an surrounding areas. If you are outside of the Bay Area, we can still serve you with our DIY option."
    },
    {
      question: "How long does it take to receive custom shades after I place my order?",
      answer: "Production time varies depending on the type of shade and customization options. Typically, custom shades are delivered within 2-10 weeks after order confirmation and measurements. If you are in a hurry, we can expedite the process and shipping for a small fee, which decreases the delivery time to 2-4 weeks. We'll provide you with an estimated delivery date when you place your order."
    },
    {
      question: "If I want the shades earlier than the estimated delivery date, can you expedite the process?",
      answer: "Yes, we can expedite the process for a small fee. The expedited delivery time is typically 1-2 weeks. We could also send you the quote for with or without expedition so that you can compare the prices and decide which option is best for you, just let us know!"
    },
    {
      question: "What is the lead time for the installation?",
      answer: "Our professional installation team typically completes installations within 1-2 weeks after the delivery of your shades. Once the order is delivered and inspected by our team, we will follow up with you to schedule the installation based on your availability. The installation itself typically takes a few hours depending on the complexity."
    },
    {
      question: "Is the price shown on the free quote page the final price that I will pay?",
      answer: "Short answer: No. The price shown on the free quote page is an estimate based on the measurements and details you initially provide. After submitting your quote, you’ll receive a follow-up email with clear instructions on how to take accurate measurements and decide on design options that fit your needs (inside vs. outside mount, openness percentage, etc.). Once we receive your final measurements and design options, we’ll send you a detailed invoice with the confirmed price and instructions for placing your order. It might be higher or lower than the estimated price on the free quote page, but still within the range. You can proceed with your purchase once you’re happy with the final price."
    },
    {
      question: "I don't see any payment link on your website, how do I place an order?",
      answer: "We don’t accept payments directly on our website because we want to make sure everything is just right before you place your order. We’ll provide a detailed measurement video or offer a free online measurement consultation (via Zoom or Google Meet) to ensure the dimensions are measured correctly and the design options are chosen. After receiving the details, our team will send you an invoice via email. You can complete your purchase easily from there."
    },
    {
      question: "What materials and fabrics do you offer?",
      answer: "We offer an extensive selection of high-quality materials and fabrics including polyester, linen, cotton, velvet, silk, wood, bamboo, and more... So you can choose what best fits your style and space. Each option is carefully curated to balance modern design with advanced light-control technology, delivering a refined take on classic window treatments. <br />" + "With over 1,000 fabric options, you can explore unique combinations of color, texture, and light filtering to complement any décor. From soft, natural weaves to elegant jacquards, every collection reflects close collaboration between color experts, graphic designers, and textile specialists—making it easy to create a personalized space that truly feels like home."
    },
    {
      question: "Do you have a minimum order quantity?",
      answer: "No, we don't have a minimum order quantity. You can order only one shade or as many as you need."
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, there are no hidden fees. All of our pricing is transparent and upfront. You will know exactly what you are paying for before you place an order."
    },
    {
      question: "What is the warranty for the shades?",
      answer: "We stand behind every product we install with comprehensive warranty coverage. Our warranty includes free maintenance and repairs during the coverage period—two years for shades and five years for motors. If anything needs adjustment or attention, our team is just a call or message away, ensuring your shades continue to look and perform their best long after installation."
    },
    {

      question: "For the DIY option, what if I measure incorrectly?",
      answer: "To ensure accurate measurements, we will send you detailed instructions and videos in follow up email. If you're still unsure about your measurements, you can schedule a free online measurement consultation with our team via Zoom or Google Meet. Our experts will guide you through the process and help you get the perfect fit for your shades."
    },
    {
      question: "For the motorized shades, are they compatible with my current smart home systems such as Alexa or Google Home?",
      answer: "We use Matter as the communication protocol for our motorized shades. The Connector platform seamlessly integrates with leading smart home ecosystems, including Amazon Alexa, Google Home, IFTTT, and Samsung SmartThings. It supports both Wi-Fi–enabled window covering motors/receivers and traditional systems when paired with the Connector bridge. With a quick and straightforward setup, you can control your window coverings through the corresponding mobile apps or smart speakers. <br />" + "Through cloud-to-cloud integration, your window coverings can easily work in harmony with other smart home devices, unlocking a wide range of automation possibilities and delivering a truly connected, convenient living experience."
    },
    {
      question: "What is the warranty for the motorized shades?",
      answer: "We offer a 5-year warranty on the motorized shades. This warranty covers all parts including the motor, receiver, and the charger."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section id="faq" className="py-10 md:py-20 px-5 md:px-20 bg-gray-50">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-xl text-center mb-5 md:mb-10 max-w-3xl mx-auto" style={{ color: '#937125' }}>
          Get clear answers about our pricing, quality, and service.
        </p>

        {/* Contact Section */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="rounded-lg p-6 md:p-8 bg-white" style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <div className="flex flex-col items-start text-center">
                <p className="text-base md:text-2xl font-bold mb-1 text-brown">
                  Still have questions?
                </p>
                <p className="text-base md:text-lg text-brown">
                  Our team is ready to help. Reach out any time!
                </p>
              </div>
              <a
                href="/contact"
                className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-primary border-2 border-primary rounded-[5px] font-semibold text-xs md:text-sm hover:bg-gray-50 transition-all duration-300 no-underline whitespace-nowrap"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="relative">
              {/* Dark brown square with number - positioned outside */}
              <div className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 border-r-2 border-r-white border-b-2 border-b-white bg-brown flex items-center justify-center z-10">
                <span className="text-white text-xl md:text-2xl font-bold">
                  {index + 1}
                </span>
              </div>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full relative flex items-center border-b-2 border-b-white bg-primary hover:opacity-90 transition-opacity pl-6 md:pl-8 h-14 md:h-16"
                style={{ paddingLeft: '3.5rem' }}
              >
                {/* Question text */}
                <div className="flex-1 px-4 md:px-6 py-4 md:py-5 text-left">
                  <span className="text-white text-base md:text-lg font-bold">
                    {faq.question}
                  </span>
                </div>
                {/* Expand/collapse icon */}
                <div className="flex-shrink-0 pr-4 md:pr-6">
                  {openIndices.has(index) ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </button>
              {openIndices.has(index) && (
                <div className="mt-2 pb-4 pl-[4.5rem] md:pl-[5rem] pr-4 md:pr-6">
                  <div
                    className="text-base text-brown leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                  {index === 0 && (
                    <div className="mt-8 bg-light-beige rounded-lg p-6 md:p-8">
                      <h4 className="text-xl md:text-2xl font-bold text-brown text-center mb-6">
                        How We Deliver Superior Value
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
                        {/* VS Icon */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center border-4 border-light-beige">
                            <span className="text-white font-bold text-lg">VS</span>
                          </div>
                        </div>

                        {/* Traditional Retail */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                          <h5 className="text-lg md:text-xl font-bold text-brown text-center mb-4">
                            Traditional Retail
                          </h5>
                          <div className="mb-4">
                            {/* Stacked blocks */}
                            <div className="relative">
                              <div className="bg-primary p-4 rounded-lg shadow-sm z-10 relative">
                                <div className="flex items-center gap-3 mb-2">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M3 21H21M5 21V7L13 2L21 7V21M9 9V21M15 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  <span className="text-white font-bold text-lg">$$$$ Higher Cost</span>
                                </div>
                              </div>
                              <div className="bg-brown bg-opacity-20 p-3 rounded-lg -mt-2 ml-2 relative z-0">
                                <p className="text-brown text-sm font-medium"> Showroom & Sales Overhead + $$</p>
                              </div>
                              <div className="bg-brown bg-opacity-20 p-3 rounded-lg -mt-2 ml-4 relative z-0">
                                <p className="text-brown text-sm font-medium">Dealer Markup + $$</p>
                              </div>
                              <div className="bg-brown bg-opacity-20 p-3 rounded-lg -mt-2 ml-6 relative z-0">
                                <p className="text-brown text-sm font-medium">Factory Cost + $$</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-brown text-sm text-center mb-3">Multiple Layers of Markup & Overhead</p>
                        </div>

                        {/* Factory-Direct */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                          <h5 className="text-lg md:text-xl font-bold text-brown text-center mb-4">
                            Factory-Direct
                          </h5>
                          <div className="bg-primary bg-opacity-10 p-6 rounded-lg mb-4">
                            <div className="bg-new-green px-4 py-2 rounded-lg text-center mb-3">
                                <span className="text-white font-bold text-lg">$$ Lower Cost</span>
                            </div>
                            <div className="flex items-center justify-center">
                              <img src="/assets/faq/factory.png" alt="Factory" className="w-24 h-24 object-contain" />
                            </div>
                            <ul className="space-y-3">
                              <li className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-new-green flex-shrink-0">
                                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-brown text-sm">Factory Pricing</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-new-green flex-shrink-0">
                                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-brown text-sm">No Middlemen</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-new-green flex-shrink-0">
                                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-brown text-sm">No Showroom Overhead</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-brown font-semibold mb-2">Direct from Factory = No Middlemen</p>
                        <p className="text-brown text-lg">
                          You Get <span className="text-new-green font-bold">Quality Shades at 50% Less!</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
