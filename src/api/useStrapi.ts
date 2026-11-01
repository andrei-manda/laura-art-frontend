import { useEffect, useState } from 'react';
import { fetchData } from './client';
import { useLocale } from '../i18n';

interface StrapiState<T> {
  data: T | null;
  error: string | null;
  /** True until the first response for this path settles. */
  loading: boolean;
}

/** Fetches `path` in the visitor's language; refetches when the language changes. */
export function useStrapi<T>(path: string): StrapiState<T> {
  const { locale } = useLocale();
  const localized = `${path}${path.includes('?') ? '&' : '?'}locale=${locale}`;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setData(null);
    setError(null);
    setLoading(true);
    fetchData<T>(localized)
      .then((d) => { if (active) setData(d); })
      .catch((e: unknown) => { if (active) setError(e instanceof Error ? e.message : String(e)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [localized]);

  return { data, error, loading };
}
