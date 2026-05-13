'use client'

import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[600px] overflow-hidden bg-[#0A3D62] py-24 lg:min-h-[90vh] lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0A3D62_0%,#0d4f7a_100%)]" />
      <div className="absolute inset-0 opacity-40 hero-texture" />
      <div className="hero-vignette" />

      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.8),transparent_0_1px)] bg-[length:24px_24px]" />

      <div className="absolute inset-0">
        <Image
          src="/hero-industrial.jpg"
          alt="Industrial drive systems background"
          fill
          priority
          className="object-cover object-center opacity-18 mix-blend-screen"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[55%_45%] lg:gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <div className="hero-load inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 rounded-full bg-[#C0392B] opacity-70 animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#C0392B]" />
              </span>
              Industrial Drives &amp; Power Transmission
            </div>

            <h1 className="hero-load hero-load-delay-1 max-w-4xl text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[56px]">
              Premium Industrial &amp; Power Transmission <span className="text-[#C0392B]">Products</span> Built for Reliability
            </h1>

            <p className="hero-load hero-load-delay-2 text-[15px] font-subheading font-normal tracking-[0.01em] text-white/72 sm:text-[18px]">
              25+ Years of Excellence · 1000+ Products · Pan-India Delivery
            </p>

            <p className="hero-load hero-load-delay-3 mx-auto max-w-xl text-[16px] leading-7 text-white/60 lg:mx-0">
              AL-BURHAN Industrial Drives combines dependable stock, responsive support, and industrial-grade quality for manufacturers, distributors, and maintenance teams across India.
            </p>

            <div className="hero-load hero-load-delay-4 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#products"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 font-ui text-[15px] font-semibold text-[#0A3D62] shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5F7FA] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)] active:scale-[0.98]"
              >
                Explore Products
                <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-7 py-3.5 font-ui text-[15px] font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
              >
                Contact Us
                <MessageCircle size={18} />
              </a>
            </div>

            <div className="hero-load hero-load-delay-4 flex flex-wrap items-center justify-center gap-6 pt-2 lg:justify-start">
              {[
                'ISO Quality',
                'Pan-India Delivery',
                'OEM Trusted',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[13px] text-white/60">
                  <CheckCircle2 size={16} className="text-[#C0392B]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-[0_25px_80px_rgba(2,6,23,0.30)] backdrop-blur-md">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10">
                  <Image src="/hero-industrial.jpg" alt="Industrial facility" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/70 via-[#0A3D62]/18 to-transparent" />
                </div>

                <div className="absolute bottom-7 left-7 rounded-2xl bg-white p-4 shadow-[0_14px_36px_rgba(0,0,0,0.14)]">
                  <p className="text-[28px] font-bold leading-none text-[#0A3D62]">1000+</p>
                  <p className="mt-1 text-[12px] text-[#8896A8]">Products Available</p>
                </div>

                <div className="absolute right-7 top-7 rounded-full bg-[#C0392B] px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_2px_8px_rgba(192,57,43,0.25)]">
                  25+ Years
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { label: 'Quality stock', text: 'Ready-to-ship industrial components' },
                  { label: 'Support', text: 'Responsive support across India' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white p-4 text-[#1A2332] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C0392B]">{item.label}</p>
                    <p className="mt-2 text-[14px] leading-6 text-[#4A5568]">{item.text}</p>
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