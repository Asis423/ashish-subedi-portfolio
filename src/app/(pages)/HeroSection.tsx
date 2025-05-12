"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { InteractiveHoverButton } from "../../components/magicui/interactive-hover-button"

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Particle cloud component
function ParticleCloud({ count = 2000 }) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate random positions for particles
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    // Emerald green with variations
    colors[i3] = 0.1 + Math.random() * 0.1 // R
    colors[i3 + 1] = 0.7 + Math.random() * 0.3 // G
    colors[i3 + 2] = 0.5 + Math.random() * 0.2 // B
  }

  // Animation
  useFrame((state) => {
    if (!pointsRef.current) return

    // Rotate based on mouse position
    pointsRef.current.rotation.x += 0.0005
    pointsRef.current.rotation.y += 0.0005

    // React to mouse movement
    pointsRef.current.rotation.x += (state.mouse.y * 0.1 - pointsRef.current.rotation.x) * 0.05
    pointsRef.current.rotation.y += (state.mouse.x * 0.1 - pointsRef.current.rotation.y) * 0.05
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} color="#10b981" />
      <ParticleCloud />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  )
}

export default function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const subTextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const heroContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined') return
    
    // Ensure refs are available
    if (!textRef.current || !subTextRef.current || !ctaRef.current || !scrollIndicatorRef.current) return
    
    // Text animations with GSAP
    const tl = gsap.timeline({ delay: 1 }) // Increased delay to ensure navbar animation completes first

    tl.fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(
        subTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(
        scrollIndicatorRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            // Add bounce animation to scroll indicator
            gsap.to(scrollIndicatorRef.current, {
              y: "10px",
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            })
          },
        },
        "-=0.2",
      )

    // Add dark overlay gradient to make text more visible
    if (heroContainerRef.current) {
      gsap.fromTo(
        heroContainerRef.current,
        { background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)" },
        { background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)", duration: 2 }
      )
    }

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [])

  // Smooth scroll function
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home">

    <div className="relative h-screen w-full overflow-hidden">
      {/* React Three Fiber Canvas */}
      <Canvas className="absolute inset-0 w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75} />
        <Scene />
      </Canvas>

      {/* Background overlay to improve text visibility */}
      <div 
        ref={heroContainerRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 z-0"
        ></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white z-10 pt-16">
        <h1 ref={textRef} className="text-5xl md:text-7xl font-bold mb-6 opacity-0 text-shadow-lg">
          Hi, I'm <span className="text-emerald-500">Ashish Subedi</span>
        </h1>

        <p ref={subTextRef} className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-0 text-shadow">
          A passionate <span className="text-emerald-500">graphic designer</span> creating stunning visual experiences
        </p>

        <div ref={ctaRef} className="opacity-0">
        <InteractiveHoverButton 
        className="px-8 py-3 bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-300 dark:text-white text-white rounded-full font-medium hover:bg-green-500 transition-colors duration-300 inline-flex items-center shadow-lg" onClick={scrollToProjects}>View My Work </InteractiveHoverButton>
        </div>

        {/* Scroll down indicator */}
        <div
          ref={scrollIndicatorRef}
          onClick={scrollToProjects}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0 flex flex-col items-center"
          >
          <span className="text-sm mb-2 text-shadow">Scroll to explore my journey</span>
          <ChevronDown className="h-6 w-6 text-emerald-500 animate-pulse" />
        </div>
      </div>
    </div>
          </section>
  )
}