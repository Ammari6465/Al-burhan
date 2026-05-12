'use client'

import { Sparkles } from 'lucide-react'

export default function MissionVision() {
  return (
    <section className="section-shell section-surface py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center animate-fade-rise sm:mb-16 lg:mb-20">
          <p className="section-kicker mb-4 text-sm font-bold text-[#C0392B]">Mission & Values</p>
          <h2 className="text-3xl font-black text-balance text-slate-900 sm:text-4xl lg:text-5xl">
            An industrial journey shaped by consistency, reliability, and customer focus.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            AL-BURHAN Industrial Drives operates with a long-term mindset: improve the process, tighten the service experience, and keep production moving for the customer.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-[2rem] bg-[#0A3D62] p-6 text-white shadow-[0_18px_55px_rgba(10,24,38,0.14)] sm:p-8 lg:p-10">
            <p className="section-kicker text-xs font-semibold text-white/65">Our Mission</p>
            <h3 className="mt-3 text-2xl font-black sm:text-3xl">Deliver dependable industrial components with clear service and quick response.</h3>
            <p className="mt-4 text-sm leading-7 text-white/80">
              We want customers to feel confident ordering from us because the communication is straightforward, the products are fit-for-purpose, and the delivery process is predictable.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between text-sm text-white/80">
                <span>Continuous Improvement</span>
                <span>88%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[88%] rounded-full bg-[#C0392B] transition-all duration-1000" />
              </div>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-white/85 sm:grid-cols-2">
              {['Precision manufacturing support', 'Reliable supply chain', 'Customer-first communication', 'Fast delivery expectations'].map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}