import { render, screen } from '@testing-library/react';
import PageState from './PageState';

it('shows the error message when error is set', () => {
  render(<PageState error="Network request failed" toneClass="bg-ph" />);
  expect(screen.getByText(/Conținutul nu a putut fi încărcat\./)).toBeInTheDocument();
  expect(screen.getByText(/Network request failed/)).toBeInTheDocument();
});

it('shows a toned placeholder block and no error text when error is null', () => {
  const { container } = render(<PageState error={null} toneClass="bg-ph-warm" />);
  expect(screen.queryByText(/Conținutul nu a putut fi încărcat\./)).toBeNull();
  expect(container.querySelector('.bg-ph-warm')).toBeTruthy();
});
