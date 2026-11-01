import { createContext, useContext } from 'react';

export type Locale = 'ro' | 'en';

export const LOCALES: Locale[] = ['ro', 'en'];
export const DEFAULT_LOCALE: Locale = 'ro';

/** A piece of copy written once per language. */
export type Localized<T> = Record<Locale, T>;

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

/** Lives outside LocaleProvider.tsx so that module only exports a component — keeps fast refresh working. */
export const LocaleContext = createContext<LocaleState>({ locale: DEFAULT_LOCALE, setLocale: () => {} });

export function useLocale(): LocaleState {
  return useContext(LocaleContext);
}

/** The current language's half of a { ro, en } content object. */
export function useCopy<T>(content: Localized<T>): T {
  return content[useLocale().locale];
}
