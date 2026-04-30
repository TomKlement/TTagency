import { useTranslation } from 'react-i18next'
import { PageMeta } from '../../shared/seo/PageMeta'
import { FaqSection } from '../../shared/geo/FaqSection'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <PageMeta pageKey="contact" />
      <GeoJsonLd pageKey="contact" faqKey="contact" />
      <section className="max-w-[1440px] mx-auto min-h-[760px] border-x border-[var(--color-border)] grid grid-cols-1 lg:grid-cols-12 px-10 md:px-20 py-28 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-7">
          <h1 className="font-serif font-black uppercase text-[clamp(58px,8vw,92px)] leading-[0.92] tracking-tight max-w-[760px]">
            {t('contact.h1')}
          </h1>
          <p className="mt-10 text-[var(--color-muted)] text-[18px] leading-relaxed max-w-[560px]">
            {t('contact.body')}
          </p>
          <div className="mt-10 uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]">
            {t('contact.emailLabel')}:{' '}
            <a className="text-[var(--color-text)] underline hover:opacity-70" href={`mailto:${t('brand.email')}`}>
              {t('brand.email')}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <form className="w-full max-w-[520px] ml-auto border border-[var(--color-border)] p-8 md:p-10">
            <div className="space-y-8">
              <div>
                <label className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]">
                  {t('contact.form.nameLabel')}
                </label>
                <input
                  className="mt-3 w-full bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] placeholder:text-[var(--color-muted)] uppercase tracking-[0.18em] text-[11px] py-3 px-0"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]">
                  {t('contact.form.emailLabel')}
                </label>
                <input
                  className="mt-3 w-full bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] placeholder:text-[var(--color-muted)] uppercase tracking-[0.18em] text-[11px] py-3 px-0"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>
              <div>
                <label className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]">
                  {t('contact.form.messageLabel')}
                </label>
                <textarea
                  rows={4}
                  className="mt-3 w-full resize-none bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] placeholder:text-[var(--color-muted)] uppercase tracking-[0.18em] text-[11px] py-3 px-0"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>
            </div>

            <div className="mt-10">
              <button
                type="button"
                className="w-full h-14 uppercase tracking-[0.18em] text-[11px] border border-[var(--color-border)] bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
              >
                {t('contact.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>

      <FaqSection faqKey="contact" />
    </div>
  )
}

