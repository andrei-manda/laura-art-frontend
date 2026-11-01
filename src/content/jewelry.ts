import type { JewelryCategory } from '../api/types';
import type { Localized } from '../i18n';
import type { CatalogPageContent } from './types';
import { img } from './types';

export const JEWELRY: Localized<CatalogPageContent<JewelryCategory>> = {
  ro: {
    heroAccentLabel: '01 / BIJUTERII · AURIU',
    heroTitle: 'Bijuterii',
    heroParagraph:
      'Inele, cercei și obiecte mici din alamă, argint și pietre găsite. Fiecare piesă e tăiată, lipită și lustruită de mână — aurie și făcută să fie purtată în fiecare zi.',
    heroSpecs: [
      { label: 'MATERIAL', value: 'ALAMĂ · ARGINT' },
      { label: 'FINISAJ', value: 'LUSTRUIT MANUAL' },
      { label: 'CATEGORII', value: 'ȘASE' },
      { label: 'ORIGINE', value: 'BUCUREȘTI, RO' },
    ],
    bandImage: img('jewelry/band.jpg'),
    categorySections: [
      { slug: 'earrings', label: '01 — CERCEI', subtitle: 'Mici, lungi și rotunzi' },
      { slug: 'rings', label: '02 — INELE', subtitle: 'Verighete și inele de zi cu zi' },
      { slug: 'necklaces', label: '03 — COLIERE', subtitle: 'Pandantive și lanțuri' },
      { slug: 'hairpins', label: '04 — AGRAFE', subtitle: 'Agrafe și piepteni pentru păr' },
      { slug: 'body', label: '05 — BIJUTERII DE CORP', subtitle: 'Lanțuri, brățări și brățări de gleznă' },
      { slug: 'others', label: '06 — ALTELE', subtitle: 'Unicate și obiecte mici' },
    ],
    cta: {
      kicker: 'COMENZI DESCHISE',
      headline: 'Făcut pe măsura ta.',
      paragraph:
        'Comandă un inel, o pereche de cercei sau o piesă cu o piatră a ta — o moștenire, o amintire, un început.',
      buttonText: 'Începe o comandă',
    },
  },

  en: {
    heroAccentLabel: '01 / BIJUTERII · AURIU',
    heroTitle: 'Jewelry',
    heroParagraph:
      'Rings, earrings and small objects in brass, silver and found stone. Each piece is sawn, soldered and burnished by hand — gold-toned, and made to be worn every day.',
    heroSpecs: [
      { label: 'MATERIAL', value: 'BRASS · SILVER' },
      { label: 'FINISH', value: 'HAND-BURNISHED' },
      { label: 'CATEGORIES', value: 'SIX' },
      { label: 'ORIGIN', value: 'BUCHAREST, RO' },
    ],
    bandImage: img('jewelry/band.jpg'),
    categorySections: [
      { slug: 'earrings', label: '01 — EARRINGS', subtitle: 'Studs, drops & hoops' },
      { slug: 'rings', label: '02 — RINGS', subtitle: 'Wedding bands & everyday rings' },
      { slug: 'necklaces', label: '03 — NECKLACES', subtitle: 'Pendants & chains' },
      { slug: 'hairpins', label: '04 — HAIRPINS', subtitle: 'Pins & combs for the hair' },
      { slug: 'body', label: '05 — BODY JEWELRY', subtitle: 'Chains, cuffs & anklets' },
      { slug: 'others', label: '06 — OTHERS', subtitle: 'One-offs & small objects' },
    ],
    cta: {
      kicker: 'COMMISSIONS OPEN',
      headline: 'Made to your size.',
      paragraph:
        'Commission a ring, a pair of earrings or a piece set with a stone of your own — an heirloom, a souvenir, a beginning.',
      buttonText: 'Start a commission',
    },
  },
};
