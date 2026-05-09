'use client'

import { Rocket } from 'lucide-react'

export default function MissionVision() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-4">Our Direction</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-700">Mission</span>
          </h2>
        </div>

        {/* Mission and Vision Cards */}
        <div className="flex justify-center">
          {/* Mission Card */}
          <div className="group relative animate-in fade-in slide-in-from-left-8 duration-1000 w-full md:max-w-2xl" style={{animationDelay: '200ms'}}>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-700/20 to-red-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            
            <div className="relative bg-white rounded-3xl border-2 border-red-700/20 p-6 sm:p-8 lg:p-12 hover:border-red-700/50 transition-all duration-300">
              <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-700 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Rocket size={28} className="text-white sm:size-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground">Our Mission</h3>
              </div>

              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-6 sm:mb-8">
                To deliver exceptional quality industrial components through innovative manufacturing processes, ensuring customer satisfaction and maintaining the highest standards of excellence.
              </p>

              <div className="space-y-4 border-l-4 border-red-700 pl-4 sm:pl-6">
                <div>
                  <h4 className="font-bold text-foreground mb-2">Core Values</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-700 to-blue-700"></span>
                      <span className="text-foreground/70">Precision in every component</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-700 to-blue-700"></span>
                      <span className="text-foreground/70">Customer-first approach</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-700 to-blue-700"></span>
                      <span className="text-foreground/70">Continuous improvement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
