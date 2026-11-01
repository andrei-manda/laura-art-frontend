import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStrapi } from '../api/useStrapi';
import { queries, mediaUrl } from '../api/client';
import type { WorkshopSession, WorkshopCategory, WorkshopStatus } from '../api/types';
import { pickFeatured } from '../api/featured';
import { WORKSHOPS } from '../content/workshops';
import { useCopy } from '../i18n';
import { SITE } from '../content/site';
import CategoryHero from '../components/CategoryHero';
import SectionHeading from '../components/SectionHeading';
import FeaturedSplitCard from '../components/FeaturedSplitCard';
import FilterChips from '../components/FilterChips';
import ShowMore from '../components/ShowMore';
import CtaSection from '../components/CtaSection';
import LoadError from '../components/LoadError';
import FillImage from '../components/FillImage';
import { CardSkeletons } from '../components/Skeleton';
import { useShowMore } from '../hooks/useShowMore';

// The prototype's violet-grey placeholder, a one-off like Eco Glass's band tint.
const TINT = 'bg-[#EAE6F0]';

type Filter = WorkshopCategory | 'all';

const STATUS_CLASS: Record<WorkshopStatus, string> = {
  open: 'bg-purple text-paper',
  waitlist: 'bg-paper/90 text-ink',
  enquire: 'bg-ink text-paper',
};

