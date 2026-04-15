import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Home from './pages/Home'
import Contact from './pages/Contact'
import ScheduleConsultation from './pages/ScheduleConsultation'
import Quote from './pages/Quote'
import QuoteSummary from './pages/QuoteSummary'
import CategoryPage from './pages/CategoryPage'
import GalleryPage from './pages/GalleryPage'
import FormSuccess from './pages/FormSuccess'
import FormError from './pages/FormError'
import PrivacyPolicy from './pages/PrivacyPolicy'

function MetaPixelPageView() {
  const location = useLocation()
  useEffect(() => {
    const w = window as unknown as { fbq?: (...args: unknown[]) => void }
    if (w.fbq) w.fbq('track', 'PageView')
  }, [location.pathname])
  return null
}

function App() {
  return (
    <Router>
      <Analytics />
      <MetaPixelPageView />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Direct category routes */}
        <Route path="/zebra-shades" element={<CategoryPage />} />
        <Route path="/honeycomb-shades" element={<CategoryPage />} />
        <Route path="/roller-shades" element={<CategoryPage />} />
        <Route path="/shangri-la-shades" element={<CategoryPage />} />
        <Route path="/roman-shades" element={<CategoryPage />} />
        <Route path="/bamboo-shades" element={<CategoryPage />} />
        <Route path="/draperies" element={<CategoryPage />} />
        <Route path="/outdoor-shades" element={<CategoryPage />} />
        <Route path="/dream-shades" element={<CategoryPage />} />
        {/* Cassette routes */}
        <Route path="/cassette/zebra-shades" element={<CategoryPage />} />
        <Route path="/cassette/shangri-la-shades" element={<CategoryPage />} />
        <Route path="/cassette/roller-shades" element={<CategoryPage />} />
        {/* Control Options route */}
        <Route path="/control-options" element={<CategoryPage />} />
        {/* Curtain Rods route */}
        <Route path="/curtain-rods" element={<CategoryPage />} />
        {/* Gallery routes */}
        <Route path="/gallery1" element={<GalleryPage />} />
        <Route path="/gallery2" element={<GalleryPage />} />
        <Route path="/gallery3" element={<GalleryPage />} />
        <Route path="/gallery4" element={<GalleryPage />} />
        <Route path="/gallery5" element={<GalleryPage />} />
        <Route path="/gallery6" element={<GalleryPage />} />
        <Route path="/gallery7" element={<GalleryPage />} />
        <Route path="/gallery8" element={<GalleryPage />} />
        <Route path="/gallery9" element={<GalleryPage />} />
        <Route path="/gallery10" element={<GalleryPage />} />
        <Route path="/gallery11" element={<GalleryPage />} />
        <Route path="/gallery12" element={<GalleryPage />} />
        <Route path="/gallery13" element={<GalleryPage />} />
        <Route path="/gallery14" element={<GalleryPage />} />
        <Route path="/gallery15" element={<GalleryPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/schedule-consultation" element={<ScheduleConsultation />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/quote-summary" element={<QuoteSummary />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/form-success" element={<FormSuccess />} />
        <Route path="/form-error" element={<FormError />} />
      </Routes>
    </Router>
  )
}

export default App
