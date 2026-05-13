'use client'

import { Award, MapPin, MessageCircle, PackageCheck, Settings2, Zap } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const benefits = [
  {
    icon: PackageCheck,
    title: 'Quality Stock',
    description: '1000+ ready-to-ship industrial components',
  },
  {
    icon: Zap,
    title: 'Fast Dispatch',
    description: 'Reliable timelines for urgent requirements',
  },
  {
    icon: MapPin,
    title: 'Pan-India Reach',
    description: '15+ states served with consistent delivery',
  },
  {
    icon: Settings2,
    title: 'OEM Expertise',
    description: 'Precision parts for manufacturing lines',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    description: 'Instant quote assistance on WhatsApp',
  },
  {
    icon: Award,
    title: '25 Years Experience',
    description: 'Trusted by 500+ clients across India',
  },
]

export default function CTA() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section ref={sectionRef} className="section-shell bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <div className="space-y-4">
            <p data-reveal className="reveal-item section-kicker text-[12px] font-semibold text-[#C0392B]">Why AL-BURHAN</p>
            <h2 data-reveal className="reveal-item text-[28px] font-bold text-[#0A3D62] sm:text-[40px]">
              The Industrial Partner You Can Rely On
            </h2>
            <p data-reveal className="reveal-item max-w-xl text-[16px] leading-8 text-[#4A5568]">
              A focused service model built for manufacturers, OEM buyers, and maintenance teams that need dependable supply and direct support.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <article
                  key={benefit.title}
                  data-reveal
                  className="reveal-item group rounded-xl bg-[#F5F7FA] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_16px_40px_rgba(0,0,0,0.10)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EBF3FB] text-[#0A3D62] transition-colors duration-200 group-hover:bg-[#FDECEA]">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-3 text-[15px] font-bold text-[#0A3D62]">{benefit.title}</h3>
                  <p className="mt-1 text-[13px] leading-6 text-[#4A5568]">{benefit.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
