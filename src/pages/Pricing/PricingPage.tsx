export function PricingPage() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <main className="max-w-[1440px] mx-auto border-x border-[var(--color-border)]">
        <section className="border-b border-[var(--color-border)] px-12 md:px-24 py-28 min-h-[410px] flex flex-col justify-center">
          <h1 className="font-serif font-black uppercase text-[clamp(44px,6vw,72px)] leading-[1] tracking-tight">
            THE COST OF PRECISION.
          </h1>
          <p className="mt-8 text-[var(--color-muted)] text-[18px] max-w-[780px] leading-relaxed">
            Structured logic. No ornamental bloat. Select the architectural framework that scales with your operational
            demands.
          </p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 border-b border-[var(--color-border)]">
        <article className="p-12 md:p-14 min-h-[620px] flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
          <div className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">Essential</div>
          <div className="mt-12 font-serif font-black text-[52px]">$4,000</div>
          <p className="mt-5 text-[14px] leading-relaxed max-w-[44ch]">
            Foundational architecture for establishing initial digital presence.
          </p>
          <div className="mt-12 space-y-0 text-[15px] flex-1">
            <div className="border-t border-[var(--color-soft)] py-4">5 Core Templates</div>
            <div className="border-t border-[var(--color-soft)] py-4">Standard Component Library</div>
            <div className="border-t border-[var(--color-soft)] py-4">Static Content Delivery</div>
            <div className="border-t border-[var(--color-soft)] py-4">—</div>
          </div>
          <button className="mt-12 w-full h-14 uppercase tracking-[0.18em] text-[10px] border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]">
            Initialize
          </button>
        </article>

        <article className="p-12 md:p-14 min-h-[620px] flex flex-col bg-[var(--color-text)] text-[var(--color-bg)] border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
          <div className="uppercase tracking-[0.18em] text-[10px] opacity-55">Advanced</div>
          <div className="mt-12 font-serif font-black text-[52px]">$8,500</div>
          <p className="mt-5 text-[14px] leading-relaxed max-w-[44ch] opacity-80">
            Comprehensive systematic design for evolving operational structures.
          </p>
          <div className="mt-12 space-y-0 text-[15px] flex-1">
            <div className="border-t border-current/25 py-4">15 Advanced Templates</div>
            <div className="border-t border-current/25 py-4">Dynamic Component Library</div>
            <div className="border-t border-current/25 py-4">Headless CMS Integration</div>
            <div className="border-t border-current/25 py-4">Automated Workflow Logic</div>
          </div>
          <button className="mt-12 w-full h-14 uppercase tracking-[0.18em] text-[10px] bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-bg)]">
            Deploy system
          </button>
        </article>

        <article className="p-12 md:p-14 min-h-[620px] flex flex-col">
          <div className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">Monumental</div>
          <div className="mt-12 font-serif font-black text-[52px]">$15,000+</div>
          <p className="mt-5 text-[14px] leading-relaxed max-w-[44ch]">
            Absolute structural dominance. Bespoke engineering for enterprise scale.
          </p>
          <div className="mt-12 space-y-0 text-[15px] flex-1">
            <div className="border-t border-[var(--color-soft)] py-4">Unlimited Templates</div>
            <div className="border-t border-[var(--color-soft)] py-4">Custom Design System</div>
            <div className="border-t border-[var(--color-soft)] py-4">Dedicated API Gateways</div>
            <div className="border-t border-[var(--color-soft)] py-4">24/7 Priority Architecture Support</div>
          </div>
          <button className="mt-12 w-full h-14 uppercase tracking-[0.18em] text-[10px] border border-[var(--color-border)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]">
            Request blueprint
          </button>
        </article>
      </section>

        <section className="px-12 md:px-24 py-24 border-b border-[var(--color-border)]">
          <h2 className="font-serif font-black uppercase text-[52px] tracking-tight">SPECIFICATIONS.</h2>
        </section>

      <section>
        <div className="overflow-x-auto">
          <div className="min-w-[820px]">
          <div className="grid grid-cols-4 border-b border-[var(--color-border)] uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">
            <div className="p-6 border-r border-[var(--color-soft)]">Feature</div>
            <div className="p-6 border-r border-[var(--color-soft)] text-center">Essential</div>
            <div className="p-6 border-r border-[var(--color-soft)] text-center">Advanced</div>
            <div className="p-6 text-center">Monumental</div>
          </div>

          {[
            ['Custom Domains', '1', '3', 'Unlimited'],
            ['API Rate Limit', '—', '10k / day', '1M+ / day'],
            ['Version Control Access', '×', 'Read-Only', 'Full Access'],
            ['Dedicated Engineer', '×', '×', '✓'],
          ].map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-4 border-b border-[var(--color-border)] last:border-b-0 text-[14px] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-none"
            >
              <div className="p-6 border-r border-[var(--color-soft)]">{row[0]}</div>
              <div className="p-6 border-r border-[var(--color-soft)] text-center">{row[1]}</div>
              <div className="p-6 border-r border-[var(--color-soft)] text-center">{row[2]}</div>
              <div className="p-6 text-center">{row[3]}</div>
            </div>
          ))}
        </div>
        </div>
      </section>
      </main>
    </div>
  )
}

