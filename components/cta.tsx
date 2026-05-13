'use client'

import { ArrowRight, CheckCircle2, CreditCard, Headphones, Truck } from 'lucide-react'

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Quality Assured',
    description: 'Products selected for dependable performance and industrial fit.',
  },
  {
    icon: CreditCard,
    title: 'Competitive Pricing',
    description: 'Transparent value without sacrificing service or material reliability.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Quick responses for quotes, stock checks, and order coordination.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Built around practical dispatch timelines for India-wide shipping.',
  },
]

export default function CTA() {
  return (
    <section className="section-shell bg-[rgba(255,255,255,0.015)] py-20 sm:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-kicker mb-4 text-[11px] font-semibold text-[#C0392B]">Why Choose Us</p>
          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl text-balance">
            The practical partner for quality industrial supply.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <article key={benefit.title} className="industrial-card rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1" style={{ animationDelay: `${index * 90}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A3D62] text-white shadow-lg">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/55">{benefit.description}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/8 bg-[#0D1F2F] px-6 py-8 text-center text-white shadow-[0_18px_55px_rgba(10,24,38,0.14)] sm:px-8 sm:py-10">
          <h3 className="text-2xl font-bold text-balance sm:text-3xl">
            Ready to source the right industrial components?
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
            Request a quote and we’ll help you choose the correct pulleys, couplings, gears, or sprockets for the application.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#C0392B] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#a83429]"
            >
              Request a Quote
              <ArrowRight size={18} />
            </a>
            <a
              href="https://wa.me/919819036787?text=Hi%20AL-BURHAN,%20I%20would%20like%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
