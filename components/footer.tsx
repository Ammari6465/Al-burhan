'use client'

import BrandLogo from '@/components/brand-logo'
import { Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 px-4 pb-6 sm:mt-20 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0A3D62] text-white shadow-[0_20px_60px_rgba(10,24,38,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(192,57,43,0.18),transparent_25%)]" />

        <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.9fr]">
            <div className="space-y-5">
              <BrandLogo compact inverse />
              <p className="max-w-md text-sm leading-7 text-white/78">
                Premium industrial and power transmission products for manufacturers, maintenance teams, and distributors across India.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold">Quick Links</h4>
              <ul className="mt-5 space-y-3 text-sm text-white/80">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="transition hover:text-white">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold">Contact</h4>
              <div className="mt-5 space-y-4 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-[#F5F5F5]" />
                  <p>
                    109/111 Nagdevi Street,
                    <br />
                    Mumbai 400003
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="mt-1 shrink-0 text-[#F5F5F5]" />
                  <a href="mailto:alburhanind.drives@gmail.com" className="transition hover:text-white">
                    alburhanind.drives@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-1 shrink-0 text-[#F5F5F5]" />
                  <a href="tel:+919819036787" className="transition hover:text-white">
                    +91 98190 36787
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-center text-sm text-white/70 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© {currentYear} AL-BURHAN Industrial Drives. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-5 md:justify-end">
              <a href="#" className="transition hover:text-white">Privacy Policy</a>
              <a href="#" className="transition hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}