import type { Localized } from '../i18n';
import type { CuratedPageContent } from './types';
import { img } from './types';

const IMAGES = {
  band: img('eco-glass/band.jpg'),
  steps: [img('eco-glass/step-1.jpg'), img('eco-glass/step-2.jpg'), img('eco-glass/step-3.jpg')],
};

// The band is a diptych: on a phone keep its left panel whole rather than
// cutting through both.
const BAND_FOCUS = 'object-left md:object-center';

export const ECO_GLASS: Localized<CuratedPageContent> = {
  ro: {
    heroAccentLabel: '02 / RECICLAT · TURCOAZ',
    heroTitle: 'Sticlă eco',
    heroParagraph:
      'Sticle, resturi și geamuri sparte — adunate, mărunțite și formate în cuptor în vase și fragmente translucide. Sticlă reciclată lăsată să fie ce este: tulbure, luminoasă și niciodată la fel de două ori.',
    heroSpecs: [
      { label: 'MATERIAL', value: '100% STICLĂ RECICLATĂ' },
      { label: 'METODĂ', value: 'FORMATĂ ÎN CUPTOR' },
      { label: 'PIESE', value: 'UNICATE' },
      { label: 'ORIGINE', value: 'BUCUREȘTI, RO' },
    ],
    bandImage: IMAGES.band,
    bandFocus: BAND_FOCUS,
    worksLabel: 'TOATE LUCRĂRILE',
    worksHeadline: 'Derulează colecția',
    endCardLabel: 'TURCOAZ / TRANSPARENT',
    endCardStatement: 'Nu există două piese la fel — sticla își alege singură culoarea.',
    endCardLinkText: 'Comandă o piesă',
    featuredLabel: 'PIESA ÎN PRIM-PLAN',
    enquireText: 'Întreabă despre această piesă',
    processHeadline: 'De la sticlă la obiect, în trei pași lenți.',
    processSteps: [
      { number: '01', title: 'Adunare și spargere', paragraph: 'Sticlele aruncate și resturile de geam sunt spălate, sortate după culoare și sparte în cioburi — materia primă pentru tot ce urmează.', image: IMAGES.steps[0] },
      { number: '02', title: 'Formare în cuptor', paragraph: 'Cioburile sunt așezate în forme și arse încet, ore întregi. Căldura topește fragmentele; sticla se așază, se limpezește și își găsește forma.', image: IMAGES.steps[1] },
      { number: '03', title: 'Șlefuire și finisare', paragraph: 'După ce se răcește, fiecare piesă e scoasă din formă, iar marginile sunt șlefuite de mână. Apoi e semnată, numerotată și lăsată să fie exact ce a devenit.', image: IMAGES.steps[2] },
    ],
    cta: {
      kicker: 'COMENZI DESCHISE',
      headline: 'Adu-mi sticlele tale.',
      paragraph:
        'Comandă o piesă din sticlă cu o poveste — un set pentru nuntă, un vas în amintirea cuiva sau pahare pentru masa ta.',
      buttonText: 'Începe o comandă',
    },
  },

  en: {
    heroAccentLabel: '02 / RECICLAT · TURCOAZ',
    heroTitle: 'Eco Glass',
    heroParagraph:
      'Bottles, offcuts and broken panes — collected, crushed and kiln-formed into vessels and translucent fragments. Recycled glass kept honest: cloudy, luminous and never quite the same twice.',
    heroSpecs: [
      { label: 'MATERIAL', value: '100% RECYCLED GLASS' },
      { label: 'METHOD', value: 'KILN-FORMED' },
      { label: 'PIECES', value: 'ONE OF A KIND' },
      { label: 'ORIGIN', value: 'BUCHAREST, RO' },
    ],
    bandImage: IMAGES.band,
    bandFocus: BAND_FOCUS,
    worksLabel: 'ALL WORK',
    worksHeadline: 'Scroll the collection',
    endCardLabel: 'TURCOAZ / TRANSPARENT',
    endCardStatement: 'No two pieces alike — the glass decides the colour.',
    endCardLinkText: 'Commission a piece',
    featuredLabel: 'FEATURED PIECE',
    enquireText: 'Enquire about this piece',
    processHeadline: 'From bottle to object, in three slow steps.',
    processSteps: [
      { number: '01', title: 'Collect & crush', paragraph: 'Discarded bottles and window offcuts are washed, sorted by colour and broken down into cullet — the raw material for everything that follows.', image: IMAGES.steps[0] },
      { number: '02', title: 'Kiln-form', paragraph: 'The cullet is packed into moulds and fired slowly over many hours. Heat fuses the fragments; the glass settles, clears and finds its shape.', image: IMAGES.steps[1] },
      { number: '03', title: 'Grind & finish', paragraph: 'Once cool, each piece is released from its mould and its edges are ground soft by hand. Then it is signed, numbered and left to be exactly what it became.', image: IMAGES.steps[2] },
    ],
    cta: {
      kicker: 'COMMISSIONS OPEN',
      headline: 'Bring me your bottles.',
      paragraph:
        'Commission a piece from glass with a history — a wedding set, a memorial vessel, or glasses for your own table.',
      buttonText: 'Start a commission',
    },
  },
};
