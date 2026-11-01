import type { Localized } from '../i18n';
import type { CuratedPageContent } from './types';
import { img } from './types';

const IMAGES = {
  band: img('decor/band.jpg'),
  steps: [img('decor/step-1.jpg'), img('decor/step-2.jpg'), img('decor/step-3.jpg')],
};

export const DECOR: Localized<CuratedPageContent> = {
  ro: {
    heroAccentLabel: '04 / DECOR · VERDE',
    heroTitle: 'Decor funcțional',
    heroParagraph:
      'Obiecte utile, făcute ca să trăiești cu ele — lămpi, boluri, cârlige și mânere din alamă, lemn și sticlă reciclată. Făcute să fie atinse zilnic și să îmbătrânească frumos.',
    heroSpecs: [
      { label: 'MATERIAL', value: 'ALAMĂ · LEMN · STICLĂ' },
      { label: 'METODĂ', value: 'FORJAT ȘI ASAMBLAT' },
      { label: 'PIESE', value: 'SERII MICI' },
      { label: 'ORIGINE', value: 'BUCUREȘTI, RO' },
    ],
    bandImage: IMAGES.band,
    worksLabel: 'TOATE LUCRĂRILE',
    worksHeadline: 'Derulează colecția',
    endCardLabel: 'VERDE / FUNCȚIONAL',
    endCardStatement: 'Făcute ca să fie folosite, nu ținute în vitrină.',
    endCardLinkText: 'Comandă o piesă',
    featuredLabel: 'PIESA ÎN PRIM-PLAN',
    enquireText: 'Întreabă despre această piesă',
    processHeadline: 'De la materiale recuperate la ceva ce folosești în fiecare zi.',
    processSteps: [
      { number: '01', title: 'Recuperare și sortare', paragraph: 'Resturi de alamă, feronerie veche, sticle și capete de lemn sunt adunate din ateliere și șantiere, apoi curățate și sortate după ce mai pot deveni.', image: IMAGES.steps[0] },
      { number: '02', title: 'Forjare și asamblare', paragraph: 'Metalul e încălzit, forjat și găurit la banc; sticla e formată în cuptor; lemnul e tăiat și uns cu ulei. Piesele sunt asamblate de mână până când obiectul stă și se echilibrează cum trebuie.', image: IMAGES.steps[1] },
      { number: '03', title: 'Finisare pentru uz', paragraph: 'Marginile sunt rotunjite, suprafețele sigilate, iar părțile mobile testate. Fiecare piesă e făcută să reziste folosirii zilnice, nu să fie admirată o singură dată.', image: IMAGES.steps[2] },
    ],
    cta: {
      kicker: 'COMENZI DESCHISE',
      headline: 'Pentru camera în care chiar locuiești.',
      paragraph:
        'Comandă corpuri de iluminat, feronerie sau o piesă pentru masă — pe măsura spațiului tău și, oriunde se poate, din materiale recuperate.',
      buttonText: 'Începe o comandă',
    },
  },

  en: {
    heroAccentLabel: '04 / DECOR · VERDE',
    heroTitle: 'Functional Décor',
    heroParagraph:
      'Objects that are useful and meant to be lived with — lamps, bowls, hooks and handles in brass, wood and recycled glass. Made to be handled every day, and to wear well while it happens.',
    heroSpecs: [
      { label: 'MATERIAL', value: 'BRASS · WOOD · GLASS' },
      { label: 'METHOD', value: 'FORGED & FITTED' },
      { label: 'PIECES', value: 'SMALL BATCHES' },
      { label: 'ORIGIN', value: 'BUCHAREST, RO' },
    ],
    bandImage: IMAGES.band,
    worksLabel: 'ALL WORK',
    worksHeadline: 'Scroll the collection',
    endCardLabel: 'VERDE / FUNCTIONAL',
    endCardStatement: 'Made to be used, not kept behind glass.',
    endCardLinkText: 'Commission a piece',
    featuredLabel: 'FEATURED PIECE',
    enquireText: 'Enquire about this piece',
    processHeadline: 'From salvage to something you reach for every day.',
    processSteps: [
      { number: '01', title: 'Salvage & sort', paragraph: 'Brass offcuts, old fittings, bottle glass and wood ends are collected from workshops and building sites, then cleaned and sorted by what they could still become.', image: IMAGES.steps[0] },
      { number: '02', title: 'Forge & fit', paragraph: 'Metal is heated, forged and drilled at the bench; glass is kiln-formed; wood is cut and oiled. The parts are fitted by hand until the object sits and balances right.', image: IMAGES.steps[1] },
      { number: '03', title: 'Finish for use', paragraph: 'Edges are softened, surfaces sealed and moving parts tested. Every piece is made to survive daily use, not to be admired once.', image: IMAGES.steps[2] },
    ],
    cta: {
      kicker: 'COMMISSIONS OPEN',
      headline: 'For the room you actually live in.',
      paragraph:
        'Commission lighting, hardware or a piece for the table — sized to your space and built from salvaged material wherever it can be.',
      buttonText: 'Start a commission',
    },
  },
};
