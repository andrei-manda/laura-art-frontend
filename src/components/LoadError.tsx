import { UI } from '../content/ui';
import { useCopy } from '../i18n';

/** Shown in place of an entry grid when Strapi can't be reached; the page copy stays. */
export default function LoadError({ inline = false }: { inline?: boolean }) {
  const ui = useCopy(UI);
  const text = (
    <div role="alert" className="py-10 font-mono text-[11px] tracking-[.06em] text-muted">
      {ui.loadError}
    </div>
  );
  return inline ? text : <div className="container-site pt-10">{text}</div>;
}
