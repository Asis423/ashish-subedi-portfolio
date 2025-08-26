"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ChevronDown } from "lucide-react"
import { InteractiveHoverButton } from "../../components/magicui/interactive-hover-button"

export default function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const subTextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !subTextRef.current || !ctaRef.current || !scrollIndicatorRef.current) return

    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(
        subTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        scrollIndicatorRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(scrollIndicatorRef.current, {
              y: "10px",
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            })
          },
        },
        "-=0.2"
      )

    return () => {
      tl.kill()
    }
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      window.scrollTo({ top: projectsSection.offsetTop, behavior: "smooth" })
    }
  }

  const scrollToJourney = () => {
    const journeySection = document.getElementById("journey")
    if (journeySection) {
      window.scrollTo({ top: journeySection.offsetTop, behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10 pt-16">
        <h1 ref={textRef} className="text-5xl md:text-7xl font-bold mb-6 opacity-0">
          Hi, I&apos;m <span className="text-emerald-300">Ashish Subedi</span>
        </h1>

        <p ref={subTextRef} className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 opacity-0">
          A passionate <span className="text-emerald-300">graphic designer</span> creating stunning visual experiences
        </p>

        <div ref={ctaRef} className="opacity-0">
          <InteractiveHoverButton
            className="px-8 py-3 bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-300 dark:text-white text-white rounded-full font-medium hover:bg-green-500 transition-colors duration-300 inline-flex items-center shadow-lg"
            onClick={scrollToProjects}
          >
            View My Work
          </InteractiveHoverButton>
        </div>

        {/* Scroll down indicator */}
        <div
          ref={scrollIndicatorRef}
          onClick={scrollToJourney}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0 flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll to explore my journey</span>
          <ChevronDown className="h-6 w-6 text-emerald-500 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
