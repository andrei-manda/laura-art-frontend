import type { CtaBlock } from '../content/types';

interface Props { data: CtaBlock; bgClass: string; tintClass: string; email: string }

export default function CtaSection({ data, bgClass, tintClass, email }: Props) {
  return (
    <div className={`mt-20 ${bgClass} text-paper`}>
      <div className="container-site py-16 text-center md:py-20">
        {data.kicker && <div className="font-mono text-[11px] tracking-[.16em] opacity-85">{data.kicker}</div>}
        <h2 className="mt-4 font-grotesk text-[clamp(26px,6vw,50px)] leading-[1.08] tracking-[-.02em] font-normal">
          {data.headline}
        </h2>
        {data.paragraph && (
          <p className={`mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.7] ${tintClass}`}>{data.paragraph}</p>
        )}
        <a
          href={`mailto:${email}`}
          className="mt-8 inline-flex items-center gap-3 bg-paper px-7 py-4 font-chakra text-[13px] font-semibold uppercase tracking-[.14em] text-ink no-underline"
        >
          {data.buttonText} →
        </a>
      </div>
    </div>
  );
}
