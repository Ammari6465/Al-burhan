'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: 25,
    label: 'Years',
  },
  {
    value: 500,
    label: 'Clients',
  },
  {
    value: 1000,
    label: 'Products',
  },
  {
    value: 15,
    label: 'States',
  },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let hasAnimated = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return

        hasAnimated = true
        const start = performance.now()
        const duration = 1500

        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          setCounts(stats.map((stat) => Math.round(stat.value * progress)))

          if (progress < 1) {
            requestAnimationFrame(tick)
          }
        }

        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.15 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-[#E8ECF0] bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            return (
              <div
                key={index}
                data-reveal
                className={`group flex flex-col items-center justify-center px-5 py-6 text-center ${index < stats.length - 1 ? 'lg:border-r lg:border-[#E8ECF0]' : ''} ${index < 2 ? 'border-b border-[#E8ECF0] lg:border-b-0' : ''}`}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="font-heading text-[44px] font-extrabold leading-none text-[#0A3D62]">
                  {counts[index]}
                  <span className="align-top text-[32px] text-[#C0392B]">+</span>
                </p>
                <p className="mt-3 font-ui text-[13px] font-medium uppercase tracking-[0.12em] text-[#8896A8]">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
