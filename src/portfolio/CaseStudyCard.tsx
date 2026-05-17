import type { CaseStudy } from './types'

type Props = {
  study: CaseStudy
  viewSiteText: string
  viewSiteAria: string
}

const ctaLinkClass =
  'shrink-0 whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.2em] transition-opacity duration-200 hover:opacity-60 md:text-[13px]'

export function CaseStudyCard({ study, viewSiteText, viewSiteAria }: Props) {
  const src = study.previewSrc
  const linkProps = study.href.startsWith('http') ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  const contentHideOnPreviewHover = src
    ? 'transition-[opacity,visibility] duration-300 ease-out motion-reduce:transition-none group-hover:pointer-events-none group-hover:invisible group-hover:opacity-0'
    : ''

  return (
    <article
      data-reveal
      className={[
        'group relative flex min-h-0 flex-col overflow-hidden border-b border-r border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-colors duration-200',
        src ? '' : 'hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]',
        study.className,
      ].join(' ')}
    >
      {src ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 ease-out motion-reduce:duration-200 group-hover:opacity-100"
          aria-hidden
        >
          <img src={src} alt="" decoding="async" className="h-full w-full object-cover object-top" />
          <div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent"
            aria-hidden
          />
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between">
        <div className={['flex flex-col', contentHideOnPreviewHover].filter(Boolean).join(' ')}>
          <div className="flex items-start justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.24em]">
            <span>{study.number}</span>
            <span>{study.year}</span>
          </div>

          <div className="mt-16 min-w-0">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-bg)]">
              {study.category}
            </p>
            <h2 className="font-serif font-black text-[clamp(32px,4vw,64px)] uppercase leading-display-title tracking-tight">
              {study.title}
            </h2>
            <p className="mt-6 max-w-[38ch] text-[13px] leading-relaxed text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-bg)]">
              {study.description}
            </p>
          </div>
        </div>

        <div className="relative z-20 mt-12 flex w-full min-w-0 flex-nowrap items-center justify-between gap-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-colors duration-200 md:text-[13px]">
          <span
            className={[
              'min-w-0 truncate',
              src ? 'group-hover:text-white group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.85)]' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {study.result}
          </span>
          <a
            href={study.href}
            aria-label={viewSiteAria}
            className={[
              ctaLinkClass,
              src ? 'group-hover:text-white group-hover:[text-shadow:0_1px_3px_rgba(0,0,0,0.85)]' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            {...linkProps}
          >
            {viewSiteText} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}
