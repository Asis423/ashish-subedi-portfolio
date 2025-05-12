"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import { Environment, Float, Text, OrbitControls, useTexture } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarDays, Clock, BookOpen } from "lucide-react"



gsap.registerPlugin(ScrollTrigger)

// 3D Blog Post Component
const BlogPost3D = ({ position, rotation, imageUrl, title }: { position: [number, number, number], rotation: [number, number, number], imageUrl: string, title: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture(imageUrl)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.5} />
        <Text
          position={[0, -1.2, 0.11]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {title}
        </Text>
      </mesh>
    </Float>
  )
}

// 3D Scene Component
const BlogScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Environment preset="city" />
      <OrbitControls /> {/* Added OrbitControls for user interaction */}
      
      <BlogPost3D 
        position={[-3, 1, 0]} 
        rotation={[0, 0.5, 0]} 
        imageUrl="/assets/demo.jpg" 
        title="Tech Trends" 
      />
      <BlogPost3D 
        position={[3, -1, 0]} 
        rotation={[0, -0.5, 0]} 
        imageUrl="/assets/demo.jpg" 
        title="Design Insights" 
      />
      <BlogPost3D 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]} 
        imageUrl="/assets/demo.jpg" 
        title="Dev Tips" 
      />
    </Canvas>
  )
}

// Blog Post Data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    date: "May 15, 2023",
    readTime: "8 min",
    category: "Development",
    imageUrl: "/blog/web-dev.jpg"
  },
  {
    id: 2,
    title: "Designing for Accessibility",
    excerpt: "Creating inclusive digital experiences that work for everyone.",
    date: "June 2, 2023",
    readTime: "6 min",
    category: "Design",
    imageUrl: "/blog/accessibility.jpg"
  },
  {
    id: 3,
    title: "Optimizing React Performance",
    excerpt: "Advanced techniques to make your React applications lightning fast.",
    date: "June 18, 2023",
    readTime: "10 min",
    category: "Development",
    imageUrl: "/blog/react.jpg"
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    excerpt: "When to use each layout system for optimal results in your projects.",
    date: "July 5, 2023",
    readTime: "5 min",
    category: "CSS",
    imageUrl: "/blog/css.jpg"
  },
  {
    id: 5,
    title: "The Psychology of Color",
    excerpt: "How color choices affect user perception and behavior.",
    date: "July 22, 2023",
    readTime: "7 min",
    category: "Design",
    imageUrl: "/blog/color.jpg"
  },
  {
    id: 6,
    title: "TypeScript Best Practices",
    excerpt: "Writing clean and maintainable TypeScript code.",
    date: "August 10, 2023",
    readTime: "9 min",
    category: "Development",
    imageUrl: "/blog/typescript.jpg"
  }
]

export default function BlogPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const postsRef = useRef<(HTMLDivElement | null)[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize animations
  useEffect(() => {
    // Section animation
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    })

    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3,
      ease: "back.out(1.2)"
    })

    // 3D scene animation
    gsap.from(sceneRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        toggleActions: "play none none none"
      },
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out"
    })

    // Blog posts animation
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

      // Hover animation
      gsap.to(post, {
        scale: 1.02,
        duration: 0.3,
        paused: true,
        ease: "power1.out"
      })

      post.addEventListener("mouseenter", () => {
        gsap.to(post, { scale: 1.02, duration: 0.3 })
      })
      post.addEventListener("mouseleave", () => {
        gsap.to(post, { scale: 1, duration: 0.3 })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
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

          {/* 3D Scene */}
          <div ref={sceneRef} className="relative h-96 w-full rounded-2xl overflow-hidden mb-20 shadow-xl dark:shadow-emerald-900/20">
            <BlogScene />
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                ref={el => { postsRef.current[index] = el; }}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-sm font-medium rounded-full shadow">
                        {post.category}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <CardTitle className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
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
  )
}