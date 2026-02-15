import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import { HiMiniWrenchScrewdriver } from 'react-icons/hi2'
import { HiOutlineListBullet } from 'react-icons/hi2'
import { HiOutlineCalculator } from 'react-icons/hi2'
import { HiOutlinePencil } from 'react-icons/hi2'
import { HiOutlineArrowDownTray } from 'react-icons/hi2'
import { HiOutlineUser } from 'react-icons/hi2'

function QuoteSummary() {
  const navigate = useNavigate()

  // Sample data - replace with actual data from form submission
  const quoteData = {
    windows: [
      {
        id: 1,
        room: 'Living Room - Main',
        window: 'Window #1',
        dimensions: '48" x 60" (20.0 sq ft)',
        shadeType: 'Zebra Shades',
        features: true,
        price: 425.00
      },
      {
        id: 2,
        room: 'Living Room - Side',
        window: 'Window #2',
        dimensions: '36" x 48" (12.0 sq ft)',
        shadeType: 'Roller Shades',
        features: false,
        price: 185.00
      },
      {
        id: 3,
        room: 'Bedroom - Master',
        window: 'Window #3',
        dimensions: '42" x 54" (15.75 sq ft)',
        shadeType: 'Honeycomb Shades',
        features: true,
        price: 385.00
      },
      {
        id: 4,
        room: 'Kitchen',
        window: 'Window #4',
        dimensions: '30" x 36" (7.5 sq ft)',
        shadeType: 'Bamboo Shades',
        features: false,
        price: 145.00
      }
    ],
    serviceOption: 'Full Service',
    shippingType: 'Standard delivery (5-7 days)',
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Reserved for future currency range formatting
  // const formatCurrencyRange = (min: number, max: number) => {
  //   if (min === max) return formatCurrency(min)
  //   return `${formatCurrency(min)} - ${formatCurrency(max)}`
  // }

  const handleAcceptQuote = () => {
    // Handle quote acceptance
    console.log('Quote accepted')
    // Navigate to next step or show confirmation
  }

  const handleModifyQuote = () => {
    navigate('/quote')
  }

  const handleDownloadPDF = () => {
    // Handle PDF download
    console.log('Downloading PDF')
  }

  // Reserved for future price range display
  // const shadePriceRanges: Record<string, { min: number, max: number }> = {
  //   'Zebra Shades': { min: 280, max: 520 },
  //   'Roller Shades': { min: 220, max: 460 },
  //   'Honeycomb Shades': { min: 260, max: 520 },
  //   'Bamboo Shades': { min: 200, max: 420 },
  //   'Shangri-La Shades': { min: 320, max: 650 },
  //   'Roman Shades': { min: 300, max: 620 },
  //   'Draperies': { min: 350, max: 740 },
  //   'Outdoor Shades': { min: 280, max: 620 },
  //   'Dream Shades': { min: 300, max: 650 },
  // }

  const stripParentheses = (value: string) => value.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim()

  const buildEstimate = () => {
    const materialsTotal = quoteData.windows.reduce((sum, w) => sum + w.price, 0)
    const shipping = 75
    const installation = quoteData.serviceOption === 'Full Service' ? 280 : 0
    const total = materialsTotal + shipping + installation

    return {
      materialsTotal,
      shipping,
      installation,
      total,
    }
  }

  const CostBreakdownCard = ({ title }: { title: string }) => {
    const estimate = buildEstimate()

    return (
      <div>
      <div className="flex items-center gap-3 mb-6">
        <HiOutlineCalculator className="text-primary text-2xl" />
        <h2 className="text-xl md:text-2xl font-bold text-brown" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
          {title}
        </h2>
      </div>
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Materials ({quoteData.windows.length} windows)
          </span>
          <span className="text-sm font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {formatCurrency(estimate.materialsTotal)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Shipping & Handling ({quoteData.shippingType})
          </span>
          <span className="text-sm font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {formatCurrency(estimate.shipping)}
          </span>
        </div>
        {quoteData.serviceOption === 'Full Service' && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Professional Installation (Labor & mounting hardware)
            </span>
            <span className="text-sm font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {formatCurrency(estimate.installation)}
            </span>
          </div>
        )}
        <div className="pt-4 border-t-2 border-primary">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-brown" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
              Total
            </span>
            <span className="text-xl font-bold text-primary" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
              {formatCurrency(estimate.total)}
            </span>
          </div>
          <p className="text-xs text-light-gray" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Including all taxes and fees
          </p>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <section className="py-10 md:py-20 px-5 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 relative">
            {/* Logo in top right corner */}
            <div className="absolute top-6 right-6 md:top-8 md:right-12">
              <Logo mainTextSize="text-2xl md:text-3xl" subTextSize="text-[10px] md:text-[13px]" />
            </div>

            {/* Header Section */}
            <div className="mb-8 pr-32 md:pr-40">
              <div className="mb-4 mt-20">
                <h1 className="text-2xl md:text-3xl font-bold text-brown mb-2" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                  Quote Summary
                </h1>
                <p className="text-base md:text-lg text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Review your custom window shade configuration
                </p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Window Specifications */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <HiOutlineListBullet className="text-primary text-2xl" />
                    <h2 className="text-xl md:text-2xl font-bold text-brown" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                      Window Specifications
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-brown uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Window
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-brown uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Dimensions
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-brown uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Shade Type
                          </th>
                          <th className="px-4 py-3 text-center text-sm font-semibold text-brown uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Motorization
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-brown uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {quoteData.windows.map((window) => (
                          <tr key={window.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-4">
                              <div>
                                <p className="text-sm font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                  {window.room}
                                </p>
                                <p className="text-xs text-light-gray" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                  {window.window}
                                </p>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {stripParentheses(window.dimensions)}
                            </td>
                            <td className="px-4 py-4 text-sm text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {window.shadeType}
                            </td>
                            <td className="px-4 py-4 text-sm text-brown text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {window.features ? 'Yes' : 'No'}
                            </td>
                            <td className="px-4 py-4 text-right text-sm font-semibold text-brown" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                              {formatCurrency(window.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Service Option */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <HiMiniWrenchScrewdriver className="text-primary text-2xl" />
                    <h2 className="text-xl md:text-2xl font-bold text-brown" style={{ fontFamily: 'Fjalla One, sans-serif' }}>
                      Service Option
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg uppercase select-none" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <HiOutlineUser className="text-lg" />
                    {quoteData.serviceOption}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <CostBreakdownCard title="Cost Estimation" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleAcceptQuote}
                    className="w-full px-6 py-4 bg-primary text-white font-bold text-lg hover:bg-[#9a7828] transition-colors flex items-center justify-center gap-2 uppercase rounded-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    Continue to Next Step
                  </button>
                  <button
                    onClick={handleModifyQuote}
                    className="w-full px-6 py-4 bg-white text-primary border-2 border-primary font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 uppercase rounded-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <HiOutlinePencil className="text-xl" />
                    Modify Quote
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full px-6 py-4 bg-white text-primary border-2 border-primary font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 uppercase rounded-lg"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <HiOutlineArrowDownTray className="text-xl" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default QuoteSummary

