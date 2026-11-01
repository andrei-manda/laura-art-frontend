import { useCallback, useEffect, useRef } from 'react';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

interface LightboxItem { src: string | null; title: string; caption?: string }

interface Props {
  items: LightboxItem[];
  index: number;
  accentHoverClass: string; // e.g. 'hover:bg-gold hover:border-gold'
  onClose: () => void;
  onIndex: (i: number) => void;
}

export default function Lightbox({ items, index, accentHoverClass, onClose, onIndex }: Props) {
  const ui = useCopy(UI);
  const step = useCallback(
    (d: number) => onIndex((index + d + items.length) % items.length),
    [index, items.length, onIndex],
  );
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, step]);

  // Stop the page behind the overlay from scrolling under the visitor's finger.
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  const item = items[index];
  if (!item) return null;

  const btn = `flex items-center justify-center border border-white/25 bg-transparent text-[#F4EFE2] cursor-pointer ${accentHoverClass}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(18,19,22,.94)] px-4 py-16 backdrop-blur md:p-12"
    >
      <div className="absolute left-5 top-5 font-mono text-[11px] tracking-[.1em] text-[#A39A86] md:left-8 md:top-6 md:text-[12px]">
        {index + 1} / {items.length}
      </div>
      <button aria-label={ui.close} onClick={(e) => { e.stopPropagation(); onClose(); }} className={`${btn} absolute right-4 top-4 h-11 w-11 text-xl md:right-7 md:top-5 md:h-[42px] md:w-[42px]`}>×</button>
      {items.length > 1 && (
        <>
          <button aria-label={ui.previous} onClick={(e) => { e.stopPropagation(); step(-1); }} className={`${btn} absolute bottom-4 left-4 h-11 w-11 text-xl md:bottom-auto md:left-7 md:top-1/2 md:h-[54px] md:w-[54px] md:-translate-y-1/2`}>←</button>
          <button aria-label={ui.next} onClick={(e) => { e.stopPropagation(); step(1); }} className={`${btn} absolute bottom-4 right-4 h-11 w-11 text-xl md:bottom-auto md:right-7 md:top-1/2 md:h-[54px] md:w-[54px] md:-translate-y-1/2`}>→</button>
        </>
      )}
      <div onClick={(e) => e.stopPropagation()} className="flex max-w-full flex-col items-center gap-5">
        {item.src ? (
          <img src={item.src} alt={item.title} className="max-h-[62vh] max-w-full object-contain shadow-[0_24px_70px_rgba(0,0,0,.55)] md:max-h-[72vh] md:max-w-[82vw]" />
        ) : (
          <div className="h-[50vh] w-[70vw] max-w-[560px] bg-ph-warm" />
        )}
        <div className="px-2 text-center">
          <div className="font-chakra text-[17px] font-semibold tracking-[.02em] text-paper md:text-[20px]">{item.title}</div>
          {item.caption && <div className="mt-1.5 font-mono text-[11px] text-[#A39A86]">{item.caption}</div>}
        </div>
      </div>
    </div>
  );
}
