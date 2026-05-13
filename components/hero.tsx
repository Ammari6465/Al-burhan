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
    <section id="home" className="relative overflow-hidden pb-10 pt-24 sm:pt-28 lg:min-h-screen lg:pb-14 lg:pt-28">
      <div className="absolute inset-0 -z-30 bg-[#081C2E]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,rgba(192,57,43,0.12),transparent_35rem),radial-gradient(circle_at_bottom_left,rgba(10,61,98,0.4),transparent_26rem),linear-gradient(180deg,#081C2E_0%,#071520_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_40px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03)_0_1px,transparent_1px_40px)] opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_0_240px),radial-gradient(circle_at_80%_15%,rgba(192,57,43,0.08),transparent_0_240px)]" />

      <div className="absolute inset-0 -z-20">
        <Image
          src="/hero-industrial.jpg"
          alt="Industrial drive systems background"
          fill
          priority
          className="object-cover object-center opacity-18 mix-blend-screen"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-14">
          <div className="space-y-6 text-center lg:text-left animate-fade-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C0392B] animate-pulse" />
              <span>Industrial Drives & Power Transmission</span>
            </div>

            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">
              25+ Years · 1000+ Products · Pan-India Delivery
            </p>

            <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.92] text-white text-balance sm:text-5xl lg:text-[72px]">
              Premium Industrial &amp; Power
              <br />
              Transmission <em className="not-italic text-[#C0392B]">Products</em>
            </h1>

            <p className="max-w-prose text-sm leading-7 text-white/55 sm:text-base">
              AL-BURHAN Industrial Drives combines dependable stock, responsive support, and industrial-grade quality for manufacturers, distributors, and OEM buyers across India.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#products"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#C0392B] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#a83429]"
              >
                Explore Products
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
                <MessageCircle size={18} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:divide-x sm:divide-white/10 sm:rounded-2xl sm:border sm:border-white/8 sm:bg-white/4">
              {heroStats.map((stat, index) => (
                <div key={stat.label} className={`rounded-2xl border border-white/8 bg-white/4 p-4 text-center sm:rounded-none sm:border-0 sm:bg-transparent ${index < heroStats.length - 1 ? 'sm:pr-4' : ''}`} style={{ animationDelay: `${index * 90}ms` }}>
                  <div className="flex items-center justify-center gap-2 text-white/40 sm:justify-start">
                    {index === 0 && <TrendingUp size={16} />}
                    {index === 1 && <Warehouse size={16} />}
                    {index === 2 && <ShieldCheck size={16} />}
                    {index === 3 && <MessageCircle size={16} />}
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">{stat.label}</span>
                  </div>
                  <p className="mt-2 text-3xl font-black leading-none text-white sm:text-[36px]">
                    {counts[index]}<span className="text-[#C0392B]">+</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-rise" style={{ animationDelay: '160ms' }}>
            <div className="absolute -inset-4 rounded-[1.25rem] bg-[rgba(192,57,43,0.12)] blur-3xl" />
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-[16px] border border-white/8 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[16/9]">
                  <Image src="/hero-industrial.jpg" alt="Industrial facility" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center rounded-full bg-[#C0392B] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                      Why AL-BURHAN
                    </div>
                    <p className="mt-3 max-w-md text-sm font-bold text-white sm:text-base">
                      Built for manufacturing, maintenance, and OEM buyers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-[rgba(10,61,98,0.4)] p-4 text-white transition hover:bg-[rgba(10,61,98,0.55)]">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">Materials</p>
                  <p className="mt-3 text-[13px] font-semibold leading-6">Aluminium, CI, Nylon, Rubber, and precision components.</p>
                </div>

                <div className="rounded-xl bg-white/4 p-4 text-white transition hover:bg-white/8">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">Trusted Partner</p>
                  <p className="mt-3 text-[13px] font-semibold leading-6">Reliable stock, fast dispatch, and consistent quality control.</p>
                </div>

                <div className="rounded-xl border border-[rgba(192,57,43,0.3)] bg-[rgba(192,57,43,0.15)] p-4 text-white transition hover:bg-[rgba(192,57,43,0.22)]">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">Response</p>
                  <p className="mt-3 text-[13px] font-semibold leading-6">Quote support through WhatsApp and direct contact.</p>
                </div>

                <div className="rounded-xl bg-white/4 p-4 text-white transition hover:bg-white/8">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">Delivery</p>
                  <p className="mt-3 text-[13px] font-semibold leading-6">Pan-India delivery built for practical industrial timelines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}