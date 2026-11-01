import { SITE_COPY } from '../content/site';
import { UI } from '../content/ui';
import { LOCALES, useCopy, useLocale } from '../i18n';

export default function UtilityBar() {
  const { locale, setLocale } = useLocale();
  const copy = useCopy(SITE_COPY);
  const ui = useCopy(UI);
  return (
    <div className="border-b border-ink/10 font-mono text-[10px] tracking-[.08em] text-muted">
      <div className="container-site flex items-center justify-between gap-4 py-2">
        <span className="min-w-0 truncate">{copy.utilityLeft}</span>
        <span className="flex shrink-0 items-center gap-3 sm:gap-5">
          {/* Secondary on a phone: the language switch matters more than the note. */}
          <span className="hidden sm:inline">{copy.utilityRight}</span>
          <span role="group" aria-label={ui.language} className="flex items-center">
            {LOCALES.map((code, i) => (
              <span key={code} className="flex items-center">
                {i > 0 && <span aria-hidden="true">/</span>}
                <button
                  type="button"
                  lang={code}
                  aria-pressed={code === locale}
                  onClick={() => setLocale(code)}
                  // The padding is the tap target (~28px); the negative margin keeps the bar slim.
                  className={`-my-2 cursor-pointer border-0 bg-transparent px-1.5 py-2 font-mono text-[10px] tracking-[.08em] uppercase ${
                    code === locale ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {code}
                </button>
              </span>
            ))}
          </span>
        </span>
      </div>
    </div>
  );
}
