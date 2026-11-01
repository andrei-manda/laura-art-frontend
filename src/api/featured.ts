/**
 * The entry for a page's featured card. Lists arrive sorted by sortOrder, so
 * "first" honours Laura's ordering: the first entry ticked `featured`, else the
 * first passing `fallback`, else simply the first entry.
 */
export function pickFeatured<T extends { featured?: boolean | null }>(
  items: T[],
  fallback?: (item: T) => boolean,
): T | null {
  return (
    items.find((i) => i.featured) ??
    (fallback && items.find(fallback)) ??
    items[0] ??
    null
  );
}
