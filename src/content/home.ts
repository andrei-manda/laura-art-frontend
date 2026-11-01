import type { ColorKey } from '../api/types';
import type { Localized } from '../i18n';
import { img } from './types';

/** The collection whose newest photo illustrates a home section. */
export type HomeSource = 'jewelry' | 'ecoGlass' | 'diademe' | 'decor' | 'workshops' | 'exhibitions';

export interface HomeSection {
  number: string;
  title: string;
  accentLabel: string;
  colorKey: ColorKey;
  summary: string;
  source: HomeSource;
  linkPath: string;
  linkText: string;
  /** Adds a live "next" line, read from Strapi. */
  live?: 'session' | 'show';
}

/** Headline pieces; an accented piece takes that collection's colour. */
type HeadlinePart = { text: string; accent?: ColorKey };

interface HomeContent {
  hero: { kicker: string; headline: HeadlinePart[]; paragraph: string; image: string; imageAlt: string; linkText: string };
  sections: HomeSection[];
  nextSession: string;
  nextShow: string;
  about: { label: string; statement: string; portrait: string };
  cta: { label: string; headline: string };
}

const IMAGES = {
  hero: img('home/hero.jpg'),
  portrait: img('home/portrait.jpg'),
};

export const HOME: Localized<HomeContent> = {
  ro: {
    hero: {
      kicker: 'STUDIO BUCUREȘTI — LUCRAT MANUAL, PIESĂ CU PIESĂ',
      headline: [
        { text: 'Bijuterii', accent: 'gold' },
        { text: ', ' },
        { text: 'sticlă', accent: 'teal' },
        { text: ' și obiecte — făcute de mână, gândite pentru lumină.' },
      ],
      paragraph:
        'Un studio cu un singur om, în București, care lucrează cu metal și sticlă reciclată. Totul e format, ars și finisat de mână, în serii mici — nicio piesă nu seamănă cu alta.',
      image: IMAGES.hero,
      imageAlt: 'Diademă din alamă cu frunze forjate de mână, suspendată în lumină caldă',
      linkText: 'Descoperă colecțiile',
    },
    sections: [
      {
        number: '01', title: 'Bijuterii', accentLabel: 'AURIU', colorKey: 'gold',
        summary: 'Inele, cercei, coliere și obiecte mici din alamă, argint și pietre găsite — tăiate, lipite și lustruite la banc, făcute ca să fie purtate în fiecare zi.',
        source: 'jewelry', linkPath: '/jewelry', linkText: 'Vezi bijuteriile',
      },
      {
        number: '02', title: 'Sticlă eco', accentLabel: 'TURCOAZ / TRANSPARENT', colorKey: 'teal',
        summary: 'Sticle și resturi de geam, sparte și formate în cuptor în vase și fragmente translucide. Fiecare piesă păstrează o urmă din ce a fost înainte.',
        source: 'ecoGlass', linkPath: '/eco-glass', linkText: 'Vezi sticla eco',
      },
      {
        number: '03', title: 'Diademe', accentLabel: 'ROZ PAL', colorKey: 'rose',
        summary: 'Piese de cap forjate manual pentru ziua nunții, pentru scenă și pentru tot ce e între — cu perle, pietre și sticlă, atât de ușoare încât uiți că le porți.',
        source: 'diademe', linkPath: '/diademe', linkText: 'Vezi diademele',
      },
      {
        number: '04', title: 'Decor funcțional', accentLabel: 'VERDE', colorKey: 'green',
        summary: 'Lămpi, boluri, cârlige și mânere din alamă, lemn și sticlă reciclată. Obiecte făcute ca să fie folosite în fiecare zi, nu ținute în vitrină.',
        source: 'decor', linkPath: '/decor', linkText: 'Vezi decorul',
      },
      {
        number: '05', title: 'Ateliere', accentLabel: 'MOV', colorKey: 'purple',
        summary: 'Grupuri mici la bancul din studio, cu sticlă și metal. Pentru majoritatea sesiunilor nu ai nevoie de experiență, iar fiecare pleacă acasă cu ceva făcut cu mâna lui.',
        source: 'workshops', linkPath: '/workshops', linkText: 'Vezi sesiunile', live: 'session',
      },
      {
        number: '06', title: 'Expoziții', accentLabel: 'ALBASTRU COBALT', colorKey: 'cobalt',
        summary: 'Acolo unde lucrările ocupă o încăpere întreagă — expoziții selectate și instalații gândite pentru spațiu, în România și în străinătate, din 2018.',
        source: 'exhibitions', linkPath: '/exhibitions', linkText: 'Toate expozițiile', live: 'show',
      },
    ],
    nextSession: 'URMĂTOAREA SESIUNE',
    nextShow: 'URMĂTOAREA EXPOZIȚIE',
    about: {
      label: 'STUDIOUL',
      statement:
        'Fac obiecte încet, cu mâinile — bijuterii, sticlă reciclată și, din când în când, câte o piesă cât o cameră. Materialul conduce; eu îl urmez.',
      portrait: IMAGES.portrait,
    },
    cta: {
      label: 'CONTACT',
      headline: 'Hai să facem\nceva împreună.',
    },
  },

  en: {
    hero: {
      kicker: 'STUDIO BUCHAREST — HANDMADE, ONE AT A TIME',
      headline: [
        { text: 'Jewelry', accent: 'gold' },
        { text: ', ' },
        { text: 'glass', accent: 'teal' },
        { text: ' & objects — made by hand, tuned to light.' },
      ],
      paragraph:
        'A one-person studio in Bucharest working in metal and recycled glass. Everything is formed, fired and finished by hand, in small batches — no two pieces alike.',
      image: IMAGES.hero,
      imageAlt: 'A brass tiara of hand-forged leaves, suspended in warm light',
      linkText: 'Explore the collections',
    },
    sections: [
      {
        number: '01', title: 'Jewelry', accentLabel: 'AURIU / GOLD', colorKey: 'gold',
        summary: 'Rings, earrings, necklaces and small objects in brass, silver and found stone — sawn, soldered and burnished at the bench, and made to be worn every day.',
        source: 'jewelry', linkPath: '/jewelry', linkText: 'View jewelry',
      },
      {
        number: '02', title: 'Eco Glass', accentLabel: 'TURCOAZ / TRANSPARENT', colorKey: 'teal',
        summary: 'Bottles and window offcuts, crushed and kiln-formed into vessels and translucent fragments. Each piece keeps a trace of what it used to be.',
        source: 'ecoGlass', linkPath: '/eco-glass', linkText: 'View eco glass',
      },
      {
        number: '03', title: 'Tiaras', accentLabel: 'ROZ PAL', colorKey: 'rose',
        summary: 'Hand-forged headpieces for the wedding day, the stage and everything in between — set with pearl, stone and glass, light enough to forget you are wearing them.',
        source: 'diademe', linkPath: '/diademe', linkText: 'View tiaras',
      },
      {
        number: '04', title: 'Functional Décor', accentLabel: 'VERDE', colorKey: 'green',
        summary: 'Lamps, bowls, hooks and handles in brass, wood and recycled glass. Objects made to be reached for every day, not kept behind glass.',
        source: 'decor', linkPath: '/decor', linkText: 'View décor',
      },
      {
        number: '05', title: 'Workshops', accentLabel: 'MOV', colorKey: 'purple',
        summary: 'Small groups at the studio bench, in glass and metal. Most sessions need no experience, and everyone leaves with something they made themselves.',
        source: 'workshops', linkPath: '/workshops', linkText: 'See sessions', live: 'session',
      },
      {
        number: '06', title: 'Exhibitions', accentLabel: 'ALBASTRU COBALT', colorKey: 'cobalt',
        summary: 'Where the work takes a room — selected shows and site-specific installations in Romania and abroad, since 2018.',
        source: 'exhibitions', linkPath: '/exhibitions', linkText: 'All exhibitions', live: 'show',
      },
    ],
    nextSession: 'NEXT SESSION',
    nextShow: 'NEXT SHOW',
    about: {
      label: 'THE STUDIO',
      statement:
        'I make objects slowly, with my hands — jewelry, recycled glass and the occasional room-sized piece. The material leads; I follow.',
      portrait: IMAGES.portrait,
    },
    cta: {
      label: 'CONTACT',
      headline: 'Let’s make\nsomething together.',
    },
  },
};
