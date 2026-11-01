import { useStrapi } from '../api/useStrapi';
import { queries } from '../api/client';
import type { DiademePiece } from '../api/types';
import { DIADEME } from '../content/diademe';
import { SITE } from '../content/site';
import { useCopy } from '../i18n';
import CatalogPageLayout from '../components/CatalogPageLayout';

export default function DiademePage() {
  const page = useCopy(DIADEME);
  const { data, loading, error } = useStrapi<DiademePiece[]>(queries.diademePieces);

  return (
    <CatalogPageLayout
      page={page}
      items={data ?? []}
      itemsLoading={loading}
      itemsError={error}
      accent="rose"
      tone="ph-warm"
      ctaTintClass="text-[#F7E7EA]"
      email={SITE.email}
    />
  );
}
