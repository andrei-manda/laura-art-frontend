import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LocaleProvider from './LocaleProvider';
import UtilityBar from './components/UtilityBar';
import JewelryPage from './pages/JewelryPage';

afterEach(() => localStorage.clear());

function renderSite() {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: [] }) });
  vi.stubGlobal('fetch', fetchMock);
  render(
    <LocaleProvider>
      <MemoryRouter>
        <UtilityBar />
        <JewelryPage />
      </MemoryRouter>
    </LocaleProvider>,
  );
  return fetchMock;
}

it('starts in Romanian and asks Strapi for Romanian entries', async () => {
  const fetchMock = renderSite();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bijuterii');
  expect(screen.getByRole('button', { name: 'ro' })).toHaveAttribute('aria-pressed', 'true');
  expect(document.documentElement.lang).toBe('ro');
  await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('locale=ro')));
});

it('switches to English, refetches in English and remembers the choice', async () => {
  const user = userEvent.setup();
  const fetchMock = renderSite();
  await user.click(screen.getByRole('button', { name: 'en' }));

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Jewelry');
  expect(document.documentElement.lang).toBe('en');
  expect(localStorage.getItem('laura.locale')).toBe('en');
  await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('locale=en')));
});

it('restores a remembered language on the next visit', () => {
  localStorage.setItem('laura.locale', 'en');
  renderSite();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Jewelry');
});
