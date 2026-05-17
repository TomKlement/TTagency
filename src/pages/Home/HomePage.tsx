import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { PageMeta } from '../../shared/seo/PageMeta'
import { FaqSection } from '../../shared/geo/FaqSection'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'

gsap.registerPlugin(ScrollTrigger)

export function HomePage() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  useEffect(() => {
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      if (!titleRef.current) return

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 24, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' },
      )

      // Transform-only parallax — letter-spacing on scroll widens text and overflows on mobile.
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate(self) {
          if (!titleRef.current) return
          const p = self.progress
          gsap.set(titleRef.current, {
            y: p * -20,
            opacity: 1 - p * 0.2,
            transformOrigin: 'left bottom',
          })
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const root = pageRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      if (els.length === 0) return

      gsap.set(els, { autoAlpha: 0, y: 18, filter: 'blur(10px)' })

      ScrollTrigger.batch(els, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            clearProps: 'opacity,transform,visibility,filter',
          })
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduceMotion])

  return (
    <div ref={pageRef} className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <PageMeta pageKey="home" />
      <GeoJsonLd pageKey="home" faqKey="home" />
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-[var(--color-border)] px-8 md:px-12 pb-20 min-h-[82vh] flex flex-col justify-end grid-paper"
      >
        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <p className="uppercase tracking-[0.24em] text-[11px] text-[var(--color-muted)] mb-10">
            {t('home.hero.kicker')}
          </p>
          <h1
            ref={titleRef}
            className="font-serif font-black uppercase leading-display text-[clamp(2.25rem,10vw,7.5rem)] max-w-full whitespace-pre-line break-words"
          >
            {t('home.hero.h1')}
          </h1>
          <p className="mt-10 max-w-[680px] text-[15px] leading-relaxed text-[var(--color-muted)]">
            {t('home.hero.subheadline')}
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-28">
        <div className="grid grid-cols-12 gap-6">
          <Link
            to="/portfolio"
            data-reveal
            className="group col-span-12 md:col-span-4 min-h-[360px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex flex-col justify-between hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
          >
            <div>
              <span className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)] group-hover:text-[var(--color-bg)]">
                {t('home.blocks.architecture.number')}
              </span>
              <h2 className="mt-8 font-serif font-black text-[30px] leading-tight">
                {t('home.blocks.architecture.title')}
              </h2>
              <p className="mt-3 max-w-[32ch] text-[13px] leading-relaxed opacity-70">
                {t('home.blocks.architecture.body')}
              </p>
            </div>
            <div className="flex items-end justify-between uppercase tracking-[0.18em] text-[10px]">
              <span className="border-b border-current pb-1">{t('home.blocks.architecture.cta')}</span>
              <span className="text-xl">→</span>
            </div>
          </Link>

          <Link
            to="/cms-demo"
            data-reveal
            className="group col-span-12 md:col-span-8 min-h-[360px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-35">
              <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)]" />
              <div className="absolute left-[12%] top-[18%] h-px w-[80%] rotate-12 bg-[var(--color-border)]" />
              <div className="absolute left-[5%] bottom-[22%] h-px w-[90%] -rotate-12 bg-[var(--color-border)]" />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">
                  {t('home.blocks.cms.number')}
                </span>
                <h2 className="mt-8 font-serif font-black text-[44px] leading-tight">{t('home.blocks.cms.title')}</h2>
                <p className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-[var(--color-muted)]">
                  {t('home.blocks.cms.body')}
                </p>
              </div>
              <span className="w-max border border-[var(--color-border)] px-6 py-3 uppercase tracking-[0.18em] text-[10px] group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)]">
                {t('home.blocks.cms.cta')}
              </span>
            </div>
          </Link>

          <Link
            to="/pricing"
            data-reveal
            className="group col-span-12 md:col-span-6 min-h-[300px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex flex-col justify-between hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
          >
            <div>
              <span className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)] group-hover:text-[var(--color-bg)]">
                {t('home.blocks.pricing.number')}
              </span>
              <h2 className="mt-8 font-serif font-black text-[32px] leading-tight">{t('home.blocks.pricing.title')}</h2>
              <p className="mt-3 text-[13px] leading-relaxed opacity-70">
                {t('home.blocks.pricing.body')}
              </p>
            </div>
            <span className="w-max border-b border-current pb-1 uppercase tracking-[0.18em] text-[10px]">
              {t('home.blocks.pricing.cta')}
            </span>
          </Link>

          <Link
            to="/contact"
            data-reveal
            className="col-span-12 md:col-span-6 min-h-[300px] border border-[var(--color-border)] bg-[var(--color-inverse-bg)] text-[var(--color-inverse-text)] p-8 flex flex-col justify-between"
          >
            <div>
              <span className="uppercase tracking-[0.18em] text-[10px] opacity-55">{t('home.blocks.contact.number')}</span>
              <h2 className="mt-8 font-serif font-black text-[32px] leading-tight">{t('home.blocks.contact.title')}</h2>
              <p className="mt-3 text-[13px] leading-relaxed opacity-70">
                {t('home.blocks.contact.body')}
              </p>
            </div>
            <div className="flex gap-4 border-t border-current/35 pt-4">
              <span className="flex-1 border-b border-current/35 pb-2 uppercase tracking-[0.18em] text-[10px] opacity-55">
                {t('home.blocks.contact.fieldHint')}
              </span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)]">
        <div className="max-w-[1440px] mx-auto p-8 border-x border-[var(--color-border)]">
          <h2 className="font-serif font-black uppercase text-[32px] tracking-tight">{t('home.featured.title')}</h2>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto border-x border-[var(--color-border)]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {(t('home.howWeWork.steps', { returnObjects: true }) as Array<{ number: string; title: string; body: string }>).map(
            (step, idx) => (
              <div
                key={`${step.number}-${step.title}`}
                data-reveal
                className={[
                  'p-8 min-h-[260px]',
                  idx < 2 ? 'border-b md:border-b-0 md:border-r border-[var(--color-border)]' : '',
                ].join(' ')}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  <span>{step.number}</span>
                  <span className="mx-2 opacity-35" aria-hidden>
                    /
                  </span>
                  <span className="text-[var(--color-text)]">{step.title}</span>
                </div>
                <p className="mt-10 text-[13px] leading-relaxed text-[var(--color-muted)] max-w-[44ch]">{step.body}</p>
              </div>
            ),
          )}
        </div>
      </section>

      <FaqSection faqKey="home" />
    </div>
  )
}
