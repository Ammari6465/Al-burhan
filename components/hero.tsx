'use client'

import { ArrowRight, MessageCircle, ShieldCheck, TrendingUp, Warehouse } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const heroStats = [
  { label: 'Years', value: 25, suffix: '+' },
  { label: 'Clients', value: 500, suffix: '+' },
  { label: 'Products', value: 1000, suffix: '+' },
  { label: 'States', value: 15, suffix: '+' },
]

export default function Hero() {
  const [counts, setCounts] = useState(heroStats.map(() => 0))

  useEffect(() => {
    const duration = 1400
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setCounts(heroStats.map((stat) => Math.round(stat.value * progress)))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero-industrial.jpg"
          alt="Industrial drive systems background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 -z-10 hero-gradient-shimmer bg-[linear-gradient(135deg,rgba(10,61,98,0.95)_0%,rgba(26,82,118,0.75)_50%,rgba(245,245,245,0.15)_100%),linear-gradient(to_bottom,rgba(7,29,50,0.6)_0%,transparent_60%)] bg-[length:200%_200%]" />
      <div className="hero-vignette -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_10%_15%,rgba(255,255,255,0.10),transparent_24%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-8 text-center lg:text-left animate-fade-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-white/90 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-[#BDC3C7]" />
              <span className="section-kicker text-xs text-white/90">Industrial Drives and Power Transmission</span>
            </div>

            <div className="hero-frost rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-[0_18px_45px_rgba(7,29,50,0.28)]">
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-black leading-tight text-white text-balance sm:text-5xl lg:text-6xl">
                  Premium Industrial & Power Transmission Products
                </h1>
                <p className="max-w-2xl text-base leading-7 text-[#BDC3C7] sm:text-lg lg:text-xl">
                  25+ Years of Excellence, 1000+ Products, Pan-India Delivery
                </p>
                <p className="max-w-2xl text-sm leading-7 text-[#BDC3C7] sm:text-base">
                  AL-BURHAN Industrial Drives combines dependable stock, responsive support, and industrial-grade quality for manufacturers, distributors, and maintenance teams across India.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E86C1] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(46,134,193,0.4)] transition hover:-translate-y-0.5 hover:bg-[#2572a7]"
              >
                Explore Products
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C0392B] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C0392B]/25 transition hover:-translate-y-0.5 hover:bg-[#a53127]"
              >
                Contact Us
                <MessageCircle size={18} />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/12 bg-white/6 p-4 text-left text-white backdrop-blur-sm"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="flex items-center gap-2 text-[#BDC3C7]">
                    {index === 0 && <TrendingUp size={16} />}
                    {index === 1 && <Warehouse size={16} />}
                    {index === 2 && <ShieldCheck size={16} />}
                    {index === 3 && <MessageCircle size={16} />}
                    <span className="text-xs font-medium uppercase tracking-[0.18em] font-subheading">{stat.label}</span>
                  </div>
                  <p className="mt-2 text-3xl font-black leading-none">
                    {counts[index]}
                    <span className="text-xl font-semibold">{stat.suffix}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[580px] animate-fade-rise" style={{ animationDelay: '180ms' }}>
            <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-[0_25px_80px_rgba(2,6,23,0.30)] backdrop-blur-md">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative min-h-[240px] overflow-hidden rounded-[1.5rem] sm:min-h-[290px]">
                  <Image src="/hero-industrial.jpg" alt="Industrial facility" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/70 via-[#0A3D62]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 text-slate-900 shadow-lg">
                    <p className="section-kicker text-[0.65rem] text-[#2E86C1]">Trusted supply partner</p>
                    <p className="mt-1 text-base font-bold">Built for manufacturing, maintenance, and OEM buyers</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-[1.5rem] bg-[#0A3D62] p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70 font-subheading">Why AL-BURHAN</p>
                    <p className="mt-3 text-xl font-bold">Reliable stock, fast dispatch, and consistent quality control.</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-white p-5 text-slate-800 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-subheading">Materials</p>
                    <p className="mt-3 text-lg font-semibold">Aluminium, CI, Nylon, Rubber, and precision components.</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-[#C0392B] p-5 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70 font-subheading">Response</p>
                    <p className="mt-3 text-lg font-semibold">Quote support through WhatsApp and direct contact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-14 w-full text-[#FAFAFA]">
            <path fill="currentColor" d="M0,64L60,64C120,64,240,64,360,58.7C480,53,600,43,720,48C840,53,960,75,1080,74.7C1200,75,1320,53,1380,42.7L1440,32V120H1380C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120H0Z" />
          </svg>
        </div>
      </div>
    </section>
  )
}