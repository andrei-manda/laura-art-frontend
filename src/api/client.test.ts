import { describe, it, expect, vi, afterEach } from 'vitest';
import { mediaUrl, fetchData, STRAPI_URL } from './client';

afterEach(() => vi.restoreAllMocks());

describe('mediaUrl', () => {
  it('returns null for missing media', () => {
    expect(mediaUrl(null)).toBeNull();
    expect(mediaUrl(undefined)).toBeNull();
  });
  it('prefixes relative upload paths with the Strapi URL', () => {
    expect(mediaUrl({ id: 1, url: '/uploads/x.jpg' })).toBe(`${STRAPI_URL}/uploads/x.jpg`);
  });
  it('leaves absolute URLs untouched', () => {
    expect(mediaUrl({ id: 1, url: 'https://cdn.example.com/x.jpg' })).toBe('https://cdn.example.com/x.jpg');
  });
});

describe('fetchData', () => {
  it('unwraps the data envelope', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { heroTitle: 'Jewelry' } }),
    }));
    await expect(fetchData<{ heroTitle: string }>('jewelry-page')).resolves.toEqual({ heroTitle: 'Jewelry' });
    expect(fetch).toHaveBeenCalledWith(`${STRAPI_URL}/api/jewelry-page`);
  });
  it('throws on non-OK responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(fetchData('nope')).rejects.toThrow('404');
  });
});
