// Single source of truth for site navigation: header, mega menu, mobile menu,
// footer, quick-jump button, breadcrumbs and search all read from here.

import {
  Home,
  LayoutGrid,
  GraduationCap,
  Mic,
  Clapperboard,
  Images,
  Crown,
  Info,
  Mail,
  Coins,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  id: string;
  /** Translation key for the label. */
  labelKey: string;
  /** Translation key for the one-line description (mega menu, quick jump, search). */
  descKey: string;
  to: string;
  icon: LucideIcon;
  group: 'main' | 'explore' | 'company';
  /** Other paths that count as this item (aliases, child routes). */
  match?: string[];
  /** Extra words that find this item in search. */
  keywords?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelKey: 'nav.home', descKey: 'nav.desc.home', to: '/', icon: Home, group: 'main', keywords: 'accueil home' },
  {
    id: 'categories',
    labelKey: 'nav.categories',
    descKey: 'nav.desc.categories',
    to: '/categories',
    icon: LayoutGrid,
    group: 'explore',
    match: ['/categories/'],
    keywords: 'flyers templates modèles',
  },
  {
    id: 'training',
    labelKey: 'nav.training',
    descKey: 'nav.desc.training',
    to: '/training',
    icon: GraduationCap,
    group: 'explore',
    keywords: 'course courses cours formation enroll inscription',
  },
  {
    id: 'podcast',
    labelKey: 'nav.podcast',
    descKey: 'nav.desc.podcast',
    to: '/podcast',
    icon: Mic,
    group: 'explore',
    match: ['/podcasts'],
    keywords: 'spotify youtube episode épisode kreativity',
  },
  {
    id: 'entertainment',
    labelKey: 'nav.entertainment',
    descKey: 'nav.desc.entertainment',
    to: '/entertainment',
    icon: Clapperboard,
    group: 'explore',
    keywords: 'video vidéo divertissement',
  },
  {
    id: 'allDesigns',
    labelKey: 'nav.allDesigns',
    descKey: 'nav.desc.allDesigns',
    to: '/designs/all',
    icon: Images,
    group: 'explore',
    match: ['/all-designs'],
    keywords: 'portfolio logos',
  },
  {
    id: 'brands',
    labelKey: 'nav.brands',
    descKey: 'nav.desc.brands',
    to: '/#brands',
    icon: Crown,
    group: 'explore',
    keywords: 'brands marques clients logos portfolio',
  },
  { id: 'pricing', labelKey: 'nav.pricing', descKey: 'nav.desc.pricing', to: '/pricing', icon: Coins, group: 'company', keywords: 'pack packs prix tarifs credits crédits' },
  { id: 'about', labelKey: 'nav.about', descKey: 'nav.desc.about', to: '/about', icon: Info, group: 'company', keywords: 'team équipe' },
  { id: 'contact', labelKey: 'nav.contact', descKey: 'nav.desc.contact', to: '/contact', icon: Mail, group: 'company', keywords: 'email' },
];

export const navItem = (id: string) => NAV_ITEMS.find((item) => item.id === id)!;
export const EXPLORE_ITEMS = NAV_ITEMS.filter((item) => item.group === 'explore');
export const COMPANY_ITEMS = NAV_ITEMS.filter((item) => item.group === 'company');

/** Hash aliases: `/#brands` is the logo portfolio section (`#portfolio`). */
export const HASH_ALIASES: Record<string, string> = { brands: 'portfolio' };

export function isNavActive(item: NavItem, pathname: string, hash: string) {
  const [path, anchor] = item.to.split('#');
  const currentAnchor = hash.replace(/^#/, '');
  if (anchor) {
    return pathname === path && (currentAnchor === anchor || HASH_ALIASES[anchor] === currentAnchor);
  }
  if (path === '/') return pathname === '/' && !currentAnchor;
  if (pathname === path) return true;
  return (item.match ?? []).some((m) => (m.endsWith('/') ? pathname.startsWith(m) : pathname === m));
}
