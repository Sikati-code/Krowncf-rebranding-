// Server-only payment helpers for Paystack (NGN) and Monetbil (XAF, Mobile Money).
// Files under api/_lib are not exposed as routes by Vercel.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   PAYSTACK_SECRET_KEY       sk_live_… / sk_test_…
//   MONETBIL_SERVICE_KEY      from https://www.monetbil.com/services
//   MONETBIL_SERVICE_SECRET   from the same page
// Optional:
//   PUBLIC_SITE_URL           e.g. https://krowncf.com (defaults to the request origin)
//   MONETBIL_ALLOW_TESTMODE   "true" to accept Monetbil sandbox payments (testing only)

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { resolveProduct, type Gateway, type ResolvedProduct } from '../../src/data/pricing.js';

export type PaymentStatus = 'success' | 'failed' | 'cancelled' | 'pending';

export class PaymentError extends Error {
  status: number;
  code: string;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export function errorResponse(err: unknown) {
  if (err instanceof PaymentError) return json({ error: err.code, message: err.message }, err.status);
  console.error('[payments] unexpected error', err);
  return json({ error: 'server_error', message: 'Unexpected server error' }, 500);
}

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new PaymentError('gateway_not_configured', `${name} is not set`, 503);
  return value;
}

export const siteUrl = (request: Request) =>
  (process.env.PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/+$/, '');

export const newReference = () => `KCF-${Date.now().toString(36).toUpperCase()}-${randomBytes(4).toString('hex').toUpperCase()}`;

const maskEmail = (email?: string) => (email ? email.replace(/^(.).*(@.*)$/, '$1***$2') : undefined);

/** Structured transaction log line — searchable in Vercel → Logs. */
export function logTransaction(entry: {
  stage: 'initialized' | 'verified' | 'webhook' | 'rejected';
  gateway: Gateway;
  reference?: string;
  product?: string;
  amount?: number;
  currency?: string;
  status?: PaymentStatus | string;
  email?: string;
  note?: string;
}) {
  console.log(JSON.stringify({ type: 'krown_payment', at: new Date().toISOString(), ...entry, email: maskEmail(entry.email) }));
}

export function requireProduct(id: unknown): ResolvedProduct {
  const product = typeof id === 'string' ? resolveProduct(id) : null;
  if (!product) throw new PaymentError('unknown_product', 'Unknown product');
  return product;
}

export function isEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function fetchJson(url: string, init: RequestInit) {
  let res: Response;
  try {
    res = await fetch(url, { ...init, signal: AbortSignal.timeout(20_000) });
  } catch (err) {
    console.error('[payments] gateway network error', url, err);
    throw new PaymentError('gateway_unreachable', 'Payment provider unreachable', 502);
  }
  const text = await res.text();
  let body: unknown = null;
  try {
    body = JSON.parse(text);
  } catch {
    // non-JSON body
  }
  return { ok: res.ok, status: res.status, body: body as Record<string, unknown> | null };
}

// ---------------------------------------------------------------- Paystack --

const PAYSTACK_API = 'https://api.paystack.co';

export async function paystackInitialize(opts: {
  product: ResolvedProduct;
  email: string;
  reference: string;
  callbackUrl: string;
}) {
  const secret = env('PAYSTACK_SECRET_KEY');
  const { ok, body } = await fetchJson(`${PAYSTACK_API}/transaction/initialize`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: opts.email,
      amount: opts.product.ngn * 100, // kobo
      currency: 'NGN',
      reference: opts.reference,
      callback_url: opts.callbackUrl,
      metadata: { product: opts.product.id, site: 'krowncf' },
    }),
  });
  const data = body?.data as { authorization_url?: string } | undefined;
  if (!ok || body?.status !== true || !data?.authorization_url) {
    console.error('[paystack] initialize failed', body?.message);
    throw new PaymentError('gateway_rejected', String(body?.message || 'Paystack rejected the payment'), 502);
  }
  return data.authorization_url;
}

