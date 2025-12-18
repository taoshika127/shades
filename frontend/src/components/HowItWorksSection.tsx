function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Get a Quote in Seconds',
      description: 'Measure the windows you want to put shade on, provide lengths and widths, and you will get the estimated cost range right away.',
      imageLabel: 'Person Measuring Window with Tape Measure',
      imageOnLeft: false,
    },
    {
      number: 2,
      title: 'In-Person Consulting & Measurement',
      description: 'You can choose our in-person consulting and measurement for a more thorough measurement and get a recommendation from our experts!',
      imageLabel: 'Professional Consultant Measuring Window',
      imageOnLeft: true,
    },
    {
      number: 3,
      title: 'Installation',
      description: 'Our experienced worker will come to install on your convenience.',
      imageLabel: 'Installer Installing Window Shade',
      imageOnLeft: false,
    },
    {
      number: 4,
      title: 'Aftercare',
      description: 'Within the warranty period, if your product has any unexpected issues, we will come to fix it for free!',
      imageLabel: 'Service Technician Fixing Shade',
      imageOnLeft: true,
    },
  ]

  return (
    <section id="how-it-works" className="py-10 md:py-20 px-5 md:px-20 bg-white">
      <div className="max-w-container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-brown text-center mb-4">
          How It Works
        </h2>
        <p className="text-lg md:text-xl text-brown text-center mb-12 md:mb-16">
          Simple, straightforward process from quote to installation
        </p>

        <div className="space-y-12 md:space-y-20">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col ${
                step.imageOnLeft ? 'md:flex-row-reverse' : 'md:flex-row'
              } gap-8 md:gap-12 items-center`}
            >
              {/* Text Content */}
              <div className={`flex-1 ${step.imageOnLeft ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`flex items-center gap-4 mb-4 ${step.imageOnLeft ? 'md:justify-end' : ''}`}>
                  <div className="w-12 h-12 rounded-full bg-brown flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brown m-0">
                    {step.title}
                  </h3>
                </div>
                <p className="text-base md:text-lg text-brown leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="flex-1 w-full">
                <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg md:text-xl font-medium">
                    {step.imageLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

