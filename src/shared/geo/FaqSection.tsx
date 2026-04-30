import { useTranslation } from 'react-i18next'

export type FaqKey = 'home' | 'portfolio' | 'cmsDemo' | 'pricing' | 'contact'

type FaqItem = { q: string; a: string }

export function FaqSection({ faqKey }: { faqKey: FaqKey }) {
  const { t } = useTranslation()
  const items = t(`faq.${faqKey}`, { returnObjects: true }) as FaqItem[]

  return (
    <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-24 border-t border-[var(--color-border)]">
      <div className="max-w-[980px]">
        <h2 className="font-serif font-black uppercase text-[32px] tracking-tight">FAQ</h2>
        <div className="mt-10 space-y-6">
          {items.map((it) => (
            <details key={it.q} className="border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <summary className="cursor-pointer uppercase tracking-[0.14em] text-[11px] font-semibold">
                {it.q}
              </summary>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-muted)]">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

