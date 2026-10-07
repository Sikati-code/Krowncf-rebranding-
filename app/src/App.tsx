import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Latest from './pages/Latest'
import CategoryPage from './pages/CategoryPage'
import DesignDetail from './pages/DesignDetail'
import AllDesigns from './pages/AllDesigns'
import Pricing from './pages/Pricing'
import Account from './pages/Account'
import PaymentCallback from './pages/PaymentCallback'
import SectionPage from './pages/SectionPage'
import TopProgress from './components/TopProgress'
import QuickJump from './components/QuickJump'
import { HASH_ALIASES } from './data/navigation'

/** `/#categories`-style links work from any page: wait for the section to render, then glide to it. */
function useHashScroll() {
  const { hash, key } = useLocation()
  useEffect(() => {
    if (!hash) return
    const raw = decodeURIComponent(hash.slice(1))
    const id = HASH_ALIASES[raw] ?? raw
    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el || ++tries > 40) {
        window.clearInterval(timer)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
    return () => window.clearInterval(timer)
  }, [hash, key])
}

export default function App() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const reduceMotion = useReducedMotion()
  useHashScroll()

  // New page (not back/forward, no #section): start at the top once the old page has faded out.
  const onExitComplete = () => {
    if (navigationType !== 'POP' && !location.hash) window.scrollTo({ top: 0 })
  }

  return (
    <>
      <TopProgress />
      <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
        {/* Opacity only: a transform here would break the pages' fixed headers and modals. */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/categories" element={<SectionPage section="categories" />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/training" element={<SectionPage section="training" />} />
            <Route path="/podcast" element={<SectionPage section="podcast" />} />
            <Route path="/podcasts" element={<SectionPage section="podcast" />} />
            <Route path="/entertainment" element={<SectionPage section="entertainment" />} />
            <Route path="/design/:id" element={<DesignDetail />} />
            <Route path="/designs/all" element={<AllDesigns />} />
            <Route path="/all-designs" element={<AllDesigns />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/account" element={<Account />} />
            <Route path="/payment/callback/:gateway" element={<PaymentCallback />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <QuickJump />
    </>
  )
}
