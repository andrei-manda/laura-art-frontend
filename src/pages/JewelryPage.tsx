import { useStrapi } from '../api/useStrapi';
import { queries } from '../api/client';
import type { JewelryPiece } from '../api/types';
import { JEWELRY } from '../content/jewelry';
import { SITE } from '../content/site';
import { useCopy } from '../i18n';
import CatalogPageLayout from '../components/CatalogPageLayout';

export default function JewelryPage() {
  const page = useCopy(JEWELRY);
  const { data, loading, error } = useStrapi<JewelryPiece[]>(queries.jewelryPieces);

  return (
    <CatalogPageLayout
      page={page}
      items={data ?? []}
      itemsLoading={loading}
      itemsError={error}
      accent="gold"
      tone="ph-warm"
      ctaTintClass="text-[#F6ECD4]"
      email={SITE.email}
    />
  );
}
