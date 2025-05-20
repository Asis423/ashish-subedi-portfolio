"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import type { SkillCategory as SkillCategoryType } from "@/lib/SkillsData"
import { cn } from "@/lib/utils"
import SkillCloud from "./SkillsCloud"

interface SkillCategoryProps {
  category: SkillCategoryType
  index: number
  className?: string
}

export default function SkillCategory({ category, index, className }: SkillCategoryProps) {
  const categoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the icon
      gsap.fromTo(
        ".category-icon",
        { scale: 0, rotation: -45 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.2 + index * 0.1,
          ease: "back.out(1.7)",
        },
      )
    }, categoryRef)

    return () => ctx.revert()
  }, [index])

  return (
    <motion.div
      ref={categoryRef}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 overflow-hidden relative",
        "border border-emerald-100 dark:border-emerald-800",
        "transform transition-all duration-300",
        className,
      )}
    >
      <div className="category-icon absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full opacity-20" />

      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
        {category.icon}
        <span className="ml-2">{category.title}</span>
      </h3>

      <SkillCloud skills={category.skills} categoryIndex={index} />
    </motion.div>
  )
}
