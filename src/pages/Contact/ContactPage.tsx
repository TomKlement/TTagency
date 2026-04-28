export function ContactPage() {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="max-w-[1440px] mx-auto min-h-[760px] border-x border-[var(--color-border)] grid grid-cols-1 lg:grid-cols-12 px-10 md:px-20 py-28 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-7">
          <h1 className="font-serif font-black uppercase text-[clamp(58px,8vw,92px)] leading-[0.92] tracking-tight max-w-[760px]">
            HELLO@
            <br />
            VZN.STUDIO
          </h1>
          <p className="mt-10 text-[var(--color-muted)] text-[18px] leading-relaxed max-w-[560px]">
            Initiate contact. Strict requirements only. Fill out the manifest to commence communication sequence.
          </p>
        </div>

        <div className="lg:col-span-5">
          <form className="w-full max-w-[520px] ml-auto border border-[var(--color-border)] p-8 md:p-10">
            <div className="space-y-8">
              <div>
                <label className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]">
                  Identification
                </label>
                <input
                  className="mt-3 w-full bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] placeholder:text-[var(--color-muted)] uppercase tracking-[0.18em] text-[11px] py-3 px-0"
                  placeholder="YOUR NAME"
                />
              </div>
              <div>
                <label className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]">
                  Return Address
                </label>
                <input
                  className="mt-3 w-full bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] placeholder:text-[var(--color-muted)] uppercase tracking-[0.18em] text-[11px] py-3 px-0"
                  placeholder="EMAIL ADDRESS"
                />
              </div>
              <div>
                <label className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-muted)]">
                  Transmission Data
                </label>
                <textarea
                  rows={4}
                  className="mt-3 w-full resize-none bg-transparent border-0 border-b border-[var(--color-border)] focus:border-[var(--color-border)] focus:ring-0 text-[var(--color-text)] placeholder:text-[var(--color-muted)] uppercase tracking-[0.18em] text-[11px] py-3 px-0"
                  placeholder="ENTER MESSAGE"
                />
              </div>
            </div>

            <div className="mt-10">
              <button
                type="button"
                className="w-full h-14 uppercase tracking-[0.18em] text-[11px] border border-[var(--color-border)] bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
              >
                Transmit data
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

