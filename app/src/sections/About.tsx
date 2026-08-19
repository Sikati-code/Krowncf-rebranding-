import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Crown, Award, Linkedin, Twitter, Instagram, ExternalLink, Sparkles, Target, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const teamMembers = [
  {
    name: 'David Shopekan',
    role: 'Founder & Creative Director',
    isFounder: true,
    initials: 'DS',
    color: 'from-yellow-500 to-amber-600',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
      portfolio: '#'
    }
  },
  {
    name: 'Amina Ibrahim',
    role: 'Lead Designer',
    isFounder: false,
    initials: 'AI',
    color: 'from-krown-red to-krown-red-dark',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    name: 'Chukwuemeka Okafor',
    role: 'Tech Architect',
    isFounder: false,
    initials: 'CO',
    color: 'from-blue-500 to-indigo-600',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    name: 'Fatima Abdullahi',
    role: 'Brand Strategist',
    isFounder: false,
    initials: 'FA',
    color: 'from-purple-500 to-pink-600',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    name: 'Oluwaseun Adeyemi',
    role: 'Operations Head',
    isFounder: false,
    initials: 'OA',
    color: 'from-green-500 to-emerald-600',
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  }
];

const values = [
  { icon: Award, label: 'Excellence' },
  { icon: Target, label: 'Authenticity' },
  { icon: Lightbulb, label: 'Innovation' }
];

const counters = [
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 15000, suffix: '+', label: 'Projects Delivered' },
  { value: 8500, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Countries Served' }
];

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        start = progress * end;

        if (progress < 1) {
          setCount(Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      const timer = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/50">{label}</div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayText, setDisplayText] = useState('');
  const fullText = t('about.intro');

  useEffect(() => {
    if (isInView) {
      let index = 0;
      let lastTime = performance.now();
      let timer: number;

      const animate = (currentTime: number) => {
        if (currentTime - lastTime >= 30) {
          if (index < fullText.length) {
            setDisplayText(fullText.slice(0, index + 1));
            index++;
            lastTime = currentTime;
          } else {
            cancelAnimationFrame(timer);
            return;
          }
        }
        timer = requestAnimationFrame(animate);
      };

      timer = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(timer);
    }
  }, [isInView, fullText]);

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black" />

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-krown-red/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-krown-red/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full">
              <Crown className="w-4 h-4 text-krown-red" />
              <span className="text-sm text-white/70">{t('about.title')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
              {t('about.heading')}{' '}
              <span className="text-gradient">Krown Creative Factory</span>
            </h2>
          </motion.div>

          {/* Story Section - Split Screen */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 sm:mb-32">
            {/* Left - Dynamic Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Rotating 3D-style collage */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-8 rounded-3xl bg-gradient-to-br from-krown-red/20 via-krown-dark to-krown-black border border-white/10 overflow-hidden"
                >
                  {/* Layered elements */}
                  <div className="absolute inset-0">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 20, repeat: Infinity }}
                      className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-krown-red/30 rounded-full"
                    />
                    <motion.div
                      animate={{
                        scale: [1.1, 1, 1.1],
                        rotate: [360, 180, 0]
                      }}
                      transition={{ duration: 15, repeat: Infinity }}
                      className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-white/20 rounded-lg rotate-45"
                    />
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-krown-red/10 rounded-full blur-3xl"
                    />
                  </div>

                  {/* Center Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 40px rgba(220, 38, 38, 0.3)',
                          '0 0 80px rgba(220, 38, 38, 0.5)',
                          '0 0 40px rgba(220, 38, 38, 0.3)',
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-krown-red to-krown-red-dark flex items-center justify-center"
                    >
                      <img
                        src="/assets/logo.png"
                        alt="Krown Logo"
                        className="w-16 h-16 sm:w-20 sm:h-20"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute top-4 right-8 glass px-4 py-3 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-krown-red" />
                    <div>
                      <div className="text-sm font-bold text-white">{t('about.badge1')}</div>
                      <div className="text-[10px] text-white/50">{t('about.badge1Sub')}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-8 left-4 glass px-4 py-3 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm font-bold text-white">{t('about.badge2')}</div>
                      <div className="text-[10px] text-white/50">{t('about.badge2Sub')}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Animated Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="relative">
                <div className="text-lg sm:text-xl text-white/80 leading-relaxed min-h-[120px]">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-0.5 h-6 bg-krown-red ml-1"
                  />
                </div>
              </div>

              <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                {t('about.description')}
              </p>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-medium rounded-full hover:shadow-glow transition-all duration-300"
              >
                {t('about.cta')}
                <Crown className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>

          {/* Dynamic Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 sm:mb-32"
          >
            {counters.map((counter, index) => (
              <motion.div
                key={counter.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 sm:p-8 text-center"
              >
                <Counter value={counter.value} suffix={counter.suffix} label={counter.label} />
              </motion.div>
            ))}
          </motion.div>

          {/* Values Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mb-24 sm:mb-32"
          >
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -5, 0] }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  className="flex items-center gap-3 px-6 py-4 glass rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-krown-red/20 to-krown-red/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-krown-red" />
                  </div>
                  <span className="text-lg font-semibold text-white">{value.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-12 sm:mb-16">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {t('about.team')}{' '}
                <span className="text-gradient">{t('about.teamSub')}</span>
              </h3>
              <p className="text-base sm:text-lg text-white/50">
                {t('about.teamDesc')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative group ${member.isFounder ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <div className={`glass-card p-6 sm:p-8 h-full transition-all duration-300 ${member.isFounder
                      ? 'border-2 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)]'
                      : 'hover:border-krown-red/30'
                    }`}>
                    {/* Avatar */}
                    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center ${member.isFounder ? 'shadow-[0_0_20px_rgba(234,179,8,0.5)]' : ''
                      }`}>
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        {member.initials}
                      </span>
                      {member.isFounder && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-1 border-2 border-dashed border-yellow-500/30 rounded-2xl"
                        />
                      )}
                    </div>

                    {/* Name & Role */}
                    <div className="text-center mb-4">
                      <h4 className={`text-lg sm:text-xl font-bold text-white mb-1 ${member.isFounder ? 'text-yellow-400' : ''}`}>
                        {member.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/60">{member.role}</p>
                      {member.isFounder && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 mt-2 bg-yellow-500/20 rounded-full">
                          <Crown className="w-3 h-3 text-yellow-400" />
                          <span className="text-[10px] text-yellow-400 font-medium">{t('about.founder')}</span>
                        </div>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-2">
                      {member.social.linkedin && (
                        <motion.a
                          href={member.social.linkedin}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.a>
                      )}
                      {member.social.twitter && (
                        <motion.a
                          href={member.social.twitter}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Twitter className="w-4 h-4" />
                        </motion.a>
                      )}
                      {member.social.instagram && (
                        <motion.a
                          href={member.social.instagram}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Instagram className="w-4 h-4" />
                        </motion.a>
                      )}
                      {member.social.portfolio && (
                        <motion.a
                          href={member.social.portfolio}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
