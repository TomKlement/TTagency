import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageMeta } from '../../shared/seo/PageMeta'
import { FaqSection } from '../../shared/geo/FaqSection'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'

type PricingMode = 'monthly' | 'oneOff'

const subscriptionTierKeys = ['foundation', 'build', 'scale'] as const

export function PricingPage() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<PricingMode>('monthly')

  const oneOffItems = t('pricing.oneOff.items', { returnObjects: true }) as Array<{
    title: string
    price: string
    blurb: string
    features: string[]
    cta: string
  }>

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <PageMeta pageKey="pricing" />
      <GeoJsonLd pageKey="pricing" faqKey="pricing" />
      <main className="max-w-[1440px] mx-auto border-x border-[var(--color-border)]">
        <section className="border-b border-[var(--color-border)] px-12 md:px-24 py-28 min-h-[410px] flex flex-col justify-center">
          <h1 className="font-serif font-black uppercase text-[clamp(44px,6vw,72px)] leading-[1] tracking-tight">
            {t('pricing.h1')}
          </h1>
          <p className="mt-8 text-[var(--color-muted)] text-[18px] max-w-[780px] leading-relaxed">
            {t('pricing.subheadline')}
          </p>
        </section>

        <section className="px-12 md:px-24 py-16 border-b border-[var(--color-border)]">
          <div
            className="inline-flex w-full max-w-md border border-[var(--color-border)]"
            role="group"
            aria-label={t('pricing.h1')}
          >
            <button
              type="button"
              onClick={() => setMode('monthly')}
              className={[
                'flex-1 px-4 py-3 uppercase tracking-[0.2em] text-[10px] font-semibold transition-none',
                mode === 'monthly'
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                  : 'bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--color-soft)]',
              ].join(' ')}
            >
              {t('pricing.toggle.monthly')}
            </button>
            <button
              type="button"
              onClick={() => setMode('oneOff')}
              className={[
                'flex-1 px-4 py-3 uppercase tracking-[0.2em] text-[10px] font-semibold border-l border-[var(--color-border)] transition-none',
                mode === 'oneOff'
                  ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                  : 'bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--color-soft)]',
              ].join(' ')}
            >
              {t('pricing.toggle.oneOff')}
            </button>
          </div>
          <div className="mt-8 uppercase tracking-[0.24em] text-[10px] text-[var(--color-muted)]">
            {mode === 'monthly' ? t('pricing.subscription.kicker') : t('pricing.oneOff.kicker')}
          </div>
          <p className="mt-4 text-[var(--color-muted)] text-[15px] md:text-[16px] max-w-[72ch] leading-relaxed">
            {mode === 'monthly' ? t('pricing.subscription.intro') : t('pricing.oneOff.intro')}
          </p>
        </section>

        {mode === 'monthly' ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 border-b border-[var(--color-border)]">
            {subscriptionTierKeys.map((key, idx) => {
              const featured = key === 'build'
              const name = t(`pricing.subscription.tiers.${key}.name`)
              const price = t(`pricing.subscription.tiers.${key}.price`)
              const blurb = t(`pricing.subscription.tiers.${key}.blurb`)
              const features = t(`pricing.subscription.tiers.${key}.features`, { returnObjects: true }) as string[]
              const cta = t(`pricing.subscription.tiers.${key}.cta`)

              return (
                <article
                  key={key}
                  className={[
                    'relative p-12 md:p-16 min-h-[620px] flex flex-col border-b lg:border-b-0',
                    idx < 2 ? 'lg:border-r border-[var(--color-border)]' : '',
                    featured
                      ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                      : 'bg-[var(--color-bg)] text-[var(--color-text)]',
                  ].join(' ')}
                >
                  {featured ? (
                    <div className="absolute top-8 right-8 md:top-10 md:right-10 border border-current/35 px-2 py-1 uppercase tracking-[0.2em] text-[9px] opacity-90">
                      {t('pricing.badgePopular')}
                    </div>
                  ) : null}
                  <div
                    className={[
                      'uppercase tracking-[0.2em] text-[10px] font-semibold',
                      featured ? 'opacity-70' : 'text-[var(--color-muted)]',
                    ].join(' ')}
                  >
                    {name}
                  </div>
                  <div
                    className={[
                      'mt-8 font-serif font-black leading-[0.95] tracking-tight',
                      'text-[clamp(40px,4.8vw,58px)]',
                    ].join(' ')}
                  >
                    {price}
                  </div>
                  <p
                    className={[
                      'mt-6 text-[14px] md:text-[15px] leading-relaxed max-w-[42ch]',
                      featured ? 'opacity-85' : 'text-[var(--color-muted)]',
                    ].join(' ')}
                  >
                    {blurb}
                  </p>
                  <div className="mt-10 flex-1 space-y-0 text-[14px] md:text-[15px]">
                    {features.map((f) => (
                      <div
                        key={f}
                        className={[
                          'flex gap-3 border-t py-4',
                          featured ? 'border-current/20' : 'border-[var(--color-soft)]',
                        ].join(' ')}
                      >
                        <span className="shrink-0 font-medium" aria-hidden>
                          ✓
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className={[
                      'mt-12 flex h-14 w-full items-center justify-center uppercase tracking-[0.18em] text-[10px] font-semibold',
                      featured
                        ? 'border border-[var(--color-bg)] bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-transparent hover:text-[var(--color-bg)]'
                        : 'border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]',
                    ].join(' ')}
                  >
                    {cta}
                  </Link>
                </article>
              )
            })}
          </section>
        ) : (
          <section className="grid grid-cols-1 lg:grid-cols-3 border-b border-[var(--color-border)]">
            {oneOffItems.map((it, idx) => {
              const featured = idx === 1
              return (
                <article
                  key={it.title}
                  className={[
                    'relative p-12 md:p-16 min-h-[620px] flex flex-col border-b lg:border-b-0',
                    idx < 2 ? 'lg:border-r border-[var(--color-border)]' : '',
                    featured
                      ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                      : 'bg-[var(--color-bg)] text-[var(--color-text)]',
                  ].join(' ')}
                >
                  {featured ? (
                    <div className="absolute top-8 right-8 md:top-10 md:right-10 border border-current/35 px-2 py-1 uppercase tracking-[0.2em] text-[9px] opacity-90">
                      {t('pricing.badgePopular')}
                    </div>
                  ) : null}
                  <div
                    className={[
                      'font-serif font-black uppercase leading-[1.05] tracking-tight',
                      'text-[clamp(22px,2.4vw,30px)]',
                      featured ? '' : 'text-[var(--color-text)]',
                    ].join(' ')}
                  >
                    {it.title}
                  </div>
                  <div
                    className={[
                      'mt-8 font-serif font-black leading-[0.95] tracking-tight',
                      'text-[clamp(40px,4.8vw,58px)]',
                    ].join(' ')}
                  >
                    {it.price}
                  </div>
                  <p
                    className={[
                      'mt-6 text-[14px] md:text-[15px] leading-relaxed max-w-[42ch]',
                      featured ? 'opacity-85' : 'text-[var(--color-muted)]',
                    ].join(' ')}
                  >
                    {it.blurb}
                  </p>
                  <div className="mt-10 flex-1 space-y-0 text-[14px] md:text-[15px]">
                    {it.features.map((f) => (
                      <div
                        key={f}
                        className={[
                          'flex gap-3 border-t py-4',
                          featured ? 'border-current/20' : 'border-[var(--color-soft)]',
                        ].join(' ')}
                      >
                        <span className="shrink-0 font-medium" aria-hidden>
                          ✓
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className={[
                      'mt-12 flex h-14 w-full items-center justify-center uppercase tracking-[0.18em] text-[10px] font-semibold',
                      featured
                        ? 'border border-[var(--color-bg)] bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-transparent hover:text-[var(--color-bg)]'
                        : 'border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]',
                    ].join(' ')}
                  >
                    {it.cta}
                  </Link>
                </article>
              )
            })}
          </section>
        )}

        <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] px-12 md:px-24 py-24 md:py-32">
          <div className="border border-[var(--color-border)] bg-[var(--color-cta-panel-bg)] p-10 text-[var(--color-cta-panel-fg)] md:p-14 lg:p-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 xl:gap-24">
              <div>
                <div className="uppercase tracking-[0.22em] text-[10px] text-[var(--color-cta-panel-muted)]">
                  {t('pricing.enterprise.kicker')}
                </div>
                <h2 className="mt-5 font-serif font-black uppercase text-[clamp(32px,4.2vw,52px)] leading-[1.02] tracking-tight whitespace-pre-line">
                  {t('pricing.enterprise.title')}
                </h2>
                <p className="mt-8 max-w-[52ch] text-[14px] md:text-[15px] leading-relaxed text-[var(--color-cta-panel-muted)]">
                  {t('pricing.enterprise.body')}
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex h-12 w-full shrink-0 items-center justify-center border border-[var(--color-cta-panel-fg)] bg-[var(--color-cta-panel-fg)] px-10 uppercase tracking-[0.2em] text-[10px] font-semibold text-[var(--color-cta-panel-bg)] hover:bg-transparent hover:text-[var(--color-cta-panel-fg)] lg:h-14 lg:w-auto lg:min-w-[220px]"
              >
                {t('pricing.enterprise.cta')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FaqSection faqKey="pricing" />
    </div>
  )
}
