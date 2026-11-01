import type { ColorKey } from '../api/types';

// Contact's accent is ink, which is deliberately not a ColorKey — ColorKey is
// also the Strapi colorKey enumeration and must stay at six values. Widening
// these maps is backward compatible: every ColorKey lookup still resolves.
export type AccentKey = ColorKey | 'ink';

export const ACCENT_BG: Record<AccentKey, string> = {
  gold: 'bg-gold', teal: 'bg-teal', rose: 'bg-rose',
  green: 'bg-green', purple: 'bg-purple', cobalt: 'bg-cobalt', ink: 'bg-ink',
};

export const ACCENT_TEXT: Record<AccentKey, string> = {
  gold: 'text-gold', teal: 'text-teal', rose: 'text-rose',
  green: 'text-green', purple: 'text-purple', cobalt: 'text-cobalt', ink: 'text-ink',
};

export const ACCENT_BORDER: Record<AccentKey, string> = {
  gold: 'border-gold', teal: 'border-teal', rose: 'border-rose',
  green: 'border-green', purple: 'border-purple', cobalt: 'border-cobalt', ink: 'border-ink',
};

export const ACCENT_BORDER_SOFT: Record<AccentKey, string> = {
  gold: 'border-gold/45', teal: 'border-teal/45', rose: 'border-rose/45',
  green: 'border-green/45', purple: 'border-purple/45', cobalt: 'border-cobalt/45', ink: 'border-ink/25',
};

/** Placeholder tints behind images. Written out so Tailwind's scanner sees them. */
export type Tone = 'ph' | 'ph-warm' | 'ph-cool';
export const TONE_BG: Record<Tone, string> = {
  ph: 'bg-ph', 'ph-warm': 'bg-ph-warm', 'ph-cool': 'bg-ph-cool',
};

export const ACCENT_CHIP_HOVER: Record<ColorKey, string> = {
  gold: 'hover:border-gold hover:bg-gold hover:text-white',
  teal: 'hover:border-teal hover:bg-teal hover:text-white',
  rose: 'hover:border-rose hover:bg-rose hover:text-white',
  green: 'hover:border-green hover:bg-green hover:text-white',
  purple: 'hover:border-purple hover:bg-purple hover:text-white',
  cobalt: 'hover:border-cobalt hover:bg-cobalt hover:text-white',
};

export const ACCENT_LIGHTBOX_HOVER: Record<ColorKey, string> = {
  gold: 'hover:bg-gold hover:border-gold', teal: 'hover:bg-teal hover:border-teal',
  rose: 'hover:bg-rose hover:border-rose', green: 'hover:bg-green hover:border-green',
  purple: 'hover:bg-purple hover:border-purple', cobalt: 'hover:bg-cobalt hover:border-cobalt',
};
