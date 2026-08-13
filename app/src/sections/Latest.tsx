import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ShoppingCart, Star, Download, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const latestItems = [
  {
    id: 1,
    name: 'Modern Script Font Family',
    category: 'Fonts',
    price: '₦35,000',
    originalPrice: '₦50,000',
    rating: 4.8,
    reviews: 67,
    formats: ['OTF', 'TTF'],
    isNew: true,
    gradient: 'from-purple-500/20 to-indigo-500/20',
  },
  {
    id: 2,
    name: 'African Pattern Collection',
    category: 'Vector Illustrations',
    price: '₦22,000',
    originalPrice: '₦30,000',
    rating: 4.8,
    reviews: 95,
    formats: ['AI', 'EPS'],
    isNew: true,
    gradient: 'from-red-500/20 to-red-600/20',
  },
  {
    id: 3,
    name: 'Birthday Party Invitation',
    category: 'Birthday Designs',
    price: '₦10,000',
    originalPrice: '₦18,000',
    rating: 4.7,
    reviews: 156,
    formats: ['PSD', 'AI'],
    isNew: true,
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 4,
    name: 'Night Club Party Flyer',
    category: 'Party Flyers',
    price: '₦18,000',
    originalPrice: null,
    rating: 4.6,
    reviews: 112,
    formats: ['PSD', 'AI'],
    isNew: true,
    gradient: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 5,
    name: 'Sunday Service Church Flyer',
    category: 'Church Flyers',
    price: '₦12,000',
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    formats: ['PSD', 'AI'],
    isNew: true,
    gradient: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: 6,
    name: 'Christmas Celebration Flyer',
    category: 'Festivities',
    price: '₦15,000',
    originalPrice: '₦25,000',
    rating: 4.8,
    reviews: 128,
    formats: ['PSD', 'AI', 'EPS'],
    isNew: true,
    gradient: 'from-red-500/20 to-red-600/20',
  },
  {
    id: 7,
    name: 'Business Icon Set',
    category: 'Vector Illustrations',
    price: '₦25,000',
    originalPrice: null,
    rating: 4.9,
    reviews: 178,
    formats: ['AI', 'EPS', 'SVG'],
    isNew: true,
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 8,
    name: 'Golden Frame PNG Collection',
    category: 'PNGs',
    price: '₦20,000',
    originalPrice: null,
    rating: 4.9,
    reviews: 234,
    formats: ['PNG'],
    isNew: true,
    gradient: 'from-yellow-500/20 to-amber-500/20',
  },
];

export default function Latest() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { addToCart } = useCart();

  const handleAddToCart = (item: typeof latestItems[0]) => {
    addToCart({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      category: item.category,
      image: ''
    });
  };

  return (
    <section id="latest" className="relative py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/30 to-krown-black" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-krown-red" />
              </motion.div>
              <span className="text-sm text-white/70">Fresh Arrivals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Latest Items
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4">
              Stay ahead of the curve with our newest design additions. Updated daily with fresh creative assets.
            </p>
          </motion.div>

          {/* Horizontal Slideshow - Row 1 (Left to Right) */}
          <div className="relative overflow-hidden mb-4 sm:mb-5">
            <motion.div
              className="flex gap-4 sm:gap-5"
              animate={{ x: [0, -1000, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {/* Logo Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-64 sm:w-72 glass-card overflow-hidden p-6 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-krown-red to-krown-red-dark flex items-center justify-center mb-4 shadow-glow">
                  <img src="/assets/logo.png" alt="Krown Logo" className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">KROWN</h3>
                <p className="text-xs text-white/50">Creative Factory</p>
              </motion.div>

              {/* Design Items - First Half */}
              {latestItems.slice(0, 4).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="flex-shrink-0 w-64 sm:w-72 glass-card overflow-hidden hover-lift"
                >
                  {/* Image Placeholder */}
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                        backgroundSize: '16px 16px',
                      }} />
                    </div>

                    {/* Category Icon Placeholder */}
                    <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white/40" />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {item.isNew && (
                        <span className="px-2 py-0.5 bg-krown-red text-white text-[10px] font-bold rounded-md">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-krown-red transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-krown-red transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="text-xs text-krown-red mb-1">{item.category}</div>
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-krown-red transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-white/60">{item.rating}</span>
                      </div>
                      <span className="text-xs text-white/30">({item.reviews})</span>
                    </div>

                    {/* Price & Formats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-krown-red">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-white/30 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {item.formats.map((format) => (
                          <span key={format} className="px-1.5 py-0.5 bg-white/5 text-[10px] text-white/40 rounded">
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Horizontal Slideshow - Row 2 (Right to Left) */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-4 sm:gap-5"
              animate={{ x: [-1000, 0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {/* Logo Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-64 sm:w-72 glass-card overflow-hidden p-6 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-krown-red to-krown-red-dark flex items-center justify-center mb-4 shadow-glow">
                  <img src="/assets/logo.png" alt="Krown Logo" className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">KROWN</h3>
                <p className="text-xs text-white/50">Creative Factory</p>
              </motion.div>

              {/* Design Items - Second Half */}
              {latestItems.slice(4).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="flex-shrink-0 w-64 sm:w-72 glass-card overflow-hidden hover-lift"
                >
                  {/* Image Placeholder */}
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden`}>
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                        backgroundSize: '16px 16px',
                      }} />
                    </div>

                    {/* Category Icon Placeholder */}
                    <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white/40" />
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {item.isNew && (
                        <span className="px-2 py-0.5 bg-krown-red text-white text-[10px] font-bold rounded-md">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-krown-red transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-krown-red transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="text-xs text-krown-red mb-1">{item.category}</div>
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-krown-red transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-white/60">{item.rating}</span>
                      </div>
                      <span className="text-xs text-white/30">({item.reviews})</span>
                    </div>

                    {/* Price & Formats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-krown-red">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-white/30 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {item.formats.map((format) => (
                          <span key={format} className="px-1.5 py-0.5 bg-white/5 text-[10px] text-white/40 rounded">
                            {format}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10 sm:mt-12"
          >
            <button className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-krown-red/50 transition-all duration-300">
              <Download className="w-4 h-4" />
              Load More Designs
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
