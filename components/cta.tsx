'use client'

import { ArrowRight, MessageCircle } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-red-700 to-blue-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 sm:mb-6 text-balance">
          Ready to Find Your Perfect Industrial Components?
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Contact our expert team today and get premium quality components with fast delivery and competitive pricing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-red-700 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Request a Quote
            <ArrowRight size={20} />
          </a>
          <a
            href="https://wa.me/919819036787?text=Hi%20AL-BURHAN,%20I%20am%20interested%20in%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>

        <p className="text-white/70 text-sm mt-8">
          Available 24/7 for your inquiries | Fast Response Time | Expert Support
        </p>
      </div>
    </section>
  )
}
