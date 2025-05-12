"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, GraduationCap, Award, Palette } from "lucide-react"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Journey timeline data
const journeyItems = [
  {
    year: "2018",
    title: "Started Graphic Design",
    description: "Began my journey into the world of graphic design, learning fundamentals and building a foundation.",
    icon: <GraduationCap className="h-8 w-8" />,
  },
  {
    year: "2019",
    title: "First Client Project",
    description: "Completed my first professional project, designing brand identity for a local business.",
    icon: <Briefcase className="h-8 w-8" />,
  },
  {
    year: "2020",
    title: "Design Award",
    description: "Received recognition for outstanding design work in the annual design competition.",
    icon: <Award className="h-8 w-8" />,
  },
  {
    year: "2021",
    title: "Expanded Portfolio",
    description: "Diversified my skills to include UI/UX design, motion graphics, and 3D modeling.",
    icon: <Palette className="h-8 w-8" />,
  },
]

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Set up animations when component mounts
    const section = sectionRef.current
    const timeline = timelineRef.current
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !timeline || items.length === 0) return

    // Animate section title
    gsap.fromTo(
      section.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Animate timeline line
    gsap.fromTo(
      timeline,
      { height: 0 },
      {
        height: "100%",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      },
    )

    // Animate each timeline item
    items.forEach((item, index) => {
      // Stagger the animations
      gsap.fromTo(
        item,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="py-20 px-4 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          My <span className="text-emerald-500">Journey</span>
        </h2>

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-800">
            <div ref={timelineRef} className="w-full bg-emerald-500 h-0"></div>
          </div>

          {/* Timeline items */}
          <div className="relative z-10">
            {journeyItems.map((item, index) => (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} opacity-0`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div className="mb-1 text-emerald-500 font-bold">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>

                {/* Center icon */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
