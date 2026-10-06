// Open Graph metadata for design pages. DOM-free so it can run both in the app
// and at build time (vite.config.ts pre-renders one HTML file per design).

import { categories } from '../data/categories';
import { logos } from '../data/logos';

export const SITE_URL = 'https://krowncf.com';
export const BRAND_NAME = 'Krown Creative Factory';

type Lang = 'en' | 'fr';

export interface OgMeta {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const absoluteUrl = (path: string) =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${encodeURI(path.startsWith('/') ? path : `/${path}`)}`;

const ATTRIBUTION = {
  en: '🔥 Designed by Krown Creative Factory — premium African designs at krowncf.com',
  fr: '🔥 Conçu par Krown Creative Factory — designs africains premium sur krowncf.com',
};

const LOGO_LINE = { en: 'Logo design', fr: 'Création de logo' };

/** Title + short line for a design or portfolio logo, or null if the id is unknown. */
export function findShareable(id: string, lang: Lang = 'en') {
  for (const category of categories) {
    const design = category.designs.find((d) => d.id === id);
    if (design) {
      return {
        id,
        trackId: id,
        title: lang === 'fr' ? design.titleFr : design.title,
        line: lang === 'fr' ? category.descriptionFr : category.description,
        image: design.image,
      };
    }
  }
  const logo = logos.find((l) => String(l.id) === id);
  if (logo) {
    return {
      id,
      trackId: `logo-${logo.id}`,
      title: logo.name,
      line: `${LOGO_LINE[lang]} · ${logo.industry}`,
      image: logo.image,
    };
  }
  return null;
}

export function ogFor(id: string, lang: Lang = 'en'): OgMeta | null {
  const item = findShareable(id, lang);
  if (!item) return null;
  return {
    title: `${item.title} | ${BRAND_NAME}`,
    description: `${item.line}. ${ATTRIBUTION[lang]}`,
    image: absoluteUrl(item.image),
    url: `${SITE_URL}/design/${encodeURIComponent(id)}`,
  };
}

/** Every routable design id (category designs + portfolio logos). */
export function allDesignIds() {
  return [...categories.flatMap((c) => c.designs.map((d) => d.id)), ...logos.map((l) => String(l.id))];
}
