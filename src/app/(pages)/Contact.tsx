"use client"

import React, { useRef, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Send, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Contact | Creative Portfolio",
  description: "Get in touch with me for design projects, collaborations, or just to say hello.",
  keywords: ["graphic design", "contact", "portfolio", "creative", "designer"],
}

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
  // Refs for GSAP animations
  const pageRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  // State for form submission
  const [isSuccess, setIsSuccess] = React.useState(false)

  // Initialize form with react-hook-form and zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
      // Animate title
      gsap.from(titleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      // Animate form container
      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      })

      // Animate background blobs
      gsap.to(".blob-animation", {
        x: "random(-15, 15)",
        y: "random(-15, 15)",
        duration: "random(8, 15)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact">

      <div ref={pageRef} className="pt-16 pb-12 px-4 bg-white dark:bg-gray-950">
        <div className="w-full max-w-[800px] mx-auto">
          <div className="text-center mb-8">
            <h2 ref={titleRef} className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 inline-flex text-left items-left gap-2">
              <Sparkles className="w-6 h-6" />
              Get in Touch
            </h2>
            <p className="mt-2 ml-10 text-gray-600 dark:text-gray-300">
              I&apos;d love to hear from you. Send me a message!
            </p>
          </div>

          {/* Form Container */}
          <div ref={formRef} className="relative p-6 md:p-8 rounded-xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/15 via-emerald-500/15 to-emerald-400/15 dark:from-emerald-800/20 dark:via-emerald-700/20 dark:to-emerald-600/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-800/50"></div>

            {/* Animated background shapes with GSAP */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="blob-animation absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="blob-animation absolute bottom-0 right-0 w-40 h-40 bg-emerald-400/10 dark:bg-emerald-300/10 rounded-full blur-3xl"></div>
            </div>

            {/* Form content */}
            <div className="relative z-10">
              {isSuccess ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-green-500 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </p>
                  <Button
                    onClick={resetContactForm}
                    size="sm"
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 dark:from-emerald-500 dark:to-emerald-400 dark:hover:from-emerald-600 dark:hover:to-emerald-500 text-white transition-all duration-300"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700 dark:text-gray-300">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className={cn(
                                  "h-10 px-4 rounded-lg bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30",
                                  "focus:border-emerald-500 dark:focus:border-emerald-400 transition-all",
                                  "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700 dark:text-gray-300">Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                className={cn(
                                  "h-10 px-4 rounded-lg bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30",
                                  "focus:border-emerald-500 dark:focus:border-emerald-400 transition-all",
                                  "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700 dark:text-gray-300">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message here..."
                              className={cn(
                                "h-24 px-4 py-2 rounded-lg bg-white/10 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30",
                                "focus:border-emerald-500 dark:focus:border-emerald-400 transition-all",
                                "focus-visible:ring-emerald-500 dark:focus-visible:ring-emerald-400",
                              )}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 dark:from-emerald-500 dark:to-emerald-400 dark:hover:from-emerald-600 dark:hover:to-emerald-500 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-emerald-500/25 group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
