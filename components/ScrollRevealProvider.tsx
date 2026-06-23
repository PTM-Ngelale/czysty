'use client'

import { useEffect } from 'react'

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const SELECTORS = '.reveal, .reveal-left, .reveal-right, .reveal-stagger'
    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS))

    const trigger = (el: HTMLElement) => el.classList.add('visible')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trigger(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    elements.forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect()
      // Immediately show elements already in the initial viewport
      if (top < window.innerHeight && bottom > 0) {
        trigger(el)
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
