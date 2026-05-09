'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOFTWARE = [
  'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign',
  'Figma', 'Adobe XD', 'Lightroom',
]

const DISCIPLINES = [
  'Brand Identity', 'Visual Systems', 'Typography',
  'Packaging Design', 'Art Direction', 'Editorial Design',
  'Digital Illustration', 'GIS Visualisation', 'Print Design',
]

const TOOLS = ['HTML · CSS · JS', 'PHP · MySQL', 'Google Earth Pro', 'ArcGIS', 'Figma Prototyping']

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('[data-skill]')
    if (!items) return

    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.04, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="relative py-36 px-12 bg-bg overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border-subtle" />

      <div className="max-w-350 mx-auto">
        <div className="mb-16">
          <span className="section-label">Skills & Tools · Section 06</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Software */}
          <div>
            <h3 className="font-ui text-[10px] font-semibold tracking-widest3 uppercase text-ink-faint mb-8 pb-4 border-b border-border-subtle">
              Software
            </h3>
            <div className="flex flex-col gap-3">
              {SOFTWARE.map((s) => (
                <div key={s} data-skill className="flex items-center gap-4 group cursor-none" data-hover>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="font-display text-[clamp(18px,1.8vw,24px)] font-light text-ink-dim group-hover:text-ink transition-colors duration-300">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disciplines */}
          <div>
            <h3 className="font-ui text-[10px] font-semibold tracking-widest3 uppercase text-ink-faint mb-8 pb-4 border-b border-border-subtle">
              Disciplines
            </h3>
            <div className="flex flex-col gap-3">
              {DISCIPLINES.map((d) => (
                <div key={d} data-skill className="flex items-center gap-4 group cursor-none" data-hover>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-150 transition-transform duration-300" />
                  <span className="font-display text-[clamp(18px,1.8vw,24px)] font-light text-ink-dim group-hover:text-ink transition-colors duration-300">
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional tools + highlight stat */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="font-ui text-[10px] font-semibold tracking-widest3 uppercase text-ink-faint mb-8 pb-4 border-b border-border-subtle">
                Additional Tools
              </h3>
              <div className="flex flex-col gap-3">
                {TOOLS.map((t) => (
                  <div key={t} data-skill className="flex items-center gap-4 group cursor-none" data-hover>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
                    <span className="font-ui text-sm text-ink-dim group-hover:text-ink transition-colors duration-300">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight block */}
            <div data-skill className="border border-border-gold p-8"
              style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.05) 0%, transparent 100%)' }}>
              <p className="font-display text-[clamp(36px,4vw,54px)] font-light text-gold leading-none">4+</p>
              <p className="font-ui text-[10px] font-semibold tracking-widest2 uppercase text-ink-faint mt-2">
                Years of Professional Experience
              </p>
              <p className="font-display text-sm font-light italic text-ink-dim mt-4 leading-relaxed">
                "Translating complex ideas into visuals that align with brand strategy and business goals."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}