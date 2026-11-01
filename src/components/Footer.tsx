import { Link } from 'react-router-dom';
import { COLLECTION_LINKS, STUDIO_LINKS } from '../navLinks';
import { ACCENT_BG } from '../theme/accents';
import { SITE, SITE_COPY } from '../content/site';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

export default function Footer() {
  const copy = useCopy(SITE_COPY);
  const ui = useCopy(UI);
  return (
    <footer className="bg-ink text-[#C9CBC4]">
      <div className="container-site pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              {/* inverted so the black mark reads on the dark footer */}
              <img src={SITE.logo} alt="" className="h-[34px] w-[34px] invert" />
              <span className="pl-[.34em] font-chakra text-[20px] font-semibold tracking-[.34em] text-paper">
                {SITE.name}
              </span>
            </div>
            <p className="max-w-[300px] text-[13px] leading-[1.7] text-[#8C8E88]">{copy.footerTagline}</p>
          </div>
          <div className="text-[13px] leading-[2.1]">
            <div className="mb-2 font-mono text-[10px] tracking-[.12em] text-[#6C6E68]">{ui.footer.collections}</div>
            {COLLECTION_LINKS.map((c) => (
              <Link key={c.path} to={c.path} className="flex items-center gap-2 text-inherit no-underline">
                <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_BG[c.colorKey]}`} />{ui.nav[c.key]}
              </Link>
            ))}
          </div>
          <div className="text-[13px] leading-[2.1]">
            <div className="mb-2 font-mono text-[10px] tracking-[.12em] text-[#6C6E68]">{ui.footer.studio}</div>
            {STUDIO_LINKS.map((s) => (
              <Link key={s.path} to={s.path} className="flex items-center gap-2 text-inherit no-underline">
                <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_BG[s.colorKey]}`} />{ui.nav[s.key]}
              </Link>
            ))}
            <Link to="/contact" className="block text-inherit no-underline">{ui.nav.contact}</Link>
          </div>
          <div className="text-[13px] leading-[2.1]">
            <div className="mb-2 font-mono text-[10px] tracking-[.12em] text-[#6C6E68]">{ui.footer.connect}</div>
            {SITE.instagramUrl ? <a href={SITE.instagramUrl} className="block text-inherit no-underline">Instagram</a> : <div>Instagram</div>}
            {SITE.pinterestUrl ? <a href={SITE.pinterestUrl} className="block text-inherit no-underline">Pinterest</a> : <div>Pinterest</div>}
            <a href={`mailto:${SITE.email}`} className="block text-inherit no-underline">{SITE.email}</a>
          </div>
        </div>
        <div className="mt-11 flex flex-col gap-2 border-t border-white/10 pt-4 font-mono text-[10px] tracking-[.06em] text-[#6C6E68] md:flex-row md:justify-between">
          <span>{SITE.copyrightLine}</span>
          <span>{copy.locationLine}</span>
        </div>
      </div>
    </footer>
  );
}
