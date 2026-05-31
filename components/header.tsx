'use client'

import BrandLogo from '@/components/brand-logo'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('#home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1))

    const updateActiveSection = () => {
      setIsScrolled(window.scrollY > 80)

      const viewportMid = window.innerHeight * 0.45
      let currentHash = '#home'
      let closestDistance = Number.POSITIVE_INFINITY

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const { top, bottom } = element.getBoundingClientRect()
        const distance =
          viewportMid < top ? top - viewportMid : viewportMid > bottom ? viewportMid - bottom : 0

        if (distance < closestDistance) {
          closestDistance = distance
          currentHash = `#${id}`
        }
      }

      setActiveHash(currentHash)
    }

    const onHashChange = () => setActiveHash(window.location.hash || '#home')

    updateActiveSection()
    onHashChange()

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
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
    <header
      style={{ ['--header-height' as any]: '64px' }}
      className={`fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/96 backdrop-blur-md transition-all duration-200 sm:left-1/2 sm:right-auto sm:top-3 sm:w-[min(96%,1120px)] sm:-translate-x-1/2 sm:rounded-2xl sm:border sm:shadow-md ${isScrolled ? 'shadow-sm sm:top-2' : 'shadow-md'}`}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-18">
          <div className="flex min-w-0 items-center gap-4">
              <a href="#home" className="flex shrink-0 items-center" aria-label="AL-BURHAN Industrial Drives home">
              <BrandLogo className="origin-left scale-[1.4] sm:scale-[1.7] md:scale-[2.0] lg:scale-[2.3]" />
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

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
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
          <aside className="fixed right-0 top-0 z-[91] flex h-dvh w-[min(340px,90vw)] flex-col bg-[linear-gradient(180deg,#003366,#001f3d)] p-5 shadow-[-18px_0_45px_rgba(0,0,0,0.35)]">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <a href="#home" onClick={() => setDrawerOpen(false)} className="inline-flex min-w-[132px] items-center justify-center rounded-2xl bg-white px-5 py-3 ring-1 ring-white/10" aria-label="AL-BURHAN home">
                <BrandLogo className="origin-center scale-95" />
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
                  data-active={activeHash === link.href}
                  className="border-b border-white/8 py-4 text-[16px] font-semibold text-white/86 transition hover:text-white data-[active=true]:text-[#ff8a2a]"
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
