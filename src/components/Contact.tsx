"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import MagicalContactForm from "./MagicalContactForm"
export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!pageRef.current || !titleRef.current || !subtitleRef.current) return

    // Create animation timeline
    const tl = gsap.timeline()

    // Animate title
    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    })

    // Animate subtitle
    tl.from(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )

    // Clean up
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          >
            Let's Connect
          </h1>
          <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon
            as possible.
          </p>
        </div>

        <MagicalContactForm />
      </div>
    </div>
  )
}
