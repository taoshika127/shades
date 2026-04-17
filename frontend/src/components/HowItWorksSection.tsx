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

  const coordinatedSteps = [
    {
      number: 1,
      title: 'Get a Free Quote',
      description: 'Fill out our online form with your window dimensions and we will get you a free quote right away.',
      imageLabel: 'Person Measuring Window with Tape Measure',
    },
    {
      number: 2,
      title: 'Connect with a Local Installer',
      description: "Outside the Bay Area? We'll connect you with high-rated installers in your area who can provide measurement and installation quotes.",
      imageLabel: 'Design Consultation and Recommendations',
    },
    {
      number: 3,
      title: 'Coordinate Installation',
      description: "After you have received your custom shades, we will coordinate with you and your installer to schedule the installation. ",
      imageLabel: 'Measuring Instructions and Order Placement',
    },
    {
      number: 4,
      title: 'Aftercare',
      description: 'If there are any quality issues within the warranty period, please use our Contact Form to fill out a request and we will mail you the replacement for free!',
      imageLabel: 'Installer Installing Window Shade',
    },
  ]

  const getImageSrc = (imageLabel: string, isOption2: boolean = false, stepNumber: number = 1, isCoordinated: boolean = false) => {
    if (imageLabel.includes('Measuring Window with Tape Measure') || imageLabel.includes('Person Measuring Window')) {
      // Coordinated (Option 2) step 1: self-measure / quote
      if (isCoordinated && stepNumber === 1) {
        return '/assets/how-it-works/coordinated_self_measure.jpg'
      }
      // DIY (Option 3) step 1
      if (isOption2 && stepNumber === 1) {
        return '/assets/how-it-works/measuring_window_option2.jpg'
      }
      return '/assets/how-it-works/measuring_window.jpg'
    } else if (imageLabel.includes('Measuring Instructions and Order Placement') || imageLabel.includes('Order Placement')) {
      // Coordinated (Option 2) step 3: coordinate installation
      if (isCoordinated && stepNumber === 3) {
        return '/assets/how-it-works/coorindated_installation.jpg'
      }
      return '/assets/how-it-works/placing_order.jpg'
    } else if (imageLabel.includes('Homeowner Installing') || (imageLabel.includes('Installing') && isOption2 && stepNumber === 4)) {
      // Use different image for Option 2, Step 4
      return '/assets/how-it-works/installing_shade_option2.jpg'
    } else if (imageLabel.includes('Design Consultation and Recommendations')) {
      // Coordinated (Option 2) step 2: local installer taking measurements
      if (isCoordinated && stepNumber === 2) {
        return '/assets/how-it-works/coordinated_installer.jpg'
      }
      return '/assets/how-it-works/design_recommendation.jpg'
    } else if (imageLabel.includes('Consultant') || imageLabel.includes('Professional Consultant') || imageLabel.includes('Design Consultation')) {
      return '/assets/how-it-works/consulting_shades.jpg'
    } else if (imageLabel.includes('Installer Installing') || imageLabel.includes('Installer')) {
      // Coordinated (Option 2) step 4: aftercare / delivery complete
      if (isCoordinated && stepNumber === 4) {
        return '/assets/how-it-works/coordinated_aftercare.jpg'
      }
      return '/assets/how-it-works/installing_shade.jpg'
    } else if (imageLabel.includes('Fixing Shade') || imageLabel.includes('Service Technician')) {
      return '/assets/how-it-works/fixing_shade.jpg'
    }
    return null
  }

  const renderStep = (step: typeof fullServiceSteps[0], isOption2: boolean = false, isCoordinated: boolean = false) => {
    const imageSrc = getImageSrc(step.imageLabel, isOption2, step.number, isCoordinated)

    return (
      <div className="mb-8 md:mb-12">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-brown border-2 border-white flex items-center justify-center flex-shrink-0 relative z-10">
            <span className="text-white text-xl font-bold">{step.number}</span>
          </div>
          <div className="bg-primary rounded-lg pl-8 md:pl-8 pr-4 md:pr-6 py-2 md:py-3 -ml-6 relative z-0">
            <h3 className="text-base md:text-lg font-bold text-white m-0" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
              {step.title}
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 ml-4 items-start">
          <p className="text-lg md:text-xl text-brown leading-relaxed font-[500]" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
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
                        style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
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
                        style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
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
                        style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
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
          <div className="overflow-hidden flex-shrink-0 w-full max-w-[300px] md:max-w-[350px]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={step.imageLabel}
                className="w-full h-[210px] md:h-[220px] object-cover"
              />
            ) : (
              <div className="w-full h-[210px] md:h-[220px] bg-gray-200 flex items-center justify-center">
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
        <p className="text-base md:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto font-[500] text-primary" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
        <span className="font-bold">Full Service Available in the Bay Area, California</span><br/>
        We offer in-home consultation, professional measurement, and expert installation throughout the Bay Area. <br /><br />
        <span className="font-bold">Outside our service area? No problem.</span><br />
        Contact us at info@pacificlightshades.com or give us a call at (650) 561-6086 for more information about our DIY option.
        </p>

        <div className="grid grid-cols-1 gap-8 md:gap-12 relative max-w-4xl mx-auto">
          {/* Option 1: Full Service */}
          <div className="flex flex-col">
            <div
              className={`rounded-lg p-6 md:p-8 mb-6 md:mb-[80px] relative md:flex md:flex-col cursor-pointer md:cursor-default ${expandedOption === 'option1' ? 'md:mb-[80px]' : ''}`}
              style={{ backgroundColor: 'white', boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setExpandedOption(expandedOption === 'option1' ? null : 'option1')
                }
              }}
            >
              {/* Within Bay Area tag */}
              <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1.5 rounded-tl-lg flex items-center gap-2 text-xs md:text-sm font-bold z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)' }}>
                <span>Within Bay Area, CA</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-4 mt-5" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Option 1: Full Service
              </h3>
              <p className="text-lg md:text-xl text-brown md:flex-1 font-[500]" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
              Professional <span className="font-bold">in-home consultation</span>, precise <span className="font-bold">measurements</span>, expert  <span className="font-bold">installation</span>, and <span className="font-bold">warranty-backed service</span>, we take care of everything for you.
              </p>
              {expandedOption !== 'option1' ? (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to see the steps →
                </p>
              ) : (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
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

          {/* Option 2: Coordinated Installation Service — remove wrapper `hidden` to show again */}
          <div className="hidden" aria-hidden="true">
            <div className="flex flex-col md:pl-8 md:border-l md:border-gray-300">
            <div
              className={`rounded-lg p-6 md:p-8 mb-6 md:mb-[80px] bg-white md:flex md:flex-col cursor-pointer md:cursor-default relative ${expandedOption === 'option2' ? 'md:mb-[80px]' : ''}`}
              style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setExpandedOption(expandedOption === 'option2' ? null : 'option2')
                }
              }}
            >
              {/* Outside of Bay Area tag */}
              <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1.5 rounded-tl-lg flex items-center gap-2 text-xs md:text-sm font-bold z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)' }}>
                <span>Outside of Bay Area, CA</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-4 mt-5" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Option 2: Coordinated Installation Service
              </h3>
              <p className="text-lg md:text-xl text-brown md:flex-1 font-[500]" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                We connect you with <span className="font-bold">high-rated local installers</span> in your area for a quote. You <span className="font-bold">pay them directly</span> for installation and/or measurement.
              </p>
              {expandedOption !== 'option2' ? (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to see the steps →
                </p>
              ) : (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to hide steps ↑
                </p>
              )}
              {/* Steps inside box on mobile, outside on desktop */}
              <div className={`space-y-0 mt-6 ${expandedOption === 'option2' ? 'block' : 'hidden'} md:hidden`}>
                {coordinatedSteps.map((step, index) => (
                  <div key={step.number}>
                    {renderStep(step, false, true)}
                    {index < coordinatedSteps.length - 1 && (
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
              {coordinatedSteps.map((step, index) => (
                <div key={step.number}>
                  {renderStep(step, false, true)}
                  {index < coordinatedSteps.length - 1 && (
                    <div className="flex justify-center items-center my-10 md:my-15">
                      <MdOutlineKeyboardDoubleArrowDown className="w-[50px] h-[50px] text-brown" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Option 3: DIY Installation — remove wrapper `hidden` to show again */}
          <div className="hidden" aria-hidden="true">
            <div className="flex flex-col md:pl-8 md:border-l md:border-gray-300">
            <div
              className={`rounded-lg p-6 md:p-8 mb-6 md:mb-[80px] bg-white md:flex md:flex-col cursor-pointer md:cursor-default ${expandedOption === 'option3' ? 'md:mb-[80px]' : ''}`}
              style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setExpandedOption(expandedOption === 'option3' ? null : 'option3')
                }
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-4" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Option 3: DIY Installation
              </h3>
              <p className="text-lg md:text-xl text-brown md:flex-1 font-[500]" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                We provide <span className="font-bold">clear measuring instructions</span> and <span className="font-bold">easy-to-follow installation guidance</span> so you can install in as little as 20 minutes.
              </p>
              {expandedOption !== 'option3' ? (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to see the steps →
                </p>
              ) : (
                <p className="text-base md:hidden text-primary font-semibold mt-4 text-center" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to hide steps ↑
                </p>
              )}
              {/* Steps inside box on mobile, outside on desktop */}
              <div className={`space-y-0 mt-6 ${expandedOption === 'option3' ? 'block' : 'hidden'} md:hidden`}>
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
      </div>
    </section>
  )
}

export default HowItWorksSection
