import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 24, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' },
      )

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate(self) {
          if (!titleRef.current) return
          const t = self.progress
          gsap.set(titleRef.current, { letterSpacing: `${t * 0.06}em`, scale: 1 - t * 0.04, opacity: 1 - t * 0.2 })
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
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
            className="font-serif font-black uppercase leading-[0.92] text-[clamp(58px,10vw,120px)] max-w-[980px]"
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
        <div className="max-w-[1440px] mx-auto p-8 border-x border-[var(--color-border)] flex items-end justify-between">
          <h2 className="font-serif font-black uppercase text-[32px] tracking-tight">{t('home.featured.title')}</h2>
          <Link
            className="uppercase tracking-[0.18em] text-[10px] underline hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] px-2 py-1"
            to="/portfolio"
          >
            {t('home.featured.cta')}
          </Link>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto border-x border-[var(--color-border)]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {(t('home.capabilities.items', { returnObjects: true }) as Array<{ title: string; desc: string }>).map(
            (c, idx) => (
            <div
              key={c.title}
              className={[
                'p-8 min-h-[260px]',
                idx < 2 ? 'border-b md:border-b-0 md:border-r border-[var(--color-border)]' : '',
              ].join(' ')}
            >
              <span className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)] block mb-12">
                {t('home.capabilities.kicker')}
              </span>
              <h3 className="font-serif font-black uppercase text-[20px] tracking-tight">{c.title}</h3>
              <p className="mt-4 text-[var(--color-muted)] text-[13px] leading-relaxed max-w-[44ch]">{c.desc}</p>
            </div>
          ),
          )}
        </div>
      </section>

      <FaqSection faqKey="home" />
    </div>
  )
}
