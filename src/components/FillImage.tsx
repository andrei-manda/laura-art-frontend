import { useState } from 'react';

/**
 * A cover image filling its positioned parent. Renders nothing for a missing
 * src or a file that fails to load, so the parent's tint shows instead of a
 * broken-image icon — static page images may not be dropped in yet.
 */
export default function FillImage({ src, alt = '', className = '' }: { src?: string | null; alt?: string; className?: string }) {
  const [failed, setFailed] = useState<string | null>(null);
  if (!src || failed === src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(src)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
