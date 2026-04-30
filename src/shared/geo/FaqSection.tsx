import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type FaqKey = 'home' | 'portfolio' | 'cmsDemo' | 'pricing' | 'contact'

type FaqItem = { q: string; a: string }

export function FaqSection({ faqKey }: { faqKey: FaqKey }) {
  const { t } = useTranslation()
  const items = t(`faq.${faqKey}`, { returnObjects: true }) as FaqItem[]
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
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
              return (
                <div
                  key={it.q}
                  className="border border-[var(--color-border)] bg-[var(--color-bg)]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={open}
                    className="grid w-full grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-x-3 px-5 py-5 text-left md:grid-cols-[1.5rem_minmax(0,1fr)] md:gap-x-4 md:px-6 md:py-6"
                  >
                    <span
                      className="flex w-full shrink-0 justify-center pt-0.5 font-sans text-[10px] leading-none text-[var(--color-text)]"
                      aria-hidden
                    >
                      {open ? '▼' : '▶'}
                    </span>
                    <span className="min-w-0 font-sans text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-[var(--color-text)] md:text-[12px]">
                      {it.q}
                    </span>
                  </button>
                  {open ? (
                    <div className="border-t border-[var(--color-border)] px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
                      <div className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 md:gap-x-4">
                        <span className="select-none" aria-hidden />
                        <p className="font-sans text-[12px] normal-case leading-relaxed tracking-normal text-[var(--color-muted)] md:text-[13px]">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
