// POST /api/webhooks/paystack — set this URL in Paystack → Settings → API Keys & Webhooks.
// Verifies the x-paystack-signature header and logs the event. When user accounts
// move to a server database, credit the account here (idempotently, by reference).

import { errorResponse, json, logTransaction, paystackSignatureValid } from '../_lib/payments.js';

interface PaystackEvent {
  event?: string;
  data?: {
    reference?: string;
    amount?: number;
    currency?: string;
    status?: string;
    metadata?: { product?: string };
    customer?: { email?: string };
  };
}

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (!paystackSignatureValid(raw, request.headers.get('x-paystack-signature'))) {
      logTransaction({ stage: 'rejected', gateway: 'paystack', note: 'bad webhook signature' });
      return json({ error: 'bad_signature' }, 401);
    }
    const event = JSON.parse(raw) as PaystackEvent;
    logTransaction({
      stage: 'webhook',
      gateway: 'paystack',
      reference: event.data?.reference,
      product: event.data?.metadata?.product,
      amount: (event.data?.amount ?? 0) / 100,
      currency: event.data?.currency,
      status: event.event === 'charge.success' ? 'success' : (event.data?.status ?? event.event),
      email: event.data?.customer?.email,
      note: event.event,
    });
    return json({ received: true });
  } catch (err) {
    return errorResponse(err);
  }
}
