import { Link } from 'react-router-dom';
import { useStrapi } from '../api/useStrapi';
import { queries, mediaUrl } from '../api/client';
import type { Exhibition } from '../api/types';
import { pickFeatured } from '../api/featured';
import { EXHIBITIONS } from '../content/exhibitions';
import { useCopy } from '../i18n';
import { SITE } from '../content/site';
import CategoryHero from '../components/CategoryHero';
import SectionHeading from '../components/SectionHeading';
import FeaturedSplitCard from '../components/FeaturedSplitCard';
import ShowMore from '../components/ShowMore';
import CtaSection from '../components/CtaSection';
import LoadError from '../components/LoadError';
import FillImage from '../components/FillImage';
import { CardSkeletons } from '../components/Skeleton';
import { useShowMore } from '../hooks/useShowMore';

const pad = (n: number) => String(n).padStart(2, '0');

/** "2026" or "2018 — 2025", from the entries' own years. */
function yearRange(list: Exhibition[]): string | undefined {
  const years = list.map((e) => Number.parseInt(e.year ?? '', 10)).filter((y) => !Number.isNaN(y));
  if (years.length === 0) return undefined;
  const lo = Math.min(...years);
  const hi = Math.max(...years);
  return lo === hi ? String(lo) : `${lo} — ${hi}`;
}

function ExhibitionCard({ ex, past }: { ex: Exhibition; past: boolean }) {
  const page = useCopy(EXHIBITIONS);
  const src = mediaUrl(ex.banner);
  return (
    <div className="flex flex-col border border-ink/15 bg-white">
      <div className="relative aspect-[16/10] bg-ph-cool">
        <Link to={`/exhibitions/${ex.slug}`} className="absolute inset-0 block" aria-label={ex.title}>
          <FillImage src={src} alt={ex.banner?.alternativeText ?? ''} className={past ? 'saturate-[.85]' : ''} />
        </Link>
        <span className={`absolute left-0 top-0 h-[3px] w-11 ${past ? 'bg-muted' : 'bg-cobalt'}`} />
        <span
          className={`absolute left-3.5 top-3.5 px-2.5 py-1 font-mono text-[9px] tracking-[.12em] ${
            past ? 'bg-paper/90 text-ink' : 'bg-cobalt text-paper'
          }`}
        >
          {past ? page.cardBadgePast : page.cardBadgeUpcoming}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <div className={`font-mono text-[11px] ${past ? 'text-[#6A6C66]' : 'text-cobalt'}`}>{ex.dateText}</div>
        <div className="mt-1 font-mono text-[11px] text-muted">{ex.location}</div>
        <div className="mt-3 font-grotesk text-[22px] font-medium tracking-[-.01em]">{ex.title}</div>
        {ex.description && <p className="mt-2.5 text-[13.5px] leading-[1.65] text-[#5A5C56]">{ex.description}</p>}
        <Link
          to={`/exhibitions/${ex.slug}`}
          className={`mt-auto pt-4 font-chakra text-[11px] font-semibold uppercase tracking-[.14em] no-underline ${
            past ? 'text-body' : 'text-cobalt'
          }`}
        >
          {past ? page.cardLinkPast : page.cardLinkUpcoming} →
        </Link>
      </div>
    </div>
  );
}

export default function ExhibitionsPage() {
  const { data: exhibitions, loading: exhibitionsLoading, error } = useStrapi<Exhibition[]>(queries.exhibitions);
  const page = useCopy(EXHIBITIONS);

  const all = exhibitions ?? [];
  const upcoming = all.filter((e) => e.status === 'upcoming');
  const past = all.filter((e) => e.status === 'past');
  const up = useShowMore(upcoming, 3, 3);
  const arch = useShowMore(past, 3, 3);

  const featured = pickFeatured(all, (e) => e.status === 'upcoming');
  const pending = exhibitionsLoading ? '…' : '—';
  const nextOpening = upcoming[0]?.dateText?.split('—')[0].trim().toUpperCase();
  const firstShow = yearRange(past)?.split(' — ')[0];
  const heroSpecs = [
    { label: page.specLabels.next, value: nextOpening ?? pending },
    { label: page.specLabels.upcoming, value: exhibitionsLoading ? '…' : `${pad(upcoming.length)} ${page.showsUnit}` },
    { label: page.specLabels.archive, value: firstShow ? `${page.since} ${firstShow}` : pending },
    { label: page.specLabels.enquiries, value: page.byEmail },
  ];

  return (
    <div className="rise-in">
      <CategoryHero
        accent="cobalt"
        accentLabel={page.heroAccentLabel}
        title={page.heroTitle}
        paragraph={page.heroParagraph}
        specs={heroSpecs}
      />

      {featured && (
        <div className="container-site pt-14">
          <SectionHeading label={page.featuredLabel} className="mb-6" />
          <FeaturedSplitCard
            media={featured.banner}
            accent="cobalt"
            badge={featured.status === 'upcoming' ? page.featuredBadgeUpcoming : page.featuredBadgePast}
            href={`/exhibitions/${featured.slug}`}
            bgClass="bg-ph-cool"
          >
            <div className="font-mono text-[11px] tracking-[.06em] text-cobalt">■ {featured.dateText}</div>
            <div className="mt-2 font-mono text-[12px] text-[#6A6C66]">{featured.location}</div>
            <h2 className="mt-3.5 font-grotesk text-[clamp(28px,4.5vw,40px)] font-normal leading-[1.06] tracking-[-.02em]">
              {featured.title}
            </h2>
            {featured.description && (
              <p className="mt-4 text-[15px] leading-[1.75] text-body">{featured.description}</p>
            )}
            <Link
              to={`/exhibitions/${featured.slug}`}
              className="mt-6 self-start border-b-2 border-cobalt pb-1 font-chakra text-[12px] font-semibold uppercase tracking-[.16em] text-ink no-underline"
            >
              {page.featuredLinkText} →
            </Link>
          </FeaturedSplitCard>
        </div>
      )}

      <div className="container-site pt-16">
        <SectionHeading
          label={page.upcomingLabel}
          note={yearRange(upcoming)}
          accent="cobalt"
          className="mb-7"
        />
        {error && <LoadError inline />}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exhibitionsLoading
            ? <CardSkeletons count={3} tone="bg-ph-cool" />
            : up.shown.map((ex) => <ExhibitionCard key={ex.documentId} ex={ex} past={false} />)}
        </div>
        {!exhibitionsLoading && !error && up.shown.length === 0 && (
          <div className="py-10 text-center font-mono text-[12px] text-muted">{page.upcomingEmpty}</div>
        )}
        {up.hasMore && <ShowMore remaining={up.remaining} accent="cobalt" onClick={up.showMore} />}
      </div>

      <div className="container-site pt-16">
        <SectionHeading label={page.archiveLabel} note={yearRange(past)} className="mb-7" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exhibitionsLoading
            ? <CardSkeletons count={3} tone="bg-ph-cool" />
            : arch.shown.map((ex) => <ExhibitionCard key={ex.documentId} ex={ex} past />)}
        </div>
        {arch.hasMore && <ShowMore remaining={arch.remaining} accent="ink" onClick={arch.showMore} />}
      </div>

      <CtaSection data={page.cta} bgClass="bg-cobalt" tintClass="text-[#CBD8F4]" email={SITE.email} />
    </div>
  );
}
