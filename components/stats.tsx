'use client'

import { Cog, Globe, Package, ShieldCheck } from 'lucide-react'

const stats = [
  {
    icon: Package,
    value: 'Pulleys & Couplings',
    label: 'Core catalog',
  },
  {
    icon: Cog,
    value: 'Gears & Sprockets',
    label: 'Transmission range',
  },
  {
    icon: ShieldCheck,
    value: 'Industrial Grade',
    label: 'Built for reliability',
  },
  {
    icon: Globe,
    value: 'Pan-India Delivery',
    label: 'Distribution network',
  },
]

export default function Stats() {
  return (
    <section className="section-shell border-y border-white/6 bg-[rgba(255,255,255,0.015)] py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative flex min-h-28 items-center gap-4 border-b border-white/6 bg-white/2 px-5 py-5 transition hover:bg-white/4 sm:px-6 lg:border-r lg:border-b-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[rgba(192,57,43,0.2)] bg-[rgba(192,57,43,0.15)] text-[#C0392B]">
                  <Icon size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">{stat.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
