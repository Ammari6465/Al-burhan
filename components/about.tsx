'use client'

import { Award, Zap, Target } from 'lucide-react'

const highlights = [
  {
    icon: Award,
    title: 'ISO Certified',
    description: 'Maintaining highest quality standards with ISO certifications',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick turnaround with pan-India logistics network',
  },
  {
    icon: Target,
    title: 'Precision Focus',
    description: 'Accuracy and quality in every product we deliver',
  },
]

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-red-50/50 to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000 text-center md:text-left">
            <div>
              <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-4">About AL-BURHAN</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-balance leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-700">20+ Years of Excellence</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
              AL-BURHAN Industrial Drives has been a trusted partner for industrial components across India. With over two decades of experience, we've built our reputation on quality, reliability, and customer-centric service.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {highlights.map((highlight, idx) => {
                const Icon = highlight.icon
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 hover:border-red-700/30 hover:bg-white transition-all duration-300 group cursor-pointer text-left"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-700 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={20} className="text-white sm:size-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{highlight.title}</h4>
                      <p className="text-sm text-foreground/60">{highlight.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="text-foreground/70 leading-relaxed">
              We specialize in distributing a comprehensive range of industrial components including pulleys, couplings, sprockets, roller chains, and precision gears. Our commitment to excellence and customer satisfaction makes us the preferred choice for industries across India.
            </p>
          </div>

          {/* Right Content */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000" style={{animationDelay: '200ms'}}>
            {/* Decorative elements */}
            <div className="absolute -inset-8 bg-gradient-to-br from-red-700/10 to-blue-700/10 rounded-3xl blur-3xl"></div>

            {/* Stats Grid */}
            <div className="relative space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { number: '20+', label: 'Years in Industry' },
                  { number: '500+', label: 'Happy Clients' },
                  { number: '1000+', label: 'Products Stock' },
                  { number: '15+', label: 'States Covered' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="group bg-white rounded-2xl border border-border/40 p-5 sm:p-6 text-center hover:border-red-700/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in fade-in scale-in-50"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <p className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-700 mb-2">
                      {stat.number}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground/70">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-br from-red-700 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
                <h4 className="text-xl sm:text-2xl font-bold mb-4">Why Choose Us?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="text-sm">Quality assured products from certified suppliers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="text-sm">Competitive pricing without compromising quality</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="text-sm">Dedicated customer support and technical expertise</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="text-sm">Fast, reliable delivery across India</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
