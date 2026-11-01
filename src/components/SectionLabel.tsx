import type { ReactNode } from 'react';

export default function SectionLabel({
  children, className = '',
}: { children: ReactNode; className?: string }) {
  return (
    <div className={`border-t border-ink/15 pt-4 font-mono text-[11px] tracking-[.14em] text-muted ${className}`}>
      {children}
    </div>
  );
}
