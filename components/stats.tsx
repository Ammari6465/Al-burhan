
'use client'

import { Award, Users, Package, Globe, Building2 } from 'lucide-react'

const stats = [
  {
    icon: Award,
    number: '25+',
    label: 'Years of Excellence',
    description: 'Trusted by industries across India',
    color: 'from-red-700 to-red-600',
  },
  {
    icon: Users,
    number: '500+',
    label: 'Satisfied Clients',
    description: 'Building long-term partnerships',
    color: 'from-blue-700 to-blue-600',
  },
  {
    icon: Package,
    number: '1000+',
    label: 'Products in Stock',
    description: 'Ready for immediate dispatch',
    color: 'from-red-600 to-red-700',
  },
  {
    icon: Globe,
    number: '15+',
    label: 'States Covered',
    description: 'Pan-India distribution network',
    color: 'from-blue-600 to-blue-700',
  },
  {
    icon: Building2,
    number: '1',
    label: 'Focused Brand',
    description: 'Specialized in power transmission systems',
    color: 'from-[#0A3D62] to-[#123f68]',
  },
]

export default function Stats() {
  return (
    <section className="section-shell section-surface-alt py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="industrial-card group relative overflow-hidden rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D62]/5 to-[#C0392B]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className={`relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}>
                  <Icon size={24} />
                </div>

                <h3 className="relative z-10 mb-2 text-3xl font-black text-[#0A3D62] sm:text-4xl">
                  {stat.number}
                </h3>

                <p className="relative z-10 mb-2 text-lg font-bold text-slate-900">
                  {stat.label}
                </p>

                <p className="relative z-10 text-sm leading-relaxed text-slate-600">
                  {stat.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#C0392B] transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
