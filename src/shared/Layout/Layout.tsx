import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLenis } from '../motion/useLenis'
import { BrandMark } from '../brand/BrandMark'

const navItems = [
  { to: '/', key: 'common.nav.home' },
  { to: '/portfolio', key: 'common.nav.portfolio' },
  { to: '/cms-demo', key: 'common.nav.cmsDemo' },
  { to: '/pricing', key: 'common.nav.pricing' },
] as const

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

export function Layout({ children }: { children: ReactNode }) {
  useLenis()
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

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
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

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

  return (
    <div data-theme={theme} className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <nav className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3">
            <BrandMark to="/" className="font-serif text-[18px] tracking-tight font-black" />
            <button
              type="button"
              onClick={toggleLanguage}
              className="w-[74px] border border-[var(--color-border)] px-3 py-2 text-center uppercase tracking-[0.18em] text-[10px] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
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

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-2 uppercase tracking-[0.18em] text-[11px] border border-[var(--color-border)] bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
            >
              {t('common.cta.getInTouch')}
            </Link>
          </div>
        </nav>
      </header>

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
            className="w-[74px] border border-[var(--color-border)] px-3 py-2 text-center uppercase tracking-[0.18em] text-[10px] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
          >
            {theme === 'dark' ? t('common.theme.light') : t('common.theme.dark')}
          </button>
        </div>
      </footer>
    </div>
  )
}

