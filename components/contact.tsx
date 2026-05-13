'use client'

import { Mail, MessageCircle, Phone } from 'lucide-react'
import { useMemo } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const whatsappLink = 'https://wa.me/919819036787?text=Hi%20AL-BURHAN,%20I%20would%20like%20a%20quote'

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>()

  const whatsappDirectLink = useMemo(
    () =>
      `https://wa.me/919819036787?text=${encodeURIComponent('Hi AL-BURHAN, I would like a quote for industrial drives and power transmission products.')}`,
    [],
  )

  return (
    <section ref={sectionRef} id="contact" className="section-shell bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[40%_60%] lg:gap-14">
          <div className="space-y-6">
            <p data-reveal className="reveal-item section-kicker text-[12px] font-semibold text-[#C0392B]">Contact</p>
            <h2 data-reveal className="reveal-item text-[28px] font-bold text-[#0A3D62] sm:text-[40px]">
              Get in Touch
            </h2>
            <p data-reveal className="reveal-item text-[16px] leading-8 text-[#4A5568]">
              Request a quote or speak directly with our Mumbai team for product guidance, stock checks, and delivery coordination.
            </p>

            <div className="rounded-2xl border border-[#E8ECF0] bg-[#F5F7FA] p-6">
              <div className="space-y-0">
                {[
                  { label: 'Phone', value: '+91 98190 36787', icon: Phone },
                  { label: 'Email', value: 'alburhanind.drives@gmail.com', icon: Mail },
                  { label: 'WhatsApp', value: '+91 98190 36787', icon: MessageCircle, whatsapp: true },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} data-reveal className="reveal-item flex items-center gap-4 py-5 first:pt-0 last:pb-0" style={{ animationDelay: `${index * 80}ms` }}>
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.whatsapp ? 'bg-[#E8FEF0] text-[#25D366]' : 'bg-[#EBF3FB] text-[#0A3D62]'}`}>
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="font-ui text-[12px] uppercase tracking-[0.12em] text-[#8896A8]">{item.label}</p>
                        {item.label === 'Email' ? (
                          <a href={`mailto:${item.value}`} className="mt-1 block font-ui text-[15px] font-semibold text-[#0A3D62] transition hover:text-[#C0392B]">
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 font-ui text-[15px] font-semibold text-[#0A3D62]">{item.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <a
                href={whatsappDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#25D366] px-6 py-3.5 font-ui text-[14px] font-semibold text-white transition hover:brightness-95"
              >
                Or reach us directly on WhatsApp
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl border border-[#E8ECF0] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <p className="text-[16px] leading-8 text-[#4A5568]">
                For a detailed quote, contact us with your product requirements, quantities, and delivery location. We will respond with the right industrial option and a practical timeline.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Response time', value: 'Quick follow-up' },
                  { label: 'Support', value: 'Direct WhatsApp help' },
                  { label: 'Coverage', value: 'Pan-India dispatch' },
                  { label: 'Products', value: 'Pulleys, couplings, gears, sprockets' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#F5F7FA] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C0392B]">{item.label}</p>
                    <p className="mt-2 text-[14px] leading-6 text-[#0A3D62]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#E8ECF0] shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15094.19073479426!2d72.81480185687545!3d18.951404827656734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce2540b220cd%3A0xcb8075dba5dd428!2sAL-BURHAN%20INDUSTRIAL%20DRIVES!5e0!3m2!1sen!2sin!4v1778271312424!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AL-BURHAN Mumbai office map"
                className="h-[320px] w-full"
              />
            </div>
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-fab fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(37,211,102,0.45)] sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3.5"
          aria-label="WhatsApp inquiry"
        >
          <MessageCircle size={24} className="sm:size-[20px]" />
          <span className="hidden font-ui text-[14px] font-semibold sm:inline">Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  )
}