import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md'

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M2 6L5 9L10 2" stroke="#71482D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-base md:text-lg font-[500] leading-relaxed text-brown" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
        {children}
      </span>
    </li>
  )
}

function PolaroidImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-sm bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:max-w-md md:p-4">
      <img src={src} alt={alt} className="aspect-[3/4] w-full object-cover" />
    </div>
  )
}

type FlowStep = {
  number: number
  title: string
  description: string
  imageLabel: string
}

function renderLinkedDescription(description: string) {
  if (description.includes('online form')) {
    return (
      <>
        {description.split('online form').map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && (
              <a
                href="/quote"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-bold text-primary underline hover:text-brown"
                style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
              >
                online form
              </a>
            )}
          </span>
        ))}
      </>
    )
  }
  if (description.includes('in-person consulting form')) {
    return (
      <>
        {description.split('in-person consulting form').map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && (
              <a
                href="/contact/schedule-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-bold text-primary underline hover:text-brown"
                style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
              >
                in-person consulting form
              </a>
            )}
          </span>
        ))}
      </>
    )
  }
  if (description.includes('Contact Form')) {
    return (
      <>
        {description.split('Contact Form').map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && (
              <a
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-bold text-primary underline hover:text-brown"
                style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
              >
                Contact Form
              </a>
            )}
          </span>
        ))}
      </>
    )
  }
  return description
}

const services = [
  {
    number: '1.',
    title: 'Get a Free Quote',
    description:
      'Fill out our online form with your window dimensions and we will get you a free quote right away.',
    bullets: [] as string[],
    imageSrc: '/assets/how-it-works/coordinated_self_measure.jpg',
    imageAlt: 'Person measuring window with tape measure',
    primaryHref: '/quote',
    primaryLabel: 'Get Free Quote',
  },
  {
    number: '2.',
    title: 'In-Person Consulting & Measurement',
    description:
      'Fill out our in-person consulting form for a more thorough measurement and get a recommendation from our experts!',
    bullets: [] as string[],
    imageSrc: '/assets/how-it-works/consulting_shades.jpg',
    imageAlt: 'Consultant reviewing shade options with a homeowner',
    primaryHref: '/contact/schedule-consultation',
    primaryLabel: 'Schedule Consultation',
  },
  {
    number: '3.',
    title: 'Installation',
    description: 'Our experienced worker will come to install on your convenience.',
    bullets: [] as string[],
    imageSrc: '/assets/how-it-works/coorindated_installation.jpg',
    imageAlt: 'Installer installing window shade',
    primaryHref: '/contact/schedule-consultation',
    primaryLabel: 'Schedule Consultation',
  },
  {
    number: '4.',
    title: 'Aftercare',
    description:
      'Within the warranty period, if your product has any unexpected issues, please use our Contact Form to fill out a request and we will come to fix it for free!',
    bullets: [] as string[],
    imageSrc: '/assets/how-it-works/coordinated_aftercare.jpg',
    imageAlt: 'Service technician fixing shade',
    primaryHref: '/contact',
    primaryLabel: 'Contact Us',
  },
]

const diySteps: FlowStep[] = [
  {
    number: 1,
    title: 'Get a Free Quote',
    description: 'Fill out our online form with your window dimensions and we will get you a free quote right away.',
    imageLabel: 'Person Measuring Window with Tape Measure',
  },
  {
    number: 2,
    title: 'Design Recommendation',
    description:
      'Please use our Contact Form to send us your project details and room photos, we will recommend several shade options that matches your vibe and budget',
    imageLabel: 'Design Consultation and Recommendations',
  },
  {
    number: 3,
    title: 'Remeasurement and Order Placement',
    description:
      "We'll send you detailed measuring instructions to ensure your shades are made to the correct dimensions. Then you can go ahead and place your order.",
    imageLabel: 'Measuring Instructions and Order Placement',
  },
  {
    number: 4,
    title: 'Installation',
    description:
      "We'll deliver your shades with detailed installation instructions and all necessary hardware. (Note: we can also help you find your local installer if you need, please use our Contact Form to fill out a request)",
    imageLabel: 'Homeowner Installing Shade with Instructions',
  },
]

