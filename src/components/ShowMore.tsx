import type { AccentKey } from '../theme/accents';
import { ACCENT_TEXT, ACCENT_BORDER_SOFT } from '../theme/accents';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

interface Props {
  remaining: number;
  accent: AccentKey;
  onClick: () => void;
  label?: string;
}

export default function ShowMore({ remaining, accent, onClick, label }: Props) {
  const ui = useCopy(UI);
  return (
    <div className="mt-8 text-center">
      <button
        type="button"
        onClick={onClick}
        className={`cursor-pointer border bg-transparent px-6 py-3 font-chakra text-[12px] font-semibold uppercase tracking-[.14em] ${ACCENT_TEXT[accent]} ${ACCENT_BORDER_SOFT[accent]}`}
      >
        {label ?? ui.showMore} — {ui.moreCount(remaining)} ↓
      </button>
    </div>
  );
}
