import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Coins, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { CREDIT_PACKS, formatNaira, type CreditPack } from '../data/pricing';

interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
}

/** Smallest pack that covers the credits still needed (largest pack if none does). */
function recommendPack(needed: number): CreditPack {
  return CREDIT_PACKS.find((p) => p.credits >= needed) ?? CREDIT_PACKS[CREDIT_PACKS.length - 1];
}

export default function Cart({ isOpen, onClose, items, onRemoveItem }: CartProps) {
  const { language, t } = useLanguage();
  const { user } = useUser();
  const { openCheckout } = useCheckout();
  const needed = Math.max(0, items.length - (user.signedIn ? user.credits : 0));
  const recommended = recommendPack(Math.max(1, needed));

  const checkout = (packId: CreditPack['id']) => {
    onClose();
    openCheckout({ product: packId, reason: t('cart.reason').replace('{count}', String(items.length)) });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-krown-dark border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-krown-red to-krown-red-dark flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 id="cart-title" className="text-lg font-bold text-white">{t('cart.title')}</h2>
                  <p className="text-xs text-white/50">
                    {items.length === 1 ? t('cart.countOne') : t('cart.count').replace('{count}', String(items.length))}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label={t('packs.close')}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-white/30" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{t('cart.empty')}</h3>
                  <p className="text-sm text-white/50">{t('cart.emptyHint')}</p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-krown-red/20 to-krown-red/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingBag className="w-6 h-6 text-krown-red/50" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                        <p className="text-xs text-white/50">{item.category} · {t('cart.oneCredit')}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={t('cart.remove').replace('{name}', item.name)}
                        className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer: packs */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border-t border-white/10 bg-krown-black/50 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              >
                <p className="flex items-center gap-2 text-sm text-white/70 mb-3">
                  <Coins className="w-4 h-4 text-krown-orange" aria-hidden="true" />
                  {needed === 0
                    ? t('cart.covered')
                    : t('cart.needed').replace('{count}', String(needed))}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {CREDIT_PACKS.map((p) => {
                    const rec = p.id === recommended.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => checkout(p.id)}
                        className={`relative min-h-[64px] rounded-lg border px-2 py-2 text-center transition-colors ${
                          p.highlight ? 'border-krown-orange/60 bg-krown-orange/10' : 'border-white/10 bg-white/5 hover:border-white/30'
                        } ${rec ? 'ring-2 ring-krown-orange' : ''}`}
                      >
                        {p.badge && (
                          <span
                            className={`absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-px text-[9px] font-bold text-white ${
                              p.highlight ? 'bg-gradient-to-r from-krown-red to-krown-orange' : 'bg-white/25'
                            }`}
                          >
                            {p.badge[language]}
                          </span>
                        )}
                        <span className="block text-[11px] text-white/60 leading-tight">{p.name[language]}</span>
                        <span className="block text-sm font-bold text-white mt-0.5">{formatNaira(p.ngn)}</span>
                      </button>
                    );
                  })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => checkout(recommended.id)}
                  className="w-full min-h-[48px] py-3 bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-medium rounded-lg hover:shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  {t('cart.checkout').replace('{pack}', recommended.name[language]).replace('{price}', formatNaira(recommended.ngn))}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </motion.button>
                <p className="text-xs text-white/40 text-center mt-3">{t('packs.never')}</p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
