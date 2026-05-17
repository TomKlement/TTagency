/** How the preview appears on card hover (default card stays text-only). */
export type CaseStudyPreviewMode = 'slide-wide' | 'slide-narrow' | 'fade-in'

export type CaseStudy = {
  number: string
  title: string
  category: string
  year: string
  description: string
  result: string
  href: string
  className: string
  /** Public URL (e.g. /portfolio/previews/...) - shown only on hover */
  previewSrc?: string
  /**
   * `cover` = wider strip sliding in from the right.
   * `corner` = narrower strip.
   * `fade-in` = full-bleed preview fades into the background on hover.
   */
  previewGhostLayout?: 'cover' | 'corner' | 'fade-in'
}
