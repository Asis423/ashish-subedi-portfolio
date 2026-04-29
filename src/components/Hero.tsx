'use client'

import { useEffect, useRef, MutableRefObject } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FIRST = 'ASHISH'
const LAST  = 'SUBEDI'

export default function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const heroRef     = useRef<HTMLElement>(null)
  const charRefs    = useRef<(HTMLSpanElement | null)[]>([])
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const metaRef     = useRef<HTMLSpanElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  /* ── Three.js ─────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

    /* Particle field */
    const COUNT = 1200
    const pos   = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 4 + Math.random() * 9
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i*3+2] = r * Math.cos(phi) * 0.5
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0xc8a96e, size: 0.025, transparent: true, opacity: 0.5, sizeAttenuation: true,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    /* Wireframe torus knot */
    const tkGeo = new THREE.TorusKnotGeometry(2.4, 0.55, 120, 16)
    const tkMat = new THREE.MeshBasicMaterial({ color: 0xc8a96e, wireframe: true, transparent: true, opacity: 0.04 })
    const tk    = new THREE.Mesh(tkGeo, tkMat)
    tk.position.set(5, -1.5, -5)
    scene.add(tk)

    /* Wireframe icosahedron */
    const iGeo = new THREE.IcosahedronGeometry(1.8, 1)
    const iMat = new THREE.MeshBasicMaterial({ color: 0xc8a96e, wireframe: true, transparent: true, opacity: 0.06 })
    const ico  = new THREE.Mesh(iGeo, iMat)
    ico.position.set(-5, 2, -3)
    scene.add(ico)

    /* Thin orbit ring */
    const rGeo = new THREE.TorusGeometry(2.8, 0.006, 4, 180)
    const rMat = new THREE.MeshBasicMaterial({ color: 0xc8a96e, transparent: true, opacity: 0.1 })
    const ring = new THREE.Mesh(rGeo, rMat)
    ring.rotation.x = Math.PI * 0.35
    scene.add(ring)

    /* Mouse parallax */
    let mx = 0, my = 0
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / innerWidth  - 0.5) * 2
      my = (e.clientY / innerHeight - 0.5) * -2
    }
    window.addEventListener('mousemove', onMouse)

    /* Scroll fade-out */
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (st) => { canvas.style.opacity = String(1 - st.progress * 1.4) },
    })

    /* Resize */
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }
    window.addEventListener('resize', onResize)

    /* Animate */
    const clock = new THREE.Clock()
    let raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      particles.rotation.y = t * 0.025
      particles.rotation.x = t * 0.01
      tk.rotation.x  += 0.004;  tk.rotation.y  += 0.003
      ico.rotation.x -= 0.003;  ico.rotation.z += 0.004
      ring.rotation.z += 0.001
      camera.position.x += (mx * 0.35 - camera.position.x) * 0.03
      camera.position.y += (my * 0.35 - camera.position.y) * 0.03
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      ;[pGeo, tkGeo, iGeo, rGeo].forEach(g => g.dispose())
      ;[pMat, tkMat, iMat, rMat].forEach(m => m.dispose())
      renderer.dispose()
    }
  }, [])

  /* ── GSAP entrance ────────────────────────────────────────── */
  useEffect(() => {
    const chars    = charRefs.current.filter(Boolean) as HTMLSpanElement[]
    const subtitle = subtitleRef.current
    const meta     = metaRef.current
    const cta      = ctaRef.current
    const line     = lineRef.current
    const scroll   = scrollRef.current

    gsap.set(chars,    { y: '110%', opacity: 0 })
    gsap.set([subtitle, meta, cta, scroll], { y: 28, opacity: 0 })
    gsap.set(line,     { scaleX: 0, transformOrigin: 'left' })

    const tl = gsap.timeline({ delay: 0.25 })
    tl.to(chars,    { y: '0%', opacity: 1, duration: 1.3, stagger: 0.045, ease: 'power4.out' })
      .to(line,     { scaleX: 1, duration: 1.1, ease: 'power4.out' }, '-=0.9')
      .to(subtitle, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .to(meta,     { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(cta,      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(scroll,   { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')

    return () => { tl.kill() }
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-svh min-h-175 flex items-end overflow-hidden px-12 pb-16"
    >
      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Corner marks */}
      <div className="absolute top-30 left-12 w-10 h-10 border-t border-l border-border-gold pointer-events-none" />
      <div className="absolute bottom-16 right-12 w-10 h-10 border-b border-r border-border-gold pointer-events-none" />

      {/* Index counter */}
      <div className="absolute top-32.5 right-12 flex items-center gap-1.5
                      font-ui text-[11px] font-medium tracking-wide text-ink-faint pointer-events-none">
        <span>01</span>
        <span className="text-border-gold">/</span>
        <span>05</span>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-350 mx-auto">

        {/* Name */}
        <div className="mb-6">
          {/* First name */}
          <div className="flex overflow-hidden leading-[0.88]">
            {FIRST.split('').map((ch, i) => (
              <span
                key={`f${i}`}
                ref={el => { charRefs.current[i] = el }}
                className="inline-block font-ui font-extrabold
                           text-[clamp(72px,11vw,160px)] tracking-[-0.02em]
                           leading-[0.88] text-ink will-change-transform"
              >
                {ch}
              </span>
            ))}
          </div>
          {/* Last name */}
          <div className="flex overflow-hidden leading-[0.88]">
            {LAST.split('').map((ch, i) => (
              <span
                key={`l${i}`}
                ref={el => { charRefs.current[i + FIRST.length] = el }}
                className="inline-block font-ui font-extrabold
                           text-[clamp(72px,11vw,160px)] tracking-[-0.02em]
                           leading-[0.88] will-change-transform"
                style={{ color: i < 3 ? '#C8A96E' : '#EDE8DF' }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Gold rule */}
        <div
          ref={lineRef}
          className="w-full h-px mb-5"
          style={{ background: 'linear-gradient(90deg, #C8A96E 0%, rgba(200,169,110,0.1) 60%, transparent 100%)' }}
        />

        {/* Subtitle row */}
        <div className="flex items-baseline gap-10 mb-8 flex-wrap">
          <p ref={subtitleRef} className="font-display text-[clamp(18px,2vw,26px)] italic font-light text-ink-dim">
            Graphic Designer
          </p>
          <span ref={metaRef} className="font-ui text-[11px] font-medium tracking-widest2 uppercase text-ink-faint">
            Based in Kathmandu, Nepal
          </span>
        </div>

        {/* CTA row */}
        <div ref={ctaRef} className="flex items-center gap-10 flex-wrap">
          <a
            href="#work"
            data-hover
            className="relative flex items-center gap-3 overflow-hidden
                       font-ui text-[11px] font-semibold tracking-widest2 uppercase
                       bg-gold text-bg px-7 py-3.5
                       transition-[gap] duration-300 hover:gap-6
                       before:absolute before:inset-0 before:bg-ink
                       before:translate-x-[-101%] before:transition-transform before:duration-400
                       before:ease-[cubic-bezier(0.19,1,0.22,1)]
                       hover:before:translate-x-0"
          >
            <span className="relative z-10">Selected Work</span>
            <span className="relative z-10">→</span>
          </a>

          <div className="flex gap-2.5 flex-wrap">
            {['Brand Identity', 'Typography', 'Visual Systems', 'Packaging'].map(t => (
              <span
                key={t}
                className="font-ui text-[10px] font-medium tracking-[0.15em] uppercase
                           text-ink-faint border border-border-subtle px-3 py-1.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-16 right-12 flex flex-col items-center gap-2.5">
        <span
          className="font-ui text-[9px] font-semibold tracking-widest3 uppercase text-ink-faint"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
        </span>
        <div className="relative w-px h-16 bg-border-subtle overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gold animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}