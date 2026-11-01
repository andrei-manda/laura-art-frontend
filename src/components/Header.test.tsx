import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

function renderHeader() {
  return render(<MemoryRouter><Header /></MemoryRouter>);
}

it('shows nav items with links only for built pages', () => {
  renderHeader();
  expect(screen.getAllByRole('link', { name: /bijuterii/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /diademe/i })[0]).toHaveAttribute('href', '/diademe');
  expect(screen.getAllByRole('link', { name: /d[ée]cor/i })[0]).toHaveAttribute('href', '/decor');
  expect(screen.getAllByRole('link', { name: /ateliere/i })[0]).toHaveAttribute('href', '/workshops');
  expect(screen.getAllByRole('link', { name: /expoziții/i })[0]).toHaveAttribute('href', '/exhibitions');
  expect(screen.getAllByRole('link', { name: /contact/i })[0]).toHaveAttribute('href', '/contact');
});

it('opens and closes the mobile menu, locking page scroll while it is open', async () => {
  const user = userEvent.setup();
  renderHeader();
  const toggle = screen.getByRole('button', { name: /meniu/i });
  await user.click(toggle);
  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  expect(document.body).toHaveClass('no-scroll');
  await user.click(screen.getByRole('button', { name: /închide meniul/i }));
  expect(screen.queryByTestId('mobile-menu')).toBeNull();
  expect(document.body).not.toHaveClass('no-scroll');
});
