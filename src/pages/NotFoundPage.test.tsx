import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Footer from '../components/Footer';

it('offers a way back to every section', () => {
  render(<MemoryRouter><NotFoundPage /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  expect(screen.getByText(/404 — PAGINA NU A FOST GĂSITĂ/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /bijuterii/i })).toHaveAttribute('href', '/jewelry');
  expect(screen.getByRole('link', { name: /înapoi la prima pagină/i })).toHaveAttribute('href', '/');
});

it('footer collection names link to their pages', () => {
  render(<MemoryRouter><Footer /></MemoryRouter>);
  expect(screen.getByRole('link', { name: /sticlă eco/i })).toHaveAttribute('href', '/eco-glass');
  expect(screen.getByRole('link', { name: /diademe/i })).toHaveAttribute('href', '/diademe');
  expect(screen.getByRole('link', { name: /d[ée]cor/i })).toHaveAttribute('href', '/decor');
  expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
});
