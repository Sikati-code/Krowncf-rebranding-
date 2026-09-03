import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown
} from 'lucide-react';
import LoginModal from './LoginModal';
import SearchModal from './SearchModal';
import Cart from './Cart';
import LanguageToggle from './LanguageToggle';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

const navLinks = [
  { key: 'nav.home', href: '/', isRoute: true },
  { key: 'nav.categories', href: '#categories', isRoute: false },
  { key: 'nav.podcast', href: '#podcasts', isRoute: false },
  { key: 'nav.entertainment', href: '#entertainment', isRoute: false },
  { key: 'nav.latest', href: '/latest', isRoute: true },
  { key: 'nav.about', href: '/about', isRoute: true },
  { key: 'nav.contact', href: '/contact', isRoute: true },
];

export default function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const { cartItems, cartCount, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      // Scroll to section on current page
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to route
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = href;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-krown-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group flex-shrink-0"
            >
              <img
                src="/assets/logo.png"
                alt="Krown Logo"
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-h-full object-contain origin-left scale-110 sm:scale-125"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                link.isRoute ? (
                  <Link
                    key={link.key}
                    to={link.href}
                    className="relative px-3 xl:px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-300 group"
                  >
                    {t(link.key)}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-krown-red rounded-full"
                      whileHover={{ width: '50%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ) : (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="relative px-3 xl:px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-300 group"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    {t(link.key)}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-krown-red rounded-full"
                      whileHover={{ width: '50%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                )
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search - Desktop */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    onClick={() => setIsSearchModalOpen(true)}
                    readOnly
                    className="w-48 lg:w-56 xl:w-64 h-9 pl-4 pr-10 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-krown-orange/50 focus:bg-white/10 transition-all duration-300 cursor-pointer"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              </div>

              {/* Search - Mobile (Always Visible) */}
              <motion.button
                onClick={() => setIsSearchModalOpen(true)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* Language Toggle - Desktop/Mobile (Always Visible) */}
              <div className="block">
                <LanguageToggle />
              </div>

              {/* Contact Dropdown */}
              <div className="relative hidden lg:block">
                <motion.button
                  onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4" />
                  <ChevronDown className={`w-3 h-3 transition-transform ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>
                <AnimatePresence>
                  {isContactDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-64 glass-card rounded-xl border border-white/10 overflow-hidden z-50"
                    >
                      <div className="p-4 space-y-3">
                        <a href="tel:+2348136804699" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                          <Phone className="w-4 h-4 text-krown-red" />
                          <span>🇳🇬 +234 813 680 4699</span>
                        </a>
                        <a href="tel:+237680200704" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                          <Phone className="w-4 h-4 text-krown-red" />
                          <span>🇨🇲 +237 680 20 07 04</span>
                        </a>
                        <a href="mailto:Info@krowncf.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                          <Mail className="w-4 h-4 text-krown-red" />
                          <span>Info@krowncf.com</span>
                        </a>
                        <a href="mailto:krownassets@gmail.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                          <Mail className="w-4 h-4 text-krown-red" />
                          <span>krownassets@gmail.com</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-krown-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>

              {/* Login - Desktop */}
              <motion.button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:block px-4 sm:px-5 py-2 text-sm font-medium text-krown-black bg-white rounded-full hover:bg-krown-red hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-krown-dark border-l border-white/10 pt-20 px-6"
            >
              {/* Mobile Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search designs, templates..."
                  onClick={() => { setIsMobileMenuOpen(false); setIsSearchModalOpen(true); }}
                  readOnly
                  className="w-full h-10 pl-4 pr-10 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-krown-orange/50 cursor-pointer"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              </div>

              {/* Mobile Language Toggle */}
              <div className="mb-6 flex items-center justify-between">
                <span className="text-white/70 text-sm font-medium">Language</span>
                <LanguageToggle />
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  link.isRoute ? (
                    <Link
                      key={link.key}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      {t(link.key)}
                    </Link>
                  ) : (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      {t(link.key)}
                    </motion.a>
                  )
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full py-3 text-sm font-medium text-krown-black bg-krown-red rounded-lg hover:bg-krown-red-dark transition-colors"
                >
                  Login
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
}
