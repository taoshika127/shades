import { useState } from 'react'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'

function HowItWorksSection() {
  const [expandedOption, setExpandedOption] = useState<string | null>(null)
  const fullServiceSteps = [
    {
      number: 1,
      title: 'Get a Free Quote',
      description: 'Fill out our online form with your window dimensions and we will get you a free quote right away.',
      imageLabel: 'Person Measuring Window with Tape Measure',
    },
    {
      number: 2,
      title: 'In-Person Consulting & Measurement',
      description: 'Fill out our in-person consulting form for a more thorough measurement and get a recommendation from our experts!',
      imageLabel: 'Professional Consultant Measuring Window',
    },
    {
      number: 3,
      title: 'Installation',
      description: 'Our experienced worker will come to install on your convenience.',
      imageLabel: 'Installer Installing Window Shade',
    },
    {
      number: 4,
      title: 'Aftercare',
      description: 'Within the warranty period, if your product has any unexpected issues, please use our Contact Form to fill out a request and we will come to fix it for free!',
      imageLabel: 'Service Technician Fixing Shade',
    },
  ]

  const diySteps = [
    {
      number: 1,
      title: 'Get a Free Quote',
      description: 'Fill out our online form with your window dimensions and we will get you a free quote right away.',
      imageLabel: 'Person Measuring Window with Tape Measure',
    },
    {
      number: 2,
      title: 'Design Recommendation',
      description: "Please use our Contact Form to send us your project details and room photos, we will recommend several shade options that matches your vibe and budget",
      imageLabel: 'Design Consultation and Recommendations',
    },
    {
      number: 3,
      title: 'Remeasurement and Order Placement',
      description: "We'll send you detailed measuring instructions to ensure your shades are made to the correct dimensions. Then you can go ahead and place your order.",
      imageLabel: 'Measuring Instructions and Order Placement',
    },
    {
      number: 4,
      title: 'Installation',
      description: "We'll deliver your shades with detailed installation instructions and all necessary hardware. (Note: we can also help you find your local installer if you need, please use our Contact Form to fill out a request)",
      imageLabel: 'Homeowner Installing Shade with Instructions',
    },
  ]

  const getImageSrc = (imageLabel: string, isOption2: boolean = false, stepNumber: number = 1) => {
    if (imageLabel.includes('Measuring Window with Tape Measure') || imageLabel.includes('Person Measuring Window')) {
      // Use different image for Option 2, Step 1
      if (isOption2 && stepNumber === 1) {
        return '/assets/how-it-works/measuring_window_option2.jpg'
      }
      return '/assets/how-it-works/measuring_window.jpg'
    } else if (imageLabel.includes('Measuring Instructions and Order Placement') || imageLabel.includes('Order Placement')) {
      // Use placing_order.jpg for Option 2, Step 3
      return '/assets/how-it-works/placing_order.jpg'
    } else if (imageLabel.includes('Homeowner Installing') || (imageLabel.includes('Installing') && isOption2 && stepNumber === 4)) {
      // Use different image for Option 2, Step 4
      return '/assets/how-it-works/installing_shade_option2.jpg'
    } else if (imageLabel.includes('Design Consultation and Recommendations')) {
      return '/assets/how-it-works/design_recommendation.jpg'
    } else if (imageLabel.includes('Consultant') || imageLabel.includes('Professional Consultant') || imageLabel.includes('Design Consultation')) {
      return '/assets/how-it-works/consulting_shades.jpg'
    } else if (imageLabel.includes('Installer Installing') || imageLabel.includes('Installer')) {
      return '/assets/how-it-works/installing_shade.jpg'
    } else if (imageLabel.includes('Fixing Shade') || imageLabel.includes('Service Technician')) {
      return '/assets/how-it-works/fixing_shade.jpg'
    }
    return null
  }

  const renderStep = (step: typeof fullServiceSteps[0], isOption2: boolean = false) => {
    const imageSrc = getImageSrc(step.imageLabel, isOption2, step.number)

    return (
      <div className="mb-8 md:mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-brown border-2 border-white flex items-center justify-center flex-shrink-0 relative z-10">
            <span className="text-white text-xl font-bold">{step.number}</span>
          </div>
          <div className="bg-primary rounded-lg pl-8 md:pl-8 pr-4 md:pr-6 py-2 md:py-3 -ml-6 relative z-0">
            <h3 className="text-base md:text-lg font-bold text-white m-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {step.title}
            </h3>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 ml-4 items-center md:items-start">
          <p className="text-lg md:text-xl text-brown leading-relaxed flex-1 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {step.description.includes('online form') ? (
              <>
                {step.description.split('online form').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <a
                        href="/quote"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary hover:text-brown underline cursor-pointer"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        online form
                      </a>
                    )}
                  </span>
                ))}
              </>
            ) : step.description.includes('in-person consulting form') ? (
              <>
                {step.description.split('in-person consulting form').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <a
                        href="/contact/schedule-consultation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary hover:text-brown underline cursor-pointer"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        in-person consulting form
                      </a>
                    )}
                  </span>
                ))}
              </>
            ) : step.description.includes('Contact Form') ? (
              <>
                {step.description.split('Contact Form').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary hover:text-brown underline cursor-pointer"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        Contact Form
                      </a>
                    )}
                  </span>
                ))}
              </>
            ) : (
              step.description
            )}
          </p>
          <div className="overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={step.imageLabel}
                className="w-[300px] md:w-[250px] h-[210px] md:h-[175px] object-cover"
              />
            ) : (
              <div className="w-[300px] md:w-[250px] h-[210px] md:h-[175px] bg-gray-200 flex items-center justify-center">
                <span className="text-white text-base md:text-lg font-medium">
                  {step.imageLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="how-it-works" className="py-10 md:py-20 px-5 md:px-20 bg-gray-50">
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-brown text-center mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
          How It Works
        </h2>
        <p className="text-base md:text-xl text-center mb-6 md:mb-8 max-w-3xl mx-auto font-[500]" style={{ color: '#937125', fontFamily: 'Montserrat, sans-serif' }}>
          <span className="font-bold">Choose the service option that works best for you. </span>Whether you want a hands-off, professionally managed experience or prefer to take care of installation yourself, we make the process simple and transparent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          {/* Option 1: Full Service */}
          <div className="flex flex-col">
            <div
              className={`rounded-lg p-6 md:p-8 mb-6 md:mb-[80px] relative md:h-[280px] md:flex md:flex-col cursor-pointer md:cursor-default ${expandedOption === 'option1' ? 'md:mb-[80px]' : ''}`}
              style={{ backgroundColor: '#FFF3E3', boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setExpandedOption(expandedOption === 'option1' ? null : 'option1')
                }
              }}
            >
              {/* Recommended tag */}
              <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1.5 rounded-tl-lg flex items-center gap-2 text-xs md:text-sm font-bold z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Recommended</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-2 mt-5" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Option 1: Full Service
              </h3>
              <p className="text-base md:text-lg mb-4 font-[500]" style={{ color: '#937125', fontFamily: 'Montserrat, sans-serif' }}>
                Hands-off, worry-free experience
              </p>
              <p className="text-lg md:text-xl text-brown md:flex-1 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Our team handles everything for you, from precise measurements to expert installation. You'll get <span className="font-bold">personalized recommendations</span>, <span className="font-bold">professional installation and maintenance</span> for a seamless, worry-free experience.
              </p>
              {expandedOption !== 'option1' ? (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tap to see the steps →
                </p>
              ) : (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tap to hide steps ↑
                </p>
              )}
              {/* Steps inside box on mobile, outside on desktop */}
              <div className={`space-y-0 mt-6 ${expandedOption === 'option1' ? 'block' : 'hidden'} md:hidden`}>
                {fullServiceSteps.map((step, index) => (
                  <div key={step.number}>
                    {renderStep(step, false)}
                    {index < fullServiceSteps.length - 1 && (
                      <div className="flex justify-center items-center my-10">
                        <MdOutlineKeyboardDoubleArrowDown className="w-[50px] h-[50px] text-brown" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Steps outside box on desktop */}
            <div className="hidden md:block space-y-0">
              {fullServiceSteps.map((step, index) => (
                <div key={step.number}>
                  {renderStep(step, false)}
                  {index < fullServiceSteps.length - 1 && (
                    <div className="flex justify-center items-center my-10 md:my-15">
                      <MdOutlineKeyboardDoubleArrowDown className="w-[50px] h-[50px] text-brown" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Option 2: DIY Installation */}
          <div className="flex flex-col md:pl-8 md:border-l md:border-gray-300">
            <div
              className={`rounded-lg p-6 md:p-8 mb-6 md:mb-[80px] bg-white md:h-[280px] md:flex md:flex-col cursor-pointer md:cursor-default ${expandedOption === 'option2' ? 'md:mb-[80px]' : ''}`}
              style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setExpandedOption(expandedOption === 'option2' ? null : 'option2')
                }
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Option 2: DIY Installation
              </h3>
              <p className="text-base md:text-lg mb-4 font-[500]" style={{ color: '#937125', fontFamily: 'Montserrat, sans-serif' }}>
                Best for confident DIYers
              </p>
              <p className="text-lg md:text-xl text-brown md:flex-1 font-[500]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Select your custom shades online and install them on your own schedule. We provide <span className="font-bold">clear measuring instructions</span> and <span className="font-bold">easy-to-follow installation guidance</span> so you can achieve a great fit with confidence.
              </p>
              {expandedOption !== 'option2' ? (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tap to see the steps →
                </p>
              ) : (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tap to hide steps ↑
                </p>
              )}
              {/* Steps inside box on mobile, outside on desktop */}
              <div className={`space-y-0 mt-6 ${expandedOption === 'option2' ? 'block' : 'hidden'} md:hidden`}>
                {diySteps.map((step, index) => (
                  <div key={step.number}>
                    {renderStep(step, true)}
                    {index < diySteps.length - 1 && (
                      <div className="flex justify-center items-center my-10">
                        <MdOutlineKeyboardDoubleArrowDown className="w-[50px] h-[50px] text-brown" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Steps outside box on desktop */}
            <div className="hidden md:block space-y-0">
              {diySteps.map((step, index) => (
                <div key={step.number}>
                  {renderStep(step, true)}
                  {index < diySteps.length - 1 && (
                    <div className="flex justify-center items-center my-10 md:my-15">
                      <MdOutlineKeyboardDoubleArrowDown className="w-[50px] h-[50px] text-brown" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
