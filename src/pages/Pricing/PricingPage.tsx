import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { PageMeta } from '../../shared/seo/PageMeta'
import { FaqSection } from '../../shared/geo/FaqSection'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'

type PricingMode = 'monthly' | 'oneOff'

const subscriptionTierKeys = ['foundation', 'build', 'scale'] as const

export function PricingPage() {
  const { t } = useTranslation()
  const [mode, setMode] = useState<PricingMode>('monthly')
  const [isSwitching, setIsSwitching] = useState(false)
  const cardsRef = useRef<HTMLElement | null>(null)
  const togglePillRef = useRef<HTMLSpanElement | null>(null)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const requestModeChange = (next: PricingMode) => {
    if (next === mode) return
    if (reduceMotion) {
      setMode(next)
      return
    }
    if (isSwitching) return

    setIsSwitching(true)
    const root = cardsRef.current
    const pill = togglePillRef.current

    if (pill) {
      gsap.killTweensOf(pill)
      gsap.to(pill, {
        xPercent: next === 'monthly' ? 0 : 100,
        duration: 0.5,
        ease: 'elastic.out(1, 0.75)',
      })
    }

    if (!root) {
      setMode(next)
      return
    }

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-pricing-card]'))
    const prices = Array.from(root.querySelectorAll<HTMLElement>('[data-price]'))
    gsap.killTweensOf(cards)
    gsap.killTweensOf(prices)

    const tl = gsap.timeline({
      defaults: { overwrite: true },
      onComplete: () => setMode(next),
    })

    tl.to(prices, {
      filter: 'brightness(0.98)',
      duration: 0.1,
      ease: 'power1.out',
    })
    tl.to(
      cards,
      {
        autoAlpha: 0,
        y: -10,
        rotateX: 6,
        transformOrigin: '50% 0%',
        filter: 'blur(6px)',
        duration: 0.22,
        ease: 'power2.in',
        stagger: 0.04,
      },
      0,
    )
  }

  useEffect(() => {
    if (reduceMotion) return
    const root = cardsRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-pricing-card]')
      const prices = gsap.utils.toArray<HTMLElement>('[data-price]')

      gsap.killTweensOf(cards)
      gsap.killTweensOf(prices)

      gsap.set(cards, { transformPerspective: 800 })
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 22, rotateX: -8, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.07,
          clearProps: 'opacity,transform,visibility,filter',
        },
      )

      gsap.fromTo(
        prices,
        { scale: 0.99, filter: 'brightness(1)' },
        {
          scale: 1.02,
          filter: 'brightness(1.08)',
          duration: 0.22,
          ease: 'back.out(2)',
          yoyo: true,
          repeat: 1,
          clearProps: 'transform,filter',
        },
      )
    }, root)

    return () => ctx.revert()
  }, [mode, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const pill = togglePillRef.current
    if (!pill) return
    gsap.set(pill, { xPercent: mode === 'monthly' ? 0 : 100 })
  }, [mode, reduceMotion])

  useEffect(() => {
    if (!isSwitching) return
    const id = window.setTimeout(() => setIsSwitching(false), 650)
    return () => window.clearTimeout(id)
  }, [isSwitching])

  const oneOffItems = t('pricing.oneOff.items', { returnObjects: true }) as Array<{
    title: string
    pricePrefix?: string
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
            className="relative inline-flex w-full max-w-md overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]"
            role="group"
            aria-label={t('pricing.h1')}
          >
            <span
              ref={togglePillRef}
              aria-hidden
              className={[
                'pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[var(--color-text)]',
              ].join(' ')}
            />
            <button
              type="button"
              onClick={() => requestModeChange('monthly')}
              disabled={isSwitching}
              aria-pressed={mode === 'monthly'}
              className={[
                'relative z-10 flex-1 px-4 py-3 uppercase tracking-[0.2em] text-[10px] font-semibold',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
                'disabled:opacity-70 disabled:cursor-pointer',
                mode === 'monthly'
                  ? 'text-[var(--color-bg)]'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-soft)]',
              ].join(' ')}
            >
              {t('pricing.toggle.monthly')}
            </button>
            <button
              type="button"
              onClick={() => requestModeChange('oneOff')}
              disabled={isSwitching}
              aria-pressed={mode === 'oneOff'}
              className={[
                'relative z-10 flex-1 px-4 py-3 uppercase tracking-[0.2em] text-[10px] font-semibold border-l border-[var(--color-border)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]',
                'disabled:opacity-70 disabled:cursor-pointer',
                mode === 'oneOff'
                  ? 'text-[var(--color-bg)]'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-soft)]',
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
          <section
            ref={cardsRef}
            className="grid grid-cols-1 items-stretch border-b border-[var(--color-border)] lg:grid-cols-3"
          >
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
                  data-pricing-card
                  className={[
                    'relative flex h-full min-h-[620px] min-w-0 flex-col border-b p-12 md:p-16 lg:border-b-0',
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
                      'min-h-[3rem] uppercase tracking-[0.2em] text-[10px] font-semibold leading-snug',
                      featured ? 'opacity-70' : 'text-[var(--color-muted)]',
                    ].join(' ')}
                  >
                    {name}
                  </div>
                  <div
                    data-price
                    className={[
                      'mt-6 min-w-0 break-words font-serif font-black leading-[1.05] tracking-tight',
                      'text-[clamp(28px,3.2vw,44px)]',
                    ].join(' ')}
                  >
                    {price}
                  </div>
                  <p
                    className={[
                      'mt-5 min-h-[6.25rem] min-w-0 max-w-[42ch] text-[13px] leading-relaxed md:mt-6 md:min-h-[6.75rem] md:text-[14px]',
                      featured ? 'opacity-85' : 'text-[var(--color-muted)]',
                    ].join(' ')}
                  >
                    {blurb}
                  </p>
                  <div className="mt-8 flex min-w-0 flex-1 flex-col space-y-0 pb-10 text-[13px] md:mt-10 md:text-[14px]">
                    {features.map((f) => (
                      <div
                        key={f}
                        className={[
                          'flex min-w-0 gap-3 border-t py-4',
                          featured ? 'border-current/20' : 'border-[var(--color-soft)]',
                        ].join(' ')}
                      >
                        <span className="shrink-0 font-medium" aria-hidden>
                          ✓
                        </span>
                        <span className="min-w-0 break-words">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className={[
                      'mt-auto flex h-14 w-full shrink-0 items-center justify-center uppercase tracking-[0.18em] text-[10px] font-semibold leading-none',
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
          <section
            ref={cardsRef}
            className="grid grid-cols-1 items-stretch border-b border-[var(--color-border)] lg:grid-cols-3"
          >
            {oneOffItems.map((it, idx) => {
              const featured = idx === 1
              return (
                <article
                  key={it.title}
                  data-pricing-card
                  className={[
                    'relative flex h-full min-h-[620px] min-w-0 flex-col border-b p-12 md:p-16 lg:border-b-0',
                    idx < 2 ? 'lg:border-r border-[var(--color-border)]' : '',
                    featured
                      ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
                      : 'bg-[var(--color-bg)] text-[var(--color-text)]',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'min-h-[4.5rem] uppercase leading-[1.08] tracking-tight md:min-h-[4.25rem]',
                      'text-[clamp(17px,1.85vw,26px)]',
                      featured
                        ? 'font-sans font-bold uppercase tracking-[0.12em] text-[clamp(13px,1.35vw,17px)]'
                        : 'font-serif font-black uppercase text-[var(--color-text)]',
                    ].join(' ')}
                  >
                    {it.title}
                  </div>
                  <div className="mt-6 min-w-0">
                    {it.pricePrefix ? (
                      <span
                        className={[
                          'mb-1 block text-[10px] font-semibold uppercase leading-none tracking-[0.22em]',
                          featured ? 'font-mono opacity-80' : 'text-[var(--color-muted)]',
                        ].join(' ')}
                      >
                        {it.pricePrefix}
                      </span>
                    ) : null}
                    <div
                      data-price
                      className={[
                        'min-w-0 break-words font-black leading-[1.05] tracking-tight',
                        'text-[clamp(28px,3.2vw,44px)]',
                        featured ? 'font-sans' : 'font-serif',
                      ].join(' ')}
                    >
                      {it.price}
                    </div>
                  </div>
                  <p
                    className={[
                      'mt-5 min-h-[6.25rem] min-w-0 max-w-[42ch] leading-relaxed md:mt-6 md:min-h-[6.75rem]',
                      featured
                        ? 'font-mono text-[12px] opacity-90 md:text-[13px]'
                        : 'text-[13px] text-[var(--color-muted)] md:text-[14px]',
                    ].join(' ')}
                  >
                    {it.blurb}
                  </p>
                  <div
                    className={[
                      'mt-8 flex min-w-0 flex-1 flex-col space-y-0 pb-10 md:mt-10',
                      featured ? 'font-mono text-[12px] md:text-[13px]' : 'text-[13px] md:text-[14px]',
                    ].join(' ')}
                  >
                    {it.features.map((f) => (
                      <div
                        key={f}
                        className={[
                          'flex min-w-0 gap-3 border-t py-4',
                          featured ? 'border-current/20' : 'border-[var(--color-soft)]',
                        ].join(' ')}
                      >
                        <span className="shrink-0 font-medium" aria-hidden>
                          ✓
                        </span>
                        <span className="min-w-0 break-words">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className={[
                      'mt-auto flex h-14 w-full shrink-0 items-center justify-center uppercase tracking-[0.18em] text-[10px] font-semibold leading-none',
                      featured
                        ? 'border border-[var(--color-bg)] bg-transparent text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]'
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
