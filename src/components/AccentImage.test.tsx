import { render, screen } from '@testing-library/react';
import AccentImage from './AccentImage';

it('renders a placeholder block without an img when media is missing', () => {
  const { container } = render(<AccentImage media={null} />);
  expect(container.querySelector('img')).toBeNull();
});

it('renders the image with resolved URL when media is present', () => {
  render(<AccentImage media={{ id: 1, url: '/uploads/a.jpg', alternativeText: 'ring' }} />);
  expect(screen.getByAltText('ring')).toHaveAttribute('src', expect.stringContaining('/uploads/a.jpg'));
});
