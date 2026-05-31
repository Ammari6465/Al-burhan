'use client'

import { ChevronDown, PackageCheck, ShieldCheck, Truck, Users } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const stats = [
  { value: 40, suffix: '+', label: 'Years estd. in 1986' },
  { value: 500, suffix: '+', label: 'Clients' },
  { value: 200, suffix: '+', label: 'Products' },
]

const trustBadges = ['ISO Certified', 'OEM Partner', 'Pan-India Delivery']

const assurancePoints = [
  { icon: ShieldCheck, label: 'OEM-ready quality' },
  { icon: Truck, label: 'Fast dispatch across India' },
  { icon: Users, label: 'Trusted by industrial buyers' },
]

export default function Hero() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [hideScroll, setHideScroll] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 1300

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setCounts(stats.map((item) => Math.floor(item.value * progress)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    const onScroll = () => setHideScroll(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="home" className="hero-shell section-shell flex items-center">
      <Image
        src="/BG%20Image%20.jpeg"
        alt="Al-Burhan Industrial Drives storefront signage"
        fill
        priority
        className="hero-media h-full w-full scale-105 object-cover object-top md:object-center blur-[1.5px]"
      />
      <div className="hero-overlay" />
      <div className="hero-grid-overlay" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="hero-copy-panel max-w-[760px] rounded-2xl p-5 sm:p-7 lg:p-8">
            

            <h1 className="hero-load hero-load-delay-1 mt-5 max-w-[760px] text-[38px] font-extrabold leading-[1.04] text-white sm:text-[56px] lg:text-[68px]">
              Industrial Products Built for <span className="text-[#ff7a1a]">Reliability</span>
            </h1>

            <p className="hero-load hero-load-delay-2 mt-5 max-w-[640px] text-[16px] font-semibold leading-7 text-white/88 sm:text-[19px]">
              40+ Years of Excellence | Pan-India Delivery
            </p>

            <p className="hero-load hero-load-delay-3 mt-4 max-w-[640px] text-[15px] leading-7 text-white/78 sm:text-[17px]">
              Al-Burhan Industrial Drives combines dependable stock, responsive support, and industrial-grade quality for manufacturers, distributors, and maintenance teams across India.
            </p>

            <div className="hero-load hero-load-delay-4 mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <a href="#products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ff7a1a] px-7 py-3.5 font-ui text-[15px] font-extrabold text-white shadow-[0_18px_34px_rgba(255,122,26,0.28)] transition hover:-translate-y-0.5 hover:bg-[#f97316]">
                Explore Products
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3" data-reveal>
              {trustBadges.map((badge) => (
                <span key={badge} className="hero-trust">
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3" data-reveal>
              {stats.map((item, idx) => (
                <div key={item.label} className="hero-metric">
                  <p className="hero-metric__value">
                    {counts[idx]}
                    {item.suffix}
                  </p>
                  <p className="hero-metric__label">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-frame hidden rounded-2xl p-5 lg:block" data-reveal>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-52 overflow-hidden rounded-xl border border-white/10 bg-white">
                  <Image src="/products/gear.jpg" alt="Precision industrial gear component" fill sizes="240px" className="object-cover" />
                </div>
                <div className="relative h-52 overflow-hidden rounded-xl border border-white/10 bg-white">
                  <Image src="/products/coupling.jpg" alt="Industrial coupling component" fill sizes="240px" className="object-cover" />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#101827] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff7a1a]/15 text-[#ff7a1a]">
                    <PackageCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[0.75rem] font-black uppercase tracking-[0.2em] text-[#ff7a1a]">Ready Stock Support</p>
                    <p className="mt-2 text-[15px] leading-7 text-white/78">
                      Pulleys, couplings, gears, sprockets, roller chains, and accessories supplied with quick enquiry follow-up.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {assurancePoints.map((point) => {
                const Icon = point.icon

                return (
                  <div key={point.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-white backdrop-blur-md">
                    <Icon size={18} className="shrink-0 text-[#ff6b00]" />
                    <span className="text-[14px] font-semibold text-white/88">{point.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`hero-scroll-indicator ${hideScroll ? 'opacity-0' : 'opacity-100'}`}>
        <ChevronDown size={18} />
      </div>
    </section>
  )
}
