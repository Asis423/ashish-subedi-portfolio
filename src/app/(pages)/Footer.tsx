"use client"

import { useRef, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Text, Environment, Float, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three" // Import THREE
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Instagram, Dribbble, DribbbleIcon as Behance, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// 3D Models for the scene
const FloatingShapes = () => {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Create refs for each shape
  const cube = useRef<THREE.Mesh>(null)
  const sphere = useRef<THREE.Mesh>(null)
  const cone = useRef<THREE.Mesh>(null)
  const torus = useRef<THREE.Mesh>(null)

  // Animation with GSAP
  useEffect(() => {
    if (!group.current) return

    // Initial positions
    gsap.set(cube.current!.position, { x: -2, y: 0.5, z: 0 })
    gsap.set(sphere.current!.position, { x: 2, y: -0.5, z: 1 })
    gsap.set(cone.current!.position, { x: 0, y: 1, z: -1 })
    gsap.set(torus.current!.position, { x: 1.5, y: -1, z: -0.5 })

    // Animate with GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    // Rotate the entire group
    tl.to(
      group.current.rotation,
      {
        y: Math.PI * 2,
        duration: 10,
        ease: "none",
        repeat: -1,
      },
      0,
    )

    // Individual animations
    gsap.to(cube.current!.rotation, { x: Math.PI * 2, y: Math.PI * 2, duration: 20, ease: "none", repeat: -1 })
    gsap.to(sphere.current!.position, { y: "+=0.5", duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true })
    gsap.to(cone.current!.rotation, { z: Math.PI * 2, duration: 15, ease: "none", repeat: -1 })
    gsap.to(torus.current!.rotation, { z: Math.PI * 2, x: Math.PI, duration: 15, ease: "none", repeat: -1 })

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
      tl.kill()
    }
  }, [])

  return (
    <group ref={group}>
      {/* Cube */}
      <mesh ref={cube} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#ff5252" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Sphere */}
      <mesh ref={sphere} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#4fc3f7" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cone */}
      <mesh ref={cone} castShadow>
        <coneGeometry args={[0.3, 0.7, 32]} />
        <meshStandardMaterial color="#9575cd" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Torus */}
      <mesh ref={torus} castShadow>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#ffca28" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  )
}

// Designer's signature/logo in 3D
const DesignerSignature = () => {
  const textRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.from(textRef.current.position, {
      y: -2,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: "#footer-container",
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    })
  }, [])

  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      fontSize={0.5}
      color="#ffffff"
      font="/fonts/Inter_Bold.json"
      anchorX="center"
      anchorY="middle"
    >
      ASHISH SUBEDI
    </Text>
  )
}

// Main 3D Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <Environment preset="city" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <DesignerSignature />
      </Float>

      <FloatingShapes />
    </>
  )
}

// Footer UI Component
const FooterContent = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate footer content with GSAP
    gsap.from(contentRef.current!.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#footer-container",
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    })

    // Animate social icons
    gsap.from(socialRef.current!.children, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: "#footer-container",
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    })

    // Animate contact info
    gsap.from(contactRef.current!.children, {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#footer-container",
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    })

    // Animate copyright
    gsap.from(copyrightRef.current, {
      opacity: 0,
      duration: 1,
      delay: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#footer-container",
        start: "top bottom-=50",
        toggleActions: "play none none reverse",
      },
    })
  }, [])

  return (
    <div ref={contentRef} className="relative z-10 container mx-auto px-4 py-12 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Let's create something amazing together</h2>
          <p className="text-lg mb-8 opacity-80">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
          <Button className="bg-white text-black hover:bg-white/90 transition-all">Get In Touch</Button>

          <div ref={socialRef} className="flex gap-4 mt-8">
            <a href="https://instagram.com" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://dribbble.com" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              <Dribbble className="w-5 h-5" />
            </a>
            <a href="https://behance.net" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
              <Behance className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
          <div ref={contactRef} className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 opacity-70" />
              <span>ashish.subedi@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 opacity-70" />
              <span>+977 9800000000</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 opacity-70" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={copyrightRef} className="border-t border-white/20 mt-12 pt-6 text-center opacity-60">
        © {new Date().getFullYear()} Ashish Subedi. All rights reserved.
      </div>
    </div>
  )
}

// Main Footer Component
export default function CreativeFooter() {
  return (
    <footer id="footer-container" className="relative mt-20">
      {/* 3D Background */}
      <div className="absolute inset-0 h-full w-full">
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-800/90 to-purple-900/80 z-0"></div>

      {/* Footer Content */}
      <FooterContent />
    </footer>
  )
}
