"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, Clock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Blog Post Data
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

export default function BlogPage2() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const postsRef = useRef<(HTMLDivElement | null)[]>([])

  // Initialize animations
  useEffect(() => {
    // Create a timeline for more complex animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        toggleActions: "play none none none"
      }
    })

    // Section and title animations
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

    // Blog posts staggered animation
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
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <style jsx>{`
        .blog-card-wrapper {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .blog-card-wrapper .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 10;
        }
        .blog-card-wrapper:hover .card-overlay {
          opacity: 1;
        }
        .blog-card-wrapper:hover {
          transform: translateZ(20px) rotateX(5deg) rotateY(-5deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .blog-card-category {
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .blog-card-wrapper:hover .blog-card-category {
          transform: translate(-50%, -50%) scale(1.2);
          opacity: 0.8;
        }
        .blog-card-title {
          transition: transform 0.5s ease, color 0.5s ease;
        }
        .blog-card-wrapper:hover .blog-card-title {
          transform: translateY(-10px);
          color: #ffffff;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <section ref={sectionRef} className="py-20">
          <div className="container mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-16">
              <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">
                The Blog
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Thoughts, stories and ideas about design, development and more.
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={post.id}
                  ref={(el) => {postsRef.current[index] = el;}}
                  className="blog-card-wrapper group relative rounded-xl transition-all duration-500 ease-in-out"
                >
                  <div className="card-overlay"></div>
                  <Card className="h-full flex flex-col relative overflow-hidden">
                    <CardHeader className="p-0">
                      <div 
                        className={`relative h-48 w-full overflow-hidden bg-gradient-to-r ${post.gradient}`}
                      >
                        <div className="blog-card-category absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-sm font-medium rounded-full shadow">
                          {post.category}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow p-6 relative z-20">
                      <CardTitle className="blog-card-title text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center p-6 pt-0 relative z-20">
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
    </>
  )
}