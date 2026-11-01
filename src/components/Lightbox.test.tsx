import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Lightbox from './Lightbox';

const items = [
  { src: null, title: 'One', caption: 'c1' },
  { src: null, title: 'Two', caption: 'c2' },
  { src: null, title: 'Three', caption: 'c3' },
];

it('renders title, caption and counter', () => {
  render(<Lightbox items={items} index={1} accentHoverClass="" onClose={() => {}} onIndex={() => {}} />);
  expect(screen.getByText('Two')).toBeInTheDocument();
  expect(screen.getByText('2 / 3')).toBeInTheDocument();
});

it('Escape closes, arrows step with wrap-around', () => {
  const onClose = vi.fn();
  const onIndex = vi.fn();
  render(<Lightbox items={items} index={2} accentHoverClass="" onClose={onClose} onIndex={onIndex} />);
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(onIndex).toHaveBeenCalledWith(0); // wraps 2 -> 0
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(onIndex).toHaveBeenCalledWith(1);
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(onClose).toHaveBeenCalled();
});

it('clicking the backdrop closes; clicking content does not', () => {
  const onClose = vi.fn();
  render(<Lightbox items={items} index={0} accentHoverClass="" onClose={onClose} onIndex={() => {}} />);
  fireEvent.click(screen.getByText('One'));
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('dialog'));
  expect(onClose).toHaveBeenCalledTimes(1);
});
