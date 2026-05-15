'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

/* Distribute 12 projects across 3 rows */
const ROW_1 = [...projects.slice(0, 4),  ...projects.slice(0, 4)]   // duplicated for seamless loop
const ROW_2 = [...projects.slice(4, 8),  ...projects.slice(4, 8)]
const ROW_3 = [...projects.slice(8, 12), ...projects.slice(8, 12)]

const ROWS = [
  { items: ROW_1, dir: -1, speed: 22, scale: 1     },
  { items: ROW_2, dir:  1, speed: 28, scale: 1.08  },
  { items: ROW_3, dir: -1, speed: 18, scale: 0.94  },
]

export default function EndlessGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    /* Infinite marquee for each row */
    const tweens = ROWS.map((row, i) => {
      const el = rowRefs.current[i]
      if (!el) return null

      const xStart = row.dir === -1 ? '0%' : '-50%'
      const xEnd   = row.dir === -1 ? '-50%' : '0%'

      gsap.set(el, { x: xStart })

      return gsap.to(el, {
        x: xEnd,
        duration: row.speed,
        ease: 'none',
        repeat: -1,
      })
    })

    /* Scroll-driven speed modulation */
    let lastScroll = 0
    const onScroll = () => {
      const velocity = Math.abs(window.scrollY - lastScroll)
      lastScroll = window.scrollY
      tweens.forEach((tween, i) => {
        if (!tween) return
        const boost = 1 + Math.min(velocity * 0.06, 4)
        tween.timeScale(boost)
        gsap.to(tween, { timeScale: 1, duration: 1.5, ease: 'power2.out', overwrite: false })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* Entrance animation: rows stagger in */
    gsap.fromTo(
      rowRefs.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      }
    )

    return () => {
      tweens.forEach(t => t?.kill())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-bg flex flex-col items-center justify-center gap-6"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,169,110,0.03) 0%, #070707 60%)' }}
    >
      {/* Section header */}
      <div className="relative z-20 text-center mb-2">
        <span className="section-label justify-center">Endless Gallery · Section 04</span>
        <h2 className="font-display text-[clamp(24px,3vw,42px)] font-light mt-2 text-ink-dim">
          Infinite <em className="text-gold not-italic font-semibold">Motion</em>
        </h2>
      </div>

      {/* Edge fade vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #070707 0%, transparent 15%, transparent 85%, #070707 100%), linear-gradient(0deg, #070707 0%, transparent 20%, transparent 80%, #070707 100%)',
        }}
      />

      {/* Grid rows */}
      <div className="relative z-0 w-full flex flex-col gap-4">
        {ROWS.map((row, ri) => (
          <div key={ri} className="overflow-hidden">
            <div
              ref={el => { rowRefs.current[ri] = el }}
              className="flex gap-4 will-change-transform"
            >
              {row.items.map((p, ci) => (
                <ProjectCard
                  key={`${ri}-${ci}`}
                  project={p}
                  scale={row.scale}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project: p, scale }: { project: typeof projects[0]; scale: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    gsap.to(cardRef.current, { scale: 1.04, duration: 0.4, ease: 'power2.out' })
  }
  const handleLeave = () => {
    gsap.to(cardRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-hover
      className="relative shrink-0 border border-border-subtle overflow-hidden cursor-none group"
      style={{
        width: `clamp(240px,${20 * scale}vw,320px)`,
        height: `clamp(160px,${13 * scale}vw,200px)`,
        background: p.cssGradient,
      }}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 30%, ${p.accentHex}20, transparent 70%)` }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <span className="font-ui text-[9px] font-semibold tracking-widest2 uppercase"
            style={{ color: p.accentHex }}>
            {p.category}
          </span>
          <span className="font-ui text-[9px] text-ink-faint">{p.id}</span>
        </div>
        <div>
          <h3 className="font-display text-[clamp(14px,1.2vw,18px)] font-semibold text-ink leading-tight mb-1">
            {p.title}
          </h3>
          <span className="font-ui text-[9px] text-ink-faint">{p.year}</span>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
        style={{ background: p.accentHex }}
      />
    </div>
  )
}