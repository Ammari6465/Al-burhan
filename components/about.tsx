'use client'

import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ShieldCheck, Target, Truck } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

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
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section ref={sectionRef} id="about" aria-labelledby="about-heading" className="section-shell bg-[#F5F7FA] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[45%_55%] lg:gap-16">
          <div className="order-2 space-y-6 lg:order-1">
            <p data-reveal className="reveal-item section-kicker text-[12px] font-semibold text-[#C0392B]">About AL-BURHAN</p>
            <h2 data-reveal id="about-heading" className="reveal-item text-[28px] font-bold text-[#0A3D62] sm:text-[40px]">
              25 Years of Industrial Excellence
            </h2>
            <p data-reveal className="reveal-item max-w-2xl text-[16px] leading-8 text-[#4A5568]">
              We support manufacturers, maintenance teams, and distributors with practical solutions for power transmission, combining stock depth, responsive service, and consistent product quality.
            </p>
            <p data-reveal className="reveal-item max-w-2xl text-[16px] leading-8 text-[#4A5568]">
              Our range covers pulleys, couplings, sprockets, roller chains, gears, and related transmission parts. The goal is straightforward: reduce friction in procurement and keep your operations moving.
            </p>

            <div className="space-y-4">
              {[
                { title: 'Fast Delivery', description: 'Responsive dispatch for urgent production schedules', icon: Truck },
                { title: 'Precision Focus', description: 'Tight quality control across every shipment', icon: Target },
                { title: 'Quality Assurance', description: 'Reliable materials, tested processes, and dependable support', icon: ShieldCheck },
                { title: 'Customer Confidence', description: 'Clear communication from enquiry to delivery', icon: CheckCircle2 },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    data-reveal
                    className="reveal-item flex items-start gap-3 border-b border-[#E8ECF0] pb-4"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDECEA] text-[#C0392B]">
                      <Icon size={14} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[#0A3D62]">{item.title}</h3>
                      <p className="mt-1 text-[14px] leading-6 text-[#4A5568]">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#0A3D62] px-6 py-3.5 font-ui text-[14px] font-semibold text-[#0A3D62] transition hover:bg-[#0A3D62] hover:text-white">
              Learn More About Us →
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -left-6 top-0 h-20 w-20 rounded-full bg-[#C0392B] opacity-12 blur-2xl" />

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
                  <div className="relative aspect-[4/3]">
                    <Image src="/hero-industrial.jpg" alt="AL-BURHAN industrial facility" fill className="object-cover" />
                  </div>
                </div>

                <div className="absolute -bottom-5 right-5 w-[40%] overflow-hidden rounded-xl border-4 border-white shadow-[0_14px_40px_rgba(0,0,0,0.16)]">
                  <div className="relative aspect-[4/3]">
                    <Image src="/hero-industrial.jpg" alt="Industrial facility detail" fill className="object-cover" />
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 rounded-2xl bg-[#0A3D62] p-4 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                  <p className="text-[32px] font-extrabold leading-none">25+</p>
                  <p className="mt-1 text-[12px] text-white/70">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}