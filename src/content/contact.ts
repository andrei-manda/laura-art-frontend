import type { Localized } from '../i18n';
import type { LinkCard } from './types';
import { img } from './types';
import { SITE } from './site';

const VISIT_IMAGE = img('contact/studio.jpg');
const MESSAGE_MAX = 5000;

const en = {
  heroAccentLabel: '08 / CONTACT · STUDIO BUCHAREST',
  heroTitle: 'Get in touch',
  heroParagraph:
    'Commissions, workshop places, repairs, press or a studio visit — it all reaches the same inbox, and I answer every message myself.',
  heroSpecs: [
    { label: 'EMAIL', value: SITE.email.toUpperCase() },
    { label: 'PHONE', value: SITE.phone },
    { label: 'REPLY WITHIN', value: '2 WORKING DAYS' },
    { label: 'VISITS', value: 'BY APPOINTMENT' },
  ],

  formLabel: 'SEND A MESSAGE',
  fields: {
    name: { label: 'NAME', placeholder: 'Your name' },
    email: { label: 'EMAIL', placeholder: 'you@email.com' },
    message: { label: 'MESSAGE', placeholder: 'Tell me what you have in mind — a piece, a date, a question.' },
  },
  errors: {
    name: 'Please enter your name (120 characters max).',
    email: 'Please enter a valid email address.',
    message: `Please enter a message (${MESSAGE_MAX} characters max).`,
    tooMany: 'Too many messages — please try again later.',
    generic: 'Something went wrong sending your message. Please email the studio directly.',
  },
  privacyNote: 'YOUR DETAILS STAY WITH THE STUDIO — NO MAILING LISTS, NO SHARING.',
  sendButtonText: 'Send message',
  sendingText: 'Sending…',
  successLabel: 'MESSAGE SENT',
  successHeadline: 'Thank you — it’s with me.',
  successParagraph:
    'I read every message myself and usually reply within two working days. If it’s urgent, call the studio.',
  successResetText: 'Write another',

  studioLabel: 'THE STUDIO',
  mapsLinkText: 'Open in maps',
  hoursLabel: 'OPENING HOURS',
  directLabel: 'DIRECT',

  routeCards: [
    { label: 'COMMISSIONS', colorKey: 'gold', title: 'Something made for you', paragraph: 'Wedding bands, a piece remade from stones you already own, or a small run for your shop. Allow six to ten weeks.' },
    { label: 'WORKSHOPS', colorKey: 'purple', title: 'A place at the bench', paragraph: 'Tell me which session and how many of you — I’ll confirm the date and send everything you need.', linkText: 'See sessions', linkPath: '/workshops' },
    { label: 'PRESS & EXHIBITIONS', colorKey: 'cobalt', title: 'Show or write about the work', paragraph: 'Ask and I’ll send a current portfolio, print-resolution images and a short bio.', linkText: 'Past shows', linkPath: '/exhibitions' },
  ] as LinkCard[],

  visitLabel: 'VISITING',
  visitHeadline: 'Come to the studio.',
  visitParagraph:
    'It’s a working room — kiln at the back, bench by the window, finished pieces on the shelf. Everything on the site can be seen and tried on here, and most decisions are easier in person.',
  visitFacts: [
    // Placeholders until the real details are known.
    { label: 'METRO', value: '[Nearest station], [x] min on foot' },
    { label: 'PARKING', value: '[Where to park]' },
    { label: 'ACCESS', value: 'First floor, lift available' },
  ],
  visitImage: VISIT_IMAGE,
};

export const CONTACT: Localized<typeof en> = {
  en,
  ro: {
    heroAccentLabel: '08 / CONTACT · STUDIO BUCUREȘTI',
    heroTitle: 'Hai să vorbim',
    heroParagraph:
      'Comenzi, locuri la ateliere, reparații, presă sau o vizită în studio — totul ajunge în aceeași căsuță de email, iar eu răspund personal la fiecare mesaj.',
    heroSpecs: [
      { label: 'EMAIL', value: SITE.email.toUpperCase() },
      { label: 'TELEFON', value: SITE.phone },
      { label: 'RĂSPUNS ÎN', value: '2 ZILE LUCRĂTOARE' },
      { label: 'VIZITE', value: 'CU PROGRAMARE' },
    ],

    formLabel: 'TRIMITE UN MESAJ',
    fields: {
      name: { label: 'NUME', placeholder: 'Numele tău' },
      email: { label: 'EMAIL', placeholder: 'tu@email.com' },
      message: { label: 'MESAJ', placeholder: 'Spune-mi ce ai în minte — o piesă, o dată, o întrebare.' },
    },
    errors: {
      name: 'Te rog scrie-ți numele (maximum 120 de caractere).',
      email: 'Te rog introdu o adresă de email validă.',
      message: `Te rog scrie un mesaj (maximum ${MESSAGE_MAX} de caractere).`,
      tooMany: 'Prea multe mesaje — te rog încearcă mai târziu.',
      generic: 'Ceva n-a mers la trimiterea mesajului. Te rog scrie-mi direct pe email.',
    },
    privacyNote: 'DATELE TALE RĂMÂN LA STUDIO — FĂRĂ LISTE DE EMAIL, FĂRĂ PARTAJARE.',
    sendButtonText: 'Trimite mesajul',
    sendingText: 'Se trimite…',
    successLabel: 'MESAJ TRIMIS',
    successHeadline: 'Mulțumesc — l-am primit.',
    successParagraph:
      'Citesc personal fiecare mesaj și de obicei răspund în două zile lucrătoare. Dacă e urgent, sună la studio.',
    successResetText: 'Scrie altul',

    studioLabel: 'STUDIOUL',
    mapsLinkText: 'Deschide în hartă',
    hoursLabel: 'PROGRAM',
    directLabel: 'DIRECT',

    routeCards: [
      { label: 'COMENZI', colorKey: 'gold', title: 'Ceva făcut pentru tine', paragraph: 'Verighete, o piesă refăcută din pietre pe care le ai deja sau o serie mică pentru magazinul tău. Durează între șase și zece săptămâni.' },
      { label: 'ATELIERE', colorKey: 'purple', title: 'Un loc la banc', paragraph: 'Spune-mi ce sesiune și câți sunteți — îți confirm data și îți trimit tot ce trebuie.', linkText: 'Vezi sesiunile', linkPath: '/workshops' },
      { label: 'PRESĂ ȘI EXPOZIȚII', colorKey: 'cobalt', title: 'Expune sau scrie despre lucrări', paragraph: 'Cere-mi și îți trimit un portofoliu actualizat, imagini la rezoluție de tipar și o scurtă biografie.', linkText: 'Expoziții trecute', linkPath: '/exhibitions' },
    ],

    visitLabel: 'VIZITE',
    visitHeadline: 'Vino în studio.',
    visitParagraph:
      'E o cameră în care se lucrează — cuptorul în spate, bancul lângă fereastră, piesele terminate pe raft. Tot ce vezi pe site poate fi văzut și probat aici, iar majoritatea deciziilor sunt mai ușoare față în față.',
    visitFacts: [
      { label: 'METROU', value: '[Stația cea mai apropiată], [x] min pe jos' },
      { label: 'PARCARE', value: '[Unde se parchează]' },
      { label: 'ACCES', value: 'Etajul 1, cu lift' },
    ],
    visitImage: VISIT_IMAGE,
  },
};

export { MESSAGE_MAX };
