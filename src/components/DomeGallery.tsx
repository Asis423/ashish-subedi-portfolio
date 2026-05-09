'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

function makeTex(p: typeof projects[0]): THREE.CanvasTexture {
  const W = 512, H = 380
  const cv = document.createElement('canvas')
  cv.width = W; cv.height = H
  const ctx = cv.getContext('2d')!

  ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, W, H)
  const hex = p.accentHex
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16)
  const grd = ctx.createRadialGradient(W*0.5, H*0.3, 0, W*0.5, H*0.5, W*0.7)
  grd.addColorStop(0, `rgba(${r},${g},${b},0.25)`)
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H)

  ctx.strokeStyle = hex; ctx.globalAlpha = 0.35; ctx.lineWidth = 1
  ctx.strokeRect(10, 10, W-20, H-20)
  ctx.globalAlpha = 1

  ctx.fillStyle = hex; ctx.font = '700 13px sans-serif'
  ctx.fillText(p.category.toUpperCase(), 22, 36)

  ctx.fillStyle = '#EDE8DF'; ctx.font = '700 24px sans-serif'
  ctx.fillText(p.title.length > 20 ? p.title.slice(0, 20) + '…' : p.title, 22, H - 52)

  ctx.fillStyle = '#4A4843'; ctx.font = '500 13px sans-serif'
  ctx.fillText(p.year, 22, H - 28)

  return new THREE.CanvasTexture(cv)
}

export default function DomeGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.clientWidth, H = canvas.clientHeight
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(80, W / H, 0.1, 200)
    camera.position.set(0, 0, 0.01)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))

    /* Dome of image planes */
    const DOME_RADIUS = 12
    const textures: THREE.CanvasTexture[] = []
    const planes: THREE.Mesh[] = []

    projects.forEach((p, i) => {
      const tex = makeTex(p)
      textures.push(tex)

      // Spherical distribution (hemisphere above + sides)
      const phi   = (i / projects.length) * Math.PI       // 0→π (top to equator)
      const theta = (i / projects.length) * Math.PI * 2 * 4 // multiple rotations

      const x = DOME_RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = DOME_RADIUS * Math.cos(phi) * 0.8 + 2
      const z = DOME_RADIUS * Math.sin(phi) * Math.sin(theta)

      const geo  = new THREE.PlaneGeometry(3.8, 2.8)
      const mat  = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geo, mat)

      mesh.position.set(x, y, z)
      mesh.lookAt(0, 0, 0) // face inward toward center (camera)

      scene.add(mesh)
      planes.push(mesh)
    })

    /* Subtle wireframe sphere outline */
    const sphereGeo = new THREE.SphereGeometry(DOME_RADIUS, 24, 16)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xc8a96e, wireframe: true, transparent: true, opacity: 0.025,
    })
    scene.add(new THREE.Mesh(sphereGeo, sphereMat))

    /* Mouse look-around */
    let yaw = 0, pitch = 0
    let targetYaw = 0, targetPitch = 0

    const onMouse = (e: MouseEvent) => {
      targetYaw   = ((e.clientX / innerWidth)  - 0.5) * Math.PI * 1.6
      targetPitch = ((e.clientY / innerHeight) - 0.5) * Math.PI * 0.8
    }

    /* Touch support */
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      targetYaw   = ((t.clientX / innerWidth)  - 0.5) * Math.PI * 1.6
      targetPitch = ((t.clientY / innerHeight) - 0.5) * Math.PI * 0.8
    }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch)

    /* Entrance animation */
    gsap.fromTo(canvas, { opacity: 0 }, {
      opacity: 1, duration: 1.4,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })

    /* Auto-pan when idle */
    let idleTimer = 0

    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)
      idleTimer++

      // Slow auto-drift when not moving mouse
      if (idleTimer > 180) {
        targetYaw += 0.003
      }

      yaw   += (targetYaw   - yaw)   * 0.04
      pitch += (targetPitch - pitch) * 0.04

      camera.rotation.order = 'YXZ'
      camera.rotation.y = yaw
      camera.rotation.x = -pitch

      /* Highlight nearest plane */
      planes.forEach(plane => {
        const dir = plane.position.clone().normalize()
        const camDir = new THREE.Vector3(0, 0, -1)
          .applyEuler(new THREE.Euler(camera.rotation.x, camera.rotation.y, 0, 'YXZ'))
        const dot = dir.dot(camDir)
        ;(plane.material as THREE.MeshBasicMaterial).opacity = 0.35 + dot * 0.65
        plane.scale.setScalar(dot > 0.85 ? 1 + (dot - 0.85) * 1.5 : 1)
      })

      renderer.render(scene, camera)
    }
    animate()

    const resetIdle = () => { idleTimer = 0 }
    window.addEventListener('mousemove', resetIdle)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mousemove', resetIdle)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', onResize)
      textures.forEach(t => t.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-bg"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Label */}
      <div className="absolute top-8 left-12 z-10">
        <span className="section-label">Dome Gallery · Section 03</span>
        <h2 className="font-display text-[clamp(20px,2.5vw,34px)] font-light mt-2 text-ink-dim">
          All <em className="text-gold not-italic font-semibold">Around</em>
        </h2>
      </div>

      {/* Crosshair center indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative w-6 h-6">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/40" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/40" />
          <div className="absolute inset-1 rounded-full border border-gold/30" />
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <p className="font-ui text-[10px] font-medium tracking-widest2 uppercase text-ink-faint text-center">
          Move mouse to explore the dome
        </p>
      </div>
    </section>
  )
}