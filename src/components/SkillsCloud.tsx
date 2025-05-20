"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import type { Skill } from "@/lib/SkillsData"
import { cn } from "@/lib/utils"

interface SkillCloudProps {
    skills: Skill[]
    categoryIndex: number
}

export default function SkillCloud({ skills, categoryIndex }: SkillCloudProps) {
    const cloudRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const skillTags = cloudRef.current?.querySelectorAll(".skill-tag");
        if (skillTags) {
            gsap.fromTo(
                skillTags,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.3 + categoryIndex * 0.2,
                    ease: "back.out(1.7)",
                },
            );
        }
    }, [categoryIndex]);

    // Helper function to determine styling based on skill level
    const getSkillTagStyle = (level: number) => {
        // Map skill levels to different visual treatments
        if (level >= 90) {
            return "bg-emerald-500 text-white shadow-md shadow-emerald-200 dark:shadow-emerald-900/30 font-bold"
        } else if (level >= 80) {
            return "bg-emerald-400 text-white shadow-sm shadow-emerald-100 dark:shadow-emerald-900/20 font-semibold"
        } else if (level >= 70) {
            return "bg-emerald-300 text-emerald-900 font-medium"
        } else {
            return "bg-emerald-200 text-emerald-800 font-normal"
        }
    }

    // Helper function to determine size based on skill level
    const getSkillTagSize = (level: number) => {
        if (level >= 90) return "text-sm py-2 px-4"
        if (level >= 80) return "text-sm py-1.5 px-3.5"
        if (level >= 70) return "text-xs py-1.5 px-3"
        return "text-xs py-1 px-2.5"
    }

    return (
        <div ref={cloudRef} className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
                <motion.span
                    key={skill.name}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                    className={cn(
                        "skill-tag rounded-full transition-all duration-300",
                        "inline-block cursor-pointer",
                        getSkillTagStyle(skill.level),
                        getSkillTagSize(skill.level),
                    )}
                >
                    {skill.name}
                </motion.span>
            ))}
        </div>
    )
}
