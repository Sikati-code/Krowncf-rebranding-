// POST /api/verify  { gateway, params } → { status, product, kind, credits, courseId, reference }
// Called by /payment/callback/:gateway after the user returns from the gateway.
// Confirms the payment directly with the provider — the redirect alone proves nothing.

import {
  PaymentError,
  errorResponse,
  json,
  logTransaction,
  monetbilCheck,
  monetbilSignatureValid,
  paystackVerify,
  type PaymentStatus,
} from './_lib/payments.js';
import { resolveProduct, type ResolvedProduct } from '../src/data/pricing.js';

function result(status: PaymentStatus, reference: string, product?: ResolvedProduct | null) {
  return json({
    status,
    reference,
    product: product?.id ?? null,
    kind: product?.kind ?? null,
    credits: status === 'success' ? (product?.credits ?? 0) : 0,
    courseId: product?.courseId ?? null,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { gateway?: string; params?: Record<string, unknown> } | null;
    const params = body?.params && typeof body.params === 'object' ? body.params : {};
    const clean: Record<string, string> = Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]));

    if (body?.gateway === 'paystack') {
      const reference = clean.reference || clean.trxref;
      if (!reference) throw new PaymentError('bad_reference', 'Missing reference');
      const v = await paystackVerify(reference);
      logTransaction({
        stage: 'verified',
        gateway: 'paystack',
        reference,
        product: v.product?.id,
        amount: v.amount,
        currency: v.currency,
        status: v.status,
        email: v.email,
      });
      return result(v.status, reference, v.product);
    }

    if (body?.gateway === 'monetbil') {
      // The return URL parameters are signed by Monetbil with the service secret.
      if (!monetbilSignatureValid(clean)) {
        logTransaction({ stage: 'rejected', gateway: 'monetbil', reference: clean.payment_ref, note: 'bad signature' });
        throw new PaymentError('bad_signature', 'Invalid payment signature', 403);
      }
      const reference = clean.payment_ref;
      const product = resolveProduct(clean.item_ref || '');
      if (!reference || !clean.transaction_id || !product) throw new PaymentError('bad_reference', 'Missing payment details');

      const check = await monetbilCheck(clean.transaction_id);
      let status = check.status;
      if (status === 'success' && check.amount !== undefined && check.amount !== product.xaf) {
        logTransaction({
          stage: 'rejected',
          gateway: 'monetbil',
          reference,
          product: product.id,
          amount: check.amount,
          currency: 'XAF',
          note: 'amount mismatch',
        });
        status = 'failed';
      }
      logTransaction({
        stage: 'verified',
        gateway: 'monetbil',
        reference,
        product: product.id,
        amount: check.amount,
        currency: 'XAF',
        status,
        email: clean.email,
      });
      return result(status, reference, product);
    }

    throw new PaymentError('unknown_gateway', 'Unknown gateway');
  } catch (err) {
    return errorResponse(err);
  }
}