const coordinatedSteps: FlowStep[] = [
  {
    number: 1,
    title: 'Get a Free Quote',
    description: 'Fill out our online form with your window dimensions and we will get you a free quote right away.',
    imageLabel: 'Person Measuring Window with Tape Measure',
  },
  {
    number: 2,
    title: 'Connect with a Local Installer',
    description:
      "Outside the Bay Area? We'll connect you with high-rated installers in your area who can provide measurement and installation quotes.",
    imageLabel: 'Design Consultation and Recommendations',
  },
  {
    number: 3,
    title: 'Coordinate Installation',
    description:
      'After you have received your custom shades, we will coordinate with you and your installer to schedule the installation. ',
    imageLabel: 'Measuring Instructions and Order Placement',
  },
  {
    number: 4,
    title: 'Aftercare',
    description:
      'If there are any quality issues within the warranty period, please use our Contact Form to fill out a request and we will mail you the replacement for free!',
    imageLabel: 'Installer Installing Window Shade',
  },
]

function getImageSrc(imageLabel: string, isOption2: boolean = false, stepNumber: number = 1, isCoordinated: boolean = false) {
  if (imageLabel.includes('Measuring Window with Tape Measure') || imageLabel.includes('Person Measuring Window')) {
    if (isCoordinated && stepNumber === 1) {
      return '/assets/how-it-works/coordinated_self_measure.jpg'
    }
    if (isOption2 && stepNumber === 1) {
      return '/assets/how-it-works/coordinated_self_measure.jpg'
    }
    return '/assets/how-it-works/coordinated_self_measure.jpg'
  }
  if (imageLabel.includes('Measuring Instructions and Order Placement') || imageLabel.includes('Order Placement')) {
    if (isCoordinated && stepNumber === 3) {
      return '/assets/how-it-works/coorindated_installation.jpg'
    }
    return '/assets/how-it-works/coordinate_complete.jpg'
  }
  if (imageLabel.includes('Homeowner Installing') || (imageLabel.includes('Installing') && isOption2 && stepNumber === 4)) {
    return '/assets/how-it-works/coorindated_installation.jpg'
  }
  if (imageLabel.includes('Design Consultation and Recommendations')) {
    return '/assets/how-it-works/consulting_shades.jpg'
  }
  if (imageLabel.includes('Consultant') || imageLabel.includes('Professional Consultant') || imageLabel.includes('Design Consultation')) {
    return '/assets/how-it-works/consulting_shades.jpg'
  }
  if (imageLabel.includes('Installer Installing') || imageLabel.includes('Installer')) {
    if (isCoordinated && stepNumber === 4) {
      return '/assets/how-it-works/coordinated_aftercare.jpg'
    }
    return '/assets/how-it-works/coorindated_installation.jpg'
  }
  if (imageLabel.includes('Fixing Shade') || imageLabel.includes('Service Technician')) {
    return '/assets/how-it-works/coordinated_aftercare.jpg'
  }
  return null
}

