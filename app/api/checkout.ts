// POST /api/checkout  { product, gateway, email, locale } → { url, reference }
// Starts a payment with the chosen gateway. Prices come from src/data/pricing.ts
// on the server; the browser never sends an amount.

import {
  PaymentError,
  errorResponse,
  isEmail,
  json,
  logTransaction,
  monetbilInitialize,
  newReference,
  paystackInitialize,
  requireProduct,
  siteUrl,
} from './_lib/payments.js';
import { gatewaysFor, type Gateway } from '../src/data/pricing.js';

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      throw new PaymentError('bad_request', 'Expected a JSON body');
    }

    const product = requireProduct(body.product);
    const gateway = body.gateway as Gateway;
    if (gateway !== 'paystack' && gateway !== 'monetbil') throw new PaymentError('unknown_gateway', 'Unknown gateway');
    if (!gatewaysFor(product).includes(gateway)) {
      throw new PaymentError('currency_unavailable', 'This gateway is not available for this product');
    }
    if (!isEmail(body.email)) throw new PaymentError('bad_email', 'A valid email address is required');
    const locale = body.locale === 'fr' ? 'fr' : 'en';

    const site = siteUrl(request);
    const reference = newReference();
    const url =
      gateway === 'paystack'
        ? await paystackInitialize({
            product,
            email: body.email,
            reference,
            callbackUrl: `${site}/payment/callback/paystack`,
          })
        : await monetbilInitialize({
            product,
            email: body.email,
            reference,
            locale,
            returnUrl: `${site}/payment/callback/monetbil`,
            notifyUrl: `${site}/api/webhooks/monetbil`,
            logoUrl: `${site}/icons/icon-192.png`,
          });

    logTransaction({
      stage: 'initialized',
      gateway,
      reference,
      product: product.id,
      amount: gateway === 'paystack' ? product.ngn : (product.xaf ?? undefined),
      currency: gateway === 'paystack' ? 'NGN' : 'XAF',
      email: body.email,
    });
    return json({ url, reference });
  } catch (err) {
    return errorResponse(err);
  }
}
