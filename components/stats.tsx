'use client'

import { Award, Users, Package, Globe } from 'lucide-react'

const stats = [
  {
    icon: Award,
    number: '20+',
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
]

export default function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-transparent to-red-700/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-border/40 p-6 sm:p-8 hover:border-red-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 from-red-700 to-blue-700 rounded-2xl transition-opacity duration-300"></div>

                {/* Icon Container */}
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-5 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative z-10`}>
                  <Icon size={28} className="text-white sm:size-8" />
                </div>

                {/* Number */}
                <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-700 mb-3 group-hover:from-red-800 group-hover:to-blue-800 transition-all">
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="font-bold text-foreground mb-2 text-lg">
                  {stat.label}
                </p>

                {/* Description */}
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {stat.description}
                </p>

                {/* Bottom line indicator */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-700 to-blue-700 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
