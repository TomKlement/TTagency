import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisSingleton: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisSingleton
}

/** Prefer this over window.scrollTo when Lenis is active (SPA route changes, etc.). */
export function scrollDocumentToTop(options?: { immediate?: boolean }) {
  const lenis = lenisSingleton
  const immediate = options?.immediate ?? true
  if (lenis) {
    lenis.scrollTo(0, { immediate })
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' })
  }
}

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    })
    lenisSingleton = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerFn)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
      lenisSingleton = null
      ScrollTrigger.refresh()
    }
  }, [])
}

