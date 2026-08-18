import { useParams } from 'react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Download, TrendingUp, Sparkles, Phone, Mail } from 'lucide-react';
import { categories } from '../data/categories';
import { useLanguage } from '../contexts/LanguageContext';

export default function CategoryPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-krown-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category not found</h1>
          <a href="/#categories" className="text-krown-red hover:underline">Back to Categories</a>
        </div>
      </div>
    );
  }
  
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  
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
      if (sort === 'price-low') return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      if (sort === 'price-high') return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
      return 0;
    });
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black">
      {/* Breadcrumb */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-white/60 mb-4">
            <a href="/" className="hover:text-krown-red transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/#categories" className="hover:text-krown-red transition-colors">Categories</a>
            <span className="mx-2">/</span>
            <span className="text-white">{language === 'fr' ? category.nameFr : category.name}</span>
          </div>
          
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
              <option value="price-low" className="bg-krown-dark">{language === 'fr' ? 'Prix: Croissant' : 'Price: Low to High'}</option>
              <option value="price-high" className="bg-krown-dark">{language === 'fr' ? 'Prix: Décroissant' : 'Price: High to Low'}</option>
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
                className="glass-card rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <img 
                  src={design.image} 
                  alt={language === 'fr' ? design.titleFr : design.title} 
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">
                    {language === 'fr' ? design.titleFr : design.title}
                  </h3>
                  <p className="text-krown-red font-bold mb-2">{design.price}</p>
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
                  <a
                    key={related.id}
                    href={`/categories/${related.slug}`}
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white flex items-center gap-2"
                  >
                    <span>{related.icon}</span>
                    {language === 'fr' ? related.nameFr : related.name}
                  </a>
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
            <a 
              href="/#categories" 
              className="inline-flex items-center gap-2 text-krown-red hover:text-krown-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'fr' ? 'Retour aux Catégories' : 'Back to All Categories'}
            </a>
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
                <a href="tel:+2348136804699" className="block text-white/60 hover:text-krown-red transition-colors mb-1">
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
                <a href="mailto:Info@krowncf.com" className="block text-white/60 hover:text-krown-red transition-colors mb-1">
                  Info@krowncf.com
                </a>
                <a href="mailto:krownassets@gmail.com" className="block text-white/60 hover:text-krown-red transition-colors">
                  krownassets@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
