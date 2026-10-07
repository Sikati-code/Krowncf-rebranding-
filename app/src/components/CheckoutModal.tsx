import { useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Coins, ArrowRight, Loader2, AlertTriangle, Lock, CreditCard, Smartphone, GraduationCap } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useModalA11y } from '../hooks/use-modal-a11y';
import {
  CREDIT_PACKS,
  formatNaira,
  formatXaf,
  gatewaysFor,
  resolveProduct,
  type Gateway,
  type ProductId,
} from '../data/pricing';
import { CheckoutError, preferredGateway, startCheckout } from '../lib/checkout';

export interface CheckoutRequest {
  /** Preselected product. Packs show the pack picker; materials show a summary. */
  product?: ProductId;
  /** Why the checkout opened (shown under the title). */
  reason?: string;
  /** Display name for course materials. */
  label?: string;
}

interface CheckoutModalProps {
  request: CheckoutRequest | null;
  onClose: () => void;
}

export default function CheckoutModal({ request, onClose }: CheckoutModalProps) {
  // A fresh panel — and fresh form state — every time the modal opens.
  return (
    <AnimatePresence>
      {request && <CheckoutPanel key={JSON.stringify(request)} request={request} onClose={onClose} />}
    </AnimatePresence>
  );
}

function initialGateway(id: ProductId, lang: 'en' | 'fr'): Gateway {
  const product = resolveProduct(id);
  const preferred = preferredGateway(lang);
  return product && gatewaysFor(product).includes(preferred) ? preferred : 'paystack';
}

