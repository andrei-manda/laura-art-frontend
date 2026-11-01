import type { AccentKey } from '../theme/accents';
import { ACCENT_TEXT } from '../theme/accents';

interface Props {
  label: string;
  note?: string;
  /** Omitted renders the label muted; supplied renders it in the accent colour. */
  accent?: AccentKey;
  className?: string;
}

export default function SectionHeading({ label, note, accent, className = '' }: Props) {
  return (
    <div className={`flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4 ${className}`}>
      <div className={`font-mono text-[11px] tracking-[.14em] ${accent ? ACCENT_TEXT[accent] : 'text-muted'}`}>
        {label}
      </div>
      {note && <div className="font-chakra text-[13px] tracking-[.1em] text-body">{note}</div>}
    </div>
  );
}
