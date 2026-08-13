import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Crown, Mail, MessageCircle, Phone, Send, X, Minimize2, Sparkles, MessageSquare, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@krown.com',
    link: 'mailto:hello@krown.com',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:border-blue-500/50'
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+234 800 000 0000',
    link: 'https://wa.me/2348000000000',
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:border-green-500/50'
  },
  {
    icon: MessageSquare,
    label: 'Messenger',
    value: 'Krown Creative',
    link: 'https://m.me/krowncreative',
    color: 'from-blue-400 to-blue-500',
    hoverColor: 'hover:border-blue-400/50'
  },
  {
    icon: Sparkles,
    label: 'Instagram',
    value: '@krowncreative',
    link: 'https://instagram.com/krowncreative',
    color: 'from-pink-500 to-purple-600',
    hoverColor: 'hover:border-pink-500/50'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 800 000 0000',
    link: 'tel:+2348000000000',
    color: 'from-krown-red to-krown-red-dark',
    hoverColor: 'hover:border-krown-red/50'
  }
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: t('contact.chat.greeting'), isBot: true }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Form validation state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        text: chatInput,
        isBot: false
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');

      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "Thanks for your message! Our team will get back to you shortly.",
          isBot: true
        }]);
      }, 1000);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black" />
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(90deg, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(220, 38, 38, 0.1) 100%)',
            backgroundSize: '200% 200%'
          }}
        />
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-krown-red/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-krown-red/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full">
              <Crown className="w-4 h-4 text-krown-red" />
              <span className="text-sm text-white/70">{t('contact.title')}</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
            >
              Let's Create Something{' '}
              <motion.span
                className="text-gradient"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% auto'
                }}
              >
                Legendary
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto"
            >
              Ready to bring your vision to life? Get in touch with our team and let's create something extraordinary together.
            </motion.p>
          </motion.div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 sm:mb-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl"
                    >
                      <p className="text-sm text-green-400 text-center">{t('contact.sent')}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`peer w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:bg-white/10 transition-all ${errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-krown-red/50'}`}
                    placeholder={t('contact.name')}
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-4 top-4 text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-krown-red peer-focus:bg-krown-dark peer-focus:px-2 peer-focus:rounded"
                  >
                    {t('contact.name')}
                  </label>
                  {errors.fullName && (
                    <p className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.fullName}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-krown-red/10 opacity-0 peer-focus:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)' }} />
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`peer w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:bg-white/10 transition-all ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-krown-red/50'}`}
                    placeholder={t('contact.email')}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-krown-red peer-focus:bg-krown-dark peer-focus:px-2 peer-focus:rounded"
                  >
                    {t('contact.email')}
                  </label>
                  {errors.email && (
                    <p className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.email}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-krown-red/10 opacity-0 peer-focus:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)' }} />
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`peer w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:bg-white/10 transition-all ${errors.phone ? 'border-red-500' : 'border-white/10 focus:border-krown-red/50'}`}
                    placeholder={t('contact.phone')}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-4 top-4 text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-krown-red peer-focus:bg-krown-dark peer-focus:px-2 peer-focus:rounded"
                  >
                    {t('contact.phone')}
                  </label>
                  {errors.phone && (
                    <p className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.phone}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-krown-red/10 opacity-0 peer-focus:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)' }} />
                </div>

                {/* Subject */}
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`peer w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:bg-white/10 transition-all ${errors.subject ? 'border-red-500' : 'border-white/10 focus:border-krown-red/50'}`}
                    placeholder={t('contact.subject')}
                  />
                  <label
                    htmlFor="subject"
                    className="absolute left-4 top-4 text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-krown-red peer-focus:bg-krown-dark peer-focus:px-2 peer-focus:rounded"
                  >
                    {t('contact.subject')}
                  </label>
                  {errors.subject && (
                    <p className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.subject}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-krown-red/10 opacity-0 peer-focus:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)' }} />
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`peer w-full px-4 py-4 bg-white/5 border rounded-xl text-white placeholder-transparent focus:outline-none focus:bg-white/10 transition-all resize-none ${errors.message ? 'border-red-500' : 'border-white/10 focus:border-krown-red/50'}`}
                    placeholder={t('contact.message')}
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-4 text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-krown-red peer-focus:bg-krown-dark peer-focus:px-2 peer-focus:rounded"
                  >
                    {t('contact.message')}
                  </label>
                  {errors.message && (
                    <p className="absolute -bottom-5 left-0 text-xs text-red-400">{errors.message}</p>
                  )}
                  <div className="absolute inset-0 rounded-xl bg-krown-red/10 opacity-0 peer-focus:opacity-100 transition-opacity pointer-events-none" style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)' }} />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-full py-4 bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-medium rounded-xl hover:shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundSize: '200% auto' }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.send')}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Direct Contact Links */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {t('contact.direct')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`glass-card p-6 rounded-xl border border-white/10 ${method.hoverColor} transition-all duration-300 group`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{method.label}</h4>
                    <p className="text-sm text-white/60">{method.value}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Office Location - Dynamic based on language */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {t('contact.office')}
              </h3>
              <motion.div
                key={t('location.full')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-5 rounded-xl border border-white/10 hover:border-krown-red/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-krown-red/20 to-krown-red-dark/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{t('location.flag')}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{t('location.full')}</h4>
                    <p className="text-sm text-white/50">{t('location.language')}</p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-krown-red hover:text-krown-orange transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      {t('contact.viewMap')}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mini Chat Widget */}
      <AnimatePresence>
        {isChatOpen && !isChatMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-card border border-krown-red/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-krown-red to-krown-red-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Krown Support</h4>
                  <p className="text-xs text-white/70">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsChatMinimized(true)}
                  className="p-1.5 text-white/70 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.isBot
                      ? 'bg-white/10 text-white'
                      : 'bg-gradient-to-r from-krown-red to-krown-red-dark text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('contact.chat.placeholder')}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-krown-red/50 transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-krown-red to-krown-red-dark rounded-xl text-white transition-all"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Chat Bubble */}
      <AnimatePresence>
        {isChatOpen && isChatMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatMinimized(false)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-krown-red to-krown-red-dark text-white shadow-glow flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-krown-red to-krown-red-dark text-white shadow-glow flex items-center justify-center relative"
            >
              <MessageSquare className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-krown-dark" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
