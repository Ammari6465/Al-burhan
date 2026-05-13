'use client'

import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export default function MissionVision() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section ref={sectionRef} className="section-shell bg-[#0A3D62] py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="reveal-item section-kicker mb-3 text-[12px] font-semibold text-white/45">Testimonials</p>
          <h2 data-reveal className="reveal-item text-[28px] font-bold sm:text-[40px]">
            Trusted by Buyers Across India
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            {
              quote: 'Fast responses, clear communication, and the right stock when we need it. The team is dependable.',
              name: 'Rajesh Mehta',
              company: 'Manufacturing Procurement',
              initials: 'RM',
            },
            {
              quote: 'AL-BURHAN makes sourcing industrial parts simpler. The quality is consistent and delivery stays on schedule.',
              name: 'Anita Shah',
              company: 'OEM Operations',
              initials: 'AS',
            },
            {
              quote: 'They understand urgent maintenance requirements and respond with practical options, not delays.',
              name: 'Vikram Rao',
              company: 'Maintenance Manager',
              initials: 'VR',
            },
          ].map((item, index) => (
            <article
              key={item.name}
              data-reveal
              className="reveal-item rounded-2xl border border-white/12 bg-white/8 p-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-4 text-[64px] leading-none text-[#C0392B]">“</div>
              <div className="mb-3 flex gap-1 text-[14px] text-[#F59E0B]">★★★★★</div>
              <p className="text-[15px] italic leading-7 text-white/80">{item.quote}</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C0392B] text-[14px] font-bold text-white">
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-ui text-[14px] font-semibold text-white">{item.name}</p>
                    <p className="text-[13px] text-white/50">{item.company}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}