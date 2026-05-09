'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

function makeCardTexture(p: typeof projects[0]): THREE.CanvasTexture {
  const W = 640, H = 460
  const cv  = document.createElement('canvas')
  cv.width  = W
  cv.height = H
  const ctx = cv.getContext('2d')!

  /* BG */
  const hex = p.accentHex
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const grad = ctx.createLinearGradient(0, 0, W, H)
  grad.addColorStop(0, `rgba(${r},${g},${b},0.12)`)
  grad.addColorStop(1, 'rgba(7,7,7,0.98)')
  ctx.fillStyle = 'rgb(10,10,10)'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  /* Border */
  ctx.strokeStyle = hex
  ctx.globalAlpha = 0.4
  ctx.lineWidth = 1.5
  ctx.strokeRect(12, 12, W - 24, H - 24)
  ctx.globalAlpha = 1

  /* ID */
  ctx.fillStyle = hex
  ctx.globalAlpha = 0.6
  ctx.font = '500 18px monospace'
  ctx.fillText(p.id, 28, 50)
  ctx.globalAlpha = 1

  /* Category */
  ctx.fillStyle = hex
  ctx.font = '600 14px sans-serif'
  ctx.fillText(p.category.toUpperCase(), 28, H - 70)

  /* Title */
  ctx.fillStyle = '#EDE8DF'
  ctx.font = '700 28px sans-serif'
  const words = p.title.split(' ')
  let line = '', y = H - 44
  for (let i = words.length - 1; i >= 0; i--) {
    line = words[i] + (line ? ' ' + line : '')
  }
  ctx.fillText(p.title.length > 22 ? p.title.slice(0, 22) + '…' : p.title, 28, H - 40)

  /* Year */
  ctx.fillStyle = '#4A4843'
  ctx.font = '500 14px sans-serif'
  ctx.fillText(p.year, W - 70, H - 40)

  return new THREE.CanvasTexture(cv)
}

export default function VortexGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    /* Scene */
    const scene    = new THREE.Scene()
    scene.fog      = new THREE.FogExp2(0x000000, 0.028)
    const camera   = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 0.1, 200)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

    /* Planes in helix */
    const planes: THREE.Mesh[] = []
    const textures: THREE.CanvasTexture[] = []

    projects.forEach((p, i) => {
      const tex = makeCardTexture(p)
      textures.push(tex)

      const geo = new THREE.PlaneGeometry(3.2, 2.3)
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.92, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geo, mat)

      const angle  = (i / projects.length) * Math.PI * 2 * 3  // 3 full rotations
      const radius = 3.5 + Math.sin(i * 0.4) * 0.5
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -i * 5
      )
      mesh.lookAt(camera.position)
      mesh.rotation.z = angle * 0.3

      scene.add(mesh)
      planes.push(mesh)
    })

    /* Axis line */
    const linePts = [new THREE.Vector3(0, 0, 8), new THREE.Vector3(0, 0, -projects.length * 5 - 5)]
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts)
    const lineMat = new THREE.LineBasicMaterial({ color: 0xc8a96e, transparent: true, opacity: 0.08 })
    scene.add(new THREE.Line(lineGeo, lineMat))

    /* Scroll-driven camera */
    const totalDepth = -(projects.length * 5 + 5)
    const scrollState = { progress: 0 }

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (st) => {
        scrollState.progress = st.progress
        if (progressRef.current) {
          progressRef.current.style.width = `${st.progress * 100}%`
        }
      },
    })

    /* Resize */
    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)

      const p = scrollState.progress
      camera.position.z = 8 + p * totalDepth
      camera.position.x = Math.sin(p * Math.PI * 4) * 0.4
      camera.position.y = Math.cos(p * Math.PI * 3) * 0.3
      camera.rotation.z = p * Math.PI * 0.15

      /* Pulse planes near camera */
      planes.forEach((plane, i) => {
        const dist = Math.abs(plane.position.z - camera.position.z)
        const s = dist < 8 ? 1 + (1 - dist / 8) * 0.12 : 1
        plane.scale.setScalar(s);
        (plane.material as THREE.MeshBasicMaterial).opacity = Math.max(0.15, 1 - dist * 0.06)
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      textures.forEach(t => t.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg"
      style={{ height: '600vh' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Label overlay */}
        <div className="absolute top-8 left-12 z-10">
          <span className="section-label">Vortex Gallery · Section 02</span>
          <h2 className="font-display text-[clamp(20px,2.5vw,34px)] font-light mt-2 text-ink-dim">
            Into the <em className="text-gold not-italic font-semibold">Work</em>
          </h2>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle z-10">
          <div ref={progressRef} className="h-full bg-gold transition-none" style={{ width: '0%' }} />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center">
          <p className="font-ui text-[10px] font-medium tracking-widest2 uppercase text-ink-faint">
            Scroll to travel through
          </p>
        </div>
      </div>
    </section>
  )
}