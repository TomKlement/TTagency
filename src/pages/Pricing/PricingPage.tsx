import { useTranslation } from 'react-i18next'
import { PageMeta } from '../../shared/seo/PageMeta'
import { FaqSection } from '../../shared/geo/FaqSection'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'

export function PricingPage() {
  const { t } = useTranslation()
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
          <div className="uppercase tracking-[0.24em] text-[10px] text-[var(--color-muted)]">{t('pricing.subscription.kicker')}</div>
          <p className="mt-6 text-[var(--color-muted)] text-[15px] max-w-[72ch] leading-relaxed">{t('pricing.subscription.intro')}</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 border-b border-[var(--color-border)]">
          <article className="p-12 md:p-14 min-h-[640px] flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
            <div className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">
              {t('pricing.subscription.tiers.foundation.name')}
            </div>
            <div className="mt-10 font-serif font-black text-[46px] leading-[1]">{t('pricing.subscription.tiers.foundation.price')}</div>
            <p className="mt-6 text-[14px] leading-relaxed max-w-[44ch]">{t('pricing.subscription.tiers.foundation.blurb')}</p>
            <div className="mt-12 space-y-0 text-[15px] flex-1">
              {(t('pricing.subscription.tiers.foundation.features', { returnObjects: true }) as string[]).map((f) => (
                <div key={f} className="border-t border-[var(--color-soft)] py-4">
                  {f}
                </div>
              ))}
            </div>
            <button className="mt-12 w-full h-14 uppercase tracking-[0.18em] text-[10px] border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]">
              {t('pricing.subscription.tiers.foundation.cta')}
            </button>
          </article>

          <article className="p-12 md:p-14 min-h-[640px] flex flex-col bg-[var(--color-text)] text-[var(--color-bg)] border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
            <div className="uppercase tracking-[0.18em] text-[10px] opacity-55">
              {t('pricing.subscription.tiers.build.name')}
            </div>
            <div className="mt-10 font-serif font-black text-[46px] leading-[1]">{t('pricing.subscription.tiers.build.price')}</div>
            <p className="mt-6 text-[14px] leading-relaxed max-w-[44ch] opacity-80">{t('pricing.subscription.tiers.build.blurb')}</p>
            <div className="mt-12 space-y-0 text-[15px] flex-1">
              {(t('pricing.subscription.tiers.build.features', { returnObjects: true }) as string[]).map((f) => (
                <div key={f} className="border-t border-current/25 py-4">
                  {f}
                </div>
              ))}
            </div>
            <button className="mt-12 w-full h-14 uppercase tracking-[0.18em] text-[10px] bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-bg)]">
              {t('pricing.subscription.tiers.build.cta')}
            </button>
          </article>

          <article className="p-12 md:p-14 min-h-[640px] flex flex-col">
            <div className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">
              {t('pricing.subscription.tiers.scale.name')}
            </div>
            <div className="mt-10 font-serif font-black text-[46px] leading-[1]">{t('pricing.subscription.tiers.scale.price')}</div>
            <p className="mt-6 text-[14px] leading-relaxed max-w-[44ch]">{t('pricing.subscription.tiers.scale.blurb')}</p>
            <div className="mt-12 space-y-0 text-[15px] flex-1">
              {(t('pricing.subscription.tiers.scale.features', { returnObjects: true }) as string[]).map((f) => (
                <div key={f} className="border-t border-[var(--color-soft)] py-4">
                  {f}
                </div>
              ))}
            </div>
            <button className="mt-12 w-full h-14 uppercase tracking-[0.18em] text-[10px] border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]">
              {t('pricing.subscription.tiers.scale.cta')}
            </button>
          </article>
        </section>

        <section className="px-12 md:px-24 py-16 border-b border-[var(--color-border)]">
          <div className="uppercase tracking-[0.24em] text-[10px] text-[var(--color-muted)]">{t('pricing.oneOff.kicker')}</div>
          <p className="mt-6 text-[var(--color-muted)] text-[15px] max-w-[72ch] leading-relaxed">{t('pricing.oneOff.intro')}</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 border-b border-[var(--color-border)]">
          {oneOffItems.map((it, idx) => (
            <article
              key={it.title}
              className={[
                'p-12 md:p-14 min-h-[520px] flex flex-col',
                idx < 2 ? 'border-b lg:border-b-0 lg:border-r border-[var(--color-border)]' : 'border-b lg:border-b-0',
              ].join(' ')}
            >
              <div className="font-serif font-black uppercase text-[32px] tracking-tight">{it.title}</div>
              <div className="mt-8 uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">{it.price}</div>
              <p className="mt-6 text-[14px] leading-relaxed max-w-[54ch] text-[var(--color-muted)]">{it.blurb}</p>
              <div className="mt-10 space-y-0 text-[15px] flex-1">
                {it.features.map((f) => (
                  <div key={f} className="border-t border-[var(--color-soft)] py-4">
                    {f}
                  </div>
                ))}
              </div>
              <button className="mt-10 w-full h-14 uppercase tracking-[0.18em] text-[10px] border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]">
                {it.cta}
              </button>
            </article>
          ))}
        </section>
      </main>

      <FaqSection faqKey="pricing" />
    </div>
  )
}

