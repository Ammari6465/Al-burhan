'use client'

import { useEffect, useMemo, useState } from 'react'

const LOADER_KEY = 'alburhan-loader-seen-v1'

export default function GearLoader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isStopping, setIsStopping] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  const loadingText = useMemo(() => 'Preparing the industrial-grade experience…', [])

  useEffect(() => {
    const hasSeenLoader = window.localStorage.getItem(LOADER_KEY) === 'true'
    if (hasSeenLoader) return

    setIsVisible(true)

    const stopTimer = window.setTimeout(() => setIsStopping(true), 1900)
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 2350)
    const hideTimer = window.setTimeout(() => {
      setIsVisible(false)
      window.localStorage.setItem(LOADER_KEY, 'true')
    }, 2850)

    return () => {
      window.clearTimeout(stopTimer)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      aria-label="Loading"
      className={`gear-loader fixed inset-0 z-[100] flex items-center justify-center ${isLeaving ? 'gear-loader--leave' : ''}`}
    >
      <div className="loader-dot-grid" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
        <div className="relative flex h-[104px] w-[132px] items-center justify-center" aria-hidden="true">
          <svg className={`gear-icon gear-icon--large ${isStopping ? 'gear-icon--slow' : 'loading'}`} viewBox="0 0 100 100" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="gearGradientLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D62828" />
                <stop offset="100%" stopColor="#003366" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="28" fill="none" stroke="url(#gearGradientLarge)" strokeWidth="3.5" />
            <path d="M50 10 L55 2 L63 5 L63 15 L74 20 L82 15 L88 22 L83 30 L90 40 L98 40 L100 50 L92 55 L92 64 L100 70 L98 80 L90 80 L83 90 L88 98 L82 104 L74 99 L63 104 L63 114 L55 117 L50 109 L45 117 L37 114 L37 104 L26 99 L18 104 L12 98 L17 90 L10 80 L2 80 L0 70 L8 64 L8 55 L0 50 L2 40 L10 40 L17 30 L12 22 L18 15 L26 20 L37 15 L37 5 L45 2 Z" transform="translate(0 -10)" fill="none" stroke="url(#gearGradientLarge)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className={`gear-icon gear-icon--small ${isStopping ? 'gear-icon--slow' : 'loading'}`} viewBox="0 0 100 100" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="gearGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#003366" />
                <stop offset="100%" stopColor="#D62828" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="20" fill="none" stroke="url(#gearGradientSmall)" strokeWidth="3.5" />
            <path d="M50 18 L54 12 L60 14 L60 22 L68 26 L74 22 L79 27 L75 34 L81 42 L88 42 L90 50 L84 54 L84 60 L90 66 L88 74 L81 74 L75 82 L79 89 L74 94 L68 90 L60 94 L60 102 L54 104 L50 98 L46 104 L40 102 L40 94 L32 90 L26 94 L21 89 L25 82 L19 74 L12 74 L10 66 L16 60 L16 54 L10 50 L12 42 L19 42 L25 34 L21 27 L26 22 L32 26 L40 22 L40 14 L46 12 Z" fill="none" stroke="url(#gearGradientSmall)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="loader-brand mt-4">AL-BURHAN</p>
        <p className="loader-sub mt-1">INDUSTRIAL DRIVES</p>
        <p className="loader-type mt-4" style={{ ['--type-length' as string]: loadingText.length }}>
          {loadingText}
        </p>

        <div className="loader-progress mt-6" aria-hidden="true">
          <div className="loader-progress__fill" />
        </div>
      </div>
    </div>
  )
}
