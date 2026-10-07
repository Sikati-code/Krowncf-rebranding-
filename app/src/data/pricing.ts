// Download credit packs (Alamy-style). One credit = one clean, full-resolution
// design download. Credits never expire and work across every category.
// PLACEHOLDER PRICES — edit here; every page reads from this file.

export interface CreditPack {
  id: 'single' | 'pack5' | 'pack10';
  credits: number;
  price: number; // in Naira
  name: { en: string; fr: string };
  blurb: { en: string; fr: string };
  badge?: { en: string; fr: string };
}

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'single',
    credits: 1,
    price: 2000,
    name: { en: 'Single Image', fr: 'Image Unique' },
    blurb: { en: 'One clean, full-resolution design.', fr: 'Un design sans filigrane, en pleine résolution.' },
  },
  {
    id: 'pack5',
    credits: 5,
    price: 8000,
    name: { en: 'Pack of 5', fr: 'Pack de 5' },
    blurb: { en: 'Five downloads, use them any time.', fr: 'Cinq téléchargements, à utiliser quand vous voulez.' },
    badge: { en: 'Save 20%', fr: 'Économisez 20 %' },
  },
  {
    id: 'pack10',
    credits: 10,
    price: 15000,
    name: { en: 'Pack of 10', fr: 'Pack de 10' },
    blurb: { en: 'Ten downloads at the lowest price per image.', fr: "Dix téléchargements au meilleur prix par image." },
    badge: { en: 'Best value', fr: 'Meilleure offre' },
  },
];

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;

export const pricePerImage = (pack: CreditPack) => Math.round(pack.price / pack.credits);
