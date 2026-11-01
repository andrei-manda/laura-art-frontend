import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import DecorPage from './DecorPage';

const works = [
  { id: 1, documentId: 'a', title: 'Salt Bowl', sortOrder: 1, year: 2026, materialLine: 'Stoneware', source: 'STONEWARE OFFCUTS' },
  { id: 2, documentId: 'b', title: 'Ember Lamp', sortOrder: 2, year: 2026 },
];

it('features the first work when none is ticked', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: works }) }));
  const { container } = render(<MemoryRouter><DecorPage /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Decor funcțional');
  expect(screen.getByText('Recuperare și sortare')).toBeInTheDocument();
  expect(await screen.findByRole('heading', { level: 2, name: 'Salt Bowl' })).toBeInTheDocument();
  expect(screen.getByText('STONEWARE OFFCUTS')).toBeInTheDocument();
  expect(screen.getByText('Ember Lamp')).toBeInTheDocument();
  expect(container.querySelector('.bg-green')).toBeTruthy();
});
