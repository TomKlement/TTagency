import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { PageMeta } from '../../shared/seo/PageMeta'
import { FaqSection } from '../../shared/geo/FaqSection'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'validation'

export function ContactPage() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [gotcha, setGotcha] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, _gotcha: gotcha }),
      })

      if (res.ok) {
        setName('')
        setEmail('')
        setMessage('')
        setGotcha('')
        setStatus('success')
        return
      }

      if (res.status === 400) {
        setStatus('validation')
        return
      }

      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const statusMessage =
    status === 'success'
      ? t('contact.form.success')
      : status === 'validation'
        ? t('contact.form.errorValidation')
        : status === 'error'
          ? t('contact.form.error')
          : null

  const isLoading = status === 'loading'

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <PageMeta pageKey="contact" />
      <GeoJsonLd pageKey="contact" faqKey="contact" />
      <section className="max-w-[1440px] mx-auto min-h-[760px] border-x border-[var(--color-border)] grid grid-cols-1 lg:grid-cols-12 px-10 md:px-20 py-28 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-7">
          <h1 className="font-serif font-black uppercase text-[clamp(58px,8vw,92px)] leading-display tracking-tight max-w-[760px]">
            {t('contact.h1')}
          </h1>
          <p className="mt-10 text-[var(--color-muted)] text-[18px] leading-relaxed max-w-[560px]">
            {t('contact.body')}
          </p>
        </div>

        <div className="lg:col-span-5">
          <form
            className="w-full max-w-[520px] ml-auto border border-[var(--color-border)] p-8 md:p-10"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="space-y-8">
              <div
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="contact-gotcha">Company</label>
                <input
                  id="contact-gotcha"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={gotcha}
                  onChange={(e) => setGotcha(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]"
                >
                  {t('contact.form.nameLabel')}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  maxLength={200}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading || status === 'success'}
                  className="mt-3 w-full bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] uppercase tracking-[0.18em] text-[11px] py-3 px-0 disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]"
                >
                  {t('contact.form.emailLabel')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || status === 'success'}
                  className="mt-3 w-full bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] uppercase tracking-[0.18em] text-[11px] py-3 px-0 disabled:opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]"
                >
                  {t('contact.form.messageLabel')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading || status === 'success'}
                  className="mt-3 w-full resize-none bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] uppercase tracking-[0.18em] text-[11px] py-3 px-0 disabled:opacity-50"
                />
              </div>
            </div>

            {statusMessage ? (
              <p
                role="status"
                aria-live="polite"
                className={`mt-8 text-[11px] uppercase tracking-[0.18em] leading-relaxed ${
                  status === 'success' ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)]'
                }`}
              >
                {statusMessage}
              </p>
            ) : null}

            <div className="mt-10">
              <button
                type="submit"
                disabled={isLoading || status === 'success'}
                className="w-full h-14 uppercase tracking-[0.18em] text-[11px] border border-[var(--color-border)] bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>

      <FaqSection faqKey="contact" />
    </div>
  )
}
