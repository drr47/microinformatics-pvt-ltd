'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/ThemeContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Genomics', href: '/genomics' },
  { name: 'AI & ML', href: '/ai-ml' },
  { name: 'AI Center', href: '/ai-center' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const dropdownItems = [
  { name: 'Student Portal', href: '/portal' },
  { name: 'Login', href: '/login' },
  { name: 'Apply for Internship', href: '/courses#internship' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="flex items-center gap-2" aria-label="Microinformatics Home">
              <div className="relative">
                <img src="/microinformatics_cover.jpg" alt="Microinformatics" className="h-9 w-9 rounded-full object-cover" />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
                Microinformatics
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                    pathname === item.href
                      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="lg:hidden"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <div className="relative hidden lg:block">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="gap-1 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>Portal</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', dropdownOpen && 'rotate-180')} />
              </Button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Button
              variant="gradient"
              size="md"
              className="hidden lg:inline-flex"
              asChild
            >
              <Link href="/courses#apply">Get Started</Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="hidden lg:flex"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <button
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-200 dark:border-slate-700',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
              {dropdownItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 flex items-center justify-between">
              <Button variant="gradient" className="w-full sm:w-auto" asChild>
                <Link href="/courses#apply">Get Started</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="lg:hidden">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}