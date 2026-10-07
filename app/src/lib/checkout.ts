// Browser side of checkout. Talks to the serverless functions in /api — no
// gateway keys live in the browser. Credits are only granted after /api/verify
// has confirmed the payment with Paystack or Monetbil.

import type { Gateway, ProductId } from '../data/pricing';

export type CheckoutErrorCode =
  | 'network'
  | 'gateway_not_configured'
  | 'gateway_unreachable'
  | 'gateway_rejected'
  | 'bad_email'
  | 'currency_unavailable'
  | 'unknown';

export class CheckoutError extends Error {
  code: CheckoutErrorCode;
  constructor(code: CheckoutErrorCode, message?: string) {
    super(message || code);
    this.code = code;
  }
}

const KNOWN: CheckoutErrorCode[] = ['gateway_not_configured', 'gateway_unreachable', 'gateway_rejected', 'bad_email', 'currency_unavailable'];

async function postJson<T>(url: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new CheckoutError('network');
  }
  const data = (await res.json().catch(() => null)) as (T & { error?: string; message?: string }) | null;
  if (!res.ok || !data) {
    const code = data?.error as CheckoutErrorCode | undefined;
    // 404 = the /api functions aren't deployed (e.g. plain `vite dev`).
    throw new CheckoutError(code && KNOWN.includes(code) ? code : res.status === 404 ? 'gateway_not_configured' : 'unknown', data?.message);
  }
  return data;
}

// --- Pending orders (so the return page knows where the user came from) ---

const PENDING_KEY = 'krown-pending-payment';

export interface PendingPayment {
  reference: string;
  product: ProductId;
  gateway: Gateway;
  email: string;
  returnTo: string;
  startedAt: string;
}

export function getPendingPayment(): PendingPayment | null {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || 'null');
  } catch {
    return null;
  }
}

export function clearPendingPayment() {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {
    // ignore
  }
}

/** Creates the payment on the server and sends the browser to the gateway's page. */
export async function startCheckout(opts: { product: ProductId; gateway: Gateway; email: string; locale: 'en' | 'fr' }) {
  const { url, reference } = await postJson<{ url: string; reference: string }>('/api/checkout', opts);
  const pending: PendingPayment = {
    reference,
    product: opts.product,
    gateway: opts.gateway,
    email: opts.email,
    returnTo: window.location.pathname + window.location.hash,
    startedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    // storage unavailable — the return page still works from the URL
  }
  window.location.assign(url);
}

export interface VerifyResult {
  status: 'success' | 'failed' | 'cancelled' | 'pending';
  reference: string;
  product: ProductId | null;
  kind: 'pack' | 'materials' | null;
  credits: number;
  courseId: string | null;
}

/** Asks the server to confirm the payment with the gateway. */
export function verifyPayment(gateway: Gateway, params: Record<string, string>) {
  return postJson<VerifyResult>('/api/verify', { gateway, params });
}

/** Cameroon visitors default to Monetbil (Mobile Money, XAF); everyone else to Paystack. */
export function preferredGateway(lang: 'en' | 'fr'): Gateway {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Africa/Douala') return 'monetbil';
    if (tz === 'Africa/Lagos') return 'paystack';
  } catch {
    // ignore
  }
  return lang === 'fr' ? 'monetbil' : 'paystack';
}
