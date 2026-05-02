import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type FaqKey = 'home' | 'portfolio' | 'cmsDemo' | 'pricing' | 'contact'

type FaqItem = { q: string; a: string }

export function FaqSection({ faqKey }: { faqKey: FaqKey }) {
  const { t, i18n } = useTranslation()
  const items = t(`faq.${faqKey}`, { returnObjects: true }) as FaqItem[]
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionId = useId()
  const rootRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const panelRefs = useRef<Array<HTMLDivElement | null>>([])
  const prevOpenIndexRef = useRef<number | null>(null)
  const didInitPanelsRef = useRef(false)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
  }, [])

  const animatePanel = (index: number, open: boolean) => {
    if (reduceMotion) return
    const panel = panelRefs.current[index]
    if (!panel) return
    gsap.killTweensOf(panel)

    if (open) {
      gsap.set(panel, { height: 'auto', autoAlpha: 1 })
      const h = panel.offsetHeight || panel.scrollHeight
      gsap.fromTo(
        panel,
        { height: 0, autoAlpha: 0, filter: 'blur(6px)' },
        {
          height: h,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.32,
          ease: 'power2.out',
          clearProps: 'height,opacity,visibility,filter',
        },
      )
    } else {
      const h = panel.offsetHeight || panel.scrollHeight
      gsap.fromTo(
        panel,
        { height: h, autoAlpha: 1, filter: 'blur(0px)' },
        {
          height: 0,
          autoAlpha: 0,
          filter: 'blur(6px)',
          duration: 0.24,
          ease: 'power2.inOut',
          clearProps: 'opacity,visibility,filter',
        },
      )
    }
  }

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  // New FAQ DOM (e.g. language change swaps `key={it.q}`) must re-run GSAP init; `didInitPanelsRef` would otherwise stay true and leave panels at full height.
  useEffect(() => {
    didInitPanelsRef.current = false
    prevOpenIndexRef.current = null
  }, [i18n.language, faqKey])

  useEffect(() => {
    if (reduceMotion) return
    if (didInitPanelsRef.current) return
    didInitPanelsRef.current = true

    const panels = panelRefs.current
    panels.forEach((p, i) => {
      if (!p) return
      gsap.killTweensOf(p)
      const shouldBeOpen = openIndex === i
      if (shouldBeOpen) {
        gsap.set(p, { height: 'auto', autoAlpha: 1, filter: 'blur(0px)' })
      } else {
        gsap.set(p, { height: 0, autoAlpha: 0, filter: 'blur(6px)' })
      }
    })
  }, [openIndex, reduceMotion, i18n.language, faqKey])

  useEffect(() => {
    if (reduceMotion) return
    const prev = prevOpenIndexRef.current
    if (prev !== null && prev !== openIndex) animatePanel(prev, false)
    if (openIndex !== null) animatePanel(openIndex, true)
    prevOpenIndexRef.current = openIndex
  }, [openIndex, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const els = itemRefs.current.filter(Boolean) as HTMLDivElement[]
      gsap.set(els, { autoAlpha: 0, y: 16, filter: 'blur(8px)' })

      ScrollTrigger.batch(els, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.07,
            clearProps: 'opacity,transform,visibility,filter',
          })
        },
      })
    }, root)

    return () => ctx.revert()
  }, [reduceMotion, items.length])

  return (
    <section ref={rootRef} className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1440px] border-x border-[var(--color-border)] px-12 md:px-24 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <div className="lg:col-span-4">
            <h2 className="font-serif font-black uppercase text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-tight whitespace-pre-line">
              {t('common.faq.h2')}
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-3 md:gap-4">
            {items.map((it, index) => {
              const open = openIndex === index
              const buttonId = `${sectionId}-btn-${index}`
              const panelId = `${sectionId}-panel-${index}`
              return (
                <div
                  key={it.q}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className="group border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-soft)]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    id={buttonId}
                    className="grid w-full grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-x-3 bg-transparent px-5 py-5 text-left md:grid-cols-[1.5rem_minmax(0,1fr)] md:gap-x-4 md:px-6 md:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)]/20 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                  >
                    <span
                      className={[
                        'flex w-full shrink-0 justify-center pt-0.5 font-sans text-[10px] leading-none text-[var(--color-text)]',
                        'motion-safe:transition-transform motion-safe:duration-200',
                        open ? 'rotate-90' : 'rotate-0',
                      ].join(' ')}
                      aria-hidden
                    >
                      ▶
                    </span>
                    <span className="min-w-0 font-sans text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-[var(--color-text)] md:text-[12px]">
                      {it.q}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    ref={(el) => {
                      panelRefs.current[index] = el
                    }}
                    className="overflow-hidden"
                    aria-hidden={!open}
                  >
                    <div className="border-t border-[var(--color-border)] px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
                      <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 md:gap-x-4">
                        <span className="select-none" aria-hidden />
                        <p className="whitespace-pre-line font-sans text-[12px] normal-case leading-relaxed tracking-normal text-[var(--color-muted)] md:text-[13px]">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
