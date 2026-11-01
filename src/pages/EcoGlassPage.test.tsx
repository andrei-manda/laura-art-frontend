import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import EcoGlassPage from './EcoGlassPage';

const works = [
  { id: 1, documentId: 'a', title: 'Tide Vessel', sortOrder: 1, year: 2026, materialLine: 'Recycled' },
  { id: 2, documentId: 'b', title: 'Clearwater Bottle', sortOrder: 2, featured: true, source: 'CULLET', description: 'desc', pieceNumber: 'Nº 014' },
];

it('renders hero, carousel works, the ticked featured piece, and process', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: works }) }));
  render(<MemoryRouter><EcoGlassPage /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sticlă eco');
  expect(screen.getByText('Adunare și spargere')).toBeInTheDocument();
  expect(await screen.findByText('Tide Vessel')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: 'Clearwater Bottle' })).toBeInTheDocument();
  expect(screen.getByText('Nº 014')).toBeInTheDocument();
});
