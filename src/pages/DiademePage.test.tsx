import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DiademePage from './DiademePage';

const pieces = [
  { id: 1, documentId: 'a', title: 'Veil Crown', category: 'bridal', sortOrder: 1, year: 2026, caption: 'c' },
];

it('renders hero, category sections, pieces, and the empty state', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: pieces }) }));
  const { container } = render(<MemoryRouter><DiademePage /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Diademe');
  expect(screen.getByText('01 — MIREASĂ')).toBeInTheDocument();
  expect(await screen.findByText('Veil Crown')).toBeInTheDocument();
  // only 'bridal' has pieces in the fixture; the other three sections are empty
  expect(screen.getAllByText('— PIESE ÎN CURÂND —')).toHaveLength(3);
  // chip row renders the label with the em dash stripped out; testing-library
  // collapses the resulting double space to one.
  expect(screen.getByText('01 MIREASĂ')).toBeInTheDocument();
  expect(container.querySelector('.bg-rose')).toBeTruthy();
});
