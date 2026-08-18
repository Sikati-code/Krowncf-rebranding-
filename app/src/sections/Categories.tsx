import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  Grid3X3,
  PartyPopper,
  Church,
  Cake,
  Image,
  Type,
  PartyPopper as PartyIcon,
  Shapes,
  MapPin,
  X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const categories = [
  {
    id: 1,
    name: 'Workers Day',
    translationKey: 'categories.workers_day',
    description: 'Celebrate labor day with professional designs',
    items: '450 items',
    icon: PartyPopper,
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
    slug: 'workers-day',
  },
  {
    id: 2,
    name: "Women's Day",
    translationKey: 'categories.womens_day',
    description: 'Empowering designs for International Women\'s Day',
    items: '620 items',
    icon: PartyIcon,
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
    slug: 'womens-day',
  },
  {
    id: 3,
    name: 'Wedding IVs',
    translationKey: 'categories.wedding_invites',
    description: 'Elegant wedding invitation templates',
    items: '1,800 items',
    icon: Cake,
    gradient: 'from-rose-500/20 to-pink-600/20',
    iconColor: 'text-rose-400',
    slug: 'wedding-ivs',
  },
  {
    id: 4,
    name: 'Vector Illustrations',
    translationKey: 'categories.vector_illustrations',
    description: 'Scalable vector graphics for any project',
    items: '2,200 items',
    icon: Shapes,
    gradient: 'from-teal-500/20 to-cyan-500/20',
    iconColor: 'text-teal-400',
    slug: 'vector-illustrations',
  },
  {
    id: 5,
    name: "Valentine's Day",
    translationKey: 'categories.valentines_day',
    description: 'Romantic designs for Valentine\'s Day',
    items: '950 items',
    icon: PartyIcon,
    gradient: 'from-red-500/20 to-pink-500/20',
    iconColor: 'text-red-400',
    slug: 'valentines-day',
  },
  {
    id: 6,
    name: "Teacher's Day",
    translationKey: 'categories.teachers_day',
    description: 'Appreciation designs for educators',
    items: '380 items',
    icon: Type,
    gradient: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    slug: 'teachers-day',
  },
  {
    id: 7,
    name: 'Posters',
    translationKey: 'categories.posters',
    description: 'Eye-catching poster designs',
    items: '1,450 items',
    icon: Image,
    gradient: 'from-purple-500/20 to-violet-500/20',
    iconColor: 'text-purple-400',
    slug: 'posters',
  },
  {
    id: 8,
    name: 'PNG',
    translationKey: 'categories.png',
    description: 'High-quality transparent PNG images',
    items: '3,500 items',
    icon: Image,
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
    slug: 'png',
  },
  {
    id: 9,
    name: 'Party Flyers',
    translationKey: 'categories.party_flyers',
    description: 'Eye-catching flyers for all types of parties',
    items: '1,680 items',
    icon: PartyIcon,
    gradient: 'from-yellow-500/20 to-amber-500/20',
    iconColor: 'text-yellow-400',
    slug: 'party-flyers',
  },
  {
    id: 10,
    name: 'Nigeria',
    translationKey: 'categories.nigeria',
    description: 'Culturally-inspired Nigerian designs',
    items: '750 items',
    icon: MapPin,
    gradient: 'from-green-600/20 to-green-400/20',
    iconColor: 'text-green-500',
    slug: 'nigeria',
  },
  {
    id: 11,
    name: 'Muslim',
    translationKey: 'categories.muslim',
    description: 'Islamic designs for religious events',
    items: '520 items',
    icon: Church,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
    slug: 'muslim',
  },
  {
    id: 12,
    name: 'Music Covers',
    translationKey: 'categories.music_covers',
    description: 'Professional album and mixtape covers',
    items: '1,200 items',
    icon: PartyIcon,
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
    slug: 'music-covers',
  },
  {
    id: 13,
    name: 'Happy New Year',
    translationKey: 'categories.happy_new_year',
    description: 'Celebrate the new year with festive designs',
    items: '890 items',
    icon: PartyPopper,
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
    slug: 'happy-new-year',
  },
  {
    id: 14,
    name: 'Halloween',
    translationKey: 'categories.halloween',
    description: 'Spooky designs for Halloween celebrations',
    items: '420 items',
    icon: PartyIcon,
    gradient: 'from-orange-600/20 to-red-600/20',
    iconColor: 'text-orange-500',
    slug: 'halloween',
  },
  {
    id: 15,
    name: 'Fonts',
    translationKey: 'categories.fonts',
    description: 'Premium typography for professional designs',
    items: '560 items',
    icon: Type,
    gradient: 'from-purple-500/20 to-violet-500/20',
    iconColor: 'text-purple-400',
    slug: 'fonts',
  },
  {
    id: 16,
    name: 'Festivities',
    translationKey: 'categories.festivities',
    description: 'Celebrate special occasions with stunning festive designs',
    items: '1,250 items',
    icon: PartyPopper,
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
    slug: 'festivities',
  },
  {
    id: 17,
    name: "Father's Day",
    translationKey: 'categories.fathers_day',
    description: 'Heartwarming designs for Father\'s Day',
    items: '340 items',
    icon: Cake,
    gradient: 'from-blue-600/20 to-indigo-600/20',
    iconColor: 'text-blue-500',
    slug: 'fathers-day',
  },
  {
    id: 18,
    name: 'Easter Design',
    translationKey: 'categories.easter_design',
    description: 'Beautiful Easter celebration designs',
    items: '480 items',
    icon: PartyIcon,
    gradient: 'from-pink-400/20 to-purple-400/20',
    iconColor: 'text-pink-400',
    slug: 'easter-design',
  },
  {
    id: 19,
    name: 'Church Flyers',
    translationKey: 'categories.church_flyers',
    description: 'Beautiful church and religious event flyers',
    items: '890 items',
    icon: Church,
    gradient: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
    slug: 'church-flyers',
  },
  {
    id: 20,
    name: 'Christmas',
    translationKey: 'categories.christmas',
    description: 'Festive Christmas designs and templates',
    items: '1,100 items',
    icon: PartyPopper,
    gradient: 'from-red-500/20 to-green-500/20',
    iconColor: 'text-red-400',
    slug: 'christmas',
  },
  {
    id: 21,
    name: 'Cameroon',
    translationKey: 'categories.cameroon',
    description: 'Culturally-inspired Cameroonian designs',
    items: '620 items',
    icon: MapPin,
    gradient: 'from-green-500/20 to-yellow-500/20',
    iconColor: 'text-green-400',
    slug: 'cameroon',
  },
  {
    id: 22,
    name: 'Birthday Designs',
    translationKey: 'categories.birthday_designs',
    description: 'Make birthdays memorable with creative designs',
    items: '2,100 items',
    icon: Cake,
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
    slug: 'birthday-designs',
  },
  {
    id: 23,
    name: 'African Celebrities Png',
    translationKey: 'categories.african_celebrities',
    description: 'PNG images of African celebrities',
    items: '780 items',
    icon: Image,
    gradient: 'from-yellow-500/20 to-orange-500/20',
    iconColor: 'text-yellow-400',
    slug: 'african-celebrities',
  },
  {
    id: 24,
    name: '3D Pngs',
    translationKey: 'categories.3d_pngs',
    description: 'High-quality 3D PNG images',
    items: '1,350 items',
    icon: Shapes,
    gradient: 'from-cyan-500/20 to-blue-500/20',
    iconColor: 'text-cyan-400',
    slug: '3d-pngs',
  },
];

