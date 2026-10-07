// POST /api/webhooks/monetbil — Monetbil's notify_url (sent automatically with each payment).
// Verifies the signature, re-checks the payment with Monetbil and logs it. When user
// accounts move to a server database, credit the account here (idempotently, by payment_ref).

import { errorResponse, logTransaction, monetbilCheck, monetbilSignatureValid, readForm } from '../_lib/payments.js';

export async function POST(request: Request) {
  try {
    const params = await readForm(request);
    if (!monetbilSignatureValid(params)) {
      logTransaction({ stage: 'rejected', gateway: 'monetbil', reference: params.payment_ref, note: 'bad webhook signature' });
      return new Response('Error: Invalid signature', { status: 403 });
    }
    const check = params.transaction_id
      ? await monetbilCheck(params.transaction_id)
      : { status: 'pending' as const, amount: undefined };
    logTransaction({
      stage: 'webhook',
      gateway: 'monetbil',
      reference: params.payment_ref,
      product: params.item_ref,
      amount: check.amount ?? (params.amount ? Number(params.amount) : undefined),
      currency: params.currency || 'XAF',
      status: check.status,
      email: params.email,
      note: params.message,
    });
    return new Response('received', { status: 200 });
  } catch (err) {
    return errorResponse(err);
  }
}
