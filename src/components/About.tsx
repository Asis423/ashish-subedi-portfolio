'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 4,  suffix: '+', label: 'Years Experience'   },
  { value: 40, suffix: '+', label: 'Projects Delivered' },
  { value: 2,  suffix: '',  label: 'Companies Shaped'   },
]

const MARQUEE = [
  'Adobe Illustrator', '✦', 'Brand Identity', '✦', 'Photoshop', '✦',
  'Visual Systems', '✦', 'InDesign', '✦', 'Packaging Design', '✦',
  'Figma', '✦', 'Typography', '✦', 'Print Design', '✦',
  'Digital Illustration', '✦', 'GIS Visualisation', '✦', 'Art Direction', '✦',
]

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    /* Content fade-up */
    gsap.fromTo(contentRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true } }
    )

    /* Image reveal (clip-path wipe) */
    gsap.fromTo(imageRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true } }
    )

    /* Stat counters */
    counterRefs.current.forEach((el, i) => {
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: STATS[i].value, duration: 2.2, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.val) + STATS[i].suffix },
        scrollTrigger: { trigger: section, start: 'top 65%', once: true },
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-36 px-12 overflow-hidden">

      {/* Section label */}
      <div className="mb-16">
        <span className="section-label">About</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 max-w-350 mx-auto">

        {/* Image col */}
        <div ref={imageRef} className="relative">
          {/* Placeholder portrait */}
          <div className="relative aspect-3/4 bg-bg-card border border-border-subtle overflow-hidden">
            {/* Decorative gradient bg */}
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(200,169,110,0.15) 0%, transparent 60%)' }}
            />
            {/* Initials */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-ui font-extrabold text-[120px] text-gold/10 tracking-tight select-none">
                AS
              </span>
            </div>
            {/* Label overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 border-t border-border-subtle bg-bg/60 backdrop-blur-sm">
              <p className="font-ui text-[11px] font-medium tracking-widest2 uppercase text-ink-dim">
                Ashish Subedi
              </p>
              <p className="font-ui text-[10px] tracking-widest3 uppercase text-ink-faint mt-1">
                Kathmandu, Nepal
              </p>
            </div>
          </div>

          {/* Decorative accent line */}
          <div className="absolute -right-3 top-8 bottom-8 w-px bg-gold/30" />
        </div>

        {/* Content col */}
        <div ref={contentRef} className="flex flex-col justify-center gap-10">

          {/* Headline */}
          <h2 className="font-display font-light text-[clamp(32px,4vw,56px)] leading-[1.05]">
            Crafting Visual{' '}
            <em className="text-gold not-italic font-semibold">Identities</em>{' '}
            That Speak<br />Before Words Do.
          </h2>

          {/* Bio */}
          <div className="space-y-4 max-w-xl">
            <p className="font-ui text-sm leading-relaxed text-ink-dim">
              I&apos;m a Senior Graphic Designer with 4+ years of experience
              transforming complex brand stories into clear, compelling visuals.
              From brand systems and packaging to editorial layouts and digital
              campaigns — I bring ideas to life with precision and intent.
            </p>
            <p className="font-ui text-sm leading-relaxed text-ink-dim">
              Currently based in Kathmandu, open to remote opportunities and
              collaborations with ambitious brands globally. I thrive where
              strategy meets aesthetics.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 border-t border-border-subtle pt-8">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span
                  ref={el => { counterRefs.current[i] = el }}
                  className="font-ui font-extrabold text-[clamp(36px,4vw,52px)] text-gold leading-none"
                >
                  0{s.suffix}
                </span>
                <span className="font-ui text-[10px] font-medium tracking-widest2 uppercase text-ink-faint">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Resume link */}
          <a
            href="/CV_Ashish.pdf"
            download
            data-hover
            className="self-start flex items-center gap-3 font-ui text-[11px] font-semibold
                       tracking-widest2 uppercase text-gold border-b border-gold/40
                       pb-0.5 hover:border-gold transition-colors duration-300 group"
          >
            Download Résumé
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-24 overflow-hidden border-t border-b border-border-subtle py-5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="mx-6 font-ui text-[11px] font-medium tracking-widest2 uppercase
                         text-ink-faint shrink-0"
              style={{ color: item === '✦' ? '#C8A96E' : undefined }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}