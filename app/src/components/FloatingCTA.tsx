import { motion } from 'framer-motion';
import { X, Phone, Mail, Send } from 'lucide-react';
import { useState } from 'react';

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);
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
    // Here you would typically send the data to your backend
    setTimeout(() => {
      setIsOpen(false);
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
    <>
      {/* Main Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-transparent text-white flex items-center gap-3 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 transition-all"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              <span className="text-sm font-medium">Close</span>
            </>
          ) : (
            <>
              <img src="/assets/logo.png" alt="Krown" className="w-6 h-6" />
              <span className="text-sm font-medium">Need Branding Let's Work Together</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Questionnaire Panel */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-24 right-6 z-50 w-96 max-h-[80vh] overflow-y-auto glass-card p-6 border border-krown-red/20 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ opacity: isOpen ? 1 : 0 }}
      >
        {!isSubmitted ? (
          <>
            {/* Logo Header */}
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/logo.png" alt="Krown" className="w-10 h-10" />
              <div>
                <div className="text-sm font-bold text-white">Need Branding?</div>
                <div className="text-xs text-white/50">Let's Work Together</div>
              </div>
            </div>

            <p className="text-xs text-white/60 mb-6">
              Tell us about your brand and we'll create something amazing for you.
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
      </motion.div>
    </>
  );
}
