import type { ColorKey } from './api/types';
import type { UI } from './content/ui';

export interface NavLink {
  /** Key into UI[locale].nav for the visible label. */
  key: Exclude<keyof (typeof UI)['en']['nav'], 'contact'>;
  colorKey: ColorKey;
  path: string;
}

/**
 * The site's section links, in nav order. Shared by the header, the footer and
 * the 404 page so the three can never drift apart.
 */
export const NAV_LINKS: NavLink[] = [
  { key: 'jewelry', colorKey: 'gold', path: '/jewelry' },
  { key: 'ecoGlass', colorKey: 'teal', path: '/eco-glass' },
  { key: 'diademe', colorKey: 'rose', path: '/diademe' },
  { key: 'decor', colorKey: 'green', path: '/decor' },
  { key: 'workshops', colorKey: 'purple', path: '/workshops' },
  { key: 'exhibitions', colorKey: 'cobalt', path: '/exhibitions' },
];

/** The four making disciplines — the footer's COLLECTIONS column. */
export const COLLECTION_LINKS = NAV_LINKS.slice(0, 4);

/** Workshops and Exhibitions — the footer's STUDIO column. */
export const STUDIO_LINKS = NAV_LINKS.slice(4);
