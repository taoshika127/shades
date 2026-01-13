import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
      question: "How long does it take to receive custom shades after I place my order?",
      answer: "Production time varies depending on the type of shade and customization options. Typically, custom shades are delivered within 2-10 weeks after order confirmation and measurements. If you are in a hurry, we can expedite the process and shipping for a small fee, which decreases the delivery time to 2-4 weeks. We'll provide you with an estimated delivery date when you place your order."
    },
    {
      question: "Is the price shown on the free quote page the final price that I will pay?",
      answer: "Short answer: No. The price shown on the free quote page is an estimate based on the measurements and details you initially provide. After submitting your quote, you’ll receive a follow-up email with clear instructions on how to take accurate measurements and decide on design options that fit your needs (inside vs. outside mount, openness percentage, etc.). Once we receive your final measurements and design options, we’ll send you a detailed invoice with the confirmed price and instructions for placing your order. It might be higher or lower than the estimated price on the free quote page, but still within the range. You can proceed with your purchase once you’re happy with the final price."
    },
    {question: "I don't see any payment options on your website, how do I place an order?",
        answer: "Our website does not currently offer payment options, this is because we want to ensure that your measurements are accurate and your order is processed correctly. We will contact you by email or text message to go through the measurement process and other details. After we get all the measurements we will send an invoice to your email address and you can place your order from there."
    },
    {question: "What materials and fabrics do you offer?",
        answer: "We stand behind every product we install with comprehensive warranty coverage. Our warranty includes free maintenance and repairs during the coverage period. Please contact us for specific warranty details and return policy information based on your purchase."
    },
    {question: "What is your warranty and return policy?",
        answer: "We stand behind every product we install with comprehensive warranty coverage. Our warranty includes free maintenance and repairs during the coverage period. Please contact us for specific warranty details and return policy information based on your purchase."
    },

    {question: "What is your warranty and return policy?",
        answer: "We stand behind every product we install with comprehensive warranty coverage. Our warranty includes free maintenance and repairs during the coverage period. Please contact us for specific warranty details and return policy information based on your purchase."
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
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
              <div className="absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 border-r-2 border-r-white border-b-2 border-b-white bg-brown flex items-center justify-center z-10">
                <span className="text-white text-xl md:text-2xl font-bold">
                  {index + 1}
                </span>
              </div>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full relative flex items-center border-b-2 border-b-white bg-primary hover:opacity-90 transition-opacity pl-6 md:pl-8 h-12 md:h-14"
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
                  {openIndex === index ? (
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
              {openIndex === index && (
                <div className="mt-4 pb-4 pl-[4.5rem] md:pl-[5rem] pr-4 md:pr-6">
                  <div
                    className="text-base text-brown leading-relaxed"
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
