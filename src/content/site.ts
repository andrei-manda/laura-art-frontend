import type { Localized } from '../i18n';
import { img } from './types';

/** Studio-wide details that read the same in every language. */
export const SITE = {
  name: 'LAURA',
  /** Round mark, transparent outside the circle. Header, footer (inverted) and favicon. */
  logo: img('logo.png'),
  email: 'hello@l-aur-a.art',
  phone: '+40 000 000 000',
  instagramUrl: '',
  pinterestUrl: '',
  // Placeholder until the studio's street address is set below.
  mapsUrl: 'https://maps.google.com/?q=Bucuresti',
  copyrightLine: `© ${new Date().getFullYear()} LAURA · L-AUR-A.ART`,
};

const en = {
  utilityLeft: 'L·AUR·A.ART — STUDIO BUCHAREST',
  utilityRight: 'EST. 2014',
  footerTagline:
    'Handmade jewelry, recycled glass and objects for everyday use. Studio visits in Bucharest by appointment.',
  locationLine: 'BUCHAREST, RO · 44.43°N 26.10°E',
  address: ['Atelier L·AUR·A', '[Street and number]', '[Postcode] Bucharest', 'Romania'],
  hours: [
    { day: 'MON — WED', time: 'By appointment', isOpen: false },
    { day: 'THU — FRI', time: '11:00 — 19:00', isOpen: true },
    { day: 'SAT', time: '11:00 — 16:00', isOpen: true },
    { day: 'SUN', time: 'Closed', isOpen: false },
  ],
  hoursNote:
    'Thursday to Saturday the door is open. Other days I’m at the bench or the kiln — write ahead and we’ll find a time.',
};

/** Studio-wide copy: utility bar, footer, contact page. */
export const SITE_COPY: Localized<typeof en> = {
  en,
  ro: {
    utilityLeft: 'L·AUR·A.ART — STUDIO BUCUREȘTI',
    utilityRight: 'DIN 2014',
    footerTagline:
      'Bijuterii lucrate manual, sticlă reciclată și obiecte pentru fiecare zi. Vizite în studioul din București, cu programare.',
    locationLine: 'BUCUREȘTI, RO · 44.43°N 26.10°E',
    address: ['Atelier L·AUR·A', '[Strada și numărul]', '[Cod poștal] București', 'România'],
    hours: [
      { day: 'LUN — MIE', time: 'Cu programare', isOpen: false },
      { day: 'JOI — VIN', time: '11:00 — 19:00', isOpen: true },
      { day: 'SÂM', time: '11:00 — 16:00', isOpen: true },
      { day: 'DUM', time: 'Închis', isOpen: false },
    ],
    hoursNote:
      'De joi până sâmbătă ușa e deschisă. În celelalte zile sunt la banc sau la cuptor — scrie-mi dinainte și găsim o oră.',
  },
};
