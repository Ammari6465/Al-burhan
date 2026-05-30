'use client'

import { ChevronDown, ShieldCheck, Truck, Users } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const stats = [
  { value: 25, suffix: '+', label: 'Years of experience' },
  { value: 500, suffix: '+', label: 'Clients served' },
  { value: 0, suffix: '', label: 'Industrial product range' },
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
    <section id="home" className="hero-shell section-shell -mt-20 md:-mt-[96px] flex min-h-[520px] md:min-h-[640px] items-center pt-20 md:pt-[96px]">
      <Image
        src="/BG%20Image%20.jpeg"
        alt="Industrial machinery in a modern production environment"
        fill
        priority
        className="hero-media object-cover object-center w-full h-full"
      />
      <div className="hero-overlay" />
      <div className="hero-grid-overlay" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
          <div className="max-w-[720px]">
            <div className="hero-badge hero-load">
              INDUSTRIAL DRIVES & POWER TRANSMISSION
            </div>

            <h1 className="hero-load hero-load-delay-1 mt-5 max-w-[720px] text-[36px] sm:text-[56px] lg:text-[56px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
              Premium Industrial & Power Transmission <span className="text-[#C0392B]">Products</span> Built for Reliability
            </h1>

            <p className="hero-load hero-load-delay-2 mt-4 text-[15px] sm:text-[18px] max-w-[640px] leading-7 text-white/72">
              25+ Years of Excellence · Industrial Product Range · Pan-India Delivery
            </p>

            <p className="hero-load hero-load-delay-3 mt-4 max-w-[640px] text-[16px] leading-7 text-white/66">
              AL-BURHAN Industrial Drives combines dependable stock, responsive support, and industrial-grade quality for manufacturers, distributors, and maintenance teams across India.
            </p>

            <div className="mt-7 flex flex-wrap gap-3" data-reveal>
              {trustBadges.map((badge) => (
                <span key={badge} className="hero-trust">
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4 hero-load hero-load-delay-4">
              <a href="#products" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 font-ui text-[15px] font-semibold text-[#0A3D62] shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                Explore Products
              </a>
              <a
                href={`https://wa.me/919819036787?text=${encodeURIComponent('Hi AL-BURHAN, I would like a quotation for industrial products.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-7 py-3.5 font-ui text-[15px] font-semibold text-white"
              >
                WhatsApp Us
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3" data-reveal>
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

          <div className="hero-frame rounded-[28px] p-5 sm:p-6" data-reveal>
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/6">
              <Image
                src="/BG%20Image%20.jpeg"
                alt="Industrial facility and precision drive components"
                width={900}
                height={1100}
                className="h-[320px] w-full object-cover object-center sm:h-[420px]"
                priority={false}
              />
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