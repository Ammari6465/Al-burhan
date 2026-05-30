'use client'

import BrandLogo from '@/components/brand-logo'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

const companyLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-shell pt-12 text-white sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="grid items-start gap-10 sm:gap-12 md:grid-cols-2 xl:grid-cols-3">
          <div className="min-w-0">
            <div className="relative inline-flex max-w-full">
              <a href="#home" aria-label="AL-BURHAN home" className="inline-flex">
                <div className="rounded-xl bg-white px-6 py-5 shadow-[0_18px_42px_rgba(0,0,0,0.18)] sm:px-8 sm:py-6">
                  <BrandLogo large />
                </div>
              </a>
              <a
                href="https://wa.me/919819036787?text=Hi%20AL-BURHAN,%20I%20would%20like%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-fab"
                aria-label="WhatsApp inquiry"
              >
                <MessageCircle size={20} />
                <span className="hidden font-ui text-[14px] font-semibold text-white sm:inline">Chat on WhatsApp</span>
              </a>
            </div>
            <p className="mt-4 max-w-[320px] text-[13px] leading-7 text-white/72 sm:max-w-[360px]">
              Premium power transmission products for OEMs and industrial buyers across India.
            </p>
            <p className="mt-3 text-[12px] text-white/42">Est. 1999 | Mumbai, India</p>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-bold uppercase tracking-[0.24em] text-white/82">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 md:col-span-2 xl:col-span-1">
            <h4 className="text-[0.78rem] font-bold uppercase tracking-[0.24em] text-white/82">Contact Info</h4>
            <div className="mt-5 space-y-4 text-[14px] text-white/76 sm:text-base">
              <div className="flex items-start gap-3">
                <Phone size={14} className="mt-1 shrink-0 text-[#ff6b00]" />
                <a href="tel:+919819036787" className="footer-link break-all">
                  +91 98190 36787
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="mt-1 shrink-0 text-[#ff6b00]" />
                <a href="mailto:alburhanind.drives@gmail.com" className="footer-link break-all">
                  alburhanind.drives@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-1 shrink-0 text-[#ff6b00]" />
                <p className="leading-7">109/111 Nagdevi Street, Mumbai 400003, Maharashtra</p>
              </div>
            </div>

            <a
              href={`https://wa.me/919819036787?text=${encodeURIComponent('Hi AL-BURHAN, I would like a quote for industrial drives.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-action mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-3 text-[13px] font-bold sm:w-auto"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 py-5 sm:mt-12 md:flex md:items-center md:justify-between">
          <p className="text-center text-[12px] text-white/46 md:text-left">
            Copyright {currentYear} AL-BURHAN Industrial Drives. All rights reserved.
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-[12px] text-white/46 md:mt-0 md:justify-start">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
