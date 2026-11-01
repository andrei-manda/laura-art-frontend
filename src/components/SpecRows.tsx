import type { SpecRow } from '../content/types';

export default function SpecRows({ rows, className = '' }: { rows: SpecRow[]; className?: string }) {
  return (
    <div className={`border-t border-ink/15 pt-4 font-mono text-[11px] leading-8 tracking-[.04em] text-muted ${className}`}>
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between gap-4">
          <span>{r.label}</span>
          <span className="text-ink text-right">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
