"use client"

import React, { useRef, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Sparkles, Send } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
  // Refs for GSAP animations
  const pageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  // State for form submission
  const [isSuccess, setIsSuccess] = React.useState(false)

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(values)
      setIsSuccess(true)
    } catch (error) {
      console.error(error)
    }
  }

  // Reset form
  const resetContactForm = () => {
    form.reset()
    setIsSuccess(false)
  }

  // GSAP animations
  useEffect(() => {
    // Initial animations
    const ctx = gsap.context(() => {
      // Animate title and subtitle
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      })

      // Animate form container
      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      })

      // Animate background blobs
      gsap.to(".blob-animation", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Smooth cursor following with GSAP
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    // Fade in cursor
    gsap.to(cursorRef.current, {
      opacity: 0.6,
      duration: 1,
      delay: 0.5,
    })

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section id="contact">

    <div ref={pageRef} className="min-h-screen pt-24 pb-16 px-4 bg-white dark:bg-gray-950">
      {/* SEO metadata would be in the page.tsx file */}
      <div className="w-full max-w-[1920px] mx-auto">
        <div className="text-center mb-12">
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-400 dark:to-emerald-600"
          >
            Let's Connect
          </h1>
          <p ref={subtitleRef} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon
            as possible.
          </p>
        </div>

        {/* Form Container */}
        <div ref={formRef} className="relative w-full max-w-2xl mx-auto p-8 md:p-12 rounded-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-emerald-500/20 to-emerald-400/20 dark:from-emerald-800/30 dark:via-emerald-700/30 dark:to-emerald-600/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-800/50"></div>

          {/* Animated background shapes with GSAP */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="blob-animation absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl"></div>
            <div className="blob-animation absolute bottom-0 right-0 w-60 h-60 bg-emerald-400/10 dark:bg-emerald-300/10 rounded-full blur-3xl"></div>
            <div className="blob-animation absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-600/10 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Custom cursor */}
          <div
            ref={cursorRef}
            className="pointer-events-none fixed opacity-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 mix-blend-screen blur-sm z-10"
            style={{ left: "-50px", top: "-50px" }}
            ></div>

          {/* Form content */}
          <div className="relative z-10">
            {isSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
                <Button
                  onClick={resetContactForm}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 dark:from-emerald-500 dark:to-emerald-400 dark:hover:from-emerald-600 dark:hover:to-emerald-500 text-white transition-all duration-300"
                  >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 inline-flex items-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      Get in Touch
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      I'd love to hear from you. Send me a message!
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className={cn(
                              "h-14 px-6 rounded-xl bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30",
                              "focus:border-emerald-500 dark:focus:border-emerald-400 transition-all",
                              "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
                            )}
                            {...field}
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
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            className={cn(
                              "h-14 px-6 rounded-xl bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30",
                              "focus:border-emerald-500 dark:focus:border-emerald-400 transition-all",
                              "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
                            )}
                            {...field}
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
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is this regarding?"
                            className={cn(
                              "h-14 px-6 rounded-xl bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30",
                              "focus:border-emerald-500 dark:focus:border-emerald-400 transition-all",
                              "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
                            )}
                            {...field}
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
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            className={cn(
                              "h-32 px-6 py-3 rounded-xl bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30",
                              "focus:border-emerald-500 dark:focus:border-emerald-400 transition-all",
                              "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
                            )}
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 dark:from-emerald-500 dark:to-emerald-400 dark:hover:from-emerald-600 dark:hover:to-emerald-500 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 group"
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
            )}
          </div>
        </div>
      </div>
    </div>
            </section>
  )
}
