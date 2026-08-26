import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Latest from './pages/Latest'
import CategoryPage from './pages/CategoryPage'
import DesignDetail from './pages/DesignDetail'
import AllDesigns from './pages/AllDesigns'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/latest" element={<Latest />} />
      <Route path="/categories/:slug" element={<CategoryPage />} />
      <Route path="/design/:id" element={<DesignDetail />} />
      <Route path="/all-designs" element={<AllDesigns />} />
    </Routes>
  )
}