export async function paystackVerify(reference: string) {
  const secret = env('PAYSTACK_SECRET_KEY');
  if (!/^[A-Za-z0-9._=-]{1,100}$/.test(reference)) throw new PaymentError('bad_reference', 'Invalid reference');
  const { body } = await fetchJson(`${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const data = body?.data as
    | { status?: string; amount?: number; currency?: string; metadata?: { product?: string } | string; customer?: { email?: string } }
    | undefined;
  if (body?.status !== true || !data) return { status: 'failed' as PaymentStatus, reason: String(body?.message || 'not_found') };

  const meta = typeof data.metadata === 'object' && data.metadata ? data.metadata : {};
  const product = resolveProduct(String(meta.product ?? ''));
  const raw = data.status;
  let status: PaymentStatus =
    raw === 'success' ? 'success' : raw === 'abandoned' ? 'cancelled' : raw === 'failed' || raw === 'reversed' ? 'failed' : 'pending';

  // Never trust the amount: it must match the catalogue price exactly.
  if (status === 'success' && (!product || data.currency !== 'NGN' || data.amount !== product.ngn * 100)) {
    logTransaction({ stage: 'rejected', gateway: 'paystack', reference, product: product?.id, amount: data.amount, currency: data.currency, note: 'amount/product mismatch' });
    status = 'failed';
  }
  return { status, product, amount: (data.amount ?? 0) / 100, currency: data.currency, email: data.customer?.email };
}

export function paystackSignatureValid(rawBody: string, signature: string | null) {
  const secret = env('PAYSTACK_SECRET_KEY');
  if (!signature) return false;
  const expected = createHmac('sha512', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

// ---------------------------------------------------------------- Monetbil --
// Mirrors Monetbil's official PHP SDK (github.com/Monetbil/monetbil-php):
// widget v2.1 → POST https://www.monetbil.com/widget/v2.1/{service_key} → { payment_url }
// sign = md5(service_secret + values sorted by key); checkPayment → transaction.status

const MONETBIL_WIDGET = 'https://www.monetbil.com/widget/v2.1/';
const MONETBIL_CHECK = 'https://api.monetbil.com/payment/v1/checkPayment';

export function monetbilSign(secret: string, params: Record<string, string>) {
  const keys = Object.keys(params).sort();
  return createHash('md5').update(secret + keys.map((k) => params[k]).join('')).digest('hex');
}

export function monetbilSignatureValid(params: Record<string, string>) {
  const secret = env('MONETBIL_SERVICE_SECRET');
  const { sign, ...rest } = params;
  if (!sign) return false;
  const expected = monetbilSign(secret, rest);
  const a = Buffer.from(expected);
  const b = Buffer.from(String(sign).toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function monetbilInitialize(opts: {
  product: ResolvedProduct;
  email: string;
  reference: string;
  returnUrl: string;
  notifyUrl: string;
  locale: 'en' | 'fr';
  logoUrl: string;
}) {
  const serviceKey = env('MONETBIL_SERVICE_KEY');
  const secret = env('MONETBIL_SERVICE_SECRET');
  if (!opts.product.xaf) throw new PaymentError('currency_unavailable', 'No XAF price for this product');

  const args: Record<string, string> = {
    amount: String(opts.product.xaf),
    currency: 'XAF',
    locale: opts.locale,
    item_ref: opts.product.id,
    payment_ref: opts.reference,
    email: opts.email,
    return_url: opts.returnUrl,
    notify_url: opts.notifyUrl,
    logo: opts.logoUrl,
  };
  const form = new URLSearchParams({ ...args, sign: monetbilSign(secret, args) });
  const { ok, body } = await fetchJson(`${MONETBIL_WIDGET}${encodeURIComponent(serviceKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });
  const url = body?.payment_url;
  if (!ok || typeof url !== 'string' || !url) {
    console.error('[monetbil] widget init failed', body);
    throw new PaymentError('gateway_rejected', 'Monetbil rejected the payment', 502);
  }
  return url;
}

export async function monetbilCheck(transactionId: string): Promise<{ status: PaymentStatus; amount?: number }> {
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(transactionId)) throw new PaymentError('bad_reference', 'Invalid transaction id');
  const { body } = await fetchJson(MONETBIL_CHECK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ paymentId: transactionId }).toString(),
  });
  const tx = body?.transaction as { status?: number | string; amount?: number | string } | undefined;
  if (!tx) return { status: 'pending' };
  const code = Number(tx.status);
  const allowTest = process.env.MONETBIL_ALLOW_TESTMODE === 'true';
  const status: PaymentStatus =
    code === 1 || (allowTest && code === 7)
      ? 'success'
      : code === -1 || code === 9
        ? 'cancelled'
        : code === 0 || code === 8 || code === 7
          ? 'failed'
          : 'pending';
  return { status, amount: tx.amount !== undefined ? Number(tx.amount) : undefined };
}

export async function readForm(request: Request): Promise<Record<string, string>> {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) {
    const body = (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(body).map(([k, v]) => [k, String(v ?? '')]));
  }
  return Object.fromEntries(new URLSearchParams(await request.text()));
}
