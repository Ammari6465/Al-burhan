'use client'

import { Gauge, Headset, PackageSearch, ShieldCheck, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'OEM Expertise',
    description: 'Support for repetitive industrial procurement, fitment matching, and dependable supply planning.',
  },
  {
    icon: Truck,
    title: 'Fast Dispatch',
    description: 'Practical stock coordination and prompt shipping built for production timelines.',
  },
  {
    icon: Headset,
    title: 'Responsive Support',
    description: 'Direct help from product selection to inquiry follow-up through phone, email, and WhatsApp.',
  },
]

const stats = [
  { icon: PackageSearch, value: 1000, suffix: '+', label: 'Products' },
  { icon: Gauge, value: 500, suffix: '+', label: 'Clients' },
  { icon: ShieldCheck, value: 40, suffix: '+ Years', label: 'Established. in 1986' },
]

export default function CTA() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const start = performance.now()
    const duration = 1200

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setCounts(stats.map((item) => Math.floor(item.value * progress)))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  return (
    <section ref={sectionRef} className="section-shell bg-[var(--color-offwhite)] py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="section-kicker mx-auto">KEY HIGHLIGHTS</p>
          <h2 data-reveal className="section-title mt-4">
            Built for Industrial Dependability
          </h2>
          <p data-reveal className="section-copy mx-auto mt-4 max-w-2xl">
            Find the right pulley, coupling, gear, sprocket, chain, or accessory quickly, then send a requirement by WhatsApp for a practical quotation.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <article
                key={item.label}
                data-reveal
                className="rounded-[1.25rem] border border-[rgba(0,51,102,0.08)] bg-white p-7 text-center shadow-[0_12px_34px_rgba(9,25,41,0.08)]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,51,102,0.08)] text-[#003366]">
                  <Icon size={24} />
                </div>
                <p className="mt-4 text-[2rem] font-black leading-none text-[#0f1720]">
                  {counts[index]}
                  {item.suffix}
                </p>
                <p className="mt-1 text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[#425062]">{item.label}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <article
                key={benefit.title}
                data-reveal
                className="rounded-[1.2rem] border border-[rgba(0,51,102,0.08)] bg-white px-7 py-8 shadow-[0_12px_34px_rgba(9,25,41,0.08)] transition-all duration-200 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Icon size={36} className="text-[#d62828]" />
                <h3 className="mt-4 text-[1.05rem] font-bold text-[#0f1720] normal-case tracking-normal">{benefit.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-[#425062]">{benefit.description}</p>
              </article>
            )
          })}
        </div>

        <div data-reveal className="why-band mt-12 px-5 py-8 sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:px-14">
          <div className="max-w-2xl">
            <h3 className="text-[clamp(1.8rem,2.6vw,2.8rem)] font-black leading-tight text-white normal-case tracking-normal">Ready for Reliable Industrial Supply?</h3>
            <p className="mt-3 text-[15px] leading-7 text-white/78">
              Share your requirement and the team will suggest the right product combination, quantity, and lead time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
