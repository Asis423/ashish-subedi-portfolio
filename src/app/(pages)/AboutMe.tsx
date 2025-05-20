"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Briefcase } from "lucide-react"


export default function AboutSection() {
    const profileRef = useRef(null)
    const timelineRef = useRef(null)
    const skillsRef = useRef(null)

    // Register ScrollTrigger plugin
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // Animate timeline items
        const timeline = timelineRef.current
        if (timeline) {
            gsap.from(".timeline-item", {
                scrollTrigger: {
                    trigger: timeline,
                    start: "top 70%",
                },
                opacity: 0,
                y: 50,
                stagger: 0.3,
                duration: 0.8,
                ease: "power2.out",
            })
        }

        // Animate skills
        const skills = skillsRef.current
        if (skills) {
            gsap.from(".skill-badge", {
                scrollTrigger: {
                    trigger: skills,
                    start: "top 80%",
                },
                scale: 0.5,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "back.out(1.7)",
            })
        }
    }, [])

    // Framer Motion animations
    const controls = useAnimation()
    const inView = useInView(profileRef, { once: true })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    return (
        <section id="about" className="container mx-auto px-4 py-10 max-w-5xl">
            {/* Header */}
            <motion.div
                ref={profileRef}
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: "easeOut" },
                    },
                }}
                className="flex flex-col md:flex-row items-center gap-8 mb-16"
            >
                <motion.div
                    className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg dark:border-emerald-400"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, repeat: Infinity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                
                >
                    <Image
                        src="/placeholder.svg?height=192&width=192"
                        alt="Ashish Subedi"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <div className="text-center md:text-left">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-emerald-800 dark:text-emerald-300 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Ashish Subedi
                    </motion.h1>
                    <motion.h2
                        className="text-2xl text-emerald-600 dark:text-emerald-400 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Senior Graphic Designer
                    </motion.h2>
                    <motion.div
                        className="flex flex-wrap justify-center md:justify-start gap-3 text-emerald-700 dark:text-emerald-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <div className="flex items-center gap-1">
                            <Briefcase size={18} />
                            <span>Theme Maker Pvt. Ltd.</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={18} />
                            <span>Kathmandu, Nepal</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* About Me */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mb-16 dark:text-white"
            >
                <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-6 border-b-2 border-emerald-300 dark:border-emerald-600 pb-2">About Me</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    I am a passionate Senior Graphic Designer with expertise in creating visually compelling designs that
                    communicate brand messages effectively. With over 4 years of experience in the industry, I specialize in Adobe
                    Creative Suite and bring a unique blend of creativity and technical skills to every project. Currently working
                    at Theme Maker Pvt. Ltd. in Kathmandu, I am dedicated to delivering high-quality design solutions that exceed
                    client expectations.
                </p>
            </motion.div>




        </section>
    )
}