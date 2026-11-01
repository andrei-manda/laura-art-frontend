import { useCallback, useState } from 'react';

/** Paging state for the "Show more — N more ↓" lists. */
export function useShowMore<T>(list: T[], initial: number, step: number) {
  const [n, setN] = useState(initial);
  const reset = useCallback(() => setN(initial), [initial]);
  const showMore = useCallback(() => setN((v) => v + step), [step]);

  return {
    shown: list.slice(0, n),
    hasMore: list.length > n,
    remaining: Math.max(0, list.length - n),
    showMore,
    reset,
  };
}
