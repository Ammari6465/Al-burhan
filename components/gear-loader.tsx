'use client'

import { Cog } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function GearLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIsLeaving(true), 800)
    const hideTimer = window.setTimeout(() => setIsVisible(false), 1150)

    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      aria-label="Loading"
      className={`loader-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#0A3D62] ${isLeaving ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(192,57,43,0.15),transparent_24%)]" />
      <div className="relative flex flex-col items-center gap-5 px-6 text-center text-white">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/8 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <Cog className="h-10 w-10 animate-spin text-[#C0392B]" strokeWidth={2.2} aria-hidden="true" />
        </div>
        <p className="section-kicker text-[11px] font-semibold tracking-[0.22em] text-white/70">Loading</p>
        <p className="max-w-xs text-sm leading-7 text-white/60">Preparing the industrial-grade experience.</p>
      </div>
    </div>
  )
}
