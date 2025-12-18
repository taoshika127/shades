import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shades from './pages/Shades'
import Contact from './pages/Contact'
import CategoryPage from './pages/CategoryPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shades" element={<Shades />} />
        <Route path="/shades/:categorySlug" element={<CategoryPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
