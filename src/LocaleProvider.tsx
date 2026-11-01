import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALES, LocaleContext } from './i18n';
import type { Locale } from './i18n';

const STORAGE_KEY = 'laura.locale';

// Storage can be missing or throw (private mode, blocked site data); the site
// then simply starts in Romanian every visit.
function readStored(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return LOCALES.includes(stored as Locale) ? (stored as Locale) : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readStored);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // not persisted; the choice still holds for this visit
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
