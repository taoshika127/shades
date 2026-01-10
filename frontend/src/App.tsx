import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import CategoryPage from './pages/CategoryPage'

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
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