function CheckoutPanel({ request, onClose }: { request: CheckoutRequest; onClose: () => void }) {
  const { language, t } = useLanguage();
  const { user } = useUser();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useModalA11y(true, onClose, panelRef, closeRef);

  const [productId, setProductId] = useState<ProductId>(request.product ?? 'pack10');
  const [gateway, setGateway] = useState<Gateway>(() => initialGateway(request.product ?? 'pack10', language));
  const [email, setEmail] = useState(user.email || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const product = resolveProduct(productId);
  const isMaterials = product?.kind === 'materials';
  const available = product ? gatewaysFor(product) : [];
  const amountLabel = product
    ? gateway === 'monetbil' && product.xaf
      ? formatXaf(product.xaf)
      : formatNaira(product.ngn)
    : '';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product || busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t('checkout.err.bad_email'));
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await startCheckout({ product: product.id, gateway, email: email.trim(), locale: language });
      // The browser is now navigating to the gateway — keep the spinner.
    } catch (err) {
      const code = err instanceof CheckoutError ? err.code : 'unknown';
      setError(t(`checkout.err.${code}`));
      setBusy(false);
    }
  };

  const gatewayOptions: { id: Gateway; icon: typeof CreditCard; title: string; detail: string }[] = [
    { id: 'paystack', icon: CreditCard, title: 'Paystack', detail: t('checkout.paystackDetail') },
    { id: 'monetbil', icon: Smartphone, title: 'Monetbil', detail: t('checkout.monetbilDetail') },
  ];

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={busy ? undefined : onClose}
          className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-[80] sm:p-4"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-b from-krown-dark to-krown-black w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-white/10 max-h-[92dvh] overflow-y-auto"
          >
            <form onSubmit={submit} className="p-6 sm:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]" noValidate>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                disabled={busy}
                aria-label={t('packs.close')}
                className="absolute top-3 right-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <h2 id="checkout-title" className="text-2xl font-bold text-white mb-2 pr-10 flex items-center gap-2">
                {isMaterials ? (
                  <GraduationCap className="w-6 h-6 text-krown-orange" aria-hidden="true" />
                ) : (
                  <Coins className="w-6 h-6 text-krown-orange" aria-hidden="true" />
                )}
                {isMaterials ? t('checkout.materialsTitle') : t('packs.title')}
              </h2>
              {request.reason && <p className="text-white/70 text-sm mb-4">{request.reason}</p>}
              {!isMaterials && user.signedIn && (
                <p className="mb-4 text-xs text-white/50">{t('packs.balance').replace('{count}', String(user.credits))}</p>
              )}

              {/* What is being bought */}
              {isMaterials ? (
                <div className="rounded-xl border-2 border-krown-orange bg-krown-orange/10 p-4">
                  <p className="font-bold text-white">{t('enroll.materialsName')}</p>
                  {request.label && <p className="text-xs text-white/60 mt-0.5">{request.label}</p>}
                  <p className="mt-2 text-xl font-bold text-krown-orange">{amountLabel}</p>
                </div>
              ) : (
                <div role="radiogroup" aria-label={t('packs.title')} className="space-y-3">
                  {CREDIT_PACKS.map((p) => {
                    const active = p.id === productId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          setProductId(p.id);
                          if (!gatewaysFor(resolveProduct(p.id)!).includes(gateway)) setGateway('paystack');
                        }}
                        className={`relative w-full text-left p-4 rounded-xl border-2 transition-all min-h-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-krown-orange ${
                          active
                            ? 'border-krown-orange bg-krown-orange/10'
                            : p.highlight
                              ? 'border-krown-orange/40 bg-krown-orange/5 hover:border-krown-orange/70'
                              : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        {p.badge && (
                          <span
                            className={`absolute top-0 right-0 px-2.5 py-0.5 text-[10px] font-bold rounded-bl-lg rounded-tr-lg text-white ${
                              p.highlight ? 'bg-gradient-to-r from-krown-red to-krown-orange' : 'bg-white/20'
                            }`}
                          >
                            {p.badge[language]}
                          </span>
                        )}
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              active ? 'border-krown-orange bg-krown-orange' : 'border-white/30'
                            }`}
                          >
                            {active && <Check className="w-3 h-3 text-white" aria-hidden="true" />}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-white">{p.name[language]}</p>
                            <p className="text-xs text-white/50">{p.blurb[language]}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-bold text-krown-orange">
                              {gateway === 'monetbil' && p.xaf ? formatXaf(p.xaf) : formatNaira(p.ngn)}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Payment method */}
              <fieldset className="mt-5">
                <legend className="text-sm font-semibold text-white mb-2">{t('checkout.method')}</legend>
                <div className="grid grid-cols-1 gap-2">
                  {gatewayOptions.map((g) => {
                    const enabled = available.includes(g.id);
                    const active = gateway === g.id && enabled;
                    return (
                      <label
                        key={g.id}
                        className={`flex items-center gap-3 min-h-[56px] px-4 py-2.5 rounded-xl border transition-colors ${
                          !enabled
                            ? 'border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed'
                            : active
                              ? 'border-krown-orange bg-krown-orange/10 cursor-pointer'
                              : 'border-white/10 bg-white/5 hover:border-white/30 cursor-pointer'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gateway"
                          value={g.id}
                          checked={active}
                          disabled={!enabled}
                          onChange={() => setGateway(g.id)}
                          className="sr-only"
                        />
                        <g.icon className="w-5 h-5 text-krown-orange shrink-0" aria-hidden="true" />
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold text-white">{g.title}</span>
                          <span className="block text-xs text-white/50">{enabled ? g.detail : t('checkout.comingSoon')}</span>
                        </span>
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            active ? 'border-krown-orange bg-krown-orange' : 'border-white/30'
                          }`}
                          aria-hidden="true"
                        >
                          {active && <Check className="w-3 h-3 text-white" />}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Email (receipt + account) */}
              <label className="mt-5 block">
                <span className="text-sm font-semibold text-white">{t('checkout.email')}</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full min-h-[48px] rounded-xl border border-white/15 bg-white/5 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-krown-orange"
                />
                <span className="mt-1 block text-[11px] text-white/40">{t('checkout.emailHint')}</span>
              </label>

              {!isMaterials && (
                <ul className="mt-5 space-y-1.5 text-xs text-white/50">
                  <li>✨ {t('packs.benefitClean')}</li>
                  <li>♾️ {t('packs.never')}</li>
                  <li>🗂️ {t('packs.allCategories')}</li>
                </ul>
              )}

              {error && (
                <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={busy || !product}
                aria-busy={busy}
                className="w-full mt-6 min-h-[52px] py-3 bg-gradient-to-r from-krown-red to-krown-orange rounded-xl font-bold text-white hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
              >
                {busy ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    {t('checkout.redirecting').replace('{gateway}', gateway === 'paystack' ? 'Paystack' : 'Monetbil')}
                  </>
                ) : (
                  <>
                    {t('checkout.pay')
                      .replace('{amount}', amountLabel)
                      .replace('{gateway}', gateway === 'paystack' ? 'Paystack' : 'Monetbil')}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/40">
                <Lock className="w-3 h-3" aria-hidden="true" />
                {isMaterials ? t('checkout.secureMaterials') : t('checkout.secure')}
              </p>

              {!isMaterials && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <Link to="/pricing" onClick={onClose} className="text-krown-orange hover:underline">
                    {t('packs.seePricing')}
                  </Link>
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] px-2 text-white/60 hover:text-white transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    {t('packs.later')}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
  );
}
