import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Media } from '../api/types';
import type { AccentKey } from '../theme/accents';
import { ACCENT_BG } from '../theme/accents';
import { mediaUrl } from '../api/client';

interface Props {
  media?: Media | null;
  accent: AccentKey;
  badge?: string;
  /** When set, the image side becomes a router link. */
  href?: string;
  /** Placeholder tint behind the image, e.g. 'bg-ph-cool'. */
  bgClass: string;
  children: ReactNode;
}

export default function FeaturedSplitCard({ media, accent, badge, href, bgClass, children }: Props) {
  const src = mediaUrl(media);

  const overlay = (
    <>
      {src && (
        <img
          src={src}
          alt={media?.alternativeText ?? ''}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <span className={`absolute left-0 top-0 h-1 w-[60px] ${ACCENT_BG[accent]}`} />
      {badge && (
        <span
          className={`absolute left-4 top-4 px-3 py-1.5 font-mono text-[10px] tracking-[.1em] text-paper ${ACCENT_BG[accent]}`}
        >
          {badge}
        </span>
      )}
    </>
  );

  return (
    <div className="grid grid-cols-1 border border-ink/15 bg-white md:grid-cols-[1.3fr_1fr]">
      <div className={`relative aspect-[16/11] ${bgClass}`}>
        {href ? <Link to={href} className="absolute inset-0 block">{overlay}</Link> : overlay}
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-7 md:p-10">{children}</div>
    </div>
  );
}
