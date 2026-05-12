'use client'

import { Cog } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function GearLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // smoothly animate progress to 100% over ~2200ms, then hide
    let start: number | null = null
    const duration = 2200

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)
      if (elapsed < duration) {
        requestAnimationFrame(step)
      } else {
        // hold a tiny moment at 100% for UX, then hide
        setTimeout(() => setIsVisible(false), 250)
      }
    }

    const raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      aria-label="Loading"
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ animation: 'loaderFadeOut 0.25s ease-in 0.98s forwards', background: '#FFFFFF' }}
    >
      <div className="absolute inset-0 flex items-center justify-center px-6 pb-6">
        <div className="w-full max-w-md text-center text-black">
          <div className="mx-auto flex flex-col items-center">
            <div className="flex items-center justify-center -space-x-4">
                <div className="gear-small">
                <Cog
                  className="h-14 w-14"
                  strokeWidth={2.4}
                  style={{ color: '#0A3D62', filter: 'drop-shadow(0 6px 14px rgba(10,61,98,0.12))' }}
                  aria-hidden="true"
                />
              </div>
              <div className="gear-large">
                <Cog
                  className="h-20 w-20"
                  strokeWidth={2.6}
                  style={{ color: '#C0392B', filter: 'drop-shadow(0 8px 18px rgba(192,57,43,0.14))' }}
                  aria-hidden="true"
                />
              </div>
            </div>

            <p className="mt-6 text-sm tracking-[0.7em] uppercase loading-text">LOADING</p>

            <div className="mx-auto mt-6 h-7 w-[280px] rounded-full border border-black/60 bg-white p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.18)] sm:w-[330px]">
              <div
                className="h-full rounded-full transition-all duration-200 progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-5 text-xl font-semibold loading-percent">{progress}%</p>

            <div className="mt-6 space-y-1 text-base text-black/85">
              <p>Precision systems loading…</p>
              <p>Forging the interface for industrial performance.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gearSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gearSpinReverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes loaderFadeOut {
          0% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        .gear {
          transform-box: fill-box;
          transform-origin: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .gear-small {
          animation: gearSpinReverse 1.6s linear infinite;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .gear-large {
          animation: gearSpin 1.6s linear infinite;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* gradient progress fill and subtle blur/glow */
        .progress-fill {
          background: linear-gradient(90deg, #0b5bd7 0%, #c12b2b 100%);
          box-shadow: 0 6px 20px rgba(193,43,43,0.12), inset 0 -2px 6px rgba(255,255,255,0.08);
          height: 100%;
          border-radius: 9999px;
          filter: drop-shadow(0 6px 12px rgba(12,66,200,0.06));
        }

        .loading-text {
          background: linear-gradient(90deg, #0b5bd7, #c12b2b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 600;
          letter-spacing: 0.7em;
        }

        .loading-percent {
          color: #111111;
          text-shadow: 0 2px 8px rgba(193,43,43,0.06);
        }
      `}</style>
    </div>
  )
}
