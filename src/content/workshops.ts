import type { WorkshopCategory, WorkshopStatus } from '../api/types';
import type { Localized } from '../i18n';
import { img } from './types';

const GOOD_TO_KNOW_IMAGE = img('workshops/good-to-know.jpg');

const en = {
  heroAccentLabel: '05 / ATELIERE · VIOLET AMETIST',
  heroTitle: 'Workshops',
  heroParagraph:
    'Small groups at the studio bench — glass, metal and the slow parts in between. Most sessions need no experience, and every one ends with something you made yourself.',
  /** First hero row, filled from the sessions. */
  nextLabel: 'NEXT',
  nextFallback: 'ON REQUEST',
  heroSpecs: [
    { label: 'GROUP SIZE', value: '4 — 8 PEOPLE' },
    { label: 'WHERE', value: 'STUDIO, BUCHAREST' },
    { label: 'BOOKING', value: 'BY ENQUIRY' },
  ],

  featuredLabel: 'IN FOCUS',
  featuredLinkText: 'Enquire about this session',
  calendarLabel: 'SESSION CALENDAR',
  sessionsUnit: 'SESSIONS',
  filters: [
    { id: 'all', label: 'All sessions' },
    { id: 'glass', label: 'Recycled glass' },
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'mosaic', label: 'Stained glass & mosaic' },
    { id: 'diademe', label: 'Tiaras' },
    { id: 'group', label: 'Groups & private' },
  ] as { id: WorkshopCategory | 'all'; label: string }[],
  statusLabel: { open: 'OPEN', waitlist: 'WAITLIST', enquire: 'ENQUIRE' } as Record<WorkshopStatus, string>,
  specLabels: { duration: 'DURATION', level: 'LEVEL', spots: 'SPOTS', max: 'MAX' },
  cardLinkText: 'Enquire',
  emptyStateText: 'No sessions in this category right now —',
  emptyStateLinkText: 'ask about a private date',

  howLabel: 'HOW A SESSION RUNS',
  howSteps: [
    { number: '01', title: 'Arrive & choose', paragraph: 'Coffee, aprons, and a look through the material bins to pick what you’ll work with.' },
    { number: '02', title: 'Demo at the bench', paragraph: 'I walk through the whole process once, slowly, before anyone picks up a tool.' },
    { number: '03', title: 'Make', paragraph: 'The long stretch. Four to eight people, a bench each, and help whenever you want it.' },
    { number: '04', title: 'Kiln & collect', paragraph: 'Glass needs a night in the kiln — collect your piece later that week, or I’ll post it.' },
  ],

  goodToKnowLabel: 'GOOD TO KNOW',
  goodToKnowRows: [
    { label: 'MATERIALS', value: 'All glass, metal and tools are included — just wear closed shoes.' },
    { label: 'AGE', value: '16+ for kiln and torch work; 10+ with an adult for mosaic and cold glass.' },
    { label: 'LANGUAGE', value: 'Sessions run in Romanian or English — tell me which when you book.' },
    { label: 'ACCESS', value: 'Ground floor, step-free entrance. Let me know if you need anything else.' },
    { label: 'CHANGES', value: 'Move your place to another date up to 72 hours before, no questions asked.' },
  ],
  goodToKnowImage: GOOD_TO_KNOW_IMAGE,

  offerCards: [
    { label: 'PRIVATE', title: 'One-to-one at the bench', paragraph: 'A full day built around one thing you want to make. Weekdays, by arrangement.' },
    { label: 'GROUPS', title: 'Teams, birthdays, hen parties', paragraph: 'Up to eight at the studio — or I bring a cold-glass setup to your space in Bucharest.' },
    { label: 'GIFT', title: 'Open-date vouchers', paragraph: 'A place on any session, valid for a year, booked whenever the date suits them.' },
  ],

  cta: {
    kicker: 'SIT DOWN · MAKE · TAKE IT HOME',
    headline: 'Come and make something.',
    paragraph:
      'Tell me which session you’re interested in and how many of you there are — I’ll come back with dates and everything you need to know.',
    buttonText: 'Enquire about a place',
  },
};

