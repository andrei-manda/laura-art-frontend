/**
 * Loading placeholders shaped like the layout they stand in for, so the page
 * does not jump when the real content lands. `tone` is the page's own
 * placeholder colour (bg-ph / bg-ph-warm / bg-ph-cool).
 */

interface SkelProps {
  className?: string;
  tone?: string;
}

/** One shimmering block. */
export function Skel({ className = '', tone = 'bg-ph' }: SkelProps) {
  return <div aria-hidden="true" className={`shimmer ${tone} ${className}`} />;
}

/** Hero: accent rule, headline lines, paragraph, spec column. */
function HeroSkeleton({ tone = 'bg-ph' }: { tone?: string }) {
  return (
    <div className="container-site pt-8">
      <div className="grid grid-cols-1 items-end gap-8 md:mt-8 md:grid-cols-[1.5fr_1fr] md:gap-12">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Skel tone={tone} className="h-[5px] w-12" />
            <Skel tone={tone} className="h-3 w-32" />
          </div>
          <Skel tone={tone} className="h-[clamp(38px,7vw,68px)] w-[85%] max-w-[560px]" />
          <Skel tone={tone} className="mt-3 h-[clamp(38px,7vw,68px)] w-[55%] max-w-[360px]" />
          <div className="mt-7 grid gap-2.5">
            <Skel tone={tone} className="h-3.5 w-full max-w-[520px]" />
            <Skel tone={tone} className="h-3.5 w-[92%] max-w-[480px]" />
            <Skel tone={tone} className="h-3.5 w-[70%] max-w-[380px]" />
          </div>
        </div>
        <div className="grid gap-3 border-t border-ink/15 pt-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between gap-4">
              <Skel tone={tone} className="h-3 w-24" />
              <Skel tone={tone} className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Full-width band image under the hero. */
function BandSkeleton({ tone = 'bg-ph' }: { tone?: string }) {
  return (
    <Skel
      tone={tone}
      className="mt-10 aspect-[4/3] min-h-[240px] w-full md:mt-11 md:aspect-[24/9] md:min-h-[380px]"
    />
  );
}

interface TileGridProps {
  count?: number;
  tone?: string;
  aspectClass?: string;
  /** Tailwind grid-template classes for the wrapper. */
  gridClass?: string;
}

/** A grid of image tiles with a title/meta line under each. */
export function TileGridSkeleton({
  count = 8,
  tone = 'bg-ph',
  aspectClass = 'aspect-[4/5]',
  gridClass = 'grid-cols-2 gap-4 md:grid-cols-4 md:gap-6',
}: TileGridProps) {
  return (
    <div className={`grid ${gridClass}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <Skel tone={tone} className={aspectClass} />
          <div className="mt-3 flex items-baseline justify-between gap-3">
            <Skel tone={tone} className="h-3.5 w-2/3" />
            <Skel tone={tone} className="h-3 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Bordered content cards (sessions, exhibitions). Returns the cards only, so a
 * caller can drop them straight into the grid it already renders.
 */
export function CardSkeletons({ count = 3, tone = 'bg-ph' }: { count?: number; tone?: string }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col border border-ink/15 bg-white">
          <Skel tone={tone} className="aspect-[16/10]" />
          <div className="grid gap-2.5 px-5 pb-6 pt-5">
            <Skel tone={tone} className="h-3 w-24" />
            <Skel tone={tone} className="h-5 w-3/4" />
            <Skel tone={tone} className="h-3.5 w-full" />
            <Skel tone={tone} className="h-3.5 w-5/6" />
          </div>
        </div>
      ))}
    </>
  );
}

/** Horizontal carousel of works. */
export function CarouselSkeleton({ tone = 'bg-ph' }: { tone?: string }) {
  return (
    <div className="flex gap-6 overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-[260px] flex-none md:w-[320px]">
          <Skel tone={tone} className="aspect-[4/5]" />
          <div className="mt-3.5 flex items-baseline justify-between gap-3">
            <Skel tone={tone} className="h-4 w-2/3" />
            <Skel tone={tone} className="h-3 w-8" />
          </div>
          <Skel tone={tone} className="mt-2 h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

/** Hero + band + one section of tiles — the shape every content page shares. */
export default function PageSkeleton({
  tone = 'bg-ph',
  variant = 'tiles',
}: {
  tone?: string;
  variant?: 'tiles' | 'cards' | 'carousel';
}) {
  return (
    <div>
      <HeroSkeleton tone={tone} />
      <BandSkeleton tone={tone} />
      <div className="container-site pt-12 md:pt-14">
        <div className="mb-6 border-t border-ink/15 pt-4">
          <Skel tone={tone} className="h-3 w-40" />
          <Skel tone={tone} className="mt-2.5 h-6 w-64" />
        </div>
        {variant === 'cards' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardSkeletons tone={tone} />
          </div>
        )}
        {variant === 'carousel' && <CarouselSkeleton tone={tone} />}
        {variant === 'tiles' && <TileGridSkeleton tone={tone} />}
      </div>
    </div>
  );
}
