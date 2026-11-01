import { describe, it, expect } from 'vitest';
import { pickFeatured } from './featured';

const item = (id: number, extra: Partial<{ featured: boolean; status: string }> = {}) => ({ id, ...extra });

describe('pickFeatured', () => {
  it('returns null for an empty list', () => {
    expect(pickFeatured([])).toBeNull();
  });

  it('prefers the first entry ticked featured', () => {
    const items = [item(1), item(2, { featured: true }), item(3, { featured: true })];
    expect(pickFeatured(items)?.id).toBe(2);
  });

  it('falls back to the first entry passing the fallback test', () => {
    const items = [item(1, { status: 'past' }), item(2, { status: 'upcoming' })];
    expect(pickFeatured(items, (i) => i.status === 'upcoming')?.id).toBe(2);
  });

  it('falls back to the first entry when nothing else matches', () => {
    const items = [item(1, { status: 'past' }), item(2, { status: 'past' })];
    expect(pickFeatured(items, (i) => i.status === 'upcoming')?.id).toBe(1);
  });
});
