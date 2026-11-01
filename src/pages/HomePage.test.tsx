import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { STRAPI_URL } from '../api/client';

const session = { id: 1, documentId: 's', title: 'Pliază un panou', category: 'glass', status: 'open', dateText: 'Vin 21 aug 2026', sortOrder: 1 };
const show = { id: 1, documentId: 'e', title: 'Light, Folded', slug: 'light-folded', status: 'upcoming', dateText: '14 mar — 28 apr 2026', sortOrder: 1 };

function stubApi() {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: url.includes('workshop-sessions') ? [session] : [show] }),
    }),
  ));
}

it('renders the static hero and one row per collection without waiting for the API', () => {
  stubApi();
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bijuterii, sticlă și obiecte');
  for (const title of ['Bijuterii', 'Sticlă eco', 'Diademe', 'Decor funcțional', 'Ateliere', 'Expoziții']) {
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
  }
  expect(screen.getByRole('link', { name: /vezi sesiunile/i })).toHaveAttribute('href', '/workshops');
  expect(screen.getByRole('link', { name: /vezi diademele/i })).toHaveAttribute('href', '/diademe');
});

it('shows the next session and next show from Strapi', async () => {
  stubApi();
  render(<MemoryRouter><HomePage /></MemoryRouter>);
  expect(await screen.findByText('URMĂTOAREA SESIUNE · VIN 21 AUG 2026')).toBeInTheDocument();
  expect(await screen.findByRole('link', { name: /următoarea expoziție · light, folded/i })).toHaveAttribute('href', '/exhibitions/light-folded');
});

it('illustrates a row with the newest entry that has a photo', async () => {
  const pieces = [
    { id: 2, documentId: 'n', title: 'Inel nou', photo: null },
    { id: 1, documentId: 'p', title: 'Inel sigiliu', photo: { id: 7, url: '/uploads/ring.jpg', alternativeText: '' } },
  ];
  const fetchMock = vi.fn().mockImplementation((url: string) =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ data: url.startsWith(`${STRAPI_URL}/api/jewelry-pieces`) ? pieces : [] }) }),
  );
  vi.stubGlobal('fetch', fetchMock);
  render(<MemoryRouter><HomePage /></MemoryRouter>);

  const photo = await screen.findByRole('img', { name: 'Inel sigiliu' });
  expect(photo).toHaveAttribute('src', `${STRAPI_URL}/uploads/ring.jpg`);
  expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('jewelry-pieces?populate=photo&sort=createdAt:desc'));
});
