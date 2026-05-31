'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>() {
  const rootRef = useRef<T>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const observedTargets = new Set<HTMLElement>()

    const showIfAlreadyVisible = () => {
      const viewportHeight = window.innerHeight

      observedTargets.forEach((target) => {
        const rect = target.getBoundingClientRect()
        const isVisible = rect.top < viewportHeight && rect.bottom > 0

        if (isVisible) {
          target.classList.add('is-visible')
        }
      })
    }

    const observeTarget = (target: HTMLElement, observer: IntersectionObserver) => {
      if (observedTargets.has(target)) return

      observedTargets.add(target)
      observer.observe(target)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    const scanForTargets = () => {
      Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')).forEach((target) => {
        observeTarget(target, observer)
      })
      showIfAlreadyVisible()
    }

    scanForTargets()

    const mutationObserver = new MutationObserver(() => {
      scanForTargets()
    })

    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return rootRef
}