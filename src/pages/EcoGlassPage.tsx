import { useStrapi } from '../api/useStrapi';
import { queries } from '../api/client';
import type { EcoGlassWork } from '../api/types';
import { ECO_GLASS } from '../content/ecoGlass';
import { SITE } from '../content/site';
import { useCopy } from '../i18n';
import CuratedPageLayout from '../components/CuratedPageLayout';

export default function EcoGlassPage() {
  const page = useCopy(ECO_GLASS);
  const { data, loading, error } = useStrapi<EcoGlassWork[]>(queries.ecoGlassWorks);

  return (
    <CuratedPageLayout
      page={page}
      works={data ?? []}
      worksLoading={loading}
      worksError={error}
      accent="teal"
      tone="ph"
      bandBgClass="bg-[#E2E6E4]"
      endCardTextClass="text-[#F1F6F4]"
      ctaTintClass="text-[#E3EFEC]"
      carouselClass="eg-carousel"
      email={SITE.email}
    />
  );
}
