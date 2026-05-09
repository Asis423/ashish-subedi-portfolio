'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

function makeTex(p: typeof projects[0]): THREE.CanvasTexture {
  const W = 720, H = 480
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!

  const hex = p.accentHex
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)

  ctx.fillStyle = '#070707'; ctx.fillRect(0, 0, W, H)
  const grd = ctx.createLinearGradient(0, 0, W, H)
  grd.addColorStop(0, `rgba(${r},${g},${b},0.18)`)
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H)

  /* Top accent bar */
  ctx.fillStyle = hex; ctx.fillRect(0, 0, W, 3)

  /* Border */
  ctx.strokeStyle = hex; ctx.globalAlpha = 0.3; ctx.lineWidth = 1
  ctx.strokeRect(14, 14, W-28, H-28); ctx.globalAlpha = 1

  /* ID large */
  ctx.fillStyle = hex; ctx.globalAlpha = 0.06; ctx.font = '900 180px sans-serif'
  ctx.fillText(p.id, W - 180, H - 20); ctx.globalAlpha = 1

  /* Category */
  ctx.fillStyle = hex; ctx.font = '600 13px sans-serif'
  ctx.fillText(p.category.toUpperCase(), 28, 52)

  /* Title */
  ctx.fillStyle = '#EDE8DF'; ctx.font = '800 36px sans-serif'
  const title = p.title.length > 24 ? p.title.slice(0, 24) + '…' : p.title
  ctx.fillText(title, 28, H / 2 + 10)

  /* Description */
  ctx.fillStyle = '#9E9A93'; ctx.font = '400 15px sans-serif'
  const desc = p.description.length > 55 ? p.description.slice(0, 55) + '…' : p.description
  ctx.fillText(desc, 28, H / 2 + 36)

  /* Year */
  ctx.fillStyle = '#4A4843'; ctx.font = '500 14px sans-serif'
  ctx.fillText(p.year, 28, H - 28)

  return new THREE.CanvasTexture(cv)
}

export default function CinematicGallery() {
  const sectionRef   = useRef<HTMLElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const [current, setCurrent] = useState(0)
  const [title, setTitle]     = useState(projects[0].title)
  const [category, setCategory] = useState(projects[0].category)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const W = canvas.clientWidth, H = canvas.clientHeight
    const scene  = new THREE.Scene()
    scene.fog    = new THREE.Fog(0x000000, 12, 40)

    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 100)
    camera.position.set(0, 0, 10)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

    /* Create all cards */
    const textures: THREE.CanvasTexture[] = []
    const meshes: THREE.Mesh[] = []

    projects.forEach((p, i) => {
      const tex = makeTex(p)
      textures.push(tex)

      const geo = new THREE.PlaneGeometry(5.5, 3.7)
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geo, mat)

      /* Arc formation: spread in a curved line */
      const angle = ((i - (projects.length - 1) / 2) / projects.length) * Math.PI * 0.9
      const R = 14
      mesh.position.set(Math.sin(angle) * R, 0, -Math.cos(angle) * R + R - 5)
      mesh.rotation.y = -angle
      mesh.scale.setScalar(0.82)

      scene.add(mesh)
      meshes.push(mesh)
    })

    /* Floating particles around scene */
    const pCount = 400
    const pPos   = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i*3]   = (Math.random() - 0.5) * 30
      pPos[i*3+1] = (Math.random() - 0.5) * 20
      pPos[i*3+2] = (Math.random() - 0.5) * 30 - 5
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: 0xc8a96e, size: 0.04, transparent: true, opacity: 0.35,
    })))

    /* Scroll drives which project is "active" */
    const scrollState = { idx: 0 }
    let currentIdx = 0

    const updateActive = (idx: number) => {
      if (idx === currentIdx) return
      currentIdx = idx
      setCurrent(idx)
      setTitle(projects[idx].title)
      setCategory(projects[idx].category)
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.8,
      onUpdate: (st) => {
        const idx = Math.min(Math.floor(st.progress * projects.length), projects.length - 1)
        scrollState.idx = idx
        updateActive(idx)
      },
    })

    /* Mouse parallax */
    let mx = 0, my = 0
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / innerWidth - 0.5) * 2
      my = (e.clientY / innerHeight - 0.5) * -2
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let raf: number
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const idx = scrollState.idx

      /* Camera orbits to face current project */
      const targetAngle = ((idx - (projects.length - 1) / 2) / projects.length) * Math.PI * 0.9
      const camX = Math.sin(targetAngle) * 5
      const camZ = 10 + Math.cos(targetAngle) * 2

      camera.position.x += (camX + mx * 0.4 - camera.position.x) * 0.04
      camera.position.y += (my * 0.3 - camera.position.y) * 0.04
      camera.position.z += (camZ - camera.position.z) * 0.04
      camera.lookAt(meshes[idx]?.position ?? new THREE.Vector3(0, 0, 0))

      /* Style each mesh based on proximity to current */
      meshes.forEach((mesh, i) => {
        const dist  = Math.abs(i - idx)
        const tScale = dist === 0 ? 1.0 : dist === 1 ? 0.82 : 0.65
        const tOpacity = dist === 0 ? 1.0 : Math.max(0, 1 - dist * 0.35)

        mesh.scale.x += (tScale - mesh.scale.x) * 0.06
        mesh.scale.y += (tScale - mesh.scale.y) * 0.06
        ;(mesh.material as THREE.MeshBasicMaterial).opacity += (tOpacity - (mesh.material as THREE.MeshBasicMaterial).opacity) * 0.06

        if (dist === 0) {
          mesh.position.y = Math.sin(t * 0.8 + i) * 0.08
        }
      })

      /* Particle drift */
      pGeo.attributes.position.array.forEach((_, idx) => {
        if (idx % 3 === 1) {
          (pGeo.attributes.position.array as Float32Array)[idx] += Math.sin(t * 0.3 + idx) * 0.001
        }
      })
      pGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      textures.forEach(t => t.dispose())
      pGeo.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg"
      style={{ height: '500vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Section label */}
        <div className="absolute top-8 left-12 z-10">
          <span className="section-label">Cinematic Gallery · Section 05</span>
          <h2 className="font-display text-[clamp(20px,2.5vw,34px)] font-light mt-2 text-ink-dim">
            The <em className="text-gold not-italic font-semibold">Showcase</em>
          </h2>
        </div>

        {/* Current project info */}
        <div className="absolute bottom-16 left-12 z-10 max-w-xs">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-6 h-px bg-gold" />
            <span className="font-ui text-[10px] font-semibold tracking-widest2 uppercase text-gold">
              {projects[current]?.category}
            </span>
          </div>
          <h3 className="font-display text-[clamp(18px,2vw,28px)] font-semibold text-ink leading-tight">
            {projects[current]?.title}
          </h3>
          <p className="font-ui text-[11px] text-ink-faint mt-2">
            {projects[current]?.description}
          </p>
        </div>

        {/* Progress dots */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === current ? '3px' : '2px',
                height: i === current ? '24px' : '6px',
                background: i === current ? '#C8A96E' : 'rgba(237,232,223,0.2)',
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute bottom-8 right-12 z-10 font-ui text-[11px] text-ink-faint">
          <span className="text-gold font-semibold">{String(current + 1).padStart(2, '0')}</span>
          <span className="mx-2 text-border-gold">/</span>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <p className="font-ui text-[10px] font-medium tracking-widest2 uppercase text-ink-faint">
            Scroll to navigate
          </p>
        </div>
      </div>
    </section>
  )
}