import type { Localized } from '../i18n';

const en = {
  heroAccentLabel: '06 / EXPOZIȚII · ALBASTRU COBALT',
  heroTitle: 'Exhibitions',
  heroParagraph:
    'Where the work takes a room — selected shows, fairs and site-specific installations. New exhibitions are added here as soon as they are announced.',
  /** Hero rows, filled from the exhibitions. */
  specLabels: { next: 'NEXT', upcoming: 'UPCOMING', archive: 'ARCHIVE', enquiries: 'ENQUIRIES' },
  showsUnit: 'SHOWS',
  since: 'SINCE',
  byEmail: 'BY EMAIL',

  featuredLabel: 'IN FOCUS',
  featuredBadgeUpcoming: 'UPCOMING',
  featuredBadgePast: 'FROM THE ARCHIVE',
  featuredLinkText: 'Exhibition details',

  upcomingLabel: 'UPCOMING',
  upcomingEmpty: '— NOTHING ANNOUNCED YET —',
  archiveLabel: 'ARCHIVE — PAST SHOWS',
  cardBadgeUpcoming: 'UPCOMING',
  cardBadgePast: 'PAST',
  cardLinkUpcoming: 'Details',
  cardLinkPast: 'View archive',

  cta: {
    kicker: 'EXHIBIT · CURATE · COLLABORATE',
    headline: 'Show the work in your space.',
    paragraph:
      'For exhibition proposals, installation commissions or press — get in touch and I’ll send a current portfolio.',
    buttonText: 'Get in touch',
  },
};

export const EXHIBITIONS: Localized<typeof en> = {
  en,
  ro: {
    heroAccentLabel: '06 / EXPOZIȚII · ALBASTRU COBALT',
    heroTitle: 'Expoziții',
    heroParagraph:
      'Acolo unde lucrările ocupă o încăpere — expoziții selectate, târguri și instalații gândite pentru spațiu. Expozițiile noi apar aici imediat ce sunt anunțate.',
    specLabels: { next: 'URMĂTOAREA', upcoming: 'VIITOARE', archive: 'ARHIVĂ', enquiries: 'SOLICITĂRI' },
    showsUnit: 'EXPOZIȚII',
    since: 'DIN',
    byEmail: 'PRIN EMAIL',

    featuredLabel: 'ÎN PRIM-PLAN',
    featuredBadgeUpcoming: 'URMEAZĂ',
    featuredBadgePast: 'DIN ARHIVĂ',
    featuredLinkText: 'Detaliile expoziției',

    upcomingLabel: 'VIITOARE',
    upcomingEmpty: '— NIMIC ANUNȚAT ÎNCĂ —',
    archiveLabel: 'ARHIVĂ — EXPOZIȚII TRECUTE',
    cardBadgeUpcoming: 'URMEAZĂ',
    cardBadgePast: 'TRECUTĂ',
    cardLinkUpcoming: 'Detalii',
    cardLinkPast: 'Vezi arhiva',

    cta: {
      kicker: 'EXPUNE · CURATORIAZĂ · COLABOREAZĂ',
      headline: 'Arată lucrările în spațiul tău.',
      paragraph:
        'Pentru propuneri de expoziții, comenzi de instalații sau presă — scrie-mi și îți trimit un portofoliu actualizat.',
      buttonText: 'Scrie-mi',
    },
  },
};

const detailEn = {
  accentLabel: 'EXHIBITION · GALLERY',
  backLinkText: '← ALL EXHIBITIONS',
  galleryLabel: 'GALLERY',
  photosUnit: 'PHOTOS',
  specLabels: { venue: 'VENUE', city: 'CITY', photos: 'PHOTOS', year: 'YEAR' },
  photoCaption: 'Installation view',
  photosEmpty: '— PHOTOS COMING SOON —',
  endOfGalleryText: '— END OF GALLERY —',
  loadMoreText: 'Load more',
  footerBackText: '← Back to exhibitions',
  notFound: 'Exhibition not found.',
  notFoundLinkText: 'Back to all exhibitions',
};

export const EXHIBITION_DETAIL: Localized<typeof detailEn> = {
  en: detailEn,
  ro: {
    accentLabel: 'EXPOZIȚIE · GALERIE',
    backLinkText: '← TOATE EXPOZIȚIILE',
    galleryLabel: 'GALERIE',
    photosUnit: 'FOTOGRAFII',
    specLabels: { venue: 'LOC', city: 'ORAȘ', photos: 'FOTOGRAFII', year: 'AN' },
    photoCaption: 'Imagine din expoziție',
    photosEmpty: '— FOTOGRAFII ÎN CURÂND —',
    endOfGalleryText: '— SFÂRȘITUL GALERIEI —',
    loadMoreText: 'Încarcă mai multe',
    footerBackText: '← Înapoi la expoziții',
    notFound: 'Expoziția nu a fost găsită.',
    notFoundLinkText: 'Înapoi la toate expozițiile',
  },
};
