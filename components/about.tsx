'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Target, Truck } from 'lucide-react'

const highlights = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Responsive dispatch for urgent production schedules',
  },
  {
    icon: Target,
    title: 'Precision Focus',
    description: 'Tight quality control across every shipment',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Reliable materials, tested processes, and dependable support',
  },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-shell section-surface-alt py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_20px_70px_rgba(10,24,38,0.12)] animate-fade-rise">
            <Image src="/hero-industrial.jpg" alt="AL-BURHAN industrial facility" width={1200} height={900} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/80 via-[#0A3D62]/20 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Precision', value: 'Engineered for fit and performance' },
                { label: 'Reliability', value: 'Stable supply and dependable support' },
                { label: 'Customer-first', value: 'Clear communication and quick response' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/92 p-4 text-slate-900 shadow-lg backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C0392B] font-subheading">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 animate-fade-rise text-center lg:text-left">
            <div>
              <p className="section-kicker text-sm font-semibold text-[#C0392B] mb-2">About AL-BURHAN</p>
              <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
                Industrial supply with a disciplined, dependable operating style.
              </h2>
              <p className="max-w-2xl text-base sm:text-lg font-subheading text-slate-600">
                We support manufacturers, maintenance teams, and dealers with practical solutions for power transmission, combining stock depth, responsive service, and consistent product quality.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5">
              {highlights.map((highlight, idx) => {
                const Icon = highlight.icon
                return (
                  <div
                    key={idx}
                    className="industrial-card flex items-start gap-4 rounded-2xl p-4 text-left transition-transform duration-300 hover:-translate-y-0.5"
                    role="article"
                    aria-labelledby={`highlight-${idx}-title`}
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A3D62] text-white shadow-lg" aria-hidden="true">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 id={`highlight-${idx}-title`} className="mb-1 text-base font-bold text-slate-900">{highlight.title}</h3>
                      <p className="text-sm leading-6 text-slate-600">{highlight.description}</p>
                    </div>
                  </div>
                )
              })}

              <div className="pt-2">
                <Link href="#contact" className="inline-flex items-center gap-3 rounded-full bg-[#C0392B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#C0392B]/20 transition hover:-translate-y-0.5">
                  Get a Quote
                </Link>
              </div>
            </div>

            <p className="max-w-2xl leading-7 text-slate-600">
              Our range covers pulleys, couplings, sprockets, roller chains, gears, and related transmission parts. The goal is straightforward: reduce friction in procurement and keep your operations moving.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
