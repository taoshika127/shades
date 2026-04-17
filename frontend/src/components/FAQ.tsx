import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

function FAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())

  const faqs: FAQItem[] = [
    // {
    //   question: "Why are your prices so much lower than big box stores?",
    //   answer: "We work directly with manufacturers and ship factory-direct, which allows us to eliminate brand premiums, dealer markups, and showroom overhead. Traditional retailers rely on multiple layers of distribution and physical showrooms, all of which add significant cost to the final price. <br />" +
    //   "By using a more efficient supply chain, we’re able to offer high-quality custom shades at prices that are typically 50% or less than big box stores, without cutting corners on materials or craftsmanship."
    // },
    // {
    //   question: "Does a lower price mean lower quality?",
    //   answer: 'Absolutely not! Our shades are made using high-quality materials and modern manufacturing techniques comparable to those used by major brands. The difference isn’t the product itself — it’s the business model behind it. <br />' + 'Instead of spending on brand markups, large sales teams, and showroom expenses, we focus our investment on product quality, customization, and reliable service. That’s how we deliver premium shades at a more accessible price.'
    // },
    {
      question: "What areas do you serve?",
      answer: "Our DIY option does not have a service area limit—you can order from anywhere in the United States. Full service (measurement and installation) is available in the Bay Area, California, where our local team serves the entire Bay Area and surrounding areas. Outside the Bay Area, we offer our Coordinated Installation Service: we connect you with high-rated local installers for a quote, and you choose your installer and pay them directly. You can also choose DIY and we'll ship your shades with detailed guidance."
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
    <section id="faq" className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-xl text-center mb-6 md:mb-8 max-w-3xl mx-auto font-[500]" style={{ color: '#937125', fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
          Get clear answers about our pricing, quality, and service.
        </p>

        {/* Contact Section */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="rounded-lg p-6 md:p-8 bg-white" style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <div className="flex flex-col items-start text-center">
                <p className="text-base md:text-2xl font-bold mb-1 text-brown" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                  Still have questions?
                </p>
                <p className="text-base md:text-lg text-brown font-[500]" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Reach out to our team at any time!
                </p>
              </div>
              <a
                href="/contact"
                className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-primary border-2 border-primary font-semibold text-xs md:text-sm hover:bg-gray-50 transition-all duration-300 no-underline whitespace-nowrap uppercase"
                style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
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
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full relative flex items-center border-b-2 border-b-white bg-primary hover:opacity-90 transition-opacity pl-6 md:pl-8 min-h-14 md:h-16 py-2 md:py-0"
                style={{ paddingLeft: '3.5rem' }}
              >
                {/* Dark brown square with number - positioned outside */}
                <div className="absolute left-0 top-0 w-14 h-full md:w-16 md:h-16 md:border-r-2 md:border-r-white md:border-b-2 md:border-b-white bg-brown flex items-center justify-center z-10">
                  <span className="text-white text-xl md:text-2xl font-bold">
                    {index + 1}
                  </span>
                </div>
                {/* Question text */}
                <div className="flex-1 px-4 md:px-6 py-1 md:py-5 text-left">
                  <span className="text-white text-sm md:text-lg font-semibold" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
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
                <div className="mt-1 md:mt-2 pb-2 md:pb-4 pl-[4.5rem] md:pl-[5rem] pr-4 md:pr-6">
                  <div
                    className="text-sm text-brown leading-relaxed mb-2 md:mb-6 font-[500]"
                    style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
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
