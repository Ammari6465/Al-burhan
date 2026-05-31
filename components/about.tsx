'use client'

import Image from 'next/image'
import {
  IconBuildingFactory,
  IconCircleCheck,
  IconHeadphones,
  IconMapPin,
  IconQuote,
  IconShieldCheck,
  IconTruckDelivery,
} from '@tabler/icons-react'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

const stats = [
  { value: '40+', label: 'Years' },
  { value: '10,000+', label: 'SKUs' },
  { value: 'Pan-India', label: 'Supply' },
  { value: 'OEM Trusted', label: 'Buyers' },
]

const trustTiles = [
  { icon: IconMapPin, title: 'Mumbai HQ' },
  { icon: IconShieldCheck, title: 'GSTIN Verified' },
]

const features = [
  {
    icon: IconBuildingFactory,
    title: 'Manufacturing insight',
    description: 'Practical knowledge of transmission components, fitment, and procurement reality.',
  },
  {
    icon: IconCircleCheck,
    title: 'Quality discipline',
    description: 'Consistent checking of dimensions, finish, and application fit before dispatch.',
  },
  {
    icon: IconHeadphones,
    title: 'Buyer support',
    description: 'Responsive help for OEM teams, maintenance buyers, and repeat industrial orders.',
  },
  {
    icon: IconTruckDelivery,
    title: 'Fast dispatch',
    description: 'Coordinated supply handling for urgent jobs and routine replacement needs.',
  },
]

const principles = [
  {
    title: 'MISSION',
    text: 'Make industrial procurement simpler, faster, and more reliable for teams that cannot afford downtime.',
  },
  {
    title: 'VALUES',
    text: 'Integrity, precision, and response speed shape every enquiry and every dispatch decision.',
  },
  {
    title: 'EXPERTISE',
    text: 'Deep familiarity with pulleys, couplings, gears, sprockets, and related power transmission parts.',
  },
]

export default function About() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section id="about" ref={sectionRef} className="bg-[#F4F6FA] py-[48px] sm:py-[56px] lg:py-[60px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr] lg:items-stretch xl:gap-6">
          <div className="flex h-full min-w-0 flex-col justify-between">
            <div>
              <span
                data-reveal
                className="inline-flex rounded-full border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-[#E6F1FB] px-4 py-2 text-[11px] font-medium tracking-[0.04em] text-[#0F3460]"
              >
                About us
              </span>

              <div className="mt-5 max-w-2xl space-y-4">
                <h2
                  data-reveal
                  className="max-w-[16ch] text-[32px] font-medium leading-[1.12] tracking-[-0.02em] text-[#0F3460]"
                >
                  Premium industrial & power transmission products
                </h2>
                <p data-reveal className="text-[14px] font-normal leading-6 text-[#6B7280]">
                  Trusted by OEMs and maintenance teams across India since 2004.
                </p>
                <p data-reveal className="max-w-2xl text-[14px] font-normal leading-7 text-[#6B7280]">
                  AL-BURHAN Industrial Drives is a Mumbai-based B2B stockist supporting manufacturers,
                  maintenance teams, and repeat procurement buyers with practical sourcing guidance.
                  We check fit, finish, and specification alignment before dispatch, then coordinate
                  dependable pan-India supply for urgent orders and ongoing production needs.
                </p>
              </div>

              <div data-reveal className="mt-6 grid max-w-2xl grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-[12px] border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-[#F4F6FA] px-4 py-4"
                  >
                    <p className="text-[22px] font-medium leading-none tracking-[-0.02em] text-[#0F3460]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[12px] font-normal text-[#6B7280]">{stat.label}</p>
                  </article>
                ))}
              </div>
            </div>

            <div data-reveal className="mt-6">
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-[12px] bg-[#0F3460] px-5 text-[13px] font-medium text-white transition-colors hover:bg-[#185FA5]"
              >
                Request a quote →
              </a>
            </div>
          </div>

          <div className="flex h-full min-w-0 flex-col justify-between gap-3" data-reveal>
            <div className="rounded-[12px] border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-white p-3">
              <div className="relative overflow-hidden rounded-[12px] border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-white">
                <div className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-[#1F9D55] px-3 py-1 text-[11px] font-medium text-white">
                  Verified Stockist ✓
                </div>

                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/BG%20Image%20.jpeg"
                    alt="AL-BURHAN Industries storefront in Mumbai"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 rounded-full border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-[#0F3460] px-3 py-1.5 text-[11px] font-medium text-white">
                  <IconMapPin size={14} stroke={1.8} />
                  <span>Nagdevi St, Mumbai</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {trustTiles.map((tile) => {
                const Icon = tile.icon

                return (
                  <div
                    key={tile.title}
                    className="flex items-center gap-3 rounded-[12px] border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-[#F4F6FA] px-4 py-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F1FB] text-[#185FA5]">
                      <Icon size={16} stroke={1.8} />
                    </div>
                    <span className="text-[12px] font-normal text-[#6B7280]">{tile.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div data-reveal className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.title}
                className="flex gap-4 rounded-[12px] border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-white px-4 py-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E6F1FB] text-[#185FA5]">
                  <Icon size={18} stroke={1.8} />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-[#0F3460]">{item.title}</h3>
                  <p className="mt-1 text-[12px] font-normal leading-5 text-[#6B7280]">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div data-reveal className="mt-6 rounded-[12px] border border-[0.5px] border-[rgba(0,0,0,0.1)] bg-[#0F3460] px-5 py-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#132952] text-[#185FA5]">
              <IconQuote size={18} stroke={1.8} />
            </div>
            <div className="min-w-0">
              <p style={{ fontVariant: 'small-caps' }} className="text-[11px] font-medium tracking-[0.18em] text-[#85B7EB]">
                Mission statement
              </p>
              <p className="mt-2 text-[16px] font-medium leading-7 text-white">
                Reliable industrial supply is a service discipline, not just a product list.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.title}
                className="rounded-[12px] border border-[0.5px] border-[rgba(255,255,255,0.1)] bg-[#132952] px-5 py-5"
              >
                <h3 className="text-[11px] font-medium tracking-[0.18em] text-[#85B7EB]">{item.title}</h3>
                <p className="mt-3 text-[12px] font-normal leading-6 text-[#B5D4F4]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}