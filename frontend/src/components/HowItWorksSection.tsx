function HowItWorksSection() {
  const fullServiceSteps = [
    {
      number: 1,
      title: 'Get a Quote in Seconds',
      description: 'Measure the windows you want to put shade on, provide lengths and widths, and you will get the estimated cost range right away.',
      imageLabel: 'Person Measuring Window with Tape Measure',
    },
    {
      number: 2,
      title: 'In-Person Consulting & Measurement',
      description: 'You can choose our in-person consulting and measurement for a more thorough measurement and get a recommendation from our experts!',
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
      description: 'Within the warranty period, if your product has any unexpected issues, we will come to fix it for free!',
      imageLabel: 'Service Technician Fixing Shade',
    },
  ]

  const diySteps = [
    {
      number: 1,
      title: 'Get a Quote in Seconds',
      description: 'Measure the windows you want to put shade on, provide lengths and widths, and you will get the estimated cost range right away.',
      imageLabel: 'Person Measuring Window with Tape Measure',
    },
    {
      number: 2,
      title: 'Follow the measuring instruction and place order',
      description: "If you're happy with the quote and ready to move forward, we'll send you detailed measuring instructions to ensure your shades are made to the correct dimensions. Once measurements are confirmed, you can go ahead and place your order.",
      imageLabel: 'Measuring Instructions and Order Placement',
    },
    {
      number: 3,
      title: 'Order and Install by Yourself',
      description: "Place your order for custom-made shades based on your measurements. We'll deliver your shades with detailed installation instructions and all necessary hardware. Install at your own pace with our easy-to-follow guide and video tutorials.",
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
      // Use placing_order.jpg for Option 2, Step 2
      return '/assets/how-it-works/placing_order.jpg'
    } else if (imageLabel.includes('Homeowner Installing') || (imageLabel.includes('Installing') && isOption2 && stepNumber === 3)) {
      // Use different image for Option 2, Step 3
      return '/assets/how-it-works/installing_shade_option2.jpg'
    } else if (imageLabel.includes('Consultant') || imageLabel.includes('Professional Consultant')) {
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
          <div className="bg-primary rounded-lg pl-6 md:pl-8 pr-4 md:pr-6 py-2 md:py-3 -ml-6 relative z-0">
            <h3 className="text-base md:text-lg font-bold text-white m-0">
              {step.title}
            </h3>
          </div>
        </div>
        <p className="text-lg md:text-xl text-brown leading-relaxed mb-10 ml-4">
          {step.description}
        </p>
        <div className={`overflow-hidden ml-4 rounded-lg`}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={step.imageLabel}
              className="w-[570px] h-[397px] object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-white text-base md:text-lg font-medium">
                {step.imageLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section id="how-it-works" className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-brown text-center mb-4">
          How It Works
        </h2>
        <p className="text-base md:text-xl text-center mb-12 md:mb-16 max-w-3xl mx-auto" style={{ color: '#937125' }}>
          <span className="font-bold">Choose the service option that works best for you. </span>Whether you want a hands-off, professionally managed experience or prefer to take care of installation yourself, we make the process simple and transparent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          {/* Option 1: Full Service */}
          <div className="flex flex-col">
            <div className="rounded-lg p-6 md:p-8 mb-6 md:mb-[80px] bg-white" style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}>
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-2 text-center">
                Option 1: Full Service
              </h3>
              <p className="text-lg md:text-xl text-brown text-center">
                Our team handles everything for you, from precise measurements to expert installation. You'll get <span className="font-bold">personalized recommendations</span>, <span className="font-bold">professional installation and maintenance</span> for a seamless, worry-free experience.
              </p>
            </div>
            <div className="space-y-0">
              {fullServiceSteps.map((step, index) => (
                <div key={step.number}>
                  {renderStep(step, false)}
                  {index < fullServiceSteps.length - 1 && (
                    <div className="flex justify-center items-center my-8 md:my-12">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-brown"></div>
                        <div className="w-2 h-2 rounded-full bg-brown"></div>
                        <div className="w-2 h-2 rounded-full bg-brown"></div>
                        <svg className="w-[50px] h-[50px] -mt-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#5c4717' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Option 2: DIY Installation */}
          <div className="flex flex-col md:pl-8 md:border-l md:border-gray-300">
            <div className="rounded-lg p-6 md:p-8 mb-6 md:mb-[80px] bg-white" style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}>
              <h3 className="text-2xl md:text-3xl font-bold text-brown mb-2 text-center">
                Option 2: DIY Installation
              </h3>
              <p className="text-lg md:text-xl text-brown text-center">
                Select your custom shades online and install them on your own schedule. We provide <span className="font-bold">clear measuring instructions</span> and <span className="font-bold">easy-to-follow installation guidance</span> so you can achieve a great fit with confidence.
              </p>
            </div>
            <div className="space-y-0">
              {diySteps.map((step, index) => (
                <div key={step.number}>
                  {renderStep(step, true)}
                  {index < diySteps.length - 1 && (
                    <div className="flex justify-center items-center my-8 md:my-12">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-brown"></div>
                        <div className="w-2 h-2 rounded-full bg-brown"></div>
                        <div className="w-2 h-2 rounded-full bg-brown"></div>
                        <svg className="w-[50px] h-[50px] -mt-[12px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#5c4717' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
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
