import { formatNaira, type CreditPack } from '../data/pricing';

// Hosted payment page for credit packs (e.g. a Paystack or Flutterwave payment
// link). While empty, buying opens WhatsApp with a pre-filled order so the team
// can take payment and add the credits.
//
// IMPORTANT: credits must only be added after payment is confirmed server-side
// (payment-provider webhook → your backend → user account). This site has no
// backend yet, so `addCredits` in UserContext is the integration point.
export const PACK_PAYMENT_URL: string = '';

const ORDER_WHATSAPP = '2348136804699';

export function startPackPurchase(pack: CreditPack, lang: 'en' | 'fr', email: string) {
  if (PACK_PAYMENT_URL) {
    const sep = PACK_PAYMENT_URL.includes('?') ? '&' : '?';
    window.open(
      `${PACK_PAYMENT_URL}${sep}pack=${pack.id}&amount=${pack.price}${email ? `&email=${encodeURIComponent(email)}` : ''}`,
      '_blank',
      'noopener,noreferrer',
    );
    return;
  }
  const message =
    lang === 'fr'
      ? `Bonjour Krown Creative Factory ! Je souhaite acheter le ${pack.name.fr} (${pack.credits} crédit${pack.credits > 1 ? 's' : ''}) pour ${formatNaira(pack.price)}.${email ? ` Mon compte : ${email}.` : ''} Merci de m'envoyer les détails de paiement.`
      : `Hello Krown Creative Factory! I'd like to buy the ${pack.name.en} (${pack.credits} credit${pack.credits > 1 ? 's' : ''}) for ${formatNaira(pack.price)}.${email ? ` My account: ${email}.` : ''} Please share the payment details.`;
  window.open(`https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}
