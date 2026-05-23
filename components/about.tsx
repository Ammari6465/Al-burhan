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

const values = [
  { title: 'Mission', text: 'Make industrial procurement simpler, faster, and more reliable for teams that cannot afford downtime.' },
  { title: 'Values', text: 'Integrity, precision, and response speed are the operating principles that shape every enquiry.' },
  { title: 'Expertise', text: 'Deep familiarity with pulleys, couplings, gears, sprockets, and related power transmission parts.' },
]

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="about" ref={sectionRef} className="section-shell bg-white py-16 sm:py-24">
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
            <div className="about-image-shell about-image-shell--featured">
              <Image
                src="/BG%20Image%20.jpeg"
                alt="AL-BURHAN Industries storefront in Mumbai"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="about-image-shell about-image-shell--thumb">
                <Image src="/products/gear.jpg" alt="Industrial gear products" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="about-image-shell about-image-shell--thumb">
                <Image src="/products/coupling.jpg" alt="Industrial coupling products" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
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

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  )
}
