"use client"

import { useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Instagram, Dribbble, Github, Mail, MapPin, Phone, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function CreativeFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const copyrightRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Master timeline for all animations
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
        markers: false // Set to true for debugging
      }
    })

    // Background elements animation
    masterTL.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )

    // Content animations
    const contentTL = gsap.timeline()
    contentTL
      .from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.2)"
      })
      .from(descRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.5")
      .from(buttonRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(socialRef.current!.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .from(contactRef.current!.children, {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.4")
      .from(copyrightRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3")

    masterTL.add(contentTL)

    // Particle animations
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.particle')
      
      particles.forEach(particle => {
        gsap.to(particle, {
          x: `random(-${window.innerWidth/4}, ${window.innerWidth/4})`,
          y: `random(-${window.innerHeight/4}, ${window.innerHeight/4})`,
          rotation: 'random(-180, 180)',
          duration: 'random(15, 25)',
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      })
    }

    // Hover effects for social icons
    socialRef.current?.querySelectorAll('a').forEach(link => {
      gsap.to(link, {
        scale: 1.1,
        duration: 0.3,
        paused: true,
        ease: "power2.out"
      })
      
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.1, duration: 0.3 })
      })
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, duration: 0.3 })
      })
    })

    return () => {
      masterTL.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <footer 
      ref={footerRef} 
      className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 h-full w-full opacity-20">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Environment preset="dawn" />
        </Canvas>
      </div>

      {/* Floating Particles */}
      <div 
        ref={particlesRef} 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-emerald-400/20 dark:bg-emerald-300/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div 
        ref={containerRef}
        className="relative z-10 container mx-auto px-6 py-20 md:py-28 text-emerald-900 dark:text-emerald-100"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 
                ref={headingRef}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                Let's Build Something <span className="text-emerald-600 dark:text-emerald-400">Extraordinary</span>
              </h2>
              <p 
                ref={descRef}
                className="mt-6 text-lg md:text-xl text-emerald-800/90 dark:text-emerald-200/90 max-w-lg"
              >
                I'm passionate about creating exceptional digital experiences. Whether you have a project in mind or just want to connect, I'd love to hear from you.
              </p>
            </div>

            <div ref={buttonRef} className="pt-2">
              <Button 
                className="px-8 py-6 text-lg font-medium bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30 transition-all"
                onClick={() => window.location.href = 'mailto:contact@example.com'}
              >
                Contact Me
              </Button>
            </div>

            <div ref={socialRef} className="flex gap-4 pt-4">
              {[
                { icon: <Github className="w-5 h-5" />, url: "https://github.com" },
                { icon: <Dribbble className="w-5 h-5" />, url: "https://dribbble.com" },
                { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com" },
                { icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-600/10 hover:bg-emerald-600/20 dark:bg-emerald-400/10 dark:hover:bg-emerald-400/20 rounded-full transition-all duration-300 text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            
            <div ref={contactRef} className="space-y-6">
              {[
                { 
                  icon: <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
                  text: "contact@example.com",
                  href: "mailto:contact@example.com"
                },
                { 
                  icon: <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
                  text: "+1 (123) 456-7890",
                  href: "tel:+11234567890"
                },
                { 
                  icon: <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
                  text: "San Francisco, CA",
                  href: "https://maps.google.com"
                }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-5 group"
                >
                  <div className="p-3 bg-emerald-600/10 dark:bg-emerald-400/10 rounded-full group-hover:bg-emerald-600/20 dark:group-hover:bg-emerald-400/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-lg md:text-xl text-emerald-900 dark:text-emerald-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div 
          ref={copyrightRef}
          className="mt-20 pt-8 border-t border-emerald-200 dark:border-emerald-800 text-center text-emerald-700/80 dark:text-emerald-400/80"
        >
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="mt-2 text-sm">Crafted with passion and attention to detail</p>
        </div>
      </div>
    </footer>
  )
}