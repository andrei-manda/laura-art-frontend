import { useStrapi } from '../api/useStrapi';
import { queries } from '../api/client';
import type { DecorWork } from '../api/types';
import { DECOR } from '../content/decor';
import { SITE } from '../content/site';
import { useCopy } from '../i18n';
import CuratedPageLayout from '../components/CuratedPageLayout';

export default function DecorPage() {
  const page = useCopy(DECOR);
  const { data, loading, error } = useStrapi<DecorWork[]>(queries.decorWorks);

  return (
    <CuratedPageLayout
      page={page}
      works={data ?? []}
      worksLoading={loading}
      worksError={error}
      accent="green"
      tone="ph"
      bandBgClass="bg-[#E3E8E1]"
      endCardTextClass="text-[#F0F6F0]"
      ctaTintClass="text-[#E4F0E4]"
      carouselClass="dc-carousel"
      email={SITE.email}
    />
  );
}
