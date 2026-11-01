import { useRef, useState } from 'react';
import { mediaUrl } from '../api/client';
import type { ColorKey, CuratedWork } from '../api/types';
import type { CuratedPageContent } from '../content/types';
import { pickFeatured } from '../api/featured';
import type { Tone } from '../theme/accents';
import { ACCENT_BG, ACCENT_BORDER, ACCENT_CHIP_HOVER, ACCENT_LIGHTBOX_HOVER, ACCENT_TEXT, TONE_BG } from '../theme/accents';
import CategoryHero from './CategoryHero';
import SpecRows from './SpecRows';
import AccentImage from './AccentImage';
import CtaSection from './CtaSection';
import Lightbox from './Lightbox';
import { CarouselSkeleton } from './Skeleton';
import LoadError from './LoadError';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

interface Props {
  page: CuratedPageContent;
  works: CuratedWork[];
  accent: ColorKey;
  tone: Tone;
  bandBgClass: string;
  endCardTextClass: string;
  ctaTintClass: string;
  email: string;
  carouselClass: string;
  /** The copy is static; only the works load — show placeholders, not an empty rail. */
  worksLoading?: boolean;
  worksError?: string | null;
}

export default function CuratedPageLayout({
  page, works, accent, tone, bandBgClass, endCardTextClass, ctaTintClass, email, carouselClass, worksLoading = false, worksError = null,
}: Props) {
  const ui = useCopy(UI);
  const [lbIndex, setLbIndex] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * Math.max(320, el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const featured = pickFeatured(works);
  const lbItems = works.map((w) => ({ src: mediaUrl(w.photo), title: w.title, caption: w.caption }));

  return (
    <div className="rise-in">
      <CategoryHero
        accentLabel={page.heroAccentLabel}
        title={page.heroTitle}
        paragraph={page.heroParagraph}
        specs={page.heroSpecs}
        accent={accent}
      />

      {/* band image */}
      <div className="relative mt-10 w-full md:mt-11">
        <AccentImage
          src={page.bandImage}
          imgClassName={page.bandFocus}
          aspectClass="aspect-[4/3] md:aspect-[24/9]"
          tone={tone}
          accentClass={ACCENT_BG[accent]}
          className={`min-h-[240px] md:min-h-[380px] ${bandBgClass}`}
        />
      </div>

      {/* works carousel */}
      <div className="container-site pt-14 md:pt-20">
        <div className="mb-7 flex items-end justify-between gap-4 border-t border-ink/15 pt-4">
          <div>
            <div className="font-mono text-[11px] tracking-[.14em] text-muted">
              {page.worksLabel} — {String(works.length).padStart(2, '0')} {ui.piecesUnit}
            </div>
            <div className="mt-2 font-grotesk text-[clamp(22px,3vw,30px)] font-light tracking-[-.01em]">{page.worksHeadline}</div>
          </div>
          <div className="hidden gap-2.5 md:flex">
            <button aria-label={ui.previous} onClick={() => scrollBy(-1)} className={`flex h-[46px] w-[46px] items-center justify-center border border-ink/25 bg-paper text-lg transition-colors ${ACCENT_CHIP_HOVER[accent]}`}>←</button>
            <button aria-label={ui.next} onClick={() => scrollBy(1)} className={`flex h-[46px] w-[46px] items-center justify-center border border-ink/25 bg-paper text-lg transition-colors ${ACCENT_CHIP_HOVER[accent]}`}>→</button>
          </div>
        </div>
        {worksError ? (
          <LoadError inline />
        ) : worksLoading ? (
          <CarouselSkeleton tone={TONE_BG[tone]} />
        ) : (
          <div ref={scroller} className={`${carouselClass} flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4`}>
            {works.map((work, i) => (
              <div key={work.id} className="w-[260px] flex-none snap-start md:w-[320px]">
                <AccentImage media={work.photo} tone={tone} accentClass={ACCENT_BG[accent]} annotation={String(i + 1).padStart(2, '0')} onClick={() => setLbIndex(i)} label={work.title} />
                <div className="mt-3.5 flex items-baseline justify-between">
                  <span className="font-chakra text-[16px] font-semibold md:text-[18px]">{work.title}</span>
                  <span className="font-mono text-[10px] text-muted">{work.year}</span>
                </div>
                <div className="mt-1 text-[12px] text-[#7A7C76]">{work.materialLine}</div>
              </div>
            ))}
            {/* end card */}
            <div className={`flex w-[260px] flex-none snap-start flex-col justify-between p-6 md:w-[320px] ${ACCENT_BG[accent]} ${endCardTextClass}`}>
              <div className="font-mono text-[10px] tracking-[.12em] opacity-85">{page.endCardLabel}</div>
              <div className="font-grotesk text-[24px] font-light leading-[1.3]">{page.endCardStatement}</div>
              <a href={`mailto:${email}`} className="self-start border-b-2 border-white/60 pb-1 font-chakra text-[11px] font-semibold uppercase tracking-[.16em] text-white no-underline">
                {page.endCardLinkText} →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* featured piece */}
      {featured && (
        <div className="container-site pt-14 md:pt-20">
          <div className="mb-8 border-t border-ink/15 pt-4 font-mono text-[11px] tracking-[.14em] text-muted md:mb-10">{page.featuredLabel}</div>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <AccentImage media={featured.photo} tone={tone} accentClass={ACCENT_BG[accent]} />
            <div>
              <div className={`mb-3.5 font-mono text-[11px] tracking-[.1em] ${ACCENT_TEXT[accent]}`}>{featured.pieceNumber}</div>
              <h2 className="font-grotesk text-[clamp(24px,4.5vw,44px)] font-normal leading-[1.06] tracking-[-.02em]">{featured.title}</h2>
              <p className="mt-5 max-w-[440px] text-[15px] leading-[1.75] text-body">{featured.description}</p>
              <SpecRows
                className="mt-6"
                rows={[
                  { label: ui.featuredSpecs.source, value: featured.source ?? '' },
                  { label: ui.featuredSpecs.dimensions, value: featured.dimensions ?? '' },
                  { label: ui.featuredSpecs.year, value: String(featured.year ?? '') },
                  { label: ui.featuredSpecs.price, value: featured.priceText || ui.featuredSpecs.onRequest },
                ].filter((r) => r.value)}
              />
              <a href={`mailto:${email}`} className={`mt-6 inline-block border-b-2 pb-1 font-chakra text-[12px] font-semibold uppercase tracking-[.16em] text-ink no-underline ${ACCENT_BORDER[accent]}`}>
                {page.enquireText} →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* process */}
      <div className="container-site pt-16 md:pt-[88px]">
        <div className="border-t border-ink/15 pt-4 font-mono text-[11px] tracking-[.14em] text-muted">{ui.process}</div>
        <h2 className="mt-5 mb-10 max-w-[640px] font-grotesk text-[clamp(26px,4vw,38px)] font-light leading-[1.2] tracking-[-.01em] md:mb-12">
          {page.processHeadline}
        </h2>
        {page.processSteps.map((step, i) => (
          <div key={step.number} className="mb-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <AccentImage src={step.image} aspectClass="aspect-[4/3]" tone={tone} accentClass={ACCENT_BG[accent]} className={i % 2 === 1 ? 'md:order-2' : ''} />
            <div className={i % 2 === 1 ? 'md:order-1' : ''}>
              <div className={`font-mono text-[30px] ${ACCENT_TEXT[accent]}`}>{step.number}</div>
              <h3 className="mt-2 mb-3 font-grotesk text-[26px] font-medium">{step.title}</h3>
              <p className="max-w-[420px] text-[15px] leading-[1.75] text-body">{step.paragraph}</p>
            </div>
          </div>
        ))}
      </div>

      <CtaSection data={page.cta} bgClass={ACCENT_BG[accent]} tintClass={ctaTintClass} email={email} />

      {lbIndex >= 0 && lbItems.length > 0 && (
        <Lightbox
          items={lbItems}
          index={lbIndex}
          accentHoverClass={ACCENT_LIGHTBOX_HOVER[accent]}
          onClose={() => setLbIndex(-1)}
          onIndex={setLbIndex}
        />
      )}
    </div>
  );
}
