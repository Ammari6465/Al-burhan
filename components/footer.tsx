'use client'

import {
  MapPin,
  Mail,
  Phone,
} from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-16 sm:mt-20 px-4 sm:px-6 pb-6">
      {/* Floating Glass Footer */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-red-500/5 pointer-events-none" />

        <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-8 sm:py-12">

          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">

            {/* Brand */}
            <div className="flex flex-col items-center text-center">
              <img
                src="/logo.png"
                alt="AL-BURHAN Industrial Drives"
                className="h-24 sm:h-24 md:h-28 w-auto max-w-none object-contain scale-[1.4] sm:scale-[1.1] origin-center"
              />

              <p className="mt-5 text-slate-600 leading-relaxed text-sm max-w-sm mx-auto">
                Premium industrial components trusted by businesses
                across India for over 20 years.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">
                Quick Links
              </h4>

              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group relative inline-block text-[15px] font-semibold text-slate-700 transition-all duration-300 hover:text-blue-600"
                    >
                      {link.name}

                      {/* Hover Underline */}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-blue-600 to-red-500 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">
                Contact
              </h4>

              <div className="space-y-5">

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-red-500 text-white shadow-lg">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 mb-1">
                      Address
                    </p>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      109/111 Nagdevi Street,
                      <br />
                      Mumbai 400003
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-red-500 text-white shadow-lg">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 mb-1">
                      Email
                    </p>

                    <a
                      href="mailto:alburhanind.drives@gmail.com"
                      className="text-slate-600 text-sm hover:text-blue-600 transition-colors"
                    >
                      alburhanind.drives@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-red-500 text-white shadow-lg">
                    <Phone size={18} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900 mb-1">
                      Phone
                    </p>

                    <a
                      href="tel:+919819036787"
                      className="text-slate-600 text-sm hover:text-blue-600 transition-colors"
                    >
                      +91 98190 36787
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Google Map */}
          <div className="mt-8 sm:mt-10 overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15094.19073479426!2d72.81480185687545!3d18.951404827656734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce2540b220cd%3A0xcb8075dba5dd428!2sAL-BURHAN%20INDUSTRIAL%20DRIVES!5e0!3m2!1sen!2sin!4v1778271312424!5m2!1sen!2sin"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          {/* Bottom */}
          <div className="mt-8 sm:mt-10 border-t border-slate-200 pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

            <p className="text-sm text-slate-500">
              © {currentYear} AL-BURHAN Industrial Drives.
              All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}