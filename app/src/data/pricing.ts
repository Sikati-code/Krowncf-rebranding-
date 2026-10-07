// Single source of truth for everything the site sells. Imported by the pages
// AND by the payment functions in /api, so the server always charges these
// amounts — never an amount sent by the browser.
//
// Designs have no individual prices: users buy packs of download credits.
// One credit = one clean, full-resolution design. Credits never expire.

export type Gateway = 'paystack' | 'monetbil';

export interface CreditPack {
  id: 'single' | 'pack5' | 'pack10';
  credits: number;
  /** Price in Naira (Paystack). */
  ngn: number;
  /** Price in Central African Francs (Monetbil). null = Monetbil hidden for this item. */
  xaf: number | null;
  name: { en: string; fr: string };
  blurb: { en: string; fr: string };
  badge?: { en: string; fr: string };
  /** Visually highlighted as the best value. */
  highlight?: boolean;
}

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'single',
    credits: 1,
    ngn: 1200,
    xaf: 500,
    name: { en: 'Single File', fr: 'Fichier Unique' },
    blurb: { en: 'Download 1 design, clean.', fr: 'Téléchargez 1 design, sans filigrane.' },
  },
  {
    id: 'pack5',
    credits: 5,
    ngn: 4800,
    xaf: 2000,
    name: { en: 'Pack of 5', fr: 'Pack de 5' },
    blurb: { en: 'Download any 5 designs, clean.', fr: "Téléchargez 5 designs au choix, sans filigrane." },
    badge: { en: 'Save 20%', fr: 'Économisez 20 %' },
  },
  {
    id: 'pack10',
    credits: 10,
    ngn: 8250,
    xaf: 3500,
    name: { en: 'Pack of 10', fr: 'Pack de 10' },
    blurb: { en: 'Download any 10 designs, clean.', fr: 'Téléchargez 10 designs au choix, sans filigrane.' },
    badge: { en: 'Best value', fr: 'Meilleure offre' },
    highlight: true,
  },
];

/** Optional training materials, assets & templates (enrollment itself is free). */
export const MATERIALS = { ngn: 50000, xaf: 20000 as number | null };

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
export const formatXaf = (amount: number) => `${amount.toLocaleString('fr-FR').replace(/\s/g, ' ')} FCFA`;

/** What the checkout can sell. Course materials are `materials:<courseId>`. */
export type ProductId = CreditPack['id'] | `materials:${string}`;

export interface ResolvedProduct {
  id: ProductId;
  kind: 'pack' | 'materials';
  credits: number;
  ngn: number;
  xaf: number | null;
  courseId?: string;
}

export function resolveProduct(id: string): ResolvedProduct | null {
  const pack = CREDIT_PACKS.find((p) => p.id === id);
  if (pack) return { id: pack.id, kind: 'pack', credits: pack.credits, ngn: pack.ngn, xaf: pack.xaf };
  const m = /^materials:([a-z0-9-]{1,40})$/.exec(id);
  if (m) return { id: id as ProductId, kind: 'materials', credits: 0, ngn: MATERIALS.ngn, xaf: MATERIALS.xaf, courseId: m[1] };
  return null;
}

/** Gateways that can sell this product (Monetbil needs an XAF price). */
export function gatewaysFor(product: ResolvedProduct): Gateway[] {
  return product.xaf ? ['paystack', 'monetbil'] : ['paystack'];
}
