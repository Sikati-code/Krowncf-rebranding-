import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Clock, AlertTriangle, Mail, MessageCircle, Coins, RotateCcw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useCheckout } from '../contexts/CheckoutContext';
import { CheckoutError, clearPendingPayment, getPendingPayment, verifyPayment, type VerifyResult } from '../lib/checkout';
import type { Gateway } from '../data/pricing';

type View = 'verifying' | 'success' | 'cancelled' | 'failed' | 'pending' | 'error';

const SUPPORT_EMAIL = 'info@krowncf.com';
const SUPPORT_WHATSAPP = '2348136804699';

/**
 * Landing page after Paystack / Monetbil. Credits are granted only when the
 * server confirms the payment with the gateway — never from the URL alone.
 */
export default function PaymentCallback() {
  const { gateway } = useParams();
  const { t } = useLanguage();
  const { user, signIn, addCredits, addMaterials } = useUser();
  const { openCheckout } = useCheckout();
  const [view, setView] = useState<View>('verifying');
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [pending] = useState(() => getPendingPayment());
  const ran = useRef(false);

  const verify = useCallback(async () => {
    if (gateway !== 'paystack' && gateway !== 'monetbil') {
      setView('error');
      return;
    }
    setView('verifying');
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    try {
      const r = await verifyPayment(gateway as Gateway, params);
      setResult(r);
      if (r.status === 'success') {
        // Checkout email becomes the account (mock auth until a real backend exists).
        if (!user.signedIn && pending?.email) signIn(pending.email);
        if (r.kind === 'pack' && r.product) addCredits(r.reference, r.product, r.credits);
        if (r.kind === 'materials' && r.courseId) addMaterials(r.reference, r.courseId);
        clearPendingPayment();
      }
      setView(r.status);
    } catch (err) {
      console.warn('Payment verification failed:', err);
      setView(err instanceof CheckoutError && err.code !== 'network' ? 'failed' : 'error');
    }
  }, [gateway, user.signedIn, pending, signIn, addCredits, addMaterials]);

  useEffect(() => {
    if (ran.current) return; // verify once (StrictMode runs effects twice in dev)
    ran.current = true;
    void verify();
  }, [verify]);

  const back = pending?.returnTo || '/';
  const retryPurchase = () => openCheckout({ product: pending?.product });

  const views: Record<View, { icon: typeof CheckCircle2; tone: string; title: string; body: string }> = {
    verifying: { icon: Loader2, tone: 'text-white/70', title: t('pay.verifying'), body: t('pay.verifyingBody') },
    success: {
      icon: CheckCircle2,
      tone: 'text-green-400',
      title: t('pay.success'),
      body:
        result?.kind === 'materials'
          ? t('pay.successMaterials')
          : t('pay.successCredits').replace('{count}', String(result?.credits ?? 0)),
    },
    cancelled: { icon: XCircle, tone: 'text-white/60', title: t('pay.cancelled'), body: t('pay.cancelledBody') },
    failed: { icon: XCircle, tone: 'text-red-400', title: t('pay.failed'), body: t('pay.failedBody') },
    pending: { icon: Clock, tone: 'text-yellow-300', title: t('pay.pending'), body: t('pay.pendingBody') },
    error: { icon: AlertTriangle, tone: 'text-yellow-300', title: t('pay.error'), body: t('pay.errorBody') },
  };
  const v = views[view];

  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      <main className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto glass-card rounded-2xl p-6 sm:p-8 text-center"
          role="status"
          aria-live="polite"
        >
          <v.icon className={`w-14 h-14 mx-auto ${v.tone} ${view === 'verifying' ? 'animate-spin' : ''}`} aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold">{v.title}</h1>
          <p className="mt-2 text-white/70">{v.body}</p>
          {result?.reference && view !== 'verifying' && (
            <p className="mt-3 text-[11px] text-white/40">
              {t('pay.reference')}: <span className="font-mono">{result.reference}</span>
            </p>
          )}

          {view === 'success' && result?.kind === 'pack' && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 px-4 py-1.5 text-sm text-yellow-300">
              <Coins className="w-4 h-4" aria-hidden="true" />
              {t('packs.balance').replace('{count}', String(user.credits))}
            </p>
          )}

          {/* Paid course-materials buyers get email + WhatsApp support. */}
          {view === 'success' && result?.kind === 'materials' && (
            <div className="mt-5 space-y-2 text-left">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-3 min-h-[48px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm hover:bg-white/10">
                <Mail className="w-4 h-4 text-krown-orange" aria-hidden="true" />
                {SUPPORT_EMAIL}
              </a>
              <a
                href={`https://wa.me/${SUPPORT_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 min-h-[48px] rounded-xl bg-white/5 border border-white/10 px-4 text-sm hover:bg-white/10"
              >
                <MessageCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                {t('pay.materialsSupport')}
              </a>
            </div>
          )}

          <div className="mt-6 grid gap-3">
            {(view === 'pending' || view === 'error') && (
              <button
                type="button"
                onClick={() => void verify()}
                className="min-h-[48px] rounded-xl bg-gradient-to-r from-krown-red to-krown-orange font-bold flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                {t('pay.checkAgain')}
              </button>
            )}
            {(view === 'failed' || view === 'cancelled') && (
              <button
                type="button"
                onClick={retryPurchase}
                className="min-h-[48px] rounded-xl bg-gradient-to-r from-krown-red to-krown-orange font-bold"
              >
                {t('pay.tryAgain')}
              </button>
            )}
            {view !== 'verifying' && (
              <Link to={back} className="min-h-[48px] rounded-xl border border-white/20 bg-white/5 font-semibold flex items-center justify-center hover:bg-white/10">
                {view === 'success' ? t('pay.continue') : t('pay.back')}
              </Link>
            )}
          </div>

          {(view === 'failed' || view === 'error' || view === 'pending') && (
            <p className="mt-5 text-xs text-white/40">
              {t('pay.help')} <a href={`mailto:${SUPPORT_EMAIL}`} className="text-krown-orange hover:underline">{SUPPORT_EMAIL}</a>
            </p>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
