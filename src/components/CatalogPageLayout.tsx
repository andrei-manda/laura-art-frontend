import { useMemo, useState } from 'react';
import { mediaUrl } from '../api/client';
import type { CatalogItem, ColorKey } from '../api/types';
import type { CatalogPageContent } from '../content/types';
import type { Tone } from '../theme/accents';
import { ACCENT_BG, ACCENT_CHIP_HOVER, ACCENT_LIGHTBOX_HOVER, ACCENT_TEXT, TONE_BG } from '../theme/accents';
import CategoryHero from './CategoryHero';
import AccentImage from './AccentImage';
import CtaSection from './CtaSection';
import Lightbox from './Lightbox';
import { TileGridSkeleton } from './Skeleton';
import LoadError from './LoadError';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

interface Props<C extends string> {
  page: CatalogPageContent<C>;
  items: CatalogItem<C>[];
  accent: ColorKey;
  tone: Tone;
  ctaTintClass: string;
  email: string;
  /** The copy is static; only the pieces load — show tiles, not "coming soon". */
  itemsLoading?: boolean;
  itemsError?: string | null;
}

export default function CatalogPageLayout<C extends string>({
  page, items, accent, tone, ctaTintClass, email, itemsLoading = false, itemsError = null,
}: Props<C>) {
  const ui = useCopy(UI);
  const [lb, setLb] = useState<{ cat: C; index: number } | null>(null);

  const byCategory = useMemo(() => {
    const map = new Map<C, CatalogItem<C>[]>();
    for (const p of items) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return map;
  }, [items]);

  const lbItems = lb
    ? (byCategory.get(lb.cat) ?? []).map((p) => ({ src: mediaUrl(p.photo), title: p.title, caption: p.caption }))
    : [];

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
          className="min-h-[240px] md:min-h-[380px]"
        />
      </div>

      {/* category index chips */}
      <div className="container-site pt-10 md:pt-12">
        <div className="flex flex-wrap gap-2.5 border-t border-ink/15 pt-5 font-chakra text-[12px] uppercase tracking-[.1em]">
          {page.categorySections.map((sec) => (
            <a
              key={sec.slug}
              href={`#${sec.slug}`}
              className={`border border-ink/20 px-3.5 py-2 text-body no-underline transition-colors ${ACCENT_CHIP_HOVER[accent]}`}
            >
              {sec.label.replace('—', '').trim()}
            </a>
          ))}
        </div>
      </div>

      {itemsError && <LoadError />}

      {/* category sections */}
      {page.categorySections.map((sec) => {
        const secItems = byCategory.get(sec.slug) ?? [];
        return (
          <div key={sec.slug} id={sec.slug} className="container-site scroll-mt-20 pt-12 md:pt-14">
            <div className="mb-6 border-t border-ink/15 pt-4">
              <div className={`font-mono text-[11px] tracking-[.14em] ${ACCENT_TEXT[accent]}`}>{sec.label}</div>
              <div className="mt-1.5 font-grotesk text-[clamp(22px,3vw,30px)] font-light tracking-[-.01em]">{sec.subtitle}</div>
            </div>
            {itemsError ? null : itemsLoading ? (
              <TileGridSkeleton count={4} tone={TONE_BG[tone]} />
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {secItems.map((piece, i) => (
                  <div key={piece.id}>
                    <AccentImage
                      media={piece.photo}
                      tone={tone}
                      accentClass={ACCENT_BG[accent]}
                      onClick={() => setLb({ cat: sec.slug, index: i })}
                      label={piece.title}
                    />
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="font-chakra text-[14px] font-semibold md:text-[16px]">{piece.title}</span>
                      <span className="font-mono text-[10px] text-muted">{piece.year}</span>
                    </div>
                  </div>
                ))}
                {secItems.length === 0 && (
                  <div className="col-span-2 py-6 font-mono text-[11px] text-muted md:col-span-4">{ui.piecesComingSoon}</div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <CtaSection data={page.cta} bgClass={ACCENT_BG[accent]} tintClass={ctaTintClass} email={email} />

      {lb && lbItems.length > 0 && (
        <Lightbox
          items={lbItems}
          index={lb.index}
          accentHoverClass={ACCENT_LIGHTBOX_HOVER[accent]}
          onClose={() => setLb(null)}
          onIndex={(i) => setLb({ ...lb, index: i })}
        />
      )}
    </div>
  );
}
