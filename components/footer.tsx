'use client'

import BrandLogo from '@/components/brand-logo'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'

const productLinks = [
  { name: 'Pulleys', href: '#products' },
  { name: 'Couplings', href: '#products' },
  { name: 'Gears', href: '#products' },
  { name: 'Sprockets', href: '#products' },
]

const companyLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-shell pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="grid items-start gap-12 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <div className="relative inline-flex">
              <a href="#home" aria-label="AL-BURHAN home" className="inline-flex">
                <div className="rounded-[1.25rem] bg-white px-7 py-6 shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
                  <BrandLogo />
                </div>
              </a>
              <a
                href="https://wa.me/919819036787?text=Hi%20AL-BURHAN,%20I%20would%20like%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-fab"
                aria-label="WhatsApp inquiry"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path></svg>
                <span className="hidden sm:inline font-ui text-[14px] font-semibold text-white">Chat on WhatsApp</span>
              </a>
            </div>
            <p className="mt-4 max-w-[260px] text-[13px] leading-7 text-white/72">
              Premium power transmission products for OEMs and industrial buyers across India.
            </p>
            <p className="mt-3 text-[12px] text-white/42">Est. 1999 - Mumbai, India</p>

            <div className="mt-5 flex gap-3">
              {[
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="footer-social">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-bold uppercase tracking-[0.24em] text-white/82">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.78rem] font-bold uppercase tracking-[0.24em] text-white/82">Contact Info</h4>
            <div className="mt-5 space-y-4 text-white/76">
              <div className="flex items-start gap-3">
                <Phone size={14} className="mt-1 shrink-0 text-[#ff6b00]" />
                <p>+91 98190 36787</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="mt-1 shrink-0 text-[#ff6b00]" />
                <a href="mailto:alburhanind.drives@gmail.com" className="footer-link">
                  alburhanind.drives@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-1 shrink-0 text-[#ff6b00]" />
                <p>109/111 Nagdevi Street, Mumbai 400003, Maharashtra</p>
              </div>
            </div>

            <a
              href={`https://wa.me/919819036787?text=${encodeURIComponent('Hi AL-BURHAN, I would like a quote for industrial drives.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-action mt-5 inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-[13px] font-bold"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 py-5 md:flex md:items-center md:justify-between">
          <p className="text-center text-[12px] text-white/46 md:text-left">
            © {currentYear} AL-BURHAN Industrial Drives. All rights reserved.
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