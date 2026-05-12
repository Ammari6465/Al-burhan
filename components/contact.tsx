'use client'

import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'

const whatsappLink = 'https://wa.me/919819036787?text=Hi%20AL-BURHAN,%20I%20would%20like%20a%20quote'

export default function Contact() {

  return (
    <section id="contact" className="section-shell section-surface py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="section-kicker mb-4 text-sm font-semibold text-[#C0392B]">Contact</p>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl text-balance">
            Request a quote or reach our Mumbai office.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Use the form for direct inquiries, or contact us through WhatsApp for quicker coordination.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-5">
          <div className="industrial-card rounded-[2rem] p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-slate-900">Contact details</h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A3D62] text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Address</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    109/111 Nagdevi Street
                    <br />
                    Mumbai 400003, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A3D62] text-white">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <a href="mailto:alburhanind.drives@gmail.com" className="mt-1 text-sm leading-6 text-[#0A3D62] transition hover:text-[#C0392B]">
                    alburhanind.drives@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A3D62] text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <a href="tel:+919819036787" className="mt-1 text-sm leading-6 text-[#0A3D62] transition hover:text-[#C0392B]">
                    +91 98190 36787
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(10,24,38,0.08)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15094.19073479426!2d72.81480185687545!3d18.951404827656734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce2540b220cd%3A0xcb8075dba5dd428!2sAL-BURHAN%20INDUSTRIAL%20DRIVES!5e0!3m2!1sen!2sin!4v1778271312424!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AL-BURHAN Mumbai office map"
              className="h-[420px] w-full"
            />
          </div>
        </div>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(37,211,102,0.35)] transition hover:-translate-y-0.5"
        aria-label="WhatsApp inquiry"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </section>
  )
}