export const WORKSHOPS: Localized<typeof en> = {
  en,
  ro: {
    heroAccentLabel: '05 / ATELIERE · VIOLET AMETIST',
    heroTitle: 'Ateliere',
    heroParagraph:
      'Grupuri mici la bancul din studio — sticlă, metal și pașii lenți dintre ele. Pentru majoritatea sesiunilor nu ai nevoie de experiență, și fiecare se termină cu ceva făcut de mâna ta.',
    nextLabel: 'URMĂTOAREA',
    nextFallback: 'LA CERERE',
    heroSpecs: [
      { label: 'GRUP', value: '4 — 8 PERSOANE' },
      { label: 'UNDE', value: 'STUDIO, BUCUREȘTI' },
      { label: 'REZERVARE', value: 'PRIN MESAJ' },
    ],

    featuredLabel: 'ÎN PRIM-PLAN',
    featuredLinkText: 'Întreabă despre această sesiune',
    calendarLabel: 'CALENDARUL SESIUNILOR',
    sessionsUnit: 'SESIUNI',
    filters: [
      { id: 'all', label: 'Toate sesiunile' },
      { id: 'glass', label: 'Sticlă reciclată' },
      { id: 'jewelry', label: 'Bijuterii' },
      { id: 'mosaic', label: 'Vitraliu și mozaic' },
      { id: 'diademe', label: 'Diademe' },
      { id: 'group', label: 'Grupuri și privat' },
    ],
    statusLabel: { open: 'DESCHIS', waitlist: 'LISTĂ DE AȘTEPTARE', enquire: 'LA CERERE' },
    specLabels: { duration: 'DURATĂ', level: 'NIVEL', spots: 'LOCURI', max: 'MAX' },
    cardLinkText: 'Întreabă',
    emptyStateText: 'Nicio sesiune în această categorie acum —',
    emptyStateLinkText: 'întreabă de o dată privată',

    howLabel: 'CUM DECURGE O SESIUNE',
    howSteps: [
      { number: '01', title: 'Sosire și alegere', paragraph: 'Cafea, șorțuri și o privire prin cutiile cu materiale, ca să alegi cu ce lucrezi.' },
      { number: '02', title: 'Demonstrație la banc', paragraph: 'Trec o dată prin tot procesul, încet, înainte ca cineva să pună mâna pe vreo unealtă.' },
      { number: '03', title: 'Lucru', paragraph: 'Partea lungă. Patru până la opt oameni, fiecare cu bancul lui, și ajutor oricând ai nevoie.' },
      { number: '04', title: 'Cuptor și ridicare', paragraph: 'Sticla are nevoie de o noapte în cuptor — îți ridici piesa mai târziu în aceeași săptămână sau ți-o trimit prin poștă.' },
    ],

    goodToKnowLabel: 'BINE DE ȘTIUT',
    goodToKnowRows: [
      { label: 'MATERIALE', value: 'Toată sticla, metalul și uneltele sunt incluse — vino doar cu încălțăminte închisă.' },
      { label: 'VÂRSTĂ', value: '16+ pentru lucrul la cuptor și cu flacăra; 10+ cu un adult pentru mozaic și sticlă la rece.' },
      { label: 'LIMBĂ', value: 'Sesiunile se țin în română sau engleză — spune-mi ce preferi când rezervi.' },
      { label: 'ACCES', value: 'Parter, intrare fără trepte. Spune-mi dacă ai nevoie de altceva.' },
      { label: 'MODIFICĂRI', value: 'Îți poți muta locul pe altă dată cu până la 72 de ore înainte, fără întrebări.' },
    ],
    goodToKnowImage: GOOD_TO_KNOW_IMAGE,

    offerCards: [
      { label: 'PRIVAT', title: 'Unu la unu, la banc', paragraph: 'O zi întreagă construită în jurul unui singur lucru pe care vrei să-l faci. În timpul săptămânii, cu programare.' },
      { label: 'GRUPURI', title: 'Echipe, aniversări, petreceri', paragraph: 'Până la opt persoane în studio — sau aduc un set de lucru cu sticlă la rece la tine, în București.' },
      { label: 'CADOU', title: 'Vouchere cu dată deschisă', paragraph: 'Un loc la orice sesiune, valabil un an, folosit când îi convine celui care îl primește.' },
    ],

    cta: {
      kicker: 'TE AȘEZI · LUCREZI · IEI ACASĂ',
      headline: 'Vino să faci ceva.',
      paragraph:
        'Spune-mi ce sesiune te interesează și câți sunteți — revin cu date și cu tot ce trebuie să știi.',
      buttonText: 'Întreabă de un loc',
    },
  },
};
