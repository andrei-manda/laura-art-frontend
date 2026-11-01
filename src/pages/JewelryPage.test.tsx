import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import JewelryPage from './JewelryPage';

const pieces = [
  { id: 1, documentId: 'a', title: 'Signet Ring', category: 'rings', sortOrder: 1, year: 2026, caption: 'c' },
];

it('renders the static hero and category sections, then the pieces', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: pieces }) }));
  render(<MemoryRouter><JewelryPage /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bijuterii');
  expect(screen.getByText('02 — INELE')).toBeInTheDocument();
  expect(await screen.findByText('Signet Ring')).toBeInTheDocument();
});

it('keeps the copy and reports the error when the pieces fail to load', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
  render(<MemoryRouter><JewelryPage /></MemoryRouter>);
  expect(await screen.findByRole('alert')).toHaveTextContent(/nu pot fi încărcate/i);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bijuterii');
});
