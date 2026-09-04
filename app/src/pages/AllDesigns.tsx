import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { logos } from '../data/logos';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Sparkles, X, Send, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function AllDesigns() {
  const { language, t } = useLanguage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brandName: '',
    description: '',
    targetAudience: '',
    brandColors: '',
    logoType: '',
    brandValue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsSubmitted(false);
      setFormData({
        brandName: '',
        description: '',
        targetAudience: '',
        brandColors: '',
        logoType: '',
        brandValue: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/#portfolio"
              className="inline-flex items-center gap-2 text-krown-red hover:text-krown-orange transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'fr' ? 'Retour' : 'Back'}
            </Link>
            <p className="mb-2 text-sm uppercase tracking-wider text-krown-red">{t('portfolio.title')}</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {language === 'fr' ? 'Tous les Designs' : 'All Designs'}
            </h1>
            <p className="text-white/60 text-lg">
              {language === 'fr' 
                ? `${logos.length} logos de marques créatifs` 
                : `${logos.length} creative brand logos`}
            </p>
          </div>

          {/* Designs Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {logos.map((logo, index) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/design/${logo.id}`}>
                  <div className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer border border-white/10 hover:border-krown-red/30">
                    <div className="bg-white aspect-square flex items-center justify-center mb-3 rounded-xl">
                      <img 
                        src={logo.image} 
                        alt={logo.name}
                        className="w-full h-full object-contain max-h-[120px]"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white truncate mb-1">{logo.name}</h3>
                    <p className="text-xs text-white/60 truncate">{logo.industry}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Need Branding CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16"
          >
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-krown-red/20 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-krown-red/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-krown-orange/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-krown-red to-krown-red-dark mb-6"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {language === 'fr' ? 'Besoin d\'un logo personnalisé ?' : 'Need a Custom Logo?'}
                </h2>

                <p className="text-base sm:text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                  {language === 'fr'
                    ? 'Laissez nos experts créer une identité de marque unique qui se démarque. Transformez votre vision en réalité.'
                    : 'Let our experts create a unique brand identity that stands out. Transform your vision into reality.'}
                </p>

                <motion.button
                  onClick={() => setIsPopupOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-krown-red to-krown-orange text-white font-semibold rounded-xl hover:shadow-glow transition-all"
                  style={{ backgroundSize: '200% auto' }}
                >
                  <Sparkles className="w-5 h-5" />
                  {language === 'fr' ? 'Commencer Votre Projet' : 'Start Your Project'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Questionnaire Popup */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass-card p-6 border border-krown-red/20 rounded-2xl">
                {!isSubmitted ? (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <img src="/assets/KCF Logo Rebrand Main.jpg" alt="Krown" className="w-10 h-10" />
                        <div>
                          <div className="text-sm font-bold text-white">Need Branding?</div>
                          <div className="text-xs text-white/50">Let's Work Together</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsPopupOpen(false)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs text-white/60 mb-6">
                      Tell us about your brand, and we'll create something amazing for you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Brand Name */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          What is your Brand Name?
                        </label>
                        <input
                          type="text"
                          name="brandName"
                          value={formData.brandName}
                          onChange={handleChange}
                          placeholder="e.g., Royal Events"
                          className="w-full px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-krown-red/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                          required
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Brief description of what the Brand does
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="We are an event planning company specializing in weddings and corporate events..."
                          rows={3}
                          className="w-full px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-krown-red/50 focus:bg-white/10 transition-all placeholder:text-white/30 resize-none"
                          required
                        />
                      </div>

                      {/* Target Audience */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Target audience
                        </label>
                        <input
                          type="text"
                          name="targetAudience"
                          value={formData.targetAudience}
                          onChange={handleChange}
                          placeholder="e.g., Young professionals, ages 25-40, middle to upper income"
                          className="w-full px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-krown-red/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                          required
                        />
                      </div>

                      {/* Brand Colors */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Any Brand color in mind?
                        </label>
                        <input
                          type="text"
                          name="brandColors"
                          value={formData.brandColors}
                          onChange={handleChange}
                          placeholder="e.g., Royal blue and gold, or open to suggestions"
                          className="w-full px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-krown-red/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                        />
                      </div>

                      {/* Logo Type */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Logo type (Icon, Text or Initials)
                        </label>
                        <select
                          name="logoType"
                          value={formData.logoType}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-krown-red/50 focus:bg-white/10 transition-all"
                          required
                        >
                          <option value="" className="bg-krown-dark">Select logo type</option>
                          <option value="icon" className="bg-krown-dark">Icon</option>
                          <option value="text" className="bg-krown-dark">Text</option>
                          <option value="initials" className="bg-krown-dark">Initials</option>
                          <option value="combination" className="bg-krown-dark">Combination</option>
                        </select>
                      </div>

                      {/* Brand Value */}
                      <div>
                        <label className="block text-xs font-medium text-white/70 mb-1.5">
                          Brand value (what do you want the audience to see or feel?)
                        </label>
                        <textarea
                          name="brandValue"
                          value={formData.brandValue}
                          onChange={handleChange}
                          placeholder="I want people to feel luxury, trust, and elegance when they see my logo..."
                          rows={2}
                          className="w-full px-3 py-2.5 text-sm text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-krown-red/50 focus:bg-white/10 transition-all placeholder:text-white/30 resize-none"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(220, 38, 38, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-krown-red via-krown-red-dark to-krown-red text-white text-sm font-semibold rounded-lg border border-krown-red/30 hover:border-krown-red/50 transition-all flex items-center justify-center gap-2 shadow-lg"
                        style={{ backgroundSize: '200% auto' }}
                      >
                        <Send className="w-4 h-4" />
                        Submit Request
                      </motion.button>
                    </form>

                    {/* Contact Info */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/50 mb-3 text-center">
                        For branding inquiries, email us at krownassets@gmail.com
                      </p>
                      <div className="flex gap-2">
                        <a
                          href="tel:+2348136804699"
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call
                        </a>
                        <a
                          href="mailto:krownassets@gmail.com"
                          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Success Message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-krown-red to-krown-red-dark flex items-center justify-center">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-sm text-white/60">
                      We'll get back to you within 24 hours
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
