import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Coins,
  ArrowRight,
} from 'lucide-react';
import LoginModal from './LoginModal';
import SearchModal from './SearchModal';
import Cart from './Cart';
import LanguageToggle from './LanguageToggle';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useModalA11y } from '../hooks/use-modal-a11y';
import { COMPANY_ITEMS, EXPLORE_ITEMS, NAV_ITEMS, isNavActive, navItem, type NavItem } from '../data/navigation';

// Desktop bar: Home · Explore ▾ · Training · About · Contact (Training replaces the old "Latest").
const DESKTOP_LINKS = ['home', 'training', 'about', 'contact'].map(navItem);
const PRICING = navItem('pricing');

export default function Header() {
  const { t } = useLanguage();
  const { user } = useUser();
  const { pathname, hash } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const { cartItems, cartCount, removeFromCart } = useCart();
  const exploreTimer = useRef<number | undefined>(undefined);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileFirstRef = useRef<HTMLButtonElement>(null);

  // Sticky header that slides away while scrolling down and returns on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setIsScrollHidden(delta > 0 && y > 160);
        lastY = y;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => () => window.clearTimeout(exploreTimer.current), []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  useModalA11y(isMobileMenuOpen, closeMobileMenu, mobileNavRef, mobileFirstRef);

  const isHidden = isScrollHidden && !isMobileMenuOpen && !isExploreOpen && !isContactDropdownOpen;
  const active = (item: NavItem) => isNavActive(item, pathname, hash);
  // Training has its own top-level link, so it doesn't also light up "Explore".
  const exploreActive = EXPLORE_ITEMS.some((item) => item.id !== 'training' && active(item));

  const openExplore = () => {
    window.clearTimeout(exploreTimer.current);
    setIsExploreOpen(true);
  };
  const closeExploreSoon = () => {
    window.clearTimeout(exploreTimer.current);
    exploreTimer.current = window.setTimeout(() => setIsExploreOpen(false), 160);
  };

  const linkClass = (on: boolean) =>
    `relative px-3 xl:px-4 py-2 text-sm transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-krown-red/60 rounded-full ${
      on ? 'text-white' : 'text-white/70 hover:text-white'
    }`;

  // Hover: a red underline grows from the centre. Active: a glowing bar that glides between links.
  const indicators = (on: boolean) => (
    <>
      <span
        aria-hidden="true"
        className="absolute left-3 right-3 xl:left-4 xl:right-4 -bottom-0.5 h-0.5 rounded-full bg-krown-red/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      />
      {on && (
        <motion.span
          layoutId="nav-active"
          aria-hidden="true"
          className="absolute left-3 right-3 xl:left-4 xl:right-4 -bottom-0.5 h-0.5 rounded-full bg-krown-red shadow-glow"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
    </>
  );

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${isScrolled
          ? 'bg-krown-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Logo */}
            <Link
              to="/"
              aria-label="Krown Creative Factory"
              className="flex items-center group flex-shrink-0"
            >
              <img
                src="/assets/logo.png"
                alt="Krown Logo"
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-h-full object-contain origin-left scale-125 sm:scale-150"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label={t('nav.main')} className="hidden lg:flex items-center gap-1">
              <Link to="/" aria-current={active(DESKTOP_LINKS[0]) ? 'page' : undefined} className={linkClass(active(DESKTOP_LINKS[0]))}>
                {t('nav.home')}
                {indicators(active(DESKTOP_LINKS[0]))}
              </Link>

              {/* Explore mega menu */}
              <div
                className="relative"
                onMouseEnter={openExplore}
                onMouseLeave={closeExploreSoon}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsExploreOpen(false);
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsExploreOpen(false);
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsExploreOpen((v) => !v)}
                  aria-expanded={isExploreOpen}
                  aria-haspopup="true"
                  aria-controls="explore-menu"
                  className={`${linkClass(exploreActive || isExploreOpen)} flex items-center gap-1`}
                >
                  {t('nav.explore')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExploreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  {indicators(exploreActive)}
                </button>
                <AnimatePresence>
                  {isExploreOpen && (
                    <motion.div
                      id="explore-menu"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px] origin-top"
                    >
                      <div className="glass-card rounded-2xl border border-white/10 bg-krown-dark/95 backdrop-blur-xl p-3 shadow-2xl">
                        <ul className="grid grid-cols-2 gap-1">
                          {EXPLORE_ITEMS.map((item, i) => {
                            const on = active(item);
                            return (
                              <motion.li
                                key={item.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.03 * i }}
                              >
                                <Link
                                  to={item.to}
                                  onClick={() => setIsExploreOpen(false)}
                                  aria-current={on ? 'page' : undefined}
                                  className={`group/item flex items-start gap-3 rounded-xl p-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-krown-red/60 ${
                                    on ? 'bg-krown-red/10' : 'hover:bg-white/5'
                                  }`}
                                >
                                  <span
                                    className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-glow ${
                                      on ? 'bg-krown-red/20 border-krown-red/40' : 'bg-white/5 border-white/10'
                                    }`}
                                  >
                                    <item.icon className={`w-5 h-5 ${on ? 'text-krown-red' : 'text-krown-orange'}`} aria-hidden="true" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className={`block text-sm font-semibold ${on ? 'text-white' : 'text-white/90 group-hover/item:text-white'}`}>
                                      {t(item.labelKey)}
                                    </span>
                                    <span className="block text-xs text-white/50 leading-snug mt-0.5">{t(item.descKey)}</span>
                                  </span>
                                </Link>
                              </motion.li>
                            );
                          })}
                        </ul>
                        <Link
                          to={PRICING.to}
                          onClick={() => setIsExploreOpen(false)}
                          className="group/pricing mt-2 flex items-center justify-between gap-3 rounded-xl border border-krown-orange/30 bg-gradient-to-r from-krown-red/10 to-krown-orange/10 px-4 py-3 hover:border-krown-orange/60 transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <Coins className="w-4 h-4 text-krown-orange" aria-hidden="true" />
                            <span>
                              <span className="block text-sm font-semibold text-white">{t(PRICING.labelKey)}</span>
                              <span className="block text-xs text-white/50">{t(PRICING.descKey)}</span>
                            </span>
                          </span>
                          <ArrowRight className="w-4 h-4 text-krown-orange transition-transform group-hover/pricing:translate-x-1" aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {DESKTOP_LINKS.slice(1).map((item) => {
                const on = active(item);
                return (
                  <Link key={item.id} to={item.to} aria-current={on ? 'page' : undefined} className={linkClass(on)}>
                    {t(item.labelKey)}
                    {indicators(on)}
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search - Desktop */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('search.short')}
                    aria-label={t('search.short')}
                    onClick={() => setIsSearchModalOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setIsSearchModalOpen(true);
                    }}
                    readOnly
                    className="w-48 lg:w-56 xl:w-64 h-9 pl-4 pr-10 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-krown-orange/50 focus:bg-white/10 transition-all duration-300 cursor-pointer"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                </div>
              </div>

              {/* Search - Mobile (Always Visible) */}
              <motion.button
                onClick={() => setIsSearchModalOpen(true)}
                aria-label={t('search.short')}
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
                        <a href="mailto:info@krowncf.com" className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                          <Mail className="w-4 h-4 text-krown-red" />
                          <span>info@krowncf.com</span>
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

              {/* Login / Account - Desktop */}
              {user.signedIn ? (
                <Link
                  to="/account"
                  aria-label={t('account.linkAria').replace('{count}', String(user.credits))}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-sm font-medium text-krown-black bg-white rounded-full hover:bg-krown-red hover:text-white transition-all duration-300"
                >
                  <Coins className="w-4 h-4" aria-hidden="true" />
                  {user.credits}
                </Link>
              ) : (
                <motion.button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden sm:block px-4 sm:px-5 py-2 text-sm font-medium text-krown-black bg-white rounded-full hover:bg-krown-red hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMobileMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <motion.nav
              id="mobile-menu"
              ref={mobileNavRef}
              aria-label={t('nav.main')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[88vw] bg-krown-dark border-l border-white/10 pt-24 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain"
            >
              {/* Mobile Search */}
              <button
                ref={mobileFirstRef}
                type="button"
                onClick={() => { closeMobileMenu(); setIsSearchModalOpen(true); }}
                className="relative mb-5 w-full min-h-[48px] pl-4 pr-10 bg-white/5 border border-white/10 rounded-xl text-left text-sm text-white/40 hover:border-krown-orange/50 transition-colors"
              >
                {t('search.short')}
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden="true" />
              </button>

              {/* Mobile Language Toggle */}
              <div className="mb-5 flex items-center justify-between">
                <span className="text-white/70 text-sm font-medium">{t('nav.language')}</span>
                <LanguageToggle />
              </div>

              {(
                [
                  { title: null, items: [navItem('home')] },
                  { title: t('nav.explore'), items: EXPLORE_ITEMS },
                  { title: t('nav.company'), items: COMPANY_ITEMS },
                ] as const
              ).map((group, g) => (
                <div key={g} className={g > 0 ? 'mt-5' : ''}>
                  {group.title && (
                    <p className="px-4 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">{group.title}</p>
                  )}
                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      const on = active(item);
                      return (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 + NAV_ITEMS.indexOf(item) * 0.035 }}
                        >
                          <Link
                            to={item.to}
                            onClick={closeMobileMenu}
                            aria-current={on ? 'page' : undefined}
                            className={`relative flex items-center gap-3 min-h-[48px] px-4 rounded-xl transition-all duration-200 ${
                              on ? 'bg-krown-red/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {on && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-krown-red shadow-glow" aria-hidden="true" />}
                            <item.icon className={`w-4 h-4 shrink-0 ${on ? 'text-krown-red' : 'text-krown-orange'}`} aria-hidden="true" />
                            <span className="text-[15px]">{t(item.labelKey)}</span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-white/10">
                {user.signedIn ? (
                  <Link
                    to="/account"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center w-full min-h-[48px] text-sm font-medium text-krown-black bg-krown-red rounded-lg hover:bg-krown-red-dark transition-colors"
                  >
                    {t('account.linkAria').replace('{count}', String(user.credits))}
                  </Link>
                ) : (
                  <button
                    onClick={() => { closeMobileMenu(); setIsLoginModalOpen(true); }}
                    className="w-full min-h-[48px] text-sm font-medium text-krown-black bg-krown-red rounded-lg hover:bg-krown-red-dark transition-colors"
                  >
                    Login
                  </button>
                )}
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
      />
    </>
  );
}
