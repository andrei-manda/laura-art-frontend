import type { ReactNode } from 'react';
import type { SpecRow } from '../content/types';
import type { AccentKey } from '../theme/accents';
import { ACCENT_BG, ACCENT_TEXT } from '../theme/accents';
import SpecRows from './SpecRows';

interface Props {
  accentLabel?: string;
  title: string;
  paragraph?: string;
  specs: SpecRow[];
  accent: AccentKey;
  /** Mono date · venue line between the title and the paragraph. */
  metaLine?: string;
  /** Rendered above the hero grid — the exhibition detail page's back link. */
  children?: ReactNode;
}

export default function CategoryHero({
  accentLabel, title, paragraph, specs, accent, metaLine, children,
}: Props) {
  return (
    <div className="container-site pt-8">
      {children}
      <div className="grid grid-cols-1 items-end gap-8 md:mt-8 md:grid-cols-[1.5fr_1fr] md:gap-12">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className={`h-[5px] w-12 ${ACCENT_BG[accent]}`} />
            <span className={`font-mono text-[11px] tracking-[.12em] ${ACCENT_TEXT[accent]}`}>{accentLabel}</span>
          </div>
          <h1 className="hyphens-auto break-words font-grotesk text-[clamp(34px,8vw,82px)] font-normal leading-[0.98] tracking-[-.02em]">{title}</h1>
          {metaLine && <div className="mt-4 font-mono text-[12px] text-[#6A6C66]">{metaLine}</div>}
          <p className="mt-6 max-w-[520px] text-[17px] leading-[1.7] text-body">{paragraph}</p>
        </div>
        <SpecRows rows={specs} />
      </div>
    </div>
  );
}
