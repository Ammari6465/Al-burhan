'use client'

import { ArrowRight, Wrench, Zap } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(45,99,199,0.20),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(185,28,28,0.18),transparent_30%),radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.45),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.10))] md:bg-[radial-gradient(circle_at_top_left,rgba(185,28,28,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(29,78,216,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,250,252,0.70))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-700/15 bg-white/70 px-3 py-2 backdrop-blur-sm mx-auto md:mx-0">
              <Zap size={16} className="text-red-700" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-red-700">Industrial Drives and Power Transmission</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-balance text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-red-700 via-red-600 to-blue-700 bg-clip-text text-transparent">
                  Precision engineered
                </span>{' '}
                industrial components.
              </h1>
              <p className="mx-auto md:mx-0 max-w-lg text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
                Al-Burhan Industrial Drives supplies pulleys, sprockets, roller chains, gears, and couplings with a clean, dependable presentation built for industrial buyers.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="#products"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-800 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-white shadow-lg shadow-red-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-red-700/30"
              >
                Explore Products
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-blue-700/20 bg-white/75 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-blue-800 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <Wrench size={20} />
                Contact Us
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-border pt-6 sm:pt-8">
              <div className="rounded-xl border border-border/60 bg-white/60 px-4 py-3 text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-semibold text-red-700">20+</p>
                <p className="text-xs text-slate-500">Years Experience</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-white/60 px-4 py-3 text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-semibold text-blue-700">500+</p>
                <p className="text-xs text-slate-500">Product Variants</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-white/60 px-4 py-3 text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-semibold text-slate-950">15+</p>
                <p className="text-xs text-slate-500">States Served</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block animate-in fade-in slide-in-from-right-8 duration-700" style={{animationDelay: '120ms'}}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-red-700/15 to-blue-700/15 blur-2xl" />
              
              <div className="relative overflow-hidden rounded-3xl border border-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
                <Image
                  src="/hero-industrial.jpg"
                  alt="AL-BURHAN Industrial Facility"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 max-w-xs rounded-2xl border border-white/60 bg-white/90 p-4 shadow-2xl backdrop-blur-md">
                <p className="mb-2 font-semibold text-slate-950">Premium quality</p>
                <p className="text-sm leading-6 text-slate-600">Cleanly presented industrial components with precision engineering and quality assurance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
