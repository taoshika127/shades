import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import CategoryPage from './pages/CategoryPage'
import GalleryPage from './pages/GalleryPage'

function App() {
  return (
    <Router>
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
        <Route path="/quote" element={<Quote />} />
      </Routes>
    </Router>
  )
}

export default App
