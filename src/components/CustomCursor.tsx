'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isHover = useRef(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX  = -100, ringY  = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = () => {
      isHover.current = true
      ring.classList.add('scale-[1.6]', 'border-gold', 'bg-gold/10')
      dot.classList.add('scale-50')
    }
    const onLeave = () => {
      isHover.current = false
      ring.classList.remove('scale-[1.6]', 'border-gold', 'bg-gold/10')
      dot.classList.remove('scale-50')
    }

    const attach = () => {
      document
        .querySelectorAll<HTMLElement>('a, button, [data-hover]')
        .forEach((el) => {
          el.addEventListener('mouseenter', onEnter)
          el.addEventListener('mouseleave', onLeave)
        })
    }

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })
    attach()

    const tick = () => {
      dot.style.transform  = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      rafId = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className={cn(
          'fixed top-0 left-0 z-[99999] pointer-events-none',
          'w-2 h-2 rounded-full bg-gold',
          'transition-transform duration-200 will-change-transform'
        )}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className={cn(
          'fixed top-0 left-0 z-[99998] pointer-events-none',
          'w-10 h-10 rounded-full border border-gold/50',
          'transition-[transform,border-color,background] duration-300 will-change-transform'
        )}
      />
    </>
  )
}