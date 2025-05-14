"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, Clock } from "lucide-react"
import Image from "next/image"
import demo from "@/assets/demo.jpg"

gsap.registerPlugin(ScrollTrigger)

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    date: "May 15, 2023",
    readTime: "8 min",
    category: "Development",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 2,
    title: "Designing for Accessibility",
    excerpt: "Creating inclusive digital experiences that work for everyone.",
    date: "June 2, 2023",
    readTime: "6 min",
    category: "Design",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 3,
    title: "Optimizing React Performance",
    excerpt: "Advanced techniques to make your React applications lightning fast.",
    date: "June 18, 2023",
    readTime: "10 min",
    category: "Development",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    excerpt: "When to use each layout system for optimal results in your projects.",
    date: "July 5, 2023",
    readTime: "5 min",
    category: "CSS",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 5,
    title: "The Psychology of Color",
    excerpt: "How color choices affect user perception and behavior.",
    date: "July 22, 2023",
    readTime: "7 min",
    category: "Design",
    gradient: "from-violet-500 to-fuchsia-500"
  },
  {
    id: 6,
    title: "TypeScript Best Practices",
    excerpt: "Writing clean and maintainable TypeScript code.",
    date: "August 10, 2023",
    readTime: "9 min",
    category: "Development",
    gradient: "from-blue-500 to-cyan-500"
  }
]

export default function BlogPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const postsRef = useRef<(HTMLDivElement | null)[]>([])
  const beforeElements = useRef<(HTMLDivElement | null)[]>([])
  const afterElements = useRef<(HTMLDivElement | null)[]>([])
  const titleElements = useRef<(HTMLHeadingElement | null)[]>([])

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        toggleActions: "play none none none"
      }
    })

    tl.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    }).from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, "-=0.5")

    // Staggered card animations
    postsRef.current.forEach((post, i) => {
      if (!post) return

      gsap.from(post, {
        scrollTrigger: {
          trigger: post,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: i * 0.1,
        ease: "power2.out"
      })

      // Set up hover animations
      const beforeEl = beforeElements.current[i]
      const afterEl = afterElements.current[i]
      const titleEl = titleElements.current[i]

      if (!beforeEl || !afterEl || !titleEl) return

      // GSAP timeline for hover animation
      const hoverTl = gsap.timeline({ paused: true })
        .to([beforeEl, afterEl], {
          height: 100,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(titleEl, {
          y: -50,
          duration: 0.5,
          ease: "power2.out"
        }, 0)

      post.addEventListener("mouseenter", () => {
        gsap.to(post, { scale: 1.02, duration: 0.3 })
        hoverTl.play()
      })
      post.addEventListener("mouseleave", () => {
        gsap.to(post, { scale: 1, duration: 0.3 })
        hoverTl.reverse()
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="blog">

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">
                The Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Thoughts, stories and ideas about design, development and more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  ref={(el) => { postsRef.current[index] = el }}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <Image src={demo} alt="" />
                  {/* Before pseudo-element */}
                  <div
                    ref={(el) => { beforeElements.current[index] = el }}
                    className="absolute top-0 left-0 w-auto h-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"
                  />

                  <Card className="h-auto flex flex-col">
                    <CardHeader className="p-0 relative">
                      <div
                        className="relative h-10 w-full overflow-hidden"
                        style={{ backgroundColor: post.gradient }}
                      >
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-sm font-medium rounded-full shadow">
                          {post.category}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow p-6 relative">
                      {/* After pseudo-element */}
                      <div
                        ref={(el) => { afterElements.current[index] = el }}
                        className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"
                      />

                      <CardTitle
                        ref={(el) => { titleElements.current[index] = el }}
                        className="text-xl font-bold mb-2 text-gray-900 dark:text-white relative transition-transform duration-500"
                      >
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>

                    <CardFooter className="flex justify-between items-center p-6 pt-0">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="group/button">
                        Read <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/button:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}