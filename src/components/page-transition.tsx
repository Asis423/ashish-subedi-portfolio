"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function GsapTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false) // control visibility

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true) // show content after animation
    })

    // Set loader full screen
    gsap.set(loaderRef.current, {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#000",
      zIndex: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    })

    // Animate the brand text
    tl.from(textRef.current, { opacity: 0, y: 50, duration: 1, ease: "power3.out" })
      .to(textRef.current, { opacity: 0, y: -50, duration: 0.8, delay: 0.5, ease: "power3.in" })
      .to(loaderRef.current, { height: 0, duration: 1, ease: "power4.inOut" })

    // Animate children after loader
    tl.call(() => {
      if (containerRef.current) {
        gsap.from(containerRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        })
      }
    })

    return () => {
      tl.kill();
    };
  }, [])

  return (
    <>
      <div ref={loaderRef} className="bg-black text-white">
        <div ref={textRef} className="text-4xl font-bold">
          Ashish Subedi
        </div>
      </div>

      {/* Hide content until loader finishes */}
      <div ref={containerRef} style={{ opacity: isLoaded ? 1 : 0 }}>
        {children}
      </div>
    </>
  )
}