export default function WorkshopsPage() {
  const { data: sessions, loading: sessionsLoading, error } = useStrapi<WorkshopSession[]>(queries.workshopSessions);
  const page = useCopy(WORKSHOPS);
  const [cat, setCat] = useState<Filter>('all');

  const all = sessions ?? [];
  const filtered = cat === 'all' ? all : all.filter((s) => s.category === cat);
  const { shown, hasMore, remaining, showMore, reset } = useShowMore(filtered, 6, 3);

  useEffect(() => { reset(); }, [cat, reset]);

  const featured = pickFeatured(all, (s) => s.status === 'open');
  const next = all.find((s) => s.status === 'open')?.dateText;
  const heroSpecs = [
    { label: page.nextLabel, value: next ? next.toUpperCase() : sessionsLoading ? '…' : page.nextFallback },
    ...page.heroSpecs,
  ];

  return (
    <div className="rise-in">
      <CategoryHero
        accent="purple"
        accentLabel={page.heroAccentLabel}
        title={page.heroTitle}
        paragraph={page.heroParagraph}
        specs={heroSpecs}
      />

      {featured && (
        <div className="container-site pt-14">
          <SectionHeading label={page.featuredLabel} className="mb-6" />
          <FeaturedSplitCard media={featured.image} accent="purple" badge={featured.dateText?.toUpperCase()} bgClass={TINT}>
            <div className="font-mono text-[11px] tracking-[.06em] text-purple">
              ■ {featured.dateText} · {featured.timeText}
            </div>
            <div className="mt-2 font-mono text-[12px] text-[#6A6C66]">{featured.kind}</div>
            <h2 className="mt-3.5 font-grotesk text-[clamp(28px,4.5vw,40px)] font-normal leading-[1.06] tracking-[-.02em]">
              {featured.title}
            </h2>
            {featured.description && (
              <p className="mt-4 text-[15px] leading-[1.75] text-body">{featured.description}</p>
            )}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ink/10 pt-4 font-mono text-[10px] text-muted sm:gap-4 sm:text-[11px]">
              <div><div>{page.specLabels.duration}</div><div className="mt-1 text-ink">{featured.duration}</div></div>
              <div><div>{page.specLabels.level}</div><div className="mt-1 text-ink">{featured.level}</div></div>
              <div><div>{page.specLabels.spots}</div><div className="mt-1 text-purple">{featured.spotsText}</div></div>
            </div>
            <Link
              to="/contact"
              className="mt-7 self-start border-b-2 border-purple pb-1 font-chakra text-[12px] font-semibold uppercase tracking-[.16em] text-ink no-underline"
            >
              {page.featuredLinkText} →
            </Link>
          </FeaturedSplitCard>
        </div>
      )}

      {/* session calendar */}
      <div className="container-site pt-16">
        <SectionHeading
          label={page.calendarLabel}
          note={`${String(filtered.length).padStart(2, '0')} ${page.sessionsUnit}`}
          accent="purple"
          className="mb-7"
        />
        <FilterChips items={page.filters} active={cat} accent="purple" onSelect={setCat} className="mb-7" />

        {error && <LoadError inline />}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessionsLoading && <CardSkeletons count={3} />}
          {!sessionsLoading && shown.map((s) => {
            const src = mediaUrl(s.image);
            return (
              <div key={s.documentId} className="flex flex-col border border-ink/15 bg-white">
                <div className={`relative aspect-[16/10] ${TINT}`}>
                  <FillImage src={src} alt={s.image?.alternativeText ?? ''} />
                  <span className="absolute left-0 top-0 h-[3px] w-11 bg-purple" />
                  {s.kind && (
                    <span className="absolute left-3.5 top-3.5 bg-paper/90 px-2.5 py-1 font-mono text-[9px] tracking-[.12em] text-ink">
                      {s.kind}
                    </span>
                  )}
                  <span
                    className={`absolute right-3.5 top-3.5 px-2.5 py-1 font-mono text-[9px] tracking-[.12em] ${STATUS_CLASS[s.status]}`}
                  >
                    {page.statusLabel[s.status]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                  <div className="font-mono text-[11px] text-purple">{s.dateText}</div>
                  <div className="mt-1 font-mono text-[11px] text-muted">{s.timeText} · {s.duration}</div>
                  <div className="mt-3 font-grotesk text-[22px] font-medium tracking-[-.01em]">{s.title}</div>
                  {s.description && (
                    <p className="mt-2.5 text-[13.5px] leading-[1.65] text-[#5A5C56]">{s.description}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-3.5 border-t border-ink/10 pt-3.5 font-mono text-[10px] tracking-[.06em] text-muted">
                    <span>{page.specLabels.level} · <span className="text-ink">{s.level}</span></span>
                    <span>{page.specLabels.max} · <span className="text-ink">{s.maxPeople}</span></span>
                    <span>{s.spotsText}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-auto pt-4 font-chakra text-[11px] font-semibold uppercase tracking-[.14em] text-purple no-underline"
                  >
                    {page.cardLinkText} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {hasMore && <ShowMore remaining={remaining} accent="purple" onClick={showMore} />}
        {!sessionsLoading && !error && filtered.length === 0 && (
          <div className="py-14 text-center font-mono text-[12px] text-muted">
            {page.emptyStateText}{' '}
            <Link to="/contact" className="text-purple">{page.emptyStateLinkText}</Link>.
          </div>
        )}
      </div>

      {/* how a session runs */}
      <div className="container-site pt-20">
        <SectionHeading label={page.howLabel} className="mb-8" />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {page.howSteps.map((step) => (
            <div key={step.number}>
              <div className="font-mono text-[11px] text-purple">{step.number}</div>
              <div className="mt-2.5 font-chakra text-[17px] font-semibold tracking-[.03em]">{step.title}</div>
              <p className="mt-2 text-[13.5px] leading-[1.7] text-[#5A5C56]">{step.paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      {/* good to know */}
      <div className="container-site pt-16 md:pt-20">
        <div className="grid grid-cols-1 border border-ink/15 bg-white md:grid-cols-2">
          <div className="p-6 sm:p-8 md:p-11">
            <div className="mb-5 font-mono text-[11px] tracking-[.14em] text-purple">
              {page.goodToKnowLabel}
            </div>
            <div className="grid gap-4 text-[14px] leading-[1.7] text-body">
              {page.goodToKnowRows.map((row) => (
                <div key={row.label} className="grid grid-cols-1 gap-2 sm:grid-cols-[130px_1fr] sm:gap-4">
                  <span className="pt-0.5 font-mono text-[11px] text-muted">{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative min-h-[280px] md:min-h-[380px] ${TINT}`}>
            <FillImage src={page.goodToKnowImage} />
          </div>
        </div>
      </div>

      {/* private / groups / gift */}
      <div className="container-site pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {page.offerCards.map((card) => (
            <div key={card.label} className="border border-purple/30 bg-purple/5 p-6 sm:p-7">
              <div className="font-mono text-[10px] tracking-[.12em] text-purple">{card.label}</div>
              <div className="mt-3 font-grotesk text-[22px] font-medium">{card.title}</div>
              <p className="mt-2.5 text-[13.5px] leading-[1.7] text-[#5A5C56]">{card.paragraph}</p>
            </div>
          ))}
        </div>
      </div>

      <CtaSection data={page.cta} bgClass="bg-purple" tintClass="text-[#DCD0F0]" email={SITE.email} />
    </div>
  );
}
