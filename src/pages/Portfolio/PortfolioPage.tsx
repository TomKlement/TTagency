const caseStudies = [
  {
    number: '01',
    title: 'Axiom Studio',
    category: 'Brand system / Web',
    year: '2026',
    description: 'A sharp identity and conversion-focused site for an architecture studio built around precision and restraint.',
    result: '+42% qualified leads',
    href: '#',
    className: 'md:col-span-1 md:row-span-2 min-h-[460px]',
  },
  {
    number: '02',
    title: 'Nord Clinic',
    category: 'Website / Booking flow',
    year: '2026',
    description: 'A minimal booking experience for a premium clinic with faster paths from visit to consultation.',
    result: '+31% booking conversion',
    href: '#',
    className: 'md:col-span-1 min-h-[260px]',
  },
  {
    number: '03',
    title: 'Mono Estate',
    category: 'Landing page / CMS',
    year: '2025',
    description: 'A real estate launch page with stark editorial rhythm and a lightweight content structure.',
    result: '4 week launch',
    href: '#',
    className: 'md:col-span-1 min-h-[260px]',
  },
  {
    number: '04',
    title: 'Kinetic Build',
    category: 'Web design / Development',
    year: '2025',
    description: 'A portfolio system for a construction company that turns project proof into a clear sales argument.',
    result: '+18% inquiry rate',
    href: '#',
    className: 'md:col-span-2 min-h-[340px]',
  },
  {
    number: '05',
    title: 'Core CMS',
    category: 'CMS architecture',
    year: '2026',
    description: 'A small editorial CMS demo designed to show clients how structured content changes daily work.',
    result: 'Self-editable pages',
    href: '#',
    className: 'md:col-span-1 min-h-[340px]',
  },
]

type CaseStudy = (typeof caseStudies)[number]

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article
      className={`group flex flex-col justify-between border-b border-r border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-colors duration-200 hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] ${study.className}`}
    >
      <div className="flex items-start justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.24em]">
        <span>{study.number}</span>
        <span>{study.year}</span>
      </div>

      <div className="mt-16">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-bg)]">
          {study.category}
        </p>
        <h2 className="font-serif font-black text-[clamp(32px,4vw,64px)] uppercase leading-[0.95] tracking-tight">
          {study.title}
        </h2>
        <p className="mt-6 max-w-[38ch] text-[13px] leading-relaxed text-[var(--color-muted)] transition-colors duration-200 group-hover:text-[var(--color-bg)]">
          {study.description}
        </p>
      </div>

      <div className="mt-12 flex items-center justify-between gap-6 border-t border-[var(--color-border)] pt-5 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors duration-200 group-hover:border-[var(--color-bg)]">
        <span>{study.result}</span>
        <a
          href={study.href}
          aria-label={`View ${study.title} website`}
          className="shrink-0 transition-opacity duration-200 hover:opacity-60"
        >
          View site <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

export function PortfolioPage() {
  const featuredStudies = caseStudies.slice(0, 3)
  const remainingStudies = caseStudies.slice(3)

  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="px-8 py-14 border-b border-[var(--color-border)]">
        <h1 className="font-serif font-black uppercase text-[54px] leading-[1] tracking-tight">SELECTED WORKS</h1>
        <p className="mt-6 text-[var(--color-muted)] text-[13px] max-w-[64ch] leading-relaxed">
          A catalog of structural permanence. Pure form, uncompromised geometry, and the stark reality of concrete and
          steel.
        </p>
      </section>

      <section className="grid grid-cols-1 border-l border-t border-[var(--color-border)] md:grid-cols-3">
        {featuredStudies.map((study) => (
          <CaseStudyCard key={study.number} study={study} />
        ))}

        <div className="flex min-h-[340px] items-center border-b border-r border-[var(--color-border)] bg-[var(--color-bg)] p-8 md:col-span-2">
          <p className="font-serif font-black text-[clamp(40px,6vw,92px)] uppercase leading-[0.9] tracking-tight">
            FORM
            <br />
            FOLLOWS
            <br />
            RESULTS.
          </p>
        </div>

        {remainingStudies.map((study) => (
          <CaseStudyCard key={study.number} study={study} />
        ))}
      </section>
    </div>
  )
}

