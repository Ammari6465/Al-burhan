'use client'

import BrandLogo from '@/components/brand-logo'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { useState } from 'react'

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[rgba(8,28,46,0.85)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4 py-4 lg:min-h-[72px]">
          <a href="#home" className="flex items-center shrink-0" aria-label="AL-BURHAN Industrial Drives home">
            <BrandLogo className="shrink-0" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navigationLinks.map((link) =>
              link.name === 'Products' ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 text-[13px] font-medium tracking-[0.02em] text-white/65 transition hover:text-white"
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </a>

                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full z-50 pt-3">
                      <div className="w-60 rounded-2xl border border-white/10 bg-[#0D1F2F] p-2 shadow-xl shadow-black/30">
                        {productCategories.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
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
                  className="text-[13px] font-medium tracking-[0.02em] text-white/65 transition hover:text-white"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-glow hidden items-center gap-2 rounded-lg bg-[#C0392B] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:-translate-y-[1px] hover:bg-[#a83429] lg:inline-flex"
            >
              Request a Quote
            </a>

            <button
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-white/6 bg-[rgba(8,28,46,0.97)] px-4 py-4 backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-1 pb-2">
              {navigationLinks.map((link) =>
                link.name === 'Products' ? (
                  <div key={link.name} className="rounded-2xl border border-white/8 bg-white/4 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setIsMobileProductsOpen((current) => !current)}
                      className="flex h-12 w-full items-center justify-between rounded-xl text-left text-sm font-medium text-white"
                    >
                      <span>Products</span>
                      <ChevronDown size={15} className={`transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isMobileProductsOpen && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {productCategories.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex min-h-12 items-center justify-between rounded-xl border border-white/8 bg-white/4 px-3 py-3 text-sm text-white/75 transition active:scale-95"
                          >
                            {item.name}
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
                    className="flex min-h-12 items-center rounded-xl px-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                  >
                    {link.name}
                  </a>
                )
              )}

              <a
                href="#contact"
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#C0392B] px-4 py-3 text-sm font-semibold text-white"
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