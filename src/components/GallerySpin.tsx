'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

const CARDS = projects.slice(0, 10)
const RADIUS = 560
const ANGLE_STEP = 360 / CARDS.length

export default function GallerySpin() {
  const sectionRef  = useRef<HTMLElement>(null)
  const sceneRef    = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const rotY        = useRef(0)
  const target      = useRef(0)
  const paused      = useRef(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    /* Continuous auto-rotation via GSAP ticker */
    const tick = () => {
      if (!paused.current) target.current += 0.12
      rotY.current += (target.current - rotY.current) * 0.04
      carousel.style.transform = `rotateY(${rotY.current}deg)`
    }
    gsap.ticker.add(tick)

    /* Entrance animation */
    gsap.fromTo(
      sceneRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )

    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-screen overflow-hidden bg-bg flex flex-col items-center justify-center gap-12"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)' }}
      />

      {/* Section header */}
      <div className="relative z-10 text-center">
        <span className="section-label justify-center">Gallery Spin · Section 01</span>
        <h2 className="font-display text-[clamp(28px,4vw,48px)] font-light mt-3 text-ink-dim">
          Selected <em className="text-gold not-italic font-semibold">Work</em>
        </h2>
      </div>

      {/* 3D scene */}
      <div
        ref={sceneRef}
        className="relative w-full flex items-center justify-center"
        style={{ perspective: '1400px', height: 'clamp(400px,55vh,520px)' }}
      >
        <div
          ref={carouselRef}
          className="relative w-0 h-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {CARDS.map((p, i) => {
            const angle = ANGLE_STEP * i
            const isActive = active === i
            return (
              <div
                key={p.id}
                onMouseEnter={() => { paused.current = true; setActive(i) }}
                onMouseLeave={() => { paused.current = false; setActive(null) }}
                data-hover
                className="absolute flex flex-col justify-end p-6 border cursor-none
                           transition-[transform,box-shadow] duration-500"
                style={{
                  width: 'clamp(220px,18vw,280px)',
                  height: 'clamp(300px,38vh,380px)',
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) ${isActive ? 'scale(1.08)' : 'scale(1)'}`,
                  marginLeft: '-140px',
                  marginTop: '-190px',
                  background: p.cssGradient,
                  borderColor: isActive ? p.accentHex : 'rgba(237,232,223,0.07)',
                  boxShadow: isActive ? `0 0 40px ${p.accentHex}30, 0 20px 60px rgba(0,0,0,0.8)` : '0 10px 40px rgba(0,0,0,0.6)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* ID */}
                <span className="font-ui text-[10px] font-medium tracking-widest2 mb-auto pt-4"
                  style={{ color: p.accentHex }}>
                  {p.id}
                </span>

                {/* Content */}
                <span className="font-ui text-[9px] font-semibold tracking-widest2 uppercase mb-2"
                  style={{ color: p.accentHex }}>
                  {p.category}
                </span>
                <h3 className="font-display text-[clamp(16px,1.4vw,20px)] font-semibold text-ink leading-tight mb-1">
                  {p.title}
                </h3>
                <span className="font-ui text-[10px] text-ink-faint">{p.year}</span>

                {/* Hover line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300"
                  style={{ background: p.accentHex, opacity: isActive ? 1 : 0 }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Hint */}
      <p className="relative z-10 font-ui text-[10px] font-medium tracking-widest2 uppercase text-ink-faint animate-pulse">
        Hover to pause · Auto-rotating
      </p>
    </section>
  )
}