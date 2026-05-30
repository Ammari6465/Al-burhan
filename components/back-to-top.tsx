'use client'

import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 left-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#C0392B] text-white shadow-[0_0_18px_rgba(192,57,43,0.35)] transition-all duration-200 ${isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'} hover:bg-[#A93226] hover:shadow-[0_0_22px_rgba(192,57,43,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0392B]`}
    >
      <ChevronUp size={18} />
    </button>
  )
}
