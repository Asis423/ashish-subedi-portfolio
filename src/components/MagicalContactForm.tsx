"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import gsap from "gsap"
import { Send, CheckCircle, Sparkles } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export default function MagicalContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const formContentRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const particles: HTMLDivElement[] = []

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log(data)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Show success animation
    if (formContentRef.current && successRef.current) {
      gsap.to(formContentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.out",
      })

      gsap.to(successRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "elastic.out(1, 0.75)",
      })

      // Create celebration particles
      createParticles()
    }
  }

  // Create particles for success animation
  const createParticles = () => {
    if (!particlesRef.current) return

    // Clear existing particles
    while (particlesRef.current.firstChild) {
      particlesRef.current.removeChild(particlesRef.current.firstChild)
    }

    // Create new particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-2 h-2 rounded-full"
      particle.style.backgroundColor = getRandomColor()
      particle.style.top = "50%"
      particle.style.left = "50%"
      particlesRef.current.appendChild(particle)
      particles.push(particle)

      // Animate particle
      gsap.to(particle, {
        x: gsap.utils.random(-150, 150),
        y: gsap.utils.random(-150, 150),
        opacity: 0,
        scale: gsap.utils.random(0.5, 2),
        duration: gsap.utils.random(1, 2),
        ease: "power3.out",
      })
    }
  }

  // Get random color for particles
  const getRandomColor = () => {
    const colors = ["#ff5252", "#4fc3f7", "#9575cd", "#ffca28", "#66bb6a"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Reset form
  const resetForm = () => {
    form.reset()
    setIsSubmitted(false)

    if (formContentRef.current && successRef.current) {
      gsap.to(successRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.in",
      })

      gsap.to(formContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      })
    }
  }

  // Initial animations
  useEffect(() => {
    if (!formRef.current || !formContentRef.current) return

    // Create initial animation timeline
    const tl = gsap.timeline()

    // Animate form container
    tl.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    })

    // Animate form fields
    tl.from(
      formContentRef.current.querySelectorAll(".form-field"),
      {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    )

    // Animate form button
    tl.from(
      formContentRef.current.querySelector(".form-button"),
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    )

    // Clean up
    return () => {
      tl.kill()
    }
  }, [])

  // Custom cursor effect
  useEffect(() => {
    if (!formRef.current || !cursorRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = formRef.current!.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      gsap.to(cursorRef.current, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
      })
    }

    formRef.current.addEventListener("mousemove", handleMouseMove)
    formRef.current.addEventListener("mouseenter", handleMouseEnter)
    formRef.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener("mousemove", handleMouseMove)
        formRef.current.removeEventListener("mouseenter", handleMouseEnter)
        formRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Field focus animations
  const handleFieldFocus = (index: number) => {
    const fields = formContentRef.current?.querySelectorAll(".form-field")
    if (!fields) return

    gsap.to(fields[index], {
      y: -5,
      scale: 1.02,
      boxShadow: "0 15px 30px rgba(125, 46, 185, 0.15)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleFieldBlur = (index: number) => {
    const fields = formContentRef.current?.querySelectorAll(".form-field")
    if (!fields) return

    gsap.to(fields[index], {
      y: 0,
      scale: 1,
      boxShadow: "0 5px 15px rgba(125, 46, 185, 0.1)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <div ref={formRef} className="relative w-full max-w-2xl mx-auto p-8 md:p-12 rounded-2xl overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-white/20"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed opacity-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mix-blend-screen blur-sm z-10"
      ></div>

      {/* Particles container for success animation */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-20"></div>

      {/* Form content */}
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Get in Touch
          </h2>
          <p className="mt-2 text-muted-foreground">I'd love to hear from you. Send me a message!</p>
        </div>

        {/* Form */}
        <div
          ref={formContentRef}
          className={`space-y-6 transition-all duration-500 ${isSubmitted ? "opacity-0" : "opacity-100"}`}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-foreground/80">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="bg-white/10 border-white/20 focus:border-purple-500 transition-all"
                        onFocus={() => handleFieldFocus(0)}
                        onBlur={() => handleFieldBlur(0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-foreground/80">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        {...field}
                        className="bg-white/10 border-white/20 focus:border-purple-500 transition-all"
                        onFocus={() => handleFieldFocus(1)}
                        onBlur={() => handleFieldBlur(1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-foreground/80">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What is this regarding?"
                        {...field}
                        className="bg-white/10 border-white/20 focus:border-purple-500 transition-all"
                        onFocus={() => handleFieldFocus(2)}
                        onBlur={() => handleFieldBlur(2)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-foreground/80">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your message here..."
                        {...field}
                        className="min-h-32 bg-white/10 border-white/20 focus:border-purple-500 transition-all"
                        onFocus={() => handleFieldFocus(3)}
                        onBlur={() => handleFieldBlur(3)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="form-button w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 group"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </form>
          </Form>
        </div>

        {/* Success message */}
        <div
          ref={successRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-20"
        >
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-6">Thank you for reaching out. I'll get back to you soon!</p>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
