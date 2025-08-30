"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import demo from "@/assets/demo.jpg"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hiTextRef = useRef<HTMLParagraphElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(hiTextRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(nameRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    ).fromTo(titleRef.current, 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
      "-=0.5"
    ).fromTo(buttonRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
      "-=0.3"
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center"
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-[20vw] font-bold uppercase tracking-wider opacity-10 select-none">
          Ashish Subedi
        </h2>
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Greeting text */}
        <p ref={hiTextRef} className="text-xl md:text-2xl text-emerald-400 font-light mb-2">
          Hi, I'm
        </p>
        
        {/* Name */}
        <h1 ref={nameRef} className="text-5xl md:text-7xl font-bold mb-4 text-white">
          Ashish Subedi
        </h1>

        {/* Title/description */}
        <p ref={titleRef} className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mb-8 leading-relaxed">
          A passionate graphic designer creating stunning visual experiences
        </p>

        {/* CTA Button */}
        <button 
          ref={buttonRef}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md transition-colors duration-300 transform hover:scale-105"
        >
          View My Work
        </button>
      </div>

      {/* Subtle particles effect */}
      <div className="absolute inset-0 particles-container"></div>

      <style jsx>{`
        .particles-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(110, 231, 183, 0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(110, 231, 183, 0.2), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(110, 231, 183, 0.3), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(110, 231, 183, 0.2), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(110, 231, 183, 0.1), transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: particlesMove 20s infinite linear;
        }
        
        @keyframes particlesMove {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }
      `}</style>
    </section>
  )
}