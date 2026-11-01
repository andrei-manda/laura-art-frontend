import type { AccentKey } from '../theme/accents';
import { ACCENT_BG, ACCENT_BORDER } from '../theme/accents';

interface Props<T extends string> {
  items: { id: T; label: string }[];
  active: T;
  accent: AccentKey;
  onSelect: (id: T) => void;
  className?: string;
}

export default function FilterChips<T extends string>({
  items, active, accent, onSelect, className = '',
}: Props<T>) {
  return (
    <div className={`flex flex-wrap gap-2.5 font-chakra text-[11px] font-medium uppercase tracking-[.14em] ${className}`}>
      {items.map((item) => {
        const on = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={on}
            onClick={() => onSelect(item.id)}
            className={`cursor-pointer border px-4 py-2.5 ${
              on ? `${ACCENT_BG[accent]} ${ACCENT_BORDER[accent]} text-paper` : 'border-ink/20 bg-transparent text-body'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
