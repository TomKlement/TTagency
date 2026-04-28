import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLenis } from '../motion/useLenis'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/cms-demo', label: 'CMS Demo' },
  { to: '/pricing', label: 'Pricing' },
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
  const location = useLocation()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = window.localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem('theme', next)
      return next
    })
  }

  return (
    <div data-theme={theme} className="min-h-dvh bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <nav className="flex items-center justify-between px-8 py-6">
          <Link to="/" className="font-serif text-[18px] tracking-tight font-black">
            AGENCY.
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((it) => (
              <NavItem key={it.to} to={it.to} label={it.label} />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-[74px] border border-[var(--color-border)] px-3 py-2 text-center uppercase tracking-[0.18em] text-[10px] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <Link
              to="/contact"
              className="px-6 py-2 uppercase tracking-[0.18em] text-[11px] border border-[var(--color-border)] bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]"
            >
              Get in touch
            </Link>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-serif text-[14px] tracking-tight font-black">ARCHITECT.</div>
          <div className="uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)] text-center">
            © {new Date().getFullYear()} ARCHITECT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 uppercase tracking-[0.18em] text-[10px] text-[var(--color-muted)]">
            <a className="hover:text-[var(--color-text)]" href="#">
              Privacy
            </a>
            <a className="hover:text-[var(--color-text)]" href="#">
              Terms
            </a>
            <a className="hover:text-[var(--color-text)]" href="#">
              Legal
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

