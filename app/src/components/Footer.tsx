import { motion } from 'framer-motion';
import { 
  Crown, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Send
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '#categories' },
  { name: 'Podcast', href: '#podcasts' },
  { name: 'Entertainment', href: '#entertainment' },
  { name: 'Latest', href: '/latest' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

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
  };

  return (
    <footer id="contact" className="relative pt-20 sm:pt-28 lg:pt-32 pb-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark to-krown-black" />
      
      {/* Top Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-krown-red/30 to-transparent" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 overflow-hidden relative"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-krown-red/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
              <div className="text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {t('footer.newsletter.title')}
                </h3>
                <p className="text-sm sm:text-base text-white/50">
                  {t('footer.newsletter.subtitle')}
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 lg:w-80">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('footer.newsletter.placeholder')}
                      className="w-full h-12 pl-4 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-krown-red/50 focus:bg-white/10 transition-all"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="h-12 px-6 bg-krown-red text-white font-medium rounded-xl hover:bg-krown-red-dark transition-all duration-300 hover:shadow-glow flex items-center justify-center gap-2 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubscribed ? (
                      <>
                        {t('footer.newsletter.subscribed')}
                        <Crown className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        {t('footer.newsletter.subscribe')}
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <motion.a 
                href="/"
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-xl bg-krown-red/20 flex items-center justify-center"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src="/assets/logo.png" 
                    alt="Krown Logo" 
                    className="w-5 h-5"
                  />
                </motion.div>
                <div>
                  <div className="text-lg font-bold text-white tracking-wider">KROWN</div>
                  <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Creative Factory</div>
                </div>
              </motion.a>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                {t('footer.brand.description')}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-krown-red hover:border-krown-red/30 transition-all duration-300"
                    aria-label={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="text-sm text-white/40 hover:text-krown-red transition-colors duration-200 flex items-center gap-1.5 group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        <ArrowRight />
                      </motion.span>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {t('footer.categories')}
              </h4>
              <ul className="space-y-2.5">
                {['Festivities', 'Church Flyers', 'Birthday Designs', 'PNGs', 'Fonts', 'Party Flyers'].map((cat, index) => (
                  <li key={cat}>
                    <motion.a
                      href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-white/40 hover:text-krown-red transition-colors duration-200 flex items-center gap-1.5 group"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200"
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        <ArrowRight />
                      </motion.span>
                      {cat}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Our Office
              </h4>
              <ul className="space-y-3">
                <motion.li
                  key={t('location.full')}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  <MapPin className="w-4 h-4 text-krown-red mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-white/40">{t('location.flag')} {t('location.full')}</span>
                    <span className="text-xs text-white/30">{t('location.language')}</span>
                  </div>
                </motion.li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-krown-red flex-shrink-0" />
                  <a href="tel:+2348136804699" className="text-sm text-white/40 hover:text-krown-red transition-colors">
                    🇳🇬 +234 813 680 4699 (Nigeria)
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-krown-red flex-shrink-0" />
                  <a href="tel:+237680200704" className="text-sm text-white/40 hover:text-krown-red transition-colors">
                    🇨🇲 +237 680 20 07 04 (Cameroon)
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-krown-red flex-shrink-0" />
                  <a href="mailto:Info@krowncf.com" className="text-sm text-white/40 hover:text-krown-red transition-colors">
                    Info@krowncf.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-krown-red flex-shrink-0" />
                  <a href="mailto:krownassets@gmail.com" className="text-sm text-white/40 hover:text-krown-red transition-colors">
                    krownassets@gmail.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-6 sm:pt-8 border-t border-white/5"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-white/30 text-center sm:text-left">
                {t('footer.copyright')}
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <a href="#terms" className="text-xs sm:text-sm text-white/30 hover:text-white/60 transition-colors">
                  {t('footer.terms')}
                </a>
                <a href="#privacy" className="text-xs sm:text-sm text-white/30 hover:text-white/60 transition-colors">
                  {t('footer.privacy')}
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                  className="text-xs sm:text-sm text-white/30 hover:text-krown-orange transition-colors"
                >
                  {t('footer.contact')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
