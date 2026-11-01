import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { postData, SubmitError } from '../api/client';
import { CONTACT, MESSAGE_MAX } from '../content/contact';
import { SITE, SITE_COPY } from '../content/site';
import { useCopy } from '../i18n';
import CategoryHero from '../components/CategoryHero';
import FillImage from '../components/FillImage';
import { ACCENT_BG } from '../theme/accents';

// Mirrors the server's rule so the common case never round-trips. The server
// stays the authority.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 16px is deliberate: anything smaller makes iOS Safari zoom the page in when
// the field takes focus.
const FIELD_BASE =
  'peer w-full border-0 border-b bg-transparent pb-2.5 pt-1 text-[16px] text-ink outline-none transition-colors placeholder:text-ink/25 focus:outline-none';

/** A labelled field with an accent underline that draws in on focus. */
function Field({
  id, label, error, hint, children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-mono text-[10px] tracking-[.14em] text-muted">
          {label}
        </label>
        {hint}
      </div>
      <div className="relative">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-purple transition-transform duration-300 peer-focus:scale-x-100"
        />
      </div>
      {error && (
        <div id={`${id}-error`} role="alert" className="mt-2 font-mono text-[10px] leading-[1.5] text-[#B4443E]">
          {error}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const page = useCopy(CONTACT);
  const site = useCopy(SITE_COPY);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');

  /** Clears a field's error as soon as the visitor starts correcting it. */
  function clearError(field: string) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length > 120) {
      next.name = page.errors.name;
    }
    if (!EMAIL_RE.test(email.trim()) || email.trim().length > 200) {
      next.email = page.errors.email;
    }
    if (!message.trim() || message.trim().length > MESSAGE_MAX) {
      next.message = page.errors.message;
    }
    return next;
  }

  async function submit() {
    const next = validate();
    setErrors(next);
    setFormError('');
    if (Object.keys(next).length > 0) return;

    setStatus('sending');
    try {
      await postData('contact-submissions', {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        company,
      });
      setStatus('sent');
    } catch (e) {
      setStatus('idle');
      if (e instanceof SubmitError && e.status === 429) {
        setFormError(page.errors.tooMany);
      } else if (e instanceof SubmitError && Object.keys(e.fieldErrors).length > 0) {
        setErrors(e.fieldErrors);
      } else {
        setFormError(page.errors.generic);
      }
    }
  }

  function reset() {
    setStatus('idle');
    setName(''); setEmail(''); setMessage(''); setCompany('');
    setErrors({}); setFormError('');
  }

  const fieldClass = (field: string) =>
    `${FIELD_BASE} ${errors[field] ? 'border-[#B4443E]' : 'border-ink/20 focus:border-ink/45'}`;

  return (
    <div className="rise-in">
      <CategoryHero
        accent="ink"
        accentLabel={page.heroAccentLabel}
        title={page.heroTitle}
        paragraph={page.heroParagraph}
        specs={page.heroSpecs}
      />

      <div className="container-site pt-14">
        <div className="grid grid-cols-1 border border-ink/15 bg-white md:grid-cols-[1.35fr_1fr]">
          {/* form */}
          <div className="border-b border-ink/10 p-6 sm:p-8 md:border-b-0 md:border-r md:p-11">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-[3px] w-8 bg-purple" />
              <span className="font-mono text-[11px] tracking-[.14em] text-muted">
                {page.formLabel}
              </span>
            </div>

            {status === 'sent' ? (
              <div className="rise-in border border-purple/35 bg-purple/5 p-6 sm:p-8">
                <div className="font-mono text-[11px] tracking-[.12em] text-purple">{page.successLabel}</div>
                <div className="mt-3 font-grotesk text-[clamp(22px,5vw,26px)] font-normal tracking-[-.01em]">
                  {page.successHeadline}
                </div>
                <p className="mt-3 text-[14px] leading-[1.7] text-body">{page.successParagraph}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 cursor-pointer border-0 border-b-2 border-purple bg-transparent pb-1 font-chakra text-[11px] font-semibold uppercase tracking-[.14em] text-purple"
                >
                  {page.successResetText} →
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={(e) => { e.preventDefault(); void submit(); }}
                className="grid gap-7"
              >
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <Field id="contact-name" label={page.fields.name.label} error={errors.name}>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); clearError('name'); }}
                      placeholder={page.fields.name.placeholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={fieldClass('name')}
                    />
                  </Field>
                  <Field id="contact-email" label={page.fields.email.label} error={errors.email}>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                      placeholder={page.fields.email.placeholder}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={fieldClass('email')}
                    />
                  </Field>
                </div>

                <Field
                  id="contact-message"
                  label={page.fields.message.label}
                  error={errors.message}
                  hint={
                    <span
                      className={`font-mono text-[10px] tabular-nums ${
                        message.length > MESSAGE_MAX ? 'text-[#B4443E]' : 'text-muted/70'
                      }`}
                    >
                      {message.length}/{MESSAGE_MAX}
                    </span>
                  }
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); clearError('message'); }}
                    placeholder={page.fields.message.placeholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`${fieldClass('message')} resize-y leading-[1.7]`}
                  />
                </Field>

                {/* Honeypot: positioned off-screen rather than display:none, which
                    some bots skip. Real people never focus or fill it. */}
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                {formError && (
                  <div
                    role="alert"
                    className="border-l-2 border-[#B4443E] bg-[#B4443E]/5 px-3.5 py-3 font-mono text-[11px] leading-[1.6] text-[#B4443E]"
                  >
                    {formError}
                  </div>
                )}

                <div className="flex flex-col items-stretch gap-5 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-[280px] font-mono text-[10px] leading-[1.7] tracking-[.04em] text-muted">
                    {page.privacyNote}
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex cursor-pointer items-center justify-center gap-3 border-0 bg-ink px-7 py-4 font-chakra text-[12px] font-semibold uppercase tracking-[.16em] text-paper transition-colors hover:bg-purple disabled:cursor-default disabled:opacity-60 disabled:hover:bg-ink"
                  >
                    {status === 'sending' ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper/35 border-t-paper"
                        />
                        {page.sendingText}
                      </>
                    ) : (
                      <>
                        {page.sendButtonText}
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* studio details */}
          <div className="flex flex-col gap-8 p-6 sm:p-8 md:p-10">
            <div>
              <div className="mb-4 font-mono text-[11px] tracking-[.14em] text-muted">{page.studioLabel}</div>
              <address className="font-grotesk text-[clamp(18px,4.5vw,20px)] font-normal not-italic leading-[1.5]">
                {site.address.map((line) => <div key={line}>{line}</div>)}
              </address>
              {SITE.mapsUrl && (
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block border-b-2 border-purple pb-1 font-chakra text-[11px] font-semibold uppercase tracking-[.14em] text-ink no-underline"
                >
                  {page.mapsLinkText} →
                </a>
              )}
            </div>

            <div className="border-t border-ink/10 pt-6">
              <div className="mb-4 font-mono text-[11px] tracking-[.14em] text-muted">{page.hoursLabel}</div>
              <div className="grid gap-2 font-mono text-[12px] text-body">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <span className="text-muted">{h.day}</span>
                    <span className={`text-right ${h.isOpen ? 'text-ink' : 'text-muted'}`}>{h.time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-[1.7] text-[#5A5C56]">{site.hoursNote}</p>
            </div>

            <div className="border-t border-ink/10 pt-6">
              <div className="mb-4 font-mono text-[11px] tracking-[.14em] text-muted">{page.directLabel}</div>
              <div className="grid gap-2.5 text-[14px]">
                <a href={`mailto:${SITE.email}`} className="break-all text-ink no-underline">{SITE.email}</a>
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-ink no-underline">{SITE.phone}</a>
                {SITE.instagramUrl && (
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink no-underline"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* three routes */}
      <div className="container-site pt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {page.routeCards.map((card) => (
            <div key={card.label} className="border border-ink/15 bg-white p-6 sm:p-7">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[.12em] text-muted">
                <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_BG[card.colorKey]}`} />
                {card.label}
              </div>
              <div className="mt-3 font-grotesk text-[21px] font-medium">{card.title}</div>
              <p className="mt-2.5 text-[13.5px] leading-[1.7] text-[#5A5C56]">
                {card.paragraph}
                {card.linkPath && card.linkText && (
                  <>
                    {' '}
                    <Link to={card.linkPath} className="whitespace-nowrap text-purple no-underline">{card.linkText} →</Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* visiting */}
      <div className="container-site pb-4 pt-16">
        <div className="grid grid-cols-1 border border-ink/15 bg-white md:grid-cols-2">
          <div className="p-6 sm:p-8 md:p-11">
            <div className="mb-4 font-mono text-[11px] tracking-[.14em] text-muted">{page.visitLabel}</div>
            <h2 className="font-grotesk text-[clamp(24px,4vw,34px)] font-normal leading-[1.1] tracking-[-.02em]">
              {page.visitHeadline}
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.75] text-body">{page.visitParagraph}</p>
            <div className="mt-6 grid gap-3 font-mono text-[11px] text-muted">
              {page.visitFacts.map((f) => (
                <div key={f.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[110px_1fr] sm:gap-3.5">
                  <span>{f.label}</span>
                  <span className="text-ink">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[260px] bg-[#EDEEE9] md:min-h-[340px]">
            <FillImage src={page.visitImage} />
            <span className="absolute left-0 top-0 h-1 w-[60px] bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
