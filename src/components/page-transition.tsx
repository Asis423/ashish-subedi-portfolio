"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function GsapTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create a timeline for the opening animation
    const tl = gsap.timeline()

    // Initial state - full screen overlay
    gsap.set(loaderRef.current, {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#000",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    })

    // Animate the brand name
    tl.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    })

    // Hold for a moment
    tl.to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.in",
    })

    // Animate the loader out
    tl.to(loaderRef.current, {
      height: 0,
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        // Animate in the page content
        gsap.from(containerRef.current?.children || [], {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        })
      },
    })

    // Clean up
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <>
      <div ref={loaderRef} className="bg-black text-white">
        <div ref={textRef} className="text-4xl font-bold">
          Ashish Subedi Portfolio
        </div>
      </div>
      <div ref={containerRef}>{children}</div>
    </>
  )
}
