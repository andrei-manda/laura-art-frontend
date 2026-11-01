import type { ColorKey } from '../api/types';

/** A path under public/images. A missing file shows the tinted placeholder. */
export type ImagePath = string;

export const img = (path: string): ImagePath => `/images/${path}`;

export interface SpecRow { label: string; value: string }

export interface CtaBlock { kicker?: string; headline: string; paragraph?: string; buttonText: string }

export interface CategorySection<C extends string = string> { slug: C; label: string; subtitle: string }

export interface ProcessStep { number: string; title: string; paragraph: string; image?: ImagePath }

interface HeroContent {
  heroAccentLabel: string;
  heroTitle: string;
  heroParagraph: string;
  heroSpecs: SpecRow[];
  bandImage?: ImagePath;
  /** Tailwind object-position classes, when the centre crop misses the subject. */
  bandFocus?: string;
}

export interface CatalogPageContent<C extends string = string> extends HeroContent {
  categorySections: CategorySection<C>[];
  cta: CtaBlock;
}

export interface CuratedPageContent extends HeroContent {
  worksLabel: string;
  worksHeadline: string;
  endCardLabel: string;
  endCardStatement: string;
  endCardLinkText: string;
  featuredLabel: string;
  enquireText: string;
  processHeadline: string;
  processSteps: ProcessStep[];
  cta: CtaBlock;
}

export interface LinkCard { label: string; colorKey: ColorKey; title: string; paragraph: string; linkText?: string; linkPath?: string }
