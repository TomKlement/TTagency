import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { scrollDocumentToTop, useLenis } from '../motion/useLenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BrandMark } from '../brand/BrandMark'

const navItems = [
  { to: '/', key: 'common.nav.home' },
  { to: '/portfolio', key: 'common.nav.portfolio' },
  { to: '/cms-demo', key: 'common.nav.cmsDemo' },
  { to: '/pricing', key: 'common.nav.pricing' },
] as const

const mobileMenuItems = [
  ...navItems,
  { to: '/contact', key: 'common.nav.contact' },
] as const

const headerControlClass =
  'border border-[var(--color-border)] px-3 py-2 text-center uppercase tracking-[0.18em] text-[10px] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]'

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'px-3 py-1 uppercase tracking-[0.18em] text-[11px] border border-transparent',
          isActive
            ? 'bg-[var(--color-text)] text-[var(--color-bg)] font-semibold'
            : 'text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]',
        ].join(' ')
      }
      end={to === '/'}
    >
      {label}
    </NavLink>
  )
}

function MobileNavItem({ to, label, onNavigate }: { to: string; label: string; onNavigate: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'block px-8 py-6 uppercase tracking-[0.2em] text-[13px] font-semibold transition-colors motion-reduce:transition-none',
          isActive
            ? 'bg-[var(--color-text)] text-[var(--color-bg)]'
            : 'text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]',
        ].join(' ')
      }
      end={to === '/'}
    >
      {label}
    </NavLink>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  useLenis()
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    }
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    scrollDocumentToTop({ immediate: true })
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [location.pathname])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('theme', next)
      return next
    })
  }

  const toggleLanguage = () => {
    const next = i18n.language === 'cs' ? 'en' : 'cs'
    void i18n.changeLanguage(next)
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div data-theme={theme} className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)]">
      <header
        className={[
          'sticky top-0 border-b border-[var(--color-border)] bg-[var(--color-bg)]',
          mobileMenuOpen ? 'z-[70]' : 'z-50',
        ].join(' ')}
      >
        <nav className="flex items-center justify-between gap-3 px-4 py-5 sm:px-8 sm:py-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <BrandMark to="/" className="font-serif text-[16px] tracking-tight font-black sm:text-[18px]" />
            <button
              type="button"
              onClick={toggleLanguage}
              className={['w-[74px] shrink-0', headerControlClass].join(' ')}
              aria-label={t('common.language.label')}
            >
              {i18n.language === 'cs' ? t('common.language.cs') : t('common.language.en')}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((it) => (
              <NavItem key={it.to} to={it.to} label={t(it.key)} />
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className={['min-w-[74px] shrink-0 px-3 md:hidden', headerControlClass].join(' ')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? t('common.nav.menuClose') : t('common.nav.menuOpen')}
            >
              {mobileMenuOpen ? t('common.nav.menuClose') : t('common.nav.menuOpen')}
            </button>
            <Link
              to="/contact"
              className="hidden md:inline-flex px-6 py-2 uppercase tracking-[0.18em] text-[11px] border border-[var(--color-border)] bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
            >
              {t('common.cta.getInTouch')}
            </Link>
          </div>
        </nav>
      </header>

      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileMenuOpen}
        className={[
          'fixed inset-x-0 bottom-0 top-[65px] z-[60] flex flex-col bg-[var(--color-bg)] md:hidden',
          'transition-[opacity,visibility] duration-300 motion-reduce:transition-none',
          mobileMenuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
        ].join(' ')}
      >
        <nav className="flex flex-1 flex-col justify-center px-4 pb-8 sm:px-8">
          <div className="border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
            {mobileMenuItems.map((it) => (
              <MobileNavItem
                key={it.to}
                to={it.to}
                label={t(it.key)}
                onNavigate={closeMobileMenu}
              />
            ))}
          </div>
        </nav>
      </div>

      <main>{children}</main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <BrandMark to="/" className="font-serif text-[14px] tracking-tight font-black" />
          <div className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)] text-center">
            © {new Date().getFullYear()} {t('brand.name')}. ALL RIGHTS RESERVED.
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={['w-[74px]', headerControlClass].join(' ')}
          >
            {theme === 'dark' ? t('common.theme.light') : t('common.theme.dark')}
          </button>
        </div>
      </footer>
    </div>
  )
}
