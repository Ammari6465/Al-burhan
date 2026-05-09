'use client'

import {
  Menu,
  X,
  Cog,
  Wrench,
  Gauge,
  Cpu,
  Zap,
  Settings2,
} from 'lucide-react'
import { useState } from 'react'

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 sm:pt-4">

        {/* Compact Floating Navbar */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/20 bg-white/65 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-red-500/5 pointer-events-none" />

          {/* Soft Background Glow */}
          <div className="absolute -left-10 top-0 hidden h-32 w-32 rounded-full bg-blue-500/10 blur-3xl sm:block" />
          <div className="absolute right-0 top-0 hidden h-32 w-32 rounded-full bg-red-500/10 blur-3xl sm:block" />

          {/* Floating Lucide Elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <Cog
              size={72}
              className="absolute -left-4 top-[-18px] text-blue-600/10 animate-floatSlow sm:size-[90px]"
            />

            <Wrench
              size={54}
              className="absolute left-[22%] top-[2px] text-red-500/10 animate-floatMedium sm:size-[70px]"
            />

            <Gauge
              size={60}
              className="absolute right-[20%] top-[-12px] text-blue-500/10 animate-floatFast sm:size-[80px]"
            />

            <Cpu
              size={58}
              className="absolute right-[-10px] top-[4px] text-red-500/10 animate-floatSlow sm:size-[75px]"
            />

            <Zap
              size={50}
              className="absolute left-[50%] top-[6px] text-blue-500/10 animate-floatMedium sm:size-[65px]"
            />

            <Settings2
              size={54}
              className="absolute left-[70%] top-[8px] text-red-500/10 animate-floatFast sm:size-[70px]"
            />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-3 px-3 sm:px-6 lg:px-8 py-2 sm:py-3">

            {/* Logo - Mobile responsive */}
            <div className="flex items-center overflow-visible">
              <img
                src="/logo.png"
                alt="AL-BURHAN Industrial Drives"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain scale-[1.45] sm:scale-[2.05] md:scale-[2.8] lg:scale-[3.6] origin-left"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative text-sm lg:text-[15px] font-semibold text-slate-700 transition-all duration-300 hover:text-blue-600"
                >
                  {link.name}

                  {/* Hover Underline */}
                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-blue-600 to-red-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/80 shadow-sm flex-shrink-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={18} className="text-slate-800" />
              ) : (
                <Menu size={18} className="text-slate-800" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="border-t border-slate-200/50 bg-white/80 backdrop-blur-xl lg:hidden">
              <nav className="flex flex-col gap-1 px-3 sm:px-5 py-3 sm:py-5">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Floating Animations */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(4deg);
          }
        }

        @keyframes floatMedium {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-4deg);
          }
        }

        @keyframes floatFast {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(6deg);
          }
        }

        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }

        .animate-floatMedium {
          animation: floatMedium 5s ease-in-out infinite;
        }

        .animate-floatFast {
          animation: floatFast 4s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}