import type { Localized } from '../i18n';

const en = {
  nav: {
    jewelry: 'Jewelry',
    ecoGlass: 'Eco Glass',
    diademe: 'Tiaras',
    decor: 'Décor',
    workshops: 'Workshops',
    exhibitions: 'Exhibitions',
    contact: 'Contact',
  },
  menu: 'Menu',
  closeMenu: 'Close menu',
  language: 'Language',
  footer: { collections: 'COLLECTIONS', studio: 'STUDIO', connect: 'CONNECT' },

  loading: 'Loading…',
  couldNotLoad: 'Could not load content.',
  loadError: '— COULDN’T LOAD THE WORK RIGHT NOW. PLEASE REFRESH IN A MOMENT. —',
  viewImage: 'View image',
  viewPhoto: (n: number) => `View photo ${n}`,
  previous: 'Previous',
  next: 'Next',
  close: 'Close',
  showMore: 'Show more',
  moreCount: (n: number) => `${n} more`,

  piecesComingSoon: '— PIECES COMING SOON —',
  piecesUnit: 'PIECES',
  process: 'PROCESS',
  featuredSpecs: { source: 'SOURCE', dimensions: 'DIMENSIONS', year: 'YEAR', price: 'PRICE', onRequest: 'ON REQUEST' },

  notFound: {
    label: '404 — PAGE NOT FOUND',
    headline: 'This page isn’t in the studio.',
    paragraph: 'The link may be old, or the piece may have moved. Everything else is one step away.',
    back: 'Back to the home page',
  },
};

/** Interface words shared across pages: navigation, buttons, states. */
export const UI: Localized<typeof en> = {
  en,
  ro: {
    nav: {
      jewelry: 'Bijuterii',
      ecoGlass: 'Sticlă eco',
      diademe: 'Diademe',
      decor: 'Decor',
      workshops: 'Ateliere',
      exhibitions: 'Expoziții',
      contact: 'Contact',
    },
    menu: 'Meniu',
    closeMenu: 'Închide meniul',
    language: 'Limba',
    footer: { collections: 'COLECȚII', studio: 'STUDIO', connect: 'URMĂREȘTE' },

    loading: 'Se încarcă…',
    couldNotLoad: 'Conținutul nu a putut fi încărcat.',
    loadError: '— LUCRĂRILE NU POT FI ÎNCĂRCATE ACUM. REÎNCEARCĂ ÎN CÂTEVA MOMENTE. —',
    viewImage: 'Vezi imaginea',
    viewPhoto: (n: number) => `Vezi fotografia ${n}`,
    previous: 'Înapoi',
    next: 'Înainte',
    close: 'Închide',
    showMore: 'Arată mai multe',
    moreCount: (n: number) => `încă ${n}`,

    piecesComingSoon: '— PIESE ÎN CURÂND —',
    piecesUnit: 'PIESE',
    process: 'PROCES',
    featuredSpecs: { source: 'SURSĂ', dimensions: 'DIMENSIUNI', year: 'AN', price: 'PREȚ', onRequest: 'LA CERERE' },

    notFound: {
      label: '404 — PAGINA NU A FOST GĂSITĂ',
      headline: 'Pagina asta nu e în studio.',
      paragraph: 'Linkul poate fi vechi sau piesa s-a mutat. Restul site-ului e la un pas distanță.',
      back: 'Înapoi la prima pagină',
    },
  },
};
