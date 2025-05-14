"use client"

import {  useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  imageUrl: string
  projectUrl: string
}

export default function ProjectShowcase() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern online store with seamless checkout experience",
      tags: ["React", "Node.js", "MongoDB"],
      imageUrl: "/projects/ecommerce.jpg",
      projectUrl: "#"
    },
    {
      id: 2,
      title: "Mobile Fitness App",
      description: "Workout tracking and personalized training plans",
      tags: ["React Native", "Firebase", "TypeScript"],
      imageUrl: "/projects/fitness.jpg",
      projectUrl: "#"
    },
    {
      id: 3,
      title: "Corporate Dashboard",
      description: "Real-time analytics for business intelligence",
      tags: ["Next.js", "Tailwind CSS", "D3.js"],
      imageUrl: "/projects/dashboard.jpg",
      projectUrl: "#"
    },
    {
      id: 4,
      title: "Travel Booking Site",
      description: "Hotel and flight booking platform with AI recommendations",
      tags: ["Vue.js", "Python", "PostgreSQL"],
      imageUrl: "/projects/travel.jpg",
      projectUrl: "#"
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description: "Content management for social media marketers",
      tags: ["Angular", "NestJS", "MySQL"],
      imageUrl: "/projects/social.jpg",
      projectUrl: "#"
    },
    {
      id: 6,
      title: "Health Tracking App",
      description: "Monitor your wellness with intuitive dashboards",
      tags: ["Flutter", "GraphQL", "AWS"],
      imageUrl: "/projects/health.jpg",
      projectUrl: "#"
    }
  ]

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="projects">

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent works. Each project represents unique challenges and creative solutions.
            </p>
          </div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800"
                >
                  <motion.div variants={hoverVariants} className="h-full">
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-200 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <a
                          href={project.projectUrl}
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                          aria-label={`View ${project.title}`}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-md">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-emerald-500/20">
              View All Projects
            </button>
          </div>
        </div>
      </section>
    </section>
  )
}