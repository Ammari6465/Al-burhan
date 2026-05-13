'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Target, Truck, CheckCircle2 } from 'lucide-react'

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
    <section id="about" aria-labelledby="about-heading" className="section-shell bg-[rgba(255,255,255,0.015)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-14">
          <div className="order-2 space-y-6 text-center lg:order-1 lg:text-left animate-fade-rise">
            <div>
              <p className="section-kicker mb-2 text-[11px] font-semibold text-[#C0392B]">About AL-BURHAN</p>
              <h2 id="about-heading" className="max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                25 Years of Industrial Excellence
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-8 text-white/55 sm:text-base">
                We support manufacturers, maintenance teams, and dealers with practical solutions for power transmission, combining stock depth, responsive service, and consistent product quality.
              </p>
            </div>

            <div className="grid gap-3">
              {highlights.map((highlight, idx) => {
                const Icon = highlight.icon
                return (
                  <div
                    key={idx}
                    className="flex min-h-10 items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-left transition hover:bg-white/6"
                    role="article"
                    aria-labelledby={`highlight-${idx}-title`}
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[rgba(192,57,43,0.2)] bg-[rgba(192,57,43,0.15)] text-[#C0392B]" aria-hidden="true">
                      <CheckCircle2 size={13} />
                    </div>
                    <div>
                      <h3 id={`highlight-${idx}-title`} className="text-sm font-semibold text-white">{highlight.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/55">{highlight.description}</p>
                    </div>
                  </div>
                )
              })}

              <div className="pt-2">
                <Link href="#contact" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#C0392B] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#a83429]">
                  Get a Quote
                </Link>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-8 text-white/55 sm:text-base">
              Our range covers pulleys, couplings, sprockets, roller chains, gears, and related transmission parts. The goal is straightforward: reduce friction in procurement and keep your operations moving.
            </p>
          </div>

          <div className="order-1 relative animate-fade-rise lg:order-2">
            <div className="absolute -inset-3 rounded-[20px] bg-[rgba(192,57,43,0.10)] blur-3xl" />
            <div className="relative overflow-hidden rounded-[20px] border border-white/8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:rotate-[-2deg]">
              <Image src="/hero-industrial.jpg" alt="AL-BURHAN industrial facility" width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Precision', value: 'Engineered for fit and performance' },
                  { label: 'Reliability', value: 'Stable supply and dependable support' },
                  { label: 'Customer-first', value: 'Clear communication and quick response' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/92 p-4 text-slate-900 shadow-lg backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C0392B]">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}