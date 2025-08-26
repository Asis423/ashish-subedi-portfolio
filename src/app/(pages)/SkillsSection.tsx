"use client"

import { motion } from "framer-motion"
import { skillsData } from "@/lib/SkillsData"

export default function SkillsSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A comprehensive overview of my design and technical capabilities
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="skill-category"
          >
          </motion.div>
        ))}
      </div>
    </section>
  )
}
