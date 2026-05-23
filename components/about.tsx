'use client'

import Image from 'next/image'
import { Award, Building2, Factory, ShieldCheck } from 'lucide-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const features = [
  {
    icon: Factory,
    title: 'Manufacturing Insight',
    description: 'Practical knowledge of transmission components, fitment, and industrial procurement realities.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Discipline',
    description: 'Consistent checking of dimensions, finish, and application fit before dispatch.',
  },
  {
    icon: Building2,
    title: 'Buyer Support',
    description: 'Responsive help for OEM teams, maintenance buyers, and repeat industrial orders.',
  },
]

const milestones = [
  { year: '1999', title: 'Founded in Mumbai', text: 'Built on hands-on supply relationships and a focus on dependable industrial support.' },
  { year: '2008', title: 'OEM Expansion', text: 'Broadened the catalogue to cover more drive components and repeat buyer requirements.' },
  { year: '2016', title: 'Pan-India Reach', text: 'Improved dispatch coordination and delivery support across industrial hubs.' },
  { year: '2026', title: 'Digital First', text: 'Modernized the enquiry experience with faster response paths and structured product discovery.' },
]

const values = [
  { title: 'Mission', text: 'Make industrial procurement simpler, faster, and more reliable for teams that cannot afford downtime.' },
  { title: 'Values', text: 'Integrity, precision, and response speed are the operating principles that shape every enquiry.' },
  { title: 'Expertise', text: 'Deep familiarity with pulleys, couplings, gears, sprockets, and related power transmission parts.' },
]

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="about" ref={sectionRef} className="section-shell bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p data-reveal className="section-kicker w-fit">ABOUT US</p>
            <h2 data-reveal className="section-title mt-4 max-w-[620px]">
Premium Industrial & Power Transmission Products            </h2>
            <p data-reveal className="section-copy mt-5 max-w-[620px]">
              AL-BURHAN Industrial Drives supports OEMs, manufacturers, and maintenance teams with practical procurement support for transmission components across India.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((item, index) => {
                const Icon = item.icon

                return (
                  <div key={item.title} data-reveal className="flex gap-4 rounded-2xl border border-[rgba(0,51,102,0.08)] bg-[var(--color-offwhite)] p-4" style={{ animationDelay: `${index * 80}ms` }}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#d62828] shadow-[0_10px_24px_rgba(9,25,41,0.08)]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0f1720] normal-case tracking-normal">{item.title}</h3>
                      <p className="mt-1 text-[14px] leading-6 text-[#425062]">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-6" data-reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="about-image-shell sm:row-span-2">
                <Image src="/BG%20Image%20.jpeg" alt="Industrial facility and precision drive components" fill className="object-cover object-center" />
              </div>
              <div className="about-image-shell min-h-[200px]">
                <Image src="/products/gear.jpg" alt="Industrial gear products" fill className="object-cover" />
              </div>
              <div className="about-image-shell min-h-[200px]">
                <Image src="/products/coupling.jpg" alt="Industrial coupling products" fill className="object-cover" />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[rgba(0,51,102,0.08)] bg-[linear-gradient(135deg,#003366,#0b4c7f)] p-6 text-white shadow-[0_18px_46px_rgba(9,25,41,0.15)]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-[#ff6b00]">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/72">Mission Statement</p>
                  <p className="mt-1 text-[1rem] font-semibold normal-case tracking-normal text-white">Reliable industrial supply is a service discipline, not just a product list.</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {values.map((value) => (
                  <article key={value.title} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                    <h3 className="text-[0.8rem] font-bold uppercase tracking-[0.22em] text-white/82 normal-case">{value.title}</h3>
                    <p className="mt-2 text-[14px] leading-7 text-white/78 normal-case tracking-normal">{value.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-[1.5rem] border border-[rgba(0,51,102,0.08)] bg-[var(--color-offwhite)] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-kicker">25 YEAR TIMELINE</p>
              <h3 className="mt-3 text-[1.6rem] font-black text-[#0f1720] normal-case tracking-normal">Milestones that shaped the company</h3>
            </div>
          </div>

          <div className="timeline-grid mt-8 lg:grid-cols-4">
            {milestones.map((milestone) => (
              <article key={milestone.year} className="timeline-item rounded-2xl bg-white p-5 shadow-[0_12px_34px_rgba(9,25,41,0.08)]">
                <p className="text-[1.3rem] font-black text-[#d62828] normal-case tracking-normal">{milestone.year}</p>
                <h4 className="mt-2 text-[1rem] font-bold text-[#0f1720] normal-case tracking-normal">{milestone.title}</h4>
                <p className="mt-2 text-[14px] leading-7 text-[#425062] normal-case tracking-normal">{milestone.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
