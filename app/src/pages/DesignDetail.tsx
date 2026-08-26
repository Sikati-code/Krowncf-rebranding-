import { useParams, Link } from 'react-router';
import { useState } from 'react';
import { categories } from '../data/categories';
import { brandLogos } from '../data/brandLogos';
import { useLanguage } from '../contexts/LanguageContext';
import { Star, Download, TrendingUp, Sparkles, ArrowLeft } from 'lucide-react';

export default function DesignDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  // First try to find in categories
  const design = categories
    .flatMap(c => c.designs)
    .find(d => d.id === id);
  
  const category = categories.find(c => c.designs.some(d => d.id === id));
  
  // If not found in categories, try brand logos
  const brandLogo = !design ? brandLogos.find(b => b.id === parseInt(id || '0')) : null;
  
  if (!design && !brandLogo) {
    return (
      <div className="min-h-screen bg-krown-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Design not found</h1>
          <Link to="/#portfolio" className="text-krown-red hover:underline">Back to Portfolio</Link>
        </div>
      </div>
    );
  }
  
  // Use either design or brandLogo
  const item = design || {
    id: brandLogo?.id.toString() || '',
    title: brandLogo?.name || '',
    titleFr: brandLogo?.name || '',
    image: brandLogo?.image || '',
    price: brandLogo?.price || '₦10,000',
    downloads: brandLogo?.downloads || 0,
    rating: 4.5,
    isTrending: brandLogo?.badge === 'Best Seller',
    isNew: false,
  };
  
  const itemCategory = category || { 
    slug: 'brands', 
    name: 'Brand Logos', 
    nameFr: 'Logos de Marque'
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-white/60 mb-4">
            <Link to="/" className="hover:text-krown-red transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/#portfolio`} className="hover:text-krown-red transition-colors">
              {language === 'fr' ? itemCategory.nameFr : itemCategory.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{language === 'fr' ? item.titleFr : item.title}</span>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Image */}
            <div className="design-image-wrapper light-bg rounded-xl p-8 min-h-[400px] flex items-center justify-center">
              <img 
                src={item.image} 
                alt={language === 'fr' ? item.titleFr : item.title}
                className="w-full h-auto max-h-[500px] object-contain design-image-shadow"
              />
            </div>
            
            {/* Right - Details */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {language === 'fr' ? item.titleFr : item.title}
              </h1>
              <p className="text-krown-red text-xl sm:text-2xl font-bold mb-4">{item.price}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {item.isTrending && (
                  <span className="bg-red-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {language === 'fr' ? 'Tendance' : 'Trending'}
                  </span>
                )}
                {item.isNew && (
                  <span className="bg-green-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {language === 'fr' ? 'Nouveau' : 'New'}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {item.downloads} {language === 'fr' ? 'téléchargements' : 'downloads'}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {item.rating} / 5.0
                </span>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                <h3 className="font-bold text-white mb-3">
                  {language === 'fr' ? 'Détails du Design' : 'Design Details'}
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-white/60">
                  <span>{language === 'fr' ? 'Taille du fichier:' : 'File Size:'} 2.4 MB</span>
                  <span>{language === 'fr' ? 'Format:' : 'Format:'} PNG, JPG</span>
                  <span>{language === 'fr' ? 'Dimensions:' : 'Dimensions:'} 1920x1080</span>
                  <span>{language === 'fr' ? 'Licence:' : 'License:'} {language === 'fr' ? 'Usage personnel' : 'Personal Use'}</span>
                </div>
              </div>
              
              {/* Download Button */}
              <button
                onClick={() => setShowUpgrade(true)}
                className="w-full py-4 bg-gradient-to-r from-krown-red to-krown-orange text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 mb-6"
              >
                <Download className="w-5 h-5" />
                {language === 'fr' ? 'Télécharger' : 'Download'}
              </button>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/5 px-3 py-1 rounded-full text-sm text-white/60">
                  #{itemCategory.slug}
                </span>
                <span className="bg-white/5 px-3 py-1 rounded-full text-sm text-white/60">
                  #{language === 'fr' ? 'design' : 'design'}
                </span>
                <span className="bg-white/5 px-3 py-1 rounded-full text-sm text-white/60">
                  #{language === 'fr' ? 'créatif' : 'creative'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Related Designs */}
          {category && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'fr' ? 'Designs Similaires' : 'Similar Designs'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.designs
                  .filter(d => d.id !== item.id)
                  .slice(0, 4)
                  .map((related) => (
                    <Link key={related.id} to={`/design/${related.id}`}>
                      <div className="bg-white/5 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer border border-white/10 hover:border-krown-red/30">
                        <div className="design-image-wrapper light-bg aspect-square flex items-center justify-center mb-3">
                          <img 
                            src={related.image} 
                            alt={language === 'fr' ? related.titleFr : related.title}
                            className="w-full h-full object-contain max-h-[120px]"
                          />
                        </div>
                        <p className="text-sm font-bold text-white truncate">
                          {language === 'fr' ? related.titleFr : related.title}
                        </p>
                        <p className="text-xs text-krown-red">{related.price}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
          
          {/* Related Brand Logos */}
          {brandLogo && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'fr' ? 'Autres Logos' : 'Other Logos'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {brandLogos
                  .filter(b => b.id !== brandLogo.id)
                  .slice(0, 4)
                  .map((related) => (
                    <Link key={related.id} to={`/design/${related.id}`}>
                      <div className="bg-white/5 rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer border border-white/10 hover:border-krown-red/30">
                        <div className="design-image-wrapper light-bg aspect-square flex items-center justify-center mb-3">
                          <img 
                            src={related.image} 
                            alt={related.name}
                            className="w-full h-full object-contain max-h-[120px]"
                          />
                        </div>
                        <p className="text-sm font-bold text-white truncate">
                          {related.name}
                        </p>
                        <p className="text-xs text-krown-red">{related.price}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
          
          {/* Back Button */}
          <div className="mt-8">
            <Link 
              to={`/#portfolio`}
              className="inline-flex items-center gap-2 text-krown-red hover:text-krown-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'fr' ? 'Retour au Portfolio' : 'Back to Portfolio'}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-krown-dark to-krown-black p-8 rounded-2xl max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-2">
              {language === 'fr' ? '🚀 Passer à Pro' : '🚀 Upgrade to Pro'}
            </h2>
            <p className="text-white/80 mb-6">
              {language === 'fr' ? 'Connectez-vous pour télécharger des designs.' : 'Sign in to download designs.'}
            </p>
            
            <div className="space-y-4">
              {/* Free Tier */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="font-bold text-white">
                  {language === 'fr' ? 'Plan Gratuit' : 'Free Plan'}
                </h3>
                <p className="text-white/60 text-sm">
                  {language === 'fr' ? '12 téléchargements gratuits' : '12 free downloads'}
                </p>
                <p className="text-lg font-bold text-white">
                  {language === 'fr' ? 'Gratuit' : 'Free'}
                </p>
                <p className="text-xs text-white/40 mt-2">
                  ✅ {language === 'fr' ? '12 téléchargements inclus' : '12 downloads included'}
                </p>
              </div>

              {/* Pro Plan */}
              <div className="bg-white/5 p-4 rounded-xl border border-krown-red/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-krown-red px-3 py-1 text-xs font-bold rounded-bl-lg text-white">
                  POPULAR
                </div>
                <h3 className="font-bold text-white">
                  {language === 'fr' ? 'Plan Pro' : 'Pro Plan'}
                </h3>
                <p className="text-white/60 text-sm">
                  {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
                </p>
                <p className="text-2xl font-bold text-krown-red">₦5,000/month</p>
                <p className="text-xs text-white/40 mt-2">
                  ✅ {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
                </p>
                <p className="text-xs text-white/40">
                  ✅ {language === 'fr' ? 'Tous les designs débloqués' : 'All designs unlocked'}
                </p>
              </div>

              {/* Advanced Plan */}
              <div className="bg-white/5 p-4 rounded-xl border border-krown-orange/30">
                <h3 className="font-bold text-white">
                  {language === 'fr' ? 'Plan Avancé' : 'Advanced Plan'}
                </h3>
                <p className="text-white/60 text-sm">
                  {language === 'fr' ? 'Illimité + accès prioritaire' : 'Unlimited + priority access'}
                </p>
                <p className="text-2xl font-bold text-krown-orange">₦10,000/month</p>
                <p className="text-xs text-white/40 mt-2">
                  ✅ {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
                </p>
                <p className="text-xs text-white/40">
                  ✅ {language === 'fr' ? 'Tous les designs débloqués' : 'All designs unlocked'}
                </p>
                <p className="text-xs text-white/40">
                  ✅ {language === 'fr' ? 'Support prioritaire' : 'Priority support'}
                </p>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-gradient-to-r from-krown-red to-krown-orange rounded-xl font-bold text-white hover:scale-105 transition-transform">
              {language === 'fr' ? 'Passer à Pro' : 'Upgrade Now'}
            </button>

            <button 
              onClick={() => setShowUpgrade(false)}
              className="w-full mt-2 py-2 text-white/60 hover:text-white transition-colors"
            >
              {language === 'fr' ? 'Peut-être plus tard' : 'Maybe later'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
