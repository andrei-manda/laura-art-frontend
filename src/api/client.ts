import type { Media } from './types';

export const STRAPI_URL: string =
  (import.meta.env?.VITE_STRAPI_URL as string | undefined) ?? 'http://localhost:1337';

export function mediaUrl(media?: Media | null): string | null {
  if (!media?.url) return null;
  return /^https?:\/\//.test(media.url) ? media.url : `${STRAPI_URL}${media.url}`;
}

export async function fetchData<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api/${path}`);
  if (!res.ok) throw new Error(`Strapi request failed: ${res.status} (${path})`);
  const json = await res.json();
  return json.data as T;
}

/** Thrown by postData. Carries the status and any per-field errors the API returned. */
export class SubmitError extends Error {
  status: number;
  fieldErrors: Record<string, string>;

  constructor(status: number, body: unknown) {
    const parsed = body as
      | { error?: { message?: string; details?: { errors?: Record<string, string> } } }
      | null;
    super(parsed?.error?.message ?? `Request failed: ${status}`);
    this.name = 'SubmitError';
    this.status = status;
    this.fieldErrors = parsed?.error?.details?.errors ?? {};
  }
}

export async function postData<T>(path: string, data: unknown): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  const json: unknown = await res.json().catch(() => null);
  if (!res.ok) throw new SubmitError(res.status, json);
  return json as T;
}

export const queries = {
  jewelryPieces: 'jewelry-pieces?populate=photo&sort=sortOrder&pagination[pageSize]=200',
  ecoGlassWorks: 'eco-glass-works?populate=photo&sort=sortOrder&pagination[pageSize]=100',
  diademePieces: 'diademe-pieces?populate=photo&sort=sortOrder&pagination[pageSize]=200',
  decorWorks: 'decor-works?populate=photo&sort=sortOrder&pagination[pageSize]=100',
  workshopSessions: 'workshop-sessions?populate=image&sort=sortOrder&pagination[pageSize]=100',
  exhibitions: 'exhibitions?populate=banner&sort=sortOrder&pagination[pageSize]=100',
  /** Newest entries first; the home page shows the first one that has a photo. */
  latestPhoto: {
    jewelry: 'jewelry-pieces?populate=photo&sort=createdAt:desc&pagination[pageSize]=10',
    ecoGlass: 'eco-glass-works?populate=photo&sort=createdAt:desc&pagination[pageSize]=10',
    diademe: 'diademe-pieces?populate=photo&sort=createdAt:desc&pagination[pageSize]=10',
    decor: 'decor-works?populate=photo&sort=createdAt:desc&pagination[pageSize]=10',
    workshops: 'workshop-sessions?populate=image&sort=createdAt:desc&pagination[pageSize]=10',
    exhibitions: 'exhibitions?populate=banner&sort=createdAt:desc&pagination[pageSize]=10',
  },
  nextSession: 'workshop-sessions?filters[status][$eq]=open&sort=sortOrder&pagination[pageSize]=1',
  nextShow: 'exhibitions?filters[status][$eq]=upcoming&sort=sortOrder&pagination[pageSize]=1',
  exhibitionBySlug: (slug: string) =>
    `exhibitions?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=photos&populate[1]=banner`,
} as const;
