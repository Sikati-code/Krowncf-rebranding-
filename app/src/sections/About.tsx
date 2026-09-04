import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Crown, Award, Linkedin, Instagram, Sparkles, Target, Lightbulb, Facebook, Github, Mail, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

import { teamMembers } from '../data/team';

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
  const { t, language } = useLanguage();
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
                        src="/assets/KCF Logo Rebrand Main.jpg"
                        alt="Krown Logo"
                        className="w-full h-full object-contain"
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

            <div className="space-y-8">
              {/* Founder - Majestic Display */}
              {teamMembers.filter(m => m.isFounder).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="glass-card p-8 sm:p-12 border-2 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.3)] rounded-3xl"
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Founder Image */}
                      <div className="relative">
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 30px rgba(234,179,8,0.3)',
                              '0 0 60px rgba(234,179,8,0.5)',
                              '0 0 30px rgba(234,179,8,0.3)',
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                        >
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-contain object-center" />
                          ) : (
                            <span className="text-4xl font-bold text-gray-800">{member.name.split(' ').map(n => n[0]).join('')}</span>
                          )}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-2 border-2 border-dashed border-yellow-500/50 rounded-2xl pointer-events-none"
                          />
                        </motion.div>
                        {/* Crown Badge */}
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 rounded-full shadow-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            <span className="text-sm font-bold">Founder</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Founder Info */}
                      <div className="text-center md:text-left">
                        <h4 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">{member.name}</h4>
                        <p className="text-lg text-white/90 mb-4">{language === 'fr' ? member.roleFr : member.role}</p>
                        <p className="text-sm sm:text-base text-white/60 mb-6 leading-relaxed">
                          {language === 'fr' ? member.bioFr : member.bio}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex justify-center md:justify-start gap-3">
                          {member.social?.instagram && (
                            <motion.a
                              href={member.social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 transition-all"
                            >
                              <Instagram className="w-5 h-5" />
                            </motion.a>
                          )}
                          {member.social?.facebook && (
                            <motion.a
                              href={member.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 transition-all"
                            >
                              <Facebook className="w-5 h-5" />
                            </motion.a>
                          )}
                          {member.social?.linkedin && (
                            <motion.a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 transition-all"
                            >
                              <Linkedin className="w-5 h-5" />
                            </motion.a>
                          )}
                          {member.social?.email && (
                            <motion.a
                              href={`mailto:${member.social.email}`}
                              whileHover={{ scale: 1.1, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/30 transition-all"
                            >
                              <Mail className="w-5 h-5" />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Other Team Members */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.filter(m => !m.isFounder).map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="relative group"
                  >
                    <div className="glass-card p-6 h-full transition-all duration-300 hover:border-krown-red/30 rounded-2xl">
                      {/* Avatar */}
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-contain object-center" />
                        ) : (
                          <span className="text-2xl font-bold text-gray-800">{member.name.split(' ').map(n => n[0]).join('')}</span>
                        )}
                        {member.isDeveloper && (
                          <div className="absolute -top-2 -right-2 bg-krown-red text-white p-1.5 rounded-full shadow-lg">
                            <Sparkles className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Name & Role */}
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                        <p className="text-sm text-white/80">{language === 'fr' ? member.roleFr : member.role}</p>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-white/60 text-center mb-4 line-clamp-3">
                        {language === 'fr' ? member.bioFr : member.bio}
                      </p>

                      {/* Social Links */}
                      <div className="flex justify-center gap-2">
                        {member.social?.instagram && (
                          <motion.a
                            href={member.social.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Instagram className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social?.pinterest && (
                          <motion.a
                            href={member.social.pinterest}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-[#BD081C] hover:bg-white/10 transition-all"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                            </svg>
                          </motion.a>
                        )}
                        {member.social?.youtube && (
                          <motion.a
                            href={member.social.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-red-500 hover:bg-white/10 transition-all"
                          >
                            <Youtube className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social?.linkedin && (
                          <motion.a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Linkedin className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social?.github && (
                          <motion.a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social?.facebook && (
                          <motion.a
                            href={member.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Facebook className="w-4 h-4" />
                          </motion.a>
                        )}
                        {member.social?.email && (
                          <motion.a
                            href={`mailto:${member.social.email}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Mail className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
