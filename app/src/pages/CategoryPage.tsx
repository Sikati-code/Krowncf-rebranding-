import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Download, TrendingUp, Sparkles, Phone, Mail } from 'lucide-react';
import { categories } from '../data/categories';
import { useLanguage } from '../contexts/LanguageContext';
import { CardShareButton } from '../components/WhatsAppShareButton';
import WhatsAppShareSheet from '../components/WhatsAppShareSheet';
import { useShareItems } from '../hooks/use-share-items';
import { findShareable } from '../lib/og';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CategoryPage() {
  const { slug } = useParams();
  const { language, t } = useLanguage();
  const share = useShareItems();
  const category = categories.find(c => c.slug === slug);

  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  if (!category) {
    return (
      <div className="min-h-screen bg-krown-black flex items-center justify-center">
        <Header />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{language === 'fr' ? 'Catégorie introuvable' : 'Category not found'}</h1>
          <Link to="/categories" className="text-krown-red hover:underline">{t('nav.categories')}</Link>
        </div>
      </div>
    );
  }
  
  
  
  // Filter and sort logic
  const filteredDesigns = category.designs
    .filter(design => {
      if (filter === 'trending') return design.isTrending;
      if (filter === 'new') return design.isNew;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'newest') return b.id.localeCompare(a.id);
      if (sort === 'popular') return b.downloads - a.downloads;
      return 0;
    });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black">
      <Header />
      {/* Breadcrumb */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-28 sm:pt-32 pb-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            className="mb-4"
            items={[
              { label: t('nav.categories'), to: '/categories' },
              { label: language === 'fr' ? category.nameFr : category.name },
            ]}
          />
          
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{category.icon}</span>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {language === 'fr' ? category.nameFr : category.name}
                </h1>
                <p className="text-base sm:text-lg text-white/80">
                  {language === 'fr' ? category.descriptionFr : category.description}
                </p>
              </div>
            </div>
            <p className="text-sm text-white/60">
              {category.itemCount} {language === 'fr' ? 'designs disponibles' : 'designs available'}
            </p>
          </motion.div>
          
          {/* Filter & Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-all ${filter === 'all' ? 'bg-krown-red text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                {language === 'fr' ? 'Tous' : 'All'}
              </button>
              <button 
                onClick={() => setFilter('trending')}
                className={`px-4 py-2 rounded-lg transition-all ${filter === 'trending' ? 'bg-krown-red text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                {language === 'fr' ? 'Tendance' : 'Trending'}
              </button>
              <button 
                onClick={() => setFilter('new')}
                className={`px-4 py-2 rounded-lg transition-all ${filter === 'new' ? 'bg-krown-red text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                {language === 'fr' ? 'Nouveau' : 'New'}
              </button>
            </div>
            <select 
              onChange={(e) => setSort(e.target.value)} 
              value={sort}
              className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:border-krown-red/50"
            >
              <option value="newest" className="bg-krown-dark">{language === 'fr' ? 'Plus récent' : 'Newest'}</option>
              <option value="popular" className="bg-krown-dark">{language === 'fr' ? 'Populaire' : 'Popular'}</option>
            </select>
          </motion.div>
          
          {/* Design Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDesigns.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <Link to={`/design/${design.id}`} className="block cursor-pointer">
                  <div className="design-image-wrapper light-bg aspect-[4/5] flex items-center justify-center p-4">
                    <img 
                      src={design.image} 
                      alt={language === 'fr' ? design.titleFr : design.title} 
                      className="w-full h-full object-contain design-image-shadow"
                    />
                  </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">
                    {language === 'fr' ? design.titleFr : design.title}
                  </h3>
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {design.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {design.downloads}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {design.isTrending && (
                      <span className="text-xs bg-red-500 px-2 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {language === 'fr' ? 'Tendance' : 'Trending'}
                      </span>
                    )}
                    {design.isNew && (
                      <span className="text-xs bg-green-500 px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {language === 'fr' ? 'Nouveau' : 'New'}
                      </span>
                    )}
                  </div>
                </div>
                </Link>
                <CardShareButton
                  label={t('share.cardAria').replace('{title}', language === 'fr' ? design.titleFr : design.title)}
                  onClick={() => { const item = findShareable(design.id, language); if (item) share.shareDesign(item); }}
                  onPrepare={() => { const item = findShareable(design.id, language); if (item) share.prepare(item); }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Related Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {language === 'fr' ? 'Catégories Connexes' : 'Related Categories'}
            </h2>
            <div className="flex flex-wrap gap-4">
              {category.relatedCategories.map((relatedSlug) => {
                const related = categories.find(c => c.slug === relatedSlug);
                return related ? (
                  <Link
                    key={related.id}
                    to={`/categories/${related.slug}`}
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white flex items-center gap-2"
                  >
                    <span>{related.icon}</span>
                    {language === 'fr' ? related.nameFr : related.name}
                  </Link>
                ) : null;
              })}
            </div>
          </motion.div>
          
          {/* Back to Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-krown-red hover:text-krown-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'fr' ? 'Retour aux Catégories' : 'Back to All Categories'}
            </Link>
          </motion.div>
          
          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 p-6 glass-card rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'fr' ? 'Besoin d\'aide ?' : 'Need Help?'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-krown-red" />
                  {language === 'fr' ? 'Appelez-nous' : 'Call Us'}
                </p>
                <a href="tel:+2348136804699" className="block text-white/60 hover:text-krown-red transition-colors">
                  🇳🇬 +234 813 680 4699 (Nigeria)
                </a>
                <a href="tel:+237680200704" className="block text-white/60 hover:text-krown-red transition-colors">
                  🇨🇲 +237 680 20 07 04 (Cameroon)
                </a>
              </div>
              <div>
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-krown-red" />
                  {language === 'fr' ? 'Envoyez-nous un email' : 'Email Us'}
                </p>
                <a href="mailto:info@krowncf.com" className="block text-white/60 hover:text-krown-red transition-colors">
                  info@krowncf.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      <WhatsAppShareSheet item={share.item} onClose={share.close} />
    </div>
  );
}
