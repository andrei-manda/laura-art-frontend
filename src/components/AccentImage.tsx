import type { Media } from '../api/types';
import { mediaUrl } from '../api/client';
import type { Tone } from '../theme/accents';
import { TONE_BG } from '../theme/accents';
import FillImage from './FillImage';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

interface Props {
  media?: Media | null;
  /** A static image path; takes precedence over media. */
  src?: string;
  /** Alt text for a static image (media carries its own). */
  alt?: string;
  /** Extra classes on the <img>, e.g. object-position. */
  imgClassName?: string;
  accentClass?: string;
  aspectClass?: string;
  tone?: Tone;
  annotation?: string;
  className?: string;
  onClick?: () => void;
  label?: string;
}

export default function AccentImage({
  media, src, alt, imgClassName, accentClass = 'bg-gold', aspectClass = 'aspect-[4/5]', tone = 'ph',
  annotation, className = '', onClick, label,
}: Props) {
  const ui = useCopy(UI);
  const resolved = src ?? mediaUrl(media);
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter') onClick();
              else if (e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={onClick ? (label ?? media?.alternativeText ?? ui.viewImage) : undefined}
      className={`relative overflow-hidden ${TONE_BG[tone]} ${aspectClass} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <FillImage src={resolved} alt={alt ?? media?.alternativeText ?? ''} className={imgClassName} />
      <span className={`absolute left-0 top-0 h-[3px] w-9 ${accentClass}`} />
      {annotation && (
        <span className="absolute right-2.5 top-2.5 font-mono text-[10px] text-muted">{annotation}</span>
      )}
    </div>
  );
}
