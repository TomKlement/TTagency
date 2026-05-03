import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageMeta } from '../../shared/seo/PageMeta'
import { GeoJsonLd } from '../../shared/geo/GeoJsonLd'

gsap.registerPlugin(ScrollTrigger)

const layouts = ['onePage', 'multiPage', 'showcase'] as const

function Wireframe({ layout }: { layout: (typeof layouts)[number] }) {
  if (layout === 'onePage') {
    return (
      <div className="absolute inset-3 border border-current/20 p-2 flex flex-col gap-2">
        <div className="h-7 shrink-0 border border-current/20 flex items-center justify-between px-2">
          <div className="h-3 w-10 bg-current/20" />
          <div className="h-3 w-14 bg-current/20" />
        </div>
        <div className="min-h-0 flex-1 border border-current/20 p-2 flex flex-col gap-2">
          <div className="h-[28%] border border-current/20 bg-current/10" />
          <div className="h-[18%] border border-current/20" />
          <div className="h-[18%] border border-current/20" />
          <div className="flex-1 min-h-[20%] border border-current/20" />
        </div>
      </div>
    )
  }

  if (layout === 'multiPage') {
    return (
      <div className="absolute inset-3 border border-current/20 p-2 flex gap-2">
        <div className="w-14 shrink-0 border-r border-current/20 pr-2 space-y-2">
          <div className="h-6 border border-current/20" />
          <div className="h-6 border border-current/20" />
          <div className="h-6 border border-current/20" />
          <div className="h-6 border border-current/20" />
        </div>
        <div className="min-w-0 flex-1 space-y-2 flex flex-col">
          <div className="h-[42%] border border-current/20" />
          <div className="flex-1 min-h-0 border border-current/20 p-2 flex gap-2">
            <div className="flex-1 border border-current/20" />
            <div className="flex-1 border border-current/20" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-3 border border-current/20 p-2 flex flex-col gap-2">
      <div className="h-7 shrink-0 border border-current/20 flex items-center px-2 gap-2">
        <div className="h-3 w-10 bg-current/20" />
        <div className="h-3 flex-1 max-w-[40%] bg-current/15" />
      </div>
      <div className="min-h-0 flex-1 grid grid-cols-4 grid-rows-3 gap-1.5 p-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border border-current/25 bg-current/[0.07]" />
        ))}
      </div>
    </div>
  )
}

export function CmsDemoPage() {
  const { t } = useTranslation()
  const pageRef = useRef<HTMLDivElement | null>(null)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const templates = t('cmsDemo.templates', { returnObjects: true }) as Array<{ title: string; items: string[] }>

  useEffect(() => {
    if (reduceMotion) return
    const root = pageRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      if (els.length === 0) return

      gsap.set(els, { autoAlpha: 0, y: 18, filter: 'blur(10px)' })

      ScrollTrigger.batch(els, {
        start: 'top 86%',
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
  }, [reduceMotion, templates.length])

  return (
    <div
      ref={pageRef}
      className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]"
    >
      <PageMeta pageKey="cmsDemo" />
      <GeoJsonLd pageKey="cmsDemo" />
      <section data-reveal className="px-8 py-24 text-center">
        <h1 className="font-serif font-black uppercase text-[clamp(44px,6vw,76px)] leading-[1] tracking-tight">
          {t('cmsDemo.h1')}
        </h1>
        <p className="mt-6 text-[var(--color-muted)] text-[17px] max-w-[72ch] mx-auto leading-relaxed">
          {t('cmsDemo.intro')}
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-8 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--color-border)] md:items-stretch">
          {templates.map((c, idx) => (
            <article
              key={c.title}
              data-reveal
              className={[
                'grid min-h-[560px] h-full self-stretch grid-rows-[auto_auto_minmax(0,1fr)_auto] p-9 md:p-10 group hover:bg-[var(--color-surface)]',
                idx < 2 ? 'border-b md:border-b-0 md:border-r border-[var(--color-border)]' : '',
              ].join(' ')}
            >
              <div className="flex min-h-[6.75rem] items-end justify-center px-1 sm:min-h-[7.25rem] md:min-h-[7.5rem]">
                <h2 className="font-serif font-black uppercase text-[clamp(22px,2.5vw,34px)] leading-[1.12] tracking-[0.08em] text-balance text-center">
                  {c.title}
                </h2>
              </div>
              <div className="mt-10 relative h-64 shrink-0 border border-current p-4 overflow-hidden bg-[var(--color-surface)]">
                <Wireframe layout={layouts[idx] ?? 'onePage'} />
              </div>
              <div className="mt-8 flex h-full min-h-0 flex-col border-t border-current pt-6">
                <ul className="space-y-4 text-[15px]">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-3 items-start text-[var(--color-muted)]">
                      <span className="mt-[1px] shrink-0 text-[var(--color-text)]">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-8 w-full shrink-0 uppercase tracking-[0.18em] text-[11px] h-12 border border-current bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
              >
                {t('cmsDemo.button')}
              </button>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-10 text-center text-[var(--color-muted)] text-[13px] leading-relaxed">
          {t('cmsDemo.cta')} <a className="underline hover:text-[var(--color-text)]" href={`mailto:${t('brand.email')}`}>{t('brand.email')}</a>
        </div>
      </section>
    </div>
  )
}

