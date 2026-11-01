import { render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ExhibitionsPage from './ExhibitionsPage';

const ex = (id: number, title: string, status: 'upcoming' | 'past', year: string, dateText: string) => ({
  id, documentId: String(id), title, slug: title.toLowerCase().replace(/\W+/g, '-'), status, year, dateText, sortOrder: id,
});

const exhibitions = [
  ex(1, 'Light, Folded', 'upcoming', '2026', '14 Mar — 28 Apr 2026'),
  ex(2, 'Kiln Notes', 'upcoming', '2027', '15 Jan — 28 Feb 2027'),
  ex(3, 'Quiet Objects', 'past', '2024', '2024'),
  ex(4, 'Beginnings', 'past', '2018', '2018'),
];

it('features the first upcoming show and derives the hero numbers from the data', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: exhibitions }) }));
  render(<MemoryRouter><ExhibitionsPage /></MemoryRouter>);

  expect(await screen.findByRole('heading', { level: 2, name: 'Light, Folded' })).toBeInTheDocument();
  expect(screen.getByText('02 EXPOZIȚII')).toBeInTheDocument();
  expect(screen.getByText('14 MAR')).toBeInTheDocument();
  expect(screen.getByText('DIN 2018')).toBeInTheDocument();
  expect(screen.getByText('2026 — 2027')).toBeInTheDocument();
  expect(screen.getByText('2018 — 2024')).toBeInTheDocument();
});

it('features a past show ticked featured over the upcoming ones', async () => {
  const ticked = exhibitions.map((e) => (e.id === 3 ? { ...e, featured: true } : e));
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: ticked }) }));
  render(<MemoryRouter><ExhibitionsPage /></MemoryRouter>);

  const heading = await screen.findByRole('heading', { level: 2, name: 'Quiet Objects' });
  const card = heading.closest('div.grid') as HTMLElement;
  expect(within(card).getByText('DIN ARHIVĂ')).toBeInTheDocument();
});