function renderFlowStep(step: FlowStep, isOption2: boolean = false, isCoordinated: boolean = false) {
  const imageSrc = getImageSrc(step.imageLabel, isOption2, step.number, isCoordinated)

  return (
    <div className="mb-8 md:mb-12">
      <div className="mb-4 flex items-center">
        <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-white bg-brown">
          <span className="text-xl font-bold text-white">{step.number}</span>
        </div>
        <div className="relative z-0 -ml-6 rounded-lg bg-primary py-2 pl-8 pr-4 md:py-3 md:pl-8 md:pr-6">
          <h3 className="m-0 text-base font-bold text-white md:text-lg" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
            {step.title}
          </h3>
        </div>
      </div>
      <div className="ml-4 flex flex-col items-start gap-4 md:gap-6">
        <p className="text-lg font-[500] leading-relaxed text-brown md:text-xl" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
          {renderLinkedDescription(step.description)}
        </p>
        <div className="w-full max-w-[300px] flex-shrink-0 overflow-hidden md:max-w-[350px]">
          {imageSrc ? (
            <img src={imageSrc} alt={step.imageLabel} className="h-[210px] w-full object-cover md:h-[220px]" />
          ) : (
            <div className="flex h-[210px] w-full items-center justify-center bg-gray-200 md:h-[220px]">
              <span className="text-base font-medium text-white md:text-lg">{step.imageLabel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function HowItWorksSection() {
  const [expandedOption, setExpandedOption] = useState<string | null>(null)

  return (
    <section id="how-it-works" className="bg-[#faf8f5] px-5 py-12 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center md:mb-16">
          <h2
            className="mb-4 text-3xl font-bold uppercase tracking-[0.12em] text-brown md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'Fjalla One, sans-serif' }}
          >
            Our Service
          </h2>
          <p
            className="mx-auto max-w-3xl text-base font-[500] leading-relaxed text-primary md:text-lg"
            style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
          >
            <span className="font-bold text-brown">Full service in the Bay Area, California.</span>{' '}
            We offer in-home consultation, professional measurement, and expert installation throughout the region.
            <br />
            <br />
            <span className="font-bold text-brown">Outside our service area?</span> Contact us at{' '}
            <a href="mailto:info@pacificlightshades.com" className="text-primary underline hover:text-brown">
              info@pacificlightshades.com
            </a>{' '}
            or call{' '}
            <a href="tel:6505616086" className="text-primary underline hover:text-brown">
              (650) 561-6086
            </a>{' '}
            for DIY and coordinated installation options.
          </p>
        </header>

        <div className="flex flex-col gap-24 md:gap-36 lg:gap-44 xl:gap-52">
          {services.map((item, index) => {
            const isReversed = index % 2 === 1
            return (
              <div
                key={item.title}
                className={`flex flex-col items-center gap-10 md:gap-12 lg:gap-16 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                <div className="w-full flex-1 md:w-1/2">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <span
                      className="shrink-0 font-serif text-5xl font-bold leading-none text-brown md:text-6xl lg:text-7xl"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      {item.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="m-0 border-b border-brown pb-2 text-2xl font-bold text-brown md:text-3xl"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    className="mt-5 text-base font-[500] leading-relaxed text-brown md:text-lg"
                    style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
                  >
                    {renderLinkedDescription(item.description)}
                  </p>
                  {item.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {item.bullets.map((b) => (
                        <CheckItem key={b}>{b}</CheckItem>
                      ))}
                    </ul>
                  )}
                  <div className="mt-8">
                    <Link
                      to={item.primaryHref}
                      className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:bg-opacity-90"
                      style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}
                    >
                      {item.primaryLabel}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="w-full flex-1 md:w-1/2 md:max-w-none">
                  <PolaroidImage src={item.imageSrc} alt={item.imageAlt} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Option 2 & 3: Coordinated + DIY — hidden; remove wrapper `hidden` to show again */}
        <div className="hidden" aria-hidden="true">
          <div className="mt-16 flex flex-col border-t border-gray-200 pt-16 md:pl-8 md:pt-20 lg:pl-12">
            <div
              className={`relative mb-6 cursor-pointer rounded-lg bg-white p-6 md:mb-8 md:flex md:cursor-default md:flex-col ${expandedOption === 'option2' ? 'md:mb-[80px]' : ''}`}
              style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setExpandedOption(expandedOption === 'option2' ? null : 'option2')
                }
              }}
            >
              <div
                className="absolute left-0 top-0 z-10 flex items-center gap-2 rounded-tl-lg bg-primary px-3 py-1.5 text-xs font-bold text-white md:text-sm"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 85% 100%, 0 100%)' }}
              >
                <span>Outside of Bay Area, CA</span>
              </div>
              <h3 className="mb-4 mt-5 text-2xl font-bold text-brown md:text-3xl" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Option 2: Coordinated Installation Service
              </h3>
              <p className="text-lg font-[500] text-brown md:flex-1 md:text-xl" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                We connect you with <span className="font-bold">high-rated local installers</span> in your area for a quote. You{' '}
                <span className="font-bold">pay them directly</span> for installation and/or measurement.
              </p>
              {expandedOption !== 'option2' ? (
                <p className="mt-4 text-center text-base font-semibold text-primary md:hidden" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to see the steps →
                </p>
              ) : (
                <p className="mt-4 text-center text-base font-semibold text-primary md:hidden" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to hide steps ↑
                </p>
              )}
              <div className={`mt-6 space-y-0 ${expandedOption === 'option2' ? 'block' : 'hidden'} md:hidden`}>
                {coordinatedSteps.map((step, idx) => (
                  <div key={step.number}>
                    {renderFlowStep(step, false, true)}
                    {idx < coordinatedSteps.length - 1 && (
                      <div className="my-10 flex items-center justify-center">
                        <MdOutlineKeyboardDoubleArrowDown className="h-[50px] w-[50px] text-brown" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden space-y-0 md:block">
              {coordinatedSteps.map((step, idx) => (
                <div key={step.number}>
                  {renderFlowStep(step, false, true)}
                  {idx < coordinatedSteps.length - 1 && (
                    <div className="my-10 flex items-center justify-center md:my-15">
                      <MdOutlineKeyboardDoubleArrowDown className="h-[50px] w-[50px] text-brown" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden" aria-hidden="true">
          <div className="mt-12 flex flex-col md:mt-16 md:pl-8 md:border-l md:border-gray-200 lg:pl-12">
            <div
              className={`mb-6 cursor-pointer rounded-lg bg-white p-6 md:mb-[80px] md:flex md:cursor-default md:flex-col ${expandedOption === 'option3' ? 'md:mb-[80px]' : ''}`}
              style={{ boxShadow: '0 0 24px rgba(0, 0, 0, 0.24)' }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setExpandedOption(expandedOption === 'option3' ? null : 'option3')
                }
              }}
            >
              <h3 className="mb-4 text-2xl font-bold text-brown md:text-3xl" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                Option 3: DIY Installation
              </h3>
              <p className="text-lg font-[500] text-brown md:flex-1 md:text-xl" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                We provide <span className="font-bold">clear measuring instructions</span> and{' '}
                <span className="font-bold">easy-to-follow installation guidance</span> so you can install in as little as 20 minutes.
              </p>
              {expandedOption !== 'option3' ? (
                <p className="mt-4 text-center text-base font-semibold text-primary md:hidden" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to see the steps →
                </p>
              ) : (
                <p className="mt-4 text-center text-base font-semibold text-primary md:hidden" style={{ fontFamily: "'Gotham', 'Gotham A', sans-serif" }}>
                  Tap to hide steps ↑
                </p>
              )}
              <div className={`mt-6 space-y-0 ${expandedOption === 'option3' ? 'block' : 'hidden'} md:hidden`}>
                {diySteps.map((step, idx) => (
                  <div key={step.number}>
                    {renderFlowStep(step, true)}
                    {idx < diySteps.length - 1 && (
                      <div className="my-10 flex items-center justify-center">
                        <MdOutlineKeyboardDoubleArrowDown className="h-[50px] w-[50px] text-brown" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden space-y-0 md:block">
              {diySteps.map((step, idx) => (
                <div key={step.number}>
                  {renderFlowStep(step, true)}
                  {idx < diySteps.length - 1 && (
                    <div className="my-10 flex items-center justify-center md:my-15">
                      <MdOutlineKeyboardDoubleArrowDown className="h-[50px] w-[50px] text-brown" />
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
