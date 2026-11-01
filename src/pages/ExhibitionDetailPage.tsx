import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStrapi } from '../api/useStrapi';
import { queries, mediaUrl } from '../api/client';
import type { Exhibition } from '../api/types';
import type { SpecRow } from '../content/types';
import { EXHIBITION_DETAIL } from '../content/exhibitions';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';
import CategoryHero from '../components/CategoryHero';
import SectionHeading from '../components/SectionHeading';
import ShowMore from '../components/ShowMore';
import Lightbox from '../components/Lightbox';
import PageState from '../components/PageState';
import { ACCENT_LIGHTBOX_HOVER } from '../theme/accents';
import { useShowMore } from '../hooks/useShowMore';

export default function ExhibitionDetailPage() {
  const { slug = '' } = useParams();
  const path = useMemo(() => queries.exhibitionBySlug(slug), [slug]);
  const { data: results, error } = useStrapi<Exhibition[]>(path);
  const copy = useCopy(EXHIBITION_DETAIL);
  const ui = useCopy(UI);
  const [lbIndex, setLbIndex] = useState(-1);

  const ex = results?.[0] ?? null;
  const photos = ex?.photos ?? [];
  const { shown, hasMore, remaining, showMore } = useShowMore(photos, 12, 8);

  if (error || !results) return <PageState error={error} toneClass="bg-ph-cool" variant="tiles" />;

  if (!ex) {
    return (
      <div className="container-site py-16 font-mono text-[12px] text-muted">
        {copy.notFound}{' '}
        <Link to="/exhibitions" className="text-cobalt">{copy.notFoundLinkText}</Link>.
      </div>
    );
  }

  const specs: SpecRow[] = [
    { label: copy.specLabels.venue, value: ex.venue ?? '' },
    { label: copy.specLabels.city, value: ex.city ?? '' },
    { label: copy.specLabels.photos, value: String(photos.length).padStart(2, '0') },
    { label: copy.specLabels.year, value: ex.year ?? '' },
  ].filter((r) => r.value);

  const lbItems = photos.map((p) => ({
    src: mediaUrl(p),
    title: ex.title,
    caption: copy.photoCaption,
  }));

  return (
    <div className="rise-in">
      <CategoryHero
        accent="cobalt"
        accentLabel={copy.accentLabel}
        title={ex.title}
        metaLine={[ex.dateText, ex.location].filter(Boolean).join(' · ')}
        paragraph={ex.detailIntro}
        specs={specs}
      >
        <Link to="/exhibitions" className="font-mono text-[11px] tracking-[.1em] text-cobalt no-underline">
          {copy.backLinkText}
        </Link>
      </CategoryHero>

      <div className="container-site pt-12">
        <SectionHeading
          label={`${copy.galleryLabel} — ${String(photos.length).padStart(2, '0')} ${copy.photosUnit}`}
          className="mb-7"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((photo, i) => {
            const src = mediaUrl(photo);
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLbIndex(i)}
                aria-label={ui.viewPhoto(i + 1)}
                className="relative aspect-[4/3] cursor-pointer overflow-hidden border-0 bg-ph-cool p-0"
              >
                {src && (
                  <img
                    src={src}
                    alt={photo.alternativeText ?? ''}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-[1.04]"
                  />
                )}
                <span className="absolute left-0 top-0 h-[3px] w-[34px] bg-cobalt" />
              </button>
            );
          })}
        </div>

        {photos.length === 0 && (
          <div className="py-14 text-center font-mono text-[12px] text-muted">{copy.photosEmpty}</div>
        )}

        {hasMore ? (
          <ShowMore
            remaining={remaining}
            accent="cobalt"
            onClick={showMore}
            label={copy.loadMoreText}
          />
        ) : (
          photos.length > 0 && (
            <div className="pt-10 text-center font-mono text-[11px] tracking-[.14em] text-muted">
              {copy.endOfGalleryText}
            </div>
          )
        )}
      </div>

      <div className="container-site pb-4 pt-16">
        <Link
          to="/exhibitions"
          className="border-b-2 border-cobalt pb-1 font-chakra text-[12px] font-semibold uppercase tracking-[.14em] text-ink no-underline"
        >
          {copy.footerBackText}
        </Link>
      </div>

      {lbIndex >= 0 && lbItems.length > 0 && (
        <Lightbox
          items={lbItems}
          index={lbIndex}
          accentHoverClass={ACCENT_LIGHTBOX_HOVER.cobalt}
          onClose={() => setLbIndex(-1)}
          onIndex={setLbIndex}
        />
      )}
    </div>
  );
}
