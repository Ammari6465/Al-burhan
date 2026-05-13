'use client'

import BrandLogo from '@/components/brand-logo'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'

const productLinks = [
  { name: 'Pulleys', href: '#products' },
  { name: 'Couplings', href: '#products' },
  { name: 'Gears', href: '#products' },
  { name: 'Sprockets', href: '#products' },
  { name: 'All Products', href: '#products' },
]

const companyLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Contact', href: '#contact' },
]

const socialIcons = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative bg-[#0A3D62] text-white overflow-hidden"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.05) 30px, rgba(255,255,255,0.05) 31px)`,
        borderTop: '1px solid rgba(192, 57, 43, 0.4)',
      }}
    >
      <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-20" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        {/* Main Footer Grid */}
        <div className="grid gap-12 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            {/* White Card Container */}
            <a href="#home" aria-label="AL-BURHAN Industrial Drives home" className="relative z-20">
              <div
                className="bg-white rounded-[10px] p-7 inline-flex items-center justify-center"
                style={{
                  maxWidth: '240px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.18), 0 1px 4px rgba(0,0,0,0.10)',
                }}
              >
                <div style={{ maxWidth: '180px', width: '100%' }}>
                  <BrandLogo />
                </div>
              </div>
            </a>

            {/* Divider */}
            <div className="w-8 h-px bg-[#E0E0E0] mt-3 mb-3" />

            {/* Tagline */}
            <p
              className="text-center text-[#555555] uppercase"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '0.10em',
              }}
            >
              Premium Power Transmission — Pan India
            </p>

            {/* Est. Line */}
            <p
              className="mt-3.5 text-center"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              Est. 1999 · Mumbai, India
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5 justify-center md:justify-start">
              {socialIcons.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-[0.25s]"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(192,57,43,0.15)'
                    e.currentTarget.style.borderColor = '#C0392B'
                    e.currentTarget.style.color = '#C0392B'
                    e.currentTarget.style.boxShadow = '0 0 14px rgba(192,57,43,0.45)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                    e.currentTarget.style.color = '#FFFFFF'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div className="flex flex-col items-center md:items-start">
            <h4
              className="uppercase text-white mb-5"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.14em',
                borderBottom: '2px solid #C0392B',
                paddingBottom: '8px',
                width: 'fit-content',
              }}
            >
              Products
            </h4>
            <ul className="space-y-0 w-full text-center md:text-left">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-block py-2 transition-all duration-[0.22s] ease-out"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.72)',
                      lineHeight: '2.2',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF'
                      e.currentTarget.style.paddingLeft = '8px'
                      e.currentTarget.style.borderLeft = '2px solid #C0392B'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)'
                      e.currentTarget.style.paddingLeft = '0px'
                      e.currentTarget.style.borderLeft = 'none'
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col items-center md:items-start">
            <h4
              className="uppercase text-white mb-5"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.14em',
                borderBottom: '2px solid #C0392B',
                paddingBottom: '8px',
                width: 'fit-content',
              }}
            >
              Company
            </h4>
            <ul className="space-y-0 w-full text-center md:text-left">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-block py-2 transition-all duration-[0.22s] ease-out"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.72)',
                      lineHeight: '2.2',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF'
                      e.currentTarget.style.paddingLeft = '8px'
                      e.currentTarget.style.borderLeft = '2px solid #C0392B'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)'
                      e.currentTarget.style.paddingLeft = '0px'
                      e.currentTarget.style.borderLeft = 'none'
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-start">
            <h4
              className="uppercase text-white mb-5"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.14em',
                borderBottom: '2px solid #C0392B',
                paddingBottom: '8px',
                width: 'fit-content',
              }}
            >
              Contact
            </h4>

            <div className="space-y-3 w-full text-center md:text-left">
              {/* Phone */}
              <div className="flex items-start gap-2.5 justify-center md:justify-start">
                <Phone size={14} className="shrink-0 text-[#C0392B] mt-1" />
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  +91 98190 36787
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5 justify-center md:justify-start">
                <Mail size={14} className="shrink-0 text-[#C0392B] mt-1" />
                <a
                  href="mailto:alburhanind.drives@gmail.com"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                  className="transition-colors duration-[0.22s] hover:text-white"
                >
                  alburhanind.drives@gmail.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5 justify-center md:justify-start">
                <MapPin size={14} className="shrink-0 text-[#C0392B] mt-1" />
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: '1.6',
                  }}
                >
                  109/111 Nagdevi Street,
                  <br />
                  Mumbai 400003, Maharashtra
                </p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/919819036787?text=${encodeURIComponent('Hi AL-BURHAN, I would like a quote for industrial drives.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center px-5 py-2.5 bg-[#25D366] text-white rounded transition-all duration-[0.25s] hover:shadow-lg"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1EBE57'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#25D366'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.10)',
            marginTop: '48px',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left"
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            © {currentYear} AL-BURHAN Industrial Drives. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
            <a
              href="#"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
              }}
              className="transition-colors duration-[0.22s] hover:text-[#C0392B]"
            >
              Privacy Policy
            </a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <a
              href="#"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
              }}
              className="transition-colors duration-[0.22s] hover:text-[#C0392B]"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}