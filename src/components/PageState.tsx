import PageSkeleton from './Skeleton';
import { UI } from '../content/ui';
import { useCopy } from '../i18n';

interface Props {
  error: string | null;
  /** The page's placeholder tone, e.g. 'bg-ph-warm'. */
  toneClass: string;
  /** Which layout the skeleton should imitate. */
  variant?: 'tiles' | 'cards' | 'carousel';
}

export default function PageState({ error, toneClass, variant = 'tiles' }: Props) {
  const ui = useCopy(UI);
  if (error) {
    return (
      <div className="container-site py-16 font-mono text-muted">{ui.couldNotLoad} {error}</div>
    );
  }
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">{ui.loading}</span>
      <PageSkeleton tone={toneClass} variant={variant} />
    </div>
  );
}
