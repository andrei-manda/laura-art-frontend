import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { ColorKey } from '../api/types';
import { NAV_LINKS } from '../navLinks';
import { ACCENT_BG, ACCENT_BORDER } from '../theme/accents';
import { SITE } from '../content/site';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

function Dot({ colorKey }: { colorKey: ColorKey }) {
  return <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${ACCENT_BG[colorKey]}`} />;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const ui = useCopy(UI);

  // Close on navigation — covers the browser back button, not just link taps.
  useEffect(() => { setOpen(false); }, [pathname]);

  // The overlay covers the viewport, so the page behind it must not scroll.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  const items = NAV_LINKS.map((item) => (
    <NavLink
      key={item.path}
      to={item.path}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-2 no-underline text-inherit ${isActive ? `text-ink border-b-2 pb-1 ${ACCENT_BORDER[item.colorKey]}` : ''}`
      }
    >
      <Dot colorKey={item.colorKey} />{ui.nav[item.key]}
    </NavLink>
  ));

  return (
    <div className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <div className="container-site flex items-center justify-between gap-4 py-3.5">
        <Link to="/" className="flex min-w-0 items-center gap-3 no-underline text-inherit" onClick={() => setOpen(false)}>
          <img src={SITE.logo} alt="" className="h-[30px] w-[30px] shrink-0" />
          <span className="truncate pl-[.34em] font-chakra text-[17px] font-semibold tracking-[.28em] sm:text-[19px] sm:tracking-[.34em]">
            {SITE.name}
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-6 font-chakra text-[12px] font-medium uppercase tracking-[.14em] text-body lg:flex">
          {items}
          <Link to="/contact" className="border border-ink/25 px-3.5 py-2 text-ink no-underline">{ui.nav.contact}</Link>
        </nav>

        {/* mobile toggle */}
        <button
          aria-label={open ? ui.closeMenu : ui.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink/25 text-lg lg:hidden"
        >
          {open ? '×' : '≡'}
        </button>
      </div>

      {/* Mobile overlay. [&>*]:py-1 widens each row's tap target; the shared
          `items` keep the desktop nav untouched. */}
      {open && (
        <nav
          data-testid="mobile-menu"
          className="absolute inset-x-0 top-full z-50 flex h-[calc(100dvh-100%)] flex-col gap-5 overflow-y-auto overscroll-contain bg-paper px-6 py-10 font-chakra text-[clamp(17px,5vw,20px)] font-medium uppercase tracking-[.14em] text-body lg:hidden [&>*]:py-1"
        >
          {items}
          <Link to="/contact" onClick={() => setOpen(false)} className="self-start border border-ink/25 px-3.5 py-2 text-ink no-underline">{ui.nav.contact}</Link>
        </nav>
      )}
    </div>
  );
}
