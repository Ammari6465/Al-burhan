'use client'

import { Mail, MessageCircle } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const contactPoints = [
  {
    icon: Mail,
    label: 'Email',
    value: 'alburhanind.drives@gmail.com',
    href: 'mailto:alburhanind.drives@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Quick enquiry',
    href: 'https://wa.me/919819036787?text=Hi%20AL-BURHAN,%20I%20would%20like%20a%20quote',
  },
]

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section ref={sectionRef} id="contact" className="section-shell bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mb-10 text-center">
          <p data-reveal className="section-kicker mx-auto">CONTACT</p>
          <h2 data-reveal className="section-title mt-4">Get in Touch</h2>
          <p data-reveal className="section-copy mx-auto mt-4 max-w-2xl">
            Reach out via Email or WhatsApp for enquiries and quotations.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-12">
          <div className="rounded-[1.5rem] border border-[rgba(0,51,102,0.08)] bg-white p-6 shadow-[0_18px_46px_rgba(9,25,41,0.08)] sm:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              {contactPoints.map((point) => {
                const Icon = point.icon

                return (
                  <a
                    key={point.label}
                    href={point.href}
                    className="flex min-w-0 items-center gap-3 rounded-2xl border border-[rgba(0,51,102,0.08)] bg-[var(--color-offwhite)] px-4 py-4 transition hover:-translate-y-1 hover:bg-white sm:px-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#d62828] shadow-[0_10px_24px_rgba(9,25,41,0.08)]">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#425062]">{point.label}</p>
                      <p className="mt-1 break-all text-[13px] font-semibold leading-5 text-[#0f1720] normal-case tracking-normal sm:text-[14px]">
                        {point.value}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-[rgba(0,51,102,0.08)] bg-white p-4 shadow-[0_18px_46px_rgba(9,25,41,0.08)]">
              <div className="overflow-hidden rounded-[1.1rem]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15094.19073479426!2d72.81480185687545!3d18.951404827656734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce2540b220cd%3A0xcb8075dba5dd428!2sAL-BURHAN%20INDUSTRIAL%20DRIVES!5e0!3m2!1sen!2sin!4v1778271312424!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0, filter: 'grayscale(0.15)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AL-BURHAN Mumbai office map"
                  className="h-[280px] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}