'use client'

import BrandLogo from '@/components/brand-logo'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('#home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80)
    const onHashChange = () => setActiveHash(window.location.hash || '#home')

    onScroll()
    onHashChange()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <header className={`fixed top-3 left-1/2 z-50 w-[min(96%,1100px)] -translate-x-1/2 transform rounded-xl bg-white/95 backdrop-blur-md transition-shadow duration-200 sm:top-6 ${isScrolled ? 'shadow-sm' : 'shadow-md'}`}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <div className="flex min-w-0 items-center gap-4">
            <a href="#home" className="flex shrink-0 items-center" aria-label="AL-BURHAN Industrial Drives home">
              <BrandLogo compact className="origin-left scale-[1.35] sm:scale-[1.85] lg:scale-[2.2]" />
            </a>
          </div>

          <nav className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center" aria-label="Primary">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} data-active={activeHash === link.href} className="nav-link-item text-slate-700">
                  {link.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {drawerOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[89] bg-black/50 backdrop-blur-[2px]"
            aria-label="Close navigation overlay"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="fixed right-0 top-0 z-[91] flex h-dvh w-[min(320px,88vw)] flex-col bg-[linear-gradient(180deg,#003366,#001f3d)] p-5 shadow-[-18px_0_45px_rgba(0,0,0,0.35)]">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <a href="#home" onClick={() => setDrawerOpen(false)} className="inline-flex min-w-[132px] items-center justify-center rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10" aria-label="AL-BURHAN home">
                <BrandLogo inverse className="origin-center scale-[1.7]" />
              </a>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 text-white"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className="border-b border-white/8 py-4 text-[16px] font-semibold text-white/86 transition hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  )
}
