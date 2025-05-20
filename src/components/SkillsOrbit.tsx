"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import type { Skill } from "@/lib/SkillsData"

interface SkillOrbitProps {
    categoryIndex: number
    skills: Skill[]
}

export default function SkillOrbit({ categoryIndex, skills }: SkillOrbitProps) {
    const orbitRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create the orbiting animation
            skills.forEach((_, index) => {
                const element = orbitRef.current?.querySelector(`.orbit-item-${index}`)

                gsap.to(element!, {
                    rotation: 360,
                    transformOrigin: "50% 50%",
                    duration: 20 + Math.random() * 10,
                    repeat: -1,
                    ease: "none",
                });

                // Initial animation
                gsap.fromTo(
                    orbitRef.current?.querySelectorAll(".orbit-item") ?? [],
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        delay: 0.3 + categoryIndex * 0.2,
                        ease: "back.out(1.7)",
                    },
                )

                return (
                    <div ref={orbitRef} className="relative h-[300px] w-full">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">SKILLS</span>
                        </div>

                        {skills.map((skill, index) => {
                            // Calculate position on the orbit
                            const angle = (index / skills.length) * Math.PI * 2
                            const radius = 100 + skill.level / 10
                            const x = Math.cos(angle) * radius
                            const y = Math.sin(angle) * radius

                            return (
                                <motion.div
                                    key={skill.name}
                                    className={`orbit-item orbit-item-${index} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                                    style={{
                                        marginLeft: x,
                                        marginTop: y,
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <div
                                        className={`
              px-3 py-1.5 rounded-full text-xs font-medium
              ${skill.level >= 90
                                                ? "bg-emerald-500 text-white"
                                                : skill.level >= 80
                                                    ? "bg-emerald-400 text-white"
                                                    : skill.level >= 70
                                                        ? "bg-emerald-300 text-emerald-900"
                                                        : "bg-emerald-200 text-emerald-800"
                                            }
            `}
                                    >
                                        {skill.name}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )
            })
        }, orbitRef)

        return () => ctx.revert()
    }, [categoryIndex, skills])

    return null
}
