'use client'

import BrandLogo from '@/components/brand-logo'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

const productCategories = [
  { name: 'Pulleys', href: '#products-pulleys' },
  { name: 'Couplings', href: '#products-couplings' },
  { name: 'Gears', href: '#products-gears' },
  { name: 'Sprockets', href: '#products-sprockets' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('#home')
  const hoverTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash || '#home')

    updateHash()
    window.addEventListener('hashchange', updateHash)

    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const scheduleDropdownOpen = (open: boolean) => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current)
    }

    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(open)
    }, 100)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[64px] border-b border-[#E8ECF0] bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)] lg:h-[72px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[64px] items-center justify-between gap-4 lg:h-[72px]">
          <a href="#home" className="flex items-center shrink-0" aria-label="AL-BURHAN Industrial Drives home">
            <BrandLogo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) =>
              link.name === 'Products' ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => scheduleDropdownOpen(true)}
                  onMouseLeave={() => scheduleDropdownOpen(false)}
                >
                  <a
                    href={link.href}
                    data-active={activeHash === link.href}
                    className="nav-underline inline-flex items-center gap-1 font-ui text-[14px] font-medium tracking-[0.02em] text-[#4A5568] transition hover:text-[#0A3D62]"
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </a>

                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full z-50 pt-3">
                      <div className="w-[220px] rounded-2xl border border-[#E8ECF0] bg-white p-2 shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                        {productCategories.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between rounded-xl px-4 py-3 font-ui text-sm font-medium text-[#4A5568] transition hover:bg-[#F5F7FA] hover:text-[#0A3D62]"
                          >
                            {item.name}
                            <ArrowRight size={14} className="text-[#C0392B]" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  data-active={activeHash === link.href}
                  className="nav-underline font-ui text-[14px] font-medium tracking-[0.02em] text-[#4A5568] transition hover:text-[#0A3D62]"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-lg bg-[#C0392B] px-5 py-2.5 font-ui text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(192,57,43,0.25)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#a83429] hover:shadow-[0_4px_20px_rgba(192,57,43,0.4)] lg:inline-flex"
            >
              Request a Quote
            </a>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8ECF0] bg-white text-[#0A3D62] lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-[#E8ECF0] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] lg:hidden">
            <nav className="flex flex-col gap-1">
              {navigationLinks.map((link) =>
                link.name === 'Products' ? (
                  <div key={link.name} className="rounded-2xl border border-[#E8ECF0] bg-[#F5F7FA] px-1 py-1">
                    <button
                      type="button"
                      onClick={() => setIsMobileProductsOpen((current) => !current)}
                      className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3.5 text-left font-ui text-[14px] font-medium text-[#4A5568]"
                    >
                      <span>Products</span>
                      <ChevronDown size={15} className={`transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMobileProductsOpen && (
                      <div className="mt-2 rounded-2xl bg-white p-2">
                        {productCategories.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3.5 font-ui text-[14px] text-[#4A5568] transition hover:bg-[#F5F7FA] hover:text-[#0A3D62] active:scale-[0.98]"
                          >
                            {item.name}
                            <ArrowRight size={14} className="text-[#C0392B]" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-4 py-3.5 font-ui text-[14px] font-medium text-[#4A5568] transition hover:bg-[#F5F7FA] hover:text-[#0A3D62] active:scale-[0.98]"
                  >
                    {link.name}
                  </a>
                )
              )}

              <a
                href="#contact"
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#C0392B] px-4 py-3.5 font-ui text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(192,57,43,0.25)] transition hover:bg-[#a83429]"
                onClick={() => setIsOpen(false)}
              >
                Request a Quote
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}