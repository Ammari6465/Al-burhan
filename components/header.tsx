'use client'

import BrandLogo from '@/components/brand-logo'
import { ArrowRight, ChevronDown, Menu, X, Settings2 } from 'lucide-react'
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-7xl overflow-visible rounded-[1.15rem] border border-white/40 bg-white/88 backdrop-blur-xl shadow-[0_8px_28px_rgba(10,24,38,0.08)]">
        <div className="absolute inset-0 rounded-[1.15rem] bg-gradient-to-r from-[#0A3D62]/5 via-transparent to-[#C0392B]/5 pointer-events-none" />

        {/* Main nav row */}
        <div className="relative z-10 flex h-20 items-center justify-between gap-4 px-3 sm:h-24 sm:px-5 lg:px-6">
          <a href="#home" className="flex h-full items-center shrink-0">
            <BrandLogo compact className="shrink-0" />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-6">
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
                    className="inline-flex items-center gap-1 text-[0.92rem] font-medium text-slate-700 transition hover:text-[#0A3D62]"
                  >
                    {link.name}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </a>

                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full pt-3 z-50">
                      <div className="w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                        {productCategories.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-[#0A3D62]"
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
                  className="text-[0.92rem] font-medium text-slate-700 transition hover:text-[#0A3D62]"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#C0392B] px-4 py-2 text-[0.88rem] font-semibold text-white shadow-lg shadow-[#C0392B]/20 transition hover:-translate-y-0.5 hover:bg-[#a83429]"
            >
              Request a Quote
            </a>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl lg:hidden rounded-b-[1.15rem]">
            <nav className="flex flex-col gap-1">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0A3D62]"
                >
                  {link.name}
                </a>
              ))}

              <div className="mt-2 rounded-2xl bg-slate-50 p-3">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Products
                </p>
                <div className="grid gap-1">
                  {productCategories.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-white hover:text-[#0A3D62]"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-[#C0392B] px-4 py-3 text-sm font-semibold text-white"
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