export default function Categories() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="categories" className="relative py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/30 to-krown-black" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Grid3X3 className="w-4 h-4 text-krown-red" />
              </motion.div>
              <span className="text-sm text-white/70">{t('categories.title')}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              {t('categories.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4"
            >
              {t('categories.subtitle')}
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.slice(0, 8).map((category, index) => (
              <Link key={category.id} to={`/categories/${category.slug}`}>
                <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                className="group relative glass-card p-5 sm:p-6 overflow-hidden"
              >
                {/* Hover Gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0`}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative">
                  {/* Icon */}
                  <motion.div 
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <category.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${category.iconColor}`} />
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="text-base sm:text-lg font-semibold text-white mb-1.5 group-hover:text-krown-red transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t(category.translationKey)}
                  </motion.h3>
                  <p className="text-xs sm:text-sm text-white/40 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <motion.span 
                      className="text-xs text-krown-red font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      {category.items}
                    </motion.span>
                    <motion.span 
                      className="text-xs text-white/30 group-hover:text-white/60 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      Explore →
                    </motion.span>
                  </div>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-10 sm:mt-12"
          >
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-krown-red text-white font-medium rounded-full hover:bg-krown-red-dark transition-all duration-300 hover:shadow-glow"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Categories
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Grid3X3 className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* All Categories Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden glass-card rounded-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 p-6 border-b border-white/10 bg-krown-dark/95 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">All Categories</h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categories.map((category, index) => (
                      <Link key={category.id} to={`/categories/${category.slug}`} onClick={() => setIsModalOpen(false)}>
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group relative glass-card p-4 rounded-xl overflow-hidden"
                      >
                        {/* Hover Gradient */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0`}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="relative">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-white/10 transition-colors">
                            <category.icon className={`w-5 h-5 ${category.iconColor}`} />
                          </div>

                          {/* Content */}
                          <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-krown-red transition-colors">
                            {t(category.translationKey)}
                          </h3>
                          <p className="text-xs text-white/40 line-clamp-2">
                            {category.description}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-krown-red font-medium">
                              {category.items}
                            </span>
                            <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors">
                              →
                            </span>
                          </div>
                        </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
