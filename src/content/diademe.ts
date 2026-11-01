import type { DiademeCategory } from '../api/types';
import type { Localized } from '../i18n';
import type { CatalogPageContent } from './types';
import { img } from './types';

export const DIADEME: Localized<CatalogPageContent<DiademeCategory>> = {
  ro: {
    heroAccentLabel: '03 / DIADEME · ROZ PAL',
    heroTitle: 'Diademe',
    heroParagraph:
      'Piese de cap sculpturale pentru ziua nunții, pentru scenă și pentru tot ce e între. Sârma e forjată și înfășurată de mână, apoi împodobită cu pietre, perle și sticlă — atât de ușoare încât uiți că le porți.',
    heroSpecs: [
      { label: 'MATERIAL', value: 'ALAMĂ · ARGINT · PERLĂ' },
      { label: 'FINISAJ', value: 'FORJAT MANUAL' },
      { label: 'CATEGORII', value: 'PATRU' },
      { label: 'ORIGINE', value: 'BUCUREȘTI, RO' },
    ],
    bandImage: img('diademe/band.jpg'),
    categorySections: [
      { slug: 'bridal', label: '01 — MIREASĂ', subtitle: 'Pentru ziua cea mare' },
      { slug: 'crowns', label: '02 — COROANE', subtitle: 'Cercuri complete pentru scenă și ceremonie' },
      { slug: 'hair-vines', label: '03 — VIȚE DE PĂR', subtitle: 'Lungi, împletite prin păr' },
      { slug: 'combs', label: '04 — PIEPTENI', subtitle: 'Ancore mici, cu pietre sau sculptate' },
    ],
    cta: {
      kicker: 'COMENZI DESCHISE',
      headline: 'Făcută pentru o singură persoană.',
      paragraph:
        'Comandă o piesă pentru o nuntă, o scenă sau o sărbătoare în familie — ajustată, echilibrată și făcută să fie păstrată mult după acea zi.',
      buttonText: 'Începe o comandă',
    },
  },

  en: {
    heroAccentLabel: '03 / DIADEME · ROZ PAL',
    heroTitle: 'Tiaras',
    heroParagraph:
      'Sculptural headpieces for the wedding day, the stage and everything in between. Wire is forged and wrapped by hand, then set with stone, pearl and glass — light enough to forget you are wearing it.',
    heroSpecs: [
      { label: 'MATERIAL', value: 'BRASS · SILVER · PEARL' },
      { label: 'FINISH', value: 'HAND-FORGED' },
      { label: 'CATEGORIES', value: 'FOUR' },
      { label: 'ORIGIN', value: 'BUCHAREST, RO' },
    ],
    bandImage: img('diademe/band.jpg'),
    categorySections: [
      { slug: 'bridal', label: '01 — BRIDAL', subtitle: 'For the day itself' },
      { slug: 'crowns', label: '02 — CROWNS', subtitle: 'Full circles for stage & ceremony' },
      { slug: 'hair-vines', label: '03 — HAIR VINES', subtitle: 'Trailing, woven into the hair' },
      { slug: 'combs', label: '04 — COMBS', subtitle: 'Small anchors, set & carved' },
    ],
    cta: {
      kicker: 'COMMISSIONS OPEN',
      headline: 'Made for one head.',
      paragraph:
        'Commission a piece for a wedding, a stage or a family occasion — fitted, balanced and made to be kept long after the day.',
      buttonText: 'Start a commission',
    },
  },
};
