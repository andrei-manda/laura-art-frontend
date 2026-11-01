import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../navLinks';
import { ACCENT_BG } from '../theme/accents';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

/** Any URL that matches no route. Without this the page body renders empty. */
export default function NotFoundPage() {
  const ui = useCopy(UI);
  const copy = ui.notFound;
  return (
    <div className="container-site py-20 md:py-28">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-[5px] w-12 bg-ink" />
        <span className="font-mono text-[11px] tracking-[.12em] text-muted">{copy.label}</span>
      </div>
      <h1 className="max-w-[720px] font-grotesk text-[clamp(32px,7vw,64px)] font-normal leading-[1.04] tracking-[-.02em]">
        {copy.headline}
      </h1>
      <p className="mt-6 max-w-[460px] text-[16px] leading-[1.7] text-body">
        {copy.paragraph}
      </p>

      <div className="mt-9 flex flex-wrap gap-2.5 border-t border-ink/15 pt-6 font-chakra text-[12px] uppercase tracking-[.1em]">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-2 border border-ink/20 px-3.5 py-2 text-body no-underline transition-colors hover:border-ink hover:text-ink"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_BG[item.colorKey]}`} />
            {ui.nav[item.key]}
          </Link>
        ))}
      </div>

      <Link
        to="/"
        className="mt-9 inline-block border-b-2 border-ink pb-1 font-chakra text-[12px] font-semibold uppercase tracking-[.16em] text-ink no-underline"
      >
        {copy.back} →
      </Link>
    </div>
  );
}
