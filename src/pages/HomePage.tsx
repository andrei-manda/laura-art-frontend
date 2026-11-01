import { Link } from 'react-router-dom';
import { useStrapi } from '../api/useStrapi';
import { queries } from '../api/client';
import type { Exhibition, Media, WorkshopSession } from '../api/types';
import { HOME } from '../content/home';
import type { HomeSection } from '../content/home';
import { SITE } from '../content/site';
import AccentImage from '../components/AccentImage';
import { ACCENT_BG, ACCENT_BORDER, ACCENT_TEXT } from '../theme/accents';
import { useCopy } from '../i18n';

/** Any collection entry; each type names its picture differently. */
interface PhotoEntry { documentId: string; title: string; photo?: Media | null; image?: Media | null; banner?: Media | null }

const pictureOf = (e: PhotoEntry) => e.photo ?? e.image ?? e.banner ?? null;

/**
 * One collection: image and summary, alternating sides on wider screens. The
 * image is the newest entry Laura uploaded to that collection.
 */
function SectionRow({ section, flip, next }: { section: HomeSection; flip: boolean; next?: { label: string; to: string } }) {
  const { colorKey } = section;
  const { data: entries } = useStrapi<PhotoEntry[]>(queries.latestPhoto[section.source]);
  const latest = entries?.find(pictureOf);
  const picture = latest ? pictureOf(latest) : null;
  return (
    <div className="grid grid-cols-1 items-center gap-8 border-t border-ink/15 pt-8 md:grid-cols-2 md:gap-14 md:pt-12">
      <Link to={section.linkPath} className={`block ${flip ? 'md:order-2' : ''}`} aria-label={section.title}>
        <AccentImage
          media={picture}
          alt={picture?.alternativeText || latest?.title}
          aspectClass="aspect-[4/3]"
          accentClass={ACCENT_BG[colorKey]}
        />
      </Link>
      <div className={flip ? 'md:order-1' : ''}>
        <div className="mb-4 flex items-center gap-2.5">
          <span className="font-mono text-[11px] text-muted">{section.number}</span>
          <span className={`h-1 w-10 ${ACCENT_BG[colorKey]}`} />
          <span className={`font-mono text-[11px] tracking-[.1em] ${ACCENT_TEXT[colorKey]}`}>{section.accentLabel}</span>
        </div>
        <h2 className="font-grotesk text-[clamp(28px,4.5vw,44px)] font-normal leading-[1.08] tracking-[-.02em]">{section.title}</h2>
        <p className="mt-4 max-w-[460px] text-[15px] leading-[1.75] text-body">{section.summary}</p>
        {next && (
          <Link to={next.to} className="mt-5 flex items-center gap-2.5 font-mono text-[11px] tracking-[.06em] text-ink no-underline">
            <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_BG[colorKey]}`} />
            {next.label}
          </Link>
        )}
        <Link
          to={section.linkPath}
          className={`mt-6 inline-block border-b-2 pb-1 font-chakra text-[12px] font-semibold uppercase tracking-[.16em] text-ink no-underline ${ACCENT_BORDER[colorKey]}`}
        >
          {section.linkText} →
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Live lines on the Workshops and Exhibitions rows: what's coming up next.
  const { data: sessions } = useStrapi<WorkshopSession[]>(queries.nextSession);
  const { data: shows } = useStrapi<Exhibition[]>(queries.nextShow);
  const home = useCopy(HOME);
  const { hero, sections, about, cta } = home;

  const session = sessions?.[0];
  const show = shows?.[0];
  const next = {
    session: session?.dateText ? { label: `${home.nextSession} · ${session.dateText.toUpperCase()}`, to: '/workshops' } : undefined,
    show: show ? { label: `${home.nextShow} · ${show.title.toUpperCase()}${show.dateText ? ` · ${show.dateText.toUpperCase()}` : ''}`, to: `/exhibitions/${show.slug}` } : undefined,
  };

  return (
    <div className="rise-in">
      {/* hero */}
      <div className="container-site pt-10 pb-6 md:pt-16">
        <div className="font-mono text-[11px] tracking-[.12em] text-muted">
          <span className="text-ink">◆</span> {hero.kicker}
        </div>
        <h1 className="mt-6 max-w-[1000px] font-grotesk text-[clamp(32px,7vw,76px)] font-normal leading-[1.04] tracking-[-.02em]">
          {hero.headline.map((part, i) => (
            <span key={i} className={part.accent ? ACCENT_TEXT[part.accent] : undefined}>{part.text}</span>
          ))}
        </h1>
        <div className="mt-8 grid grid-cols-1 items-start gap-8 md:mt-11 md:grid-cols-[1.6fr_1fr] md:gap-12">
          <AccentImage src={hero.image} alt={hero.imageAlt} aspectClass="aspect-video" accentClass="bg-gold" />
          <div>
            <span className="block h-1 w-12 bg-gold" />
            <p className="mt-6 font-grotesk text-[clamp(19px,1.9vw,24px)] font-light leading-[1.5] tracking-[-.01em] text-ink">
              {hero.paragraph}
            </p>
            <a
              href="#collections"
              className="mt-8 inline-block border-b-2 border-ink pb-1 font-chakra text-[12px] font-semibold uppercase tracking-[.16em] text-ink no-underline"
            >
              {hero.linkText} ↓
            </a>
          </div>
        </div>
      </div>

      {/* one row per collection */}
      <div id="collections" className="container-site grid scroll-mt-20 gap-14 pt-10 md:gap-20 md:pt-16">
        {sections.map((section, i) => (
          <SectionRow
            key={section.linkPath}
            section={section}
            flip={i % 2 === 1}
            next={section.live ? next[section.live] : undefined}
          />
        ))}
      </div>

      {/* about */}
      <div className="container-site pt-16 md:pt-24">
        <div className="grid grid-cols-[96px_1fr] items-center gap-6 border-t border-ink/15 pt-8 sm:grid-cols-[140px_1fr] md:gap-10 md:pt-12">
          <AccentImage src={about.portrait} aspectClass="aspect-square" accentClass="bg-ink/0" />
          <div>
            <div className="mb-3 font-mono text-[11px] tracking-[.14em] text-muted">{about.label}</div>
            <p className="max-w-[640px] font-grotesk text-[clamp(18px,2.6vw,24px)] font-light leading-[1.45] tracking-[-.01em]">{about.statement}</p>
          </div>
        </div>
      </div>

      {/* contact CTA */}
      <div className="container-site py-16 text-center md:py-24">
        <div className="font-mono text-[11px] tracking-[.16em] text-muted">{cta.label}</div>
        <h2 className="mt-5 whitespace-pre-line font-grotesk text-[clamp(28px,6vw,58px)] font-normal leading-[1.06] tracking-[-.02em]">
          {cta.headline}
        </h2>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-8 inline-flex items-center gap-3 bg-ink px-7 py-4 font-chakra text-[13px] font-semibold uppercase tracking-[.14em] text-paper no-underline"
        >
          {SITE.email} →
        </a>
      </div>
    </div>
  );
}
